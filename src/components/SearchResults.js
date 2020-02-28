import React from 'react'
import UserCard from './UserCard'

export default function SearchResults(props) {
    return (
        <div>
            {props.results.map(user => <UserCard user={user} selectUser={props.selectUser} />)}
        </div>
    )
}
