'use client'
import Head from 'next/head'
import { useCreateSave } from '@/ui/hooks'
import { Button, H1, Select, Input, Loader, Panel } from '@/ui/components'
import { useForm } from 'react-hook-form'
import { ROUTES, routeWithSaveId } from '@/domain/routes'
import { useRouter } from 'next/router'
import { CreateSaveFormValues } from '@/domain/types'
import { toast } from 'sonner'
import { TOAST_MESSAGES } from '@/domain/constants'
import { RACE_ENUM } from '@/domain/constants'

export default function SaveNew() {
  const router = useRouter()
  const createSave = useCreateSave()

  const { register, handleSubmit, formState } = useForm<CreateSaveFormValues>({
    defaultValues: { name: '', race: '' },
  })
  const { errors, isSubmitting } = formState

  const onSubmit = async (data: CreateSaveFormValues) => {
    try {
      const result = await createSave.mutateAsync(data)

      if (!result?.save?.id) {
        toast.error(TOAST_MESSAGES.game.error.new({ method: 'SavesNew' }))
        return
      }

      router.push(routeWithSaveId(ROUTES.GAME, result.save.id))
    } catch (err) {
      toast.error(TOAST_MESSAGES.game.error.create({ method: 'SavesNew' }))
      console.error(err)
    }
  }

  return (
    <>
      <Head>
        <title>Novo Jogo — King's Academy</title>
      </Head>

      <Panel>
        <H1>Criar save</H1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input
            placeholder="Insira o nome aqui"
            {...register('name', { required: 'Nome é obrigatório' })}
            aria-invalid={errors.name ? 'true' : 'false'}
            error={errors.name?.message}
          >
            Nome do Personagem
          </Input>

          <Select
            {...register('race', { required: 'Raça é obrigatório' })}
            aria-invalid={errors.race ? 'true' : 'false'}
            error={errors.race?.message}
            placeholder="Selecione a raça"
            options={Object.entries(RACE_ENUM).map(([value, label]) => ({ value, label }))}
          >
            Raça
          </Select>

          <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
            {isSubmitting ? <Loader text="Criando..." /> : 'Criar'}
          </Button>
        </form>
      </Panel>
    </>
  )
}
