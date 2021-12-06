import React, { useState } from 'react';
import { Row, Col, Space } from 'antd';
import ReactFamilyTree from 'react-family-tree';
import FamilyNode from '../components/FamilyNode';
import AddMember from "../components/modal/AddMember";
import {
  getFamilyMembersByGender,
  getChildrensOfParents,
  getPartner,
  getParents,
  getRootParents,
} from "../helpers/helper";

var familyMembers = {
  MB_1638535054318: {
    id: "MB_1638535054318",
    name: "Chandra Mani",
    pid: 0,
    ppid: 0,
    tags: ["root"],
    gender: "male",
    status: 1,
  },
  MB_1638535054319: {
    id: "MB_1638535054319",
    name: "Manjari Lamsal",
    pid: "MB_1638535054318",
    tags: ["partner"],
    gender: "female",
    status: 1,
  },
  MB_1638535054320: {
    id: "MB_1638535054320",
    name: "Yogen",
    gender: "male",
    pid: "MB_1638535054318",
    ppid: "MB_1638535054319",
    tags: ["children"],
    status: 1,
  },
  MB_1638535051233: {
    id: "MB_1638535051233",
    name: "Dikshya",
    gender: "female",
    pid: "MB_1638535054320",
    tags: ["partner"],
    status: 1,
  },
  MB_1638535054321: {
    id: "MB_1638535054321",
    name: "Sushma",
    gender: "female",
    pid: "MB_1638535054318",
    ppid: "MB_1638535054319",
    tags: ["children"],
    status: 1,
  },
  MB_1638535054322: {
    id: "MB_1638535054322",
    name: "Bibhu",
    gender: "male",
    pid: "MB_1638535054321",
    tags: ["partner"],
    status: 1,
  },
  MB_1638535054332: {
    id: "MB_1638535054332",
    name: "Dinesh",
    gender: "male",
    pid: "MB_1638535054318",
    ppid: "MB_1638535054319",
    status: 1,
  },
  MB_1638535051332: {
    id: "MB_1638535051332",
    name: "Diyo",
    gender: "male",
    pid: "MB_1638535054320",
    ppid: "MB_1638535051233",
    status: 1,
  },
  MB_1638535051392: {
    id: "MB_1638535051392",
    name: "Surya",
    gender: "male",
    pid: 0,
    status: 1,
  },
  MB_1638535051393: {
    id: "MB_1638535051393",
    name: "Dambar Kumari",
    gender: "female",
    pid: "MB_1638535051392",
    tags: ["partner"],
    status: 1,
  },
};
var relations = [
  {
    relationType: 2,
    id: "MB_1638535054318",
    pid: 0,
    ppid: 0,
  },
  {
    relationType: 2,
    id: "MB_1638535054319",
    pid: 0,
    ppid: 0,
  },
  {
    relationType: 1,
    id: "MB_1638535054319",
    pid: "MB_1638535054318",
  },
  {
    relationType: 3,
    id: "MB_1638535054320",
    pid: "MB_1638535054318",
    ppid: "MB_1638535054319",
  },
  {
    relationType: 3,
    id: "MB_1638535051233",
    pid: "MB_1638535051392",
    ppid: "MB_1638535051393",
  },
  {
    relationType: 1,
    id: "MB_1638535054320",
    pid: "MB_1638535051233",
  },
  {
    relationType: 3,
    id: "MB_1638535054321",
    pid: "MB_1638535054318",
    ppid: "MB_1638535054319",
  },
  {
    relationType: 3,
    id: "MB_1638535054332",
    pid: "MB_1638535054318",
    ppid: "MB_1638535054319",
  },
  {
    relationType: 2,
    id: "MB_1638535051392",
    pid: 0,
    ppid: 0,
  },
  {
    relationType: 2,
    id: "MB_1638535051393",
    pid: 0,
    ppid: 0,
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
    ppid: "MB_1638535051233",
  },
  {
    relationType: 1,
    id: "MB_1638535054321",
    pid: "MB_1638535054322",
  },
];


const treeData = [
  {
    "id": "HkqEDLvxE",
    "gender": "male",
    "parents": [
      {
        "id": "011jVS4rb",
        "type": "blood"
      },
      {
        "id": "PXACjDxmR",
        "type": "blood"
      }
    ],
    "siblings": [
      {
        "id": "kuVISwh7w",
        "type": "blood"
      },
      {
        "id": "UIEjvLJMd",
        "type": "blood"
      },
      {
        "id": "ZVi8fWDBx",
        "type": "blood"
      }
    ],
    "spouses": [],
    "children": []
  },
  {
    "id": "011jVS4rb",
    "gender": "male",
    "parents": [
      {
        "id": "ypu71w9_Q",
        "type": "blood"
      },
      {
        "id": "GEf8zF7A4",
        "type": "blood"
      }
    ],
    "children": [
      {
        "id": "HkqEDLvxE",
        "type": "blood"
      },
      {
        "id": "kuVISwh7w",
        "type": "blood"
      },
      {
        "id": "UIEjvLJMd",
        "type": "blood"
      },
      {
        "id": "ZVi8fWDBx",
        "type": "blood"
      }
    ],
    "siblings": [],
    "spouses": [
      {
        "id": "PXACjDxmR",
        "type": "married"
      }
    ]
  },
  {
    "id": "PXACjDxmR",
    "gender": "female",
    "parents": [
      {
        "id": "2DlrR0fK8",
        "type": "blood"
      }
    ],
    "children": [
      {
        "id": "HkqEDLvxE",
        "type": "blood"
      },
      {
        "id": "kuVISwh7w",
        "type": "blood"
      },
      {
        "id": "UIEjvLJMd",
        "type": "blood"
      },
      {
        "id": "ZVi8fWDBx",
        "type": "blood"
      }
    ],
    "siblings": [
      {
        "id": "H-06WvsfJ",
        "type": "blood"
      }
    ],
    "spouses": [
      {
        "id": "011jVS4rb",
        "type": "married"
      }
    ]
  },
  {
    "id": "kuVISwh7w",
    "gender": "male",
    "parents": [
      {
        "id": "011jVS4rb",
        "type": "blood"
      },
      {
        "id": "PXACjDxmR",
        "type": "blood"
      }
    ],
    "children": [
      {
        "id": "Fbc9iwnJl",
        "type": "blood"
      }
    ],
    "siblings": [
      {
        "id": "HkqEDLvxE",
        "type": "blood"
      },
      {
        "id": "UIEjvLJMd",
        "type": "blood"
      },
      {
        "id": "ZVi8fWDBx",
        "type": "blood"
      }
    ],
    "spouses": [
      {
        "id": "vRSjcaDGj",
        "type": "married"
      }
    ]
  },
  {
    "id": "UIEjvLJMd",
    "gender": "female",
    "parents": [
      {
        "id": "011jVS4rb",
        "type": "blood"
      },
      {
        "id": "PXACjDxmR",
        "type": "blood"
      }
    ],
    "children": [
      {
        "id": "6_OTJvbvS",
        "type": "blood"
      },
      {
        "id": "JhSCcdFEP",
        "type": "blood"
      },
      {
        "id": "6hNxNY1-I",
        "type": "blood"
      }
    ],
    "siblings": [
      {
        "id": "HkqEDLvxE",
        "type": "blood"
      },
      {
        "id": "kuVISwh7w",
        "type": "blood"
      },
      {
        "id": "ZVi8fWDBx",
        "type": "blood"
      }
    ],
    "spouses": [
      {
        "id": "RZbkr5vAi",
        "type": "married"
      }
    ]
  },
  {
    "id": "RZbkr5vAi",
    "gender": "male",
    "parents": [],
    "children": [
      {
        "id": "6_OTJvbvS",
        "type": "blood"
      },
      {
        "id": "JhSCcdFEP",
        "type": "blood"
      },
      {
        "id": "6hNxNY1-I",
        "type": "blood"
      }
    ],
    "siblings": [],
    "spouses": [
      {
        "id": "UIEjvLJMd",
        "type": "married"
      }
    ]
  },
  {
    "id": "vRSjcaDGj",
    "gender": "female",
    "parents": [
      {
        "id": "6vASIIxhd",
        "type": "blood"
      },
      {
        "id": "iFiwqrWx-",
        "type": "blood"
      }
    ],
    "children": [
      {
        "id": "Fbc9iwnJl",
        "type": "blood"
      }
    ],
    "siblings": [],
    "spouses": [
      {
        "id": "kuVISwh7w",
        "type": "married"
      }
    ]
  },
  {
    "id": "Fbc9iwnJl",
    "gender": "female",
    "parents": [
      {
        "id": "kuVISwh7w",
        "type": "blood"
      },
      {
        "id": "vRSjcaDGj",
        "type": "blood"
      }
    ],
    "children": [],
    "siblings": [],
    "spouses": []
  },
  {
    "id": "ypu71w9_Q",
    "gender": "male",
    "parents": [
      {
        "id": "TsyAkbF89",
        "type": "blood"
      },
      {
        "id": "T54Km7uOC",
        "type": "blood"
      }
    ],
    "children": [
      {
        "id": "011jVS4rb",
        "type": "blood"
      }
    ],
    "siblings": [],
    "spouses": [
      {
        "id": "GEf8zF7A4",
        "type": "married"
      }
    ]
  },
  {
    "id": "GEf8zF7A4",
    "gender": "female",
    "parents": [
      {
        "id": "gsgwGS_Kw",
        "type": "blood"
      },
      {
        "id": "ZgTZx9uXQ",
        "type": "blood"
      }
    ],
    "children": [
      {
        "id": "011jVS4rb",
        "type": "blood"
      }
    ],
    "siblings": [],
    "spouses": [
      {
        "id": "ypu71w9_Q",
        "type": "married"
      }
    ]
  },
  {
    "id": "2DlrR0fK8",
    "gender": "male",
    "parents": [],
    "children": [
      {
        "id": "PXACjDxmR",
        "type": "blood"
      },
      {
        "id": "H-06WvsfJ",
        "type": "blood"
      }
    ],
    "siblings": [],
    "spouses": []
  },
  {
    "id": "gsgwGS_Kw",
    "gender": "male",
    "parents": [],
    "children": [
      {
        "id": "GEf8zF7A4",
        "type": "blood"
      }
    ],
    "siblings": [],
    "spouses": [
      {
        "id": "ZgTZx9uXQ",
        "type": "married"
      }
    ]
  },
  {
    "id": "ZgTZx9uXQ",
    "gender": "female",
    "parents": [],
    "children": [
      {
        "id": "GEf8zF7A4",
        "type": "blood"
      }
    ],
    "siblings": [],
    "spouses": [
      {
        "id": "gsgwGS_Kw",
        "type": "married"
      }
    ]
  },
  {
    "id": "ZVi8fWDBx",
    "gender": "male",
    "parents": [
      {
        "id": "011jVS4rb",
        "type": "blood"
      },
      {
        "id": "PXACjDxmR",
        "type": "blood"
      }
    ],
    "children": [],
    "siblings": [
      {
        "id": "HkqEDLvxE",
        "type": "blood"
      },
      {
        "id": "kuVISwh7w",
        "type": "blood"
      },
      {
        "id": "UIEjvLJMd",
        "type": "blood"
      }
    ],
    "spouses": [
      {
        "id": "wJ1EBvc5m",
        "type": "married"
      }
    ]
  },
  {
    "id": "6_OTJvbvS",
    "gender": "male",
    "parents": [
      {
        "id": "RZbkr5vAi",
        "type": "blood"
      },
      {
        "id": "UIEjvLJMd",
        "type": "blood"
      }
    ],
    "children": [],
    "siblings": [
      {
        "id": "JhSCcdFEP",
        "type": "blood"
      },
      {
        "id": "6hNxNY1-I",
        "type": "blood"
      }
    ],
    "spouses": []
  },
  {
    "id": "JhSCcdFEP",
    "gender": "female",
    "parents": [
      {
        "id": "RZbkr5vAi",
        "type": "blood"
      },
      {
        "id": "UIEjvLJMd",
        "type": "blood"
      }
    ],
    "children": [
      {
        "id": "Z0QA5oKks",
        "type": "blood"
      }
    ],
    "siblings": [
      {
        "id": "6_OTJvbvS",
        "type": "blood"
      },
      {
        "id": "6hNxNY1-I",
        "type": "blood"
      }
    ],
    "spouses": [
      {
        "id": "ilad8NH6g",
        "type": "married"
      }
    ]
  },
  {
    "id": "6hNxNY1-I",
    "gender": "male",
    "parents": [
      {
        "id": "RZbkr5vAi",
        "type": "blood"
      },
      {
        "id": "UIEjvLJMd",
        "type": "blood"
      }
    ],
    "children": [],
    "siblings": [
      {
        "id": "6_OTJvbvS",
        "type": "blood"
      },
      {
        "id": "JhSCcdFEP",
        "type": "blood"
      }
    ],
    "spouses": []
  },
  {
    "id": "ilad8NH6g",
    "gender": "male",
    "parents": [],
    "children": [
      {
        "id": "Z0QA5oKks",
        "type": "blood"
      }
    ],
    "siblings": [],
    "spouses": [
      {
        "id": "JhSCcdFEP",
        "type": "married"
      }
    ]
  },
  {
    "id": "Z0QA5oKks",
    "gender": "male",
    "parents": [
      {
        "id": "ilad8NH6g",
        "type": "blood"
      },
      {
        "id": "JhSCcdFEP",
        "type": "blood"
      }
    ],
    "children": [],
    "siblings": [],
    "spouses": []
  },
  {
    "id": "wJ1EBvc5m",
    "gender": "female",
    "parents": [],
    "children": [],
    "siblings": [],
    "spouses": [
      {
        "id": "ZVi8fWDBx",
        "type": "married"
      }
    ]
  },
  {
    "id": "TsyAkbF89",
    "gender": "male",
    "parents": [],
    "children": [
      {
        "id": "ypu71w9_Q",
        "type": "blood"
      }
    ],
    "siblings": [],
    "spouses": [
      {
        "id": "T54Km7uOC",
        "type": "married"
      }
    ]
  },
  {
    "id": "T54Km7uOC",
    "gender": "female",
    "parents": [],
    "children": [
      {
        "id": "ypu71w9_Q",
        "type": "blood"
      }
    ],
    "siblings": [],
    "spouses": [
      {
        "id": "TsyAkbF89",
        "type": "married"
      }
    ]
  },
  {
    "id": "6vASIIxhd",
    "gender": "male",
    "parents": [],
    "children": [
      {
        "id": "vRSjcaDGj",
        "type": "blood"
      }
    ],
    "siblings": [],
    "spouses": [
      {
        "id": "iFiwqrWx-",
        "type": "married"
      }
    ]
  },
  {
    "id": "iFiwqrWx-",
    "gender": "female",
    "parents": [],
    "children": [
      {
        "id": "vRSjcaDGj",
        "type": "blood"
      }
    ],
    "siblings": [],
    "spouses": [
      {
        "id": "6vASIIxhd",
        "type": "married"
      }
    ]
  },
  {
    "id": "H-06WvsfJ",
    "gender": "female",
    "parents": [
      {
        "id": "2DlrR0fK8",
        "type": "blood"
      }
    ],
    "children": [],
    "siblings": [
      {
        "id": "PXACjDxmR",
        "type": "blood"
      }
    ],
    "spouses": []
  }
]

const WIDTH = 70;
const HEIGHT = 80;
const rootId = "HkqEDLvxE";

const TreeView = () => {
  const [treeCount, setTreeCount] = useState(1);
 
  const handleFormSubmit = (formValues) => {
    console.log("After submit  ", formValues);
    let memberId = "MB_" + Date.now();
    let memberData = {
      id: memberId,
      name: formValues.name,
      gender: formValues.gender,
      status: 1,
    };

    familyMembers = { ...familyMembers, [memberId]: { ...memberData } };

    let relationData = {
      relationType: formValues.relationType,
      id: memberData.id,
      pid: formValues.pid,
    };

    if (formValues.relationType == 3) {
      relationData.ppid = formValues.ppid;
    }

    relations.push(relationData);
    setTreeCount(treeCount + 1);
    return true;
  };

  const getMembers = (gender, relation) => {
    if (relation == 1) {
      let partnersGender = gender === "male" ? "female" : "male";
      let members = getFamilyMembersByGender(
        familyMembers,
        partnersGender,
        true
      );
      return members;
    } else {
      return familyMembers;
    }
  };

  const getPartnersOfMember = (memberId) => {
    let members = getPartner(memberId, relations);
    let partnersData = [];
    members.forEach(function (ele) {
      let eachPartner = {
        id: familyMembers[ele].id,
        title: familyMembers[ele].name,
        gender: familyMembers[ele].gender,
      };
      partnersData.push(eachPartner);
    });
    return partnersData;
  };

  return (
    <Row className="mx-2">
      <Col>
      <Space size="small" className="px-4 mt-4">
          <AddMember
            handleFormSubmit={handleFormSubmit}
            getMembers={getMembers}
            getPartnersOfMember={getPartnersOfMember}
          />
        </Space>
      <ReactFamilyTree
        nodes={treeData}
        rootId={rootId}
        width={WIDTH}
        height={HEIGHT}
        renderNode={(node) => (
            <FamilyNode
                key={node.id}
                node={node}
                style={{
                    width: WIDTH,
                    height: HEIGHT,
                    transform: `translate(${node.left * (WIDTH / 2)}px, ${node.top * (HEIGHT / 2)}px)`,
                }}
            />
        )}
    />
      </Col>
    </Row>
  );
};

// ReactDOM.render(<Demo />, mountNode);
export default TreeView;