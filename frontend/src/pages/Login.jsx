import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {

    const url = 'http://localhost:3000'

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "", password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const setFormNull = ()=>{
        setFormData({
            email: "", password: ""
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true);
            const res = await fetch(`${url}/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            setLoading(false);
            const data = await res.json();
            console.log("data is ", data)
            if (data.success) {
                localStorage.setItem("token", data.token)
                alert(data.message)
                setFormNull()
                navigate('/')
            } else {
                alert(`${data.message}`)
            }
        } catch (error) {
            setLoading(false);
            console.log("error in registering", error);
        }
    }

    return (
        <>
            <div className="mt-10 flex items-center justify-center">
                <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-6 p-6 bg-gray-100  rounded-lg shadow-lg w-full max-w-lg'>
                    <h1 className='text-4xl sm:text-5xl mb-5 font-semibold text-slate-700 uppercase'>LOGIN</h1>
                    <input type="email" placeholder='Email...' name="email" id="email" className='p-2 border rounded-lg w-full' onChange={handleChange} required />
                    <input type="password" placeholder='Password...' name="password" id="password" className='p-2 border rounded-lg w-full' onChange={handleChange} required />
                    <button className='border rounded-lg p-2 bg-blue-600 w-full text-white hover:opacity-90 uppercase  text-lg'>{loading ? "Loading..." : "Login In"}</button>

                    <div>
                        <p className='text-gray-500 text-sm'>Don't have an account?  &nbsp;
                            <Link to='/sign-up' className="text-blue-800 text-md hover:text-blue-900">Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </>
    );
}
