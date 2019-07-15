import React, {Component} from 'react'
import {follow, unfollow} from './apiUser'

class FollowingProfileButton extends Component {
    followClick = () => {
        this.props.onButtonClick(follow)
    }

    unfollowClick = () => {
        this.props.onButtonClick(unfollow)
    }

    render() {
        return (
            <div className="d-inline-block">
                {!this.props.following ? (
                            <button onClick={this.followClick} className="btn btn-success btn-raisse mr-5">
                                Follow
                            </button>
                    ) : (
                        <button onClick={this.unfollowClick} className="btn btn-warning btn-raissed">
                            unFollow
                        </button>
                    )}
            </div>
        )
    }
}

export default FollowingProfileButton