import { useNavigate,useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import {Box,Text,Flex, Heading, Button} from 'rebass'
import { Input } from '@rebass/forms';
import { useWindowHeight } from '@react-hook/window-size';
import { useState } from 'react';
const Login = () => {
  const navigate = useNavigate();
  const { login,authed } = useAuth();
  const { state } = useLocation();
  const height = useWindowHeight()
  const [loginDetails,setLoginDetails] = useState({phone:'',otp:''})
  const [toggle,setToggle] = useState(false)
  const handleOnChange=(e)=>{
    setLoginDetails({...loginDetails,[e.target.name]: e.target.value})
  }
  const handleOtp=()=>{
    setToggle((prevState)=>!prevState)
  }
  const handleLogin = (e) => {
    e.preventDefault()
    login().then(() => {
      navigate(state?.path || "/");
    });
  };
  return (
    <Box height={height}>
      {/* <p>{authed.toString()}</p> */}
      <Flex height={'100%'} justifyContent='center' alignItems='center'>
      <Box width={400}>
      <Box>

        <Flex flexDirection='column' alignItems='center' justifyContent='center'>
          <Text color="#707070">Anooj's Chat App</Text>
          {toggle?
          <Flex flexDirection='column' alignItems='center' justifyContent='center'>
          <Input mt={3} name="otp" value={loginDetails.otp} onChange={(e)=>handleOnChange(e)} placeholder='otp:any number'/>
        <Button mt={3} onClick={(e)=>handleLogin(e)}>Submit</Button>
          </Flex>
          :
          <Flex flexDirection='column' alignItems='center' justifyContent='center'>
          <Input mt={3} name="phone" value={loginDetails.phone} onChange={(e)=>handleOnChange(e)} placeholder='Enter your Mobile Number'/>
        <Button mt={3} type='' onClick={handleOtp}>Send OTP</Button>
          </Flex>
        }
        </Flex>

      </Box>
      
      </Box>
      </Flex>
    </Box>
  );
};

export default Login