import React, { useState } from 'react'
import './LoginSignUp.css'
import user_icon from '../imagenes/person.png'
import email_icon from '../imagenes/email.png'
import password_icon from '../imagenes/password.png'
import login_image from '../imagenes/Login.png'

const LoginSignUp = () => {
    const [action, setAction] = useState('Create Account');
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
                    <input type='text' placeholder='Full Name' />
                </div>}
    
                <div className='input'>
                    <img src={email_icon} alt='' />
                    <input type='email' placeholder='Email Address' />
                </div>
                <div className='input'>
                    <img src={password_icon} alt='' />
                    <input type='password' placeholder='Password' />
                </div>
                {action === 'Login' && <div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
                <div className='submit-container'>
                    <div className={action === 'Login' ? 'submit gray' : 'submit'} onClick={() => { setAction('Sign Up') }}>Sign Up</div>
                    <div className={action === 'Create Account' ? 'submit gray' : 'submit'} onClick={() => { setAction('Login') }}>Login</div>
                </div>
            </div>
        </div>
    )
    
}

export default LoginSignUp