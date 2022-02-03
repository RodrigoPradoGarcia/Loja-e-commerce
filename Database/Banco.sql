#É necessário ter o MySQL instalado para executar este script

#Banco de dados
create database if not exists ecommerce;
use ecommerce;

#dando reset no Banco de dados, caso ele já tenha sido criado
drop table if exists cart_item;
drop table if exists review;
drop table if exists product;
drop table if exists user_client;


#criando as tabelas
create table if not exists user_client(
	uuid char(36) not null primary key,
    username varchar(50) not null,
    password varchar(100) not null,
    profile_photo varchar(500)
);
create unique index user_credenciais on user_client(username);

create table if not exists product(
	uuid char(36) not null primary key default "",
    name varchar(50) not null,
    category varchar(50) not null,
    price decimal(10,2) not null,
    image varchar(200) not null,
    description mediumtext not null
);

create table if not exists review(
	user_uuid char(36) not null,
    product_uuid char(36) not null,
    stars integer not null,
    comment mediumtext,
    constraint foreign key (user_uuid) references user_client(uuid),
    constraint foreign key (product_uuid) references product(uuid),
    primary key (user_uuid,product_uuid)
);

create table if not exists cart_item(
	user_uuid char(36) not null,
    product_uuid char(36) not null,
    amount integer not null,
    constraint foreign key (user_uuid) references user_client(uuid),
    constraint foreign key (product_uuid) references product(uuid),
    primary key (user_uuid,product_uuid)
);

#inserindo dados nas tabelas

#inserindo os clientes na tabela de clientes

insert into user_client(uuid,username,password,profile_photo) values (
	'6733cc6d-7e16-11ec-94fc-9883896d5064',
    'Leandro Martins',
    'leandro@123',
    'https://cdn-icons-png.flaticon.com/512/147/147144.png'
);

insert into user_client(uuid,username,password,profile_photo) values (
	'676cc35e-7e16-11ec-94fc-9883896d5064',
    'Matheus da Cunha',
    'matheuscunha@123',
    'https://img2.gratispng.com/20180920/yko/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66df14d32.3051789815374598219884.jpg'
);

insert into user_client(uuid,username,password,profile_photo) values (
	'6795a053-7e16-11ec-94fc-9883896d5064',
    'Vagner Pereira',
    'vagnerpereira@123',
    'https://img1.gratispng.com/20180523/wxj/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc2ee812.2252011515270566041921.jpg'
);

insert into user_client(uuid,username,password,profile_photo) values (
	'67b43b9d-7e16-11ec-94fc-9883896d5064',
    'Adilson Silva',
    'adilsi@123',
    'https://cdn-icons-png.flaticon.com/512/147/147144.png'
);

insert into user_client(uuid,username,password,profile_photo) values (
	'67f7541d-7e16-11ec-94fc-9883896d5064',
    'Jesus dos Santos',
    'jesus@123',
    'https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg'
);

insert into user_client(uuid,username,password,profile_photo) values (
	'686378e9-7e16-11ec-94fc-9883896d5064',
    'Tobias Vieira',
    'tobitobi@123',
    'https://e7.pngegg.com/pngimages/78/788/png-clipart-computer-icons-avatar-business-computer-software-user-avatar-child-face.png'
);

insert into user_client(uuid,username,password,profile_photo) values (
	'6895cc90-7e16-11ec-94fc-9883896d5064',
    'Geraldo Mongol',
    'gelmongo@123',
    'https://images.vexels.com/media/users/3/129733/isolated/preview/a558682b158debb6d6f49d07d854f99f-silhueta-de-avatar-masculino-casual.png'
);

insert into user_client(uuid,username,password,profile_photo) values (
	'68a5a4d4-7e16-11ec-94fc-9883896d5064',
    'Mauricio Cardoso',
    'maucar@123',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0g8R5VmgqDqpRCwQfw2Y9V-DM-iXS59R9hQ&usqp=CAU'
);

insert into user_client(uuid,username,password,profile_photo) values (
	'68ba032d-7e16-11ec-94fc-9883896d5064',
    'Jacobias Santana',
    'jacobi@123',
    'https://www.pinclipart.com/picdir/middle/499-4992513_avatar-avatar-png-clipart.png'
);

insert into user_client(uuid,username,password,profile_photo) values (
	'68c18dd3-7e16-11ec-94fc-9883896d5064',
    'Viviane de Vivi',
    'vivi@123',
    'https://www.monteirolobato.edu.br/public/assets/admin/images/avatars/avatar5_big@2x.png'
);

insert into user_client(uuid,username,password,profile_photo) values (
	'68c86091-7e16-11ec-94fc-9883896d5064',
    'Caio Beleza',
    'caiobel@123',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSMw5AAkByIyDzHp48dVQvEJo5RPaNnQs8qA&usqp=CAU'
);

insert into user_client(uuid,username,password,profile_photo) values (
	'68d2c85d-7e16-11ec-94fc-9883896d5064',
    'Haroldo Garcia',
    'harold@123',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq_I0JFO2DxoAV3J-sI7ajtx0qW0Q5neaY_A&usqp=CAU'
);

insert into user_client(uuid,username,password,profile_photo) values (
	'68db0547-7e16-11ec-94fc-9883896d5064',
    'Tenilson Costa',
    'tencos@123',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXGX-RBsMEQ0I2-P8uOcEtq1tJIeFcT_cfdQ&usqp=CAU'
);

insert into user_client(uuid,username,password,profile_photo) values (
	'68ebffd8-7e16-11ec-94fc-9883896d5064',
    'Geraldo Danante',
    'geldan@123',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5yTxBxqX7UPLILheEuZbgOuYver2PQLQxuQ&usqp=CAU'
);

insert into user_client(uuid,username,password,profile_photo) values (
	'691a0546-7e16-11ec-94fc-9883896d5064',
    'Marelo de Amarelo',
    'yellow@123',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbuJLO0LlaXej6fX-ovajnLFucc7Loyp_XF4LyvG6IAv8vJXchukw5C9pdpechjYalrIc&usqp=CAU'
);

insert into user_client(uuid,username,password,profile_photo) values (
	'6923953e-7e16-11ec-94fc-9883896d5064',
    'Ternoso de Ternosa',
    'terter@123',
    'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
);

insert into user_client(uuid,username,password,profile_photo) values (
	'69313652-7e16-11ec-94fc-9883896d5064',
    'Junior Prado',
    'junjun@123',
    'https://cdn-icons-png.flaticon.com/512/206/206853.png'
);

insert into user_client(uuid,username,password,profile_photo) values (
	'693c2acf-7e16-11ec-94fc-9883896d5064',
    'Vanessa Vonderman',
    'nenessa@123',
    'https://e7.pngegg.com/pngimages/674/524/png-clipart-professional-computer-icons-avatar-job-avatar-heroes-computer.png'
);

insert into user_client(uuid,username,password,profile_photo) values (
	'694746ad-7e16-11ec-94fc-9883896d5064',
    'Kátia Fabrícia',
    'katkat@123',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk0_awBgy1s8dMYO6fy5v2hrJj8fs6G6ljIJ7Jl3JzDWDjgMtTRyjpd9tqzoz2BVIoHj8&usqp=CAU'
);

insert into user_client(uuid,username,password,profile_photo) values (
	'6956a420-7e16-11ec-94fc-9883896d5064',
    'Milena Millie',
    'milmil@123',
    'https://inovacred.com.br/wp-content/uploads/2020/06/avatar-girl-2.png'
);

#inserindo os produtos na tabela de produtos

insert into product (uuid,name,category,price,image,description) values (
	'696be180-7e16-11ec-94fc-9883896d5064',
    'Camisa Vermelha',
    'Camisas',
    49.99,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFnqo7pdsIE9fPunSES-uv4vGNkQkKgh6ETw&usqp=CAU',
    'camisa vermelha tamanho M'
);

insert into product (uuid,name,category,price,image,description) values (
	'697c1635-7e16-11ec-94fc-9883896d5064',
    'Camisa Social preta',
    'Camisas',
    80.00,
    'https://t-static.dafiti.com.br/cVSagRuy9TRAxgZkZ4VrKPG9_xQ=/fit-in/427x620/static.dafiti.com.br/p/amil-camisa-amil-paris-militar-manga-longa-slim-chumbo-0654-3431676-1-product.jpg',
    'camisa social preta tecido jeans'
);

insert into product (uuid,name,category,price,image,description) values (
	'698b2569-7e16-11ec-94fc-9883896d5064',
    'Camisa Rosa',
    'Camisas',
    69.99,
    'https://a-static.mlcdn.com.br/618x463/camisa-social-masculina-manga-longa-slim-botoes-duplo-rosa-pink-us-born/estilomodas/5230423909/564a3c28af6e49bf2bcd96604d0f66ce.jpg',
    'camisa masculina social pink com botões'
);

insert into product (uuid,name,category,price,image,description) values (
	'69b3a174-7e16-11ec-94fc-9883896d5064',
    'Camisa Xadrez',
    'Camisas',
    39.49,
    'https://ph-cdn3.ecosweb.com.br/imagens01/foto/moda-masculina/camisa-manga-curta/camisa-azul-xadrez-em-tricoline-plus_626257_301_1.jpg',
    'camisa xadrez masculina de manga curta em tricoline'
);

insert into product (uuid,name,category,price,image,description) values (
	'69c962db-7e16-11ec-94fc-9883896d5064',
    'Calça Feminina Vermelha',
    'Calças',
    78.40,
    'https://viaterra.vteximg.com.br/arquivos/ids/157933-1026-1538/CALCA-FEMININA-SKINNY-COS-MAGICO---VT884412.jpg?v=637718038809400000',
    'cor vermelha tamanho P'
);

insert into product (uuid,name,category,price,image,description) values (
	'69d52b1d-7e16-11ec-94fc-9883896d5064',
    'Jeans Azul',
    'Calças',
    64.50,
    'https://www.invictus.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/l/e/legion-azul-frente.jpg',
    'Legion Azul tamanho M'
);

insert into product (uuid,name,category,price,image,description) values (
	'69e484a6-7e16-11ec-94fc-9883896d5064',
    'Calça Moda Feminina',
    'Calças',
    45.57,
    'https://ph-cdn1.ecosweb.com.br/imagens01/foto/moda-feminina/calca-jeans/calca-mom-jeans-clara-com-pregas-na-cintura_315681_600_1.jpg',
    'Calça jeans moda feminina com pregas na cintura'
);

insert into product (uuid,name,category,price,image,description) values (
	'69f226de-7e16-11ec-94fc-9883896d5064',
    'Jeans Feminina Cinza',
    'Calças',
    78.99,
    'https://img.lojasrenner.com.br/item/548200163/zoom/1.jpg',
    'Jeans feminina cinza tamanho P'
);

insert into product (uuid,name,category,price,image,description) values (
	'69fc639b-7e16-11ec-94fc-9883896d5064',
    'Jeans Carpinteira',
    'Roupas',
    49.99,
    'https://rodeowest.fbitsstatic.net/img/p/calca-jeans-carpinteira-masculina-azul-docks-18704-113611/330999-2.jpg?w=460&h=460&v=no-change&qs=ignore',
    'cor: azul, tamanho: G'
);

insert into product (uuid,name,category,price,image,description) values (
	'6a143ced-7e16-11ec-94fc-9883896d5064',
    'Tênis Adidas Preto',
    'Tênis',
    124.47,
    'https://static.netshoes.com.br/produtos/tenis-adidas-ultimashow-masculino/26/NQQ-6927-026/NQQ-6927-026_zoom1.jpg?ts=1612440206&ims=544x',
    'Tênis Adidas preto masculino tamanho 40'
);

insert into product (uuid,name,category,price,image,description) values (
	'6a3ab6e2-7e16-11ec-94fc-9883896d5064',
    'Tênis Adidas Branco',
    'Tênis',
    147.99,
    'https://assets.adidas.com/images/w_600,f_auto,q_auto/9a15aa114ab94bd1af21a97401330fab_9366/Tenis_Courtsmash_Branco_F36718_01_standard.jpg',
    'Tênis Adidas branco masculino tamanho 36'
);

insert into product (uuid,name,category,price,image,description) values (
	'6a686024-7e16-11ec-94fc-9883896d5064',
    'Tênis Capodarte preto',
    'Tênis',
    67.45,
    'https://dumond.vteximg.com.br/arquivos/ids/342153-820-820/2001138906_Ampliada.jpg?v=637764104035630000',
    'tênis feminino tamanho 30'
);

insert into product (uuid,name,category,price,image,description) values (
	'6a7b3eed-7e16-11ec-94fc-9883896d5064',
    'Tênis sbelta',
    'Tênis',
    87.99,
    'https://imgcentauro-a.akamaihd.net/1300x1300/M0BNUE01/tenis-sbelta-casual-feminino-img.jpg',
    'tenis casual feminino tamanho 34'
);

insert into product (uuid,name,category,price,image,description) values (
	'6a8d9aa3-7e16-11ec-94fc-9883896d5064',
    'Tênis feminino preto e rosa',
    'Tênis',
    97.49,
    'https://decathlonpro.vteximg.com.br/arquivos/ids/2702430/-tn-puma-interflex-f-pto-ros-uk-7-eu41-341.jpg?v=637493512625700000',
    'pluma interflix preto e rosa feminino'
);

insert into product (uuid,name,category,price,image,description) values (
	'6aa2b4f2-7e16-11ec-94fc-9883896d5064',
    'Chapéu Marrom',
    'Chapéus',
    45.95,
    'https://rodeowest.fbitsstatic.net/img/p/chapeu-cafe-5x-campo-iv-feltro-pralana-0929a-102037/300060-1.jpg?w=460&h=460&v=no-change&qs=ignore',
    'Chepéu feito de feltro pralana'
);

insert into product (uuid,name,category,price,image,description) values (
	'6ab2cdee-7e16-11ec-94fc-9883896d5064',
    'Chapéu Preto',
    'Chapéus',
    54.49,
    'https://cdn.awsli.com.br/600x450/356/356708/produto/45518153/cbc78609cd.jpg',
    'Chepéu feito de feltro pralana'
);

insert into product (uuid,name,category,price,image,description) values (
	'6ad9a06b-7e16-11ec-94fc-9883896d5064',
    'Chapéu de palha',
    'Chapéus',
    47.75,
    'https://images.tcdn.com.br/img/img_prod/646215/chapeu_ariat_20x_de_palha_2019_1_20201214093609.jpg',
    'chapéu de palha masculino cor branca'
);

insert into product (uuid,name,category,price,image,description) values (
	'6af7ea4b-7e16-11ec-94fc-9883896d5064',
    'Relógio digital ultra leve',
    'Acessórios',
    52.14,
    'https://http2.mlstatic.com/D_NQ_NP_962975-MLB46119044392_052021-O.jpg',
    'Cor preta'
);

insert into product (uuid,name,category,price,image,description) values (
	'6b166a3d-7e16-11ec-94fc-9883896d5064',
    'Relógio dourado',
    'Acessórios',
    89.84,
    'https://cf.shopee.com.br/file/48109090d7031a73df4db8717ad98c56',
    'relógio analógico'
);

insert into product (uuid,name,category,price,image,description) values (
	'6b251c19-7e16-11ec-94fc-9883896d5064',
    'Relógio feminino',
    'Acessórios',
    125.14,
    'https://www.extra-imagens.com.br/Control/ArquivoExibir.aspx?IdArquivo=1199716840',
    'champion digital'
);

insert into product (uuid,name,category,price,image,description) values (
	'6b31572c-7e16-11ec-94fc-9883896d5064',
    'Colar prateado',
    'Acessórios',
    23.47,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfIs5-lwiAowiIJcXdvfSupPRIcP7HE3DWVA&usqp=CAU',
    'Colar feminino com formato de coração'
);

insert into product (uuid,name,category,price,image,description) values (
	'6b393cfb-7e16-11ec-94fc-9883896d5064',
    'Pingente de ametista',
    'Acessórios',
    235.47,
    'https://images.tcdn.com.br/img/img_prod/693313/colar_cordao_preto_amarrar_pedra_ametista_bruta_257_1_20190801173259.jpg',
    'Colar preto de ametista bruta natural'
);

#inserindo as avaliações na tabela de avaliações

insert into review(user_uuid,product_uuid,start,comment) values (
	'676cc35e-7e16-11ec-94fc-9883896d5064',
    '69c962db-7e16-11ec-94fc-9883896d5064',
    5,
    'Adorei esse produto!'
);

insert into review(user_uuid,product_uuid,start,comment) values (
	'676cc35e-7e16-11ec-94fc-9883896d5064',
    '6a8d9aa3-7e16-11ec-94fc-9883896d5064',
    3,
    'Achei bem mais ou menos'
);

insert into review(user_uuid,product_uuid,start,comment) values (
	'686378e9-7e16-11ec-94fc-9883896d5064',
    '696be180-7e16-11ec-94fc-9883896d5064',
    5,
    'Um dos melhores nessa categoria'
);

insert into review(user_uuid,product_uuid,start,comment) values (
	'68a5a4d4-7e16-11ec-94fc-9883896d5064',
    '696be180-7e16-11ec-94fc-9883896d5064',
    3,
    'jesus'
);

insert into review(user_uuid,product_uuid,start,comment) values (
	'68a5a4d4-7e16-11ec-94fc-9883896d5064',
    '697c1635-7e16-11ec-94fc-9883896d5064',
    4,
    'Bacana'
);

insert into review(user_uuid,product_uuid,start,comment) values (
	'68a5a4d4-7e16-11ec-94fc-9883896d5064',
    '698b2569-7e16-11ec-94fc-9883896d5064',
    1,
    'Muito brega!'
);

insert into review(user_uuid,product_uuid,start,comment) values (
	'68a5a4d4-7e16-11ec-94fc-9883896d5064',
    '69c962db-7e16-11ec-94fc-9883896d5064',
    5,
    'Minha esposa amou'
);

insert into review(user_uuid,product_uuid,start,comment) values (
	'68a5a4d4-7e16-11ec-94fc-9883896d5064',
    '6a8d9aa3-7e16-11ec-94fc-9883896d5064',
    2,
    'Decepcionado com esse produto'
);

insert into review(user_uuid,product_uuid,start,comment) values (
	'68a5a4d4-7e16-11ec-94fc-9883896d5064',
    '6b251c19-7e16-11ec-94fc-9883896d5064',
    5,
    'Esse produto é fantástico!'
);

insert into review(user_uuid,product_uuid,start,comment) values (
	'68c86091-7e16-11ec-94fc-9883896d5064',
    '696be180-7e16-11ec-94fc-9883896d5064',
    5,
    'Qualidade excepcional!'
);

insert into review(user_uuid,product_uuid,start,comment) values (
	'68d2c85d-7e16-11ec-94fc-9883896d5064',
    '6ab2cdee-7e16-11ec-94fc-9883896d5064',
    3,
    'Achei que poderia ser melhor'
);

insert into review(user_uuid,product_uuid,start,comment) values (
	'68ebffd8-7e16-11ec-94fc-9883896d5064',
    '6b251c19-7e16-11ec-94fc-9883896d5064',
    3,
    'O produto não é lá muito bom, mas pelo preço acho que está ok'
);

insert into review(user_uuid,product_uuid,start,comment) values (
	'691a0546-7e16-11ec-94fc-9883896d5064',
    '698b2569-7e16-11ec-94fc-9883896d5064',
    1,
    'Se pudesse pedia reembolso'
);

insert into review(user_uuid,product_uuid,start,comment) values (
	'694746ad-7e16-11ec-94fc-9883896d5064',
    '6ab2cdee-7e16-11ec-94fc-9883896d5064',
    4,
    'Muito bom, mas poderia ser melhor'
);