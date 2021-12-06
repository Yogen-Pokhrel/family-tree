import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Select, notification  } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
const { Option } = Select;

const AddMember = ({handleFormSubmit, getMembers,getPartnersOfMember, ...rest}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [labelTitle, setLabelTitle] = useState('Parent of')
  const [gender, setGender] = useState('male')
  const [relation, setRelation] = useState('1')
  const [memberOptions,setMemberOptions] = useState([{id: 0, title: "Root Element", gender: ''}])
  const [partners,setPartners] = useState([])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    let success = handleFormSubmit(values);
    if(success){
        openNotification();
        resetForm();
        closeModal();
    }
  };

  const openNotification = () => {
    notification.open({
      message: 'Success',
      description:
        'New member has been added successfully',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const resetForm = () => {
    form.resetFields();
  };


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onGenderChange = (value) => {
    setGender(value);
    form.setFieldsValue({ pid: '',ppid: '' });
  }

  const onRelationTypeChange = (value) => {
      setRelation(value);
      form.setFieldsValue({ pid: '',ppid: '' });
  }

  const getFamilyMembers = () =>{
    let allMembers = getMembers(gender,relation);
    let options = [];
    if(relation == 2){
        options.push({id: 0, title: "Root Element"});
    }
    if(Object.entries(allMembers).length > 0){
        for(const [key,value] of Object.entries(allMembers)){
            if(value.status == 1){
              let newOption = {
                id: value.id,
                title: value.name,
                gender: value.gender
            }
            options.push(newOption);
            }
        }
    }
    setMemberOptions(options);
  }

  const getPartners = (value) => {
      if(relation == 3){
        let partners = getPartnersOfMember(value);
        setPartners(partners);
      }else{
        setPartners([]);
      }
      form.setFieldsValue({ ppid: '' });
  }

  useEffect(() => {
    updateLabel();
    getFamilyMembers();
  }, [gender, relation]);


  const updateLabel = (value) => {
    switch (relation) {
      case '1':
          if(gender === 'male'){
            setLabelTitle("Husband of")
          }else if(gender === "female"){
            setLabelTitle("Wife of")
          }else{
            setLabelTitle("Husband/wife of")
          }
        break;
      case '2':
        setLabelTitle("Parent of")
        break;
      case '3':
        setLabelTitle("Father");
        break;
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal} data-testid="modal_open_button">
        Add Member
      </Button>
      <Modal title="Add a Member" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        
      <Form
      name="addMember"
      className="addMember"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      // initialValues={{ relationType: relation,gender: gender }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
      data-testid="test_add_member_form"
    >
      <Form.Item
        label="Name"
        name="name"
        
        rules={[{ required: true, message: 'Please enter name' }]}
      >
        <Input data-testid="test_name" />
      </Form.Item>

      <Form.Item name="gender"  label="Gender" rules={[{ required: true, message: 'Please chose gender' }]}>
        <Select
          placeholder="Chose gender"
          onChange={onGenderChange}
          allowClear
          data-testid="test_gender"
        >
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </Form.Item>


      <Form.Item name="relationType"  label="Relation Type" rules={[{ required: true, message: 'Please relationship type' }]}>
        <Select
          placeholder="Choose relation type"
          onChange={onRelationTypeChange}
          allowClear
          data-testid="test_relationType"
        >
          <Option value="1">Husband/wife</Option>
          {/* <Option value="2">Parent</Option> */}
          <Option value="3">Children</Option>
         
        </Select>
      </Form.Item>

      <Form.Item name="pid"  label={labelTitle} rules={[{ required: true, message: 'Please choose a member' }]}>
        <Select
          placeholder={"Choose "+labelTitle}
          allowClear
          onChange={getPartners}
          data-testid="test_pid"
        >
          {
              (memberOptions.length > 0) ?
              memberOptions.map((item,index) => {
                if(relation == 3 && item.gender === "female" ) return '';
                return <Option key={index} value={item.id} >{item.title}</Option>
              })
              :
              <Option value="" disabled selected>Choose Parent</Option>
          }

        </Select>
      </Form.Item>

        {(relation == 3) ? 
        <Form.Item name="ppid" label="Mother" rules={[{ required: true, message: 'Please choose Mother' }]}>
          <Select
            placeholder={"Choose Mother"}
            allowClear
            data-testid="test_ppid" 
          >
            {
                (partners.length > 0) ?
                partners.map((item,index) => {
                  if(relation == 3 && item.gender === "male" ) return '';
                  return <Option key={index} value={item.id} >{item.title}</Option>
                })
                :
                <Option value="" disabled selected>Choose Mother</Option>
            }

          </Select>
        </Form.Item>

      : '' }

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

      </Modal>
    </>
  );
};

export default AddMember;