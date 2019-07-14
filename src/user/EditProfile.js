import React, { Component } from 'react'
import { read, update } from './apiUser'
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom'

class EditProfile extends Component {
    constructor(){
        super()
        this.state = {
            id: "",
            name: "",
            password: "",
            email: "",
            redirectToProfile: false,
            error: ''
        }
    }
    init = userId => {
        const token = isAuthenticated().token
        read(userId, token)
        .then(data => {
            if(data.error) {
                this.setState({ redirectToSignin: true })
            }else{
                this.setState({id: data._id, name: data.name, email: data.email})
            }
        })
        .catch(err => console.log(err))
    }

    componentDidMount(){
        const userId = this.props.match.params.userId
        this.init(userId)
    }

    isValid = () => {
        const { name, email, password } = this.state
        if(name.length === 0) {
            this.setState({ error: 'Name is required' })
            return false
        }
        if(!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)) {
            this.setState({ error: 'A valid email is required' })
            return false
        }
        if(password.length >= 1 && password.length <=5) {
            this.setState({ error: 'Password must be at least 6 characters long' })
            return false
        }
        return true
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value})
    }

    clickSubmit = event => {
        event.preventDefault()
        if(this.isValid()){
            const {name, email, password} = this.state
            const userId = this.props.match.params.userId
            const token = isAuthenticated().token
            const user = {
                name,
                email,
                password: password || undefined
            }
            update(userId, token, user).then(data => {
                if (data.error) this.setState({error: data.error})
                    else this.setState({
                        redirectToProfile: true
                    })
            })
        }
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
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Update</button>
                </form>
    }

    render() {
        const {id, name, email, password, redirectToProfile, error} = this.state
        if(redirectToProfile) {
            return <Redirect to={`/user/${id}`}/>
        }
        
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>

                <div className="alert alert-danger" style={{display: error ? "" : 'none'}}>{error}</div>

                {this.signupForm(name, email, password)}
            </div>
        )
    }
}

export default EditProfile