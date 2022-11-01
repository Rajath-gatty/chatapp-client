import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../Context/Context";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import Login from "../Pages/Login";
import Profile from "../components/Profile";
import NewChat from "../components/NewChat";
import ChatBanner from "../components/ChatBanner";
import useDelayUnmount from "../util/DelayUnmount";

function Home() {
    const { isAuth,profileSidebarOpen,newChatSidebarOpen,selectedChat,darkMode } = useGlobalContext();
    const delayUnmount = useDelayUnmount(newChatSidebarOpen, 100);
    const delayUnmount2 = useDelayUnmount(profileSidebarOpen, 100);
    return (
        <>
            {isAuth ? (
                <Wrapper 
                open={profileSidebarOpen||newChatSidebarOpen}
                darkMode={darkMode}
                >
                    <div className="overlay__sidebar">
                        {delayUnmount&&<NewChat/>}
                        {delayUnmount2&&<Profile/>}
                    </div>
                    <Sidebar />
                    {!selectedChat.room._id?<ChatBanner/>:<Chat />}
                </Wrapper>
            ) : (
                <Login />
            )}
        </>
    );
}

const Wrapper = styled.section`
    display: flex;
    max-width: 1500px;
    margin: auto;
    position: relative;

    .overlay__sidebar {
        position:absolute;
        left: ${({ open }) => open ? "0" : "-100%"};
        top:0;
        width: 30%;
        height: 100%;
        min-width: 248px;
        z-index: 200;
        background:  ${({darkMode}) => darkMode ? "var(--dark-conv-color)" : "#ffffff"};
        transition: all 0.3s ease-in-out;
    }
`;

export default Home;
