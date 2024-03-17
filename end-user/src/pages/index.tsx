import { MainLayout } from '@/common/layouts/MainLayout'

export default function Page() {
  return <></>
}

Page.getLayout = (page: React.ReactNode) => {
  return <MainLayout>{page}</MainLayout>
}
