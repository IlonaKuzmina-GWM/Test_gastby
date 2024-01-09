import { GatsbyImage } from "gatsby-plugin-image";
import React, { FC, useState } from "react";
import { CarGalleryImage } from "../types/allWpCarTypes";

type ImageGalleryPopUpProps = {
    images: CarGalleryImage[];
    selectedIndex: number;
    onClose: () => void;
}

const ImageGalleryPopUp: FC<ImageGalleryPopUpProps> = ({ images, selectedIndex, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(selectedIndex);

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => {
            if (prevIndex === 0) {
                return images.length - 1;
            } else {
                return prevIndex - 1;
            }
        });
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => {
            if (prevIndex === images.length - 1) {
                return 0;
            } else {
                return prevIndex + 1;
            }
        });
    };

    return (
        <div className="image-gallery-pop-up d-flex flex-column justify-content-center align-tems-center">
            <button className="close-button pointer text-light position-absolute bg-transparent border-0 text-light fs-6" onClick={onClose}>
                Close
            </button>

            <div className="image-container d-flex flex-column justify-content-center align-items-center">
                <GatsbyImage
                    className="popup-image rounded-4"
                    image={images[currentImageIndex].gatsbyImage}
                    alt="Auto"
                />
                <div className="navigation-buttons d-flex justify-content-center align-items-center mt-2 fs-5 text-light">
                    <button className="prev-button pointer border-0 bg-transparent fs-6 py-2 px-3 text-light me-2" onClick={handlePrevImage}>
                        Previous
                    </button>

                    <span className="text-light">
                        {currentImageIndex + 1} / {images.length}
                    </span>

                    <button className="next-button pointer border-0 bg-transparent fs-6 py-2 px-3 text-light ms-2" onClick={handleNextImage}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageGalleryPopUp;