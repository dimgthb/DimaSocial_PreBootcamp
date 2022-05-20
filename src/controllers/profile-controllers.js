const uuid = require('uuid')
const database = require('../config').promise()
const http_status = require('../helpers/http-status')
const createError = require('../helpers/create-error')
const createRespond = require('../helpers/create-respond')
// const { postStudentSchema, patchStudentSchema } = require('../helpers/validation-schema')

// promise wrapper
// module.exports.getStudents = async (req, res) => {
//     // check query params from URL
//     const limit = req.query._limit ? Number(req.query._limit) : 5
//     const page = req.query._page ? Number(req.query._page) : 1
//     const offset = (page - 1 ) * limit

//     try {
//         // define query
//         const GET_STUDENT = `
//             SELECT st.id, st.studentId, st.name, st.email, pg.program, ct.city 
//             FROM students AS st
//             JOIN programs AS pg ON pg.id = st.programId
//             JOIN city AS ct ON ct.id = st.cityId
//             WHERE st.status = 1
//             LIMIT ${database.escape(offset)}, ${database.escape(limit)}; 
//         `
//         const GET_TOTAL_STUDENT = `SELECT COUNT(*) AS total FROM students WHERE status = 1;`

//         // execute query
//         const [ STUDENTS ] = await database.execute(GET_STUDENT, [offset, limit])
//         const [ TOTAL ] = await database.execute(GET_TOTAL_STUDENT)

//         // create respond
//         const respond = new createRespond(
//             http_status.OK,
//             'get',
//             true,
//             TOTAL[0].total,
//             limit,
//             STUDENTS
//         )
//         res.status(respond.status).send(respond)
//     } catch (error) {
//         // validate error
//         const isTrusted = error instanceof createError
//         if (!isTrusted) {
//             error = new createError(http_status.INTERNAL_SERVER_ERROR, error.sqlMessage)
//         }
//         res.status(error.status).send(error)
//     }
// }

// GET : get profile by uid
module.exports.getProfilebyuid = async (req, res) => {
    const uid = req.params.uid
    try {
        const GET_PROFILE_BYUID = `SELECT * FROM profile WHERE uid =?;`
        const [ PROFILE ] = await database.execute(GET_PROFILE_BYUID, [uid])

        // validate
        if (!PROFILE.length) {
            throw new createError(http_status.NOT_FOUND, 'profile not found.')
        } 

        // create respond
        const respond = new createRespond(
            http_status.OK,
            'get',
            true,
            1,
            1,
            PROFILE[0]
        )
        res.status(respond.status).send(respond)
    } catch (error) {
        // validate error
        const isTrusted = error instanceof createError
        if (!isTrusted) {
            error = new createError(http_status.INTERNAL_SERVER_ERROR, error.sqlMessage)
        }
        res.status(error.status).send(error)
    }
}

// // POST : add new student data
// module.exports.postStudent = async (req, res) => {
//     let body = req.body
//     try {
//         // validation for body
//         const { error } = postStudentSchema.validate(body)
//         if (error) {
//             throw new createError(http_status.BAD_REQUEST, error.details[0].message)
//         }

//         // validation for duplicate data (name, email)
//         const CHECK_DATA = `
//             SELECT id 
//             FROM students 
//             WHERE name = ${database.escape(body.name)} OR email = ${database.escape(body.email)}
//         `
//         const [ STUDENT ] = await database.execute(CHECK_DATA)
//         if (STUDENT.length) {
//             throw new createError(http_status.BAD_REQUEST, 'bad request.')
//         }

//         // create studentId
//         body.studentId = uuid.v4().toUpperCase()

//         // define query
//         const INSERT_STUDENT = `
//             INSERT INTO students(studentId, name, email, programId, cityId)
//             VALUES(
//                 ${database.escape(body.studentId)}, 
//                 ${database.escape(body.name)}, 
//                 ${database.escape(body.email)},
//                 ${database.escape(body.programId)},
//                 ${database.escape(body.cityId)}
//             )
//         `
//         const [ INFO ] = await database.execute(INSERT_STUDENT)

//         // create respond
//         const respond = new createRespond(
//             http_status.CREATED,
//             'insert',
//             true,
//             1,
//             1,
//             { ...body, id : INFO.insertId }
//         )
//         res.status(respond.status).send(respond)
//     } catch (error) {
//         // validate error
//         const isTrusted = error instanceof createError
//         if (!isTrusted) {
//             error = new createError(http_status.INTERNAL_SERVER_ERROR, error.sqlMessage)
//         }
//         res.status(error.status).send(error)
//     }
// }

// PATCH 
module.exports.patchProfile = async (req, res) => {
    const uid = req.params.uid
    const body = req.body
    try {
        // check data -> if student with studentId exist in our database
        const CHECK_DATA = `SELECT * FROM profile WHERE uid = ?;`
        const [ PROFILE ] = await database.execute(CHECK_DATA, [uid])
        if (!PROFILE.length) {
            throw new createError(http_status.NOT_FOUND, 'profile not found.')
        }

        // is body empty?
        const isEmpty = !Object.keys(body).length
        if (isEmpty) {
            throw new createError(http_status.BAD_REQUEST, 'bad request.')
        }
        
        // validate body's value
        // const { error } = patchStudentSchema.validate(body)
        // if (error) {
        //     throw new createError(http_status.BAD_REQUEST, error.details[0].message)
        // }

        // define update query
        let query = []
        for (let key in body) {
            query.push(`${key}='${body[key]}'`)
        }
        const UPDATE_PROFILE = `UPDATE profile SET ${query} WHERE uid = ${database.escape(uid)};`
        console.log(UPDATE_PROFILE)
        const [ INFO ] = await database.execute(UPDATE_PROFILE)

        // create respond
        const respond = new createRespond(
            http_status.OK,
            'update',
            true,
            1,
            1,
            INFO.info
        )
        res.status(respond.status).send(respond)
    } catch (error) {
        // validate error
        const isTrusted = error instanceof createError
        if (!isTrusted) {
            error = new createError(http_status.INTERNAL_SERVER_ERROR, error.sqlMessage)
        }
        res.status(error.status).send(error) 
    }
}

// DELETE -> HARD DELETE
module.exports.hardDeleteStudent = async (req, res) => {
    const studentId = req.params.studentId // data from URL (query param & request param)
    console.log('studentId : ', studentId)
    try {
        const CHECK_DATA = `SELECT id FROM students WHERE studentId = ?;`
        const [ STUDENT ] = await database.execute(CHECK_DATA, [studentId])
        console.log('student : ', STUDENT)
        if (!STUDENT.length) {
            throw new createError(http_status.NOT_FOUND, 'id not found.')
        }

        // do query delete -> hard delete
        const DELETE_STUDENT = `DELETE FROM students WHERE studentId = ?;`
        const [ INFO ] = await database.execute(DELETE_STUDENT, [studentId])

        // create respond
        const respond = new createRespond(http_status.OK, 'hard delete', true, 1, 1, INFO.info)
        res.status(respond.status).send(respond)``
    } catch (error) {
        // validate error
        const isTrusted = error instanceof createError
        if (!isTrusted) {
            error = new createError(http_status.INTERNAL_SERVER_ERROR, error.sqlMessage)
        }
        res.status(error.status).send(error) 
    }
}

// DELETE -> SOFT DELETE
// 1. check data student by studentId
// 2. define query -> UPDATE -> set status from 1 to 0, 1 active or 0 inactive
module.exports.softDeleteStudent = async (req, res) => {
    const studentId = req.params.studentId
    try {
        // check data
        const CHECK_DATA = `SELECT id FROM students WHERE studentId = ? AND status = 1;`
        const [ STUDENT ] = await database.execute(CHECK_DATA, [studentId])
        if (!STUDENT.length) {
            throw new createError(http_status.NOT_FOUND, 'id not found.')
        }

        // if data exist -> define query for soft-delete
        const SOFT_DELETE_STUDENT = `UPDATE students SET status = 0 WHERE studentId = ?;`
        const [ INFO ] = await database.execute(SOFT_DELETE_STUDENT, [studentId])

        // create respond
        const respond = new createRespond(http_status.OK, 'soft delete', true, 1, 1, INFO.info)
        res.status(respond.status).send(respond)
    } catch (error) {
        // validate error
        const isTrusted = error instanceof createError
        if (!isTrusted) {
            error = new createError(http_status.INTERNAL_SERVER_ERROR, error.sqlMessage)
        }
        res.status(error.status).send(error)   
    }
}

// MODIFY GET REQUEST for all student and student by its studentId
// MAKE USER CLIENT ONLY GET ACTIVE DATA
