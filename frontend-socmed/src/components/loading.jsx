import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, Flex, Text, CircularProgress } from '@chakra-ui/react'

export default function Loading (props) {
    return (
        <Modal isOpen={props.isLoading}>
            <ModalOverlay />
            <ModalContent>
                <ModalBody>
                    <Flex w="100%" h="16" justifyContent="center" alignItems="center">
                        <CircularProgress isIndeterminate color='#319795' /> 
                        <Text fontSize="2xl" pl="10px" fontWeight="bold" color='#319795'>Loading . . .</Text>
                    </Flex> 
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}