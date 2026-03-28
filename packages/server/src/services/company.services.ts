import pool from '../database/connection.js'

// Função para buscar os dados da empresa (perfil)
export async function buscarEmpresaPorId(idempresa: number) {
	// Fazemos o SELECT de tudo, EXCETO a senha (por segurança, nunca devolvemos a senha pro frontend!)
	const [linhas]: any = await pool.query(
		`SELECT idempresa, nome, email, sobre, logotipo, cep, endereco, numero, bairro, complemento, cidade, estado 
     FROM empresa WHERE idempresa = ?`,
		[idempresa]
	)
	return linhas[0] // Retorna a primeira (e única) empresa encontrada
}

// Função para atualizar os dados de texto e endereço
export async function atualizarDadosEmpresa(idempresa: number, dados: any) {
	const [resultado] = await pool.query(
		`UPDATE empresa SET 
      nome = ?, sobre = ?, cep = ?, endereco = ?, numero = ?, 
      bairro = ?, complemento = ?, cidade = ?, estado = ? 
     WHERE idempresa = ?`,
		[
			dados.nome,
			dados.sobre,
			dados.cep,
			dados.endereco,
			dados.numero,
			dados.bairro,
			dados.complemento,
			dados.cidade,
			dados.estado,
			idempresa,
		]
	)
	return resultado
}

// Função específica para atualizar APENAS a logotipo (igual fizemos com a pizza)
export async function atualizarLogotipoEmpresa(
	idempresa: number,
	nomeDaImagem: string
) {
	const [resultado] = await pool.query(
		'UPDATE empresa SET logotipo = ? WHERE idempresa = ?',
		[nomeDaImagem, idempresa]
	)
	return resultado
}
