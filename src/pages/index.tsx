import PropertiesPage from '@/components/page-components/properties/PropertiesPage';
import {AuthLayout} from '@/components/page_layout/AuthLayout';

function Home() {
  return <AuthLayout authPage InnerComponent={<PropertiesPage />} />;
}

export default Home;
