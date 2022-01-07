import * as React from "react";

import {
  Link,
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import useAuth from "./hooks/useAuth";
import { RequireAuth } from "./RequiredAuth";
import Login from "./pages/Login";
import SideNav from "./pages/SideNav";
import { createChatData } from "./data";
import Chat from "./pages/Chat";
import { Box, Flex } from "rebass";
import { useWindowHeight } from "@react-hook/window-size";

function App() {
  const height = useWindowHeight();

  return (
    <AuthProvider>
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
                      <SideNav />
                    </Box>
                    <Box width={"70%"} sx={{ bg: "#F2F2F2" }}>
                      <Chat />
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
                      <SideNav />
                    </Box>
                    <Box width={"70%"} sx={{ bg: "#F2F2F2" }}>
                      <Chat />
                    </Box>
                  </Flex>
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
