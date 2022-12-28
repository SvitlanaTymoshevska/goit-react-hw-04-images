import PropTypes from "prop-types";
import { Overlay, ModalPhoto } from "components/Modal/Modal.Styled";

export const Modal = ({ photo }) => {
    return (
        <Overlay>
            <ModalPhoto>
                <img src={photo} alt="" />
            </ModalPhoto>
        </Overlay>
    );
};