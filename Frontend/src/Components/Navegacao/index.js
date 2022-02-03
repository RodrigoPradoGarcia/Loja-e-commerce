//libs
import {createContext,useState} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {memo} from 'react';

//components
import App from '../App';
import Catalogo from '../Catalogo';
import Carrinho from '../Carrinho';
import InfoConta from '../InfoConta';

//contexto
import contexto from '../Context';

const Brand = styled.div`

    transition:color .3s ease-in-out;
    cursor:pointer;
    :hover
    {
        color:black !important;
    }
`;

const Menu = styled.svg`
    transition:color .3s ease-in-out;
    :hover
    {
        color:black !important;
    }
`;

const MenuNav = styled.div`
    min-height:calc(100vh - 92px);
    animation-name:Mover
    animation-duration:5s;
    background:#333333;
    margin-top:0;

    @keyframes Mover
    {
        from{
            color:black;
        }
        to
        {
            color:white;
        }
    }
`; 

const IconNavbar = styled.div`
    min-height:200px;
    width:90%;
    max-width:400px;
    cursor:pointer;
    display:block;
    margin:auto;
    margin-top:30px;
    color:black;
    border-radius:10px;
    padding:20px;
    background:${props=>props.fundo};
    transition:color .3s ease-in-out,background .3s ease-in-out;

    & svg
    {
        display:block;
        margin:auto;
    }

    & h1
    {
        display:block;
        text-align:center;
        margin:auto;
        margin-top:20px;
        width:90%;
        max-width:400px;
    }

    :hover
    {
        color:white;
        background:rgb(13, 29, 59);
    }
`; 

const IconMenu = styled.div`
`;

const NavbarIcon = styled.div`
    transition:background .5s ease-in-out;
    text-align:center;
    padding:5px;
    border-radius:5px;
    cursor:pointer;
    :hover
    {
        background:rgb(17, 22, 71);
    }
`;

function Fashonei({user})
{

    const [caminho,setCaminho] = useState("Conta");
    const [menu,setMenu] = useState(false);
    const [rerender,setRerender] = useState(false);

    const sairDaConta = ()=>{
        ReactDOM.render(<App />,document.querySelector("#root"));
    };

    return(
        <>
            <div className='py-3 navbar navbar-expand-md shadow-md' style={{background:'#333333',position:'sticky',top:'0',zIndex:'10000000'}}>
                <div className='container'>
                    <Brand className='ms-3 navbar-brand text-light'><h6 style={{fontFamily:'Pacifico,cursive',fontWeight:'500',fontSize:'1.2em'}}>Fashonei</h6></Brand>
                    <button onClick={()=>{setMenu(v=>!v)}}  className='ms-auto navbar-toggler'>
                        <Menu xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="text-white bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </Menu>
                    </button>
                    <div className='collapse navbar-collapse'>
                        <div className='navbar-nav d-flex justify-content-end w-100'>
                            <NavbarIcon className='nav-item me-3' onClick={()=>setCaminho("Carrinho")}>
                                <IconMenu className='nav-item text-light p-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                    </svg>
                                </IconMenu>
                                <h6 className='text-light'>Carrinho</h6>
                            </NavbarIcon>
                            <NavbarIcon className='nav-item me-4' onClick={()=>setCaminho("Catálogo")}>
                                <IconMenu className='nav-item text-light p-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-bag-check-fill" viewBox="0 0 16 16">
                                      <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                                    </svg>
                                </IconMenu>
                                <h6 className='text-light'>Catálogo</h6>
                            </NavbarIcon>
                            <NavbarIcon className='nav-item me-4'>
                                <IconMenu className='nav-item text-light p-2' onClick={()=>setCaminho("Conta")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                    </svg>
                                </IconMenu>
                                <h6 className='text-light'>Conta</h6>
                            </NavbarIcon>
                            <NavbarIcon className='nav-item me-4'>
                                <IconMenu className='nav-item text-light p-2' onClick={()=>sairDaConta()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                                      <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                                      <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                                    </svg>
                                </IconMenu>
                                <h6 className='text-light'>Sair</h6>
                            </NavbarIcon>
                        </div>
                    </div>
                </div>
            </div>

            {
                menu && 
                <MenuNav className='pt-5 d-lg-none'>
                    <IconNavbar onClick={()=>{(function(){
                        setMenu(v=>!v);
                        setCaminho("Carrinho");
                    })()}} className='shadow-lg' fundo='#DDDDDD'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        <h1>Meu Carrinho</h1>
                    </IconNavbar>
                    <IconNavbar onClick={()=>{(function(){
                        setMenu(v=>!v);
                        setCaminho("Catálogo");
                    })()}} className='shadow-lg' fundo='#DDDDDD'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" className="bi bi-bag-check-fill" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                        </svg>
                        <h1>Catálogo</h1>
                    </IconNavbar>
                    <IconNavbar onClick={()=>{(function(){
                        setMenu(v=>!v);
                        setCaminho("Conta");
                    })()}} className='shadow-lg' fundo='#DDDDDD'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                        <h1>Minha Conta</h1>
                    </IconNavbar>
                    <IconNavbar onClick={()=>sairDaConta()} className='shadow-lg' fundo='#DDDDDD'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                          <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                        </svg>
                        <h1>Sair</h1>
                    </IconNavbar>
                </MenuNav>
                ||
                caminho==='Catálogo' &&
                <Catalogo callb={setRerender} user={user} />
                || 
                caminho==='Carrinho' &&
                <>
                    <Carrinho user={user} />
                </>
                ||
                caminho === 'Conta' &&
                <>
                    <contexto.Provider value={user}>
                        <InfoConta user={user} />
                    </contexto.Provider>
                </>
                ||
                <h1>404 erro</h1>
            }
        </>
    );
}

export default memo(Fashonei);