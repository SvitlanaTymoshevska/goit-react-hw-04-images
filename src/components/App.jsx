import React, { Component } from "react";
import { PixabayAPI } from "api/api-server";
import { Wrapper } from "components/App.styled";
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";

const  pixabay = new PixabayAPI();

export class App extends Component {
  state = {
    query: "",
    photos: [],
  };

  handleSubmit = async (value) => {
    this.setState({ query: value });
    pixabay.query = value;

    try {
      const photosAllInfo = await pixabay.getPhotos();
      const photosNecessaryInfo = photosAllInfo.map((photo) => {
        const data = {
          id: photo.id,
          tags: photo.tags,
          webformatURL: photo.webformatURL,
          largeImageURL: photo.largeImageURL,
        };
        return data;
      });
      this.setState({photos: photosNecessaryInfo});
    }
    catch {
      console.log("Oops-s-s");
    }

  };

  render() {
      return (
        <Wrapper>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery photos={this.state.photos} />
        </Wrapper>
      );
  };
};
