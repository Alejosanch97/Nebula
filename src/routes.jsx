import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Post } from "./pages/Post";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<NotFound />} >
        <Route path="/" element={<Home />} />
        <Route path="/bitacora/:slug" element={<Post />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
);
