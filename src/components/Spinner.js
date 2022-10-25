import styled from "styled-components";

const Spinner = ({width=40}) => {
return (
    <Wrapper size={width}>
        <div className="loader"></div>
    </Wrapper>
); 
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5rem;

    .loader {
    width: 40px;
    height: 40px;
    border: 4px solid var(--primary-color);
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 0.7s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
`;

export default Spinner;