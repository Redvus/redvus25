// components/ProductCard.js
import React from 'react';

const ProductCard = ({ product, onBack, categoryName }) => {
    return (
        <div className="product-card">
            <div className="product-header">
                <button onClick={onBack} className="back-button">
                    ← Назад к {categoryName || 'товарам'}
                </button>
            </div>

            <div className="product-content">
                <div className="product-image">
                    <img
                        src={`https://via.placeholder.com/400x300?text=${product.name}`}
                        alt={product.name}
                    />
                </div>

                <div className="product-info">
                    <h1>{product.name}</h1>
                    <p className="product-price">{product.price} ₽</p>
                    <p className="product-description">{product.description}</p>

                    <div className="product-actions">
                        <button className="add-to-cart">Добавить в корзину</button>
                        <button className="buy-now">Купить сейчас</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;