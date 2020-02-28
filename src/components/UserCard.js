import React from 'react'

export default function UserCard(props) {
    return (
        <div onClick={() => props.selectUser(props.user)}>
            <p>{props.user.username}</p>
        </div>
    )
}
