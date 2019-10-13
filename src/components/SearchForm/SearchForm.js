import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';

const SearchForm = ({ onSubmit, onChange }) => (
  <form className={style.searchForm} onSubmit={onSubmit}>
    <input
      onChange={onChange}
      type="text"
      autoComplete="off"
      placeholder="Search images..."
    />
  </form>
);

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchForm;
