import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { Component } from 'react';
import axios from 'axios';
import css from './app.module.css';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalPages: 1,
    loading: false,
    largeImageUrl: '',
    modalOpen: false,
  };

  fetchImage(query, page) {
    if (page > this.state.totalPages && page !== 1) {
      return;
    }
    const perPage = 12;
    const url = `https://pixabay.com/api/?key=36728050-69418dd1094caf8b20b02b737&q=${encodeURIComponent(
      query
    )}&page=${page}&&orientation=horizontal&per_page=${perPage}`;
    this.setState({ loading: true });
    axios.get(url).then(response => {
      const totalPages = Math.round(response.data.totalHits / perPage);
      this.updateState(response.data.hits, totalPages, true);
      this.setState({ loading: false });
    });
  }

  handleSearch = searchValue => {
    if (searchValue !== '') {
      if (searchValue !== this.state.query) {
        this.setState({ query: searchValue, page: 1, images: [] });
      } else {
        this.setState({ query: searchValue }, () => {});
      }
    }
  };

  updateState(images, totalPages, add = false) {
    if (add) {
      this.setState({
        totalPages,
        images: [...this.state.images, ...images],
      });
    } else {
      this.setState({ totalPages, images });
    }
  }

  getMoreImages = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };
  getImagesUrl(url) {
    axios.get(url).then(res => {
      const totalPages = Math.round(res.data.totalHits / 12);
      this.setState({ totalPages, images: res.data.hits });
    });
  }
  handleClick = largeImageUrl => {
    this.setState({ largeImageUrl, modalOpen: true,});
  };

  handleClickCloseModal = e => {
    if (e.target.id === 'modal' && this.state.modalOpen) {
      this.setState({
        modalOpen: false,
      });
    }
  };
  handleModalClose = () => {
    this.setState({
      modalOpen: false,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImage(this.state.query, this.state.page);
    }
  }

  render() {
    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.handleSearch} />
        {this.state.loading ? <Loader /> :
          <ImageGallery
            images={this.state.images}
            onOpenModal={this.handleClick}
          />}
        {this.state.modalOpen && (
          <Modal
            largeImageUrl={this.state.largeImageUrl}
            onClose={this.handleModalClose}
            onClickClose={this.handleClickCloseModal}
          />
        )}
        {this.state.totalPages > 1 &&
          this.state.page < this.state.totalPages && (
            <Button getMoreImages={this.getMoreImages} />
          )}
      </div>
    );
  }
}
