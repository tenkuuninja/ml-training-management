import { MainLayout } from '@/common/layouts/MainLayout'
import { TrainingListPage } from '@/modules/Traning/TrainingListPage'

export default function Page() {
  return (
    <>
      <TrainingListPage />
    </>
  )
}

Page.getLayout = (page: React.ReactNode) => {
  return <MainLayout>{page}</MainLayout>
}
