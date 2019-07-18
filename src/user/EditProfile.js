import React, { Component } from 'react'
import { read, update, updateUser } from './apiUser'
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom'
import DefautProfile from '../images/avatar.gif'

class EditProfile extends Component {
    constructor(){
        super()
        this.state = {
            id: "",
            name: "",
            password: "",
            email: "",
            redirectToProfile: false,
            error: '',
            fileSize: 0,
            loading: false,
            about: ""
        }
    }
    
    init = userId => {
        const token = isAuthenticated().token
        read(userId, token)
        .then(data => {
            if(data.error) {
                this.setState({ redirectToSignin: true })
            }else{
                this.setState({id: data._id, name: data.name, email: data.email, error: "", about: data.about})
            }
        })
        .catch(err => console.log(err))
    }

    componentDidMount(){
        this.userData = new FormData()
        const userId = this.props.match.params.userId
        this.init(userId)
    }

    isValid = () => {
        const { name, email, password, fileSize } = this.state
        if(fileSize > 100000) {
            this.setState({ error: 'File size should be less than 100kb', loading: false })
            return false
        }
        if(name.length === 0) {
            this.setState({ error: 'Name is required', loading: false })
            return false
        }
        if(!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)) {
            this.setState({ error: 'A valid email is required', loading: false })
            return false
        }
        if(password.length >= 1 && password.length <=5) {
            this.setState({ error: 'Password must be at least 6 characters long', loading: false })
            return false
        }
        return true
    }

    handleChange = name => event => {
        this.setState({ error: "" })
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        const fileSize = name === "photo" ? event.target.files[0].size : 0
        this.userData.set(name, value)
        this.setState({[name]: value, fileSize})
    }

    clickSubmit = event => {
        event.preventDefault()
        if(this.isValid()){
            this.setState({ loading: true })
            const userId = this.props.match.params.userId
            const token = isAuthenticated().token
            update(userId, token, this.userData).then(data => {
                if (data.error) this.setState({error: data.error})
                    else 
                        updateUser(data, () => {
                            this.setState({
                                redirectToProfile: true
                            })
                        })
            })
        }
    }

    signupForm = (name, email, about, password) => {
        return <form>
                    <div className="form-group">
                        <label className="text-muted">Profile Photo</label>
                        <input type="file" accept="image/*" onChange={this.handleChange("photo")} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input type="text" onChange={this.handleChange("name")} value={name} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input type="email" onChange={this.handleChange("email")} value={email} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">About</label>
                        <textarea type="text" onChange={this.handleChange("about")} value={about} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input type="password" onChange={this.handleChange("password")} value={password} className="form-control" />
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Update</button>
                </form>
    }

    render() {
        const {id, name, email, password, about, redirectToProfile, error, loading} = this.state
        if(redirectToProfile) {
            return <Redirect to={`/user/${id}`}/>
        }
        const photoUrl = id ? `http://localhost:8080/user/photo/${id}?${new Date().getTime()}` : DefautProfile
        
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>

                <div className="alert alert-danger" style={{display: error ? "" : 'none'}}>{error}</div>

                {loading ? <div className="jumbotron text-center"><h2>Loading...</h2></div> : ""}
                
                <img style={{height: '200px', width: "auto"}} src={photoUrl} onError={i => (i.target.src = `${DefautProfile}`)} alt={name} className="img-thumbnail" />
                {this.signupForm(name, email, about, password)}
            </div>
        )
    }
}

export default EditProfile