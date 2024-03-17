import { AiOutlineSetting } from 'react-icons/ai'
import { BsFile } from 'react-icons/bs'
import { VscOpenPreview } from 'react-icons/vsc'

export const navigation = [
  {
    label: 'Management',
    children: [
      {
        label: 'File Storage',
        path: '/file-storage',
        icon: BsFile,
      },
      {
        label: 'Training',
        path: '/training',
        icon: AiOutlineSetting,
      },
      {
        label: 'Evaluate',
        path: '/evaluate',
        icon: VscOpenPreview,
      },
    ],
  },
]
