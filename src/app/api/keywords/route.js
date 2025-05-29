// src/app/api/keywords/route.js - Este arquivo define uma rota API para gerar palavras-chave usando a OpenAI API.
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// 1️⃣ Inicializa o SDK com sua chave (leia de .env.local)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request) {
  try {
    // 2️⃣ Lê o body JSON do request
    const { description } = await request.json()

    // 3️⃣ Validação simples
    if (!description || description.length < 10) {
      return NextResponse.json(
        { error: 'Descrição obrigatória (mínimo 10 caracteres)' },
        { status: 400 }
      )
    }

    // 4️⃣ Monta o prompt para a IA
    const prompt = `Você é um analista de tráfego. Gere 15 palavras-chave relevantes para: ${description}`

    // 5️⃣ Chama a API da OpenAI via Chat Completions
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',       // ou outro modelo disponível
      messages: [
        { role: 'system', content: 'Você gera palavras-chave de marketing.' },
        { role: 'user',   content: prompt }
      ],
      max_tokens: 200
    })

    // 6️⃣ Processa e envia a resposta em array de strings    
    const text = response.choices[0].message.content || ''
    const keywords = text
      .split('\n')
      .map(k => k.trim())
      .filter(k => k)

    // 7️⃣ Retorna JSON com a lista de keywords   
    return NextResponse.json({ keywords })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Erro interno ao gerar keywords' },
      { status: 500 }
    )
  }
}