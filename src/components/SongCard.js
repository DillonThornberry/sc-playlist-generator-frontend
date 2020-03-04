import React from 'react'

export default function SongCard(props) {
    const altImage = "http://service-line.co.uk/wp-content/uploads/2016/05/PPM-Services-Icon-100x100.png"
    return (
        <div className={"song-card" + (props.isPlaying(props.index) ? " song-card-playing" : "")}
        onClick={() => props.changeSong(props.index)}>
            <img className="song-art" src={props.song.artwork_url || altImage} alt="" />
            <h1 className="song-title">{props.song.title}</h1>
            <h2 className="song-artist">{props.song.user.username}</h2>
        </div>
    )
}

// {props.isPlaying(props.index) ? "song-card-playing" : "song-card"}