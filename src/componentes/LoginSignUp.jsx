import React, { useState } from 'react'
import './LoginSignUp.css'
import user_icon from '../imagenes/person.png'
import email_icon from '../imagenes/email.png'
import password_icon from '../imagenes/password.png'
import login_image from '../imagenes/Login.png'
import { useNavigate } from 'react-router-dom';

const LoginSignUp = () => {
    const [action, setAction] = useState('Create Account');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    let autentificado = false;


    const validateForm = async (event) => {
        event.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            'userEmail': email,
            'userPassword': password
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };

        const rawResponse = await fetch("https://swipeurstyleback.azurewebsites.net/login", requestOptions);
        const jsonResponse = await rawResponse.json();
        console.log("jsonResponse", jsonResponse);
        document.cookie = "authToken=" + jsonResponse.token;
        if (typeof jsonResponse.token !== 'undefined') {
            console.log('Se ha recibido un token en la respuesta.');
            autentificado = true;
            console.log('Estado:', autentificado);
        } else {
            console.log('No se ha recibido un token en la respuesta.');
            autentificado = false;
        }
        console.log('Estado antes de cambiar:', autentificado);
        if(autentificado){
            navigate('/Styling/Swipe ur syle'); 
        }else{
            alert('Error al ingresar')
        }
    }


    const handleSignUpClick = () => {
        if (!fullName || !email || !password) {
            alert('Please fill in all fields.');
            return;
        } else {
            validateForm();
        }
        // Proceed with sign up logic
    };

    const handleLoginClick = (event) => {
        if (event) {
            event.preventDefault(); // Asegúrate de que el evento no sea undefined
        }
        if (!email || !password) {
            alert('Please fill in both email and password fields.');
            return;
        } else {
            validateForm(event);          
        }

        // Proceed with login logic
    };
    return (
        <div className='container'>
            <div className="image-container">
                <img src={login_image} alt="Descripción de la imagen" />
            </div>
            <div className='inputs'>
                <div className='header'>
                    <div className='text'>{action}</div>
                    <div className='underline'></div>
                </div>
                {action === 'Login' ? <div></div> : <div className='input'>
                    <img src={user_icon} alt='' />
                    <input type='text' placeholder='Full Name' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>}

                <div className='input'>
                    <img src={email_icon} alt='' />
                    <input type='email' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='input'>
                    <img src={password_icon} alt='' />
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {action === 'Login' && <div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
                <div className='submit-container'>
                    <div className={action === 'Login' ? 'submit gray' : 'submit'} onClick={(e) => {
                        setAction('Create Account');
                        if (action === 'Create Account') {
                            handleSignUpClick(e);
                        }
                    }}>Sign Up</div>
                    <div className={action === 'Create Account' ? 'submit gray' : 'submit'} onClick={(e) => { setAction('Login'); handleLoginClick(e); }}>Login</div>
                </div>
            </div>
        </div>
    )

}

export default LoginSignUp