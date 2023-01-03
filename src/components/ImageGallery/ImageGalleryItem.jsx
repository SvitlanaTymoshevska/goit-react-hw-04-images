import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { GalleryItem, GalleryItemImage } from "components/ImageGallery/ImageGallery.styled";
import { Modal } from "components/Modal/Modal";

export const ImageGalleryItem = ({photo}) => {
    const [modaOpen, setModalOpen] = useState(false);
    
    const {tags, webformatURL, largeImageURL} = photo;

    const togleModal = () => {
        setModalOpen(prevState => !prevState);
    };

    useEffect(() => { 
        const handleEscPress = (event) => {
            if (event.code === "Escape") {
                setModalOpen(false);
            }
        };
        document.addEventListener("keydown", handleEscPress);
        return () => {document.removeEventListener("keydown", handleEscPress);};
    }, []);
    
    return (
        <GalleryItem>
            <GalleryItemImage src={webformatURL} alt={tags} onClick={togleModal} />
            {modaOpen && <Modal photo={{ tags, largeImageURL }} closeModal={togleModal} />}
        </GalleryItem>
    );
};

ImageGalleryItem.propTypes = {
    photo: PropTypes.shape({
        tags: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    }),
};