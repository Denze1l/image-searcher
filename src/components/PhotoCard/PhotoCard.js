import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';

const PhotoCard = ({
  butFunc,
  tags,
  previewURL,
  likes,
  views,
  comments,
  downloads,
  largeImageURL,
}) => (
  <li>
    <div className={style.photoCard}>
      <img src={previewURL} alt={tags} />

      <div className={style.stats}>
        <p className={style.statsItem}>
          <i className="material-icons">thumb_up</i>
          {likes}
        </p>
        <p className={style.statsItem}>
          <i className="material-icons">visibility</i>
          {views}
        </p>
        <p className={style.statsItem}>
          <i className="material-icons">comment</i>
          {comments}
        </p>
        <p className={style.statsItem}>
          <i className="material-icons">cloud_download</i>
          {downloads}
        </p>
      </div>

      {/* <!-- Кнопка для открытия модалки с большим изображением, появляется при наведении --> */}
      <button
        data-largimg={largeImageURL}
        type="button"
        onClick={butFunc}
        className={style.fullscreenButton}
        data-tages={tags}
      >
        <i className="material-icons">zoom_out_map</i>
      </button>
    </div>
  </li>
);

PhotoCard.propTypes = {
  tags: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  views: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
  downloads: PropTypes.number.isRequired,
  previewURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  butFunc: PropTypes.func.isRequired,
};

export default PhotoCard;
