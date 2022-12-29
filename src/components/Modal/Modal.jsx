import PropTypes from "prop-types";
import { Overlay, ModalPhoto } from "components/Modal/Modal.Styled";

export const Modal = ({ photo, closeModal }) => {
    const { largeImageURL, tags } = photo;

    function handleBackdropClick(e) {
        if (e.target.nodeName !== 'IMG') {
            closeModal();
        };
    };

    return (
        <Overlay onClick={handleBackdropClick}>
            <ModalPhoto>
                <img src={largeImageURL} alt={tags} width="1200" height="900"/>
            </ModalPhoto>
        </Overlay>
    );
};

Modal.propTypes = {
    photo: PropTypes.shape({
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    }),
    closeModal: PropTypes.func.isRequired,
};