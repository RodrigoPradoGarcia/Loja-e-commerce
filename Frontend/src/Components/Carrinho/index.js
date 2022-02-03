//libs
import styled from "styled-components";
import {useState,useEffect} from 'react';
import {memo} from 'react';

//serviços
import Mock from "../../services/mock";

//components
import { Preco } from "../Produto/StyledComponents";
import Contador from "../Contador";
import LoadingScreen from '../Loading';

const CartitemImg = styled.img`
    height:100px;
    width:100px;
    margin-right:20px;
    object-fit:cover;
`;
function Carrinho({user})
{
    const [carrinho,setCarrinho] = useState([]);
    const [pagina,setPagina] = useState(0);
    const [totpaginas,setTotPaginas] = useState(0);

    const [loading,setLoading] = useState(false);

    useEffect(async()=>{
        setLoading(true);
        let {rows,currentPage,lastPage} = await Mock.runScript("select * from cart_item where user_uuid=?",[user.uuid],"select count(*) from cart_item where user_uuid=?",[user.uuid],1,100);
        
        let rowsProduct =[...rows];
        for(let item of rowsProduct)
        {
            let product = await Mock.getSpecificProduct(item.product_uuid);
            item.product=product;
        }
        setCarrinho(rowsProduct);
        setLoading(false);
    },[]);

    const putCartItem = async (cart_item,quantidade)=>{
        let carrinhoTemp = [...carrinho];
        carrinhoTemp[cart_item].amount=quantidade;
        setCarrinho(carrinhoTemp);
        let result = await Mock.putCartItem(carrinho[cart_item]);
    };

    const deleteCartItem = async(indice)=>{
        let itemASerDeletado = carrinho[indice];
        let carrinhoTemp = [...carrinho];
        carrinhoTemp[indice]=null;
        carrinhoTemp = carrinhoTemp.filter((item)=>item!==null);
        setCarrinho(carrinhoTemp);
        let result = await Mock.deleteCartItem(itemASerDeletado);
    };

    return(
        <>
            {
                loading &&
                <LoadingScreen><span className='spinner spinner-border text-secondary me-3'></span>Carregando</LoadingScreen>
                ||
            <>
                <h1 className='text-center my-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="me-3 bi bi-cart-fill" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    Meu carrinho
                </h1>
                {
                    carrinho.length===0 &&
                    <div className='w-100 d-block text-center m-auto my-5 text-secondary'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" className="mb-3 bi bi-cart-fill" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>
                        <h1>Seu carrinho está vazio</h1>
                    </div>
                }
                <div className='w-75 m-auto d-flex flex-column align-items-center mt-4' style={{maxWidth:'400px'}}>
                        {carrinho.map((item,index)=>(
                            <div key={`cart-item ${index}`} className='card w-100 my-3'>
                                <div className='card-body'>
                                    <CartitemImg src={item.product.image} />
                                    <span style={{fontWeight:'700',fontSize:'1em'}}>{item.product.name}</span>
                                    <Preco className='my-2 text-success'>{item.product.price}</Preco>
                                    <div className='my-3 d-flex flex-column flex-md-row justify-content-between align-items-center'>
                                        <div>
                                            <p>Quantidade:</p>
                                            <div className='d-flex'>
                                            <Contador callback={(contagem)=>putCartItem(index,contagem)} iniState={item.amount} min={1} max={1/0} />
                                            <button onClick={()=>deleteCartItem(index)} className='btn btn-danger ms-3'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                </svg>
                                            </button>
                                            </div>
                                        </div>
                                        <div className='mt-4 mt-md-0'>
                                            <p>Total:</p>
                                            <Preco className='text-success'>{(item.amount*item.product.price)?.toFixed(2)}</Preco>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                        <div className='my-5 text-center'>
                            <h3>Total do carrinho:</h3>
                            <Preco className='text-success'>{carrinho.reduce((cum,item)=>cum+(item.amount*item.product.price),0)?.toFixed(2)}</Preco>
                        </div>
                </div>
            </>
            }
        </>
    );
}

export default memo(Carrinho);