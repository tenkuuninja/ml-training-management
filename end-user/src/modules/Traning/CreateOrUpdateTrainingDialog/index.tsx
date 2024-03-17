import Dialog from '@/common/components/Dialog'
import { FormProvider, RHFTextField } from '@/common/components/MuiHookForm'
import { useBoolean } from '@/common/hooks/useBoolean'
import { FileApi, TrainingApi } from '@/common/services'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import {
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormHelperText,
  MenuItem,
} from '@mui/material'
import { FC, useEffect, useMemo } from 'react'
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
  name: Yup.string().trim().required('Name is required'),
  fileTrain: Yup.string().trim().required('File train is required'),
  fileTest: Yup.string().trim().required('File test is required'),
  featureLabels: Yup.array().min(2, 'Feature labels must least 2 labels'),
  targetLabel: Yup.string().trim().required('Target label is required'),
})

const defaultValue = {
  name: '',
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

  const labels: string[] = useMemo(() => {
    if (!values?.fileTrain || !values?.fileTest) {
      return []
    }
    const fileTrainSelectLabels = files
      ?.find((item) => item?.link === values?.fileTrain)
      ?.labels?.split(';')
      ?.filter((item: any) => item)
    const fileTestSelectLabels = files
      ?.find((item) => item?.link === values?.fileTest)
      ?.labels?.split(';')
      ?.filter((item: any) => item)

    const map: any = {}
    const labels: string[] = []
    for (const file of fileTrainSelectLabels) {
      map[file] = true
    }
    for (const file of fileTestSelectLabels) {
      if (map[file]) {
        labels.push(file)
      }
    }

    return labels
  }, [files?.length, values?.fileTrain, values?.fileTest])

  const availableFeatureLabels: string[] = useMemo(() => {
    form.setValue('featureLabels', [])
    if (!values?.targetLabel) {
      return []
    }

    return labels?.filter((item: any) => item !== values?.targetLabel)
  }, [labels, values?.targetLabel])

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

  const handlePageItemsChange = (checked: boolean, value: string) => {
    let items: string[] = []
    if (Array.isArray(values?.featureLabels)) {
      items = values?.featureLabels?.filter?.((item: any) => item !== value)
    }
    if (checked) {
      form.setValue('featureLabels', [...items, value], { shouldDirty: true })
    } else {
      form.setValue('featureLabels', [...items], { shouldDirty: true })
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
              disabled={isUpdate}
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
              name="fileTrain"
              disabled={isUpdate}
              placeholder="Enter file name"
              select
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
              name="fileTest"
              disabled={isUpdate}
              placeholder="Enter file name"
              select
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
              name="targetLabel"
              disabled={isUpdate}
              placeholder="Enter file name"
              select
              sx={{
                '.MuiInputBase-root': { backgroundColor: '#f7f6f2' },
                fieldset: { border: 'none' },
              }}
            >
              {labels?.map((item, i) => (
                <MenuItem value={item} key={i}>
                  {item}
                </MenuItem>
              ))}
            </RHFTextField>
          </div>
          <div className="space-y-[12px]">
            <p className="text-[#60666C]">
              Feature labels <span className="text-red-600">*</span>
            </p>
            {availableFeatureLabels?.map((item, i) => (
              <FormControlLabel
                key={i}
                disabled={isUpdate}
                control={
                  <Checkbox
                    checked={!!values?.featureLabels?.includes?.(item)}
                    onChange={(e, checked) => handlePageItemsChange(checked, item)}
                  />
                }
                label={item}
                className="flex"
              />
            ))}
            {errors?.featureLabels?.message && (
              <FormHelperText error>{errors?.featureLabels?.message}</FormHelperText>
            )}
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
