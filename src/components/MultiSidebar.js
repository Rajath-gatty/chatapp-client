import React from "react";
import styled from "styled-components";
import { ArrowBack } from "@material-ui/icons";
import { useGlobalContext } from "../Context/Context";

const MultiSidebar = ({heading,onClose,children}) => {
    const {darkMode} = useGlobalContext();
    return (
        <Wrapper darkMode={darkMode}>
            <div className="multiSidebar__wrapper">
                <span className="multiSidebar__hdng"><ArrowBack onClick={onClose}/> <h1>{heading}</h1></span>
                {children}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`

    .multiSidebar__hdng {
        background-color: ${({darkMode}) => darkMode ? "var(--dark-sent-chat-color)" : "var(--primary-color)"};
        display: flex;
        align-items: center;
        gap: 1.5rem;
        padding: 1.5rem 1rem;
        padding-top: 4rem;
        color: #fff;
    }

    .multiSidebar__hdng svg {
        cursor:pointer;
        color: #fff;
    }

    .multiSidebar__hdng h1 {
        font-size: 1.5rem;
        font-weight: 500;
    }

    .multiSidebar__wrapper{
        display: flex;
        flex-direction: column;
    }
`;

export default MultiSidebar;