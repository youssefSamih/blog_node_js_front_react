import React, {Component} from 'react'

class FollowingProfileButton extends Component {
    render() {
        return (
            <div className="d-inline-block">
                <button className="btn btn-success btn-raisse mr-5">
                    Follow
                </button>
                <button className="btn btn-warning btn-raissed">
                    unFollow
                </button>
            </div>
        )
    }
}

export default FollowingProfileButton