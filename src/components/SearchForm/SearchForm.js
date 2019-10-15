import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';

const SearchForm = ({ onSubmit, onChange, InputValue }) => (
  <form className={style.searchForm} onSubmit={onSubmit}>
    <input
      onChange={onChange}
      type="text"
      autoComplete="off"
      placeholder="Search images..."
      name="input"
      value={InputValue}
    />
  </form>
);

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  InputValue: PropTypes.string.isRequired,
};

export default SearchForm;
