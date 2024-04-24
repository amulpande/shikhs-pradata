'use client'
import { useState } from "react"
import { userPasswordResetApi } from "../../../../lib/api/allApi"

const ResetPasswordPage = ({ params }: {
  params: {
    slug: string[]
  }
}) => {
  // 
  const [resetPassword, setResetPassword] = useState({
    password: '',
    password2: ''
  })
  const uid = params.slug[0]
  const token = params.slug[1]

  const handleChange = (e) => {
    setResetPassword({ ...resetPassword, [e.target.name]: e.target.value })
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const response = await userPasswordResetApi(uid,token,resetPassword) 
      console.log('reset password response ',response.data)
    }catch(error){
      console.log('reset password error',error)
    }
  }
  return (
    <div>
      reset passsword {params.slug[0]}
      {params.slug[1]}
      <form action="" onSubmit={handleSubmit}>
        <input type='text'
          name='password'
          value={resetPassword.password}
          onChange={handleChange}
        />
        <br></br>
        <input type='text'
          name='password2'
          value={resetPassword.password2}
          onChange={handleChange}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default ResetPasswordPage
