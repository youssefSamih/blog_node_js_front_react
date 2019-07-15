import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import DefautProfile from '../images/avatar.gif'

export default class ProfileTabs extends Component {
    render() {
        const {following, followers} = this.props
        console.log(following);
        
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <h3 className="text-primary">Followers</h3>
                        {followers.map((person, i) =>  (
                            <div key={i}>
                                <div className="row">
                                    <div>
                                        <Link to={`/user/${person._id}`}>
                                            <img src=
                                            {`localhost:8080/user/photo.${person._id}`} alt={person.name} 
                                            className="float-left mr-2" height="30px" onError={i =>  (i.target.src = `${DefautProfile}`)} />
                                            <div>
                                                <h3> {person.name} </h3>
                                            </div>
                                        </Link>
                                        <p>
                                            {person.about}
                                        </p>
                                    </div>
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