import React, { useState } from 'react';
import { Tree, Row, Col, Space } from 'antd';
import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';
import AddMember from "../components/modal/AddMember";
import {getFamilyMembersByGender, getChildrensOfParents, getPartner, getParents, getRootParents} from "../helpers/helper";



var familyMembers = {
  "MB_1638535054318" : {
      id: "MB_1638535054318",
      name: "Chandra Mani",
      pid: 0,
      ppid: 0,
      tags: ['root'],
      gender: "male",
      status: 1
    },
  "MB_1638535054319" : {
      id: "MB_1638535054319",
      name: "Manjari Lamsal",
      pid: 'MB_1638535054318',
      tags: ['partner'],
      gender: "female",
      status: 1
    },
  "MB_1638535054320" : {
    id: "MB_1638535054320",
    name: "Yogen",
    gender: "male",
    pid: 'MB_1638535054318',
    ppid: 'MB_1638535054319',
    tags: ['children'],
    status: 1
  },
  "MB_1638535051233" : {
    id: "MB_1638535051233",
    name: "Dikshya",
    gender: "female",
    pid: 'MB_1638535054320',
    tags: ['partner'],
    status: 1
  },
  "MB_1638535054321" : {
    id: "MB_1638535054321",
    name: "Sushma",
    gender: "female",
    pid: 'MB_1638535054318',
    ppid: 'MB_1638535054319',
    tags: ['children'],
    status: 1
  },
  "MB_1638535054322" : {
    id: "MB_1638535054322",
    name: "Bibhu",
    gender: "male",
    pid: 'MB_1638535054321',
    tags: ['partner'],
    status: 1
  },
  "MB_1638535054332" : {
    id: "MB_1638535054332",
    name: "Dinesh",
    gender: "male",
    pid: 'MB_1638535054318',
    ppid: 'MB_1638535054319',
    status: 1
  },
  "MB_1638535051332" : {
    id: "MB_1638535051332",
    name: "Diyo",
    gender: "male",
    pid: 'MB_1638535054320',
    ppid: 'MB_1638535051233',
    status: 1
  },
  "MB_1638535051392" : {
    id: "MB_1638535051392",
    name: "Surya",
    gender: "male",
    pid: 0,
    status: 1
  },
  "MB_1638535051393" : {
    id: "MB_1638535051393",
    name: "Dambar Kumari",
    gender: "female",
    pid: 'MB_1638535051392',
    tags : ['partner'],
    status: 1
  },
};
var relations = [
  {
    relationType : 2,
    id: "MB_1638535054318",
    pid: 0,
    ppid: 0
  },
  {
    relationType : 2,
    id: "MB_1638535054319",
    pid: 0,
    ppid: 0
  },
  {
    relationType : 1,
    id: "MB_1638535054319",
    pid: "MB_1638535054318",
  },
  {
    relationType : 3,
    id: "MB_1638535054320",
    pid: "MB_1638535054318",
    ppid: "MB_1638535054319"
  },
  {
    relationType : 3,
    id: "MB_1638535051233",
    pid: "MB_1638535051392",
    ppid: "MB_1638535051393"
  },
  {
    relationType: 1,
    id: "MB_1638535054320",
    pid : "MB_1638535051233"
  },
  {
    relationType: 3,
    id: "MB_1638535054321",
    pid: "MB_1638535054318",
    ppid: "MB_1638535054319"
  },
  {
    relationType: 1,
    id: "MB_1638535054322",
    pid: 0,
    ppid: 0
  },
  {
    relationType: 3,
    id: "MB_1638535054332",
    pid: "MB_1638535054318",
    ppid: "MB_1638535054319"
  },
  {
    relationType: 1,
    id: "MB_1638535051392",
    pid: 0,
    ppid: 0
  },
  {
    relationType: 1,
    id: "MB_1638535051393",
    pid: 0,
    ppid: 0
  },
  {
    relationType: 1,
    id: "MB_1638535051392",
    pid: "MB_1638535051393",
  },
  {
    relationType: 3,
    id: "MB_1638535051332",
    pid: "MB_1638535054320",
    ppid: "MB_1638535051233"
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

  let treeData = getRootParents(relations);
  const [tree,setTree] = useState(treeData);

  const handleFormSubmit = (formValues) => {
    console.log("After submit  ",formValues);
    let memberId = "MB_"+Date.now();
    let memberData = {
      id: memberId,
      // pid: formValues.pid,
      // ppid: (formValues.relationType == 3) ? formValues.ppid : '',
      name: formValues.name,
      gender: formValues.gender,
      status: 1
    }

    familyMembers = {...familyMembers, [memberId] : {...memberData} }
  
    let relationData = {
      relationType : formValues.relationType,
      // id: (formValues == 3) ? formValues.pid : memberData.id,
      // pid: (formValues == 3) ? memberData.id : formValues.pid
      id: memberData.id,
      pid: formValues.pid
    }

    if(formValues.relationType == 3){
      relationData.ppid = formValues.ppid;
    }

    relations.push(relationData);
    console.log(familyMembers);
    return true;
  }
  
  const getMembers = (gender,relation) => {
    if(relation == 1){
      let partnersGender  = (gender === "male") ? "female" : "male";
      let members = getFamilyMembersByGender(familyMembers, partnersGender, true);
      return members;
    }else{
      return familyMembers;
    }
  }

  const getPartnersOfMember = (memberId) => {
    let members = getPartner(memberId,familyMembers,relations);
    let partnersData = [];
    members.forEach(function(ele){
      let eachPartner = {
        id: familyMembers[ele].id,
        title: familyMembers[ele].name,
        gender: familyMembers[ele].gender
      }
      partnersData.push(eachPartner);
    })
    return partnersData;
  }


  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  let tt = ``;
  let traversed = [];
  let onQueue = treeData;
  while(onQueue.length > 0){
    let item = onQueue.shift();
    if(traversed.includes(item)) continue;
    let itsPartner = getPartner(item,relations);
    let itsParents = getParents(item,relations);
    console.log("Its parents --->",itsParents);
    let parentsToSearch = [item];
    if(itsPartner[0]) parentsToSearch.push(itsPartner[0]);
    let itsChildren = getChildrensOfParents(parentsToSearch,relations);
    tt += `<div class="tree">
            <div class="tree-element">
              <span class="tree-element-data">${(familyMembers[item]) ? familyMembers[item].name : 'Not Found'}</span>
              <span class="tree-element-data">${(familyMembers[item].pid) ? familyMembers[familyMembers[item].pid].name : 'No Father'}</span>
              <span class="tree-element-data">${(familyMembers[item].ppid) ? familyMembers[familyMembers[item].ppid].name : 'No Mother'}</span>
            </div>
            ${
              (itsPartner.length > 0) ? 
              `<div class="tree-element">
                <span class="tree-element-data">${(familyMembers[itsPartner]) ? familyMembers[itsPartner].name : 'No Mother found'}</span>
                <span class="tree-element-data">${(familyMembers[itsPartner].pid) ? familyMembers[familyMembers[itsPartner].pid].name : 'No Father'}</span>
                <span class="tree-element-data">${(familyMembers[itsPartner].ppid) ? familyMembers[familyMembers[itsPartner].ppid].name : 'No Mother'}</span>
              </div>`
             : ''
            }
          </div>`;
    onQueue.push(...itsChildren);
    traversed.push(item);
    if(itsPartner[0]){
      traversed.push(itsPartner[0]);
    }

  }

  return (
    <Space size="small" className="px-4 mt-4">
      <Row gutter="16">
      <Col>
        <AddMember handleFormSubmit={handleFormSubmit} getMembers={getMembers} getPartnersOfMember={getPartnersOfMember} />
        {/* <Tree;
          showLine={true}
          showIcon={false}
          defaultExpandedKeys={['0-0-0']}
          onSelect={onSelect}
          treeData={treeData1}
        /> */}
        <div dangerouslySetInnerHTML={{ __html: tt }}></div>
      </Col>
      </Row>
    </Space>
  );
};

export default ListView;