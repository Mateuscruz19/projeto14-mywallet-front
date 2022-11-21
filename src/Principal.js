import React from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'
import Leave from "./assets/Leave2.svg"
import Plus from "./assets/Plus.png"
import Minor from "./assets/Minos.png"
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import MockData from './MockData';
import Money from "./assets/css/money.webp"
import Perfil from "./assets/css/perfil.jpg"
import ConfigIcon from "./assets/css/co.png"
import Chevron from "./assets/chevron.png"
import One from "./assets/Fist.png"
import Two from "./assets/Second.png"
import Three from "./assets/Thirty.png"
import Four from "./assets/Four.png"
import { AuthContext } from './Context.js/auth.js';
import axios from "axios";

export default function Principal(){

    const { setUser,User } = useContext(AuthContext);
    let navigate = useNavigate();
    const [NewInputOpenOn, setOpenOn] = useState(false)
    const [NewOutputOpenOn, setOpen] = useState(false)
    const [NewValue1, setValue1] = useState("")
    const [NewValue2, setValue2] = useState("")
    const [NewDesc1, setDesc1] = useState("")
    const [NewDesc2, setDesc2] = useState("")
    const [ArrayTrans, setArray] = useState([])
    const [Total, setTotal] = useState(1)
    const [FullInit, setInit] = useState(false)
    const [More, MoreOne] = useState(0)

    function LogOff(){


        if(window.confirm("Voce realmente quer deslogar?")){
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            navigate("/")
            
        }   return
       
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

    function NewInp(){
        if(NewInputOpenOn === false){
           setOpenOn(true)
           setOpen(false)
          
        }else{
           setOpenOn(false)
          
        }
    }

    function NewOut(){
        if(NewOutputOpenOn === false){
            setOpen(true)
            setOpenOn(false)
          
        }else{
            setOpen(false)
           
        }
    }

    function emBreve(){
        alert("Em desenvolvimento...")
    }

    function NewEnt(){
        if(NewValue1 === "" || NewDesc1 === ""){
            alert("Preencha os espaços em branco!")
            return
        }

        const obj = {
        "description":NewDesc1,
        "value":NewValue1,
        "type":"Entrada",
        "data":"21/03/2021"
        }

        const Auth = {
            "headers": { "Authorization": `Bearer ${User.token}` }
        }

        const promisse = axios.post("http://localhost:5000/addtransaction",obj,Auth)
        .then((res) => {
            console.log("Tudo certo chefia");
            console.log(res.data)
            setOpenOn(false)
            MoreOne(More+1)
            console.log(More)
        })
        .catch((err) => console.log(err.response.data))
        
    }

    function NewSai(){
        if(NewValue2 === "" || NewDesc2 === ""){
            alert("Preencha os espaços em branco!")
            return
        }

        const obj = {
            "description":NewDesc2,
            "value":NewValue2,
            "type":"Saida",
            "data":"21/03/2021"
            }
    
            const Auth = {
                "headers": { "Authorization": `Bearer ${User.token}` }
            }
    
            const promisse = axios.post("http://localhost:5000/addtransaction",obj,Auth)
            .then((res) => {
                console.log("Tudo certo chefia");
                console.log(res.data)
                setOpen(false)
                MoreOne(More+1)
                console.log(More)
                
            })
            .catch((err) => console.log(err.response.data))
            
    }

    useEffect(()=> {

        const Auth = {
            "headers": { "Authorization": `Bearer ${User.token}` }
        }

        const promisse = axios.get("http://localhost:5000/transations",Auth)
        .then((res)=>{
                setArray(res.data)
                console.log("Certo Chefia")
                console.log(ArrayTrans)
               setInit(true)
        })
        .catch((err) => {
            console.log(err.response.data)
        })
    },[More])

    useEffect(() => {

   const En = ArrayTrans.filter(function(men){
        return men.type === "Entrada"
        
   })

   const Resultado1 = En.map(a => Number(a.value))

   var soma1 = 0;
   for(var i = 0; i < Resultado1.length; i++) {
       soma1 += Resultado1[i];
   }
    console.log(soma1);

   const Alt = ArrayTrans.filter(function(men){
    return men.value.value
})

    const Resultado2 = Alt.map(a => Number(a.value))

    var soma2 = 0;
for(var i = 0; i < Resultado2.length; i++) {
    soma2 += Resultado2[i];
}

    if(ArrayTrans === []){
        setTotal(0)
    }

    setTotal(soma1-soma2)
    },[More])

    useEffect(() => {
        MoreOne(More+1)
    },[])

    return(
        <>
        <GlobalStyle/>
        <Background>
            <Top>
                    <Namebox>
                        <NameSize>
                            <img onClick={emBreve} src={Perfil}></img>
                            <NameRiot>Ola,{User.name}!</NameRiot>
                            </NameSize>
                       <IconSize>
                       <img src={Leave} onClick={LogOff}/>
                       <img onClick={emBreve} src={ConfigIcon}/>
                       </IconSize>
                    </Namebox>
                    <ContainerValor >
                        <ValorAll>
                            <AllValue>R${Total}</AllValue>
                            <AllValueDesc>Total em conta</AllValueDesc>
                        </ValorAll>
                    </ContainerValor>

                <ContainerPuts>
                    <NewInput onClick={NewInp}>
                        <img width={"30px"} src={Plus}/>
                        <p>Nova entrada</p>
                    </NewInput>
                    <NewOutput onClick={NewOut}>
                        <img width={"30px"} src={Minor}/>
                        <p>Nova saída</p>
                    </NewOutput>
                </ContainerPuts>
            </Top>
            <NewInputOpen open={NewInputOpenOn}>
                <p>Nova Entrada</p>
                 <Valor value={NewValue1} onChange={V => setValue1(V.target.value)} placeholder='Valor'></Valor>
                <Descricao value={NewDesc1} onChange={D => setDesc1(D.target.value)} placeholder='Descrição'></Descricao>
                <SaveEntrada onClick={NewEnt}><p>Salvar entrada</p></SaveEntrada>
            </NewInputOpen>
            <NewOutputOpen open={NewOutputOpenOn}>
            <p>Nova Saida</p>
                <Valor value={NewValue2} onChange={V2 => setValue2(V2.target.value)} placeholder='Valor'></Valor>
                <Descricao value={NewDesc2} onChange={D2 => setDesc2(D2.target.value)} placeholder='Descrição'></Descricao>
                <SaveEntrada onClick={NewSai}><p>Salvar saida</p></SaveEntrada>
            </NewOutputOpen>
            <LatestTrans onClick={emBreve}>
                <p>Ultimas Transações</p>
                <img src={Chevron}/>
            </LatestTrans>
            <RegistersText>
            {ArrayTrans.map((r) => 
            <ItemBox>
                <img src={Money}/>
                <NameItemBox>
                <BoxName>{r.description}</BoxName>
                <DescrItem>{r.data}</DescrItem>
                </NameItemBox>
                <ValueText yn={r.type}>R$:{r.value}</ValueText>
                </ItemBox>)}
            </RegistersText>
            <Footer>
                <img onClick={emBreve} src={One}/>
                <img onClick={emBreve} src={Two}/>
                <img  onClick={emBreve} src={Three}/>
                <img  onClick={emBreve} src={Four}/>
            </Footer>
        </Background>
        </>
    )
}

{/* <NotFound>Não há registros de <br/> entrada ou saída</NotFound>} */}
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
    margin-top:20px;

`

const Top = styled.div`

    width:380px;
    height:200px;
    border-radius: 8px;
    display:flex;
    align-items:center;
    flex-direction:column;
    margin-bottom:40px;

    img{
        cursor: pointer;
    }
`




const Namebox = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0px;
    gap: 112px;
    width: 350px;
    height: 40px;

    
`

const NameSize = styled.div`

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 8px;
    width: 182px;
    height: 30px;
    flex: none;
    order: 0;
    flex-grow: 0;


    img{

    width: 30px;
    height: 30px;
    background: url(.png);
    border-radius: 50px;
    flex: none;
    order: 0;
    flex-grow: 0;

    }
`

const IconSize = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0px;
    gap: 12px;
    width: 56px;
    height: 22px;
    flex: none;
    order: 1;
    flex-grow: 0;

    img{
    width: 25px;
    height: 25px;
    }

`

const NameRiot = styled.p`

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #000000;

`


const ContainerValor = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap: 125px;
    width: 350px;
    height: 55px;
    left: 23px;
    top: 63px;
    border:1px solid #000;
    margin-top:10px;

`
const AllValue = styled.p`

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    color: #000000;

`

const AllValueDesc = styled.p`

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    color: #5E5E5E;

`

const ValorAll = styled.div`

    margin-top:20px;
    width: 140px;
    height: 48px;
    flex: none;
    order: 0;
    flex-grow: 0;
    margin-left:-5px;
    margin-bottom:3px;
`

const ContainerPuts = styled.div`


    margin-top:30px;
    width:350px;
    height:120px;
    display:flex;
    flex-direction:row;
    justify-content:space-between;

`

const NewInput = styled.div`

    width: 155px;
    height: 114px;
    left: 25px;
    top: 537px;
    background: #000;
    border-radius: 5px;
    cursor: pointer;

    p{

    margin-left:10px;
    margin-top:45px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 19px;
    line-height: 24px;
    flex: none;
    order: 1;
    flex-grow: 0;
    color: #FFF;
    }

    img{
        margin-left:5px;
        margin-top:5px;
    }
`

const NewInputOpen = styled.div`

    display: ${props => props.open ? "block" : "none"};
    margin-top:35px;
    width:350px;
    height:250px;
    background: #000;
    border-radius: 5px;
   

    p{
    padding:10px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 23px;
    line-height: 27px;
    flex: none;
    order: 1;
    flex-grow: 0;
    color: #fff;
    }

`

const NewOutputOpen = styled.div`

    display: ${props => props.open ? "block" : "none"};
    margin-top:35px;
    width:350px;
    height:250px;
    background: #000;
    border-radius: 5px;

    p{
    padding:10px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 23px;
    line-height: 27px;
    flex: none;
    order: 1;
    flex-grow: 0;
    color: #fff;
    }
`
const Valor = styled.input`

    margin-left:10px;
    width: 326px;
    height: 58px;
    left: 25px;
    top: 96px;
    background: #FFFFFF;
    border-radius: 5px;
    border:none;

&::placeholder{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
}
`
const Descricao = styled.input`

    margin-top:10px;
    margin-left:10px;
    width: 326px;
    height: 58px;
    left: 25px;
    top: 96px;
    border:none;
    background: #FFFFFF;
    border-radius: 5px;

&::placeholder{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
}
`

const SaveEntrada = styled.button`

    margin-top:10px;
    margin-left:10px;
    width: 330px;
    height: 46px;
    left: 25px;
    top: 238px;
    background: #E2CAFC;
    border-radius: 5px;
    cursor: pointer;

p{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 19px;
    line-height: 24px;
    flex: none;
    order: 1;
    flex-grow: 0;
    color: #000;
}
`

const NewOutput = styled.div`

    width: 155px;
    height: 114px;
    left: 25px;
    top: 537px;
    background: #000;
    border-radius: 5px;
    cursor: pointer;

    p{

    margin-left:10px;
    margin-top:45px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 19px;
    line-height: 24px;
    flex: none;
    order: 1;
    flex-grow: 0;
    color: #FFF;
    }

    img{
        margin-left:5px;
        margin-top:5px;
    }
`

const RegistersText = styled.div`

    margin-top:25px;
    width:350px;
    height:570px;
    flex-direction:column;
    border-radius: 5px;
    display:flex;
    align-items: flex-start;
    padding: 0px;
    gap: 5px;

   
`
const ItemBox = styled.div`

    display:flex;
    flex-direction:row;
    width: 350px;
    height: 45px;
    margin-bottom:5px;

img{
    width: 40px;
    height: 40px;
    border-radius: 50px;
}

`
const NameItemBox = styled.div`

    width: 140px;
    height: 37px;
    left: 50px;
    top: 5px;
    margin-left:5px;

`
const BoxName = styled.p`

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #000000;

`

const DescrItem = styled.p`

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 15px;
    color: #888888;

`
const ValueText = styled.p`

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 21px;
    margin-left:100px;
    text-align: center;
    color: ${props => props.yn === "Entrada" ? "green" : "red"};
`

const LatestTrans = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap: 30px;
    width: 355px;
    height: 24px;
    margin-top:40px;
    flex: none;
    order: 0;
    flex-grow: 0;

p{
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
   text-align: center;
    color: #000000;
    flex: none;
    order: 0;
    flex-grow: 0;
}

img{

    width: 30px;
    height: 30px;
    flex: none;
    order: 1;
    flex-grow: 0;
}
`


const NotFound = styled.div`

    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 27px;
    line-height: 23px;
    text-align: center;
    color: #344054;

`

const Footer = styled.footer`

    position: fixed;
    z-index:1;
    width: 370px;
    height: 69px;
    bottom:0;
    margin-bottom:10px;
    background: #0E0E16;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0px;
    gap: 3px;

img{
    width: 24px;
    height: 24px;
    flex: none;
    order: 0;
    flex-grow: 0;
    cursor:pointer;
}
`