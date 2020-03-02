import React from 'react'

export default function ChooseOptions(props) {
    var fetchedAlready = false
    const getPlaylist = e => {
        e.preventDefault()
        var mine = e.target.mine.value
        var their = e.target.their.value

        if (mine && their && !fetchedAlready) {
            console.log('clicked')
            fetchedAlready = true
            var message = document.querySelector('#generating')
            message.innerHTML = "Generating Playlist..."
            
            fetch(`/playlist?userId=${props.user.id}&mine=${mine}&their=${their}`)
            .then(res => res.json()).then(data => {
                if (data.trackList){
                    props.setSongList(data)
                } else {
                    message.innerHTML = "no results"
                }
                
            })
        }
    }
    return (
        <div>
            <button onClick={props.clearUser}>back</button>
            <form id="option-menu" onSubmit={getPlaylist}>
                <div className="btn-group-vertical">
                    <input id="liked-tracks" type="radio" name="mine" value="favorites"></input>
                    <label for="liked-tracks">Liked Tracks</label>
                    <input id="followed-artists" type="radio" name="mine" value="followings"></input>
                    <label for="followed-artists">Followed Artists</label>
                    <input id="followers" type="radio" name="mine" value="followers"></input>
                    <label for="followers">Followers</label>
                </div>

                <div className="btn-group-vertical">
                    <input id="recent-track" type="radio" name="their" value="recenttrack"></input>
                    <label for="recent-track">Most Recent Release</label>
                    <input id="top-track" type="radio" name="their" value="toptrack"></input>
                    <label for="top-track">Most Liked Track</label>
                    <input id="recent-like" type="radio" name="their" value="favorites"></input>
                    <label for="recent-like">Most Recent Like</label>
                </div>
                
                <button id="generate-playlist" type="submit">Generate Playlist</button>
            </form>
            <h3 id="generating"></h3>
        </div>
    )
}
