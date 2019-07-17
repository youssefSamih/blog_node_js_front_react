import React, { Component } from 'react'
import { create } from './apiPost'
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom'
import DefautProfile from '../images/avatar.gif'

class NewPost extends Component {
    constructor(){
        super()
        this.state = {
            title: "",
            body: "",
            photo:"",
            error:"",
            fileSize: 0,
            loading: false,
            user: {},
            redirectToProfile: false
        }
    }

    componentDidMount(){
        this.postData = new FormData()
        this.setState({user: isAuthenticated().user})
    }

    isValid = () => {
        const { title, body, fileSize } = this.state
        if(fileSize > 100000) {
            this.setState({ error: 'File size should be less than 100kb', loading: false })
            return false
        }
        if(title.length === 0 || title.length === 0) {
            this.setState({ error: 'All fields are required', loading: false })
            return false
        }
        return true
    }

    handleChange = name => event => {
        this.setState({ error: "" })
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        const fileSize = name === "photo" ? event.target.files[0].size : 0
        this.postData.set(name, value)
        this.setState({[name]: value, fileSize})
        // console.log({[name]: value, fileSize})
    }

    clickSubmit = event => {
        event.preventDefault()
        if(this.isValid()){
            this.setState({ loading: true })
            const userId = isAuthenticated().user._id
            const token = isAuthenticated().token
            console.log(this.postData);
            create(userId, token, this.postData).then(data => {
                if (data.error) this.setState({error: data.error})
                    else {
                        this.setState({loading: false, title: "", body: "", photo: "", redirectToProfile: true})
                    }
            })
        }
    }

    newPostForm = (title, body) => {
        return <form>
                    <div className="form-group">
                        <label className="text-muted">Profile Photo</label>
                        <input type="file" accept="image/*" onChange={this.handleChange("photo")} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Title</label>
                        <input type="text" onChange={this.handleChange("title")} value={title} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Body</label>
                        <textarea type="text" onChange={this.handleChange("body")} value={body} className="form-control" />
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Create Post</button>
                </form>
    }

    render() {
        const {title, body, photo, user, error, redirectToProfile, loading} = this.state
        if(redirectToProfile) {
            return <Redirect to={`/user/${user._id}`}/>
        }
        
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Create a new post</h2>

                <div className="alert alert-danger" style={{display: error ? "" : 'none'}}>{error}</div>

                {loading ? <div className="jumbotron text-center"><h2>Loading...</h2></div> : ""}
        
                {this.newPostForm(title, body)}
            </div>
        )
    }
}

export default NewPost