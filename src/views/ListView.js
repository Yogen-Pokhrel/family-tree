import React, { useState } from 'react';
import { Row, Col, Space } from 'antd';
import AddMember from "../components/modal/AddMember";
import {getFamilyMembersByGender, getChildrensOfParents, getPartner, getParents, getRootParents} from "../helpers/helper";
import MemberNode from "../components/MemberNode";

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
    relationType: 3,
    id: "MB_1638535054332",
    pid: "MB_1638535054318",
    ppid: "MB_1638535054319"
  },
  {
    relationType: 2,
    id: "MB_1638535051392",
    pid: 0,
    ppid: 0
  },
  {
    relationType: 2,
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
  },
  {
    relationType: 1,
    id: "MB_1638535054321",
    pid: "MB_1638535054322",
  }
];

const ListView = () => {

  let treeData = getRootParents(relations,familyMembers);
  const [treeCount,setTreeCount] = useState(1);

  const handleFormSubmit = (formValues) => {
    console.log("After submit  ",formValues);
    let memberId = "MB_"+Date.now();
    let memberData = {
      id: memberId,
      name: formValues.name,
      gender: formValues.gender,
      status: 1
    }

    familyMembers = {...familyMembers, [memberId] : {...memberData} }
  
    let relationData = {
      relationType : formValues.relationType,
      id: memberData.id,
      pid: formValues.pid
    }

    if(formValues.relationType == 3){
      relationData.ppid = formValues.ppid;
    }

    relations.push(relationData);
    setTreeCount(treeCount + 1);
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
    let members = getPartner(memberId,relations,familyMembers);
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

  const deleteNode = (node) => {
    if(familyMembers[node]){
      familyMembers[node].status = 2;
      setTreeCount(treeCount + 1);
    }
  }

  let traversed = [];
  let generation = 0;

  return (
      <Row>
        <Col span={24}>
          <Space size="small" className="px-4 mt-4">
            <AddMember handleFormSubmit={handleFormSubmit} getMembers={getMembers} getPartnersOfMember={getPartnersOfMember} />
          </Space>
          <div className="main-tree-outer">
            {
              (treeData.length > 0) ?
              treeData.map((item,index) => {
                let itsPartner = getPartner(item,relations,familyMembers);
                if(itsPartner.length>0){
                 return itsPartner.map((partner,partnerIndex) => {
                  if(traversed.includes(item) && traversed.includes(partner)) return ('');
                  traversed.push(item)
                  traversed.push(partner)
                  return <MemberNode key={partnerIndex} 
                      member={item} 
                      partner={partner}
                      familyMembers={familyMembers}
                      relations={relations}
                      getPartner={getPartner}
                      getParents={getParents}
                      getChildrensOfParents={getChildrensOfParents}
                      traversed={traversed}
                      generation={generation++}
                      deleteNode={deleteNode}
                      />
                 })
                }else{
                  if(traversed.includes(item)) return ('');
                  traversed.push(item)
                  return <MemberNode key={index} 
                    member={item} 
                    partner={false}
                    familyMembers={familyMembers}
                    relations={relations}
                    getPartner={getPartner}
                    getParents={getParents}
                    getChildrensOfParents={getChildrensOfParents}
                    traversed={traversed}
                    deleteNode={deleteNode}
                    />
                    
                }
               
                })
              :
              'There are no any family members'
            }
            
          </div>
        </Col>
      </Row>
  );
};

export default ListView;