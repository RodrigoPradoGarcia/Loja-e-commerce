import {memo} from 'react';

function Paginacao({pagina,totPaginas,setPagina})
{
    return(
        <>
           <center className='mt-5'>
                <ul className='pagination d-flex flex-column flex-md-row justify-content-center pagination-lg' style={{maxWidth:'150px'}}>
                    <li className={`page-item ${pagina===1?'disabled':''}`} onClick={()=>{setPagina(v=>v===1?1:v-1)}}>
                        <div style={{cursor:'pointer'}} className='page-link'>Anterior</div>
                    </li>
                    { (
                        function(totPaginas,pagina)
                        {
                            let arr = [];
                            let index = pagina % 5;
                            let is;
                            switch(index)
                            {
                                case 0:
                                    is = [pagina-4,pagina-3,pagina-2,pagina-1,pagina];
                                    for(let i of is)
                                    {
                                        if(i<=totPaginas)
                                        arr.push(<div style={{cursor:'pointer'}} onClick={()=>setPagina(i)} key={`paginacao-${i}`} className={`page-item ${i===pagina?'active':''}`}><div className='page-link'>{i}</div></div>);
                                    }
                                    break;
                                case 1:
                                    is = [pagina,pagina+1,pagina+2,pagina+3,pagina+4];
                                    for(let i of is)
                                    {
                                        if(i<=totPaginas)
                                        arr.push(<div style={{cursor:'pointer'}} onClick={()=>setPagina(i)} key={`paginacao-${i}`} className={`page-item ${i===pagina?'active':''}`}><div className='page-link'>{i}</div></div>);
                                    }
                                    break;
                                case 2:
                                    is = [pagina-1,pagina,pagina+1,pagina+2,pagina+3];
                                    for(let i of is)
                                    {
                                        if(i<=totPaginas)
                                        arr.push(<div style={{cursor:'pointer'}} onClick={()=>setPagina(i)} key={`paginacao-${i}`} className={`page-item ${i===pagina?'active':''}`}><div className='page-link'>{i}</div></div>);
                                    }
                                    break;
                                case 3:
                                    is = [pagina-2,pagina-1,pagina,pagina+1,pagina+2];
                                    for(let i of is)
                                    {
                                        if(i<=totPaginas)
                                        arr.push(<div style={{cursor:'pointer'}} onClick={()=>setPagina(i)} key={`paginacao-${i}`} className={`page-item ${i===pagina?'active':''}`}><div className='page-link'>{i}</div></div>);
                                    }
                                    break;
                                case 4:
                                    is = [pagina-3,pagina-2,pagina-1,pagina,pagina+1];
                                    for(let i of is)
                                    {
                                        if(i<=totPaginas)
                                        arr.push(<div style={{cursor:'pointer'}} onClick={()=>setPagina(i)} key={`paginacao-${i}`} className={`page-item ${i===pagina?'active':''}`}><div className='page-link'>{i}</div></div>);
                                    }
                                    break;  
                            }
                            return arr;
                        }
                    )(totPaginas,pagina) }
                    <li className={`page-item ${pagina===totPaginas?'disabled':''}`} onClick={()=>setPagina(v=>v===totPaginas?totPaginas:v+1)}>
                        <div style={{cursor:'pointer'}} className='page-link'>Próximo</div>
                    </li>
                </ul>
            </center>
            <center className='pb-5'><h6>Página<input placeholder={pagina} onChange={(event)=>setPagina(event.target.value===""?pagina:event.target.value<1?1:event.target.value>totPaginas?totPaginas:event.target.value)} className='form-control d-inline ms-2' style={{width:'50px'}} /> de {totPaginas}</h6></center>
        </>
    );
}

export default memo(Paginacao);