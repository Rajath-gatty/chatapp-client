import { AUTHENTICATED,
LOGOUT, 
OPEN_PROFILE_SIDEBAR, 
CLOSE_PROFILE_SIDEBAR,
OPEN_NEWCHAT_SIDEBAR,
CLOSE_NEWCHAT_SIDEBAR,
OPEN_NEWGROUP_SIDEBAR,
CLOSE_NEWGROUP_SIDEBAR,
OPEN_SELECTED_CHAT,
UPDATE_SELECTED_CHAT,
CHANGE_PROFILE_URL,
SET_CONVERSATION_ID,
OPEN_RIGHT_SIDEBAR,
CLOSE_RIGHT_SIDEBAR,
SET_THEME,
TOGGLE_THEME
} from "./actions";

const reducer = (state, action) => {
    if (action.type === AUTHENTICATED) {
        return { ...state, isAuth: true, user:action.payload.user,token:action.payload.token };
    }
    if (action.type === LOGOUT) {
        return { ...state, isAuth: false, token: null, user: null, selectedChat: {room:{_id:null},newChat:true} };
    }
    if (action.type === OPEN_PROFILE_SIDEBAR) {
        return { ...state, profileSidebarOpen: true };
    }
    if (action.type === CLOSE_PROFILE_SIDEBAR) {
        return { ...state, profileSidebarOpen: false };
    }
    if (action.type === OPEN_NEWCHAT_SIDEBAR) {
        return { ...state, newChatSidebarOpen: true };
    }
    if (action.type === CLOSE_NEWCHAT_SIDEBAR) {
        return { ...state, newChatSidebarOpen: false };
    }
    if (action.type === OPEN_NEWGROUP_SIDEBAR) {
        return { ...state, newGroupSidebarOpen: true };
    }
    if (action.type === CLOSE_NEWGROUP_SIDEBAR) {
        return { ...state, newGroupSidebarOpen: false };
    }
    if (action.type === OPEN_RIGHT_SIDEBAR) {
        return { ...state, rightSidebarOpen: true };
    }
    if (action.type === CLOSE_RIGHT_SIDEBAR) {
        return { ...state, rightSidebarOpen: false };
    }
    if (action.type === OPEN_SELECTED_CHAT) {
        return { ...state, selectedChat: {room:action.payload.room,newChat:action.payload.newChat,doubleClicked:action.payload.room._id===state.selectedChat.room._id} };
    }
    if (action.type === UPDATE_SELECTED_CHAT) {
        return { ...state, selectedChat:{room:{...state.selectedChat.room},newChat:false} };
    }
    if (action.type === CHANGE_PROFILE_URL) {
        return { ...state, user:{...state.user,profileUrl:action.payload} };
    }
    if (action.type === SET_CONVERSATION_ID) {
        return { ...state, selectedChat:{room:{...state.selectedChat.room,_id:action.payload},newChat:state.selectedChat.newChat} };
    }
    if (action.type === SET_THEME) {
        return { ...state, darkMode: action.payload };
    }
    if (action.type === TOGGLE_THEME) {
        localStorage.setItem("darkMode",!state.darkMode);
        return { ...state, darkMode: !state.darkMode };
    }
};

export default reducer;
