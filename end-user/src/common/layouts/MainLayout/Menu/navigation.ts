import {
  AiOutlineBook,
  AiOutlineDashboard,
  AiOutlineKey,
  AiOutlinePoweroff,
  AiOutlineUser,
} from 'react-icons/ai'
import { BsPeople } from 'react-icons/bs'
import { SlGraduation } from 'react-icons/sl'
import { VscOpenPreview } from 'react-icons/vsc'

export const navigation = [
  {
    label: 'Management',
    children: [
      {
        label: 'File Storage',
        path: '/file-storage',
        icon: VscOpenPreview,
      },
      {
        label: 'Training',
        path: '/training',
        icon: VscOpenPreview,
      },
      {
        label: 'Evaluate',
        path: '/evaluate',
        icon: VscOpenPreview,
      },
    ],
  },
]
