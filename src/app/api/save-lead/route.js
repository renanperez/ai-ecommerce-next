// src/app/api/save-lead/route.js
import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_FILE = path.resolve('.', 'data.json')

export async function POST(request) {
  try {
    const { email, description } = await request.json()
    if (!email || !description) {
      return NextResponse.json({ error: 'Email e descrição são obrigatórios' }, { status: 400 })
    }

    // 1. Lê o arquivo (ou cria array vazio se estiver vazio/inexistente)
    let leads = []
    try {
      const content = await fs.readFile(DATA_FILE, 'utf-8')
      leads = JSON.parse(content || '[]')
    } catch {}

    // 2. Adiciona novo lead
    leads.push({
      email,
      description,
      timestamp: new Date().toISOString()
    })

    // 3. Salva de volta
    await fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2))

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Erro ao salvar lead' }, { status: 500 })
  }
}