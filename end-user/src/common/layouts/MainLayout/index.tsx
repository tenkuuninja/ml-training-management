import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AdminHeader from './Header'
import Menu from './Menu'

interface IMainLayout {
  children: React.ReactNode
}

export const MainLayout = (props: IMainLayout) => {
  const { children } = props
  const [isOpenMenu, setOpenMenu] = useState(false)
  const { pathname } = useRouter()

  useEffect(() => {
    setOpenMenu(false)
  }, [pathname])

  return (
    <div className="min-h-screen bg-black bg-opacity-[0.03] text-neutral-800">
      <AdminHeader toggleMenu={() => setOpenMenu(!isOpenMenu)} />
      <div className="fixed left-0 top-[72px] hidden h-[calc(100vh-72px)] w-[240px] max-w-[80vw] lg:block">
        <Menu />
      </div>
      <div className="p-4 lg:ml-[240px]">{children}</div>
      <div
        className={
          'fixed inset-0 bg-black bg-opacity-20 transition-all' +
          ` ${isOpenMenu ? '' : 'pointer-events-none opacity-0'}`
        }
        onClick={() => setOpenMenu(false)}
      ></div>
      <div
        className={
          'fixed left-0 top-0 block h-screen w-[240px] max-w-[80vw] transition-all lg:hidden' +
          ` ${isOpenMenu ? '' : '-translate-x-full'}`
        }
      >
        <Menu />
      </div>
    </div>
  )
}
