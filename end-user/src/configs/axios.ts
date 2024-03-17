import axios from 'axios'
import { API_URL } from './app'
import { toast } from 'react-toastify'

const axiosConfigs = {
  baseURL: API_URL ?? '',
  timeout: 5000000,
}

const instance = axios.create(axiosConfigs)

instance.interceptors.response.use(
  (response) => {
    // console.log(response?.config?.url, response?.data)
    return response
  },
  (error) => {
    const hideErrorMessage = error?.config?.headers?.hideErrorMessage === 'true'

    const response = error?.response?.data
    const status = error?.response?.status

    const errorObject = {
      code: error?.code,
      message: error?.message,
      name: error?.name,
      response: response,
    }

    if (axios.isCancel(error)) {
      throw errorObject
    }

    if (status >= 400 && status < 500 && !hideErrorMessage) {
      if (Array.isArray(response?.message) && response?.message?.length > 0) {
        toast.error(response?.message?.["0"]);
      } else if (!!response?.message) {
        toast.error(response?.message);
      }
    }
    throw errorObject
  },
)

export default instance
