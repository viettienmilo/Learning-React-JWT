import { Box, Button } from "@chakra-ui/react"

function App() {
  return (
    <Box
      w={"100vw"}
      h={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      bg={"gray.800"}>
      <Button color={"cyan"} bg={"black"}>JWT</Button>
    </Box>
  )
}

export default App
