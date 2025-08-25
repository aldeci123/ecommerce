
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'e-commerce',
    description: 'Api para gestão de dados do E-commerce'
  },
  servers: [
    {
      url: 'http://127.0.0.1:5001/e-commerce-adefa/us-central1/api',              // by default: 'http://localhost:3000'
      description: 'Dev'       // by default: ''
    },
    // { ... }
  ],
  components: {
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        },
        schemas: {
          successResponse:'inserido com sucesso',
          loginUser:{
            $email: "email@email.com",
            $password: "123456"
          },
          recoveryUser:{
            $email: "email@email.com"
          },
          User:{
            id:"Id de um usuário cadastrado",
            nome: "Nome da Silva",
            email: "email@email.com",
          },
          addUser:{
            $nome: "Nome da Silva",
            $email: "email@email.com",
            $password: "password12345"
          },
          updateUser:{
            $nome: "Nome da Silva",
            $email: "email@email.com",
            password: "password12345"
          },
          addProduct:{
            $nome: "sanduíche ",
            $descricao: "um pão recheado com carne de amburguer e salada ",
            $preco: 12.12,
            $imagem: "uma imagem base64 ou uri",
            categoria: {
              $id: "um id de categoria válida"
            },
            ativa:"true"
          },
          updateProduct:{
            $nome: "sanduíche ",
            $descricao: "um pão recheado com carne de amburguer e salada ",
            $preco: 12.12,
            $imagem: "uma imagem base64 ou uri",
            $categoria: {
              $id: "um id de categoria válida"
            },
            $ativa:"true"
          },
          addCategory:{
            $descricao: "Comida",
            ativa:"true"
          },
          updateCategory:{
            $descricao: "Comida",
            $ativa:"true"
          },
          addPayment:{
            $descricao: "Dinheiro",
            $ativa:"true"
          },
          updatePayment:{
            $descricao: "Dinheiro",
            $ativa:"true"
          },
          addCompany:{
            $logomarca: "uma imagem base64",
            $cpfCnpj: "415.346.546-20",
            $razaoSocial: "Empresa LMTD",
            $nomeFantasia: "Criando Delicias",
            $telefone: "88999999999",
            $horarioFuncionamento: "12 horas",
            $endereco: 'Rua jancley dantas, n 50 - Paralimpa',
            $localizacao: 'uri do mapa',
            $taxaEntrega: 10,
            ativa: 'true'
          },
          updateCompany:{
            $logomarca: "uma imagem base64",
            $cpfCnpj: "415.346.546-20",
            $razaoSocial: "Empresa LMTD",
            $nomeFantasia: "Criando Delicias",
            $telefone: "88999999999",
            $horarioFuncionamento: "12 horas",
            $endereco: 'Rua jancley dantas, n 50 - Paralimpa',
            $localizacao: 'uri do mapa',
            $taxaEntrega: 10,
            $ativa: 'true'
          },
          addOrder:{
            $empresa:{
              $id: "um ID válido",
            },
            cliente:{
              $telefone:"88999999999" ,
              $nome: "Nome da Silva"
            } ,
            endereco: null,
            cpfCnpjCupom: null,
            $isEntrega: null,
            $formaPagamento:{
                  $id: "ID de método de pagamento válido"
                },
            $taxaEntrega: 10,
            $items: {
                  $id: "um ID válido",
                  $quantidade: 12,
                  observacao: 'bem embalado',
                },
            status: { "@enum": ['pendente', null] },
            obervacoes: 'cuidado ao transportar'
                
          },
          updateStatus:{
            $status: {
              "@enum":
              ['aprovado','entrega','concluido','cancelado']
            },
                
          }

        },
        parameters: {
          orderEmpresaId:{
            name:'empresaId',
            in: 'query',                            
            description: 'Id da empresa',                   
            required: 'false',                     
            schema: {
              type: 'string',
            },
            format:'string',

          },
          orderDataInicio:{
            name:'dataInicio',
            in: 'query',                            
            description: 'data de inicio do filtro com formato YYYY-MM-DD',                   
            required: 'false',                     
            schema: {
              type: 'date'
            } 
          },
          orderDataFim:{
            name:'dataFim',
            in: 'query',                            
            description: 'data de fim do filtro com formato YYYY-MM-DD',                   
            required: 'false',                     
            schema: {
              type: 'date'
            } 
          },
          orderStatus:{
            name:'status',
            in: 'query',                            
            description: 'status do Pedido',                   
            required: 'false',                     
            schema: {
              type: 'string',
              enum: ['pendente','aprovado','entrega','concluido','cancelado']
            }
          }
        }

    },
  tags: [
    {
      "name": "Auth",
      "description": "Autenticação de usuários"
    },
    {
      "name": "Users",
      "description": "Gestão de usuários"
    },
    {
      "name": "Company",
      "description": "Gestão de empresas"
    },
    {
      "name": "Products",
      "description": "Gestão de produtos"
    },
    {
      "name": "Categories",
      "description": "Gestão de categorias"
    },
    {
      "name": "Payment-Methods",
      "description": "Gestão de métodos de pagamento"
    },
    {
      "name": "Orders",
      "description": "Gestão da área de pedidos"
    }
  ]
};

const outputFile = './src/docs/swagger-output.json';
const routes = ['./src/routes/index.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({openapi: '3.0.0'})(outputFile, routes, doc);