import React, { useState, useEffect } from "react";
import {Button, Modal, Form, Input, Select, message, Upload, Table, Image, Switch} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {getAllClothing, deleteClothing, createClothing, updateClothingTrending} from "../services/clothingService";
import { getCategories } from "../services/categoryService";
import { getSubCategories } from "../services/subCategoryService";
import { debounce } from "lodash";

const colorOptions = [
    { label: 'Красный', value: 'red' },
    { label: 'Синий', value: 'blue' },
    { label: 'Зеленый', value: 'green' },
    { label: 'Черный', value: 'black' },
    { label: 'Белый', value: 'white' },
    { label: 'Желтый', value: 'yellow' },
    { label: 'Оранжевый', value: 'orange' },
    { label: 'Розовый', value: 'pink' },
    { label: 'Фиолетовый', value: 'purple' },
];

const { Option } = Select;

const Dashboard = () => {
    const [clothing, setClothing] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [isTrending, setIsTrending] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const DIR_URL = import.meta.env.VITE_DIRECTORY_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clothingData = await getAllClothing({
                    subCategoryId: selectedSubCategory,
                    isTrending: isTrending,
                    name: searchTerm,
                });
                setClothing(clothingData);
            } catch (error) {
                message.error("Ошибка при получении данных");
            }
        };

        fetchData();
    }, [selectedSubCategory, isTrending, searchTerm]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {

                const categoriesData = await getCategories();
                setCategories(categoriesData);

                const subCategoriesData = await getSubCategories();
                setSubCategories(subCategoriesData);
            } catch (error) {
                message.error("Ошибка при получении данных");
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteClothing(id);
            setClothing(clothing.filter((item) => item._id !== id));
            message.success("Элемент успешно удален");
        } catch (error) {
            message.error("Ошибка при удалении элемента");
        }
    };

    const colorOptions = [
        { label: 'Красный', value: 'red' },
        { label: 'Синий', value: 'blue' },
        { label: 'Зеленый', value: 'green' },
        { label: 'Черный', value: 'black' },
        { label: 'Белый', value: 'white' },
        { label: 'Желтый', value: 'yellow' },
        { label: 'Оранжевый', value: 'orange' },
        { label: 'Розовый', value: 'pink' },
        { label: 'Фиолетовый', value: 'purple' },
        // Добавьте другие актуальные цвета
    ];

    const sizeOptions = [
        { label: 'S', value: 'S' },
        { label: 'M', value: 'M' },
        { label: 'L', value: 'L' },
        { label: 'XL', value: 'XL' },
        { label: 'XXL', value: 'XXL' },
        { label: 'XXXL', value: 'XXXL' },
    ];



    const handleAddClothing = async (values) => {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("categoryId", values.categoryId);
            if (values.subCategoryId) formData.append("subCategoryId", values.subCategoryId);
            if (values.sizes) formData.append("sizes", JSON.stringify(values.sizes));
            if (values.colors) formData.append("colors", JSON.stringify(values.colors));
            formData.append("trending", values.trending);
            if (fileList.length) {
                formData.append("file", fileList[0].originFileObj);
            }

            const newClothing = await createClothing(formData);
            setClothing([...clothing, newClothing]);
            message.success("Одежда успешно добавлена");
            setIsModalVisible(false);
            form.resetFields();
            setFileList([]);
        } catch (error) {
            message.error("Ошибка при добавлении одежды");
        }
    };

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const handleSearchChange = debounce((e) => {
        setSearchTerm(e.target.value);
    }, 500);

    const handleTrendingChange = async (id, isTrending) => {
        try {
            await updateClothingTrending(id, isTrending);
            setClothing(
                clothing.map((item) =>
                    item._id === id ? { ...item, isTrending } : item
                )
            );
            message.success("Статус тренда обновлен");
        } catch (error) {
            message.error("Ошибка при обновлении статуса тренда");
        }
    };


    // Table columns for clothing data
    const columns = [
        {
            title: '#',
            dataIndex: '_id',
            key: '_id',
        },{
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Категория',
            dataIndex: 'categoryId',
            key: 'categoryId',
            render: (categoryId) => categoryId.name, // Directly access and return the 'name' property
        },
        {
            title: 'Подкатегория',
            dataIndex: 'subCategoryId',
            key: 'subCategoryId',
            render: (subCategoryId) => subCategoryId.name, // Directly access and return the 'name' property
        },
        {
            title: "Тренд",
            dataIndex: "isTrending", // Исправлено поле на isTrending
            key: "isTrending",
            render: (isTrending, record) => (
                <Switch
                    checked={isTrending}
                    onChange={(checked) => handleTrendingChange(record._id, checked)}
                />
            ),
        },
        {
            title: 'Размеры',
            dataIndex: 'sizes',
            key: 'sizes',
            render: (sizes) => (
                JSON.parse(sizes).map((size) => <span key={size}
                    className="inline-flex gap-3 items-center rounded-md bg-gray-50 px-2 m-1 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            {size}
          </span>)
            ),
        },
        {
            title: 'Цвета',
            dataIndex: 'colors',
            key: 'colors',
            render: (colors) => (
                JSON.parse(colors).map((color) => <span key={color}
                                                        className="inline-flex gap-3 m-1 items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            {color}
          </span>)
            ),
        },
        {
            title: 'Изображение',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (imageUrl) => <Image src={`${DIR_URL}${imageUrl}`} alt={`${DIR_URL}${imageUrl}`} style={{ width: 50, height: 50 }} className="object-cover will-change-auto" />,
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_, record) => (
                <Button type="primary" danger onClick={() => handleDelete(record._id)}>Удалить</Button>
            ),
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-between p-5">
                <h2 className="text-2xl font-bold mb-4">Все товары</h2>

                <div className="filters p-5">
                    {/* Trend Filter */}
                    <Select
                        placeholder="Выберите тренд"
                        onChange={(value) => setIsTrending(value)}
                        style={{width: 200, marginRight: 20}}
                    >
                        <Option value={null}>Все</Option>
                        <Option value={true}>Тренд</Option>
                        <Option value={false}>Не тренд</Option>
                    </Select>

                    <Input.Search
                        placeholder="Поиск по названию"
                        onChange={handleSearchChange}
                        style={{ width: 300, marginRight: 20 }}
                    />

                    {/* Subcategory Filter */}
                    <Select
                        placeholder="Выберите подкатегорию"
                        onChange={(value) => setSelectedSubCategory(value)}
                        style={{width: 200}}
                    >
                        <Option value={null}>Все</Option>
                        {subCategories.map((subCategory) => (
                            <Option key={subCategory._id} value={subCategory._id}>
                                {subCategory.name}
                            </Option>
                        ))}
                    </Select>
                </div>

                <Button type="primary" onClick={() => setIsModalVisible(true)}>
                    Добавить одежду
                </Button>
            </div>

            <Table
                size="small"
                dataSource={clothing}
                columns={columns}
                rowKey="_id"
                pagination={false}
            />

            {/* Modal to add new clothing */}
            <Modal
                title="Добавить одежду"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleAddClothing}>
                    <Form.Item
                        name="name"
                        label="Название"
                        rules={[{ required: true, message: "Пожалуйста, введите название" }]}
                    >
                        <Input placeholder="Введите название одежды" />
                    </Form.Item>

                    <Form.Item
                        name="categoryId"
                        label="Категория"
                        rules={[{ required: true, message: "Пожалуйста, выберите категорию" }]}
                    >
                        <Select placeholder="Выберите категорию">
                            {categories.map((category) => (
                                <Option key={category._id} value={category._id}>
                                    {category.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="subCategoryId"
                        label="Подкатегория"
                        rules={[{ required: true, message: "Пожалуйста, выберите подкатегорию" }]}
                    >
                        <Select placeholder="Выберите подкатегорию">
                            {subCategories.map((subCategory) => (
                                <Option key={subCategory._id} value={subCategory._id}>
                                    {subCategory.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="sizes"
                        label="Размеры"
                        rules={[{ required: true, message: "Пожалуйста, выберите хотя бы один размер" }]}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Выберите размеры"
                            optionLabelProp="label"
                            defaultValue={[]}
                        >
                            {sizeOptions.map((size) => (
                                <Option key={size.value} value={size.value} label={size.label}>
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 border rounded-md text-sm">{size.label}</span>
                                    </div>
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="colors"
                        label="Цвета"
                        rules={[{ required: true, message: "Пожалуйста, выберите хотя бы один цвет" }]}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Выберите цвета"
                            optionLabelProp="label"
                            defaultValue={[]}
                        >
                            {colorOptions.map((color) => (
                                <Option key={color.value} value={color.value} label={color.label}>
                                    <div className="flex items-center gap-2">
                            <span
                                style={{
                                    display: 'inline-block',
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: color.value,
                                }}
                            />
                                        {color.label}
                                    </div>
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="trending" label="Тренд" valuePropName="checked">
                        <Switch />
                    </Form.Item>

                    <Form.Item
                        name="imageUrl"
                        label="Загрузить изображение"
                        rules={[{ required: true, message: "Пожалуйста, загрузите изображение" }]}
                    >
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={handleUploadChange}
                            beforeUpload={() => false} // Prevent auto-upload
                            maxCount={1}
                        >
                            {fileList.length < 1 && (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Загрузить</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    );
};

export default Dashboard;
