import React from 'react'
import SongCard from './SongCard'

export default function PlayMusic(props) {
    return (
        <div>
            <button onClick={props.clearPlaylist}>back</button>
            <iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" 
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/210176542&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=false&visual=true"></iframe>
            <div id="song-container">
                {props.songList.map(song => <SongCard song={song} /> )}
            </div>
            { props.nextPage &&
            <button onClick={props.getNextPage}>next page</button> }
        </div>
    )
}
