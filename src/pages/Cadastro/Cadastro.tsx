import { set, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { CardBackground } from "../../components/CardBackground/CardBackground";
import { MainRegister } from "./style";
import logo from '../../assets/logo.png';
import { Button } from '../../components/Button/Button';
import { IFormAuthValues } from '../../utils/interface';
import { Alert } from '../../components/Alert/Alert';
import { useState } from 'react';

export function Cadastro(){
    const apiKey = 'http://vemser-dbc.dbccompany.com.br:39000/vemser/dbc-pessoa-api'
    const [alert, setAlert] = useState<string>('');
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormAuthValues>();

    const onSubmit = (data: IFormAuthValues) => {
        loginUser(data);
        reset();
    };

    async function loginUser(user: IFormAuthValues){
        const response = await fetch(`${apiKey}/auth/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok){
            console.log("Erro ao fazer requisição!");
            setAlert(`Aviso: usuário já cadastrado!`);
            setTimeout(() => setAlert(''), 3000);
            reset();
            return;
        }

        const token = await response.text();
        localStorage.setItem("token", token);
        
        setAlert('Sucesso! Redirecionando...');
        setTimeout(() => {
            setAlert(''); 
            navigate('/login')
        }, 2000)
    }

    return(
        <CardBackground width="46vw">
            <MainRegister>
                <div className='icons'>
                    <Link to='/'>
                        <span className="material-symbols-rounded">
                            home
                        </span>
                    </Link>
                    <Link to='/'>
                        <img src={logo} alt="Logo VemSearch application" />
                    </Link>
                    <Link to='/sobre'>
                        <span className="material-symbols-rounded">
                            info
                        </span>
                    </Link>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Cadastro</h2>
                    <input 
                        type='text'
                        placeholder='nome completo'
                        {...register("login")}
                        required
                        minLength={3}
                    />

                    <input 
                        type='email'
                        placeholder='e-mail'
                        required
                    />

                    <input 
                        type='password'
                        placeholder='senha'
                        {...register("senha")}
                        required
                        minLength={8}
                    />

                    <span>Já possui conta? <Link className='link' to='/login'>Entrar!</Link></span>

                    <Button 
                        border='none'
                        color='var(--black-85)'
                        backgroundColor='var(--brand-2)'
                        width='176px'
                    >cadastrar</Button>
                </form>
            </MainRegister>
            {alert && (
                <Alert backgroundColor={
                    alert == 'Aguarde, redirecionando...' 
                    ? 'rgba(41, 182, 47, 0.70)'
                    : 'rgba(228, 96, 0, 0.64)'
                }>{alert}</Alert>
            )}
        </CardBackground>
        
    )
}