import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import DefautProfile from '../images/avatar.gif'

export default class ProfileTabs extends Component {
    render() {
        const {following, followers, posts} = this.props
        
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <h3 className="text-primary">Followers</h3>
                        {followers.map((person, i) =>  (
                            <div key={i}>
                                    <div>
                                        <Link to={`/user/${person._id}`}>
                                            <img src=
                                            {`localhost:8080/user/photo.${person._id}`} alt={person.name} 
                                            className="float-left mr-2" height="30px" width="30px" style={{ borderRadius: "50%", border: "1px solid black" }} onError={i =>  (i.target.src = `${DefautProfile}`)} />
                                            <div>
                                                <p className="lead"> {person.name} </p>
                                            </div>
                                        </Link>
                                    </div>
                            </div>
                            )
                        )}
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-primary">Following</h3>
                        {following.map((person, i) =>  (
                            <div key={i}>
                                    <div>
                                        <Link to={`/user/${person._id}`}>
                                            <img src=
                                            {`localhost:8080/user/photo.${person._id}`} alt={person.name} 
                                            className="float-left mr-2" height="30px" width="30px" style={{ borderRadius: "50%", border: "1px solid black" }} onError={i =>  (i.target.src = `${DefautProfile}`)} />
                                            <div>
                                            <p className="lead"> {person.name} </p>
                                            </div>
                                        </Link>
                                    </div>
                            </div>
                            )
                        )}
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-primary">Posts</h3>
                        {posts.map((post, i) =>  (
                            <div key={i}>
                                    <div>
                                        <Link to={`/post/${post._id}`}>
                                            <div>
                                                <p className="lead"> {post.title} </p>
                                            </div>
                                        </Link>
                                    </div>
                            </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        )
    }
}