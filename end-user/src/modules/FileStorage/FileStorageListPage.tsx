import { useBoolean } from '@/common/hooks/useBoolean'
import { FileApi } from '@/common/services'
import {
  Button,
  IconButton,
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
import { CreateOrUpdateFile } from './CreateOrUpdateFile'
import { ViewFileDialog } from './ViewFileDialog'

export const FileStorageListPage = () => {
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
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
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
                  {1}
                </TableCell>
                <TableCell align="right">32132</TableCell>
                <TableCell align="right">321321</TableCell>
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
        </Table>
      </TableContainer>

      <CreateOrUpdateFile
        open={openCreateDialog.value}
        onClose={openCreateDialog.setFalse}
        onSuccess={handleGetFileRequest}
      />

      <CreateOrUpdateFile
        open={!!itemToEdit}
        data={itemToEdit}
        isUpdate
        onClose={() => setItemToEdit(null)}
        onSuccess={handleGetFileRequest}
      />

      <ViewFileDialog
        open={!!itemToShow}
        data={itemToShow}
        onClose={() => setItemToShow(null)}
        onSuccess={handleGetFileRequest}
      />
    </div>
  )
}
