import Dialog from '@/common/components/Dialog'
import { FormProvider, RHFTextField } from '@/common/components/MuiHookForm'
import { useBoolean } from '@/common/hooks/useBoolean'
import { FileApi } from '@/common/services'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BsPlus, BsTrash } from 'react-icons/bs'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

interface IDeleteEvaluationDialogProps {
  open: boolean
  data?: any
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

export const DeleteEvaluationDialog: FC<IDeleteEvaluationDialogProps> = (props) => {
  const { open, data, onClose, onSuccess } = props
  const loading = useBoolean()

  const handleSubmit = async () => {
    loading.setTrue()
    try {
      await FileApi.deleteFile(data?.id)
      onClose()
      onSuccess && onSuccess()
      toast.success('Delete file successful')
    } catch (error) {
      toast.error('Delete file failed')
      console.error('handleSubmit', error)
    }
    loading.setFalse()
  }

  return (
    <Dialog open={open} onClose={onClose} className="max-w-[640px] p-0 pb-[30px]">
      <DialogTitle className="font-bold">Delete File</DialogTitle>
      <DialogContent>
        <p>
          Do you want delete this file?
          <br />
          All related Evaluate are also removed
        </p>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={loading.value}
          type="submit"
          variant="contained"
          color="error"
          className="rounded-[12px]"
          startIcon={<BsTrash />}
          onClick={handleSubmit}
        >
          Delete
        </LoadingButton>
        <LoadingButton
          loading={loading.value}
          type="button"
          className="rounded-[12px]"
          onClick={onClose}
        >
          Close
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
