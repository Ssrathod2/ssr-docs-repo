import React from 'react'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { signIn } from 'next-auth/react'
function Login() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <img
          loading="lazy"
          className="h-25 w-25 ml-1 mt-7 cursor-pointer  items-center rounded-full"
          src="https://clipground.com/images/google-docs-png-4.jpg"
          alt=""
        />
      <Button
        className="w-44 mt-10"
        color="blue"
        buttonType="filled"
        ripple="light"
        onClick={signIn}  
      >
        Sign in
      </Button>
      </div>
    </div>
  )
}

export default Login
