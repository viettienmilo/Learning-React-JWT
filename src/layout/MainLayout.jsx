import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";
import { Navbar } from './../components/Navbar.jsx';

const MainLayout = () => {
    return (
        <Box
            w="100%"
            minH="100vh"
            bgGradient="linear(to-r, #10263b, #0a111b)"
            p={4}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Navbar />
            <Outlet />
        </Box>

    )
}

export default MainLayout