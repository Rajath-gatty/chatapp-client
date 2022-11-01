import React from "react";
import styled from "styled-components";

function Nav() {
    return (
        <Wrapper>
            <div className="logo">
                {/* <img src={Logo} width="40" alt="" /> */}
                <h2>Chatapp</h2>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.nav`
    padding: 0.5rem;
    width: 100%;
    gap: 1rem;
    background-color: var(--primary-color);
    h2 {
        color: #fff;
    }
    .logo {
        max-width: 1100px;
        margin: auto;
        display: flex;
        align-items: center;
        gap: 1rem;
    }
`;

export default Nav;
