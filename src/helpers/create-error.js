const http_status = require('./http-status')

class NewError {
    constructor (
        http_status_code = http_status.INTERNAL_SERVER_ERROR,
        message = 'internal service error'
    ) {
        this.status = http_status_code
        this.message = message
    }
}

module.exports = NewError