const getFamilyMembersByGender = (familyMembers,gender = "male", relations) =>{
    if(Object.entries(familyMembers).length <= 0 ){ return familyMembers }
    let newDataSet = [];
    for(const[key,value] of Object.entries(familyMembers)){
        if(value.gender === gender && value.status == 1){
            if(!getPartner(key,relations,"boolean")){
                newDataSet.push(value);
            }
        }
    }
    return newDataSet;
}

const getChildrenDataByParentId = (parentIds,relations) => {
    console.log(parentIds);
    let parentItems = [];
    for(const [key,value] of Object.entries(relations)){
        if(parentIds.includes(value.linkedId)  && value.relationType != 1){
            parentItems.push(value.id);
        }
    }
    console.log("Parent Items ",parentItems);
    return parentItems;
};


const getPartner = (parentId,relations, returnType = "object") => {
    let partner = null;
    for(const [key,value] of Object.entries(relations)){
        if((value.linkedId === parentId || value.id === parentId ) && value.relationType == 1){
            (value.id == parentId) ? partner = value.parentId : partner = value.id;
        }
    }

    if(returnType === "boolean"){
        return (partner) ? true : false;
    }
    
    return partner;
    
};

const getAllParentChildren = (rootParents,relations) => {

    let members = [];
    let flagged = [];
    let partnersData = [];
    rootParents.forEach(function(ele){
        let tree = {id: ele[0]}
        if(ele[1]) tree.partner = ele[1];
        let childrens  = getChildrenDataByParentId(ele,relations);
        tree.childrensIds = childrens;
        let allChildrens = {};
        if(childrens.length > 0){
            childrens.forEach(function(ele){
                allChildrens.id = ele;
                if(!flagged.includes(ele)){
                    let partner = getPartner(ele,relations);
                    if(partner){
                        allChildrens.partner = partner;
                        flagged.push(partner);
                        partnersData.push([ele,partner])
                    }
                }
                let parentsIds = [allChildrens.id]
                if(allChildrens.partner) parentsIds.push(allChildrens.partner);
                // return allChildrens.childrens =  getAllParentChildren(parentsIds,relations)
                if(parentsIds.length > 0){
                    console.log(parentsIds);
                    // allChildrens.childrens =  getAllParentChildren(parentsIds,relations); 
                }
            })
        }
        tree.childrens = allChildrens;
        members.push(tree);
    })

    console.log(members);
    return members;
}

const prepareTreeData = (familyMembers, relations) => {
    let treeStructure = [];
    let parentItems = getChildrenDataByParentId([0],relations);
    let flagged = [];
    let partnersData = [];
    parentItems.forEach(function(ele){
        if(!flagged.includes(ele)){
            let partner = getPartner(ele,relations);
            if(partner){
                flagged.push(partner);
                partnersData.push([ele,partner])
            }else{
                partnersData.push([ele])
            }
        }
    })

    treeStructure = getAllParentChildren(partnersData,relations);
    console.log(treeStructure);
    return treeStructure;
}

export {getFamilyMembersByGender,prepareTreeData};