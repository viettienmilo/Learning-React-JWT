import {
    Box,
    Heading,
    VStack,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Select,
    Button,
    Text,
    Link as ChakraLink,
    FormErrorMessage,
} from "@chakra-ui/react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { useRegister } from "../services/auth/auth";
import { useNavigate } from "react-router";

export default function Register() {
    // register hook
    const { mutateAsync: registerUser, isPending } = useRegister();
    const toast = useToast();
    const navigate = useNavigate();

    // register form 
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            role: "",
        }
    });

    // function for handle form submit
    const onSubmit = async (formData) => {
        try {
            // register new user
            await registerUser(formData);
            toast({
                title: "Register success",
                description: "You have successfully registered",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate('/login');
        } catch (error) {
            toast({
                title: "Register failed",
                description: "Something went wrong",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }

    return (
        <Box
            w={{ base: "90%", md: "400px" }}
            mt={10}
            p={8}
            borderRadius="lg"
            boxShadow="5px 10px 50px 2px #0003"
            color="white"
            border={"1px"}
            borderColor={"gray.800"}
        >
            {" "}
            <Heading mb={6} size={"lg"} textAlign={"center"}>
                Register
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4}>
                    <FormControl isInvalid={errors.username}>
                        <FormLabel>Username</FormLabel>
                        <Input borderColor={"gray.300"}
                            type="text"
                            placeholder="Your username"
                            {...register("username", { required: "Username is required" })}
                        />
                        {errors.username ? <FormErrorMessage>{errors.username.message}</FormErrorMessage>
                            : <FormHelperText>Use any cool name you want</FormHelperText>}
                    </FormControl>
                    <FormControl isInvalid={errors.email}>
                        <FormLabel>Email address</FormLabel>
                        <Input borderColor={"gray.300"}
                            type="email"
                            placeholder="someone@domain.com"
                            {...register("email", { required: "Email is required" })} />
                        {errors.email ? <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                            : <FormHelperText>Enter your valid email</FormHelperText>}
                    </FormControl>
                    <FormControl isInvalid={errors.password}>
                        <FormLabel>Password</FormLabel>
                        <Input borderColor={"gray.300"}
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 5, message: "Minimum length is 5" }
                            })} />
                        {errors.password ? <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                            : <FormHelperText>Minimum length is 5</FormHelperText>}
                    </FormControl>
                    <FormControl isInvalid={errors.role}>
                        <FormLabel>User role</FormLabel>
                        <Select placeholder="Select role" color={"gray.300"}
                            {...register("role", { required: "User role is required" })}
                        >
                            <option value="USER" style={{ color: "black" }}>User</option>
                            <option value="ADMIN" style={{ color: "black" }}>Admin</option>
                        </Select>
                        {errors.role ? <FormErrorMessage>{errors.role.message}</FormErrorMessage>
                            : <FormHelperText>Choose a properly role</FormHelperText>}
                    </FormControl>
                    <Button colorScheme="cyan" color={"black"} width={"full"} marginTop={4}
                        type="submit"
                        isLoading={isPending || isSubmitting}
                        loadingText="Registering..."
                    >
                        Register
                    </Button>
                    <Text fontSize={"sm"} color={"gray.600"}>
                        Already have an account?
                        <ChakraLink
                            as={Link}
                            to="/login"
                            color="cyan.400"
                            fontWeight="bold"
                            ml={1}
                        >
                            Login
                        </ChakraLink>
                    </Text>
                </VStack>
            </form>
        </Box>
    );
}
