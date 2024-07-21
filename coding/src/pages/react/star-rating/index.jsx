import React, { useState } from 'react';
import styles from './starrating.module.css';

const StarRating = ({ totalStars = 5 }) => {
    const [rating, setRating] = useState(0);

    return (
        <div className={styles.starRating}>
            {[...Array(totalStars)].map((_, i) => (
                <label key={i}>
                    <input
                        type="radio"
                        name="rating"
                        value={i + 1}
                        onClick={() => setRating(i + 1)}
                    />
                    <span className={`${styles.star} ${i < rating ? styles.filled : ''}`}>★</span>
                </label>
            ))}
        </div>
    );
};

export default StarRating;
