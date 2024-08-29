import toast from 'react-hot-toast'
import ErrorIcon from '@mui/icons-material/Error'

const getErrorMessages = errors => {
  if (errors?.response?.data?.errors) {
    return errors.response.data.errors
  }
  if (errors.response.data.message) {
    return [errors.response.data.message]
  }

  return ['حدث خطأ !']
}

export const ShowErrorToast = errors => {
  const errorMessages = getErrorMessages(errors)

  errorMessages.forEach(error => {
    toast.error(error, {
    
      style: {
        border: '1px solid #CE3446',
        padding: '16px',
        color: '#F2F4F8',
        background: '#CE3446',
        borderRadius: '8px',
        marginRight: '8px',
        justifyContent: 'right',
        width: '100%',
        animation: 'custom-exit 1s ease',
        boxShadow: '0px 4px 9px 0px rgba(0, 0, 0, 0.06)'
      },
      iconTheme: {
        primary: '#F2F4F8',
        secondary: '#CE3446'
      },
      className: 'custom-toast'
    })
  })
}
