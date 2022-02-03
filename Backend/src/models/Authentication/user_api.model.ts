type user_api_model = {
    uuid:string,
    username:string,
    password?:string,
    read_privileges?:boolean,
    write_privileges?:boolean,
    admin_privileges?:boolean,
    master_privileges?:boolean
};

export default user_api_model;