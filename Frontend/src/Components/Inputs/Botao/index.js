import styled from 'styled-components';
import {memo} from 'react';

const But = styled.button`
    line-height:50px;
    width:100%;
    margin-top:20px;
    background:${props=>props.cor};
    border:none;
    font-size:1em;
    font-weight:600;
    border-radius:5px;
    color:${props=>props.texto};
    transition:background .3s ease-in-out,border .3s ease-in-out;

    &:hover
    {
        background:black;
        color:white !important;
        border-bottom:solid 0px black;
        border-right:solid 0px black;
    }
`;
function Botao({cor,texto,children,disabled,type,onClick})
{
    return(
        <But onClick={onClick || undefined} type={type || 'submit'} className={`btn ${disabled && 'disabled'}`} cor={cor} texto={texto}>{children}</But>
    );
}

export default memo(Botao);