import React, { Component } from 'react'
import { signup } from '../auth'
import {Link} from 'react-router-dom'
import SocialLogin from "./SocialLogin";

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            error: '',
            open: false,
            recaptcha: false
        }
    }

    handleChange = name => event => {
        this.setState({error: ''})
        this.setState({[name]: event.target.value})
    }

    recaptchaHandler = e => {
        this.setState({error: ""})
        let userDay = e.target.value.toLowerCase()
        let dayCount

        switch (userDay) {
            case "sunday":
                dayCount = 0
                break;
                case "monday":
                    dayCount = 1
                    break;
                    case "tuesday":
                        dayCount = 2
                        break;
                        case "wednesday":
                            dayCount = 3
                            break;
                            case "thursday":
                                dayCount = 4
                                break;
                                case "friday":
                                    dayCount = 5
                                    break;
                                    case "saturday":
                                        dayCount = 6
                                        break;
        
            default:
                dayCount = 0
                break;
        }
        if (dayCount === new Date().getDay()){
            this.setState({recaptcha: true})
            return true
        } else {
            this.setState({recaptcha: false})
            return false
        }
    }

    clickSubmit = event => {
        event.preventDefault()
        const {name, email, password} = this.state
        const user = {
            name,
            email,
            password
        }
        if (this.state.recaptcha) {
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
        } else {
            this.setState({
                error: "What day is today? Please write a correct answer!"
            });
        }
    }

    signupForm = (name, email, password, recaptcha) => {
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
                    <div className="form-group">
                        <label className="text-muted">
                            {recaptcha ? "Thanks. You got it!" : "What day is today?"}
                        </label>

                        <input
                            onChange={this.recaptchaHandler}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
                </form>
    }

    render() {
        const {name, email, password, error, open, recaptcha} = this.state
        return(
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                <hr />
                <SocialLogin />
                <hr />
                <div className="alert alert-danger" style={{display: error ? "" : 'none'}}>{error}</div>

                <div className="alert alert-info" style={{display: open ? "" : 'none'}}>New account is successfully created. Please <Link to="/signin">Sign in</Link></div>
                {this.signupForm(name, email, password, recaptcha)}
            </div>
        )
    }
}

export default Signup