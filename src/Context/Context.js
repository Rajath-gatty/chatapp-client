import React, { useContext, useReducer } from "react";
import { LOGOUT, 
AUTHENTICATED, 
OPEN_PROFILE_SIDEBAR, 
CLOSE_PROFILE_SIDEBAR,
OPEN_NEWCHAT_SIDEBAR,
CLOSE_NEWCHAT_SIDEBAR,
OPEN_SELECTED_CHAT,
UPDATE_SELECTED_CHAT,
CHANGE_PROFILE_URL,
SET_CONVERSATION_ID,
OPEN_RIGHT_SIDEBAR,
CLOSE_RIGHT_SIDEBAR,
SET_THEME,
TOGGLE_THEME,
SET_CONVERSATIONS
} from "../Reducer/actions";
import reducer from "../Reducer/reducer";

const stateContext = React.createContext();

const initialState = {
    isAuth: false,
    profileSidebarOpen: false,
    newChatSidebarOpen: false,
    rightSidebarOpen: false,
    selectedChat: {room:{_id:null},newChat:true},
    darkMode: false,
    conversation:[]
};

function Context({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setAuthenticated = (user,token) => {
        dispatch({ type: AUTHENTICATED,payload:{user,token}});
    };

    const logout = () => {
        localStorage.removeItem("user");
        dispatch({ type: LOGOUT });
    };

    const openProfileSidebar = () => {
        dispatch({ type: OPEN_PROFILE_SIDEBAR });
    }

    const closeProfileSidebar = () => {
            dispatch({ type: CLOSE_PROFILE_SIDEBAR });
    }
    
    const openNewChatSidebar = () => {
        dispatch({ type: OPEN_NEWCHAT_SIDEBAR });
    }
    const closeNewChatSidebar = () => {
        dispatch({ type: CLOSE_NEWCHAT_SIDEBAR });
    }

    const openSelectedChat = (room,bool) => {
        dispatch({ type: OPEN_SELECTED_CHAT,payload:{room,newChat:bool}});
    }
    const updateSelectedChat = () => {
        dispatch({ type: UPDATE_SELECTED_CHAT});
    }
    const setConversationId = (id) => {
        dispatch({ type: SET_CONVERSATION_ID,payload:id});
    }
    const changeProfileUrl = (url) => {
        dispatch({ type: CHANGE_PROFILE_URL,payload:url});
    }
    const openRightSidebar = () => {
        dispatch({ type: OPEN_RIGHT_SIDEBAR});
    }
    const closeRightSidebar = () => {
        dispatch({ type: CLOSE_RIGHT_SIDEBAR});
    }

    const setThemeMode = (mode) => {
        dispatch({ type: SET_THEME, payload:mode});
    }

    const toggleThemeMode = () => {
        dispatch({ type: TOGGLE_THEME});
    }
    
    const setConversation = (obj) => {
        dispatch({ type: SET_CONVERSATIONS,payload:obj});
    }

    return (
        <stateContext.Provider
            value={{
                ...state,
                setAuthenticated,
                logout,
                openProfileSidebar,
                closeProfileSidebar,
                openNewChatSidebar,
                closeNewChatSidebar,
                openSelectedChat,
                updateSelectedChat,
                changeProfileUrl,
                setConversationId,
                openRightSidebar,
                closeRightSidebar,
                setThemeMode,
                toggleThemeMode,
                setConversation
            }}
        >
            {children}
        </stateContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(stateContext);
};

export default Context;
