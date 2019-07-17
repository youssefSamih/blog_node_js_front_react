import React, {Component} from 'react'
import { list } from './apiPost'
// import DefautProfile from '../images/avatar.gif'
import {Link} from 'react-router-dom'

class Posts extends Component {
    constructor() {
        super()
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        list().then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                this.setState({posts: data})
            }
        })
    }

    renderPosts = posts => (
        <div className="row">
            {posts.map((post, i) => (
                    <div className="card col-md-4" key={i}>
                        {/* <img style={{height: '200px', width: "auto"}} src={`http://localhost:8080/user/photo/${user._id}`} alt={user.name} onError={i => (i.target.src = `${DefautProfile}`)} className="img-thumbnail" /> */}
                        <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.body}</p>
                        <Link to={`/posts/${post._id}`} className="btn btn-raised btn-primary">Read more</Link>
                        </div>
                    </div>
                )) }
        </div>
    )

    render() {
        const { posts } = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Recent Posts</h2>
                {this.renderPosts(posts)}
            </div>
        )
    }
}

export default Posts