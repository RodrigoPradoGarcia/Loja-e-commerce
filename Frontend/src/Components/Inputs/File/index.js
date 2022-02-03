import styled from 'styled-components';
import {useState,useEffect} from 'react';
import {memo} from 'react';

const InpFile = styled.input`
    border:solid 4px rgb(167, 167, 204) !important;
    margin-top:25px !important;
`;

function File({onchange,name})
{
    const [val,setVal] = useState();

    useEffect(()=>{
        onchange(name,val);
    },[val]);

    return(
        <>
            <InpFile className='mt-3 form-control' name={name} type='file' onChange={(ev)=>setVal(ev.target.value)} />
        </>
    );
}

export default memo(File);