import React, { useEffect, useState } from 'react';
import '../styles/style.scss';
import { toast } from 'react-hot-toast';

const Auth = () => {
    const [isLoginFormVisible, setLoginFormVisible] = useState(true);
    const [fullName, setFullName] = useState(null)
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    let isAuth = localStorage.getItem('auth');

    const handleSubmit = ()=>{
        if(email && password){
            console.log('submit');
            if(email == 'test@test.com' && password == 'test123'){
                toast.success('Logged in successfully');
                localStorage.setItem('auth', true);
                window.location.href = '/';
            }
            else{
                toast.error('Invalid credentials');
            }
        }
        else{
            toast.error('Fill in all fields');
        }
        console.log('submit');
        localStorage.setItem('auth', true);
    }

    const toggleForm = () => {
        setLoginFormVisible(!isLoginFormVisible);
    };

    useEffect(()=>{
        if(isAuth){
            window.location.href = '/';
            console.log('is auth')
        }
    }, [isAuth])

    return (
        <div className='my-5 mx-auto d-flex justify-content-center'>
            <div className="form-structor">
                <div className={`signup ${isLoginFormVisible ? 'slide-up' : ''}`}>
                    <h2 className="form-title" id="signup" onClick={toggleForm}>
                        <span>or</span>Sign up
                    </h2>
                    <div className="form-holder">
                        <input value={fullName} onChange={(e)=> setFullName(e.target.value)} type="text" className="input" placeholder="Name" />
                        <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" className="input" placeholder="Email" />
                        <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" className="input" placeholder="Password" />
                    </div>
                    <button onClick={()=>handleSubmit()} className="submit-btn">Sign up</button>
                </div>
                <div className={`login ${isLoginFormVisible ? '' : 'slide-up'}`}>
                    <div className="center">
                        <h2 className="form-title" id="login" onClick={toggleForm}>
                            <span>or</span>Log in
                        </h2>
                        <div className="form-holder">
                            <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" className="input" placeholder="Email" />
                            <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" className="input" placeholder="Password" />
                        </div>
                        <button onClick={()=>handleSubmit()} className="submit-btn">Log in</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
