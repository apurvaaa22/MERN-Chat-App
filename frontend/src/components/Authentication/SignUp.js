import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, position } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import {useHistory} from 'react-router-dom';



const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history=useHistory();

  const clickHandler = () => setShow(!show);

  const SubmitHandler = async() => {
     setLoading(true);
     if(!name || !email || !password || !confirmPassword){
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
     if(password!==confirmPassword){
        toast({
          title:"Password Do not Match",
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"bottom",
       });
      //  setLoading(false);
       return;
     }
     try{
       const config={
        headers:{
          "Content-type":"application/json",
        },
       };

       const {data}=await axios.post("/api/user/",{name,email,password},config);

       toast({
         title:"Registration Successful",
         status:"success",
         duration:5000,
         isClosable:true,
         position:"bottom",
       });

       localStorage.setItem("userInfo",JSON.stringify(data));
       setLoading(false);
       history.push('/chats')
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
  }

  return (
    <VStack spacing='5px'>
      {/* name */}
      <FormControl id='first-name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder='Enter Your Name'
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </FormControl>

      {/* email */}
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='Enter Your Email'
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </FormControl>

      {/* password */}
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder='Enter Your Password'
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={clickHandler}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>

      </FormControl>

      {/*confirm password */}
      <FormControl id='confirmPassword' isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder='Confirm Password'
            onChange={(event) => {
              setconfirmPassword(event.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={clickHandler}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>

      </FormControl>

      <Button
        colorScheme='blue'
        width="100%"
        style={{ marginTop: 15 }}
        onClick={SubmitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>


    </VStack>
  )
}

export default SignUp
