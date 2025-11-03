import { FormProvider, useForm } from 'react-hook-form'
import { useAuth } from '@/auth/AuthContext'
import type { LoginFormFields } from '@/types/LoginFormFields'
import type { LoginFormProps } from '../../types/LoginFormProps'
import { useToast } from '../ToastContext'
import { Button } from './Button'
import { Input } from './Input'

export function LoginForm({ onClickRegister, onClickGuest }: LoginFormProps) {
  const { login } = useAuth()
  const { showToast } = useToast()
  const methods = useForm<LoginFormFields>()
  const { handleSubmit, formState, reset } = methods

  async function onSubmit(data: LoginFormFields) {
    const ok = await login(data.email, data.password)

    if (!ok) {
      showToast('Falha ao entrar. Verifique seus dados.', 'error')
    } else {
      reset()
      showToast('Login realizado com sucesso!', 'success')
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-neutral-900/90 border border-violet-800 rounded-xl p-6 mb-6 flex flex-col gap-3 animate-fade-in'
      >
        <Input
          label='Email'
          type='email'
          name='email'
          autoComplete='email'
          rules={{
            required: 'Informe o e-mail',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Informe um e-mail válido',
            },
          }}
        />

        <Input
          label='Senha'
          type='password'
          name='password'
          autoComplete='current-password'
          rules={{ required: 'Informe a senha' }}
        />

        <Button
          isLoading={formState.isSubmitting}
          type='submit'
          text='Entrar'
          textLoader='Entrando...'
        />

        <Button
          type='button'
          onClick={onClickRegister}
          className='text-violet-400 mt-2 hover:underline cursor-pointer'
          text='Quero me registrar'
        />

        <Button
          type='button'
          onClick={onClickGuest}
          className='text-violet-400 mt-2 hover:underline cursor-pointer'
          text='Jogar como Convidado'
        />
      </form>
    </FormProvider>
  )
}
