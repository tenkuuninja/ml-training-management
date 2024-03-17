import instance from '@/configs/axios'
import { toFormData } from '@/common/utils/object'

export class FileApi {
  static getListFile = async (payload: Record<string, any>) => {
    const params = { ...payload }
    const path = '/CSV'
    const res = await instance.get(path, { params })
    return res?.data
  }

  static getSingleFile = async (_id: string) => {
    const params = { _id: _id }
    const path = '/CSV/' + _id
    const res = await instance.get(path, { params })
    return res?.data
  }

  static updateFile = async (payload: Record<string, any>) => {
    const path = '/CSV/' + payload?.id
    const formData = toFormData(payload)
    const res = await instance.put(path, formData)
    return res?.data
  }

  static deleteFile = async (_id: string) => {
    const params = { _id: _id }
    const path = '/CSV/' + _id
    const res = await instance.delete(path, { params })
    return res?.data
  }

  static uploadFile = async (payload: Record<string, any>) => {
    const formData = toFormData(payload)
    const path = '/upload'
    const res = await instance.post(path, formData)
    return res?.data
  }
}
