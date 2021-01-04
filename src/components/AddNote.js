import React, { useEffect, useState } from 'react';
import { Form, Modal, Button, Input, Select, message, Divider } from 'antd';
import { FormOutlined, PlusOutlined, FileAddOutlined } from '@ant-design/icons';
import './AddForm.css'
import moment from 'moment'


const { Option } = Select;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

function AddNote(props) {
    const [form] = Form.useForm();

    const[newCate, setNewCate] = useState('')
    const [category, setCategory] = useState([])

    const {
        openAddNote,
        closeAddNote,
        isOpenAddNote,
        // openAddCate,
        addNote,
        note,
        editNote,
        isActive,   
    } = props
    useEffect(() => {
        setCategory(props.category)
    }, [props.category])

    useEffect(() => {
        if (props.note.id) {
            console.log("values: ", note)
            const values = {
                id: note.id,
                title: note.title,
                content: note.content,
                cateId: note.category.id,
                date: note.date
            }
            form.setFieldsValue(values)
        }
    }, [note.id]);

    const showModal = () => {
        openAddNote();
    };
    const handleOk = () => {
        closeAddNote();
        clearFormValues();
    };

    const handleCancel = () => {
        closeAddNote();
        clearFormValues();
    };

    const clearFormValues = () => {
        form.resetFields();
        console.log(form)
    }


    const getCategoryById = cateId => {
        const index = category.findIndex(x => x.id === cateId)
        return category[index]
    }

    const genNewId = () => Math.random().toString(36).substr(2, 23)

    function handleAddcategory() {
        try {
            if(newCate.length > 0) {
            const newcategory = {
                id: genNewId(),
                title: newCate
            }
            console.log(newcategory)
            const newListCate = [...category]
            newListCate.push(newcategory)
            setCategory(newListCate)
            }
        } catch(e) {
            message.error(e)
        }
    }

    const onFinish = values => {
        const noteCate = getCategoryById(values.cateId)
        const newNote = {
            title: values.title,
            category: noteCate,
            content: values.content,
        }
        if (note.id) {
            newNote["id"] = note.id
            newNote["date"] = note.date
            newNote["modifyDate"] = moment().format('DD/MM/YYYY')
            editNote(newNote)
        } else {
            newNote["id"] = genNewId()
            newNote["date"] = moment().format('DD/MM/YYYY')
            addNote(newNote);
        }
        closeAddNote();
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    // const showCategoryModal = () => {
    //     openAddCate();
    // };

    return (
        <>
            <Button className="title-button" icon={<FormOutlined />} onClick={showModal}>
            </Button>
            <Modal
                title={!note.id ? "Add A Note" : "Edit Note"}
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
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    form={form}
                >
                    <Form.Item
                        label="title"
                        name="title"
                        // initialValues={note.title}
                        rules={[{ required: true, message: 'Please input note title!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name="cateId"
                        // value={note.category.id}
                        rules={[{ required: true, message: 'Please select category!' }]}
                    >
                        <Select 
                            style={{ width: "50%" }} 
                            placeholder="Select category"
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding:'0 8px', height: '30px' }}>
                                    <Input style={{ flex: 'auto' }} onChange={(e) => setNewCate(e.target.value)} />
                                        <a
                                            style={{ flex: 'none', paddingLeft: '8px', display: 'block', cursor: 'pointer' }}
                                            // onClick={this.addItem}
                                        >
                                            <Button  icon={<FileAddOutlined />} onClick={handleAddcategory}>
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                                )}
                        >
                            {category.map((cate) => (
                                <Option key={cate.id} value={cate.id} >{cate.title}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    {/* <Button style={{margin: "0 10px"}}  icon={<FileAddOutlined />} onClick={showCategoryModal}>
                            </Button> */}
                    <Form.Item
                        label="Content"
                        name="content"
                        // initialValues={note.content}
                        rules={[{ required: true, message: 'Please input content!' }]}
                    >
                        
                        <Input.TextArea rows={4}/>
                    </Form.Item>


                </Form>
            </Modal>
        </>
    );
}

export default AddNote;