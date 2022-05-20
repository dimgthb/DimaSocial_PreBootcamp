import React from 'react'
import { AlertDialog, AlertDialogOverlay, AlertDialogBody, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, Button } from '@chakra-ui/react'

export default function Confirmation (props) {
    return (
        <AlertDialog
            isOpen={props.isConfirm}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        { props.title }
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button onClick={props.onCancel}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' ml={3} onClick={props.onConfirm}>
                            Confirm
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}