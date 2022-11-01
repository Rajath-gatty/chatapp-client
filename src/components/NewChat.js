import MultiSidebar from "./MultiSidebar";
import {useGlobalContext} from "../Context/Context";
import {useState,useEffect} from "react";
import styled from "styled-components";
import Room from "./Room";
import axios from "axios";

const NewChat = () => {
    const [search,setSearch] = useState("");
    const [users,setUsers] = useState([]);

    const {closeNewChatSidebar,openSelectedChat,selectedChat,darkMode} = useGlobalContext();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.post("api/user/getUsers",{search});
                console.log(res);
                setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        if(search.length > 0){
            getUsers();
        } else {
            setUsers([]);
        }
    },[search]);


    return(
        <MultiSidebar heading="New Chat" onClose={closeNewChatSidebar}>
            <Wrapper darkMode={darkMode}>
                <div className="chat__input__wrapper">
                    <input 
                    className="chat__input" 
                    type="text" 
                    placeholder="Search username" 
                    onChange={(e) => setSearch(e.target.value)} 
                    />
                </div>
                <div className="chat__room__container">
                    {users.map(user => (
                        <Room 
                        key={user._id} 
                        darkMode={darkMode}
                        room={user} 
                        handleChatOpen={() => {
                            if(user._id!==selectedChat.room._id) {
                               return openSelectedChat({...user},true);
                            }
                        }}
                        />
                    ))}
                </div>
            </Wrapper>
        </MultiSidebar>
    )
}

const Wrapper = styled.div`
    padding:1rem;
        ::-webkit-scrollbar {
        width: 5px;
        }

        ::-webkit-scrollbar-track {
        background: #f2f2f2;
        }
        
        ::-webkit-scrollbar-thumb {
        background: #8a8a8a;
        }
        
        ::-webkit-scrollbar-thumb:hover {
        background: #a3a3a3;
        }
        overflow: auto !important;

    .chat__input {
        width: 100%;
        padding: 0.75rem;
        background-color: ${({darkMode}) => darkMode ? "var(--dark-grey-color)" : "var(--grey-color)"};
        color: ${({darkMode}) => darkMode ? "#ffffff" : "#333333"};
        border: none;
        border-radius: 6px;
        outline: none;
    }

    .chat__room__container {
        margin-top: 1rem;
        overflow: auto;
    }
`;

export default NewChat;