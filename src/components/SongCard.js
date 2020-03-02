import React from 'react'

export default function SongCard(props) {
    return (
        <div>
            <img className="song-art" src={props.song.artwork_url} alt="" />
            <h1 className="song-title">{props.song.title}</h1>
            <h2 className="song-artist">{props.song.user.username}</h2>
        </div>
    )
}
