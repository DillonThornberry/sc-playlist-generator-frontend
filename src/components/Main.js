import React from 'react'
import Nav from './Nav'
import SearchResults from './SearchResults'

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
                <Nav user={this.state.user} setResults={this.setSearchResults} />
                { this.state.searchResults && 
                <SearchResults results={this.state.searchResults} selectUser={this.selectUser} /> }
            </div>
        )
    }
}

