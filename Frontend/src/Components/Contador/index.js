import {useState,useEffect} from 'react';
import {memo} from 'react';

function Contador({callback,iniState,min,max})
{
    const [contagem,setContagem] = useState(iniState);

    useEffect(()=>{
        if(contagem<min)
        {
            setContagem(min);
        }
        else if(contagem>max)
        {
            setContagem(max);
        }
        callback(contagem);
    },[contagem]);

    return(
        <>
            <div className='d-flex align-items-center' style={{fontSize:'1em'}}>
                <div className={`btn btn-danger me-3 ${contagem===min&&'disabled'}`} onClick={()=>setContagem(v=>v-1)}>-</div>
                {contagem}
                <div className='btn btn-success ms-3' onClick={()=>{setContagem(v=>v+1)}}>+</div>
            </div>
        </>
    );
}

export default memo(Contador);