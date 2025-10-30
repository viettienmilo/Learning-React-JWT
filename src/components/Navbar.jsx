import {
    Box,
    Flex,
    Image,
    Button,
    HStack,
    Container,
    Text,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from "@chakra-ui/react";
import { Link } from "react-router";
import Logo from "../assets/ecommerce-logo.svg";
import { useAuthStore } from "../store/authStore";
import { AxiosInstance } from "../services/auth/AxiosInstance";
import { useNavigate } from "react-router";
import { useToast } from "@chakra-ui/react";
import { useState, useRef } from "react";

export const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const cancelRef = useRef();
    const toast = useToast();
    // retrieve accessToken from localStorage if it existed (means user have logged in)
    const { accessToken, clearTokens } = useAuthStore();

    // when user logout, delete accessToken from client side and log out from server side (freeapi)
    const logout = async () => {
        setIsLoading(true);
        try {
            await AxiosInstance.post('users/logout');
            clearTokens();
            toast({
                title: "Logged out successfully",
                description: "See you next time 👋",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate('/login');
        } catch (error) {
            toast({
                title: "Logout failed",
                description: error?.response?.data?.message || "Something went wrong.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
            setIsOpen(false);
        }
    }

    return (
        <Box
            boxShadow="0 4px 10px rgba(0, 0, 0, 0.2)" // black shadow with opacity
            py={3}
            position="fixed"
            top="0"
            left="0"
            right="0"
            zIndex="1000"
            bgGradient="linear(to-r, #10263b, #0a111b)"
        >
            <Container maxW="6xl" px={{ base: 4, md: 8 }}>
                <Flex align="center" justify="space-between" flexWrap="wrap">
                    {/* Logo */}
                    <Link to="/">
                        <Image
                            src={Logo}
                            alt="E-commerce Logo"
                            boxSize="50px"
                            objectFit="contain"
                        />
                    </Link>

                    {/* Product Catalog */}
                    <Box
                        display="flex"
                        gap={{ base: 4, md: 10 }}
                        mx={{ base: 2, md: 20 }}
                        mt={{ base: 2, md: 0 }}
                    >
                        <Link to="/product">
                            <Text
                                fontSize={{ base: "md", md: "xl" }}
                                _hover={{ color: "blue.300" }}
                                color="gray.400"
                            >
                                Product Catalog
                            </Text>
                        </Link>

                        <Link to="/dashboard">
                            <Text
                                fontSize={{ base: "md", md: "xl" }}
                                _hover={{ color: "blue.300" }}
                                color="gray.400"
                            >
                                Dashboard
                            </Text>
                        </Link>
                    </Box>

                    {/* Navigation Buttons */}
                    <HStack
                        display={{ base: "none", md: "flex" }}
                        spacing={{ base: 2, md: 4 }}
                        mt={{ base: 2, md: 0 }}
                    >
                        {!accessToken ? (
                            <>
                                <Link to="/login">
                                    <Button
                                        colorScheme="cyan"
                                        color="black"
                                        size={{ base: "sm", md: "md" }}
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button
                                        variant="outline"
                                        colorScheme="cyan"
                                        size={{ base: "sm", md: "md" }}
                                    >
                                        Register
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Button
                                    colorScheme="cyan"
                                    color="black"
                                    size={{ base: "sm", md: "md" }}
                                    onClick={() => setIsOpen(true)}
                                >
                                    Logout
                                </Button>
                                <AlertDialog
                                    isOpen={isOpen}
                                    leastDestructiveRef={cancelRef}
                                    onClose={() => setIsOpen(false)}
                                >
                                    <AlertDialogOverlay>
                                        <AlertDialogContent
                                            bg="gray.800"
                                            color="white"
                                            border="1px solid"
                                            borderColor="gray.700"
                                        >
                                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                                Confirm Logout
                                            </AlertDialogHeader>

                                            <AlertDialogBody>
                                                Are you sure you want to log out?
                                            </AlertDialogBody>

                                            <AlertDialogFooter>
                                                <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                                                    Cancel
                                                </Button>
                                                <Button
                                                    colorScheme="orange"
                                                    isLoading={isLoading}
                                                    loadingText="Logging out..."
                                                    onClick={() => {
                                                        // setIsOpen(false);
                                                        logout();
                                                    }}
                                                    ml={3}
                                                >
                                                    Logout
                                                </Button>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialogOverlay>
                                </AlertDialog>
                            </>
                        )}
                    </HStack>
                </Flex>
            </Container>
        </Box>
    );
};