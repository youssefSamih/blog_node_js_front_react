import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import { Redirect, Link } from 'react-router-dom'
import DefautProfile from '../images/avatar.gif'
import { read } from './apiUser'
import DeleteUser from './DeleteUser';

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user: "",
            redirectToSignin: false
        }
    }

    init = userId => {
        const token = isAuthenticated().token
        read(userId, token)
        .then(data => {
            if(data.error) {
                this.setState({ redirectToSignin: true })
            }else{
                this.setState({user: data})
            }
        })
        .catch(err => console.log(err))
    }

    componentDidMount(){
        const userId = this.props.match.params.userId
        this.init(userId)
    }

    componentWillReceiveProps(props) {
        const userId = props.match.params.userId
        this.init(userId)
    }

    render() {
        const {redirectToSignin, user} = this.state
        const photoUrl = user._id ? `http://localhost:8080/user/photo/${user._id}?${new Date().getTime()}` : DefautProfile
        if (redirectToSignin) return <Redirect to="/signin" />
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">
                    <div className="col-md-6">
                    <img style={{height: '200px', width: "auto"}} src={photoUrl} onError={i => (i.target.src = `${DefautProfile}`)} alt={user.name} className="img-thumbnail" />
                    </div>
                    <div className="col-md-6">
                        <div className="lead mt-2">
                                <p>Hello {user.name}</p>
                                <p>email {user.email}</p>
                                <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                            </div>
                        {isAuthenticated().user && isAuthenticated().user._id === user._id && (
                            <div className="d-inline-block">
                                <Link className="btn btn-raised btn-success mr-5" to={`/user/edit/${user._id}`}>
                                    Edit Profile
                                </Link>
                                <DeleteUser userId={user._id} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col md-12 mt-5 mb-5">
                        <hr />
                        <p className="lead">{user.about}</p>
                        <hr />
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile