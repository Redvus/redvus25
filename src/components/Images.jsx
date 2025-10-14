import React from 'react';
import { images } from '../assets/images';

const Images = ({
    name,
    alt,
    className,
    fallback = 'placeholder',
    ...props
}) => {
    const imageSrc = images[name] || images[fallback];

    return (
        <img
            src={imageSrc}
            alt={alt}
            className={className}
            onError={(e) => {
                e.target.src = images[fallback];
            }}
            {...props}
        />
    );
};

export default Images;