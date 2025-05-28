// src/app/api/save-lead/route.js
import { NextResponse } from 'next/server' // Importa o NextResponse para manipulação de respostas HTTP
import { promises as fs } from 'fs'  // Importa o módulo 'fs' para manipulação de arquivos
import path from 'path'  // Importa o módulo 'path' para manipulação de caminhos
// Define o caminho do arquivo de dados

const DATA_FILE = path.resolve('.', 'data.json')  // Caminho absoluto para o arquivo data.json na raiz do projeto
// Este arquivo DATA_FILE aponta para data.json na raiz do projeto, que armazena todos os lead. 
// O data.json será usado para armazenar os leads enviados via API. Define a função que lida com requisições POST para salvar leads

export async function POST(request) {   // Função que lida com requisições POST para salvar leads. Tenta processar a requisição
  try {
    const { email, description } = await request.json()  // Lê o corpo da requisição JSON e extrai os campos 'email' e 'description'
    // Valida se os campos obrigatórios estão presentes
    if (!email || !description) {  // Se algum campo obrigatório estiver faltando, retorna uma resposta JSON com erro 400 (Bad Request)
      return NextResponse.json({ error: 'Email e descrição são obrigatórios' }, { status: 400 })
    }

    // 1. Lê o arquivo (ou cria array vazio se estiver vazio/inexistente)
    let leads = []  // Inicializa um array vazio para armazenar os leads
    // Tenta ler o arquivo de dados - o data.json
    try {
      const content = await fs.readFile(DATA_FILE, 'utf-8')
      leads = JSON.parse(content || '[]')  // Lê o conteúdo do arquivo e tenta parsear como JSON, ou usa um array vazio se falhar. Se ele não existir ou estiver vazio, iniciamos leads = []
    } catch {}

    // 2. Adiciona novo lead (Incluímos um objeto com email, description e um timestamp ISO mostrando a data/hora do envio.)
    leads.push({  // Adiciona o novo lead ao array
      id: leads.length + 1,  // Gera um ID sequencial baseado no tamanho atual do array
      email,
      description,
      timestamp: new Date().toISOString()  // Adiciona um timestamp no formato ISO para registrar quando o lead foi criado
    })

    // 3. Salva de volta (Serializamos o array leads com indentação e sobrescrevemos data.json. Isso mantém todo o histórico de leads.)
    await fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2))  // Escreve o array atualizado de leads de volta no arquivo data.json, formatado com 2 espaços de indentação
    
    // 4. Retorna sucesso
    return NextResponse.json({ success: true })  // Retorna uma resposta JSON indicando sucesso { success: true }, na operação de salvamento do lead, com status 200 OK  
    } catch (err) {
    console.error(err) // Loga o erro no console para depuração
    return NextResponse.json({ error: 'Erro ao salvar lead' }, { status: 500 })  // Retorna uma resposta JSON com erro 500 (Internal Server Error) se algo falhar
  }
}