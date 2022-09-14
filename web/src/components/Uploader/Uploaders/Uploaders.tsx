import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Uploader/UploadersCell'

const DELETE_UPLOADER_MUTATION = gql`
  mutation DeleteUploaderMutation($id: Int!) {
    deleteUploader(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const UploadersList = ({ uploaders }) => {
  const [deleteUploader] = useMutation(DELETE_UPLOADER_MUTATION, {
    onCompleted: () => {
      toast.success('Uploader deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete uploader ' + id + '?')) {
      deleteUploader({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Type</th>
            <th>Size</th>
            <th>Extension</th>
            <th>Path</th>
            <th>Url</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {uploaders.map((uploader) => (
            <tr key={uploader.id}>
              <td>{truncate(uploader.id)}</td>
              <td>{truncate(uploader.name)}</td>
              <td>{truncate(uploader.type)}</td>
              <td>{truncate(uploader.size)}</td>
              <td>{truncate(uploader.extension)}</td>
              <td>{truncate(uploader.path)}</td>
              <td>{truncate(uploader.url)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.uploader({ id: uploader.id })}
                    title={'Show uploader ' + uploader.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editUploader({ id: uploader.id })}
                    title={'Edit uploader ' + uploader.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete uploader ' + uploader.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(uploader.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UploadersList
