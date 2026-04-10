# 🍕 Delivery Pizzaria Maluca

Um sistema completo de delivery (Full-Stack) projetado com arquitetura monorepo, contendo um aplicativo para o cliente final e um painel de administração completo para a gestão da pizzaria.

## 🚀 Funcionalidades

### 📱 App do Cliente
* **Cardápio Dinâmico:** Visualização de pizzas, bebidas e busca de produtos.
* **Carrinho Inteligente:** Cálculo automático de valores, adição de opcionais (bordas, ingredientes) e armazenamento local (LocalStorage) para não perder o pedido.
* **Checkout Completo:** Máscaras de telefone e CEP, cálculo de troco e persistência do endereço do cliente.
* **Radar de Pedido em Tempo Real:** Acompanhamento dinâmico do status do pedido (Pendente, Em Preparo, Saiu para Entrega) e verificação inteligente do horário de funcionamento da loja.
* **Integração WhatsApp:** Link direto com mensagem pré-formatada para contato com a pizzaria.

### 💻 Painel Administrativo
* **Gestão de Pedidos (Kanban):** Visualização e atualização de status de pedidos em tempo real.
* **Configurações da Loja:** Edição de dados da empresa, endereço via API ViaCEP e upload de logotipo.
* **Motor de Horários:** Cadastro de regras de dias e horários de funcionamento (turnos) com conversão automática de dias da semana.
* **Gestão de Produtos:** Controle de categorias, produtos e itens opcionais.

## 🛠️ Tecnologias Utilizadas

* **Frontend:** HTML5, CSS3, TypeScript (Vanilla/DOM Manipulation), Bootstrap e FontAwesome.
* **Backend:** Node.js, Express e TypeScript.
* **Banco de Dados:** MySQL (Consultas parametrizadas, Transações seguras e Relacionamento de tabelas).
* **Arquitetura:** Monorepo dividindo as responsabilidades entre `server`, `web` (cliente) e `admin`.

## ⚙️ Como Executar o Projeto

**1. Clone o repositório e instale as dependências:**
\`\`\`bash
npm install
\`\`\`

**2. Configure o Banco de Dados:**
* Importe o arquivo \`pizzaria_maluca_Estrutura.sql\` no seu MySQL Workbench.
* Configure as credenciais de acesso ao banco no arquivo de configuração do backend.

**3. Inicie os servidores:**
\`\`\`bash
# Inicie o backend e o frontend
npm run dev
\`\`\`

## 🧠 Lógica de Destaque
* **State Management Local:** Utilização avançada de `localStorage` para criar uma "memória de elefante", lembrando o endereço do cliente e o status do carrinho mesmo após fechar o navegador.
* **Roteamento SPA Hash:** Sistema de rotas leve no frontend baseado em `window.location.hash`, eliminando a necessidade de bibliotecas pesadas.