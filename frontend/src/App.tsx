import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AdDetailsPage from "./pages/AdDetailsPage";
import NewAdFormPage from "./pages/NewAdFormPage";
import NewCategoryFormPage from "./pages/NewCategoryFormPage";
import AdsByCategoryPage from "./pages/AdsByCategoryPage";
import { ToastContainer } from "react-toastify"; // Import du ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import des styles de Toastify
import AdUpdatePage from "./pages/AdUpdatePage";
import AdsByTitlePage from "./pages/AdSearchPage";
import AdSearchPage from "./pages/AdSearchPage";
import SingleFileUploader from "./pages/TestFileUpload";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="ad/new" element={<NewAdFormPage />} />
          <Route path="ad/:id" element={<AdDetailsPage />} />
          <Route path="ad/search/:title" element={<AdSearchPage />} />
          <Route path="ad/update/:id" element={<AdUpdatePage />} />
          <Route path="ad/search" element={<AdsByTitlePage />} />

          {/* routes unused */}
          <Route path="ad/category/:keyword" element={<AdsByCategoryPage />} />
          {/* <Route path="ad/edit/:id" element={<EditAd />} /> */}
          <Route path="category/new" element={<NewCategoryFormPage />} />

          <Route path="testimg" element={<SingleFileUploader />} />
        </Route>
      </Routes>
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
