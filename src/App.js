


import * as React from "react";

import { Link,BrowserRouter, Routes, Route,useNavigate } from "react-router-dom";
import {AuthProvider} from './hooks/useAuth'
import useAuth from './hooks/useAuth'
import {RequireAuth} from './RequiredAuth'
import Login from './pages/Login'
import Home from './pages/Home'
import { createChatData } from "./data";
import Chat from "./pages/Chat";
import {Box,Flex} from 'rebass'
import { useWindowHeight } from "@react-hook/window-size";

// const Home = () => <h1>Home (Public)</h1>;
const Pricing = () => <h1>Pricing (Public)</h1>;

const Dashboard = () => <h1>Dashboard (Private)</h1>;
const Settings = () => <h1>Settings (Private)</h1>;




// function Nav() {
//   const { authed,data, logout } = useAuth();
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//       </ul>
//       {authed && (
//         <button onClick={handleLogout}>
//           Logout
//         </button>
//       )}
//     </nav>
//   );
// }



function App() {

  const height = useWindowHeight()

  // const [data,setData] = React.useState([])

  // React.useEffect(()=>{
  //   const getData= async()=>{
  //    const createData = await createChatData()
  //    setData(createData)
  //   }
  // getData()
  // },[])

  return (
    <AuthProvider>
   <BrowserRouter>
    <div className="App">
      {/* <Nav /> */}

      <Routes>
        <Route path="/" element={<RequireAuth>
          
          <Flex height={height}>
            <Box width={"30%"}>
              <Home/>
            </Box>
            <Box width={"70%"} sx={{bg:'#F2F2F2'}}>
            <Chat/>
            </Box>
          </Flex>
        
        </RequireAuth>} />
        <Route path="/chat/*" element={<RequireAuth>
          <Flex  height={height}>
            <Box width={"30%"}>
              <Home/>
            </Box>
            <Box width={"70%"} sx={{bg:'#F2F2F2'}}>
            <Chat/>
            </Box>
          </Flex>
          
          </RequireAuth>} />
        <Route path="/login" element={<Login />}/>
      </Routes>

    </div>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
