// define models
export const List = {
    name: "List",
    properties: {
        id: "string",
        name: "string",
        type: "string",
        questions: "string[]",
        user_data: "string[]",
    }
}

export const List_Answers = {
    name: "List_Answers",
    // id_list: "string",
    properties: {
        type: "string",
        id_list: "string",
        name_list: "string",
        user_data: "string[]",
        answers: "string[]",
        answers_observations: "string[]",
        // route of file (using local DB)
        signature_img: "string",
        // file name
        signature_img_file_name: "string",
        creation_date: "date",
    }
}

// export const Env_List = {
//     name: "Env_List",
//     // id: "string",
//     properties: {
//         id: "string",
//         name: "string",
//         questions: "string[]",
//     }
// }

// export const SSO_List = {
//     name: "SSO_List",
//     // id: "string",
//     properties: {
//         id: "string",
//         name: "string",
//         questions: "string[]",
//     }
// }

// export const Env_List_Answers = {
//     name: "Env_List_Answers",
//     // id_list: "string",
//     properties: {
//         id_list: "string",
//         name_list: "string",
//         answers: "bool[]",
//     }
// }

// export const SSO_List_Answers = {
//     name: "SSO_List_Answers",
//     // id_list: "string",
//     properties: {
//         id_list: "string",
//         name_list: "string",
//         answers: "bool[]",
//     }
// }