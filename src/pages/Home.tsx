import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/auth/AuthContext'
import { Loader } from '@/components/Loader'
import { RegisterForm } from '@/components/RegisterForm'
import { useToast } from '@/components/ToastContext'

export function Home() {
  const nav = useNavigate()
  const { user, login } = useAuth()
  const { showToast } = useToast()
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const ok = await login(email, password)

    setLoading(false)

    if (!ok) {
      setError('Login inválido')
      showToast('Falha ao entrar. Verifique seus dados.', 'error')
    } else {
      setShowLogin(false)
      showToast('Login realizado com sucesso!', 'success')
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-neutral-900 via-violet-950 to-neutral-800 flex items-center justify-center p-6'>
      <div className='w-full max-w-3xl bg-neutral-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-violet-900'>
        <h1 className='text-5xl font-extrabold mb-2 text-violet-400 drop-shadow'>
          King's Academy
        </h1>
        <p className='mb-6 text-lg text-neutral-300'>
          Web RPG — Escola para sobrenaturais
        </p>

        <div className='flex gap-3 mb-4'>
          <button
            type='button'
            onClick={() => nav('/game')}
            className='px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow'
          >
            Jogar (Convidado)
          </button>
          {!user && (
            <>
              <button
                type='button'
                onClick={() => {
                  setShowLogin(true)
                  setShowRegister(false)
                }}
                className='px-5 py-3 rounded-xl border border-violet-700 text-violet-300 font-semibold hover:bg-violet-800'
              >
                Login
              </button>
              <button
                type='button'
                onClick={() => {
                  setShowRegister(true)
                  setShowLogin(false)
                }}
                className='px-5 py-3 rounded-xl border border-violet-700 text-violet-300 font-semibold hover:bg-violet-800'
              >
                Registrar
              </button>
            </>
          )}
          {user && (
            <span className='px-4 py-2 rounded-xl bg-neutral-700 text-violet-300'>
              Bem-vindo, {user.name || user.email}
            </span>
          )}
        </div>

        {showLogin && (
          <form
            onSubmit={handleLogin}
            className='bg-neutral-900/90 border border-violet-800 rounded-xl p-6 mb-6 flex flex-col gap-3 animate-fade-in'
          >
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
              {loading ? <Loader text='Entrando...' /> : 'Entrar'}
            </button>
            {error && (
              <div className='text-red-400 font-semibold mt-2'>{error}</div>
            )}
            <button
              type='button'
              onClick={() => setShowLogin(false)}
              className='text-neutral-400 mt-2 hover:underline'
            >
              Cancelar
            </button>
            <button
              type='button'
              onClick={() => {
                setShowLogin(false)
                setShowRegister(true)
              }}
              className='text-violet-400 mt-2 hover:underline'
            >
              Quero me registrar
            </button>
          </form>
        )}

        {showRegister && (
          <div className='mb-6'>
            <RegisterForm onSuccess={() => setShowRegister(false)} />
            <button
              type='button'
              onClick={() => setShowRegister(false)}
              className='text-neutral-400 mt-2 hover:underline'
            >
              Cancelar
            </button>
            <button
              type='button'
              onClick={() => {
                setShowRegister(false)
                setShowLogin(true)
              }}
              className='text-violet-400 mt-2 hover:underline'
            >
              Já tenho conta
            </button>
          </div>
        )}

        <section className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-base text-neutral-300'>
          <div className='bg-neutral-700/40 p-6 rounded-xl border border-violet-900 shadow'>
            <h3 className='font-bold text-violet-300'>Características</h3>
            <ul className='mt-3 list-disc list-inside'>
              <li>Criação de personagem</li>
              <li>Loop diário: aulas, eventos, escolhas</li>
              <li>Inventário, XP e afinidade</li>
            </ul>
          </div>
          <div className='bg-neutral-700/40 p-6 rounded-xl border border-violet-900 shadow'>
            <h3 className='font-bold text-violet-300'>Integração</h3>
            <p className='mt-3'>
              Conecta ao backend .NET via REST (endpoints:{' '}
              <code className='bg-neutral-800 px-2 py-1 rounded'>/auth</code>,{' '}
              <code className='bg-neutral-800 px-2 py-1 rounded'>/player</code>,{' '}
              <code className='bg-neutral-800 px-2 py-1 rounded'>/events</code>,{' '}
              <code className='bg-neutral-800 px-2 py-1 rounded'>
                /progress
              </code>
              ).
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
