import styled from "styled-components";

const Message = ({text,date,own,darkMode}) => {
    return (
        <Wrapper darkMode={darkMode}>
            <div className={own?'message__wrapper own':'message__wrapper'}>
                <span className="text">{text}</span>
                <span className="sent__time">{
                    new Intl.DateTimeFormat("en", {
                        hour: "numeric",
                        minute: "numeric",
                        timeZone: "IST"
                      }).format(new Date(date))
                }</span>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.span`
    margin-top: 0.25rem;
    display: flex;
    flex-direction: column;
    
    .message__wrapper {
        background:${({darkMode}) => darkMode ? "var(--dark-grey-color)" : "#ffffff"};
        padding: 0.25rem 0.5rem;
        border-radius: 0px 10px 10px 10px;
        display: flex;
        gap: 0.75rem;
        width: fit-content;
        max-width: 70%;
    }

    .own {
        align-self: flex-end;
        background-color: ${({darkMode}) => darkMode ? "var(--dark-sent-chat-color)" : "var(--sent-chat-color)"};
        border-radius: 10px 10px 0px 10px;
    }

    .text {
        padding-left: 0.25rem;
        font-size: 15px;
        align-self: center;
        color:${({darkMode}) => darkMode ? "#ffffff" : "#363636"};
    }

    .sent__time {
        text-align: right;
        margin-right: 0.25rem;
        font-size: 11px;
        margin-top: 1rem;
        color: #a6a6a6;
    }
    `;

export default Message;