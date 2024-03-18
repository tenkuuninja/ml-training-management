import instance from '@/configs/axios'
import { toFormData } from '@/common/utils/object'

export class TrainingApi {
  static getListTraining = async (payload: Record<string, any>) => {
    const params = { ...payload }
    const path = '/training'
    const res = await instance.get(path, { params })
    return res?.data
  }

  static getSingleTraining = async (_id: string) => {
    const params = { _id: _id }
    const path = '/training/' + _id
    const res = await instance.get(path, { params })
    return res?.data
  }

  static createTraining = async (payload: Record<string, any>) => {
    const path = '/training/'
    const formData = toFormData(payload)
    const res = await instance.post(path, payload)
    return res?.data
  }

  static updateTraining = async (payload: Record<string, any>) => {
    const path = '/training/' + payload?.id
    const formData = toFormData(payload)
    const res = await instance.put(path, formData)
    return res?.data
  }

  static deleteTraining = async (_id: string) => {
    const params = { _id: _id }
    const path = '/training/' + _id
    const res = await instance.delete(path, { params })
    return res?.data
  }
}
