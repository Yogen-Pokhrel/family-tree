import React, { useState } from 'react';
import { Row, Col, Space } from 'antd';
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

  let treeData = getRootParents(relations);
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
    let members = getPartner(memberId,relations);
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

  const deleteNote = (node) => {
    console.log("I am here");
    console.log(node);
  }

  const prepareQueue = (treeData,generation) =>{
    let newQueueData = []
    treeData.forEach(function(ele){
      let child = {
        id: ele,
        generation : generation
      }
      newQueueData.push(child);
    })
    return newQueueData;
  }


  const displayTree = () => {

    // onQueue.map((elements,index) => {
      let index = 0;
    while(onQueue.length > 0){
      index++;
      let itemData = onQueue.shift();
      let item = itemData['id'];
      currentGeneration = itemData.generation;
      if(traversed.includes(item))return;
      let itsPartner = getPartner(item,relations);
      let itsParents = getParents(item,relations);
      console.log(itemData);
      if(itsPartner.length > 0){
        while(itsPartner.length > 0){
          index++;
          let eachPartner = itsPartner.shift();
          let parentsToSearch = [item,eachPartner];
          let itsChildren = getChildrensOfParents(parentsToSearch,relations);
          let partnerParents = getParents(eachPartner,relations);

          if(previousGeneration != currentGeneration){
            previousGeneration = currentGeneration;
            tt += `<div class="break"></div>`;
          }

          qDt = prepareQueue(itsChildren, ++generation);
          onQueue = [...onQueue,...qDt];
          traversed.push(item);
          traversed.push(eachPartner);

          return( <div className="tree">
                  {(itsChildren.length > 0) ? <i className="connector connector-children"></i> : ''}
                  {(itsParents.length > 0 && itsParents[0] != 0) ? <i className="connector connector-parent"></i> : ''}
                  <div className={"tree-element "+(familyMembers[item].gender == "male") ? 'tree-element__male' : 'tree-element__female'} >
                    <span className="delete-node">X</span>
                    <span className="tree-element-data d-block">{(familyMembers[item]) ? familyMembers[item].name : 'Not Found'}</span>
                    <span className="tree-element-data d-block">Father: {(familyMembers[itsParents[0]]) ? familyMembers[itsParents[0]].name : 'No Data'}</span>
                    <span className="tree-element-data d-block">Mother: {(familyMembers[itsParents[1]]) ? familyMembers[itsParents[1]].name : 'No Data'}</span>
                  </div>
                  {
                    (eachPartner) ? 
                    <div className={"tree-element "+(familyMembers[eachPartner].gender == "male") ? 'tree-element__male' : 'tree-element__female'}>
                      <span className="tree-element-data d-block">{(familyMembers[eachPartner]) ? familyMembers[eachPartner].name : 'Not found'}</span>
                      <span className="tree-element-data d-block">Father: {(familyMembers[partnerParents[0]]) ? familyMembers[partnerParents[0]].name : 'No Data'}</span>
                      <span className="tree-element-data d-block">Mother: {(familyMembers[partnerParents[1]]) ? familyMembers[partnerParents[1]].name : 'No Data'}</span>
                    </div>
                  : ''
                  }
                </div>
          );
        
        }
      }else{
        if(previousGeneration != currentGeneration){
          tt += `<div class="break"></div>`;
         }
  
        let itsChildren = getChildrensOfParents([item],relations);
        qDt = prepareQueue(itsChildren, ++generation);
        onQueue = [...onQueue,...qDt];
        traversed.push(item);

        return (<div className="tree ">
                <div className="tree-element">
                  <span className="tree-element-data d-block">{(familyMembers[item]) ? familyMembers[item].name : 'Not Found'}</span>
                  <span className="tree-element-data d-block">Father: {(familyMembers[itsParents[0]]) ? familyMembers[itsParents[0]].name : 'No Data'}</span>
                  <span className="tree-element-data d-block">Mother: {(familyMembers[itsParents[1]]) ? familyMembers[itsParents[1]].name : 'No Data'}</span>
                </div>
              </div>
        )
          
      }
      return(
        <div key={"members_"+index}>Your Loginc Here</div>
      )
    }

  }
// const displayTree = () => {
  let tt = `<div class="main-tree-wrapper">`;
  let traversed = [];
  let generation = 0;
  let onQueue = [];
  let qDt = prepareQueue(treeData, generation);
  onQueue = [...onQueue,...qDt];
  let previousGeneration = generation, currentGeneration = generation;

  while(onQueue.length > 0 && false){
    let itemData = onQueue.shift();
    let item = itemData['id'];
    currentGeneration = itemData.generation;
    if(traversed.includes(item)) continue;
    let itsPartner = getPartner(item,relations);
    let itsParents = getParents(item,relations);
    if(itsPartner.length > 0){
    while(itsPartner.length > 0){
      let eachPartner = itsPartner.shift();
      let parentsToSearch = [item,eachPartner];
      let itsChildren = getChildrensOfParents(parentsToSearch,relations);
      let partnerParents = getParents(eachPartner,relations);

      if(previousGeneration != currentGeneration){
        previousGeneration = currentGeneration;
        tt += `<div class="break"></div>`;
       }

      tt += `<div class="tree generation_${currentGeneration}">
              ${(itsChildren.length > 0) ? `<i class="connector connector-children"></i>` : ''}
              ${(itsParents.length > 0 && itsParents[0] != 0) ? `<i class="connector connector-parent"></i>` : ''}
              <div class="tree-element ${(familyMembers[item].gender == "male") ? 'tree-element__male' : 'tree-element__female'}">
                <span class="delete-node">X</span>
                <span class="tree-element-data d-block">${(familyMembers[item]) ? familyMembers[item].name : 'Not Found'}</span>
                <span class="tree-element-data d-block">Father: ${(familyMembers[itsParents[0]]) ? familyMembers[itsParents[0]].name : 'No Data'}</span>
                <span class="tree-element-data d-block">Mother: ${(familyMembers[itsParents[1]]) ? familyMembers[itsParents[1]].name : 'No Data'}</span>
              </div>
              ${
                (eachPartner) ? 
                `<div class="tree-element connect-tree ${(familyMembers[eachPartner].gender == "male") ? 'tree-element__male' : 'tree-element__female'}">
                  <span class="tree-element-data d-block">${(familyMembers[eachPartner]) ? familyMembers[eachPartner].name : 'Not found'}</span>
                  <span class="tree-element-data d-block">Father: ${(familyMembers[partnerParents[0]]) ? familyMembers[partnerParents[0]].name : 'No Data'}</span>
                  <span class="tree-element-data d-block">Mother: ${(familyMembers[partnerParents[1]]) ? familyMembers[partnerParents[1]].name : 'No Data'}</span>
                </div>`
              : ''
              }
            </div>`;
      qDt = prepareQueue(itsChildren, ++generation);
      onQueue = [...onQueue,...qDt];
      traversed.push(item);
      traversed.push(eachPartner);
    }}else{

      if(previousGeneration != currentGeneration){
        tt += `<div class="break"></div>`;
       }

      let itsChildren = getChildrensOfParents([item],relations);
      tt += `<div class="tree generation_${currentGeneration}">
              <div class="tree-element">
                <span class="tree-element-data d-block">${(familyMembers[item]) ? familyMembers[item].name : 'Not Found'}</span>
                <span class="tree-element-data d-block">Father: ${(familyMembers[itsParents[0]]) ? familyMembers[itsParents[0]].name : 'No Data'}</span>
                <span class="tree-element-data d-block">Mother: ${(familyMembers[itsParents[1]]) ? familyMembers[itsParents[1]].name : 'No Data'}</span>
              </div>
            </div>`;
      qDt = prepareQueue(itsChildren, ++generation);
      onQueue = [...onQueue,...qDt];
      traversed.push(item);
    }
  }
  tt += `</div>`;
  // return tt;
// }

  return (
      <Row>
        <Col span={24}>
          <Space size="small" className="px-4 mt-4">
            <AddMember handleFormSubmit={handleFormSubmit} getMembers={getMembers} getPartnersOfMember={getPartnersOfMember} />
          </Space>
          {/* <div dangerouslySetInnerHTML={{ __html: displayTree() }}></div> */}
          <div>
            {
              (onQueue.length > 0) ?
              onQueue.map((elements,index) => {
                let itemData = onQueue.shift();
                let item = itemData['id'];
                currentGeneration = itemData.generation;
                if(traversed.includes(item))return;
                let itsPartner = getPartner(item,relations);
                let itsParents = getParents(item,relations);
                console.log(itemData);
                if(itsPartner.length > 0){
                  while(itsPartner.length > 0){
                    let eachPartner = itsPartner.shift();
                    let parentsToSearch = [item,eachPartner];
                    let itsChildren = getChildrensOfParents(parentsToSearch,relations);
                    let partnerParents = getParents(eachPartner,relations);

                    if(previousGeneration != currentGeneration){
                      previousGeneration = currentGeneration;
                      tt += `<div class="break"></div>`;
                    }

                    qDt = prepareQueue(itsChildren, ++generation);
                    onQueue = [...onQueue,...qDt];
                    traversed.push(item);
                    traversed.push(eachPartner);

                    return( <div className="tree">
                            {(itsChildren.length > 0) ? <i className="connector connector-children"></i> : ''}
                            {(itsParents.length > 0 && itsParents[0] != 0) ? <i className="connector connector-parent"></i> : ''}
                            <div className={"tree-element "+(familyMembers[item].gender == "male") ? 'tree-element__male' : 'tree-element__female'} >
                              <span className="delete-node">X</span>
                              <span className="tree-element-data d-block">{(familyMembers[item]) ? familyMembers[item].name : 'Not Found'}</span>
                              <span className="tree-element-data d-block">Father: {(familyMembers[itsParents[0]]) ? familyMembers[itsParents[0]].name : 'No Data'}</span>
                              <span className="tree-element-data d-block">Mother: {(familyMembers[itsParents[1]]) ? familyMembers[itsParents[1]].name : 'No Data'}</span>
                            </div>
                            {
                              (eachPartner) ? 
                              <div className={"tree-element "+(familyMembers[eachPartner].gender == "male") ? 'tree-element__male' : 'tree-element__female'}>
                                <span className="tree-element-data d-block">{(familyMembers[eachPartner]) ? familyMembers[eachPartner].name : 'Not found'}</span>
                                <span className="tree-element-data d-block">Father: {(familyMembers[partnerParents[0]]) ? familyMembers[partnerParents[0]].name : 'No Data'}</span>
                                <span className="tree-element-data d-block">Mother: {(familyMembers[partnerParents[1]]) ? familyMembers[partnerParents[1]].name : 'No Data'}</span>
                              </div>
                            : ''
                            }
                          </div>
                    );
                  
                  }
                }else{
                  if(previousGeneration != currentGeneration){
                    tt += `<div class="break"></div>`;
                   }
            
                  let itsChildren = getChildrensOfParents([item],relations);
                  qDt = prepareQueue(itsChildren, ++generation);
                  onQueue = [...onQueue,...qDt];
                  traversed.push(item);

                  return (<div className="tree ">
                          <div className="tree-element">
                            <span className="tree-element-data d-block">{(familyMembers[item]) ? familyMembers[item].name : 'Not Found'}</span>
                            <span className="tree-element-data d-block">Father: {(familyMembers[itsParents[0]]) ? familyMembers[itsParents[0]].name : 'No Data'}</span>
                            <span className="tree-element-data d-block">Mother: {(familyMembers[itsParents[1]]) ? familyMembers[itsParents[1]].name : 'No Data'}</span>
                          </div>
                        </div>
                  )
                    
                }
                return(
                  <div key={"members_"+index}>Your Loginc Here</div>
                )
              })
              :
              ''
            }
          </div>
        </Col>
      </Row>
  );
};

export default ListView;