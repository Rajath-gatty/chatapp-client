import {useEffect,useState,useRef} from "react";
import {
    AccountCircle,
    Search,
    MoreVert,
    Mic,
    SentimentVerySatisfied,
    AttachFile,
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import styled from "styled-components";
import Message from "./Message";
import {useGlobalContext} from "../Context/Context";
import axios from "axios";
import Spinner from "../components/Spinner";
import {io} from "socket.io-client";

let socket;
function Chat() {
    const [message,setMessage] = useState("");
    const [messages,setMessages] = useState([]);
    const [socketCon,setSocketCon] = useState(false);
    const [typing,setTyping] = useState(false);
    const [loading,setLoading] = useState(false);

    const scrollRef = useRef(null);
    const {selectedChat,user,updateSelectedChat,setConversationId,darkMode} = useGlobalContext();
    
    useEffect(() => {
        socket = io(axios.defaults.baseURL);
        socket.emit("join",{userId:user._id,roomId:selectedChat.room._id});
        socket.on("connected",(userId) => {
            console.log("connected",userId);
            setSocketCon(true);
        })

        socket.on('send-message',data => {
            console.log(data);
            setMessages(prevState => [...prevState,data]);
        })


        return () => {
            socket.close();
        }
    },[selectedChat.room._id,user._id])

    useEffect(() => {
        if(!socketCon) return;
        let timeout;
        socket.on('isTyping',() => {
            setTyping(true);
            timeout = setTimeout(() => {
                setTyping(false);
            }, 2000);
        })
        return () => clearTimeout(timeout);
    })

    const handleMessageChange = (e) => {
        if(!socketCon) return;
        socket.emit('typing',selectedChat.room._id);
        setMessage(e.target.value)
    }

    useEffect(() => {
        setMessages([]);
        console.log('UseEffect Called to Fetch messages');
        const fetchMessages = async () => {
            try {
                setLoading(true);
                console.log('Fetching Messages...',selectedChat.room._id);
                const res = await axios.post("api/user/messages",{conversationId:selectedChat.room._id});
                setLoading(false);
                setMessages(res.data);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        if(!selectedChat.newChat){
            fetchMessages();
        }
    },[selectedChat.room._id]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior:"smooth"});
    },[messages])

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        try {
            if(message.trim().length<=0){
                return;
            } else {
                const data = {
                    id:selectedChat.room._id,
                    content:message,
                    newChat:selectedChat.newChat
                }
                const res = await axios.post('api/user/postMessage',data);

                if(res.status===200) {
                        if(selectedChat.newChat){
                            updateSelectedChat();
                            setConversationId(res.data._id);
                        }
                }
                setMessage("");
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Wrapper darkMode={darkMode}>
            <div className="chat__header">
                <div className="avatar">
                    <IconButton>
                        {!selectedChat.room.profileUrl?
                        <AccountCircle style={{ fontSize: 40 }} />:
                        <img src={selectedChat.room.profileUrl} alt="profile" className="img"/>}
                    </IconButton>
                </div>
                <div className="room">
                    <h2 className="title">{selectedChat.room?.group?selectedChat.room.groupName:selectedChat.room.name}</h2>
                    {typing&&<p>Typing...</p>}
                    {selectedChat.room?.group&&<p className="members">
                        Rajath, nishan, suhas, jeevan, awais
                    </p>}
                </div>
                <div className="icons">
                    <IconButton>
                        <Search />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <section className="chat__body__wrapper">
              <div className="chat__box_wrapper">
                <div className="chat__body__bg">
                {loading?<Spinner/>:messages.map(msg => {
                    console.log(msg);
                    return <div ref={scrollRef}>
                    <Message 
                    key={msg._id} 
                    darkMode={darkMode}
                    text={msg.content} 
                    date={msg.createdAt}
                    own={msg.senderId===user._id}/>
                </div>
                })
                }
                </div>
                </div>
                <div className="enter__message__Wrapper">
                    <div className="bottom_icons">
                        <IconButton>
                            <SentimentVerySatisfied />
                        </IconButton>
                        <IconButton>
                            <AttachFile />
                        </IconButton>
                    </div>
                    <form onSubmit={handleMessageSubmit}>
                        <input
                            type="text"
                            placeholder="Type a message"
                            name="messageInput"
                            onChange={handleMessageChange}
                            value={message}
                        />
                    </form>
                    <IconButton>
                        <Mic />
                    </IconButton>
                </div>
            </section>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    flex: 0.7;
    height: 100vh;
    overflow: hidden;

    .chat__body__wrapper {
        background: ${({darkMode}) => darkMode ? "#0B141A" : "var(--chat-bg)"};
        position: relative;
        height: 90%;
    }

    .chat__box_wrapper {
        ::-webkit-scrollbar {
        width: 5px;
        }

        ::-webkit-scrollbar-track {
        /* background: #f2f2f2; */
        background:transparent;
        }
        
        ::-webkit-scrollbar-thumb {
        background:${({darkMode}) => darkMode ? "rgba(181, 181, 181,0.2)" : "#8a8a8a"};
        }
        
        ::-webkit-scrollbar-thumb:hover {
        background:  ${({darkMode}) => darkMode ? "var(--dark-grey-color)" : "#a3a3a3"};
        }
        overflow-y: auto;
        max-height: 88%;
        width: 100%;
    }

    .chat__body__bg {
        padding: 10px;
        display: flex;
        flex-direction: column;
        max-width: 850px;
        margin: auto;
        overflow-y: auto;
    }

    .chat__header {
        display: flex;
        align-items: center;
        background: ${({darkMode}) => darkMode ? "var(--dark-grey-color)" : "var(--grey-color)"};
    }

    .img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
    .room {
        flex: 1;
    }
    .room p {
        font-size: 0.8rem;
        color: ${({darkMode}) => darkMode ? "#e8e8e8" : "#a5a5a5"};
    }
    .room h2 {
        font-weight: 500;
        font-size: 17px;
        color: ${({darkMode}) => darkMode ? "#ffffff" : "#333"};
        opacity: 0.95;
    }
    .avatar svg{
        opacity: 0.3;
    }
    .MuiSvgIcon-root {
        color: #919191 !important;
    }
    .enter__message__Wrapper {
        display: flex;
        position: absolute;
        bottom: 0;
        width: 100%;
        background: ${({darkMode}) => darkMode ? "var(--dark-grey-color)" : "#f0f0f0"};
        padding: 0.7rem 0.35rem;
    }
    .enter__message__Wrapper form {
        flex: 1;
    }
    .enter__message__Wrapper input {
        border: none;
        border-radius: 25px;
        padding-left: 1rem;
        outline: none;
        width: 100%;
        height: 100%;
        background: ${({darkMode}) => darkMode ? "#2A3942" : "#ffffff"};
        color: ${({darkMode}) => darkMode ? "#ffffff" : "#333"};
    }
`;

export default Chat;
