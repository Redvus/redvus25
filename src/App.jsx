// App.js
import React, { useState } from 'react';
import CategoryList from './components/tests/CategoryList';
import ProductCard from './components/tests/ProductCard';
import './styles/app.scss';

const App = () => {
    const [currentView, setCurrentView] = useState('categories');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Пример данных
    const categories = [
        {
            id: 1,
            name: 'Электроника',
            products: [
                { id: 1, name: 'Смартфон', price: 29999, description: 'Мощный смартфон' },
                { id: 2, name: 'Ноутбук', price: 59999, description: 'Игровой ноутбук' }
            ]
        },
        {
            id: 2,
            name: 'Одежда',
            products: [
                { id: 3, name: 'Футболка', price: 1999, description: 'Хлопковая футболка' },
                { id: 4, name: 'Джинсы', price: 3999, description: 'Классические джинсы' }
            ]
        }
    ];

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setCurrentView('products');
    };

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setCurrentView('product');
    };

    const handleBackToCategories = () => {
        setCurrentView('categories');
        setSelectedCategory(null);
        setSelectedProduct(null);
    };

    const handleBackToProducts = () => {
        setCurrentView('products');
        setSelectedProduct(null);
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>Магазин</h1>
                {currentView !== 'categories' && (
                    <button onClick={handleBackToCategories} className="back-button">
                        ← На главную
                    </button>
                )}
            </header>

            <main className="app-main">
                {currentView === 'categories' && (
                    <CategoryList
                        categories={categories}
                        onCategorySelect={handleCategorySelect}
                    />
                )}

                {currentView === 'products' && selectedCategory && (
                    <div className="products-page">
                        <div className="page-header">
                            <button onClick={handleBackToCategories} className="back-button">
                                ← Назад к категориям
                            </button>
                            <h2>{selectedCategory.name}</h2>
                        </div>
                        <div className="products-grid">
                            {selectedCategory.products.map(product => (
                                <div
                                    key={product.id}
                                    className="product-item"
                                    onClick={() => handleProductSelect(product)}
                                >
                                    <h3>{product.name}</h3>
                                    <p>{product.price} ₽</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {currentView === 'product' && selectedProduct && (
                    <ProductCard
                        product={selectedProduct}
                        onBack={handleBackToProducts}
                        categoryName={selectedCategory?.name}
                    />
                )}
            </main>
        </div>
    );
};

export default App;