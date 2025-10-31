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
import { useAuthStore } from "../store/authStore";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from './../services/auth/firebaseConfig.js';

const Login = () => {
    const { setTokens } = useAuthStore();
    const { mutateAsync: loginUser, isPending } = useLogin();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await loginUser(data);
            const { accessToken, refreshToken } = response.data;
            const userRole = response.data.user.role;
            setTokens({ accessToken, refreshToken, userRole });
            navigate("/product");
        } catch (error) {
            console.log(error);
        }
    };

    const signInGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const { accessToken, refreshToken } = result.user.stsTokenManager;
            setTokens({ accessToken, refreshToken, userRole: "USER" });
            navigate("/product");
        } catch (error) {
            console.log(error);
        }
    }

    const signInGithub = async () => {
        const provider = new GithubAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const { accessToken, refreshToken } = result.user.stsTokenManager;
            setTokens({ accessToken, refreshToken, userRole: "USER" });
            navigate("/product");
        } catch (error) {
            console.log(error);
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
                        isLoading={isPending || isSubmitting}
                        loadingText="Logging in..."
                    >
                        Login
                    </Button>
                    <Button
                        variant={"outline"}
                        colorScheme="purple"
                        width={"full"}
                        onClick={signInGoogle}
                    >
                        <Text me={2}>Sign in with Google</Text>
                        <FcGoogle />
                    </Button>
                    <Button
                        variant={"outline"}
                        colorScheme="green"
                        width={"full"}
                        onClick={signInGithub}
                    >
                        <Text me={2}>Sign in with Github</Text>
                        <FaGithub />
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