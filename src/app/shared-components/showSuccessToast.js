// toastUtils.js
import toast from 'react-hot-toast'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export const ShowSuccessToast = (message, ErrorMessageApi) => {
  toast.error(message, {
 
    style: {
      border: '1px solid #73A3D0',
      padding: '16px',
      color: '#F2F4F8',
      background: '#679267',
      borderRadius: '8px',
      marginRight: '8px',
      justifyContent: 'right',
      width: '100%',
      animation: 'custom-exit 1s ease',
      boxShadow: '0px 4px 9px 0px rgba(0, 0, 0, 0.06)'
    },
    iconTheme: {
      primary: '#F2F4F8',
      secondary: '#73A3D0'
    },
    className: 'custom-toast'
  })
}
