import React, {Component} from 'react'
import { Redirect, Link } from 'react-router-dom'
import {signin, authenticate} from '../auth'
import SocialLogin from './SocialLogin';

class Signin extends Component{
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            error: '',
            redirectToReferer: false,
            loading: false,
            recaptcha: false
        }
    }

    handleChange = name => event => {
        this.setState({error: ''})
        this.setState({[name]: event.target.value})
    }

    clickSubmit = event => {
        event.preventDefault()
        this.setState({loading: true})
        const {email, password} = this.state
        const user = {
            email,
            password
        }
        if(this.state.recaptcha) {
            signin(user).then(data => {
                if (data.error) this.setState({error: data.error, loading: false})
                    else {
                        authenticate(data, ()=>{
                            this.setState({redirectToReferer: true})
                        })
                    }
            })
        } else {
            this.setState({
                loading: false,
                error: "What day is today ? Please write a correct answer !"
            })
        }
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

    signinForm = (email, password, recaptcha) => {
        return <form>
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
                            {recaptcha ? "Thanks. You got it!" : "What day is today"}
                        </label>
                        <input 
                            type="text" 
                            onChange={this.recaptchaHandler}
                            className="form-control"
                        />
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
                </form>
    }

    render() {
        const {email, password, error, redirectToReferer, loading, recaptcha} = this.state
        if (redirectToReferer) {
            return <Redirect to="/"/>
        }
        return(
            <div className="container">
                <h2 className="mt-5 mb-5">Signin</h2>
                <hr/>
                    <SocialLogin />
                <hr/>
                <div className="alert alert-danger" style={{display: error ? "" : 'none'}}>{error}</div>

                {loading ? <div className="jumbotron text-center"><h2>Loading...</h2></div> : ""}

                {this.signinForm(email, password, recaptcha)}

                <p>
                    <Link className="text-danger" to="/forgot-password">
                        {" "} Forgot Password
                    </Link>
                </p>
            </div>
        )
    }
}

export default Signin