import React from 'react'

export default function Nav(props) {

    const searchUser = e => {
        e.preventDefault()
        const searchQuery = e.target.searchbar.value.split(' ').join('+')
        fetch('/search?q=' + searchQuery).then(res => res.json()).then(data => {
            props.setResults(data)
        })
    }

    return (
        <div id="nav-bar">
            { props.user && <img src={props.user.avatar_url} alt="user-avatar" /> }
            <form onSubmit={searchUser}>
                <input type="text" name="searchbar" placeholder="enter SC username" />
            </form>
        </div>
    )
}
