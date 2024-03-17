import Dialog from '@/common/components/Dialog'
import {
  FormProvider, RHFTextField
} from '@/common/components/MuiHookForm'
import { useBoolean } from '@/common/hooks/useBoolean'
import { FileApi } from '@/common/services'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BsPlus } from 'react-icons/bs'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

interface ICreateOrUpdateFileProps {
  open: boolean
  data?: any
  isUpdate?: boolean
  onClose: VoidFunction
  onSuccess?: VoidFunction
}

const validationSchema = Yup.object({
  name: Yup.string().trim().required('Token address is required'),
})

const defaultValue = {
  name: '',
  file: '' as any,
}

export const CreateOrUpdateFile: FC<ICreateOrUpdateFileProps> = (props) => {
  const { open, data, isUpdate, onClose, onSuccess } = props
  const drag = useBoolean()

  const form = useForm({
    defaultValues: defaultValue,
    resolver: yupResolver(validationSchema) as any,
  })
  const values = form.watch()
  const { errors, isSubmitting } = form.formState

  console.log('CreateOrUpdateFile', values, errors)

  const handleSubmit = async ({ ...values }: typeof defaultValue) => {
    try {
      if (isUpdate) {
        await FileApi.updateFile(values)
      } else {
        await FileApi.uploadFile(values)
      }
      onClose()
      onSuccess && onSuccess()
      toast.success((isUpdate ? 'Update' : 'Create') + ' file successful')
    } catch (error) {
      toast.error((isUpdate ? 'Update' : 'Create') + ' file failed')
      console.error('handleSubmit', error)
    }
  }

  const handleDrag = function (e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      drag.setTrue()
    } else if (e.type === 'dragleave') {
      drag.setFalse()
    }
  }

  const handleDrop = async function (e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    drag.setFalse()

    const files = Object.values(e?.dataTransfer?.files)?.filter((file) =>
      file?.type?.includes('text/csv'),
    )
    const file = files?.[0]
    if (!file) {
      return
    }
    form.setValue('file', file)
  }

  const handleUpload = async function (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    e.stopPropagation()
    drag.setFalse()

    const files = Object.values(e?.target.files)?.filter((file) =>
      file?.type?.includes('text/csv'),
    )
    const file = files?.[0]
    if (!file) {
      return
    }
    form.setValue('file', file)
    e.target.value = ''
  }

  useEffect(() => {
    if (open) {
      if (!isUpdate) {
        form.reset()
      } else {
        form.reset(data)
      }
    }
  }, [open, isUpdate, data])

  return (
    <Dialog open={open} onClose={onClose} className="max-w-[640px] p-0 pb-[30px]">
      <FormProvider methods={form} onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogTitle className="font-bold">
          {isUpdate ? 'Update' : 'Upload'} File
        </DialogTitle>
        <DialogContent>
          <div className="space-y-[12px]">
            <p className="text-[#60666C]">
              File name <span className="text-red-600">*</span>
            </p>
            <RHFTextField
              name="name"
              placeholder="Enter file name"
              sx={{
                '.MuiInputBase-root': { backgroundColor: '#f7f6f2' },
                fieldset: { border: 'none' },
              }}
            />
          </div>
          <div className="mt-[24px] space-y-[12px]">
            <p className="text-[#60666C]">
              File upload <span className="text-red-600">*</span>
            </p>
            {!data?.link && !isUpdate && (
              <label
                htmlFor="upload-font-side"
                className={
                  'relative mt-2 flex h-[300px] cursor-pointer flex-col items-center justify-center rounded-[16px] border border-dashed p-2 transition-all' +
                  ` ${drag.value ? 'border-[#777]' : 'border-[#ddd]'}`
                }
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="upload-font-side"
                  hidden
                  onChange={handleUpload}
                  accept=".csv"
                />
                <p className="text-[40px] font-bold text-[#01B5DC]">Upload file</p>
                <p className="mt-[24px] text-[18px] text-black/50">
                  Drag and drop the .csv file here
                </p>
                <p className="mt-[8px] text-[18px] text-black/50">
                  or choose from your device
                </p>
                {!!values?.file && (
                  <p className="mt-[8px] text-[18px] text-black/50">
                    File selected:{' '}
                    <span className="text-[#01B5DC] underline">{values?.file?.name}</span>
                  </p>
                )}
                <p></p>
              </label>
            )}
            {!!data?.fileName && <p>{data?.fileName}</p>}
          </div>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            variant="contained"
            className="rounded-[12px]"
            startIcon={<BsPlus />}
          >
            Create
          </LoadingButton>
          <LoadingButton
            loading={isSubmitting}
            type="button"
            className="rounded-[12px]"
            onClick={onClose}
          >
            Close
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  )
}
