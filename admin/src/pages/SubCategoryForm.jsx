import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createSubCategory, updateSubCategory } from '../services/subCategoryService';
import { getCategories } from '../services/categoryService';
import { Form, Input, Button, Select, message, Typography } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const SubCategoryForm = () => {
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                message.error('Failed to fetch categories.');
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();

        if (id) {
            // Здесь добавьте логику для загрузки существующей подкатегории
            // Например, вызов API для получения данных подкатегории
        }
    }, [id]);

    const handleSubmit = async () => {
        const subCategory = { name, categoryId };

        try {
            if (id) {
                await updateSubCategory(id, subCategory);
                message.success('Subcategory updated successfully.');
            } else {
                await createSubCategory(subCategory);
                message.success('Subcategory created successfully.');
            }
            navigate('/subcategories');
        } catch (error) {
            message.error('Failed to save subcategory.');
        }
    };

    return (
        <div className="p-5">
            <Title level={2} className="mb-4">
                {id ? 'Редактировать подкатегорию' : 'Создать подкатегорию'}
            </Title>
            <Form
                layout="vertical"
                onFinish={handleSubmit}
                className="max-w-xl mx-auto bg-white p-5 shadow-md rounded-md"
            >
                <Form.Item
                    label="Наименование подкатегории"
                    name="name"
                    rules={[{ required: true, message: 'Введите наименование подкатегории!' }]}
                >
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введите наименование подкатегории"
                    />
                </Form.Item>

                <Form.Item
                    label="Категория"
                    name="categoryId"
                    rules={[{ required: true, message: 'Выберите категорию!' }]}
                >
                    <Select
                        value={categoryId}
                        onChange={(value) => setCategoryId(value)}
                        placeholder="Выберите категорию"
                        loading={loading}
                    >
                        {categories.map((category) => (
                            <Option key={category._id} value={category._id}>
                                {category.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        {id ? 'Сохранить изменения' : 'Создать подкатегорию'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SubCategoryForm;
