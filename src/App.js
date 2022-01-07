import React, { useEffect, useState } from "react";

import {
  Link,
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import useAuth from "./hooks/useAuth";
import { RequireAuth } from "./RequiredAuth";
import Login from "./pages/Login";
import SideNav from "./pages/SideNav";
import { createChatData } from "./data";
import Chat from "./pages/Chat";
import { Box, Flex } from "rebass";
import { useWindowHeight } from "@react-hook/window-size";

function App() {
  const { fetchData } = useAuth();
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetchData();
  }, []);
  const height = useWindowHeight();
  const updateSideNav = () => {
    console.log("subtmitting");
    setCount(count + 1);
  };
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Nav /> */}

        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Flex height={height}>
                  <Box width={"30%"}>
                    <SideNav count={count} />
                  </Box>
                  <Box width={"70%"} sx={{ bg: "#F2F2F2" }}>
                    <Chat updateSideNav={updateSideNav} />
                  </Box>
                </Flex>
              </RequireAuth>
            }
          />
          <Route
            path="/chat/*"
            element={
              <RequireAuth>
                <Flex height={height}>
                  <Box width={"30%"}>
                    <SideNav count={count} />
                  </Box>
                  <Box width={"70%"} sx={{ bg: "#F2F2F2" }}>
                    <Chat updateSideNav={updateSideNav} />
                  </Box>
                </Flex>
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
