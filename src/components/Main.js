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

    getNextPage(){
        console.log('getNextPage called')
        this.setState({ nextPage: null })
        const np = this.state.nextPage
        fetch(`/playlist?userId=${np.userId}&mine=${np.mine}&their=${np.their}&cursor=${np.cursor}`)
        .then(res => res.json()).then(data => {
            console.log('in fetch')
            this.setState({
                songList: this.state.songList.concat(data.trackList.filter(song => !!song)),
                nextPage: data.nextPage
            })
        })
    }

    selectUser(user){
        this.setState({
            user,
            searchResults: null,
        })
    }

    setSearchResults(userList){
        this.setState({ searchResults: userList })
    }

    setSongList(playList){
        this.setState({
            songList: playList.trackList.filter(x => !!x),
            nextPage: playList.nextPage
        })
    }
    
    render() {
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

