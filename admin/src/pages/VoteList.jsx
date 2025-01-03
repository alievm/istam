import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Popconfirm, message, Modal, Form, Input, Progress, Switch } from 'antd';
import { getVotes, createVote, updateVote, deleteVote, toggleVoteActiveStatus } from '../services/voteService';

const VoteList = () => {
    const [votes, setVotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingVote, setEditingVote] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchVotes();
    }, []);

    const fetchVotes = async () => {
        setLoading(true);
        try {
            const data = await getVotes();
            setVotes(data);
        } catch (error) {
            message.error('Не удалось загрузить голосования.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteVote(id);
            setVotes((prevVotes) => prevVotes.filter((vote) => vote._id !== id));
            message.success('Голосование успешно удалено.');
        } catch (error) {
            message.error('Не удалось удалить голосование.');
        }
    };

    const handleToggleStatus = async (id, isActive) => {
        try {
            await toggleVoteActiveStatus(id, isActive);
            fetchVotes(); // Refresh votes after the toggle
            message.success(isActive ? 'Голосование активировано.' : 'Голосование деактивировано.');
        } catch (error) {
            message.error('Не удалось изменить статус голосования.');
        }
    };

    const handleModalOpen = (vote = null) => {
        setEditingVote(vote);
        if (vote) {
            form.setFieldsValue({
                title: vote.title,
                options: vote.options.map((option) => ({ option: option.option })),
            });
        } else {
            form.resetFields();
        }
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setEditingVote(null);
    };

    const handleFormSubmit = async (values) => {
        setLoading(true);
        try {
            const options = values.options.map((option) => ({ option: option.option.trim(), votes: 0 }));

            if (editingVote) {
                await updateVote(editingVote._id, { title: values.title, options });
                message.success('Голосование успешно обновлено.');
            } else {
                await createVote({ title: values.title, options });
                message.success('Голосование успешно создано.');
            }
            fetchVotes();
            handleModalClose();
        } catch (error) {
            message.error('Не удалось сохранить голосование.');
        } finally {
            setLoading(false);
        }
    };

    const renderOptionsWithProgress = (options) => {
        const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);
        return (
            <div>
                {options.map((option) => {
                    const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                    return (
                        <div key={option._id} style={{marginBottom: '10px'}}>
                            <span>{option.option}</span>
                            <span
                                className="inline-flex gap-3 items-center rounded-md bg-gray-50 px-2 m-1 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                {option.votes}
                            </span>
                            <Progress percent={Math.round(percentage)} />
                        </div>
                    );
                })}
            </div>
        );
    };

    const columns = [
        {
            title: 'Заголовок',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Варианты',
            dataIndex: 'options',
            key: 'options',
            render: (options) => renderOptionsWithProgress(options),
        },
        {
            title: 'Активность',
            key: 'active',
            render: (text, record) => (
                <Switch
                    checked={record.isActive}
                    onChange={(checked) => handleToggleStatus(record._id, checked)}
                    loading={loading}
                />
            ),
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (text, record) => (
                <Space>
                    <Popconfirm
                        title="Вы уверены, что хотите удалить это голосование?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button danger>Удалить</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-between p-5">
                <h1 className="font-semibold text-xl">Голосования</h1>
                <Button type="primary" onClick={() => handleModalOpen()}>
                    Создать новое голосование
                </Button>
            </div>
            <Table
                dataSource={votes}
                columns={columns}
                rowKey="_id"
                loading={loading}
                bordered
            />

            <Modal
                title={editingVote ? 'Изменить голосование' : 'Создать голосование'}
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                    <Form.Item
                        label="Заголовок голосования"
                        name="title"
                        rules={[{ required: true, message: 'Введите заголовок голосования!' }]}
                    >
                        <Input placeholder="Введите заголовок голосования" />
                    </Form.Item>

                    <Form.List name="options" initialValue={[{ option: '' }]}>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'option']}
                                            fieldKey={[fieldKey, 'option']}
                                            rules={[{ required: true, message: 'Введите вариант!' }]}
                                        >
                                            <Input placeholder="Введите вариант" />
                                        </Form.Item>
                                        <Button type="dashed" danger onClick={() => remove(name)}>
                                            Удалить
                                        </Button>
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block>
                                        Добавить вариант
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            {editingVote ? 'Сохранить изменения' : 'Создать голосование'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default VoteList;
