'use client'
import { useCreateSave } from '@/hooks'
import { AlertError, Button, H1, Input, Loader, Panel } from '@/components'
import { useForm } from 'react-hook-form'
import { ROUTES } from '@/config'
import { useRouter } from 'next/router'
import { CreateSaveFormValues } from '@/interfaces'
import Head from 'next/head'

export default function SaveNew() {
  const router = useRouter()
  const createSave = useCreateSave()

  const { register, handleSubmit, formState } = useForm<CreateSaveFormValues>({
    defaultValues: { name: '', race: undefined },
  })
  const { errors, isSubmitting } = formState

  const onSubmit = async (data: CreateSaveFormValues) => {
    createSave.mutate(data, {
      onSuccess(id) {
        router.push(ROUTES.GAME(id))
      }
    })
  }

  return (<>
    <Head>
      <title>Novo Jogo</title>
    </Head>

    <Panel>
      <H1>Criar save</H1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input
          placeholder="Insira o nome aqui"
          {...register('name', { required: 'Nome é obrigatório' })}
          aria-invalid={errors.name ? 'true' : 'false'}
        >
          Nome do Personagem
        </Input>

        <Input
          placeholder="Insira a raça aqui"
          {...register('race', { required: 'Raça é obrigatório' })}
          aria-invalid={errors.name ? 'true' : 'false'}
        >
          Raça
        </Input>

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
  </>)
}
