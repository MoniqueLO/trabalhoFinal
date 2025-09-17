module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'API de Lojas',
    version: '1.0.0',
    description: 'API para cadastro, autenticação e listagem de lojas.'
  },
  paths: {
    '/auth/login': {
      post: {
        summary: 'Autenticar usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nome: { type: 'string' },
                  senha: { type: 'string' }
                },
                required: ['nome', 'senha']
              }
            }
          }
        },
        responses: {
          200: { description: 'Usuário autenticado, retorna token' },
          401: { description: 'Usuário ou senha inválidos' }
        }
      }
    },
    '/lojas': {
      post: {
        summary: 'Cadastrar loja',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nome: { type: 'string' },
                  endereco: { type: 'string' }
                },
                required: ['nome', 'endereco']
              }
            }
          }
        },
        responses: {
          201: { description: 'Loja cadastrada' },
          400: { description: 'Nome e endereço são obrigatórios' },
          401: { description: 'Token não fornecido' },
          403: { description: 'Token inválido' }
        }
      },
      get: {
        summary: 'Listar lojas',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Lista de lojas' },
          401: { description: 'Token não fornecido' },
          403: { description: 'Token inválido' }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};
