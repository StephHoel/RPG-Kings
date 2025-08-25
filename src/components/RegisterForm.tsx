import { type FormEvent, useState } from 'react'
import { useAuth } from '../auth/AuthContext'

export function RegisterForm({ onSuccess }: { onSuccess?: () => void }) {
  const { register } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleRegister(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const ok = await register(email, password)
    setLoading(false)

    if (!ok) setError('Registro inválido')
    else if (onSuccess) onSuccess()
  }

  return (
    <form
      onSubmit={handleRegister}
      className='bg-neutral-900/90 border border-violet-800 rounded-xl p-6 flex flex-col gap-3 animate-fade-in'
    >
      <label className='text-neutral-300 font-semibold'>
        Nome
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='mt-1 w-full px-3 py-2 rounded bg-neutral-800 text-neutral-100 border border-neutral-700'
          required
        />
      </label>
      <label className='text-neutral-300 font-semibold'>
        Email
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='mt-1 w-full px-3 py-2 rounded bg-neutral-800 text-neutral-100 border border-neutral-700'
          required
        />
      </label>
      <label className='text-neutral-300 font-semibold'>
        Senha
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='mt-1 w-full px-3 py-2 rounded bg-neutral-800 text-neutral-100 border border-neutral-700'
          required
        />
      </label>
      <button
        type='submit'
        disabled={loading}
        className='mt-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold'
      >
        {loading ? 'Registrando...' : 'Registrar'}
      </button>
      {error && <div className='text-red-400 font-semibold mt-2'>{error}</div>}
    </form>
  )
}
