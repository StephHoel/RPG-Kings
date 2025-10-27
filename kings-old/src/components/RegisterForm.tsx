import { FormProvider, useForm } from 'react-hook-form'
import type { RegisterFormFields } from '@/types/RegisterFormFields'
import type { RegisterFormProps } from '@/types/RegisterFormProps'
import { useAuth } from '../auth/AuthContext'
import { Button } from './form/Button'
import { Input } from './form/Input'
import { useToast } from './ToastContext'

export function RegisterForm({ onClickLogin }: RegisterFormProps) {
  const { register } = useAuth()
  const { showToast } = useToast()
  const methods = useForm<RegisterFormFields>()
  const { handleSubmit, formState, reset } = methods

  async function onSubmit(data: RegisterFormFields) {
    const ok = await register(data.name, data.email, data.password)

    if (!ok) {
      showToast('Falha ao registrar. Verifique seus dados.', 'error')
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
          label='Nome'
          type='text'
          name='name'
          autoComplete='name'
          rules={{
            required: 'Informe seu nome',
            pattern: {
              value: /^(?=(?:.*[a-zA-Z]){2,}).+$/,
              message: 'Informe um nome com pelo menos 2 letras',
            },
          }}
        />

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
          autoComplete='off'
          rules={{ required: 'Informe a senha' }}
        />

        <Button
          isLoading={formState.isSubmitting}
          type='submit'
          text='Registrar'
          textLoader='Registrando...'
        />

        <Button
          type='button'
          onClick={onClickLogin}
          className='text-violet-400 mt-2 hover:underline cursor-pointer'
          text='Já tenho conta'
        />
      </form>
    </FormProvider>
  )
}
