import React from 'react'

export default function ChooseOptions(props) {
    const getPlaylist = e => {
        e.preventDefault()
        var mine = e.target.mine.value
        var their = e.target.their.value

        if (mine && their) {
            console.log('clicked')
            fetch(`/playlist?userId=${props.user.id}&mine=${mine}&their=${their}`)
            .then(res => res.json()).then(data => {
                console.log(data)
            })
        }
    }
    return (
        <div>
            <form onSubmit={getPlaylist}>
                <input id="liked-tracks" type="radio" name="mine" value="favorites"></input>
                <label for="liked-tracks">Liked Tracks</label>
                <input id="followed-artists" type="radio" name="mine" value="followings"></input>
                <label for="followed-artists">Followed Artists</label>
                <input id="followers" type="radio" name="mine" value="followers"></input>
                <label for="followers">Followers</label>

                <input id="recent-track" type="radio" name="their" value="recenttrack"></input>
                <label for="recent-track">Most Recent Release</label>
                <input id="top-track" type="radio" name="their" value="toptrack"></input>
                <label for="top-track">Most Liked Track</label>
                <input id="recent-like" type="radio" name="their" value="favorites"></input>
                <label for="recent-like">Most Recent Like</label>

                <button type="submit">Generate Playlist</button>
            </form>
        </div>
    )
}
