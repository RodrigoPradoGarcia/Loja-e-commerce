//libs
import styled from "styled-components";
import {useState,useEffect} from 'react';
import {memo} from 'react';

//services
import Mock from "../../services/mock";

//components
import LoadingScreen from "../Loading";
import Paginacao from "../Pagination";
import Produto from "../Produto/Produto";
import InfoProduto from "../Produto/InfoProduto";

const fundoRoupas = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
const FundoDiv = styled.div`
    height:70vh;
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    background:linear-gradient(#000000CC,#000000CC), url('${fundoRoupas}');
    background-attachment:fixed;
`;
const PesqProd = styled.input`
    outline:none;
    padding:10px 30;
    font-size:1em;
    width:80%;
    max-width:800px;
`;

const TituloLogo = styled.h1`
    font-weight:900;
    font-size:2.5em;
    font-family:'Pacifico',cursive;
    margin-bottom:50px;
    color:white;
`;

const BotaoPesquisa = styled.button`
    height:50px;
    width:50px;
    border:none;
`;
function Catalogo({user})
{
    const [itemsCatalogo,setItemsCatalogo] = useState([]);
    const [loading,setLoading] = useState(false);

    const [pagina,setPagina] = useState(1);
    const [totPaginas,setTotPaginas] = useState(1);

    const [pesq,setPesq] = useState("");
    const [semResultados,setSemResultados] = useState(false);

    const [selprod,setSelprod] = useState("");

    const obterProdutos = async ()=>{
        setLoading(true);
        const obj = await Mock.getAllProducts(1,1);
        const paginasVisitadas = [];
        const items = [];
        while(items.length<10)
        {
            let random = Math.floor(Math.random()*(obj.lastPage+1-1)+1);
            let obj2 = await Mock.getAllProducts(random,1);
            if(paginasVisitadas.includes(obj2.currentPage))
            {
                continue;
            }
            else
            {
                paginasVisitadas.push(obj2.currentPage);
                items.push(obj2.rows[0]);
            }
        }
        setLoading(false);
        setItemsCatalogo(items);
    }

    const lerProdutos = async ()=>{
        let {rows,currentPage,lastPage} = await Mock.getAllProducts(pagina,10);
        setItemsCatalogo(rows);
        setPagina(currentPage);
        setTotPaginas(lastPage);
    }

    const buscar = async (event)=>{
        event.preventDefault();
        if(pesq==="")
        {
            setSemResultados(false);
            lerProdutos();
            return;
        }
        else
        {
            setLoading(true);
            let obj = await Mock.runScript("select * from product where name like? or category like? or description like?",[`%${pesq}%`,`%${pesq}%`,`%${pesq}%`],"select count(*) from product where name like? or category like? or description like?",[`%${pesq}%`,`%${pesq}%`,`%${pesq}%`],1,10);
            if(obj.rows.length===0)
            {
                setLoading(false);
                setSemResultados(true);
            }
            else
            {
                setSemResultados(false);
                setItemsCatalogo(obj.rows);
                setPagina(obj.currentPage);
                setTotPaginas(obj.lastPage);
                setLoading(false);
            }
        }
    };

    useEffect(async()=>{
        await lerProdutos();
    },[pagina]);

    return(
    <>
        {
            selprod === '' &&
            
            <>
                <FundoDiv>
                    <div className='d-flex flex-column align-items-center'>   
                        <TituloLogo>Fashonei</TituloLogo>
                        <form className='d-flex' onSubmit={(event)=>buscar(event)}>
                            <PesqProd placeholder='procurar...' value={pesq} onChange={(e)=>setPesq(e.target.value)} className='form-control rounded-0' style={{maxWidth:'60vw'}}/>
                            <BotaoPesquisa type='submit'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </BotaoPesquisa>
                        </form>
                    </div>  
                </FundoDiv>
                {
                    semResultados &&
                    <div className='my-5 text-muted text-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                        <h2>Sem resultados para a busca</h2>
                    </div>
                    ||
                    loading && <LoadingScreen><span className='spinner spinner-border text-secondary me-3'></span>Carregando</LoadingScreen>
                    ||
                    <div style={{background:"linear-gradient(#FFFFFFDD,#FFFFFFDD),url('./img/Fundo.webp')",backgroundAttachment:'Fixed'}}>
                        <center><h1 className='py-3'>Produtos</h1></center>
                        <div className='m-auto d-flex flex-wrap justify-content-center'>
                            {itemsCatalogo.map((item,index)=><Produto key={index} objprod={item} onClick={(prod)=>setSelprod(prod)} nome={item.name} preco={item.price} imagem={item.image} />)}
                        </div>
                        <Paginacao pagina={pagina} totPaginas={totPaginas} setPagina={setPagina} />
                    </div>
                }
            </> 

            || <InfoProduto user={user} {...selprod} onClick={(prod)=>setSelprod(prod)} />
        }
    </>
    );
}

export default memo(Catalogo);