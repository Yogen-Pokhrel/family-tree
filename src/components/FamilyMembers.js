import React from 'react'
import {getTopMostNodeOfFamily} from "../helpers/helper";
const FamilyMembers = ({rootId,nodes,traversed,getTop = false,displayParent = true,deleteNode, setRoot}) => {
    let member = rootId;
    if(getTop){
        let topmostNode = getTopMostNodeOfFamily(rootId,nodes);
        member = topmostNode;
    }
    let itsChildren;
    let partners;
    if(nodes[member]){
    itsChildren = nodes[member].children;
    partners = nodes[member].spouses;
    }
    return (
        <> 
        {(nodes[member]) ?
         <>
        { (displayParent) ? 
            <div className={((itsChildren.length > 0) ? 'connector-children-line' : '')+" tree"}>
                {(itsChildren.length > 0) ? <i className="connector connector-children connector-line"></i> : ''}
                {/* {(itsParents.length > 0 && itsParents[0] != 0) ? <i className="connector connector-parent"></i> : ''} */}
                
                <div className={((nodes[member].gender == "male") ? 'tree-element__male' : 'tree-element__female')+' tree-element'}>
                    <span className="delete-node" onClick={() => {deleteNode(member)}}>X</span>
                    <span className="tree-element-data d-block">{(nodes[member]) ? nodes[member].name : 'Not Found'}</span>
                </div>
                {
                (partners.length > 0) ? 
                    partners.map((partner,index) => (
                        <div key={"parther_"+index} className={((nodes[partner.id].gender == "male") ? 'tree-element__male' : 'tree-element__female')+' tree-element connect-tree'}>
                            <span className="delete-node" onClick={() => {deleteNode(partner.id)}}>X</span>
                            <span className="tree-element-data d-block">{(nodes[partner.id]) ? nodes[partner.id].name : 'Not Found'}</span>
                            {
                                (nodes[partner.id].parents && nodes[partner.id].parents.length > 0) ? 
                                <span className="expand-partner-family" conClick={() => {setRoot(nodes[partner.id].parents[0].id)}}>Expand This</span>
                                : '' 
                            }
                            
                        </div>
                    ))
                : ''
                }
            </div>
            : '' }
            <div className="main-tree-outer">
            {
                (itsChildren.length > 0) ? 
                    itsChildren.map((child,index) => {
                        let item = child.id;
                        let childrenPartner = nodes[item].spouses;
                        return <div className="tree " key={"children_"+index}>
                            {(itsChildren.length > 0) ? <i className="connector connector-parent"></i> : ''}
                            {/* {(itsParents.length > 0 && itsParents[0] != 0) ? <i className="connector connector-parent"></i> : ''} */}
                            
                            <div className={((nodes[item].gender == "male") ? 'tree-element__male' : 'tree-element__female')+' tree-element'}>
                                <span className="delete-node" onClick={() => {deleteNode(item)}}>X</span>
                                <span className="tree-element-data d-block">{(nodes[item]) ? nodes[item].name : 'Not Found'}</span>
                            </div>
                           
                            {
                            (childrenPartner.length > 0) ? 
                                childrenPartner.map((partner,index) => (
                                    <div key={"child_parther_"+index} className={((nodes[partner.id].gender == "male") ? 'tree-element__male' : 'tree-element__female')+' tree-element connect-tree'}>
                                        <span className="delete-node" onClick={() => {deleteNode(partner.id)}}>X</span>
                                        <span className="tree-element-data d-block">{(nodes[partner.id]) ? nodes[partner.id].name : 'Not Found'}</span>
                                        {
                                            (nodes[partner.id].parents && nodes[partner.id].parents.length > 0) ? 
                                            <span className="expand-partner-family" onClick={() => {setRoot(nodes[partner.id].parents[0].id)}}>+</span>
                                            : '' 
                                        }
                                    </div>
                                ))
                            : ''
                            }

                            {
                                (nodes[item].children && nodes[item].children.length > 0) ?
                                <div className="break">
                                    <FamilyMembers 
                                    nodes={nodes}
                                    rootId={item}
                                    traversed={traversed}
                                    getTop={false}
                                    displayParent={false}
                                    deleteNode={deleteNode}
                                    /></div>
                                 : ''
                            }
                        </div>
                        })
                : ''
            }

            </div>

            </> : 'No Members in a tree' }
            {/* </>
              : '' } */}

        </>

        
    )
}

export default FamilyMembers
