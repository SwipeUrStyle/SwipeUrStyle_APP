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
    const [username, setUsername] = useState(''); // Nuevo estado para el campo de username
    const [gender, setGender] = useState(''); // Nuevo estado para el campo de género
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
 
    const handleSignUpClick = async () => {
        if (!fullName || !email || !password || !username || !gender) {
            swal('Please fill in all fields.', '', 'warning');
            return;
        }
   
        const userRoles = ["CLIENTE"];
   
        const userData = {
            email: email,
            password: password,
            userRoles: userRoles,
            username: username,
            name: fullName,
            gender: gender
        };
   
        console.log('UserData:', userData);
   
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            };
   
            const response = await fetch('https://swipeurstyleback.azurewebsites.net/user/add', requestOptions);
            const responseData = await response.json();
   
            if (response.ok) {
                console.log('User created successfully:', responseData);
                setAction('Login');
            } else {
                console.error('Failed to create user:', responseData);
                alert('Failed to create user. Please try again.');
            }
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Error creating user. Please try again.');
        }
    };
 
    const handleLoginClick = (event) => {
        if (event) {
            event.preventDefault();
        }
        if (!email || !password) {
            swal('Please fill in both email and password fields.', 'We can not continue without knowing you :(', 'warning');
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
 
                
             
                {action !== 'Login' && <div className='input'>
                    <img src={user_icon} alt='' />
                    <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>}
 
                {action !== 'Login' && <div className='input'>
                    <img src={user_icon} alt='' />
                    <select className='form-control input-category' value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>}
                {action === 'Login' &&
                    <div className="forgot-password">
                    Lost Password?{' '}
                    <button className="password-button" onClick={() => swal('Not avaliable for Now!')}>
                      Click Here!
                    </button>
                  </div>
                }
                <div className='input'>
                    <img src={email_icon} alt='' />
                    <input type='email' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='input'>
                    <img src={password_icon} alt='' />
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
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