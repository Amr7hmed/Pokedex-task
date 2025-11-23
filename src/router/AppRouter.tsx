import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PaginationPage from "@/pages/PaginationPage";
import LoadMorePage from "@/pages/LoadMorePage";
import PokemonDetailsPage from "@/pages/PokemonDetailsPage";
import NotFoundPage from "@/pages/NotFoundPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<PaginationPage />} />
          <Route path="/load-more" element={<LoadMorePage />} />
          <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;
