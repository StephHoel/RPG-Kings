'use client'
import { useCreateSave } from '@/hooks'
import { Button } from '@/components'
import { useForm } from 'react-hook-form'
import { ROUTES } from '@/config/routes'
import { useRouter } from 'next/navigation'
import { CreateSaveFormValues } from '@/interfaces'

export default function SavesNewClient() {
  const router = useRouter()
  const createSave = useCreateSave()
  const { register, handleSubmit, formState } = useForm<CreateSaveFormValues>({
    defaultValues: { name: '' },
  })
  const { errors, isSubmitting } = formState

  const onSubmit = async (data: CreateSaveFormValues) => {
    createSave.mutate(data.name, {
      onSuccess(id) {
        router.push(ROUTES.GAME(id))
      }
    })
  }

  return (
    <div className="mx-auto max-w-xl p-4 space-y-3">
      <h1 className="text-lg font-semibold">
        Criar save
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          className="border rounded px-3 py-2 w-full"
          placeholder="Nome do personagem"
          {...register('name', { required: 'Nome é obrigatório' })}
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name && (
          <p className="text-sm text-red-400" role="alert">{errors.name.message}</p>
        )}

        <Button
          type="submit"
          className="border rounded-lg px-4 py-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Criando...' : 'Criar'}
        </Button>
      </form>
    </div>
  )
}
