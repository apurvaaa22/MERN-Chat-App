import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

// the children over here is our whole app
const ChatProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        //    if user is not login redirect it to login page
        if (!userInfo) {
            history.push('/')
        }
    }, [history])

    return (
        <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>
            {children}
        </ChatContext.Provider>
    )
}

// we created hook useContext to make the state accessible within our whole app and it is stored within ChatState
export const ChatState = () => {
    return useContext(ChatContext);

};

export default ChatProvider;