import styled from "styled-components";

const Imageprod = styled.img`
    width:90%;
    max-width:360px;
    display:block;
    margin:auto;
    max-height:200px;
    object-fit:contain;
`;

const Preco = styled.h3`
    ::before
    {
        content:"R$";
        margin-right:10px;
    }
`;

const BotaoProduto = styled.button`
    border:none;
    display:block;
    margin:auto;
    margin-top:20px;
    padding:10px 20px;
    font-size:1em;
    font-weight:600;
    box-shadow:4px 4px 4px #00000088;
    border-radius:5px;
    background:${props=>props.cor?props.cor:'rgb(58, 156, 58)'};
    color:white;
    transition:background .3s ease-in-out;

    :hover
    {
        background:black;
    }
`;

export {Imageprod,Preco,BotaoProduto};