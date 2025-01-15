import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import AdDetailsPage from "./pages/AdDetailsPage";
import NewCategoryFormPage from "./pages/NewCategoryFormPage";
import AdsByCategoryPage from "./pages/AdsByCategoryPage";
import { ToastContainer } from "react-toastify"; // Import du ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import des styles de Toastify
import AdUpdatePage from "./pages/AdUpdatePage";
// import AdsByTitlePage from "./pages/AdSearchPage";
import SingleFileUploader from "./pages/TestFileUpload";
import AdsByTitlePage from "./pages/AdSearchPage";
import NewAdFormPage from "./pages/NewAdFormPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="ad/new" element={<NewAdFormPage />} />
          <Route path="ad/:id" element={<AdDetailsPage />} />

          <Route path="ad/update/:id" element={<AdUpdatePage />} />
          <Route path="ad/search" element={<AdsByTitlePage />} />

          {/* routes unused */}
          <Route path="ad/category/:keyword" element={<AdsByCategoryPage />} />

          <Route path="category/new" element={<NewCategoryFormPage />} />

          {/* composant test update image */}
          <Route path="testimg" element={<SingleFileUploader />} />

          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />


        </Route>
      </Routes>
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
