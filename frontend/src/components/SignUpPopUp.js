
import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'
import './css/SignUpPopup.css'

const SignUpPopUp=(({ onClose }) =>{
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [error,setError]=useState('')
    const [isRegistered, setIsRegistered]=useState(false)
    const navigate=useNavigate();

    const handleSignUp=()=>{
        if (password!== confirmPassword){
            setError('Password do not match!');
            return;
        }
        console.log(name,email,password)
        
        axios.post('http://localhost:9000/api/register',{user_name:name,email,password})
        .then((response)=>{
            const token=response.data.token
            localStorage.setItem('token',token)
            axios.defaults.headers.common['Authorization']=`Bearer ${token}`
            handleSignUpWithSucces();
        }).catch((error)=>{
            setError(error.response.data.message);
        })
    }

    const handleSignUpWithSucces=()=>{
        setIsRegistered(true)
        navigate('/ToDoList')
    }

    return (
        <div className='signupopup'>
            <div className="popup-content">
                <label>Name:
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                </label>

                <label>Email:
                    <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </label>

                <label>Password:
                    <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </label>
                <label>Confirm Password:
                    <input type='password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </label>
                <button onClick={handleSignUp}>Sign Up</button>
                <p className='pSignUpPopUp' onClick={onClose}>Cancel</p>
                {error && <p className='error-message'>{error}</p>}
            </div>
        </div>
    )
})
export default SignUpPopUp
