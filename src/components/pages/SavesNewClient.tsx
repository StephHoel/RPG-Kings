'use client'
import { useCreateSave } from '@/hooks'
import { AlertError, Button, H1, Input, Loader, Panel } from '@/components'
import { useForm } from 'react-hook-form'
import { ROUTES } from '@/config'
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
    <Panel>
      <H1>Criar save</H1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input
          children="Nome do Personagem"
          placeholder="Insira o nome aqui"
          {...register('name', { required: 'Nome é obrigatório' })}
          aria-invalid={errors.name ? 'true' : 'false'}
        />

        <AlertError mode={errors.name ? 'visible' : 'hidden'}>
          {errors.name?.message ?? 'Erro no nome'}
        </AlertError>

        <Button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting
            ? <Loader text='Criando...' />
            : 'Criar'
          }
        </Button>
      </form>
    </Panel>
  )
}
