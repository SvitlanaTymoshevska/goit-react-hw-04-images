import PropTypes from "prop-types";
import { Gallery } from "components/ImageGallery/ImageGallery.styled";
import { ImageGalleryItem } from "components/ImageGallery/ImageGalleryItem";

export const ImageGallery = ({ photos, onClick }) => {
    return (
        <Gallery>
            {photos.map(photo => (
                <ImageGalleryItem
                    key={photo.id}
                    photo={photo}
                    onClick={onClick}
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
    onClick: PropTypes.func.isRequired,
};