'use client'                              // 1️⃣ Indica que este componente roda no cliente (navegador), necessário no App Router

import { useState } from 'react'         // 2️⃣ Importa o “gancho” useState do React para gerenciar estado local

// 3️⃣ Componente padrão exportado, que representa a página inicial “/”
export default function Home() {
  // 4️⃣ Cria uma variável de estado 'description' e sua função para atualizar 'setDescription'
  const [description, setDescription] = useState('')  
  // 5️⃣ Cria uma variável de estado 'email' e sua função para atualizar 'setEmail'
  const [email, setEmail] = useState('')

  // 6️⃣ Função que lida com o envio do formulário
  function handleSubmit(e) {
    e.preventDefault()                    // 7️⃣ Impede o comportamento padrão de recarregar a página
    // 8️⃣ Exibe um alerta apenas para confirmar que recebemos os valores corretamente
    alert(`Descrição: ${description}\nE-mail: ${email}`)
  }

  // 9️⃣ JSX retornado: define a interface que será renderizada no navegador
  return (
    // 🔟 Container principal centralizado e com padding (usando classes do Tailwind)
    <main className="max-w-xl mx-auto p-6">
      {/* 1️⃣1️⃣ Título principal */}
      <h1 className="text-2xl font-bold mb-4">AI Traffic Scout</h1>
      {/* 1️⃣2️⃣ Subtítulo */}
      <h2 className="text-xl mb-6">Keyword Booster</h2>

      {/* 1️⃣3️⃣ Formulário: chama handleSubmit ao enviar */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 1️⃣4️⃣ Campo Descrição */}
        <div>
          <label htmlFor="description" className="block mb-1">
            Descrição
          </label>
          {/* textarea controlado pelo React (value + onChange) */}
          <textarea
            id="description"
            value={description}                       // 1️⃣5️⃣ Liga o conteúdo do textarea ao estado 'description'
            onChange={e => setDescription(e.target.value)} // 1️⃣6️⃣ Atualiza o estado sempre que o usuário digita
            rows={4}
            className="w-full border px-2 py-1"       // 1️⃣7️⃣ Estilo básico com Tailwind: largura total, borda e padding
            placeholder="Descreva seu produto ou nicho…"
            required                                 // 1️⃣8️⃣ Garante que o campo não possa ficar vazio
          />
        </div>

        {/* 1️⃣9️⃣ Campo E-mail */}
        <div>
          <label htmlFor="email" className="block mb-1">
            E-mail
          </label>
          {/* input controlado para capturar o e-mail */}
          <input
            id="email"
            type="email"                             // 2️⃣0️⃣ Tipo 'email' ativa validação nativa do navegador
            value={email}                            // 2️⃣1️⃣ Liga o conteúdo do input ao estado 'email'
            onChange={e => setEmail(e.target.value)} // 2️⃣2️⃣ Atualiza o estado ao digitar
            className="w-full border px-2 py-1"
            placeholder="seu@email.com"
            required
          />
        </div>

        {/* 2️⃣3️⃣ Botão de envio */}
        <button
          type="submit"                              // 2️⃣4️⃣ Define este elemento como o botão que envia o form
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Gerar keywords
        </button>
      </form>
    </main>
  )
}
