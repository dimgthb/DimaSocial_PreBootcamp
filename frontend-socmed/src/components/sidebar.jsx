import React from "react";
import { Text, Flex, Button, Box, Avatar, Menu, List, ListIcon, UnorderedList, ListItem } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

export default function ShowSidebar() {
    const profile = window.location.pathname === '/myprofile'
    const follow = localStorage.getItem("Auth-Token")
    return (
        <Box height="auto" flex="1">
            <Flex flexDirection="column">
                { profile? null : 
                    <Box padding="20px" border="1px" borderColor="purple" >
                        <Text fontStyle="italic" fontWeight="bold">Trending</Text>
                        <List spacing={1}>
                            <ListItem>
                                <ListIcon as={Search2Icon} color='purple' />
                                Manchaster United
                            </ListItem>
                            <ListItem>
                                <ListIcon as={Search2Icon} color='purple' />
                                Billie elish
                            </ListItem>
                            <ListItem>
                                <ListIcon as={Search2Icon} color='purple' />
                                Luna Cryto
                            </ListItem>
                            <ListItem>
                                <ListIcon as={Search2Icon} color='purple' />
                                Dr Strange
                            </ListItem>
                            <ListItem>
                                <ListIcon as={Search2Icon} color='purple' />
                                #Thomascup2022
                            </ListItem>
                            <ListItem>
                                <ListIcon as={Search2Icon} color='purple' />
                                Indonesia
                            </ListItem>
                            <ListItem>
                                <ListIcon as={Search2Icon} color='purple' />
                                #Seagames2022
                            </ListItem>
                            <ListItem>
                                <ListIcon as={Search2Icon} color='purple' />
                                GOL
                            </ListItem>
                        </List>
                    </Box>
                }
               { follow ? 
               <Box padding="20px" border="1px" borderColor="purple" marginTop="1em">
                    <Text fontStyle="italic" marginBottom="5px" fontWeight="bold">Following</Text>
                    <hr marginBottom="15px"/>
                    <Flex marginTop="10px" alignItems="center">
                        <Avatar name="Jimi Owen" size="sm"></Avatar>
                        <Text marginLeft="3%">June Oliver</Text>
                    </Flex>
                    <Flex marginTop="10px" alignItems="center">
                        <Avatar name="Loran Gomu" size="sm"></Avatar>
                        <Text marginLeft="3%">Loran Gomu</Text>
                    </Flex>
                    <Flex marginTop="10px" alignItems="center">
                        <Avatar name="Anestia Mins" size="sm"></Avatar>
                        <Text marginLeft="3%">Anestia Mins</Text>
                    </Flex>
                    <Flex marginTop="10px" alignItems="center">
                        <Avatar name="Morgan Taylor" size="sm"></Avatar>
                        <Text marginLeft="3%">Morgan Taylor</Text>
                    </Flex>
                    <Flex marginTop="10px" alignItems="center">
                        <Avatar name="Felix Rud" size="sm"></Avatar>
                        <Text marginLeft="3%">Felix Rud</Text>
                    </Flex>
                    <Flex marginTop="10px" alignItems="center">
                        <Avatar name="Wilson Chuck" size="sm"></Avatar>
                        <Text marginLeft="3%">Wilson Chuck</Text>
                    </Flex>
                </Box> :  null}
            </Flex>
        </Box>
    )
}