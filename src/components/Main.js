import React from 'react'
import SearchUser from './SearchUser'
import SearchResults from './SearchResults'
import ChooseOptions from './ChooseOptions'

export default class Main extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user: null,
            searchResults: null,
            songList: null,
            nextPage: null,
        }

        this.setSearchResults = this.setSearchResults.bind(this)
        this.selectUser = this.selectUser.bind(this)
    }

    setSearchResults(userList){
        this.setState({ searchResults: userList })
    }

    selectUser(user){
        this.setState({
            user,
            searchResults: null,
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
                <ChooseOptions user={this.state.user} />}
                
            </div>
        )
    }
}

