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

export default function Principal(){

    let navigate = useNavigate();
    const [NewInputOpenOn, setOpenOn] = useState(false)
    const [NewOutputOpenOn, setOpen] = useState(false)
    function LogOff(){

        if(window.confirm("Voce realmente quer deslogar?")){
            navigate("/")
        }   return
       
    }

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

    return(
        <>
        <GlobalStyle/>
        <Background>
            <Top>
                    <Namebox>
                        <NameSize>
                            <img src={Perfil}></img>
                            <NameRiot>Ola,Fulano!</NameRiot>
                            </NameSize>
                       <IconSize>
                       <img src={Leave} onClick={LogOff}/>
                       <img src={ConfigIcon}/>
                       </IconSize>
                    </Namebox>
                    <ContainerValor>
                        <ValorAll>
                            <AllValue>R$ 3000,00</AllValue>
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
                <Valor placeholder='Valor'></Valor>
                <Descricao placeholder='Descrição'></Descricao>
                <SaveEntrada><p>Salvar entrada</p></SaveEntrada>
            </NewInputOpen>
            <NewOutputOpen open={NewOutputOpenOn}>
            <p>Nova Saida</p>
                <Valor placeholder='Valor'></Valor>
                <Descricao placeholder='Descrição'></Descricao>
                <SaveEntrada><p>Salvar saida</p></SaveEntrada>
            </NewOutputOpen>
            <LatestTrans>
                <p>Ultimas Transações</p>
                <img src={Chevron}/>
            </LatestTrans>
            <RegistersText>
            {MockData.map((r) => 
            <ItemBox>
                <img src={Money}/>
                <NameItemBox>
                <BoxName>{r.Description}</BoxName>
                <DescrItem>{r.Data}</DescrItem>
                </NameItemBox>
                <ValueText yn={r.EnOuAlt}>R$:{r.Register}</ValueText>
                </ItemBox>)}
            </RegistersText>
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
/* identical to box height */

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

/* identical to box height */

text-align: center;

color: #000000;

`

const AllValueDesc = styled.p`

font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height */

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
/* identical to box height */


color: #888888;
`
const ValueText = styled.p`


font-family: 'Poppins';
font-style: normal;
font-weight: 500;
font-size: 17px;
line-height: 21px;
/* identical to box height */
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

/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;

p{
    font-family: 'Poppins';
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 24px;
/* identical to box height */

text-align: center;

color: #000000;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
}

img{

width: 30px;
height: 30px;


/* Inside auto layout */

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