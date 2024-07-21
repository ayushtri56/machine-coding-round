import React, { useState } from 'react';
import styles from './carousel.module.css';

export const images = [
    { src: 'https://via.placeholder.com/600x400?text=Image+1', alt: 'Image 1' },
    { src: 'https://via.placeholder.com/600x400?text=Image+2', alt: 'Image 2' },
    { src: 'https://via.placeholder.com/600x400?text=Image+3', alt: 'Image 3' }
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const showSlide = (index) => {
        if (index >= images.length) {
            setCurrentIndex(0);
        } else if (index < 0) {
            setCurrentIndex(images.length - 1);
        } else {
            setCurrentIndex(index);
        }
    };

    const nextSlide = () => {
        showSlide(currentIndex + 1);
    };

    const prevSlide = () => {
        showSlide(currentIndex - 1);
    };

    return (
        <div className={styles.carousel}>
            <div className={styles.carouselInner} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <div className={styles.carouselItem} key={index}>
                        <img src={image.src} alt={image.alt} className={styles.image} />
                    </div>
                ))}
            </div>
            <button className={`${styles.carouselControl} ${styles.prev}`} onClick={prevSlide}>&#10094;</button>
            <button className={`${styles.carouselControl} ${styles.next}`} onClick={nextSlide}>&#10095;</button>
        </div>
    );
};

export default Carousel;
