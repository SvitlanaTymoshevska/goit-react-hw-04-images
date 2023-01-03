import { useState, useEffect, useRef } from "react";

import { getPhotosFromApi } from "services/api-server";

import { Wrapper } from "components/App.styled";
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { ThreeDots } from 'react-loader-spinner';
import { Button } from "components/Button/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const STATUS = {
  idle: "idle",
  pending: "pending",
  resolved: "resolved",
  notLoadMore: "notLoadMore",
};

export const App = () => {
  const [status, setStatus] = useState(STATUS.idle);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const firstRender = useRef(true);

  const handleSubmit = (value) => {
    setQuery(value);
    setPage(1);
    setPhotos([]);
  };

  const handleLoadMoreClick = () => { 
   setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (firstRender.current) {

      firstRender.current = false;
      console.log("First render", query, page);
      return;
    }
    
    console.log("Next render", query, page);
    
    async function getPhotos() {
      setStatus(STATUS.pending);
      try {
        const photosAllInfo = await getPhotosFromApi(query, page);
        const photosNecessaryInfo = photosAllInfo.photos.map(({ id, tags, webformatURL, largeImageURL }) => ({ id, tags, webformatURL, largeImageURL }));
    
        setPhotos(photos => [...photos, ...photosNecessaryInfo]);
        
        if (photosAllInfo.notLoadMore) {
          setStatus(STATUS.notLoadMore);
          toast.info("You've reached the end of search results.");
        } else { 
          setStatus(STATUS.resolved);
        };
      }
      catch (error) {
        setStatus(STATUS.idle);
        toast.error(error.message);
      } 
    };

    // getPhotos();

  }, [query, page]);

  return (
    <Wrapper>
      
      <Searchbar onSubmit={handleSubmit} />

      {(status !== STATUS.idle) &&
        <ImageGallery photos={photos} />}

      {status === STATUS.pending && 
        <ThreeDots 
          height="80" 
          width="80" 
          radius="9"
          color="#3f51b5" 
          ariaLabel="three-dots-loading"
          wrapperStyle={{"justifyContent":"center"}}
          visible={true}/>}

      {(status === STATUS.resolved && status !== STATUS.notLoadMore) &&
        <Button onClick={handleLoadMoreClick} />}
      
      <ToastContainer autoClose={3000} />

    </Wrapper>
  );
};