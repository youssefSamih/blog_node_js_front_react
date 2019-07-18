import React, { Component } from 'react'
import { singlePost, remove } from './apiPost';
import DefautPost from '../images/defaultimgblog.jpg'
import {Link, Redirect} from 'react-router-dom'
import { isAuthenticated } from '../auth';

export default class SinglePost extends Component {
    state = {
        post: '',
        redirectToHome: false
    }

    componentDidMount = () => {
        const postId = this.props.match.params.postId
        singlePost(postId).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({ post: data })
            }
        })
    }

    deletePost = () => {
        const postId = this.props.match.params.postId
        const token = isAuthenticated().token
        remove(postId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({redirectToHome: true})
            }
        })
    }

    deleteConfirmed = () => {
        let answer = window.confirm("Are you sure want to delete your account")
        if(answer) {
            this.deletePost()
        }
    }

    renderPost = (post) => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : ""
        const posterName = post.postedBy ? post.postedBy.name : "Unknow"
        return (
                <div className="card-body">
                    <img style={{height: '300px', width: "100%", objectFit: "cover"}} src={`http://localhost:8080/post/photo/${post._id}`} alt={post.name} onError={i => (i.target.src = `${DefautPost}`)} className="img-thumbnail mb-3" />
                    <p className="card-text">{post.body}</p>
                    <br/>
                    <p className="font-italic mark">
                        Posted by <Link to={`${posterId}`}>{posterName + " "}</Link>
                        on {new Date(post.created).toDateString()}
                    </p>
                    <div className="d-inline-block">
                        <Link to={`/`} className="btn btn-raised btn-primary mr-5">Back to posts</Link>
                        {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id && 
                            <>
                                <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-warning mr-5">Update Post</Link>
                                <button className="btn btn-raised btn-danger mr-5" onClick={this.deleteConfirmed}>
                                    Delete Post
                                </button>
                            </>
                        }
                    </div>
                </div>
        )
    }

    render() {
        const {post, redirectToHome} = this.state
        if(redirectToHome) {
            return <Redirect to={`/`}/>
        }
        return (
            <div className="container">
                <h2 className="display-2 mt-5 mb-5">{post.title}</h2>

                {!post ? (
                    <div className="jumbotron text-center"><h2>Loading...</h2></div>
                ) : ( this.renderPost(post) )}
            </div>
        )
    }
}
