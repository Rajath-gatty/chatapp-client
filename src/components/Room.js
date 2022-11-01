import { AccountCircle } from "@material-ui/icons";
import styled from "styled-components";

function Room({room,handleChatOpen,darkMode}) {
    return (
        <Wrapper darkMode={darkMode}>
            <div className="room__wrapper" onClick={handleChatOpen}>
                <div className="avatar">
                    {room.profileUrl?
                    <img src={room.profileUrl} alt="profile" className="img__sidebar"/>:
                    <AccountCircle style={{ fontSize: 70 }} />}
                </div>
                <div className="room__content">
                    <h2 className="room__title">{room.name}</h2>
                    <p className="latest__messages">{room.username}</p>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.article`
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.1); */
    cursor: pointer;

    :hover {
        background: ${({darkMode}) => darkMode ? "#2A3942" : "var(--grey-color)"};
    }

    .img__sidebar {
        width:55px;
        height: 55px;
        border-radius: 50%;
        object-fit: cover;
        margin:0.25rem 0.5rem;
    }

    .room__wrapper {
        display: flex;
        gap: 0.75rem;
        align-items: center;
    }

    .room__content h2 {
        color: #333;
        font-weight: 400;
        font-size: 18px;
        color: ${({darkMode}) => darkMode ? "#ffffff" : "#333333"};
    }
    .room__content p {
        color: #333;
        opacity: 0.9;
        font-size: 14px;
        line-height: 1.5;
        color: ${({darkMode}) => darkMode ? "#ffffff" : "#333333"};
    }
    .room__content {
        width: 90%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 1.15rem 0.15rem;
        border-bottom: 1px solid ${({darkMode}) => darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"};
        margin-right: 1rem;
    }

    .avatar {
        padding-right: 0.5rem;
        padding-left: 1rem;
    }

    .avatar svg {
        opacity: 0.3;
        padding-right: 0.25rem;
    }
`;

export default Room;
