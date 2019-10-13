import React from 'react';
import PropTypes from 'prop-types';
import PhotoCard from '../PhotoCard/PhotoCard';
import style from './style.module.css';

const Gallery = ({ photoClick, photos, loadFunc }) => (
  <>
    <ul className={style.gallery}>
      {photos.map(article => (
        <PhotoCard
          butFunc={photoClick}
          likes={article.likes}
          key={article.id}
          id={article.id}
          views={article.views}
          comments={article.comments}
          downloads={article.downloads}
          previewURL={article.webformatURL}
          tags={article.tags}
          largeImageURL={article.largeImageURL}
        />
      ))}
    </ul>
    <button className={style.button} type="button" onClick={loadFunc}>
      Load more
    </button>
  </>
);

Gallery.defaultProps = {
  photos: [],
};

Gallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      tags: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      views: PropTypes.number.isRequired,
      comments: PropTypes.number.isRequired,
      downloads: PropTypes.number.isRequired,
      previewURL: PropTypes.string.isRequired,
    }).isRequired,
  ),
  loadFunc: PropTypes.func.isRequired,
  photoClick: PropTypes.func.isRequired,
};

export default Gallery;
