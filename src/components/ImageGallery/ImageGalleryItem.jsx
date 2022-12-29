import PropTypes from "prop-types";
import { GalleryItem, GalleryItemImage } from "components/ImageGallery/ImageGallery.styled";

export const ImageGalleryItem = ({ photo, onClick }) => {
    const { tags, webformatURL, largeImageURL } = photo;

    function handleClick() {
        onClick({ tags, largeImageURL });
    };
    
    return (
        <GalleryItem>
            <GalleryItemImage src={webformatURL} alt={tags} onClick={handleClick} />
        </GalleryItem>
    );
};

ImageGalleryItem.propTypes = {
    photos: PropTypes.shape({
        id: PropTypes.number.isRequired,
        tags: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    }),
    onClick: PropTypes.func.isRequired,
};