// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Home } from "./pages/Home";

export const router = createBrowserRouter(
    createRoutesFromElements(
      // Root Route: All navigation will start from here.
      <Route path="/" element={<Home />} errorElement={<h1>Not found!</h1>} >
        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      </Route>
    )
);