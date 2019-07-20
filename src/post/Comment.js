import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth';
import {comment, uncomment} from './apiPost'
import DefautProfile from '../images/avatar.gif'

export default class Comment extends Component {
    state = {
        text : "",
        error: ''
    }

    handleChange = event => {
        this.setState({text: event.target.value, error: ''})
    }

    addComment = e => {
        e.preventDefault()
        if(!isAuthenticated()) {
            this.setState({ error: "Please signin to leave a comment" })
            return false
        }
        if(this.isValid()) {
            const userId = isAuthenticated().user._id
            const postId = this.props.postId
            const token = isAuthenticated().token
            const commented = {text: this.state.text}

            comment(userId, token, postId, commented)
            .then(data => {
                if(data.error) {
                    console.log(data.error)
                } else {
                    this.setState({text: ''})
                    this.props.updateComments(data.comments)
                }
            })
        }
    }

    isValid = () => {
        const {text} = this.state
        if(!text.length > 0 || text.length > 150) {
            this.setState({
                error: "Comment should not be empty and less than 150 characters long"
            })
            return false
        }
        return true
    }

    deleteComment = (comment) => {
        const userId = isAuthenticated().user._id
        const postId = this.props.postId
        const token = isAuthenticated().token

        uncomment(userId, token, postId, comment)
        .then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({text: ''})
                this.props.updateComments(data.comments)
            }
        })
    }

    deleteConfirmed = (comment) => {
        let answer = window.confirm("Are you sure want to delete your comment")
        if(answer) {
            this.deleteComment(comment)
        }
        console.log()
    }

    render() {
        const {comments} = this.props
        const {error} = this.state
        return (
            <div>
                <h2 className="mt-5 mb-5">Leave a Comment</h2>
                <form onSubmit={this.addComment}>
                    <div className="form-group">
                        <input type="text" onChange={this.handleChange} value={this.state.text} className="form-control" placeholder='Leave a comment' />
                    </div>
                    <button className="btn btn-raised btn-success mt-2">Post</button>
                </form>

                <div className="alert alert-danger" style={{display: error ? "" : 'none'}}>{error}</div>

                <div className="col-md-12">
                        <h3 className="text-primary">{comments.length} Comments</h3>
                        {comments.map((comment, i) =>  (
                            <div key={i}>
                                    <div>
                                        <Link to={`/user/${comment.postedBy._id}`}>
                                            <img src=
                                            {`localhost:8080/user/photo.${comment.postedBy._id}`} alt={comment.postedBy.name} 
                                            className="float-left mr-2" height="30px" width="30px" style={{ borderRadius: "50%", border: "1px solid black" }} onError={i =>  (i.target.src = `${DefautProfile}`)} />
                                        </Link>
                                            <div>
                                            <p className="lead"> {comment.text} </p>
                                            <p className="font-italic mark">
                                                Posted by <Link to={`${comment.postedBy._id}`}>{comment.postedBy.name + " "}</Link>
                                                on {new Date(comment.created).toDateString()}
                                                <span>
                                            {isAuthenticated().user && 
                                                isAuthenticated().user._id === 
                                                    comment.postedBy._id && (
                                                    <>
                                                    <span 
                                                    className="text-danger float-right mr-1"
                                                    onClick={() => this.deleteConfirmed(comment)}>
                                                    Remove
                                                    </span>
                                                    </>
                                                )}
                                        </span>
                                            </p>
                                            </div>
                                    </div>
                            </div>
                            )
                        )}
                    </div>
                    
            </div>
        )
    }
}
