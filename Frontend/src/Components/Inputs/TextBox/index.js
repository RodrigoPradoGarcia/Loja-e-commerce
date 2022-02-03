import React, { memo } from "react";
import {useState,useEffect} from 'react';
import styled from 'styled-components';


const Input = styled.input`
    margin-top:25px;
    font-size:1em;
    border:solid 4px rgb(167, 167, 204) !important;

    &.is-invalid
    {
        border:solid 4px red !important;
    }

    &.is-valid
    {
        border:solid 4px green !important;
    }
`;
const TextBox = ({value,placeholder,id,name,onchange,validateFunction,validFeed,invalidFeed,type})=>
{
    const [valor,setValor] = useState("");
    const [valid,setValid] = useState("");

    useEffect(()=>{
        onchange(name,valor);
        validateFunction(valor,setValid);
    },[valor]);

    return(
        <>
            <Input placeholder={placeholder} id={id} className={`form-control ${valid}`} type={type} name={name} value={value} onChange={(event)=>setValor(event.target.value)} />
            {
                valid==='is-valid' &&
                <div style={{fontSize:'1em'}} className='valid-feedback'>
                    {validFeed}
                </div>
            }
            
            {
                valid==='is-invalid' &&
                <div style={{fontSize:'1em',maxWidth:'300px'}} className='invalid-feedback'>
                    {invalidFeed}
                </div>
            }

        </>
    );
}

export default memo(TextBox);