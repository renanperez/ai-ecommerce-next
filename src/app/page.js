'use client'                                 // 1️⃣ Mantenha para habilitar hooks do React no App Router

import { useState } from 'react'            // 2️⃣ useState para gerenciar estados locais

export default function Home() {
  // 3️⃣ Estados para campos e resultados
  const [description, setDescription] = useState('')
  const [email, setEmail]             = useState('')
  const [keywords, setKeywords]       = useState([])    // guarda a lista de keywords
  const [loading, setLoading]         = useState(false) // sinaliza requisição em andamento
  const [error, setError]             = useState('')    // mensagem de erro, se ocorrer

  // 4️⃣ Essa função agora é async para usar await nas fetches
  async function handleSubmit(e) {
    e.preventDefault()                  // 5️⃣ previne reload da página
    setError('')                        // 6️⃣ limpa erros anteriores
    setKeywords([])                     // 7️⃣ limpa keywords anteriores
    setLoading(true)                    // 8️⃣ mostra estado de “gerando”

    try {
      // 9️⃣ Chama o endpoint de geração de keywords
      const resKeywords = await fetch('/api/keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
      })
      const dataKeywords = await resKeywords.json()
      if (!resKeywords.ok) {
        throw new Error(dataKeywords.error || 'Erro ao gerar keywords')
      }
      setKeywords(dataKeywords.keywords) // 🔟 atualiza estado com a lista

      // 1️⃣1️⃣ Em seguida, salva o lead sem bloquear a UI
      await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, description })
      })
    } catch (err) {
      setError(err.message)             // 1️⃣2️⃣ captura e exibe erro
    } finally {
      setLoading(false)                 // 1️⃣3️⃣ finaliza “loading”
    }
  }

  // 1️⃣4️⃣ JSX que renderiza o formulário e resultados
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">AI Traffic Scout</h1>
      <h2 className="text-xl mb-6">Keyword Booster</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="description" className="block mb-1">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)} // mantém o estado sincronizado
            rows={4}
            className="w-full border px-2 py-1"
            placeholder="Descreva seu produto ou nicho…"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}      // mantém o estado sincronizado
            className="w-full border px-2 py-1"
            placeholder="seu@email.com"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}                           // desabilita enquanto carrega
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Gerando…' : 'Gerar keywords'}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {keywords.length > 0 && (                       // renderiza somente se houver keywords
        <section className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Keywords geradas:</h3>
          <ul className="list-disc list-inside space-y-1">
            {keywords.map((kw, i) => (
              <li key={i}>{kw}</li>               // exibe cada keyword
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}
