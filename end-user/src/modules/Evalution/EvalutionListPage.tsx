import { useBoolean } from '@/common/hooks/useBoolean'
import { FileApi } from '@/common/services'
import {
  Button,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsEye, BsPen, BsPlus, BsTrash } from 'react-icons/bs'
import { CreateOrUpdateEvaluationDialog } from './CreateOrUpdateEvaluationDialog'
import { DeleteEvaluationDialog } from './DeleteEvaluationDialog'
import { ViewEvaluationDialog } from './ViewEvaluationDialog'

export const EvaluationListPage = () => {
  const getFileRequest = useMutation({ mutationFn: FileApi.getListFile })
  const openCreateDialog = useBoolean()
  const [itemToShow, setItemToShow] = useState(null)
  const [itemToEdit, setItemToEdit] = useState(null)
  const [itemToDelete, setItemToDelete] = useState(null)

  const files: any[] = getFileRequest?.data || []

  const handleGetFileRequest = useCallback(() => {
    getFileRequest.mutateAsync({})
  }, [])

  useEffect(() => {
    handleGetFileRequest()
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[24px] font-bold">Training</span>
        <Button
          className="rounded-full"
          variant="contained"
          startIcon={<BsPlus />}
          onClick={openCreateDialog.setTrue}
        >
          Create
        </Button>
      </div>

      <TableContainer component={Paper} elevation={0} className="mt-[32px]">
        <Table size="medium" className="min-h-[400px] w-full border-spacing-0">
          <TableHead className="bg-[#01B5DC]">
            <TableRow>
              <TableCell className="font-bold text-white">#</TableCell>
              <TableCell className="font-bold text-white" align="right">
                Name
              </TableCell>
              <TableCell className="font-bold text-white" align="right">
                Labels
              </TableCell>
              <TableCell className="font-bold text-white" align="right"></TableCell>
            </TableRow>
          </TableHead>
          {!getFileRequest?.isPending && files?.length > 0 && (
            <TableBody>
              {files.map((row, i) => (
                <TableRow
                  key={i}
                  sx={(theme) => ({
                    '&:nth-of-type(odd)': {
                      backgroundColor: theme.palette.action.hover,
                    },
                    '&:last-child td, &:last-child th': {
                      border: 0,
                    },
                  })}
                >
                  <TableCell component="th" scope="row">
                    {row?.id}
                  </TableCell>
                  <TableCell align="right">{row?.name}</TableCell>
                  <TableCell align="right" className="line-clamp-1">
                    {row?.labels}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="info" onClick={() => setItemToShow(row)}>
                      <BsEye />
                    </IconButton>
                    <IconButton color="warning" onClick={() => setItemToEdit(row)}>
                      <AiOutlineEdit />
                    </IconButton>
                    <IconButton color="error" onClick={() => setItemToDelete(row)}>
                      <BsTrash />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
          {!getFileRequest?.isPending && files?.length === 0 && (
            <TableBody>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  colSpan={4}
                  className="text-center text-[60px] text-neutral-400"
                >
                  No Data
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          {getFileRequest?.isPending && (
            <TableBody>
              {[...new Array(10)]?.map((item, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row" colSpan={4} className="py-[4px]">
                    <div className="h-[32px] animate-pulse bg-neutral-100"></div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <div className="mt-[20px] flex justify-center">
        <Pagination />
      </div>

      <CreateOrUpdateEvaluationDialog
        open={openCreateDialog.value}
        onClose={openCreateDialog.setFalse}
        onSuccess={handleGetFileRequest}
      />

      <CreateOrUpdateEvaluationDialog
        open={!!itemToEdit}
        data={itemToEdit}
        isUpdate
        onClose={() => setItemToEdit(null)}
        onSuccess={handleGetFileRequest}
      />

      <DeleteEvaluationDialog
        open={!!itemToDelete}
        data={itemToDelete}
        onClose={() => setItemToDelete(null)}
        onSuccess={handleGetFileRequest}
      />

      <ViewEvaluationDialog
        open={!!itemToShow}
        data={itemToShow}
        onClose={() => setItemToShow(null)}
        onSuccess={handleGetFileRequest}
      />
    </div>
  )
}
