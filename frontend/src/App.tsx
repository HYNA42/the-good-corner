import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AdDetailsPage from "./pages/AdDetailsPage";
import NewAdFormPage from "./pages/NewAdFormPage";
import NewCategoryFormPage from "./pages/NewCategoryFormPage";
import AdSearchPage from "./pages/AdSearchPage";
import AdsByCategoryPage from "./pages/AdsByCategoryPage";
import EditAd from "./pages/EditAd";
import { ToastContainer } from "react-toastify"; // Import du ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import des styles de Toastify
import AdUpdatePage from "./pages/AdUpdatePage";
// import AdSearchPage from "./pages/AdSearchPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="ad/new" element={<NewAdFormPage />} />
          <Route path="ad/:id" element={<AdDetailsPage />} />
          <Route path="ad/search/:keyword" element={<AdSearchPage />} />
          <Route path="ad/update/:id" element={<AdUpdatePage/>} />

          {/* routes unused */}
          <Route path="ad/category/:keyword" element={<AdsByCategoryPage />} />
          {/* <Route path="ad/edit/:id" element={<EditAd />} /> */}
          <Route path="category/new" element={<NewCategoryFormPage />} />
        </Route>
      </Routes>
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
