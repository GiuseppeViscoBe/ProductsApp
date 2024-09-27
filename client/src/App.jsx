import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import CreatePage from "./pages/CreatePage";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Box minH={"100vh"}>
        <NavBar>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/" element={<CreatePage />} />
          </Routes>
        </NavBar>
      </Box>
    </>
  );
}

export default App;
