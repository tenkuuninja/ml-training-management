import { useBoolean } from '@/common/hooks/useBoolean'
import { LoadingButton } from '@mui/lab'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { readRemoteFile } from 'react-papaparse'
import * as Yup from 'yup'

interface IViewFileDialogProps {
  open: boolean
  data?: any
  onClose: VoidFunction
  onSuccess?: VoidFunction
}

export const ViewFileDialog: FC<IViewFileDialogProps> = (props) => {
  const { open, data, onClose, onSuccess } = props
  const [csvData, setCsvData] = useState(null)
  const loading = useBoolean(true)

  const grid = csvData?.data || []

  // console.log('grid', grid)

  useEffect(() => {
    if (data?.link) {
      loading.setTrue()
      try {
        readRemoteFile(data?.link, {
          complete: (results: any) => {
            setCsvData(results)
            loading.setFalse()
          },
          download: true,
        })
      } catch (error) {
        loading.setFalse()
      }
    }
  }, [data?.link])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xl"
      scroll="paper"
      PaperProps={{
        className: 'rounded-[16px]',
      }}
    >
      <DialogTitle className="font-bold">View File</DialogTitle>
      <DialogContent>
        <div className="space-y-[12px]">
          {data ? (
            <TableContainer
              component={Paper}
              elevation={0}
              className="mt-[32px] h-[60vh] overflow-auto"
            >
              <Table size="small" className="">
                {grid?.map((row: any, i: number) => (
                  <TableRow
                    sx={(theme) => ({
                      '&:nth-of-type(odd)': {
                        backgroundColor: theme.palette.action.hover,
                      },
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    })}
                    key={i}
                  >
                    {row?.map((cols: any, j: number) => (
                      <TableCell
                        component="th"
                        scope="row"
                        key={j}
                        className="whitespace-nowrap"
                      >
                        {cols}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </Table>
            </TableContainer>
          ) : (
            <div className="loader">Loading...</div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <LoadingButton type="button" className="rounded-[12px]" onClick={onClose}>
          Close
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
