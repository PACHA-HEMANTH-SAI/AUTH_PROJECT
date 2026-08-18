import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const EmailVerificationPage = () => {
    const [code, setCode] = useState("");
    const navigate = useNavigate();
    
    const {error, isLoading, verifyEmail} = useAuthStore();

    const handleChange = (e) => {
        setCode(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await verifyEmail(code);
            navigate('/');
            window.alert("Email verified Successfully");
        }catch(error) {
            console.log(error);
        }
    }

  return (
    <motion.div
    initial = {{opacity : 0, y : -50}}
    animate = {{opacity : 1, y : 0}} 
    transition = {{duration : 0.5}}
    className='max-w-md w-full p-8 bg-opacity-50 bg-gray-800 backdrop-blur-2xl backdrop-filter rounded-2xl shadow-2xl overflow-hidden'
    >
        <div className='p-5'>
            <h2
            className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 
            text-transparent bg-clip-text'
            >
            Verify Your Email
            </h2>
            <p
            className='text-center text-gray-300 mb-6'>Enter the 6 digit code sent to your email address
            </p>

            <form className="space-y-6">
                <input 
                className='w-full p-3 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700
                focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-500'
                type='text'
                value={code}
                placeholder='Enter Verification Code.....'
                onChange={handleChange}/>
                {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
                <motion.button
                className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600
                hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                whileHover={{scale:1.02}}
                whileTap ={{scale : 0.98 }}
                onClick={handleSubmit}
                disabled = {isLoading || code.length !== 6}>
                    {isLoading ? <Loader className='h-4 w-4 animate-spin m-auto'/> : (isLoading || code.length !== 6) ? "Disabled" : "Verify Email"}
                </motion.button>
            </form>
        </div>
    </motion.div>
  )
}

export default EmailVerificationPage