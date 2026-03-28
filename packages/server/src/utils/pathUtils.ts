import path from 'path'
import { fileURLToPath } from 'url'

/**
 * Função "chique" para descobrir a pasta atual (__dirname) em projetos ES Modules.
 * @param metaUrl Você deve passar o `import.meta.url` do arquivo que está chamando.
 */
export function getDirname(metaUrl: string) {
	const __filename = fileURLToPath(metaUrl)
	return path.dirname(__filename)
}
