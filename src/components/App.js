import React, { Component } from 'react';
import style from './styleApp.module.css';
import SearchFrom from './SearchForm/SearchForm';
import Gallery from './Gallery/Gallery';
import Modal from './Modal/Modal';
import GetPhoto from './services/api';

class App extends Component {
  state = {
    photos: [],
    InputValue: '',
    pageNumber: 1,
    modalOpen: false,
    largeImgP: '',
    tages: '',
    stringSearch: '',
    errorObj: null,
  };

  componentDidMount() {
    const { InputValue, pageNumber, photos } = this.state;
    if (photos.length === 0) {
      GetPhoto(InputValue, pageNumber).then(data =>
        this.setState({ photos: data.data.hits }),
      );
    }
  }

  resetPage = () => {
    this.setState({ pageNumber: 1 });
  };

  handleChange = e => {
    this.setState({ InputValue: e.target.value });
  };

  handleSubmmit = evt => {
    evt.preventDefault();
    const { InputValue } = this.state;
    this.setState({ stringSearch: InputValue }, () => {
      this.setState({ InputValue: '' });
      const { stringSearch, pageNumber } = this.state;
      GetPhoto(stringSearch, pageNumber)
        .then(data =>
          this.setState({
            photos: [...data.data.hits],
            errorObj: null,
          }),
        )
        .catch(error => this.setState({ errorObj: error }))
        .finally(this.resetPage());
    });
  };

  // largeImageURL tags
  loadFunc = async () => {
    await this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
    }));
    const { stringSearch, pageNumber } = this.state;

    await GetPhoto(stringSearch, pageNumber).then(data =>
      this.setState(prevstate => ({
        photos: [...prevstate.photos, ...data.data.hits],
      })),
    );
  };

  handleClick = e => {
    this.setState({
      largeImgP: e.currentTarget.dataset.largimg,
      tages: e.currentTarget.dataset.tages,
    });

    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
    }));
  };

  ButtonMethod = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const {
      photos,
      modalOpen,
      largeImgP,
      tages,
      InputValue,
      errorObj,
    } = this.state;
    return (
      <div className={style.app}>
        <SearchFrom
          onChange={this.handleChange}
          onSubmit={this.handleSubmmit}
          InputValue={InputValue}
        />
        {errorObj || photos.length < 1 ? (
          <p>No photo, try something else</p>
        ) : (
          <Gallery
            photoClick={this.handleClick}
            photos={photos}
            loadFunc={this.loadFunc}
          />
        )}
        {modalOpen && (
          <Modal
            ButtonMethod={this.ButtonMethod}
            bigImg={largeImgP}
            tags={tages}
          />
        )}
      </div>
    );
  }
}

export default App;
