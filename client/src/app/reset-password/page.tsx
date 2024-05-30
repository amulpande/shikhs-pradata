'use client'
import React, { useState } from 'react'; 

const ResetpasswordPage = () => {
    const [resetPassword, setResetPassword] = useState({
        passowrd: '',
        password2: ''
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setResetPassword({ ...resetPassword, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={(e)=>{
                e.preventDefault();
            }}>
                <input type='text'
                    name='password'
                    value={resetPassword.passowrd}
                    onChange={handleChange}
                />
                <input type='text'
                    name='password2'
                    value={resetPassword.password2}
                    onChange={handleChange}
                />
            </form>
        </div>
    )
}

export default ResetpasswordPage
