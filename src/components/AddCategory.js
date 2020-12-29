import React from 'react';
import { Form, Modal, Button, Input } from 'antd';



const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 18 },
  };
//   const tailLayout = {
//     wrapperCol: { offset: 8, span: 16 },
//   };

function AddCategory(props) {

    const { closeModal, isModalVisible } = props

    const handleOk = () => {
        closeModal();
    };

    const handleCancel = () => {
        closeModal();
    };


    const onFinish = values => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };
    

    return (
        <>
            <Modal title="Add A Category" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    >
                    <Form.Item
                        label="Category's title"
                        name="name"
                        rules={[{ required: true, message: 'Please input title!' }]}
                    >
                        <Input />
                    </Form.Item>

                    {/* <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                        Add
                        </Button>
                    </Form.Item> */}
                </Form>
            </Modal>
        </>
    );
}

export default AddCategory;