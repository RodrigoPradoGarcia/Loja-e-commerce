//libs
import styled from "styled-components";
import {useState,useEffect} from 'react';
import Mock from "../../../services/mock";
import {memo} from 'react';

//components
import { Imageprod,BotaoProduto,Preco } from "../StyledComponents";
import Contador from "../../Contador";
import ReviewsProduto from "../../ReviewsProduto";

const BtnVoltar = styled.button`
    borer:non 
`;

function InfoProduto({user,uuid,name,price,image,description,onClick})
{
    const [reviews,setReviews] = useState([]);

    const [nota,setNota] = useState(0);
    const [numAvaliacoes,setNumAvaliacoes] = useState(0);
    const [noCarrinho,setNoCarrinho] = useState('carregando');

    const [itemCarrinho,setItemCarrinho] = useState({});

    const getReviews = async ()=>{
        let {rows,currentPage,lastPage} = await Mock.runScript('select * from review where product_uuid=?',[uuid],'select count(*) from review where product_uuid=?',[uuid],1,100);
        setReviews(rows);
    };

    useEffect(async()=>{
        await getReviews();

        let {rows,currentPage,lastPage} = await Mock.runScript("select avg(stars) as nota from review where product_uuid=?",[uuid],"select count(*) from review where product_uuid=?",[uuid],1,1);
        setNota(rows[0].nota?.toFixed(1) || 0);

        let obj2 = await Mock.runScript("select count(stars) as numero from review where product_uuid=?",[uuid],"select count(*) from review where product_uuid=?",[uuid],1,1);
        setNumAvaliacoes(obj2.rows[0].numero);
        estaNoCarrinho();
    },[uuid]);

    const estaNoCarrinho = async ()=>{
        let cartItem = await Mock.getSpecificCartItem(user.uuid,uuid);
        
        if(!cartItem)
        {
            setNoCarrinho(false);
        }
        else
        {
            setItemCarrinho(cartItem);
            setNoCarrinho(true);
        }
    };

    const addCarrinho = async ()=>{
        let result = await Mock.postCartItem({product_uuid:uuid,user_uuid:user.uuid,amount:1});
        
        estaNoCarrinho();
    };

    const deleteCarrinho = async ()=>{
        let mensagem = await Mock.deleteCartItem(itemCarrinho);
        
        setItemCarrinho({});
        setNoCarrinho(false);
    };

    useEffect(async()=>{
        if(itemCarrinho?.amount)
        {
            let mensagem = await Mock.putCartItem(itemCarrinho);
        }
    },[itemCarrinho]);

    return(

    <>
        <h3 className='text-center my-3'>
            <div className='btn btn-secondary hadow-lg text-light d-block m-auto my-3' style={{maxWidth:'200px',fontSize:'1.2em'}} onClick={()=>onClick("")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="me-3 bi bi-arrow-return-left" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                </svg>
                voltar
            </div>
            {name}
        </h3>
        <h3 className='text-dark text-center mt-4'>
            {`Nota:${nota}\u2605`}
        </h3>
        <h3 className='text-dark text-center mb-4'>
            {`Avaliações:${numAvaliacoes}`}
        </h3>
        <div className='row w-100'>
            <div className='col-0 col-md-3'></div>
            <div className='col-12 col-md-3'><Imageprod src={image} /></div>
            <div className='col-12 col-md-4 align-items-center d-flex flex-column justify-content-center'>
                <h6 className='mt-4' style={{fontWeight:'900'}}>Descrição:</h6>
                <h6 className='text-center my-3'>{description}</h6>
                <Preco className='card-text text-success'>{price?.toFixed(2)}</Preco>
                {
                    noCarrinho===true &&
                    <div>  
                        <BotaoProduto cor='#FF3333' onClick={()=>deleteCarrinho()} >
                            Remover do carrinho
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="ms-2 bi bi-dash-square" viewBox="0 0 16 16">
                              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                            </svg>
                        </BotaoProduto>
                        <div className='my-3 d-flex align-items-center'>
                            <h6 className='me-3'>Quantidade: </h6>
                            <Contador callback={(valor)=>setItemCarrinho({...itemCarrinho,amount:valor})} iniState={itemCarrinho?.amount || 1} min={1} max={1/0} />
                        </div>
                        <div className='my-3 d-flex align-items-center'>
                            <h6 className='me-3'>Total a pagar: </h6>
                            <Preco className='card-text text-success'>{(price*itemCarrinho.amount)?.toFixed(2)}</Preco>
                        </div>
                    </div>
                    ||
                    noCarrinho===false &&
                    <BotaoProduto onClick={addCarrinho}>
                        Adicionar ao carrinho
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="ms-2 bi bi-plus-square" viewBox="0 0 16 16">
                          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                    </BotaoProduto>
                    || noCarrinho==='carregando' &&
                    <div></div>
                }
                
            </div>
            <div className='col-0 col-md-3'></div>
        </div>
        <div className='m-auto w-75' style={{maxWidth:'500px'}}>
            <ReviewsProduto user={user} product_uuid={uuid} callback={getReviews} />
        </div>
    </>
    );
}

export default memo(InfoProduto);