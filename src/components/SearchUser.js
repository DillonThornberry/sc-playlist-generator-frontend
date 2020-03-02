import React from 'react'

export default function SearchUser(props) {

    const searchUser = e => {
        e.preventDefault()
        const searchQuery = e.target.searchbar.value.split(' ').join('+')
        fetch('/search?q=' + searchQuery).then(res => res.json()).then(data => {
            props.setResults(data)
        })
    }

    return (
        <div id="home-page">
            <div id="logo-and-search">
                <h1 id="logo">SoundCloud Playlist Generator</h1>
                <form onSubmit={searchUser}>
                    <input type="search" inputMode="search" spellcheck="false" name="searchbar" placeholder="enter SC username" />
                </form>
            </div>
        </div>
    )
}
