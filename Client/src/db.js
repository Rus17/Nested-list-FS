let db = {
  list: [
    {
      serialNumber: 4,
      id: 1,
      text: "Point - 3",
      subList: false,
      parent: 0,
      children: []
    },
    {
      serialNumber: 2,
      id: 2,
      text: "Point - 1",
      subList: false,
      parent: 0,
      children: []
    },
    {
      serialNumber: 3,
      id: 3,
      text: "Point - 12",
      subList: false,
      parent: 2,
      children: []
    },
    {
    serialNumber: 3,
    id: 4,
    text: "Point - 122",
    subList: false,
    parent: 3,
    children: []
    },
    {
      serialNumber: 3,
      id: 5,
      text: "Point - 1222",
      subList: false,
      parent: 4,
      children: []
    },
    {
      serialNumber: 2,
      id: 6,
      text: "Point - 1221",
      subList: false,
      parent: 4,
      children: []
    },
    {
      serialNumber: 3,
      id: 7,
      text: "Point - 12212",
      subList: false,
      parent: 6,
      children: []
    },
    {
      serialNumber: 2,
      id: 8,
      text: "Point - 12211",
      subList: false,
      parent: 6,
      children: []
    },
    {
      serialNumber: 4,
      id: 9,
      text: "Point - 12213",
      subList: false,
      parent: 6,
      children: []
    },
    {
    serialNumber: 4,
    id: 10,
    text: "Point - 1223",
    subList: false,
    parent: 4,
    children: []
    },
    {
      serialNumber: 2,
      id: 11,
      text: "Point - 121",
      subList: false,
      parent: 3,
      children: []
    },
    {
      serialNumber: 4,
      id: 12,
      text: "Point - 123",
      subList: false,
      parent: 3,
      children: []
    },  
    {
      serialNumber: 2,
      id: 13,
      text: "Point - 11",
      subList: false,
      parent: 2,
      children: []
    },
    {
      serialNumber: 3,
      id: 14,
      text: "Point - 112",
      subList: false,
      parent: 13,
      children: []
    },
    {
      serialNumber: 2,
      id: 15,
      text: "Point - 111",
      subList: false,
      parent: 13,
      children: []
    },
    {
      serialNumber: 4,
      id: 16,
      text: "Point - 113",
      subList: false,
      parent: 13,
      children: []
    },
    {
      serialNumber: 4,
      id: 17,
      text: "Point - 13",
      subList: false,
      parent: 2,
      children: []
    },
    {
      serialNumber: 3,
      id: 18,
      text: "Point - 2",
      subList: false,
      parent: 0,
      children: []
    }
  ]
}

// let db = {
//   list: [
//     {
//       serialNumber: 4,
//       id: 1,
//       text: "Point - 3",
//       subList: false,
//       parent: 0,
//       children: []    
//     },
//     {
//       serialNumber: 2,
//       id: 2,
//       text: "Point - 1",
//       subList: false,
//       parent: 0,
//       children: [
//         {
//           serialNumber: 3,
//           id: 3,
//           text: "Point - 12",
//           subList: false,
//           parent: 2,
//           children: [
//             {
//               serialNumber: 3,
//               id: 4,
//               text: "Point - 122",
//               subList: false,
//               parent: 3,
//               children: [{
//                 serialNumber: 3,
//                 id: 5,
//                 text: "Point - 1222",
//                 subList: false,
//                 parent: 4,
//                 children: []
//               },
//                 {
//                   serialNumber: 2,
//                   id: 6,
//                   text: "Point - 1221",
//                   subList: false,
//                   parent: 4,
//                   children: [
//                     {
//                     serialNumber: 3,
//                     id: 7,
//                     text: "Point - 12212",
//                     subList: false,
//                     parent: 6,
//                     children: []
//                     },
//                     {
//                       serialNumber: 2,
//                       id: 8,
//                       text: "Point - 12211",
//                       subList: false,
//                       parent: 6,
//                       children: []
//                     },
//                     {
//                       serialNumber: 4,
//                       id: 9,
//                       text: "Point - 12213",
//                       subList: false,
//                       parent: 6,
//                       children: []
//                     }
//                   ]
//                 },
//                 {
//                   serialNumber: 4,
//                   id: 10,
//                   text: "Point - 1223",
//                   subList: false,
//                   parent: 4,
//                   children: []
//                 }]
//             },
//             {
//               serialNumber: 2,
//               id: 11,
//               text: "Point - 121",
//               subList: false,
//               parent: 3,
//               children: []
//             },
//             {
//               serialNumber: 4,
//               id: 12,
//               text: "Point - 123",
//               subList: false,
//               parent: 3,
//               children: []
//             }
//           ] 
//         },
//         {
//           serialNumber: 2,
//           id: 13,
//           text: "Point - 11",
//           subList: false,
//           parent: 2,
//           children: [
//             {
//               serialNumber: 3,
//               id: 14,
//               text: "Point - 112",
//               subList: false,
//               parent: 13,
//               children: []
//             },
//             {
//               serialNumber: 2,
//               id: 15,
//               text: "Point - 111",
//               subList: false,
//               parent: 13,
//               children: []
//             },
//             {
//               serialNumber: 4,
//               id: 16,
//               text: "Point - 113",
//               subList: false,
//               parent: 13,
//               children: []
//             }
//           ]
//         },
//         {
//           serialNumber: 4,
//           id: 17,
//           text: "Point - 13",
//           subList: false,
//           parent: 2,
//           children: []
//         }
//       ]

//     },
//     {
//       serialNumber: 3,
//       id: 18,
//       text: "Point - 2",
//       subList: false,
//       parent: 0,
//       children: []

//     }

//   ]
// }


export default db