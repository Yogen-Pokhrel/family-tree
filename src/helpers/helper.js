const getFamilyMembersByGender = (familyMembers,gender = "male", allowPolygamy = false) =>{
    if(Object.entries(familyMembers).length <= 0 ){ return familyMembers }
    let newDataSet = [];
    for(const[key,value] of Object.entries(familyMembers)){
        if(value.gender === gender && value.status == 1){
            newDataSet.push(value);
            // if(allowPolygamy){
            //     newDataSet.push(value);
            // }else{
            //     if(value.tags && value.tags.includes('partner')) continue;
            //     if(!getPartner(key,familyMembers,"boolean")){
            //         newDataSet.push(value);
            //     }
            // }
        }
    }
    return newDataSet;
}

const getChildrenDataByParentId = (parentIds,relations, displayLog = true) => {
    let parentItems = [];
    if(typeof parentIds == "string"){
        parentIds = [parentIds];
    }
    for(const [key,value] of Object.entries(relations)){
        if(parentIds.includes(value.linkedId)  && value.relationType != 1){
            parentItems.push(value.id);
        }
    }
    if(displayLog){
    console.log("Parent IDS %d",counter,parentIds);
    console.log("Parent Items %d",counter,parentItems);
    }
    return parentItems;
};

const getChildrensOfParents = (parentIds,relations) => {
    let childrens = [];
    for(const [key,value] of Object.entries(relations)){
        if((value.relationType == 2 || value.relationType == 3) && parentIds.includes(value.pid)  &&  parentIds.includes(value.ppid)){
            if(!childrens.includes(value.id)){
                childrens.push(value.id);
            }
        }
    }
    // console.log("parents",parentIds);
    // console.log("Childrens",childrens);
    return childrens;
};


const getPartner1 = (parentId,relations, returnType = "object") => {
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

const getPartner = (partnerId, relations, returnType = "object") => {
    let partner = [];
    let ptId;
    for(const [key,value] of Object.entries(relations)){
        ptId  = "";
        if(value.relationType == 1 && (value.pid == partnerId || value.id == partnerId)){
            if(value.id == partnerId) {
                ptId = value.pid
            }else{
                ptId = value.id;
            }  
            if(!partner.includes(ptId) && ptId){
                partner.push(ptId)
            }
            
        }
    }

    console.log("Hey my partner is",partnerId);
    if(returnType === "boolean"){
        return (partner.length > 0) ? true : false;
    }
    
    return partner; 
};

const getParents = (memberId, relations) => {
    let parents = [];
    let ptId;
    for(const [key,value] of Object.entries(relations)){
        ptId  = "";
        if(value.relationType != 1 && (value.pid == memberId || value.ppid == memberId)){
            if(value.id == memberId) {
                ptId = value.pid
            }else{
                ptId = value.id;
            }  
            if(!parents.includes(ptId) && ptId){
                parents.push(ptId)
            }
            
        }
    }
    return parents; 
};

let counter = 1;
const getAllParentChildren = (rootParents,relations) => {

    let members = [];
    let flagged = [];
    // if(counter++ >= 3) return;
    console.log("Root parents type ----->",rootParents)
    rootParents.forEach(function(ele){
        if(typeof ele === "string") ele = [ele];
        let tree = {id: ele[0]}
        if(ele[1]) tree.partner = ele[1];
        let childrens  = getChildrenDataByParentId(ele,relations);
        console.log("I am here in elements",typeof ele);
        console.log("I am here in childrens", childrens);
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
                    }
                }
                let parentsIds = [allChildrens.id]
                if(allChildrens.partner) parentsIds.push(allChildrens.partner);
                if(parentsIds.length > 0){
                    console.log("Parent IDS in %d",counter,parentsIds);
                    return allChildrens.childrens =  {...getAllParentChildren(parentsIds,relations)}; 
                }
            })
        }
        console.log("All childrens ----->",allChildrens.childrens);
        tree.childrens = allChildrens;
        members.push(tree);
    })

    console.log(members);
    return members;
}

const prepareTreeData1 = (familyMembers, relations) => {
    let treeStructure = [];
    let parentItems = getChildrenDataByParentId([0],relations, false);
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
    return treeStructure;
}
const prepareTreeData = (familyMembers, relations) => {
    return familyMembers;
}

const getRootParents = (relations) => {
    let rootMembers = [];
    for(const[key,value] of Object.entries(relations)){
        if(value.pid == 0 && value.relationType == 2){
            rootMembers.push(value.id)
        }
    }
    return rootMembers;
}

export {getFamilyMembersByGender,getChildrensOfParents, getPartner,getParents, getRootParents};