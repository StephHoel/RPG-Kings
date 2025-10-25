import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/auth/AuthContext'
import { LoginForm } from '@/components/form/LoginForm'
import { RegisterForm } from '@/components/RegisterForm'

export function Home() {
  const nav = useNavigate()
  const { user, token, loading } = useAuth()
  const [showLogin, setShowLogin] = useState(true)
  const [redirecting, setRedirecting] = useState(false)

  // useEffect(() => {
  //   if (!loading && user && token) {
  //     setRedirecting(true)
  //     nav('/game', { replace: true })
  //   }
  // }, [loading, user, token, nav])

  // if (redirecting) return null

  return (
    <div className='bg-gradient-to-br from-neutral-900 via-violet-950 to-neutral-800 flex items-center justify-center p-6'>
      <div className='w-full max-w-3xl bg-neutral-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-violet-900'>
        <h1 className='text-5xl font-extrabold mb-2 text-violet-400 drop-shadow'>
          King's Academy
        </h1>
        <p className='mb-6 text-lg text-neutral-300'>
          Web RPG — Escola para sobrenaturais
        </p>

        {showLogin ? (
          <LoginForm
            onClickRegister={() => setShowLogin(false)}
            onClickGuest={() => nav('/game/guest')}
          />
        ) : (
          <RegisterForm onClickLogin={() => setShowLogin(true)} />
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
              <code className='bg-neutral-800 px-2 py-1 rounded'>/progress</code>
              ).
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
