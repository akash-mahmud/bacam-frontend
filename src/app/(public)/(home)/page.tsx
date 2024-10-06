
import AnalyistSection from '@/components/home/AnalyistSection';
import FinancialAnalyist from '@/components/home/FinancialAnalyist';
import TopBikes from '@/components/home/top-bikes'
export default async function HomePage() {
  
  return (
    <div >
<TopBikes/>
<AnalyistSection/>
<FinancialAnalyist/>
    </div>
  );
}
