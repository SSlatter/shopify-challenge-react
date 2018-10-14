import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import Repository from './Repository'

import '../styles/RepositoryList.css';

class RepositoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
      prevSearch: '',
      loading: false
    };

    this.onAddFavorite = this.onAddFavorite.bind(this);
  }

  componentDidUpdate() {
    let search = this.props.search;
    if (this.state.prevSearch !== search) {
      this.setState({ prevSearch: search });
      if (search === '') this.setState({ repos: [] });
      else {
        this.setState({ loading: true });
        this.loadData();
      }
    }
  }

  onAddFavorite(repo) {
    this.props.onAddFavorite(repo);
  }

  async loadData() {
    const { search } = this.props;
    this.setState({ loading: true });
    const data = await fetch(`https://api.github.com/search/repositories?q=${search}`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GH_AUTH_TOKEN}`
      }
    })
      .then(results => results.json());
    const slicedRepos = data.items.slice(0, 10);
    const tagPromises = slicedRepos.map(repo => (
      fetch(`https://api.github.com/repos/${repo.full_name}/tags`, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GH_AUTH_TOKEN}`
        }
      })
        .then(results => results.json())
        .then(tag => (tag[0] ? tag[0].name : '-'))
    ));
    const resolvedTags = await Promise.all(tagPromises);
    const reposWithTags = slicedRepos.map(({ full_name: name, language }, index) => ({
      name,
      language,
      tag: resolvedTags[index]
    }));
    this.setState({
      repos: reposWithTags,
      loading: false,
    });
  }

  render() {
    const repoList = this.state.repos.map(repo =>
      <Repository
        key={repo.name}
        name={repo.name}
        language={repo.language}
        tag={repo.tag}
        btn={{
          show: !this.props.favorites.some(({name}) => name === repo.name), 
          type: 'add'
        }}
        onClick={() => this.onAddFavorite(repo)}
      />
    );

    return (
      this.state.loading 
      ? <div className='loading'>
          <ReactLoading type='spin' color='#700aff' />
        </div>
      : <div className='repositoryList'>
          {repoList.length > 0 &&
            <div className='repo-columns'>
              <div className='name'>Name</div>
              <div className='language'>Language</div>
              <div className='tag'>Latest tag</div>
            </div>
          }
          {repoList}
        </div>
    );
  }
}

export default RepositoryList;