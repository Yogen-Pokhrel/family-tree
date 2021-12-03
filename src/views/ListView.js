import React, { useState } from 'react';
import { Tree, Row, Col, Space } from 'antd';
import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';
import AddMember from "../components/modal/AddMember";
import {getFamilyMembersByGender} from "../helpers/helper";

var familyMembers = [
  {
    id: 1638535054318,
    name: "Chandra Mani",
    gender: "male"
  },
  {
    id: 1638535054319,
    name: "Manjari Lamsal",
    gender: "female"
  },
  {
    id: 1638535054319,
    name: "Yogen",
    gender: "male"
  }
];
var relations = [
  {
    relationType : '2',
    id: 1638535054318,
    linkedId: 0
  },
  {
    relationType : '1',
    id: 1638535054318,
    linkedId: 0
  },
  {
    relationType : '3',
    id: 1638535054318,
    linkedId: 0
  }
];

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            icon: <CarryOutOutlined />,
          },
          {
            title: (
              <>
                <div>multiple line title</div>
                <div>multiple line title</div>
              </>
            ),
            key: '0-0-0-1',
            icon: <CarryOutOutlined />,
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
            icon: <CarryOutOutlined />,
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
            icon: <CarryOutOutlined />,
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
            icon: <CarryOutOutlined />,
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
            icon: <CarryOutOutlined />,
            switcherIcon: <FormOutlined />,
          },
        ],
      },
    ],
  },
  {
    title: 'parent 2',
    key: '0-1',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 2-0',
        key: '0-1-0',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-1-0-0',
            icon: <CarryOutOutlined />,
          },
          {
            title: 'leaf',
            key: '0-1-0-1',
            icon: <CarryOutOutlined />,
          },
        ],
      },
    ],
  },
];

const handleFormSubmit = (formValues) => {
  console.log("After submit  ",formValues);
  let memberData = {
    id: Date.now(),
    name: formValues.name,
    gender: formValues.gender,
    status: 1
  }
  familyMembers.push(memberData);

  let relationData = {
    relationType : formValues.relationType,
    id: memberData.id,
    linkedId: formValues.linkedId
  }
  relations.push(relationData);
  console.log(familyMembers);
  console.log(relations);
  return true;
}

const getMembers = (gender,relation) => {
  if(relation == 1){
    let members = getFamilyMembersByGender(familyMembers, gender);
    return members;
  }else{
    return familyMembers;
  }
}

const ListView = () => {

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  return (
    <Space size="small" className="px-4 mt-4">
      <Row gutter="16">
      <Col>
        <AddMember handleFormSubmit={handleFormSubmit} getMembers={getMembers} />
        <Tree
          showLine={true}
          showIcon={false}
          defaultExpandedKeys={['0-0-0']}
          onSelect={onSelect}
          treeData={treeData}
        />
      </Col>
      </Row>
    </Space>
  );
};

export default ListView;