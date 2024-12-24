import { useState, useEffect } from "react";
import { createClothing } from "../services/clothingService";
import { getCategories } from "../services/categoryService"; // Функция для получения категорий
import { getSubCategories } from "../services/subCategoryService"; // Функция для получения подкатегорий
import { useNavigate } from "react-router-dom";

const ClothingForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        categoryId: "",
        subCategoryId: "",
        sizes: [],
        colors: [],
    });
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const navigate = useNavigate();

    // Загружаем категории при монтировании компонента
    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesData = await getCategories(); // Получаем все категории
            setCategories(categoriesData);
        };

        fetchCategories();

        // Загружаем все подкатегории при монтировании компонента
        const fetchSubCategories = async () => {
            const subCategoriesData = await getSubCategories(); // Получаем все подкатегории
            setSubCategories(subCategoriesData);
        };

        fetchSubCategories();
    }, []);

    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        setFormData({ ...formData, categoryId: selectedCategoryId });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createClothing(formData); // Создание одежды
        navigate("/"); // Перенаправляем на главную страницу
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Add New Clothing</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="block w-full mb-4 p-2 border"
                    onChange={handleChange}
                    required
                />

                {/* Выбор категории */}
                <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleCategoryChange}
                    className="block w-full mb-4 p-2 border"
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                {/* Выбор подкатегории */}
                <select
                    name="subCategoryId"
                    value={formData.subCategoryId}
                    onChange={handleChange}
                    className="block w-full mb-4 p-2 border"
                >
                    <option value="">Select Subcategory</option>
                    {subCategories.map((subCategory) => (
                        <option key={subCategory._id} value={subCategory._id}>
                            {subCategory.name}
                        </option>
                    ))}
                </select>

                {/* Поля для размеров и цветов */}
                <input
                    type="text"
                    name="sizes"
                    placeholder="Sizes (comma separated)"
                    className="block w-full mb-4 p-2 border"
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value.split(",") })}
                />

                <input
                    type="text"
                    name="colors"
                    placeholder="Colors (comma separated)"
                    className="block w-full mb-4 p-2 border"
                    onChange={(e) => setFormData({ ...formData, colors: e.target.value.split(",") })}
                />

                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ClothingForm;
