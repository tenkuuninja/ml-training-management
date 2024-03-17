import { useAuth } from '@/common/hooks/useAuth'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { AiOutlineLogout } from 'react-icons/ai'

const ConfirmLogoutDialog = ({ open, onClose }: any) => {
  const { logout } = useAuth()

  const handleSubmit = async () => {
    logout()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Xác nhận đăng xuất</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Bạn có chắc muốn đăng xuất không??
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleSubmit}
          startIcon={<AiOutlineLogout />}
        >
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmLogoutDialog
