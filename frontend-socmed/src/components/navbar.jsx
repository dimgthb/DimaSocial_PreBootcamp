import React, { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Text, Flex, Button, Box, useToast } from '@chakra-ui/react'
import Loading from '../components/loading'
import Confirmation from '../components/confirmation'
import { Link, useLocation } from 'react-router-dom'
import { UnlockIcon, LockIcon, EditIcon } from '@chakra-ui/icons'



function Navbar (props) {
    const title = {
        '/' : 'DimaSocial',
        '/myprofile' : 'DimaSocial',
        '/login' : 'Login',
        '/regis' : 'Register',
        '/verified' : 'Verification Page',
        '/waitverified' : 'DimaSocial',
        '/resetpass' : 'DimaSocial'
    }
    const navigate = useNavigate()
    const token = localStorage.getItem('Auth-Token')
    const dispatch =  useDispatch()
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const [confirm, setConfirm] = useState(false)
    const [id, setId] = useState(null)
    const location = useLocation()
    
    const logreg = props.pathname === '/login'|| props.pathname === '/regis' 
    || props.pathname === '/verified' || props.pathname === '/waitverified'
    || props.pathname === '/resetpass'
    const fullname = useSelector((state) => state.profile.fullname)
    const myArray = fullname.split(" ");
    let hiname = myArray[0];

    const onButtonLogout = () => {
        setConfirm(true)
        setLoading(true)
    }
    const onButtonConfirmLogout = () => {
        localStorage.removeItem('Auth-Token')
        localStorage.removeItem('uid')
        dispatch({ type : 'LOGOUT' })
            // if success
        setLoading(false)
        setConfirm(false)
        toast({
            title: 'Logout success',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }
    const onButtonCancelLogout = () => {
        setConfirm(false)
        setId(null)
        setLoading(false)
    }

    return (
        <Flex 
            w="100%" 
            h="80px" 
            px="161px" 
            paddingBottom="10px" 
            backgroundColor="#6333BA" 
            flexDirection="row" 
            justifyContent="space-between"
            alignItems="flex-end"
            position="fixed"
        >
            <Loading isLoading={loading}/>
            <Confirmation 
                isConfirm={confirm} 
                title="Logout Confirmation" 
                onCancel={onButtonCancelLogout} 
                onConfirm={onButtonConfirmLogout}
            />
            <Text fontSize="4xl" fontWeight="bold" color="blue.200">
                { title[props.pathname] } 
            </Text>
            { logreg? null
            :<Flex>
                <Box 
                    py="8px" 
                    px="15px" 
                    cursor="pointer"
                    borderBottom={ location.pathname === "/" ? "2px" : "0px" } 
                    borderBottomColor="white"
                    color="white"
                >
                    <Link to="/">myHome</Link>
                </Box>
                <Box 
                    py="8px" 
                    px="15px" 
                    cursor="pointer" 
                    borderBottom={ location.pathname === "/myprofile" ? "2px" : "0px" } 
                    borderBottomColor="white"
                    color="white"
                >
                    <Link to="/myprofile">myProfile</Link>
                </Box>
            </Flex>
            }
            <Box>
            {   token?   <Flex>
                                <Text color="white" fontSize="2em" marginRight="10px">Hi, {hiname}</Text>
                                <Button rightIcon={<UnlockIcon/>} colorScheme="pink" onClick={onButtonLogout}>Logout</Button>
                            </Flex>
            : null }
            { 
                token?
                null
                :
                <Button leftIcon={<LockIcon/>} colorScheme="green" onClick={() => navigate(props.pathname === '/login' ? '/' : '/login')}>
                    { props.pathname === '/login' ? 'Back to Home' : 'Login' }
                </Button>
            }
            {
                token?
                null
                : 
                <Button leftIcon={<EditIcon/>} colorScheme="teal" marginLeft="10px" onClick={() => navigate(props.pathname === '/regis' ? '/' : '/regis')}>
                    { props.pathname === '/regis' ? 'Back to Home' : 'Register' }
                </Button>
            }
            </Box>
        </Flex>
    )
}

export default Navbar

            //    <Button marginLeft="10px" onClick={() => navigate(props.pathname === '/regis' ? '/' : '/regis')}>
            //         { props.pathname === '/regis' ? 'Back to Home' : 'Register' }
            //     </Button>