
create table if not exists application_user(
    uuid uuid not null primary key default uuid_generate_v4(),
    username varchar not null,
    password varchar not null,
    script_privileges boolean not null
);

insert into application_user (username,password,script_privileges) values ("admin",crypt("senhasenha@123","yfnphgsxgbrdkyuoeltjelsrvnqqmsupvsbx"),true);