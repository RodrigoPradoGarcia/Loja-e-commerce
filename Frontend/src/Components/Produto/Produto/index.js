//components
import {BotaoProduto,Imageprod,Preco}  from '../StyledComponents';
import {memo} from 'react';

function Produto({nome,preco,imagem,onClick,objprod})
{
    return(
        <>
            <div className='shadow-lg card border border-secondary border-2 text-center m-3 d-block m-4' style={{width:'90%',maxWidth:'400px'}}>
                <div className='card-header bg-muted'>

                </div>
                <div className='card-img'>
                    <Imageprod src={imagem} />
                </div>
                <div className='card-body'>
                    <h3 className='card-title'>{nome}</h3>
                    <Preco className='card-text text-success'>{preco?.toFixed(2)}</Preco>
                    <BotaoProduto onClick={()=>onClick(objprod)}>Mais informações</BotaoProduto>
                </div>
                <div className='card-footer bg-muted'>

                </div>
            </div>
        </>
    );
}

export default memo(Produto);