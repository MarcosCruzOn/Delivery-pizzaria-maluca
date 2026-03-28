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

import {
	createPaymentController,
	listPaymentsController,
	createDeliveryController,
	listDeliveriesController,
	createOrderStatusController,
	listOrderStatusController,
} from '../controllers/settings.controllers.js'

import {
	createOrderController,
	listOrdersController,
	updateOrderStatusController,
} from '../controllers/orders.controllers.js'

import { verificarToken } from '../middlewares/auth.js'

const routes = Router()

// Rota de Login
routes.post('/login', loginController)

// Rotas de Categorias
routes.post('/admin/categories', verificarToken, createCategoryController)
routes.get('/admin/categories', listCategoriesController)

// Rotas de Produtos
// Criar produto (Protegido pelo Token)
routes.post('/admin/products', verificarToken, createProductController)

// Listar produtos (Público para o cliente ver o cardápio)
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

// NOVO: Rotas de Pagamento
routes.post('/admin/pagamentos', verificarToken, createPaymentController)
routes.get('/pagamentos', listPaymentsController) // Rota Pública

// NOVO: Rotas de Tipo de Entrega
routes.post('/admin/entregas', verificarToken, createDeliveryController)
routes.get('/entregas', listDeliveriesController) // Rota Pública

// NOVO: Rotas de Status do Pedido
routes.post('/admin/status', verificarToken, createOrderStatusController)
// A listagem pode ser pública, pois no futuro o cliente vai querer ver na Web que o pedido dele está "Em Preparo"
routes.get('/status', listOrderStatusController)

// Rota Pública (Cliente criando pedido)
routes.post('/orders', createOrderController)

// NOVO: Rota Protegida (Admin vendo os pedidos)
routes.get('/admin/orders', verificarToken, listOrdersController)
// 2. NOVO: Rota PATCH para alterar o status
routes.patch(
	'/admin/orders/:idpedido/status',
	verificarToken,
	updateOrderStatusController
)

export default routes
