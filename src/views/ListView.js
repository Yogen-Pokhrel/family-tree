import React, { useState } from 'react';
import { Tree, Row, Col, Space } from 'antd';
import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';
import AddMember from "../components/modal/AddMember";
import {getFamilyMembersByGender, prepareTreeData} from "../helpers/helper";



var familyMembers = {
  "MB_1638535054318" : {
      id: "MB_1638535054318",
      name: "Chandra Mani",
      gender: "male",
      status: 1
    },
  "MB_1638535054319" : {
      id: "MB_1638535054319",
      name: "Manjari Lamsal",
      gender: "female",
      status: 1
    },
  "MB_1638535054320" : {
    id: "MB_1638535054320",
    name: "Yogen",
    gender: "male",
    status: 1
  },
  "MB_1638535054321" : {
    id: "MB_1638535054321",
    name: "Sushma",
    gender: "female",
    status: 1
  },
  "MB_1638535054322" : {
    id: "MB_1638535054322",
    name: "Bibhu",
    gender: "male",
    status: 1
  }
};
var relations = [
  {
    relationType : 2,
    id: "MB_1638535054318",
    linkedId: 0
  },
  {
    relationType : 2,
    id: "MB_1638535054319",
    linkedId: 0
  },
  {
    relationType : 1,
    id: "MB_1638535054319",
    linkedId: "MB_1638535054318"
  },
  {
    relationType : 3,
    id: "MB_1638535054320",
    linkedId: "MB_1638535054318"
  },
  {
    relationType: 1,
    id: "MB_1638535054321",
    linkedId : "MB_1638535054322"
  },
  {
    relationType: 2,
    id: "MB_1638535054321",
    linkedId : "MB_1638535054319"
  },
  {
    relationType: 2,
    id: "MB_1638535054322",
    linkedId : 0
  }
];

const treeData1 = [
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



const ListView = () => {

  let treeData = prepareTreeData(familyMembers, relations);
  const [tree,setTree] = useState(treeData);

  const handleFormSubmit = (formValues) => {
    console.log("After submit  ",formValues);
    let memberId = "MB_"+Date.now();
    let memberData = {
      id: memberId,
      name: formValues.name,
      gender: formValues.gender,
      status: 1
    }
    // familyMembers.push(memberData);
    familyMembers = {...familyMembers, [memberId] : {...memberData} }
  
    let relationData = {
      relationType : formValues.relationType,
      id: (formValues === 3) ? formValues.linkedId : memberData.id,
      linkedId: (formValues === 3) ? memberData.id : formValues.linkedId
    }
    relations.push(relationData);
    console.log(familyMembers);
    console.log(relations);
    return true;
  }
  
  const getMembers = (gender,relation) => {
    if(relation == 1){
      let partnersGender  = (gender === "male") ? "female" : "male";
      let members = getFamilyMembersByGender(familyMembers, partnersGender, relations);
      return members;
    }else{
      return familyMembers;
    }
  }


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
          treeData={treeData1}
        />
      </Col>
      </Row>
    </Space>
  );
};

export default ListView;