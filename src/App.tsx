import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}

export default App;
