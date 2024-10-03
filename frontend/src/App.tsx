import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AdDetailsPage from "./pages/AdDetailsPage";
import NewAdFormPage from "./pages/NewAdFormPage";
import NewCategoryFormPage from "./pages/NewCategoryFormPage";
import AdSearchPage from "./pages/AdSearchPage";
import AdSearchCategory from "./pages/AdSearchCategory";
// import AdSearchPage from "./pages/AdSearchPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="ad/new" element={<NewAdFormPage />} />
        <Route path="ad/search/:keyword" element={<AdSearchPage />} />
        <Route path="ad/:id" element={<AdDetailsPage />} />
        <Route path="category/:title" element={<AdSearchCategory/>} />
        <Route path="category/new" element={<NewCategoryFormPage />} />
      </Route>
    </Routes>
  );
}

export default App;
