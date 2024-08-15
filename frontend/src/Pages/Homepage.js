import React, { useEffect } from 'react'
import {Container,Box, Text,Tabs,TabList,TabPanels,TabPanel,Tab} from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import SignUp from '../components/Authentication/SignUp'
import { useHistory } from 'react-router-dom'


// we are using box(i.e tag) from Chakra-UI because we can directly write our style inside of tag 

const Homepage = () => {
  const history=useHistory();

  useEffect(()=>{
   const user=JSON.parse(localStorage.getItem("userInfo"));
   if(user){
      history.push("/chats");
   }
  },[history])
  
  return (
   <Container maxW='xl'  centerContent>
      {/* this box will contain our project title */}
      <Box
         d='flex'
         textAlign="center"
         justifyContent="center"
         p={3}
         bg={"white"}
         w="100%"
         my={8}
         borderRadius="lg"
         borderWidth="1px"
      >
      <Text
          fontSize='4xl'
          fontFamily="Work sans"
          color="black"
      >
          Talk-A-Tive
      </Text>
      </Box>

      {/* this box will contain login/signup page */}
      <Box
         bg="white"
         w="100%"
         p={4}
         borderRadius="lg"
         borderWidth="1px"
         boxShadow="md"
         maxW="600px"
         overflowY="hidden" // Hide vertical scrollbar
      >
      <Tabs variant='soft-rounded' isFitted>

        <TabList mb="1em">
           <Tab width="50%">Login</Tab>
           <Tab width="50%">Sign Up</Tab>
        </TabList>

        <TabPanels>
             <TabPanel> <Login/> </TabPanel>
             <TabPanel> <SignUp/> </TabPanel> 
        </TabPanels>

      </Tabs>
      </Box>
   </Container>
  )
}

export default Homepage
