import { MainLayout } from '@/common/layouts/MainLayout'
import { EvaluationListPage } from '@/modules/Evalution/EvalutionListPage'

export default function Page() {
  return (
    <>
      <EvaluationListPage />
    </>
  )
}

Page.getLayout = (page: React.ReactNode) => {
  return <MainLayout>{page}</MainLayout>
}
