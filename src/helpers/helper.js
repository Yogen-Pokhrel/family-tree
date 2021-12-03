const getFamilyMembersByGender = (familyMembers,gender = "male") =>{
    if(Object.entries(familyMembers).length <= 0 ){ return familyMembers }
    let newDataSet = [];
    for(const[key,value] of Object.entries(familyMembers)){
        if(value.gender == gender){
            newDataSet.push(value);
        }
    }
    return newDataSet;
}


export {getFamilyMembersByGender};