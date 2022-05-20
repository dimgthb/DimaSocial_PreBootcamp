import { Box, Stack, Avatar, Text, Image, Icon,Flex } from "@chakra-ui/react";
import React from "react";
import { ChatIcon, TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons'


export default function ShowDiscover () {
    return (
        <Box flex="3" h="auto">
            <Box padding="20px" >
                <Box padding="20px" borderRadius="20px" border="1px" marginBottom="1.5rem" boxShadow="3px 3px purple">
                    <Stack direction="row" alignItems="center" marginBottom="10px">
                        <Avatar size="sm"></Avatar>
                        <Text>James</Text>
                        <Text>created at</Text>
                    </Stack>
                    <Stack alignItems="center" marginBottom="1rem">
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aspernatur reiciendis, aliquam culpa at asperiores ipsam quisquam cumque quibusdam, ullam veritatis unde placeat ratione odit. Voluptatum dignissimos voluptatibus asperiores beatae.</Text>
                        <Image boxSize="300px" objectFit="cover" src='https://bit.ly/dan-abramov' />
                    </Stack>
                    <Flex justifyContent="space-between">
                        <Stack direction="row">
                            <Icon w={6} h={6} color="green.500" as={TriangleUpIcon}/>
                            <Icon w={6} h={6} color="red.500" as={TriangleDownIcon}/>
                            <Text>19 likes</Text>
                        </Stack>
                        <Stack direction="row">
                            <Icon w={6} h={6} as={ChatIcon}/>
                            <Text>3 comments</Text>
                        </Stack>
                    </Flex>
                </Box>
                <Box padding="20px" borderRadius="20px" border="1px" marginBottom="1.5rem">
                    <Stack direction="row" alignItems="center" marginBottom="10px">
                        <Avatar size="sm"></Avatar>
                        <Text>James</Text>
                        <Text>created at</Text>
                    </Stack>
                    <Stack alignItems="center" marginBottom="1rem">
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aspernatur reiciendis, aliquam culpa at asperiores ipsam quisquam cumque quibusdam, ullam veritatis unde placeat ratione odit. Voluptatum dignissimos voluptatibus asperiores beatae.</Text>
                        <Image boxSize="300px" objectFit="cover" src='https://bit.ly/dan-abramov' />
                    </Stack>
                    <Flex justifyContent="space-between">
                        <Stack direction="row">
                            <Icon w={6} h={6} color="green.500" as={TriangleUpIcon}/>
                            <Icon w={6} h={6} color="red.500" as={TriangleDownIcon}/>
                            <Text>19 likes</Text>
                        </Stack>
                        <Stack direction="row">
                            <Icon w={6} h={6} as={ChatIcon}/>
                            <Text>3 comments</Text>
                        </Stack>
                    </Flex>
                </Box>             
            </Box>
        </Box>
    )
}