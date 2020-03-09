import React, { Component } from 'react'
import SongCard from './SongCard'

export default class PlayMusic extends Component {
    constructor(props){
        super(props)
        this.widgetBaseUrl = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/"
        this.widgetArgs = "&color=%23FF5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=false&visual=true"
        this.state = {
            currentSong: this.props.songList[0]
        }
        this.changeSong = this.changeSong.bind(this)
        this.isPlaying = this.isPlaying.bind(this)
    }

    changeSong(index){
        this.setState({ currentSong: this.props.songList[index] })
    }

    isPlaying(index){
        return this.props.songList.indexOf(this.state.currentSong) === index
    }

    render() {
        return (
            <div>
                <button onClick={this.props.clearPlaylist}>back</button>
                <iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" 
                src={this.widgetBaseUrl + this.state.currentSong.id + this.widgetArgs}></iframe>
                <div id="song-container">
                    {this.props.songList.map((song, i) => 
                        <SongCard song={song} index={i} changeSong={this.changeSong} isPlaying={this.isPlaying}/> )}
                    { this.props.nextPage &&
                    <button id="next-page-button" onClick={this.props.getNextPage}>Load next page</button> }
                </div>
                
            </div>
        )
    }
}

