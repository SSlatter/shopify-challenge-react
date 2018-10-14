import React, { Component } from 'react';
import Repository from './Repository';

import '../styles/FavoriteList.css';

class FavoriteList extends Component {
  constructor(props) {
    super(props);

    this.onRemoveFavorite = this.onRemoveFavorite.bind(this);
  }

  onRemoveFavorite(repoName) {
    this.props.onRemoveFavorite(repoName);
  }

  render() {
    const favoriteList = this.props.favorites.map(repo => 
      <Repository
        key={repo.name}
        name={repo.name}
        language={repo.language}
        tag={repo.tag}
        btn={{show: true, type: 'remove'}}
        onClick={() => this.onRemoveFavorite(repo.name)}
      />
    );

    return (
      favoriteList.length < 1
      ? (<div className="favorite-list"></div>)
      : (
        <div className="favorite-list">
          <div className="repo-columns">
            <div className="name">Name</div>
            <div className="language">Language</div>
            <div className="tag">Latest tag</div>
          </div>
          {favoriteList}
        </div>
      )
    );
  }
}

export default FavoriteList;