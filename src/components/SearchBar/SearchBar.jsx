import css from './searchBar.module.css';
import { Component } from 'react';
import PropTypes from 'prop-types';


export default class SearchBar extends Component {
  state = {
    searchValue: '',
  };
  handleChange = e => {
    this.setState({ searchValue: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchValue);
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchButton}>
            <span className={css.searchButtonLabel}>Search</span>
          </button>
          <input
            className={css.searchInput}
            type="text"
            autoComplete="off"
            name="search"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.searchValue}
          />
        </form>
      </header>
    );
  }
}
SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
