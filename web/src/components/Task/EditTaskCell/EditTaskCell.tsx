import type { EditTaskById, UpdateTaskInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TaskForm from 'src/components/Task/TaskForm'

export const QUERY = gql`
  query EditTaskById($id: Int!) {
    task: task(id: $id) {
      id
      plannedAt
      workerId
      customerId
      siteId
      containerId
      materialId
      serviceId
      start
      end
      title
    }
  }
`
export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTaskMutation($id: Int!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      plannedAt
      workerId
      customerId
      siteId
      containerId
      materialId
      serviceId
      start
      end
      title
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ task }: CellSuccessProps<EditTaskById>) => {
  const [updateTask, { loading, error }] = useMutation(UPDATE_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('Task updated')
      navigate(routes.tasks())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: UpdateTaskInput, id: EditTaskById['task']['id']) => {
    updateTask({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Task {task?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <TaskForm task={task} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
