import styled from "styled-components";
import img from "../images/chat-img.png";

const ChatBanner = () => {
    return (
            <Wrapper>
                <img src={img} alt="banner" className="chat__banner" />
                <h2>Click on the Conversation to Start Chat</h2>
            </Wrapper>
    )
}

const Wrapper = styled.div`
    padding-top: 2rem;
    display: flex;
    width: 100%;
    height: 100vh;
    flex: 0.7;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .chat__banner {
        width: 400px;
        margin-top: -4rem;
    }

    h2 {
        color: #333;
    }
`;

export default ChatBanner;
