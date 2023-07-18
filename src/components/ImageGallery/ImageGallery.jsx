import { Component } from 'react';
import css from './imageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  render() {
    return (
      <ul className={css.gallery}>
        {this.props.images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onImgClick={this.props.onOpenModal}
          />
        ))}
      </ul>
    );
  }
}
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL:PropTypes.string.isRequired,
    })
  ).isRequired,
  onOpenModal:PropTypes.func.isRequired,
}
