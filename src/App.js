import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Principal from './Principal'
import AuthProvider from './Context.js/auth';

export default function App(){
    return(
        <>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/Register' element={<Register/>}/>
                    <Route path='/Principal' element={<Principal/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
        </>
    )
}