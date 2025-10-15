// components/CategoryList.js
import React from 'react';

const CategoryList = ({ categories, onCategorySelect }) => {
  return (
    <div className="category-list">
      <h2>Категории товаров</h2>
      <div className="categories-grid">
        {categories.map(category => (
          <div 
            key={category.id} 
            className="category-card"
            onClick={() => onCategorySelect(category)}
          >
            <h3>{category.name}</h3>
            <p>Товаров: {category.products.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;