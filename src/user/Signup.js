import React, { Component } from 'react'
import { signup } from '../auth'
import {Link} from 'react-router-dom'

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            error: '',
            open: false
        }
    }

    handleChange = name => event => {
        this.setState({error: ''})
        this.setState({[name]: event.target.value})
    }

    clickSubmit = event => {
        event.preventDefault()
        const {name, email, password} = this.state
        const user = {
            name,
            email,
            password
        }
        signup(user).then(data => {
            if (data.error) this.setState({error: data.error})
                else this.setState({
                    error: '',
                    name: '',
                    email: '',
                    password: '',
                    open: true
                })
        })
    }

    signupForm = (name, email, password) => {
        return <form>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input type="text" onChange={this.handleChange("name")} value={name} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input type="email" onChange={this.handleChange("email")} value={email} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input type="password" onChange={this.handleChange("password")} value={password} className="form-control" />
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
                </form>
    }

    render() {
        const {name, email, password, error, open} = this.state
        return(
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                <div className="alert alert-danger" style={{display: error ? "" : 'none'}}>{error}</div>

                <div className="alert alert-info" style={{display: open ? "" : 'none'}}>New account is successfully created. Please <Link to="/signin">Sign in</Link></div>
                {this.signupForm(name, email, password)}
            </div>
        )
    }
}

export default Signup