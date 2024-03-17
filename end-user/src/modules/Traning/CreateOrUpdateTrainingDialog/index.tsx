import Dialog from '@/common/components/Dialog'
import { FormProvider, RHFTextField } from '@/common/components/MuiHookForm'
import { useBoolean } from '@/common/hooks/useBoolean'
import { FileApi, TrainingApi } from '@/common/services'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BsPlus } from 'react-icons/bs'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

interface ICreateOrUpdateTrainingDialogProps {
  open: boolean
  data?: any
  isUpdate?: boolean
  files: any[]
  onClose: VoidFunction
  onSuccess?: VoidFunction
}

const validationSchema = Yup.object({
  name: Yup.string().trim().required('Token address is required'),
})

const defaultValue = {
  fileTrain: '',
  fileTest: '',
  featureLabels: [] as string[],
  targetLabel: '',
}

export const CreateOrUpdateTrainingDialog: FC<ICreateOrUpdateTrainingDialogProps> = (
  props,
) => {
  const { open, data, isUpdate, files, onClose, onSuccess } = props
  const drag = useBoolean()

  const form = useForm({
    defaultValues: defaultValue,
    resolver: yupResolver(validationSchema) as any,
  })
  const values = form.watch()
  const { errors, isSubmitting } = form.formState

  console.log('CreateOrUpdateTrainingDialog', values, errors)

  const handleSubmit = async ({ ...values }: typeof defaultValue) => {
    try {
      if (isUpdate) {
        await TrainingApi.updateTraining(values)
      } else {
        await TrainingApi.createTraining(values)
      }
      onClose()
      onSuccess && onSuccess()
      toast.success((isUpdate ? 'Update' : 'Create') + ' file successful')
    } catch (error) {
      toast.error((isUpdate ? 'Update' : 'Create') + ' file failed')
      console.error('handleSubmit', error)
    }
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
          {isUpdate ? 'Update' : 'Create'} training
        </DialogTitle>
        <DialogContent className="space-y-[20px]">
          <div className="space-y-[12px]">
            <p className="text-[#60666C]">
              Model name <span className="text-red-600">*</span>
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
          <div className="space-y-[12px]">
            <p className="text-[#60666C]">
              File train <span className="text-red-600">*</span>
            </p>
            <RHFTextField
              name="name"
              placeholder="Enter file name"
              sx={{
                '.MuiInputBase-root': { backgroundColor: '#f7f6f2' },
                fieldset: { border: 'none' },
              }}
            >
              {files?.map((item, i) => (
                <MenuItem value={item?.link} key={i}>
                  {item?.name} ({item?.fileName})
                </MenuItem>
              ))}
            </RHFTextField>
          </div>
          <div className="space-y-[12px]">
            <p className="text-[#60666C]">
              File test <span className="text-red-600">*</span>
            </p>
            <RHFTextField
              name="name"
              placeholder="Enter file name"
              sx={{
                '.MuiInputBase-root': { backgroundColor: '#f7f6f2' },
                fieldset: { border: 'none' },
              }}
            >
              {files?.map((item, i) => (
                <MenuItem value={item?.link} key={i}>
                  {item?.name} ({item?.fileName})
                </MenuItem>
              ))}
            </RHFTextField>
          </div>
          <div className="space-y-[12px]">
            <p className="text-[#60666C]">
              Result label <span className="text-red-600">*</span>
            </p>
            <RHFTextField
              name="name"
              placeholder="Enter file name"
              sx={{
                '.MuiInputBase-root': { backgroundColor: '#f7f6f2' },
                fieldset: { border: 'none' },
              }}
            >
              {files?.map((item, i) => (
                <MenuItem value={item?.link} key={i}>
                  {item?.name} ({item?.fileName})
                </MenuItem>
              ))}
            </RHFTextField>
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
