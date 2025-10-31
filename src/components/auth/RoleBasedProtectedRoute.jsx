
import { useAuthStore } from "../../store/authStore"
import { useEffect } from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

const RoleBasedProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { accessToken, userRole } = useAuthStore();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (!accessToken) onOpen();
        else if (!allowedRoles.includes(userRole)) onOpen();

    }, [accessToken, userRole, allowedRoles, onOpen]);

    const handleClose = () => {
        onClose();
        if (!accessToken)
            window.location.href = '/login';
        else
            window.location.href = '/unauthorized';
    }

    if (accessToken && allowedRoles.includes(userRole)) {
        return children;
    }
    else {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg="gray.800" color="gray.300">
                    <ModalHeader>Access denied</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {!accessToken ? "You must be logged in to access this page."
                            : "You do not have permission to access this page"}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleClose}>
                            {!accessToken ? "Go to Login" : "Close"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }

}

export default RoleBasedProtectedRoute