import React from 'react'
import UserCard from './UserCard'

export default function SearchResults(props) {
    return (
        <div>
            <button onClick={() => props.setResults(null)}>Back to Search</button>
            <div id="results-container">
                <div id="user-list">
                    {props.results.map(user => <UserCard user={user} selectUser={props.selectUser} />)}
                </div>
                
            </div>
            
        </div>
    )
}
