const getFamilyMembersByGender = (familyMembers,gender = "male") =>{
    if(Object.entries(familyMembers).length <= 0 ){ return familyMembers }
    let newDataSet = [];
    for(const[key,value] of Object.entries(familyMembers)){
        if(value.gender === gender && value.status == 1){
            newDataSet.push(value);
        }
    }
    return newDataSet;
}

const getChildrensOfParents = (parentIds,relations) => {
    let childrens = [];
    for(const [key,value] of Object.entries(relations)){
        if((value.relationType == 2 || value.relationType == 3) && parentIds.includes(value.pid)  &&  parentIds.includes(value.ppid)){
            if(!childrens.includes(value.id)){
                childrens.push(value.id);
            }
        }
    }
    return childrens;
};


const getPartner = (partnerId, relations) => {
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
    return partner; 
};

const getParents = (memberId, relations) => {
    let parents = [];
    for(const [key,value] of Object.entries(relations)){
        if(value.relationType != 1 && value.id == memberId ){
            parents.push(value.pid)
            parents.push(value.ppid)
            break;
        }
    }
    return parents; 
};

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