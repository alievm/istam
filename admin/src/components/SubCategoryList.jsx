import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Popconfirm, message, Modal, Form, Input } from 'antd';
import { getSubCategories, deleteSubCategory, createSubCategory, updateSubCategory } from '../services/subCategoryService';

const SubCategoryList = () => {
    const [subCategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingSubCategory, setEditingSubCategory] = useState(null);

    const [form] = Form.useForm();

    useEffect(() => {
        fetchSubCategories();
    }, []);

    const fetchSubCategories = async () => {
        setLoading(true);
        try {
            const data = await getSubCategories();
            setSubCategories(data);
        } catch (error) {
            message.error('Не удалось загрузить подкатегории.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteSubCategory(id);
            setSubCategories((prevSubCategories) =>
                prevSubCategories.filter((subCategory) => subCategory._id !== id)
            );
            message.success('Подкатегория успешно удалена.');
        } catch (error) {
            message.error('Не удалось удалить подкатегорию.');
        }
    };

    const handleModalOpen = (subCategory = null) => {
        setEditingSubCategory(subCategory);
        if (subCategory) {
            form.setFieldsValue(subCategory);
        } else {
            form.resetFields();
        }
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setEditingSubCategory(null);
    };

    const handleFormSubmit = async (values) => {
        setLoading(true);
        try {
            if (editingSubCategory) {
                await updateSubCategory(editingSubCategory._id, values);
                message.success('Подкатегория успешно обновлена.');
            } else {
                await createSubCategory(values);
                message.success('Подкатегория успешно создана.');
            }
            fetchSubCategories();
            handleModalClose();
        } catch (error) {
            message.error('Не удалось сохранить подкатегорию.');
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
                        title="Вы уверены, что хотите удалить эту подкатегорию?"
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
                <h1 className="font-semibold text-xl">Подкатегории</h1>
                <Button type="primary" onClick={() => handleModalOpen()}>
                    Создать новую подкатегорию
                </Button>
            </div>
            <Table
                dataSource={subCategories}
                columns={columns}
                rowKey="_id"
                loading={loading}
                bordered
            />

            <Modal
                title={editingSubCategory ? 'Изменить подкатегорию' : 'Создать подкатегорию'}
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                    <Form.Item
                        label="Наименование подкатегории"
                        name="name"
                        rules={[{ required: true, message: 'Введите наименование подкатегории!' }]}
                    >
                        <Input placeholder="Введите наименование подкатегории" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            {editingSubCategory ? 'Сохранить изменения' : 'Создать подкатегорию'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SubCategoryList;
