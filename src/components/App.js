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
  };

  componentDidMount() {
    const { InputValue, pageNumber, photos } = this.state;
    if (photos.length === 0) {
      GetPhoto(InputValue, pageNumber).then(data =>
        this.setState({ photos: data.data.hits }),
      );
    }
  }

  handleChange = e => {
    this.setState({ InputValue: e.target.value });
  };

  handleSubmmit = evt => {
    evt.preventDefault();
    const { InputValue, pageNumber } = this.state;
    GetPhoto(InputValue, pageNumber).then(data =>
      this.setState({ photos: data.data.hits }),
    );
  };

  // largeImageURL tags
  loadFunc = async () => {
    await this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
    }));
    const { InputValue, pageNumber } = this.state;

    await GetPhoto(InputValue, pageNumber).then(data =>
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
    const { photos, modalOpen, largeImgP, tages } = this.state;
    return (
      <div className={style.app}>
        <SearchFrom
          onChange={this.handleChange}
          onSubmit={this.handleSubmmit}
        />
        <Gallery
          photoClick={this.handleClick}
          photos={photos}
          loadFunc={this.loadFunc}
        />
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
