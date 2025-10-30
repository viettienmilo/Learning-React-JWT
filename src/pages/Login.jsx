import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useLogin } from "../services/auth/auth";

const Login = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const { mutateAsync: loginUser } = useLogin();

    const onSubmit = async (data) => {
        try {
            await loginUser(data);
        } catch (error) {
            console.log(error);
        }
    };

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
            <Heading size={"lg"} mb={6} textAlign="center">
                Login
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4}>
                    <FormControl isInvalid={errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            borderColor={"gray.300"}
                            type="email"
                            placeholder="Enter email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />
                        <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.password}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            borderColor={"gray.300"}
                            type="password"
                            placeholder="Enter password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
                    </FormControl>
                    <Button
                        colorScheme="cyan"
                        width={"full"}
                        type="submit"
                        color={"black"}
                    >
                        Login
                    </Button>
                    <Button
                        variant={"outline"}
                        colorScheme="cyan"
                        width={"full"}
                        onClick={() => navigate("/register")}
                    >
                        Create an account
                    </Button>
                </VStack>
            </form>
        </Box>
    )
}

export default Login