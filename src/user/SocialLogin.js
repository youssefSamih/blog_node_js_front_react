import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import {Redirect} from 'react-router-dom'
import { socialLogin, authenticate } from '../auth';

export default class SocialLogin extends Component {
    constructor() {
        super()
        this.state = {
            redirectToReferrer: false
        }
    }

    responseGoogle = response => {
        console.log(response)
        const {googleId, name, email, imageUrl} = response.profileObj
        const user = {
            password: googleId,
            name: name,
            email: email,
            imageUrl: imageUrl
        }
        socialLogin(user).then(data => {
            console.log("signin data: ", data)
            if(data.error) {
                console.log("Error Login. Please try again..")
            } else {
                console.log("signin success - setting jwt: ", data)
                authenticate(data, () => {
                    this.setState({
                        redirectToReferrer: true
                    })
                })
            }
        })
    }

    render() {
        const { redirectToReferrer } = this.state
        if(redirectToReferrer) {
            return <Redirect to="/" />
        }
        return (
            <div className="container">
                <GoogleLogin
                    clientId="623641835008-m408cgni08km1cbajpkop1p3gd5glb2i.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                />
            </div>
        )
    }
}
