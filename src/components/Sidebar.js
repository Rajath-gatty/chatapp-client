import React,{useState,useEffect} from "react";
import {
    AccountCircle,
    Chat as ChatIcon,
    MoreVert,
    Search,
} from "@material-ui/icons";
import styled from "styled-components";
import { IconButton,MenuItem,Menu} from "@material-ui/core";
import Spinner from "../components/Spinner";
import {useGlobalContext} from "../Context/Context";
import Room from "./Room";
import axios from "axios";

function Sidebar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [loading,setLoading] = useState(false);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const {user,openProfileSidebar,openNewChatSidebar,logout,openSelectedChat,darkMode,conversation,setConversation} = useGlobalContext();

    useEffect(() => {
        const getConversation = async () => {
            try {
                setLoading(true);
                const res = await axios.post("api/user/conversation");
                setLoading(false);
                setConversation(res.data);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        getConversation();
    },[]);

    return (
        <Wrapper darkMode={darkMode}>
            <div className="sidebar__wrapper">
            <header className="sidebar__header">
                <div className="avatar">
                    <IconButton onClick={openProfileSidebar}>
                        {user.profileUrl?
                        <img src={user.profileUrl} alt="profile" className="img"/>:
                        <AccountCircle style={{ fontSize: 40 }} />}
                    </IconButton>
                </div>
                <div className="icons">
                    <IconButton
                    onClick={openNewChatSidebar}
                    >
                    <ChatIcon />
                    </IconButton>
                    <IconButton 
                        size="small"
                        aria-describedby="menu"
                        aria-controls={open ? 'menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                    <MoreVert />
                    </IconButton>
                        <Menu
                            id="menu"
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            onClick={handleClose}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                        >
                            <MenuItem ><span onClick={openNewChatSidebar}>New Chat</span></MenuItem>
                            <MenuItem><span onClick={logout}>Logout</span></MenuItem>
                        </Menu>
                </div>
            </header>
            <section className="search-wrapper">
                <div className="input-wrapper">
                    <Search style={{ fontSize: 20 }} />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search or start new chat"
                    />
                </div>
            </section>
            </div>                                   
            {/* Chat Room Section */}
            <div className="room__container">
                {loading?<Spinner/>:conversation.map(chat => {
                   return <Room 
                    key={chat._id} 
                    darkMode={darkMode}
                    room={chat.participants[0]} 
                    handleChatOpen={() => openSelectedChat({...chat.participants[0],_id:chat._id},false)}
                    />
                })}
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    flex: 0.3;
    border-right: 1px solid ${({darkMode}) => darkMode ? "rgba(255,255,255,0.05)" : "#ccc"};
    height: 100vh;
    background-color:  ${({darkMode}) => darkMode ? "var(--dark-conv-color)" : "#fcfcfc"};

    .sidebar__wrapper {
        position: sticky;
        top: 0;
        overflow: hidden;
        z-index: 100;
    }

    .img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .sidebar__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: ${({darkMode}) => darkMode ? "var(--dark-grey-color)" : "var(--grey-color)"}
    }

    .room__container {
        max-height: 83%;
        overflow-y: auto;

        ::-webkit-scrollbar {
        width: 5px;
        }

        ::-webkit-scrollbar-track {
        background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
        background: #ccc;
        }
        
        ::-webkit-scrollbar-thumb:hover {
        background: #a3a3a3;
        }
    }

    .avatar .MuiSvgIcon-root {
        color: #919191;
        opacity: 0.4;
    }
    .icons {
        margin-right: 10px;
    }

    .icons .MuiSvgIcon-root {
        color: #919191;
    }

    .search-wrapper {
        background-color: ${({darkMode}) => darkMode ? "var(--dark-conv-color)" : "var(--grey-color)"};
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .search-wrapper .MuiSvgIcon-root {
        color: #919191;
    }
    .input-wrapper input {
        border: none;
        padding: 5px;
        margin-left: 2.7rem;
        outline: none;
        background: ${({darkMode}) => darkMode ? "var(--dark-grey-color)" : "#ffffff"};
    }
    .input-wrapper input ::placeholder {
        opacity: 1;
    }

    .input-wrapper {
        background: ${({darkMode}) => darkMode ? "var(--dark-grey-color)" : "#ffffff"};
        border-radius: 25px;
        padding: 5px;
        margin: 0.35rem 0.5rem;
        position: relative;
    }
    .input-wrapper .MuiSvgIcon-root {
        margin-right: 1.5rem !important;
        position: absolute;
        top: 8px;
        left: 10px;
    }
`;

export default Sidebar;
