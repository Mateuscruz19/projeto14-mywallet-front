import React from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './Context.js/auth.js';
import Logo from './assets/nICE.png'
import Go from "./assets/Google.png"
import { Circles } from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import axios from "axios";

export default function Login(){

    const [Loading, setLoading] = useState(false)
    const [EmailUser, setEmail] = useState("")
    const [SenhaUser, setSenha] = useState("")

    const { setUser,User } = useContext(AuthContext);
    const [SignUser,SetSignUser] = useState({})

    let navigate = useNavigate();

    function emBreve(){
        alert("Em desenvolvimento...")
    }

    useEffect(() => {
       if(localStorage.getItem("token")){
        setUser({
            "token":localStorage.getItem("token"),
            "name":localStorage.getItem("name")
        })
        navigate("/Principal") 
        console.log(User)
       }
    },[])

    function IntroSite(){
        if(EmailUser === "" || SenhaUser === ""){
            alert("Tenha certeza que preencheu todos os campos")
            return
        }

        const obj = {"email":EmailUser,
            "password":SenhaUser
        }
        SetSignUser(obj)
            axios.post("http://localhost:5000/signin",obj).then((res)=>{
                localStorage.setItem("token",res.data.token);
                localStorage.setItem("name",res.data.name)
                setUser({
                    "token":res.data.token,
                    "name":res.data.name
                })
                console.log(res.data)
                console.log(User) 
                navigate("/Principal")
            })
           .catch((err)=>{
            console.log(err)
            alert(err.response.data)
           })
    }

    return(
        <>
        <GlobalStyle/>
        <Background>
                <LogoA width={"150px"} src={Logo} alt="Logo"></LogoA>
                <ConteinerTop>
                    <LoginText>Login</LoginText>
                    <LoginDescription>Coloque sua senha e login para entrar no aplicativo.</LoginDescription>
                </ConteinerTop>
                <ContainerBot>
                    <TextEmail>Email</TextEmail>
                    <Email placeholder='E-mail' value={EmailUser} onChange={E => setEmail(E.target.value)}></Email>

                    <TextPass>Senha</TextPass>
                    <Senha placeholder='Senha' value={SenhaUser} onChange={S => setSenha(S.target.value)}></Senha>
                <ConteinerRemember>
                    <RememberMe>
                        <Checkbox onClick={emBreve}></Checkbox>
                        <RememberMeText onClick={emBreve}>Lembrar-me</RememberMeText>
                    </RememberMe>
                    <Forgot onClick={emBreve}>Esqueceu a senha?</Forgot>
                </ConteinerRemember>        
                <Entrar onClick={IntroSite}><p>Entrar</p></Entrar>
                <Or>Ou</Or>
                <GoogleBox>
                    <GoogleContainer>
                        <Google src={Go}></Google>
                        <Googletext onClick={emBreve}>Logue com o Google</Googletext>
                    </GoogleContainer>
                </GoogleBox>
                <Link to="/Register" disabled={Loading ? true : false}>
                <RegisterBox>Não tem uma conta?<span>  Cadastre-se</span></RegisterBox>
                </Link>
                </ContainerBot>
            </Background>
        </>
    )
} 


const GlobalStyle = createGlobalStyle`
body {
    background: #FFFFFF;
}
a{
    text-decoration:none;
}
`



const Background = styled.main`

    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    margin-top:50px;

`
const LogoA = styled.img`

    width:250px;
    margin-top:-55px;
`
const ConteinerTop = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
    width: 330px;
    height: 71px;

`
const LoginText = styled.p`

    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    letter-spacing: 0.01em;
    text-transform: capitalize;
    color: #344054;
    flex: none;
    order: 0;
    flex-grow: 0;

`

const LoginDescription = styled.p`

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    flex: none;
    order: 1;
    flex-grow: 0;

`

const ContainerBot = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
    margin-top:30px;

`

const TextEmail = styled.p`

font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 20px;
color: #344054;
flex: none;
order: 0;
flex-grow: 0;
`
const TextPass = styled.p`

font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: 0px;
gap: 8px;
margin-top:10px;

`


const Email = styled.input`

    box-sizing: border-box;
    width: 327px;
    height: 44px;
    border: 1px solid #D0D5DD;
    border-radius: 8px;


    &::placeholder{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #667085;
    flex: none;
    order: 0;
    flex-grow: 0;
    }

`


const Senha = styled.input`

    box-sizing: border-box;
    width: 327px;
    height: 44px;
    border: 1px solid #D0D5DD;
    border-radius: 8px;


    &::placeholder{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #667085;
    flex: none;
    order: 0;
    flex-grow: 0;
    }

`
const ConteinerRemember = styled.div`

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 81px;
    width: 323px;
    height: 20px;
    left: 24px;
    top: 518px;

`

const RememberMe = styled.div`

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 8px;
    width: 121px;
    height: 20px;
    flex: none;
    order: 0;
    flex-grow: 0;
    cursor: pointer;

`
const Checkbox = styled.div`

    box-sizing: border-box;
    width: 16px;
    height: 16px;
    border: 1px solid #E2CAFC;
    border-radius: 4px;
    flex: none;
    order: 0;
    flex-grow: 0;

`

const RememberMeText = styled.p`

    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    flex: none;
    order: 1;
    flex-grow: 0;

`

const Forgot = styled.p`

    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #E2CAFC;
    flex: none;
    order: 1;
    flex-grow: 0;
    cursor: pointer;

`
const Or = styled.p`

     font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    margin-left:150px;
    margin-top:10px;
    margin-bottom:10px;
`


const Entrar = styled.button`

    margin-top:20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 327px;
    height: 44px;
    background: #000;
    border-radius: 8px;
    cursor: pointer;
    border:none;

    p{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color:#FFF;
    flex: none;
    order: 0;
    flex-grow: 0;
    }

`
const GoogleBox = styled.div`

    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 90px;
    gap: 10px;
    width: 327px;
    height: 44px;
    left: 24px;
    top: 630px;
    background-color:#000;
    border: 1px solid #E2CAFC;
    border-radius: 8px;
    cursor: pointer;

`
const GoogleContainer = styled.div`

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 8px;
    width: 180px;
    height: 24px;
    flex: none;
    order: 0;
    flex-grow: 0;

`

const Google = styled.img`

    width: 24px;
    height: 24px;
    flex: none;
    order: 0;
    flex-grow: 0;

`
const Googletext = styled.p`

    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #FFFF;
    flex: none;
    order: 1;
    flex-grow: 0;
    

`

const RegisterBox = styled.p`

    margin-top:15px;
    width: 327px;
    height: 21px;
    left: 24px;
    top: 694px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: #344054;
    cursor: pointer;

    span{
        color:#E2CAFC;
    }

    &:hover{
        text-decoration: underline;
        text-decoration-color:#5429FF;
    }
`