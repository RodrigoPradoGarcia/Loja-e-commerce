//libs
import styled from 'styled-components';
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {memo} from 'react';

//components
import TextBox from '../../Inputs/TextBox';
import File from '../../Inputs/File';
import Form from '../Form';
import Botao from '../../Inputs/Botao';
import IconImg from '../../Icons/IconImg';

//serviços
import Mock from '../../../services/mock';

async function validaUsername(valor,setar,setMess,suv)
{
    if(valor.length===0)
    {
        setar("");
        setMess("");
        suv(false);
        return;
    }
    if(valor.length<5)
    {
        setMess("Nome muito curto");
        suv(false);
        return;
    }

    let result = await fetch("http://localhost:5000/authentication/token",{method:"POST",headers:{'Authorization':"Basic YWRtaW46c2VuaGFzZW5oYUAxMjM="}});
    let token = await result.text();

    result = await fetch("http://localhost:5000/script?page=1&itemsPerPage=1",{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${token}`},body:JSON.stringify({script:"select uuid from user_client where username = ?",script2:'select count(*) from user_client where username = ?',paramsScript1:[valor],paramsScript2:[valor]})});
    let obj = await result.json();

    if(obj.rows.length>0)
    {
        setMess("Usuário já existe");
        setar('is-invalid');
        suv(false);
        return;
    }
    setar('is-valid');
    suv(true);
}

async function validaSenha(senha,setar,setMessage,spv)
{
    if(senha.length===0)
    {
        setar("");
        setMessage("");
        spv(false);
        return true;
    }
    if(senha.match(/[a-z]/) && senha.match(/[A-Z]/) && senha.match(/[0-9]/) && senha.match(/[^a-zA-Z0-9]/) && senha.length>=10)
    {
        setar("is-valid");
        setMessage("Senha forte");
        spv(true);
        return true;
    }
    else
    {
        setar('is-invalid');
        setMessage("A senha deve conter letras maiúsculas, letras minúsculas, números e caracteres especiais");
        spv(false);
        return false;
    }
}

function CadastroForm()
{
    const [form,setForm] = useState({});
    const [invalidFeedUsername,setInvalidFeedUsername] = useState("");
    const [invalidFeedConfirm,setInvalidFeedConfirm] = useState("");
    const [invalidFeedPassword,setInvalidFeedPassword] = useState("");
    const [feedback,setFeedback] = useState("");
    const [disabled,setDisabled] = useState(true);

    const [userValid,setUserValid] = useState(false);
    const [passValid,setPassValid] = useState(false);
    const [confirmPass,setConfirmPass] = useState(false);

    useEffect(()=>{
        if(userValid && passValid && confirmPass)
        {
            setDisabled(false);
        }
        else
        {
            setDisabled(true);
        }
    },[userValid,passValid,confirmPass]);


    const enviarForm = async (event)=>{
        event.preventDefault();

        let result = await Mock.submitForm(document.querySelector("#Cadastro"));
        setForm({usernameForm:"",passwordForm:"",passwordConfirm:""});
        setFeedback(result);
    };

    return(
        <div className='d-flex flex-column justify-content-center align-items-center' style={{height:'100vh',width:'100%'}}>
            <Form className='shadow-lg' id='Cadastro' onSubmit={async (event)=>await enviarForm(event)} method='post' encType='multipart/form-data'>
            <h1 className='d-block m-auto text-center mb-4' style={{color:'rgb(63, 63, 170)',fontWeight:900,fontFamily:'Pacifico,cursive'}}>CADASTRO</h1>
                <div className='form-floating'>
                    <TextBox value={form.usernameForm} placeholder='...' id='usernameCadastro' validFeed='O nome é válido' type='text' invalidFeed={invalidFeedUsername} name={'usernameForm'} onchange={(name,value)=>setForm({...form,[name]:value})} validateFunction={async (valor,setar)=>await validaUsername(valor,setar,setInvalidFeedUsername,setUserValid)}  />
                    <label htmlFor='usernameCadastro' className='text-muted'>Nome de usuário</label>
                </div>
                <div className='form-floating'>
                    <TextBox value={form.passwordForm} placeholder='...' id='senhaCadastro' validFeed='Senha forte' type='password' invalidFeed={invalidFeedPassword} name={'passwordForm'} onchange={(name,value)=>setForm({...form,[name]:value})} validateFunction={async (valor,setar)=>await validaSenha(valor,setar,setInvalidFeedPassword,setPassValid)}  />
                    <label htmlFor='senhaCadastro' className='text-muted'>Senha</label>
                </div>
                <div className='form-floating'>
                    <TextBox value={form.passwordConfirm} placeholder='...' id='confirmaSenha' validFeed='As senhas conferem' type='password' invalidFeed={invalidFeedConfirm} name={'passwordConfirm'} onchange={async (name,value)=>setForm({...form,[name]:value})} validateFunction={(valor,setar)=>{
                        if(valor.length===0)
                        {
                            setar('');
                            setInvalidFeedConfirm("");
                            setConfirmPass(false);
                        }
                        else if(valor===form.passwordForm)
                        {
                            setar('is-valid');
                            setInvalidFeedConfirm("");
                            setConfirmPass(true);
                        }    
                        else
                        {
                            setar('is-invalid');
                            setInvalidFeedConfirm("As senhas não conferem");
                            setConfirmPass(false);
                        }
                    }}  />
                    <label htmlFor='confirmaSenha' className='text-muted'>Confirme sua senha</label>
                </div>
                <h6 className='mt-4'>Foto do perfil(opcional)</h6>
                <File name='profile_photo' onchange={(name,value)=>setForm({...form,[name]:value})} />
                <Botao disabled={disabled} cor='rgb(58, 58, 189);' texto='white'>Cadastre-se</Botao>
                <Botao cor='rgb(58, 58, 189);' texto='white'><Link to='/' style={{textDecoration:'none',color:'white'}}>Login</Link></Botao>
                <div className='mt-5 text-danger' style={{fontSize:'1em'}}>
                    {
                        feedback
                    }
                </div>
            </Form>
        </div>
    );
}

export default memo(CadastroForm);