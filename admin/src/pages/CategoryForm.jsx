import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createCategory, updateCategory } from '../services/categoryService';

const CategoryForm = () => {
    const [name, setName] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // Здесь можно добавить логику для загрузки данных категории для редактирования
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const category = { name };

        if (id) {
            await updateCategory(id, category);
        } else {
            await createCategory(category);
        }

        navigate('/categories');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>{id ? 'Edit Category' : 'Create Category'}</h1>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Category Name"
                required
            />
            <button type="submit">Save</button>
        </form>
    );
};

export default CategoryForm;
