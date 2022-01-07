import React, { useEffect } from "react";
import { Box, Heading, Image, Text, Flex, Button } from "rebass";
import useAuth from "../hooks/useAuth";
import Chance from "chance";
import { useNavigate, useLocation } from "react-router-dom";

var chance = new Chance();

function SideNav() {
  const navigate = useNavigate();
  const { authed, data, chat, logout, getChat, fetchData } = useAuth();
  const location = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleRoute = (id) => {
    getChat(id);
    navigate(`/chat/${id}`);
  };
  return (
    <Flex
      flexDirection="column"
      height="100%"
      overflow="scroll"
      sx={{ position: "relative" }}
    >
      <Box bg="#F2F2F2" p={2} sx={{ width: "100%" }} height="200px">
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <Box width={"80%"}>
              <Image
                src="https://i.pravatar.cc/100"
                width={80}
                sx={{ borderRadius: "100%" }}
              />
            </Box>
            <Box ml={3}>
              <Text variant="chatHeading" fontSize="20px">
                You
              </Text>
            </Box>
          </Flex>
          <Box>{authed && <Button onClick={handleLogout}>Logout</Button>}</Box>
        </Flex>
      </Box>
      <Box sx={{ overflow: "scroll" }} p={3}>
        {data.map((d) => {
          return (
            <Flex
              mt={3}
              bg={location.pathname === `/chat/${d.id}` ? "#f1f1f1" : "#fff"}
              key={d.id}
              onClick={() => handleRoute(d.id)}
              sx={{
                p: 2,
                borderRadius: 10,
                ":hover": {
                  boxShadow: "0 0 16px rgba(0, 0, 0, .25)",
                },
              }}
            >
              <Box width={"20%"}>
                <Image
                  src={d.avatar}
                  width={100}
                  sx={{ borderRadius: "100%" }}
                />
              </Box>
              <Box width={"80%"} ml={2}>
                <Text variant="chatHeading">{d.name}</Text>
                <Text variant="chatExert">
                  {d.lastmessage
                    ? d.lastmessage.message.text.slice(0, 30) + "..."
                    : ""}
                </Text>
              </Box>
            </Flex>
          );
        })}
      </Box>
    </Flex>
  );
}

export default SideNav;
