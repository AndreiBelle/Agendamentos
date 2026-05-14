import {toast} from 'react-toastify'

export const notifier = {
    success: (msg: string) => toast.success(msg, {position: "bottom-right"}),

    error: (msg: string) => toast.error(msg, {theme: "colored"})
}