import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export default createGlobalStyle`
    ${normalize}

    * {
        font-family: "Courier New", Courier;
        box-sizing: border-box;
        text-decoration: none;
    }

    html {
        font-size: 62.5%;
    }

    body { 
        height: calc(100vh);
    }

    .root {
        height: 100%;
        background-color: #133368;
        color: white;
        overflow-y: scroll;
    }
    
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    
    a:hover {
        text-decoration: none;
    }
    
    button {
        cursor: pointer;
    }
    
    h1 {
        font-size: 2.8rem;
    }
    
    h2 {
        font-size: 2.2rem;
    }
    
    h3 {
        font-size: 1.8rem;
    }
    
    p {
        font-size: 1.4rem;
        margin-bottom: 1rem;
    }
`;
