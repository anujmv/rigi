import React, { useEffect, useState, useRef } from "react";
import { Box, Flex, Text, Image, Button } from "rebass";
import { Input } from "@rebass/forms";
import useAuth from "../hooks/useAuth";
import Chance from "chance";
import faker from "faker";
import { useLocation } from "react-router-dom";
import ScrollToBottom, {
  useScrollToBottom,
  useScrollTo,
} from "react-scroll-to-bottom";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from "@react-hook/window-size";

import { css } from "glamor";

var chance = new Chance();

function Chat({ updateSideNav }) {
  const { chat, setNewChat, setNewData } = useAuth();

  const [newMessage, setNewMessage] = useState("");
  const height = useWindowHeight();
  const scrollToBottom = useScrollToBottom();
  const scrollTo = useScrollTo();
  const location = useLocation();

  const myRef = useRef(null);

  var lo = location.pathname.split("/");
  var id = lo[lo.length - 1];
  //   console.log(id)

  useEffect(() => {
    scrollTo("100%");
  }, [chat]);

  const ROOT_CSS = css({
    height: `${height - 190}px`,
    width: "100%",
  });

  // useEffect(()=>{
  //     scrollToBottom()
  // },[chat])
  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };
  const handleSendChat = (e) => {
    e.preventDefault();
    let newTranscript = {
      id: chance.guid(),
      alias: "you",
      phone: chance.phone({ country: "uk", mobile: true }),
      attachement: "https://picsum.photos/200/300",
      message: {
        img: null,
        text: newMessage,
      },
    };
    scrollToBottom("auto");
    // setChatThread(tempChat[0].transcript.push(newTranscript))
    // setNewChat(newTranscript);
    setNewData(id, newTranscript);
    updateSideNav();
    setNewMessage("");
  };
  if (chat.length != 0) {
    return (
      <Flex
        height="100%"
        flexDirection="column"
        overflow="scroll"
        sx={{ position: "relative" }}
      >
        <Box bg="#F2F2F2" p={2}>
          <Flex alignItems="center" width="100%">
            <Box>
              <Image
                src={chat[0].avatar}
                width={80}
                sx={{ borderRadius: "100%" }}
              />
            </Box>
            <Box ml={2}>
              <Text variant="chatHeading" fontSize="20px">
                {chat[0].name}
              </Text>
            </Box>
          </Flex>
          <Box></Box>
        </Box>

        <Flex
          id="scrollableDiv"
          p={3}
          sx={{
            overflow: "scroll",
            display: "flex",
            flexDirection: "column-reverse",
          }}
          height="100%"
          width="100%"
        >
          <ScrollToBottom className={ROOT_CSS}>
            {chat[0].transcript.map((c, i) => {
              if (c.alias === "you") {
                return (
                  <Box ref={myRef} key={i}>
                    {c.message.img ? (
                      <Box
                        sx={{
                          bg: "rgba(204, 241, 254, 0.5)",
                          borderRadius: "10px",
                          minWidth: "10%",
                          maxWidth: "40%",
                          width: "100%",
                          textAlign: "left",
                        }}
                        mt={2}
                        mr={0}
                        ml="auto"
                        p={2}
                      >
                        <Box>
                          <Image src={c.message.img} width={150} height={150} />
                        </Box>
                      </Box>
                    ) : null}

                    <Box
                      key={c.id}
                      sx={{
                        bg: "rgba(204, 241, 254, 0.5)",
                        borderRadius: "10px",
                        width: "40%",
                        textAlign: "left",
                      }}
                      mt={2}
                      mr={0}
                      ml="auto"
                      p={2}
                    >
                      <Text fontSize={"12px"} color="secondary">
                        {c.alias}
                      </Text>
                      <Text>{c.message.text}</Text>
                    </Box>
                  </Box>
                );
              }
              return (
                <Box
                  key={c.id}
                  sx={{ bg: "#fff", borderRadius: "10px", width: "40%" }}
                  mt={2}
                  p={2}
                >
                  <Text fontSize={"12px"} color="secondary">
                    {c.alias}
                  </Text>
                  <Text>{c.message.text}</Text>
                </Box>
              );
            })}
          </ScrollToBottom>
        </Flex>
        <form onSubmit={(e) => handleSendChat(e)}>
          <Flex justifyContent="center" p={2} width={"100%"} bg="#f1f1f1">
            <Input
              sx={{
                bg: "#fff",
                width: "70%",
                border: "none",
                borderRadius: "20px",
              }}
              id="name"
              name="name"
              value={newMessage}
              placeholder="Type your message"
              onChange={(e) => handleOnChange(e)}
            />
            <Button onClick={(e) => handleSendChat(e)}>Send</Button>
          </Flex>
        </form>
      </Flex>
    );
  }
  return (
    <Flex height={height} alignItems="center" justifyContent="center">
      <Box textAlign="center">
        <Text sx={{ color: "#707070" }}>Sample Data Only</Text>
        <Text sx={{ color: "#707070" }}>Click on the Chat to Join</Text>
        <Text sx={{ color: "#707070" }}>Data will clear on refresh</Text>
      </Box>
    </Flex>
  );
}

export default Chat;
