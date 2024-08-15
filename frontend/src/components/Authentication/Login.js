import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, position,  VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import axios from "axios";

const Login = () => {
 
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [loading,setLoading]=useState(false);
  const [show,setShow]=useState(false);
  const toast=useToast();
  const history=useHistory();
  
  const clickHandler=()=>setShow(!show);
  
  const SubmitHandler=async()=>{
      setLoading(true);
      if(!email || !password){
        toast({
          title:"Please Fill all the Fields",
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"bottom",
        });
        setLoading(false);
        return;
      }
      // console.log(email,password)
      try{
        const config={
          headers:{
            "content-type":"application/json",
          },
        };

        const {data}=await axios.post("/api/user/login",{email,password},config);
        // console.log(JSON.stringify(data));
        toast({
          title:"Login Successful",
          status:"success",
          duration:5000,
          isClosable:true,
          position:"bottom",
        });
        localStorage.setItem("userInfo",JSON.stringify(data));
        setLoading(false);
        history.push("/chats");
      }catch(error){
         toast({
          title:"Error Occured",
          description:error.response.data.message,
          status:"error",
          duration:5000,
          isClosable:true,
          position:"bottom",
         });
         setLoading(false);
      }
  };
  return (
    <VStack spacing='5px'>
        
        {/* email */}
        <FormControl id='first-name' isRequired>
           <FormLabel>Email</FormLabel>
           <Input
              placeholder='Enter Your Email'
              // value={email}
              onChange={(event)=>{
                setEmail(event.target.value);
              }}      
           />
        </FormControl>

        {/* password */}
        <FormControl id='first-name' isRequired>
           <FormLabel>Password</FormLabel>
           <InputGroup>
             <Input
              type={show?"text":"password"}
              placeholder='Enter Your Password'
              // value={password}
              onChange={(event)=>{
                setPassword(event.target.value);
              }}      
             />
             <InputRightElement width="4.5rem">
               <Button h="1.75rem" size="sm" onClick={clickHandler}>
                 {show?"Hide":"Show"}
               </Button>
             </InputRightElement>
           </InputGroup>
           
        </FormControl>


        <Button
           colorScheme='blue'
           width="100%"
           style={{marginTop:15}}
           onClick={SubmitHandler}
           isLoading={loading}
        >
          Login
        </Button>

        {/* guest user */}
        <Button
          variant="solid"
          colorScheme='red'
          textColor='white'
          width='100%'
          onClick={()=>{
            setEmail('guest@example.com')
            setPassword('pass@123')
          }}
          >
          Get Guest User Credentials
        </Button>
        
    </VStack>
  )
}

export default Login
