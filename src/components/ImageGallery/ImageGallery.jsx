import PropTypes from "prop-types";
import { Gallery } from "components/ImageGallery/ImageGallery.styled";
import { ImageGalleryItem } from "components/ImageGallery/ImageGalleryItem";

export const ImageGallery = ({ photos }) => {
    return (
        <Gallery>
            {photos.map(photo => (
                <ImageGalleryItem
                    key={photo.id}
                    photo={photo}
                />
            ))}
        </Gallery>
    );
};

ImageGallery.propTypes = {
    photos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            tags: PropTypes.string.isRequired,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
        })
    ),
};