import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App.jsx";

import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Profile from "./pages/User/Profile.jsx";

// Auth
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
// User Pages
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies/Movies.jsx";
// import Movies2 from "./pages/Movies/Movies2.jsx";
import Movie from "./pages/Movies/Movie.jsx";

// Admin Pages
import MovieList from "./pages/Admin/MovieList.jsx";
import AddMovie from "./pages/Admin/AddMovie.jsx";
import MovieUpdate from "./pages/Admin/MovieUpdate.jsx";

import MediaList from "./pages/Admin/MediaList.jsx";
import AddMedia from "./pages/Admin/AddMedia.jsx";
import MediaUpdate from "./pages/Admin/MediaUpdate.jsx";

import GenreList from "./pages/Admin/GenreList.jsx";
import AddGenre from "./pages/Admin/AddGenre.jsx";
import GenreUpdate from "./pages/Admin/GenreUpdate.jsx";

import UserList from "./pages/Admin/UserList.jsx";
import UserUpdate from "./pages/Admin/UserUpdate.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route index={true} path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      {/* <Route path="/movies" element={<Movies2 />} /> */}
      <Route path="/movie/:id" element={<Movie />} />

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/movielist" element={<MovieList />} />
        {/* <Route
          path="/admin/movielist/:pageNumber"
          element={<MovieListScreen />}
        />
        */}
        <Route path="/admin/movie/:id/edit" element={<MovieUpdate />} />
        <Route path="/admin/addmovie" element={<AddMovie />} />

        <Route path="/admin/genrelist" element={<GenreList />} />
        <Route path="/admin/genrelist/:pageNumber" element={<GenreList />} />
        <Route path="/admin/genre/:id/edit" element={<GenreUpdate />} />
        <Route path="/admin/addgenre" element={<AddGenre />} />

        <Route path="admin/medialist" element={<MediaList />} />
        <Route path="/admin/media/:id/edit" element={<MediaUpdate />} />
        <Route path="/admin/addmedia" element={<AddMedia />} />

        <Route path="/admin/userlist" element={<UserList />} />
        {/*
        <Route
          path="/admin/userlist/:pageNumber"
          element={<UserListScreen />}
        />
        */}
        <Route path="/admin/user/:id/edit" element={<UserUpdate />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
