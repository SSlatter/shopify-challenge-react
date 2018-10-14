import React, { Component } from 'react';

import '../styles/Search.css';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  onSearchChange(e) {
    this.setState({ search: e.target.value });
    if (e.target.value === '') {
      this.props.onSearchSubmit(e.target.value);
    }
  }

  onSearchSubmit(e) {
    e.preventDefault();
    this.props.onSearchSubmit(this.state.search);
  }

  render() {
    return (
      <div className='search'>
        <form onSubmit={this.onSearchSubmit}>
          <input 
            type='text' 
            value={this.props.search} 
            onChange={this.onSearchChange} />
          <button type='submit'>Search</button>
        </form>
      </div>
    );
  }
}

export default Search;
