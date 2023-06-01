import React, { FC, useState } from "react";
import { CarGalleryImage } from "../types/allWpCarTypes";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

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
        <div className="image-gallery-pop-up">
            <button className="close-button" onClick={onClose}>
                close
            </button>

            <div className="image-container">
                <GatsbyImage
                    className="popup-image"
                    image={images[currentImageIndex].gatsbyImage}
                    alt="Auto"
                />
                <div className="photo-counter navigation-buttons">
                    <button className="prev-button" onClick={handlePrevImage}>
                        Previous
                    </button>

                    <span>
                        {currentImageIndex + 1} / {images.length}
                    </span>

                    <button className="next-button" onClick={handleNextImage}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageGalleryPopUp;