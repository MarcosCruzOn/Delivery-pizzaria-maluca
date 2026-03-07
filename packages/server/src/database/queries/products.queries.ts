export const SQL_LIST_PRODUTOS = `
  SELECT
    idproduto AS id,
    idcategoria AS categoria_id,
    nome,
    descricao,
    valor AS preco,
    imagem AS imagem_url
  FROM produtos
  WHERE ATIVO = 1
  ORDER BY ordem ASC
`

export const SQL_LIST_PRODUTOS_BY_CATEGORIA = `
  SELECT * FROM produtos
  WHERE idcategoria = ?
`

export const SQL_CREATE_PRODUTO = `
  INSERT INTO produtos (
    idcategoria,
    nome,
    descricao,
    valor,
    imagem
  ) VALUES (?, ?, ?, ?, ?)
`

export const SQL_UPDATE_PRODUTO = `
  UPDATE produtos
  SET nome = ?, descricao = ?, valor = ?, imagem = ?, idcategoria = ?
  WHERE idproduto = ?
`

export const SQL_DELETE_PRODUTO = `
  DELETE FROM produtos
  WHERE idproduto = ?
`
