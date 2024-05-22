import React, { useState } from 'react';
import './LoginSignUp.css';
import user_icon from '../imagenes/person.png';
import email_icon from '../imagenes/email.png';
import password_icon from '../imagenes/password.png';
import login_image from '../imagenes/Login.png';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

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

        try {
            const rawResponse = await fetch("https://swipeurstyleback.azurewebsites.net/login", requestOptions);
            const jsonResponse = await rawResponse.json();
            console.log("jsonResponse", jsonResponse);

            // Guarda el token en el localStorage
            if (jsonResponse.token) {
                localStorage.setItem('authToken', jsonResponse.token);
                autentificado = true;
            } else {
                autentificado = false;
            }

            if (autentificado) {
                swal('Good Job!', 'Welcome Again', 'success');
                navigate('/Styling/Swipe ur syle');
            } else {
                swal('Oups!', 'Incorrect Email or Passwork ', 'error');
            }
        } catch (error) {
            swal('Oups!', 'Incorrect Email or Passwork ', 'error');
        }
    }

    const handleSignUpClick = () => {
        if (!fullName || !email || !password) {
            swal('Please fill in all fields', '', 'warning');
        } else {
            validateForm();
        }
    };

    const handleLoginClick = (event) => {
        if (event) {
            event.preventDefault();
        }
        if (!email || !password) {
            swal('Please fill in both email and password fields.', 'We can not continue without knowing you :(', 'warning');
            return;
        } else {
            validateForm(event);
        }
    };

    return (
        <div className='container'>
            <div className="image-container">
                <img src={login_image} alt="Descripción de la imagen" />
            </div>
            <div className='inputs'>
                <div className='header'>
                    <div className={action === 'Login' ? 'textLogin' : 'text'}>
                        {action}
                    </div>
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
                    <div className='submit-container'>
                        <button className={`submit ${action === 'Login' ? 'gray' : ''}`} onClick={(e) => {
                            setAction('Create Account');
                            if (action === 'Create Account') {
                                handleSignUpClick();
                            }
                        }}>Sign Up</button>
                        <button className={`submit ${action === 'Create Account' ? 'gray' : ''}`} onClick={(e) => {
                            setAction('Login');
                            if (action === 'Login') {
                                handleLoginClick(e);
                            }
                        }}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginSignUp;