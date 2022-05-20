import { Box, useToast, Stack, Spinner, Text, Image, Icon,Flex, Editable, EditableInput, EditablePreview, Input, Button, IconButton, EditableTextarea } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from 'react'
import { EmailIcon, EditIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import Axios from "axios";

import { getProfile, pacthProfile } from "../redux/actions/profile-actions";
import Loading from '../components/loading'
import Confirmation from '../components/confirmation'

export default function ShowBio () {
    const [confirm, setConfirm] = useState(false)
    const [id, setId] = useState(null)
    const inputFNRef = useRef('')
    const inputBioRef = useRef('')
    const inputPPRef = useRef('')

    const username = useSelector((state) => state.user.username)
    const email = useSelector((state) => state.user.email)
    const status = useSelector((state) => state.user.status)
    // const status = localStorage.getItem("status")

    const fullname = useSelector((state) => state.profile.fullname)
    const bio = useSelector((state) => state.profile.bio)
    const profpic = useSelector((state) => state.profile.profilpic)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const toast = useToast()
    const navigate = useNavigate()

    const onButtonVerif = () => {
        navigate('/waitverified') 
    }
    // side-effect
    // useEffect(() => {
    // dispatch(getProfile())
    // })
    // side-effect

    useEffect(() => {
        const uid = localStorage.getItem("uid")
        dispatch({ type : 'ON_FETCH_START' })

        Axios.get(process.env.REACT_APP_API_URL + `/profile/${uid}`)
        .then((respond) => {
            dispatch({ type : 'GET_DATA_PROFILE', payload : respond.data })
            dispatch({ type : 'ON_FETCH_END'})
        })
        .catch((error) => {
            console.log(error)
            dispatch({ type : 'ON_FETCH_END'})
        })
    }, [])

    const onButtonSaveEdit = (id) => {
        setConfirm(true)
        setLoading(true)
        setId(id)
    }

    const onButtonCancelEdit = () => {
        setConfirm(false)
        setLoading(false)
        setId(null)
    }

    const onButtonConfirmEdit = async () => {
        const uid = localStorage.getItem("Auth-Token")
        const newprofile = {
            fullname : inputFNRef.current.value,
            bio : inputBioRef.current.value,
            profilpic : inputPPRef.current.value
        }
        setConfirm(false)

        const [ SUCCESS, message ] = await dispatch(pacthProfile(uid, newprofile))
        setId(null)

        // if succes -> toast succes
        if (SUCCESS) return toast({
            title : 'Info',
            description : 'Profile Has Been Update.',
            status : 'success',
            isClosable : true,
            duration : 3000
        })
        // if error -> toast error
        return toast({
            title : 'Error',
            description : message,
            status : 'error',
            isClosable : true,
            duration : 3000
        })
        setLoading(false)

    }

    return (
        
        <Box flex="3" h="auto" border="1px" borderColor="purple" marginTop="-20px">
            <Loading isLoading={loading}/>
            <Confirmation 
                isConfirm={confirm} 
                title="Edit Profile Confirmation" 
                onCancel={onButtonCancelEdit} 
                onConfirm={onButtonConfirmEdit}
            />
            <Box padding="20px">
                <Flex height="20em" >
                    <Box flex="2" justifyContent="center">
                        <Image ref={inputPPRef} boxSize="300px" objectFit="cover" src={profpic} fallbackSrc="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=170667a&w=0&h=kEAA35Eaz8k8A3qAGkuY8OZxpfvn9653gDjQwDHZGPE=" />
                        <Input  type="file"/>
                    </Box>
                    { (status == 1) ?
                    <Box flex="4" border="1px">
                        <Stack padding="20px">
                            <Flex justifyContent="space-between">
                                <Text fontWeight="bold" fontSize="26px" 
                                textDecoration="underline"
                                >User Information</Text>
                                <Text>(Status Account : { status === 1 ? 'Not Verified' : 'Verified' })</Text>
                            </Flex>
                            <Flex alignItems="center">
                                <EditIcon w={6} h={6} marginRight="2%"/>
                                <Editable ref={inputFNRef} defaultValue={fullname} width="75%" fontSize="27px" placeholder='"Click to Edit Your Name"'>
                                    <EditablePreview/>
                                    <EditableInput />
                                </Editable>
                            </Flex>
                            <Flex justifyContent="space-between" width="80%" fontSize="22px">
                                <Flex alignItems="center">
                                    <EditIcon w={5} h={5} marginRight="6%"/>
                                    <Text>@{username}</Text>
                                </Flex>
                                <Flex alignItems="center">
                                    <EmailIcon w={5} h={5} marginRight="6%"/>
                                    <Text>{email}</Text>
                                </Flex>
                            </Flex>
                            <Flex px="18%" justifyContent="space-between" fontSize="21px" fontWeight="bold">
                                <Text>0 Post</Text>
                                <Text>23 Following</Text>
                                <Text>64 Follower</Text>
                            </Flex>
                            <Flex px={20} alignItems="center">
                                <EditIcon w={6} h={6} marginRight="2%"/>
                                <Editable ref={inputBioRef} defaultValue={bio} width="75%" 
                                fontSize="21px" fontStyle="italic">
                                    <EditablePreview/>
                                    <EditableInput />
                                </Editable>
                            </Flex>
                            <Button
                                w="90px"
                                colorScheme='facebook' 
                                variant='solid'
                                onClick={onButtonSaveEdit}
                                disabled={loading}
                            >
                                { loading ? <Spinner size="md"/> : "Save Edit" }
                            </Button>
                        </Stack>
                    </Box>
                    :<Box flex="4" border="1px" backgroundColor="purple">
                        <Flex marginTop="50px" alignItems="center" justifyContent="center" padding="30px" flexDirection="column">
                            <Text fontSize="30px" color="white">Status Account : "Unverified"</Text>
                            <Button rightIcon={<ArrowForwardIcon/>} colorScheme="green" onClick={onButtonVerif} marginTop="20px">Go To Verification Page</Button>
                        </Flex>
                    </Box>}
                </Flex>       
            </Box>
        </Box>
    )
}