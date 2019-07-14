import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth';
import { remove } from './apiUser';

class DeleteUser extends Component {
    state = {
        redirect: false
    }

    deleteAccount = () => {
        const token = isAuthenticated().token
        const {userId} = this.props
        remove(userId, token).then(data => {
            if(data.err) {
                console.log(data.err)
            } else {
                signout(() => console.log("User is deleted"))
                this.setState({ redirect: true })
            }
        })
    }

    deleteConfirmed = () => {
        let answer = window.confirm("Are you sure want to delete your account")
        if(answer) {
            this.deleteAccount()
        }
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to="/"/>
        }
        return (
            <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">
                Delete
            </button>
        )
    }
}

export default DeleteUser