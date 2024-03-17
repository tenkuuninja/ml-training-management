import { MainLayout } from '@/common/layouts/MainLayout'
import { FileStorageListPage } from '@/modules/FileStorage/FileStorageListPage'

export default function Page() {
  return (
    <>
      <FileStorageListPage />
    </>
  )
}

Page.getLayout = (page: React.ReactNode) => {
  return <MainLayout>{page}</MainLayout>
}
