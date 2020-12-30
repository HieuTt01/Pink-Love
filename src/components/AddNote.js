import React from 'react';
import { Form, Modal, Button, Input, Select, message } from 'antd';
import { FormOutlined, FileAddOutlined } from '@ant-design/icons';
import './AddForm.css'
import moment from 'moment'


const { Option } = Select;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

function AddNote(props) {

    const { 
        openAddNote, 
        closeAddNote, 
        isOpenAddNote, 
        category, 
        openAddCate, 
        nextId,
        addNote,
    } = props

    const showModal = () => {
        openAddNote();
    };
    const handleOk = () => {
        closeAddNote();
    };

    const handleCancel = () => {
        closeAddNote();
    };


    const onFinish = values => {
        const newNote = {
            item: {
                id: nextId,
                title: values.title,
                cateId: values.cateId,
                content: values.content,
                date: moment().format('DD/MM/YYYY')
            }
        }
        addNote(newNote);
        message.success("Note added successfully")
        closeAddNote();
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        message.error(errorInfo)
    };

    const showCategoryModal = () => {
        openAddCate();
    };


    return (
        <>
            <Button className="title-button" icon={<FormOutlined />} onClick={showModal}>
            </Button>
            <Modal 
                title="Add A Note"
                visible={isOpenAddNote} 
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button form="add-note" type="primary" key="submit" htmlType="submit">
                        OK
                    </Button>
                ]}
            >
                <Form
                    {...layout}
                    name="note"
                    id="add-note"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="title"
                        name="title"
                        rules={[{ required: true, message: 'Please input note title!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name="cateId" 
                        rules={[{ required: true, message: 'Please select category!' }]}
                    >
                            <Select  style={{width: "33%" }}  placeholder="Select category">
                            {category.map((cate) => (
                                <Option key={cate.id}  value={cate.id} >{cate.title}</Option>
                            ))}
                            </Select>
                    </Form.Item>
                    {/* <Button style={{margin: "0 10px"}}  icon={<FileAddOutlined />} onClick={showCategoryModal}>
                            </Button> */}
                    <Form.Item
                        label="Content"
                        name="content"
                        rules={[{ required: true, message: 'Please input content!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>


                </Form>
            </Modal>
        </>
    );
}

export default AddNote;