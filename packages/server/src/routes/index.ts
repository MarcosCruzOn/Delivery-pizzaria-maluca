import { Router } from 'express'

import { loginController } from '../controllers/auth.controllers.js'
import {
	createCategoryController,
	listCategoriesController,
} from '../controllers/categories.controllers.js'

import {
	createProductController,
	listProductsController,
	updateProductImageController,
	linkOpcionalController,
	listProductOpcionaisController,
} from '../controllers/products.controllers.js'

import {
	createOpcionalController,
	listOpcionaisController,
	createOpcionalItemController,
	listOpcionalItemsController,
} from '../controllers/opcioinais.controllers.js'

import { verificarToken } from '../middlewares/auth.js'

const routes = Router()

// Rota de Login
routes.post('/login', loginController)

// Rotas de Categorias
routes.post('/admin/categories', verificarToken, createCategoryController)
routes.get('/admin/categories', listCategoriesController)

// Rotas de Produtos
// 2. Criar produto (Protegido pelo Token)
routes.post('/admin/products', verificarToken, createProductController)

// 3. Listar produtos (Público para o cliente ver o cardápio)
routes.get('/admin/products', listProductsController)

// O ":idproduto" é uma variável na URL. Se você mandar /admin/products/5/imagem, o idproduto vira 5.
routes.patch(
	'/admin/products/:idproduto/imagem',
	verificarToken,
	updateProductImageController
)

// NOVO: Rotas para gerenciar os opcionais do produto
routes.post(
	'/admin/products/:idproduto/opcionais',
	verificarToken,
	linkOpcionalController
)
// Essa listagem fica pública para o cliente ver no site quais opções a pizza tem!
routes.get(
	'/admin/products/:idproduto/opcionais',
	listProductOpcionaisController
)

// 4. Rotas de Opcionais (A Caixa/Grupo)
routes.post('/admin/opcionais', verificarToken, createOpcionalController)
routes.get('/admin/opcionais', listOpcionaisController)

// Rotas dos Itens do Opcional (As peças dentro da caixa)
// Usamos :idopcional na URL para saber em qual caixa estamos colocando o item
routes.post(
	'/admin/opcionais/:idopcional/itens',
	verificarToken,
	createOpcionalItemController
)
routes.get('/admin/opcionais/:idopcional/itens', listOpcionalItemsController)

export default routes
