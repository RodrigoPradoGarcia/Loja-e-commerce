//libs

//models
import user_api_model from "../../models/Authentication/user_api.model";

//erros
import { DatabaseError } from "../../models/error";

//banco
import AutBanco from "./aut_db";

class userAPIRepos
{
    async getAllUsers(): Promise<user_api_model[]>
    {
        try
        {
            const {rows} = await AutBanco.query<user_api_model>("select uuid,username,read_privileges,write_privileges,admin_privileges,master_privileges from application_user");
            return rows;
        }
        catch(erro)
        {
            throw new DatabaseError("Não foi possível ler do banco de dados");
        }
    }

    async getById(uuid:string) : Promise<user_api_model>
    {
        try
        {
            const result = await AutBanco.query<user_api_model>("select uuid,username,read_privileges,write_privileges,admin_privileges,master_privileges from application_user where uuid=$1",[uuid]);
            if(result.rowCount===0)
            {
                throw new DatabaseError("usuário não encontrado");
            }
            const {rows:[user]} = result;
            return user;
        }       
        catch(erro)
        {
            throw new DatabaseError("ocorreu um erro ao objet o usuário");
        }
    }

    async post(json:user_api_model) : Promise<String>
    {
        try
        {
            const uuid = await AutBanco.query<String>("insert into application_user (username,password,read_privileges,write_privileges,admin_privileges,master_privileges) values ($1,crypt($2,$3),$4,$5,$6,$7) returning uuid",[json.username,json.password,process.env.SECRET,true,false,false,false]);
            return uuid.rows[0];
        }
        catch(erro:any)
        {
            console.log(erro.message);
            throw new DatabaseError("não foi possível cadastrar o usuário");
        }
    }

    async getByUsernameAndPassword(username:string,password:string) : Promise<user_api_model>
    {
        try
        {
            const {rows:[user]} = await AutBanco.query<user_api_model>("select uuid,username,read_privileges,write_privileges,admin_privileges,master_privileges from application_user where username=$1 and password=crypt($2,$3)",[username,password,process.env.SECRET]);
            return user;
        }
        catch(erro)
        {
            throw new DatabaseError("usuário não encontrado");
        }
    }

    async put(uuid:string,obj:user_api_model) : Promise<void>
    {
        try
        {
            const result = await AutBanco.query("update application_user set username=$1,password=crypt($2,$3),read_privileges=$4,write_privileges=$5 where uuid=$6",[obj.username,obj.password,process.env.SECRET,obj.read_privileges,obj.write_privileges,uuid]);
            if(result.rowCount===0)
            {
                throw new DatabaseError("Usuário não existe");
            }
        }
        catch(erro)
        {
            console.log(erro);
            throw new DatabaseError("Não foi possível alterar esse usuário");
        }
    }

    async delete(uuid:string) : Promise<void>
    {
        try
        {
            const result = await AutBanco.query("delete from application_user where uuid=$1",[uuid]);
            if(result.rowCount===0)
            {
                throw new DatabaseError("o usuário não existe");
            }
        }
        catch(erro)
        {
            throw new DatabaseError("não foi possível deletar");
        }
    }

    async privilege_read_write(uuid:string,user:user_api_model) : Promise<void>
    {
        try
        {
            await AutBanco.query("update application_user set read_privileges=$1,write_privileges=$2 where uuid=$3",[user.read_privileges,user.write_privileges,uuid]);
        }
        catch(erro)
        {
            throw new DatabaseError("Ocorreu um erro ao alterar o privilégio");
        }
    }

    async privilege_admim(uuid:string,user:user_api_model) : Promise<void>
    {
        try
        {
            await AutBanco.query("update application_user set admin_privileges=$1 where uuid=$2",[user.admin_privileges,uuid]);
        }
        catch(erro)
        {
            throw new DatabaseError("Ocorreu um erro ao alterar o privilégio");
        }
    }
}

export default new userAPIRepos();