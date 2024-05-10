import React, { useState } from 'react';
import './LoginSignUp.css';
import user_icon from '../imagenes/person.png';
import email_icon from '../imagenes/email.png';
import password_icon from '../imagenes/password.png';
import login_image from '../imagenes/Login.png';

const LoginSignUp = () => {
    const [action, setAction] = useState('Create Account');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUpClick = () => {
        if (!fullName || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }
        // Proceed with sign up logic
    };

    const handleLoginClick = () => {
        if (!email || !password) {
            alert('Please fill in both email and password fields.');
            return;
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
                    <div className={action === 'Login' ? 'submit gray' : 'submit'} onClick={action === 'Login' ? handleLoginClick : handleSignUpClick}>{action === 'Login' ? 'Login' : 'Sign Up'}</div>
                    <div className={action === 'Create Account' ? 'submit gray' : 'submit'} onClick={() => { setAction('Login') }}>Login</div>
                </div>
            </div>
        </div>
    )
}

export default LoginSignUp;
