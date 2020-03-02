import React from 'react'

export default function UserCard(props) {
    return (
        <div className="user-card" onClick={() => props.selectUser(props.user)}>
            <img className="user-img" src={props.user.avatar_url} />
            <p className="user-title">{props.user.username}</p>
        </div>
    )
}
