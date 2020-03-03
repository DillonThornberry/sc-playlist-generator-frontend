import React from 'react'
import SearchUser from './SearchUser'
import SearchResults from './SearchResults'
import ChooseOptions from './ChooseOptions'
import PlayMusic from './PlayMusic'

export default class Main extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user: null,
            searchResults: null,
            songList: null,
            nextPage: null,
        }
        this.clearPlaylist = this.clearPlaylist.bind(this)
        this.getNextPage = this.getNextPage.bind(this)
        this.selectUser = this.selectUser.bind(this)
        this.setSearchResults = this.setSearchResults.bind(this)
        this.setSongList = this.setSongList.bind(this)
    }

    clearPlaylist(){
        this.setState({
            songList: null,
            nextPage: null,
        })
    }

    checkForDuplicateSongs(){
        var seen = {}
        for (var song of this.state.songList){
            if (seen[song.uri]){
                seen[song.uri]++
            } else {
                seen[song.uri] = 1
            }
        }
        var dups = Object.keys(seen).filter(key => seen[key] > 1).map(key => { return {uri: key, total: seen[key]}})
        console.log('total length: ' + this.state.songList.length)
        console.log('total dups: ' + dups.length)
        console.log(dups)
    }

    getNextPage(){
        console.log('getNextPage called')
        this.setState({ nextPage: null })
        const np = this.state.nextPage
        fetch(`/playlist?userId=${np.userId}&mine=${np.mine}&their=${np.their}&cursor=${np.cursor}`)
        .then(res => res.json()).then(data => {
            console.log('in fetch')
            if (!this.state.songList || !this.state.user){ return }
            this.setState({
                songList: this.removeDuplicateSongs(this.state.songList.concat(data.trackList.filter(song => !!song))),
                nextPage: data.nextPage
            })
        })
    }

    removeDuplicateSongs(songList){
        var seen = {}
        var filteredList = []
        for (var song of songList){
            if (!seen[song.uri]){
                filteredList.push(song)
                seen[song.uri] = 1
            }
        }
        return filteredList
    }

    selectUser(user){
        this.setState({
            user: user,
            searchResults: null,
        })
    }

    setSearchResults(userList){
        this.setState({ searchResults: userList })
    }

    setSongList(playList){
        if (!this.state.user){
            return
        }
        this.setState({
            songList: this.removeDuplicateSongs(playList.trackList.filter(x => !!x)),
            nextPage: playList.nextPage
        })
    }
    
    render() {
        if (this.state.songList){
            console.log('checking for duplicates')
            this.checkForDuplicateSongs()
        }
        return (
            <div>
                { !this.state.user && !this.state.searchResults && 
                <SearchUser setResults={this.setSearchResults} /> }

                { this.state.searchResults && 
                <SearchResults results={this.state.searchResults} selectUser={this.selectUser} 
                    setResults={this.setSearchResults}/> }

                { this.state.user && !this.state.songList && 
                <ChooseOptions user={this.state.user} setSongList={this.setSongList} 
                clearUser={() => this.selectUser(null)} /> }

                { this.state.songList && 
                <PlayMusic songList={this.state.songList} nextPage={this.state.nextPage} 
                getNextPage={this.getNextPage} clearPlaylist={this.clearPlaylist} /> }
                
            </div>
        )
    }
}

