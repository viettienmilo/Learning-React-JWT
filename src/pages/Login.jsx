import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Login = () => {
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
            <Text>Login page</Text>
        </Box>
    )
}

export default Login