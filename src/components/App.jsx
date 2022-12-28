import React, { Component } from "react";
import { PixabayAPI } from "api/api-server";
import { Audio } from 'react-loader-spinner';
import { Wrapper } from "components/App.styled";
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Button } from "components/Button/Button";
import { Modal } from "components/Modal/Modal";

const pixabay = new PixabayAPI();

export class App extends Component {
  state = {
    query: "",
    photos: [],
    status: "idle",
    currentPhoto: "",
  };

  handleSubmit = (value) => {
    this.setState({ query: value, status: "pending"});
  };

  handleLoadMoreClick = () => { 
    this.getPhotos();
  };

  handleImgClick = (img) => {
    this.setState({ status: "modal", currentPhoto: img});
  };

  async getPhotos () {
    pixabay.query = this.state.query;

    try {
      const photosAllInfo = await pixabay.getPhotos();
      const photosNecessaryInfo = photosAllInfo.map(({ id, tags, webformatURL, largeImageURL }) => ({ id, tags, webformatURL, largeImageURL }));

      if (this.state.photos === []) {
        this.setState({photos: photosNecessaryInfo, status: "resolved" });
      } 
      else {
        this.setState(({ photos }) => ({ photos: [...photos, ...photosNecessaryInfo], status: "resolved" }));
      };
      
      pixabay.increasePage();

    }
    catch (error) {
      alert(error);
      this.setState({ status: "rejected"});
    } 
  };

  componentDidUpdate(_, prevState) {
    if (this.state.query !== prevState.query) {
      this.getPhotos();
    }
  };

  render() {
    const { photos, status, currentPhoto } = this.state;

    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleSubmit} />
        {status === "pending" && 
          <Audio
            visible={true}
            height="80"
            width="80"
            ariaLabel="radio-loading"
            wrapperStyle={{}}
            wrapperClass="radio-wrapper"
          />
        }
        {status === "resolved" && 
          <>
          <ImageGallery photos={photos} onClick={this.handleImgClick}/>
          <Button onClick={this.handleLoadMoreClick}/>
          </>
        }
        {status === "modal" && 
          <Modal photo={currentPhoto} />
        }
      </Wrapper>
    );
  };
};
