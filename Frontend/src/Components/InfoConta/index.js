//libs
import styled from "styled-components";
import {useState,useEffect,useContext} from 'react';
import {memo} from 'react';

//serviços
import Mock from "../../services/mock";

//contexto
import contexto from "../Context";

const FotoPerfil = styled.img`
    width:80%;
    max-width:250px;
    max-height:250px;
    object-fit:contain;
    margin:20px;
    border-radius:50%;
`;

const BtnEditar = styled.button`
    transition:color .5s ease-in-out,background .5s ease-in-out;
    :hover
    {
        color:white;
        background:black;
    }
`;

function InfoConta()
{
    const user = useContext(contexto);
    const [form,setForm] = useState({username:user.username,profile_photo:user.profile_photo,password:"",confirmPassword:"",currentPassword:""});
    const [feedback,setFeedback] = useState("");

    const [rerender,setRerender] = useState(false);

    const [nomeDisabled,setNomeDisabled] = useState(true);
    const [nomeFeedback,setNomeFeedback] = useState("");

    const [senhaAtualDisabled,setSenhaAtualDisabled] = useState(true);
    const [senhaAtualFeedback,setSenhaAtualFeedback] = useState("");

    const [novaSenhaDisabled,setNovaSenhaDisabled] = useState(true);
    const [novaSenhaFeedback,setNovaSenhaFeedback] = useState("");

    const [confirmarSenhaDisabled,setConfirmarSenhaDisabled] = useState(true);
    const [confirmarSenhaFeedback,setConfirmarSenhaFeedback] = useState("");

    const changeName = async ()=>{
        if(form.username.length>=5)
        {
            let result1 = await Mock.getSpecificUser(user.uuid);
            if(!result1?.username===undefined)
            {
                return;
            }
            let result = await Mock.putUser({...result1,username:form.username});
            setFeedback("Dados alterados com sucesso!");
            user.username = form.username;
            setRerender(v=>!v);
            setForm({username:user.username,profile_photo:user.profile_photo,password:"",confirmPassword:"",currentPassword:""});
        }
        else
        {
            setFeedback("Nome deve conter pelo menos 10 caracteres");
        }
    };

    const changePassword  = async()=>{
        let result = await Mock.putUser({...user,password:form.password});
        user.password = form.password;
        setRerender(v=>!v);
        setForm({username:user.username,profile_photo:user.profile_photo,password:"",confirmPassword:"",currentPassword:""});
    };

    useEffect(async ()=>{
        if(form.username.length<5)
        {
            setNomeDisabled(true);
            setNomeFeedback("Nome de usuário deve conter pelo menos 5 caracteres");
            return;
        }

        let {rows} = await Mock.runScript('select username from user_client where username=?',[form.username],"select count(*)_ from user_client where username=?",[form.username],1,1);
        if(rows.length>0 && user.username!==rows[0].username)
        {
            setNomeDisabled(true);
            setNomeFeedback("Nome de usuário já existe");
            return;
        }
        else
        {
            setNomeFeedback("Nome válido!");
            setNomeDisabled(false);
        }
    },[form.username])

    useEffect(async()=>{
        let {rows} = await Mock.runScript("select * from user_client where username=? and password=?",[user.username,form.currentPassword],"select count(*) from user_client where username=? and password=?",[user.username,form.currentPassword],1,1);
        
        if(!rows[0])
        {
            setSenhaAtualFeedback("Senha incorreta");
            setSenhaAtualDisabled(true);
        }   
        else
        {
            setSenhaAtualFeedback("Senha correta");
            setSenhaAtualDisabled(false);
        }
    },[form.currentPassword]);

    useEffect(()=>{
        if(form.password.length<=10)
        {
            setNovaSenhaFeedback("A senha deve conter pelo menos 10 caracteres");
        }
        else
        {
            if((/.*[a-z].*/).test(form.password) && (/.*[A-Z].*/).test(form.password) && (/.*[0-9].*/).test(form.password) && (/[^a-zA-Z0-9]/).test(form.password))
            {
                setNovaSenhaFeedback("Senha válida");
                setNovaSenhaDisabled(false);
            }
            else
            {
                setNovaSenhaFeedback("A senha deve conter letras maiúsculas, letras minúsculas, números e caracteres especiais");
                setNovaSenhaDisabled(true);
            }
        }
    },[form.password]);

    useEffect(()=>{
        if(form.confirmPassword===form.password)
        {
            setConfirmarSenhaFeedback("As senhas conferem");
            setConfirmarSenhaDisabled(false);
        }
        else
        {
            setConfirmarSenhaFeedback("As senhas não conferem");
            setConfirmarSenhaDisabled(true);
        }
    },[form.password,form.confirmPassword]);

    const enviarFoto = async(e)=>{
        e.preventDefault();
        let result = await Mock.deletePhoto({path:user.profile_photo});
        
        let caminho = await Mock.postPhoto(document.getElementById("formFotoAlterar"));
        
        user.profile_photo=caminho;
        
        let post = await Mock.putUser({...user});
        
    };

    return(
        <>
            <h1 className='my-5 text-center'>Minha Conta</h1>
            <div className='m-auto py-5 d-flex bg-light flex-column flex-md-row align-items-center justify-content-center' style={{maxWidth:'1000px'}}>
                <div className='col-12 col-md-4'>
                    <FotoPerfil src={user.profile_photo} />
                </div>
                <div className='col-12 col-md-8'>
                    <div className='d-flex align-items-center'>
                        <h4 className='m-3'><span className='text-primary'>Nome: </span>
                        <div className='d-flex'>
                            <span className='d-block me-3'>{user.username}</span>
                            <BtnEditar data-bs-toggle='collapse' data-bs-target='#meuCollapse1'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                </svg>
                            </BtnEditar>
                        </div>
                    </h4>
                    </div>
                    <div className='collapse bg-light' id='meuCollapse1'>
                        <div className='container d-flex align-items-center'>
                            <div className='d-flex flex-column'>
                                <div className='d-flex flex-column'>
                                    <input className={`form-control p-2 my-3 ${nomeDisabled?"is-invalid":"is-valid"}`} value={form.username} onChange={(e)=>setForm({...form,username:e.target.value})} placeholder='Novo nome...' style={{maxWidth:'200px'}} />
                                    <div className='invalid-feedback mb-3'>
                                        {nomeFeedback}
                                    </div>
                                </div>
                                <button style={{maxHeight:'40px',maxWidth:'200px'}} className={`btn btn-primary ${nomeDisabled&&'disabled'}`} onClick={()=>changeName()}>Alterar</button>
                            </div>
                        </div>  
                    </div>

                    <div className='d-flex align-items-center'>
                        <h4 className='m-3'><span className='text-primary'>Senha: </span>
                        <div className='d-inline ms-3'>
                            <BtnEditar data-bs-toggle='collapse' data-bs-target='#meuCollapse2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                </svg>
                            </BtnEditar>
                        </div>
                    </h4>
                    </div>
                    <div className='collapse bg-light' id='meuCollapse2'>
                        <div className='container d-flex align-items-center'>
                            <div className='d-flex flex-column'>
                                <div className='d-flex flex-column'>
                                    <label className='my-1'>Senha atual:</label>
                                    <input type='password' className={`form-control p-2 my-3 ${senhaAtualDisabled?"is-invalid":"is-valid"}`} value={form.currentPassword} onChange={(e)=>setForm({...form,currentPassword:e.target.value})} placeholder='Senha atual...' style={{maxWidth:'200px'}} />
                                    <div className='invalid-feedback mb-3'>
                                        {senhaAtualFeedback}
                                    </div>

                                    <label className='my-1'>Nova senha:</label>
                                    <input type='password' className={`form-control p-2 my-3 ${novaSenhaDisabled?"is-invalid":"is-valid"}`} value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} placeholder='Nova senha...' style={{maxWidth:'200px'}} />
                                    <div className='invalid-feedback mb-3'>
                                        {novaSenhaFeedback}
                                    </div>

                                    <label className='my-1'>Confirme a nova senha:</label>
                                    <input type='password' className={`form-control p-2 my-3 ${confirmarSenhaDisabled?"is-invalid":"is-valid"}`} value={form.confirmPassword} onChange={(e)=>setForm({...form,confirmPassword:e.target.value})} placeholder='Confirme a senha...' style={{maxWidth:'200px'}} />
                                    <div className='invalid-feedback mb-3'>
                                        {confirmarSenhaFeedback}
                                    </div>
                                </div>
                                <button style={{maxHeight:'40px',maxWidth:'200px'}} className={`btn btn-primary ${(senhaAtualDisabled||novaSenhaDisabled||confirmarSenhaDisabled)&&'disabled'}`} onClick={()=>changePassword()}>Alterar</button>
                            </div>
                        </div>  
                    </div>

                    <div className='d-flex align-items-center'>
                        <h4 className='m-3'><span className='text-primary'>Foto: </span>
                        <div className='d-inline ms-3'>
                            <BtnEditar data-bs-toggle='collapse' data-bs-target='#meuCollapse3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                </svg>
                            </BtnEditar>
                        </div>
                    </h4>
                    </div>
                    <div className='collapse bg-light' id='meuCollapse3'>
                        <form id='formFotoAlterar' onSubmit={(e)=>enviarFoto(e)} encType='multipart/form-data' method='post'>
                            <input style={{margin:'auto',display:'block',maxWidth:'80%',overflowX:'scroll'}} type='file' name='profile_photo' />
                            <button type='submit' className='mt-3 d-block m-auto btn btn-primary'>Alterar Foto</button>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
}

export default memo(InfoConta);