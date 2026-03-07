export const SQL_LIST_CATEGORIAS = `
  SELECT
    idcategoria AS id,
    nome
  FROM categorias
  ORDER BY idcategoria ASC
`

export const SQL_GET_CATEGORIA_BY_ID = `
  SELECT * FROM categorias WHERE idcategoria = ?
`

export const SQL_CREATE_CATEGORIA = `
  INSERT INTO categorias (nome, icone)
  VALUES (?, ?)
`

export const SQL_UPDATE_CATEGORIA = `
  UPDATE categorias
  SET nome = ?, icone = ?
  WHERE idcategoria = ?
`

export const SQL_DELETE_CATEGORIA = `
  DELETE FROM categorias
  WHERE idcategoria = ?
`
