import React from "react";
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

const dummyProducts = [
    {
        id: 1,
        name: "Focal Elegia Audiophie Headphone",
        price: "9.990.000đ",
        image:
            "https://3kshop.vn/wp-content/uploads/2018/11/focal-elegia-3kshop-4.jpg",
    },
    {
        id: 2,
        name: "Focal Arche DAC Amplifier",
        price: "53.000.000đ",
        image:
            "https://3kshop.vn/wp-content/uploads/2019/11/focal-arche-3kshop-0.jpg",
    },
    {
        id: 3,
        name: "FiiO M11 Plus LTD Edition",
        price: "21.990.000đ",
        image:
            "https://3kshop.vn/wp-content/uploads/2021/05/Fiio_M11_Plus_Stainless_Steel_-_1__27186.1622605878.jpg",
    },
    {
        id: 4,
        name: "Klipsch The One II",
        price: "6.400.000đ",
        image:
            "https://3kshop.vn/wp-content/uploads/2019/10/speaker-bluetooth-klipsch-theone2-3kshop-1.jpg",
    },
];

const ProductCard = ({ product }) => {
    return (
        <Box
            bg={useColorModeValue("whiteAlpha.200", "whiteAlpha.100")}
            backdropFilter="blur(8px)"
            borderRadius="xl"
            overflow="hidden"
            boxShadow="lg"
            p={4}
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
        >
            <Image
                src={product.image}
                alt={product.name}
                borderRadius="md"
                mx="auto"
                mb={4}
            />
            <VStack spacing={1} align="start">
                <Text fontWeight="bold">{product.name}</Text>
                <Text color="gray.700">{product.price}</Text>
                <Button size="sm" colorScheme="cyan" mt={2}>
                    Buy Now
                </Button>
            </VStack>
        </Box>
    );
};

const ProductPage = () => {
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
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
                    {dummyProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default ProductPage;