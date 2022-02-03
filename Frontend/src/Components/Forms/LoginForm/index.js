//libs
import ReactDOM from 'react-dom';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import {memo} from 'react';

//serviços
import Mock from '../../../services/mock';

//components
import Fashonei from '../../Navegacao';
import Form from '../Form';
import IconImg from '../../Icons/IconImg';
import TextBox from '../../Inputs/TextBox';
import Botao from '../../Inputs/Botao';


function LoginForm()
{
    const [form,setForm] = useState({usernameForm:"",passwordForm:""});
    const [invalidFeedUsername,setInvalidFeedUsername] = useState("");
    const [invalidFeedPassword,setInvalidFeedPassword] = useState("");
    const [feedback,setFeedback] = useState("");


    const enviarForm = async (event)=>{
        event.preventDefault();

        let {rows,currentPage,lastPage} = await Mock.runScript("select uuid,username,password,profile_photo from user_client where username=? and password=?",[form.usernameForm,form.passwordForm],"select count(*) from user_client where username=? and password=?",[form.usernameForm,form.passwordForm],1,1);

        if(rows.length===1)
        {
            setFeedback("Bem vindo!");
            ReactDOM.render(<Fashonei user={rows[0]} />,document.querySelector("#root"));
        }
        else
        {
            setFeedback("Usuário e/ou senha incorretos");
        }
    };

    return(
        <div className='d-flex justify-content-center align-items-center' style={{height:'100vh',width:'100%'}}>
            <Form className='shadow-lg' id='Cadastro' onSubmit={async (event)=>await enviarForm(event)} method='post' encType='multipart/form-data'>
            <h1 className='d-block m-auto text-center mb-4' style={{color:'rgb(63, 63, 170)',fontWeight:900,fontFamily:'Pacifico,cursive'}}>Fashonei</h1>
                <IconImg src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzhotrk32py-VnM6skz3q0kgI33TsFStGxxkQ1nrbMkgOSbUkDCBZE8Q4pF_aillaaWHg&usqp=CAU' alt='ícone de camiseta' />
                <div className='form-floating'>
                    <TextBox value={form.usernameForm} placeholder='...' id='usernameCadastro' validFeed='O nome é válido' type='text' invalidFeed={invalidFeedUsername} name={'usernameForm'} onchange={(name,value)=>setForm({...form,[name]:value})} validateFunction={()=>{}}  />
                    <label htmlFor='usernameCadastro' className='text-muted'>Nome de usuário</label>
                </div>
                <div className='form-floating'>
                    <TextBox value={form.passwordForm} placeholder='...' id='senhaCadastro' validFeed='Senha forte' type='password' invalidFeed={invalidFeedPassword} name={'passwordForm'} onchange={(name,value)=>setForm({...form,[name]:value})} validateFunction={()=>{}}  />
                    <label htmlFor='senhaCadastro' className='text-muted'>Senha</label>
                </div>
                <Botao disabled={false} cor='rgb(58, 58, 189);' texto='white'>Login</Botao>
                <h6 className='mt-5'>Não tem conta?</h6>
                <Botao type='button' disabled={false} cor='rgb(34, 180, 224);' texto='white'><Link to='/cadastro' style={{color:'white',textDecoration:'none'}}>Cadastre-se</Link></Botao>
                <div className='mt-5 text-danger' style={{fontSize:'1em'}}>
                    {
                        feedback
                    }
                </div>
            </Form>
        </div>
    );
}

export default memo(LoginForm);