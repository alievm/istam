import React, { useEffect, useState } from "react";
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    Upload,
    message,
    Popconfirm,
} from "antd";
import {
    PlusOutlined,
    UploadOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { TextArea } = Input;

const NewsCRUD = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentNews, setCurrentNews] = useState(null);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    // Fetch all news items
    const fetchNews = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/news`);
            setNews(response.data);
        } catch (error) {
            message.error("Failed to fetch news.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    // Handle create and update news
    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("content", values.content);
        formData.append("file", fileList[0].originFileObj);
        formData.append("author", values.author || "Anonymous");

        try {
            if (currentNews) {
                await axios.put(`${BASE_URL}/news/${currentNews._id}`, formData);
                message.success("News updated successfully.");
            } else {
                await axios.post(`${BASE_URL}/news`, formData);
                message.success("News created successfully.");
            }
            fetchNews();
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            message.error("Failed to save news.");
        }
    };

    // Handle delete news
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/news/${id}`);
            message.success("News deleted successfully.");
            fetchNews();
        } catch (error) {
            message.error("Failed to delete news.");
        }
    };

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    // Open modal for editing or creating news
    const openModal = (record = null) => {
        setCurrentNews(record);
        if (record) {
            form.setFieldsValue(record);
        } else {
            form.resetFields();
        }
        setIsModalVisible(true);
    };

    const columns = [
        {
            title: "Название",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Автор",
            dataIndex: "author",
            key: "author",
        },
        {
            title: "Действия",
            key: "actions",
            render: (text, record) => (
                <>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => openModal(record)}
                        style={{ marginRight: 8 }}
                    />
                    <Popconfirm
                        title="Вы уверены что хотите удалить эту новость ?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-between p-5">
                <h1 className="font-semibold text-xl">Новости</h1>
                <Button
                    type="primary"
                    icon={<PlusOutlined/>}
                    onClick={() => openModal()}
                    style={{marginBottom: 16}}
                >
                    Добавить Новости
                </Button>
            </div>


            <Table
                dataSource={news}
                columns={columns}
                rowKey="_id"
                loading={loading}
            />

            <Modal
                title={currentNews ? "Изменить новость" : "Добавить новость"}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{author: "Anonymous"}}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{required: true, message: "Введите название новости"}]}
                    >
                        <Input placeholder="Введите название новости"/>
                    </Form.Item>

                    <Form.Item
                        name="content"
                        label="Content"
                        rules={[{required: true, message: "Введите контент"}]}
                    >
                        <TextArea rows={4} placeholder="Введите контент"/>
                    </Form.Item>

                    <Form.Item name="author" label="Автор">
                        <Input placeholder="Введите автора"/>
                    </Form.Item>

                    <Form.Item name="imageUrl" label="Загрузить изображение">
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={handleUploadChange}
                            beforeUpload={() => false} // Prevent auto-upload
                            maxCount={1}
                        >
                            {fileList.length < 1 && (
                                <div>
                                    <PlusOutlined/>
                                    <div style={{marginTop: 8}}>Загрузить</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginRight: 8}}>
                            {currentNews ? "Изменить" : "Создать"}
                        </Button>
                        <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default NewsCRUD;
