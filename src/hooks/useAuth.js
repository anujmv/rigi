import * as React from "react";
import { createChatData } from "../data";
const AuthContext = React.createContext();

function useAuth() {
  const [authed, setAuthed] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [chat, setChat] = React.useState([]);
  return {
    authed,
    data,
    chat,
    setNewChat(newData) {
      let tempChat = chat;
      return new Promise((res) => {
        tempChat[0].transcript.push(newData);
        setChat(tempChat);
        res();
      });
    },
    setNewData(id, newData) {
      let tempData = data;
      return new Promise((res) => {
        let index = tempData.findIndex((d) => d.id == id);
        tempData[index].transcript.push(newData);
        tempData[index].lastmessage = newData;
        setData(tempData);
        res();
      });
    },
    fetchData() {
      console.log("runnin");
      return new Promise((res) => {
        const createData = createChatData();
        setData(createData);
        res();
      });
    },

    getChat(id) {
      console.log(id);
      return new Promise((res) => {
        const selectedChat = data.filter((d) => d.id == id);
        setChat(selectedChat);
        res();
      });
    },

    login() {
      console.log("called");
      return new Promise((res) => {
        console.log("resloved");
        setAuthed(true);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

//hook

export default function AuthConsumer() {
  return React.useContext(AuthContext);
}
