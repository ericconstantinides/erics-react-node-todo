import React from 'react'
import FacebookLogin from 'react-facebook-login';

const FACEBOOK_APP_ID = '300245120447320'

const login = ({ toggleLogin }) => {
  const handleLogin = () => {
    toggleLogin()
  }
  const responseFacebook = (res) => {
    console.log(res);
    //anything else you want to do(save to localStorage)...
  }
  return (
    <div>
      <h2>THIS IS YOUR LOGIN</h2>
      <FacebookLogin
        appId={FACEBOOK_APP_ID}
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="my-facebook-button-class"
        icon="fa-facebook"
      />
      <button className="btn btn-sm btn-default" onClick={handleLogin}>
        LOGIN
      </button>
    </div>
  )
}
export default login
