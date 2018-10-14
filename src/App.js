import React, { Component } from 'react';
import FavoriteList from './components/FavoriteList';
import RepositoryList from './components/RepositoryList';
import Search from './components/Search';

import './styles/App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      favorites: []
    };

    this.onAddFavorite = this.onAddFavorite.bind(this);
    this.onRemoveFavorite = this.onRemoveFavorite.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  onAddFavorite(repo) {
    const favorites = this.state.favorites.slice();
    favorites.push(repo);
    this.setState({ favorites });
  }

  onRemoveFavorite(repoName) {
    const favorites = this.state.favorites.filter(repo => repo.name !== repoName);
    this.setState({ favorites });
  }

  onSearchSubmit(searchValue) {
    this.setState({ search: searchValue });
  }

  render() {
    return (
      <div className="app">
        <div className="header">
          My Github Favorites
        </div>
        <div className="columns">
          <div>
            <Search onSearchSubmit={this.onSearchSubmit} />
            <RepositoryList
              search={this.state.search}
              favorites={this.state.favorites}
              onAddFavorite={this.onAddFavorite}
            />
          </div>
          {this.state.favorites.length > 0 &&
            <FavoriteList
              favorites={this.state.favorites}
              onRemoveFavorite={this.onRemoveFavorite}
            />
          }
        </div>
      </div>
    );
  }
}

export default App;
