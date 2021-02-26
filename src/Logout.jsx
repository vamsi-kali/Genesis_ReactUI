import React, {Component} from 'react'
import {GoogleLogin} from 'react-google-login'
import ReactDOM from 'react-dom'
import GoogleLogout from 'react-google-login';
import App from "./App"
export default function logout(){
    return(
        <GoogleLogout
        buttonText="Logout"
        
      >
      </GoogleLogout>
    )
   
}


