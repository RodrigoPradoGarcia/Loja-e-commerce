//libs
import {BrowserRouter,Routes,Route} from 'react-router-dom';

//components
import LoginForm from '../Forms/LoginForm';
import CadastroForm from '../Forms/FormCadastro';

function App()
{
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginForm />} />
                <Route path='/cadastro' element={<CadastroForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;