import React from 'react'

export default function PlayMusic(props) {
    return (
        <div>
            <button onClick={props.clearPlaylist}>back</button>
            <p>{JSON.stringify(props.songList.map(song => song.title))}</p>
            { props.nextPage &&
            <button onClick={props.getNextPage}>next page</button> }
        </div>
    )
}
