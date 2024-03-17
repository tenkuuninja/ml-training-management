import { useEffect } from 'react'
import { IoMdClose } from 'react-icons/io'
import { twMerge } from 'tailwind-merge'

interface IDialogProps {
  open: boolean
  onClose: () => void
  className?: string
  children?: any
  hideCloseIcon?: boolean
}

const Dialog = (props: IDialogProps) => {
  const { open, onClose, className, hideCloseIcon = false, children } = props

  useEffect(() => {
    if (open) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }
  }, [open])

  return (
    <div
      className={`fixed left-0 top-0 z-[50] h-screen w-full overflow-y-auto bg-[#030303] bg-opacity-60 backdrop-blur-sm transition-all ${
        open ? `opacity-1` : `pointer-events-none opacity-0 `
      }`}
      onClick={() => onClose()}
    >
      <div className="flex min-h-screen items-center justify-center px-[12px] py-[10px]">
        <div
          className={twMerge(
            'relative mx-auto min-h-[200px] w-full rounded-[20px] bg-[#ffffff] p-[16px] shadow-md transition-all',
            className,
            open ? `scale-100` : `scale-[0.9]`,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {!hideCloseIcon ? (
            <div
              className="absolute right-[16px] top-[16px] flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full bg-neutral-200 transition-all hover:bg-neutral-300"
              onClick={() => onClose()}
            >
              <IoMdClose className="text-neutral-700 text-[18px]" />
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  )
}
export default Dialog
