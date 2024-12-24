import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Popconfirm, message, Modal, Form, Input } from 'antd';
import { getCategories, deleteCategory, createCategory, updateCategory } from '../services/categoryService';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const [form] = Form.useForm();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            message.error('Не удалось загрузить категории.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteCategory(id);
            setCategories((prevCategories) =>
                prevCategories.filter((category) => category._id !== id)
            );
            message.success('Категория успешно удалена.');
        } catch (error) {
            message.error('Не удалось удалить категорию.');
        }
    };

    const handleModalOpen = (category = null) => {
        setEditingCategory(category);
        if (category) {
            form.setFieldsValue(category);
        } else {
            form.resetFields();
        }
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setEditingCategory(null);
    };

    const handleFormSubmit = async (values) => {
        setLoading(true);
        try {
            if (editingCategory) {
                await updateCategory(editingCategory._id, values);
                message.success('Категория успешно обновлена.');
            } else {
                await createCategory(values);
                message.success('Категория успешно создана.');
            }
            fetchCategories();
            handleModalClose();
        } catch (error) {
            message.error('Не удалось сохранить категорию.');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Наименование',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleModalOpen(record)}>
                        Изменить
                    </Button>
                    <Popconfirm
                        title="Вы уверены, что хотите удалить эту категорию?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button type="primary" danger>
                            Удалить
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-between p-5">
                <h1 className="font-semibold text-xl">Категории</h1>
                <Button type="primary" onClick={() => handleModalOpen()}>
                    Создать новую категорию
                </Button>
            </div>
            <Table
                dataSource={categories}
                columns={columns}
                rowKey="_id"
                loading={loading}
                bordered
            />

            <Modal
                title={editingCategory ? 'Изменить категорию' : 'Создать категорию'}
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                    <Form.Item
                        label="Наименование категории"
                        name="name"
                        rules={[{ required: true, message: 'Введите наименование категории!' }]}
                    >
                        <Input placeholder="Введите наименование категории" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            {editingCategory ? 'Сохранить изменения' : 'Создать категорию'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CategoryList;
