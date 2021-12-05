import React from 'react'

const MemberNode = ({member,familyMembers,partner,relations,getPartner,getParents,getChildrensOfParents,traversed, generationChanged,deleteNode}) => {
    let itsParents = getParents(member,relations,familyMembers);
    let partnerParents = [];
    let parentsToSearch = [member];
    if(partner){
        partnerParents = getParents(partner,relations,familyMembers);
        parentsToSearch.push(partner);
    }
    
    let itsChildren = getChildrensOfParents(parentsToSearch,relations,familyMembers);
    
    return (
        <>
        <div className="main-tree-wrapper">
            <div className="tree ">
                {(itsChildren.length > 0) ? <i className="connector connector-children"></i> : ''}
                {(itsParents.length > 0 && itsParents[0] != 0) ? <i className="connector connector-parent"></i> : ''}
                
                <div className={((familyMembers[member].gender == "male") ? 'tree-element__male' : 'tree-element__female')+' tree-element'}>
                    <span className="delete-node" onClick={() => {deleteNode(member)}}>X</span>
                    <span className="tree-element-data d-block">{(familyMembers[member]) ? familyMembers[member].name : 'Not Found'}</span>
                    <span className="tree-element-data d-block">Father: {(familyMembers[itsParents[0]]) ? familyMembers[itsParents[0]].name : 'No Data'}</span>
                    <span className="tree-element-data d-block">Mother: {(familyMembers[itsParents[1]]) ? familyMembers[itsParents[1]].name : 'No Data'}</span>
                </div>
                {
                (partner) ? 
                    <div className={((familyMembers[partner].gender == "male") ? 'tree-element__male' : 'tree-element__female')+' tree-element connect-tree'}>
                        <span className="delete-node" onClick={() => {deleteNode(partner)}}>X</span>
                        <span className="tree-element-data d-block">{(familyMembers[partner]) ? familyMembers[partner].name : 'Not Found'}</span>
                        <span className="tree-element-data d-block">Father: {(familyMembers[partnerParents[0]]) ? familyMembers[partnerParents[0]].name : 'No Data'}</span>
                        <span className="tree-element-data d-block">Mother: {(familyMembers[partnerParents[1]]) ? familyMembers[partnerParents[1]].name : 'No Data'}</span>
                    </div>
                : ''
                }
            </div>
        </div>
        {
            (generationChanged) ? <div className="break"></div> : ''
        }
        {
            (itsChildren.length > 0) ?
            itsChildren.map((item,index) => {
            let itsPartner = getPartner(item,relations,familyMembers);
            if(itsPartner.length>0){
                return itsPartner.map((childrenPartner,childrenPartnerIndex) => {
                if(traversed.includes(childrenPartner)) return ('');
                traversed.push(item)
                return <MemberNode key={childrenPartnerIndex} 
                    member={item} 
                    partner={childrenPartner}
                    familyMembers={familyMembers}
                    relations={relations}
                    getPartner={getPartner}
                    getParents={getParents}
                    getChildrensOfParents={getChildrensOfParents}
                    traversed={traversed}
                    generationChanged={true}
                    deleteNode={deleteNode}
                    />
                })
            }else{
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
            ''
        }
    </>
    )
}

export default MemberNode
