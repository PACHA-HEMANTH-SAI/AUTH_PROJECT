import React from 'react'
import {motion} from 'framer-motion'
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../components/Input';
import { Lock } from 'lucide-react';
import { Loader } from 'lucide-react';

const ResetPasswordPage = () => {
const [password, setPassword] = useState("");
const [conformPassword, setConformPassword] = useState("");
const {resetPassword, message, error, isLoading} = useAuthStore();
const {token} = useParams();
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();

    if(password !== conformPassword) {
        alert("Passwords do not match");
        return;
    }

    try {
        await resetPassword(token, password);
        
        alert("Password Reset Successfull .... redirecting to the login page");
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    }catch(error) {
        console.log("error");
        alert(error.message || "error resetting password");
    }
}


  return (
    <motion.div
    initial = {{opacity : 0, y : 20}}
    animate = {{opacity : 1, y : 0}} 
    transition = {{duration : 0.5}}
    className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
        <div className='p-8'>
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'> 
            Reset Password
            </h2>

            {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

            <form onSubmit={handleSubmit}>
                <Input 
                icon = {Lock}
                type = 'password'
                placeholder = 'Enter new Password...'
                value = {password}
                onChange = {(e) => {setPassword(e.target.value)}}
                required
                />
                <Input 
                icon = {Lock}
                type = 'password'
                placeholder = 'Confrom password'
                value = {conformPassword}
                onChange = {(e) => {setConformPassword(e.target.value)}}
                required
                />

                <motion.button
                className=' my-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600
              hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                whileHover={{scale:1.02}}
                whileTap ={{scale : 0.98 }}
                type='submit'
                disabled = {isLoading}
                >

                    {isLoading ? <Loader className='animate-spin w-5 h-5 m-auto'/> : "Set New Password"}
                </motion.button>
            </form>
        </div>
    </motion.div>
  )
}

export default ResetPasswordPage