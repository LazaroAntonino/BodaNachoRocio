// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Inspiracion } from "./pages/Inspiracion";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} errorElement={<h1>Not found!</h1>} />
      <Route path="/inspiracion" element={<Inspiracion />} />
    </>
  )
);