import {
    Box,
    Heading,
    Text,
    Image,
    SimpleGrid,
    VStack,
    Button,
    useColorModeValue,
} from "@chakra-ui/react";

const Product = () => {
    return (
        <Box p={20}>
            <Box
                w={"70vw"}
                p={"10"}
                mx="auto"
                bg={"gray.600"}
                backdropFilter="blur(16px)"
                borderRadius="2xl"
            >
                <Heading mb={6} textAlign="center" size="xl" color="gray.400">
                    Explore Our Products
                </Heading>

            </Box>
        </Box>
    )
}

export default Product