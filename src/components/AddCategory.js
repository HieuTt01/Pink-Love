import React from 'react';
import { Form, Modal, Button, Input, Col, message } from 'antd';




const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
//   const tailLayout = {
//     wrapperCol: { offset: 8, span: 16 },
//   };

function AddCategory(props) {

    const { closeModal, isModalVisible, addCategory, nextId } = props

    const handleOk = () => {
        closeModal();
    };

    const handleCancel = () => {
        closeModal();
    };


    const onFinish = values => {
        const newCate = {
            id: nextId,
            title: values.title
        }
        addCategory(newCate);
        message.success("Category added successfully")
        closeModal();
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>
            <Modal 
                title="Add A Category" 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
                footer={[
                    <Button form="add-category" type="primary" key="submit" htmlType="submit">
                        OK
                    </Button>
                ]}
            >
                <Form id="add-category"
                    {...layout}
                    name="category"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item 
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input title!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default AddCategory;