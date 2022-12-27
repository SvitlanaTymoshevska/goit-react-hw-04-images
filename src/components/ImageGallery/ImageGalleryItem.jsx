import PropTypes from "prop-types";
import { GalleryItem, GalleryItemImage } from "components/ImageGallery/ImageGallery.styled";

export const ImageGalleryItem = ({ photo }) => {
    const { tags, webformatURL } = photo;
    return (
        <GalleryItem>
            <GalleryItemImage src={webformatURL} alt={tags} />
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
};