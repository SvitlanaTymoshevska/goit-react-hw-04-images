import React, { Component } from "react";
import { PixabayAPI } from "api/api-server";
import { Wrapper } from "components/App.styled";
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { ThreeDots } from 'react-loader-spinner';
import { Button } from "components/Button/Button";
import { Modal } from "components/Modal/Modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const pixabay = new PixabayAPI();

export class App extends Component {
  state = {
    status: "idle",
    query: "",
    photos: [],
    currentPhoto: {},
  };

  handleSubmit = (value) => {
    this.setState({ query: value });
  };

  handleLoadMoreClick = () => { 
    this.getPhotos();
  };

  handleImgClick = (img) => {
    this.setState({ status: "modal", currentPhoto: img});
  };

  closeModal = () => {
    this.setState({ status: "resolved" });
  };

  handleEscPress = (e) => {
      if (e.code === "Escape") {
          this.closeModal();
      }
  };

  async getPhotos() {
    this.setState({ status: "pending"});
    pixabay.query = this.state.query;

    try {
      const photosAllInfo = await pixabay.getPhotos();
      const photosNecessaryInfo = photosAllInfo.photos.map(({ id, tags, webformatURL, largeImageURL }) => ({ id, tags, webformatURL, largeImageURL }));
   
      if (this.state.photos === []) {
        this.setState({photos: photosNecessaryInfo, status: "resolved" });
      } 
      else {
        this.setState(({ photos }) => ({ photos: [...photos, ...photosNecessaryInfo], status: "resolved" }));
      };

      if (photosAllInfo.notLoadMore) {
        this.setState({ status: "notLoadMore"})
        toast.info("You've reached the end of search results.");
      };
      
      pixabay.increasePage();

    }
    catch (error) {
      this.setState({ status: "idle" });
      toast.error(error.message);
    } 
  };

  componentDidUpdate(_, prevState) {
    if (this.state.query !== prevState.query) {
      this.setState({ photos: [], status: "idle" });
      pixabay.resetPage();
      this.getPhotos();
    }
  };

  render() {
    const { status, photos, currentPhoto } = this.state;

    return (
      <Wrapper tabIndex={0} onKeyDown={this.handleEscPress}>
        
        <Searchbar onSubmit={this.handleSubmit} />

        {(status !== "idle") &&
          <ImageGallery photos={photos} onClick={this.handleImgClick} />}

        {status === "pending" && 
          <ThreeDots 
            height="80" 
            width="80" 
            radius="9"
            color="#3f51b5" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{"justifyContent":"center"}}
            visible={true}/>}

        {(status === "resolved" && status !== "notLoadMore") &&
          <Button onClick={this.handleLoadMoreClick} />}

        {status === "modal" && 
          <Modal photo={currentPhoto} closeModal={this.closeModal} />}
        
        <ToastContainer autoClose={3000} />

      </Wrapper>
    );
  };
};