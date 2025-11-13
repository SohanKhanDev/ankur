import React from "react";
import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import LoadingPage from "../pages/LoadingPage";
import AllCropsPage from "../pages/AllCropsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AddCropsPage from "../pages/AddCropsPage";
import MyPostsPage from "../pages/MyPostsPage";
import MyInterestsPage from "../pages/MyInterestsPage";
import AuthLayout from "../layouts/AuthLayout";
import AuthPage from "../pages/AuthPage";
import ProfilePage from "../pages/ProfilePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ProfileEditPage from "../pages/ProfileEditPage.JSX";
import PrivateRouteProvider from "../providers/PrivateRouteProvider";
import CropDetailsPage from "../pages/CropDeatilsPage";

const router = createBrowserRouter([
  /*** ----------*** :: LAYOUT => HOMELAYOUT :: ***---------- ***/
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <LoadingPage />,
    children: [
      /*** ----------*** :: PAGE => HOME :: ***---------- ***/
      {
        index: true,
        element: <HomePage />,
        loader: () => fetch("http://ankur-server-ten.vercel.app/allcrops"),
      },

      /*** ----------*** :: PAGE => PROFILE :: ***---------- ***/
      {
        path: "/profile",
        element: (
          <PrivateRouteProvider>
            <ProfilePage />
          </PrivateRouteProvider>
        ),
      },

      /*** ----------*** :: PAGE => PROFILE EDIT :: ***---------- ***/
      {
        path: "/editprofile",
        element: (
          <PrivateRouteProvider>
            <ProfileEditPage />
          </PrivateRouteProvider>
        ),
      },

      /*** ----------*** :: PAGE => ALL CROPS :: ***---------- ***/
      {
        path: "/allcrops",
        element: <AllCropsPage />,
        loader: () => fetch("http://ankur-server-ten.vercel.app/allCrops"),
      },

      /*** ----------*** :: PAGE => CROPS DETAILS :: ***---------- ***/
      {
        path: "/crops/:id",
        element: (
          <PrivateRouteProvider>
            <CropDetailsPage />
          </PrivateRouteProvider>
        ),
        loader: ({ params }) =>
          fetch(`http://ankur-server-ten.vercel.app/crops/${params.id}`),
      },

      /*** ----------*** :: PAGE => ADD CROPS :: ***---------- ***/
      {
        path: "/addcrops",
        element: (
          <PrivateRouteProvider>
            <AddCropsPage />
          </PrivateRouteProvider>
        ),
      },

      /*** ----------*** :: PAGE => MY POSTS :: ***---------- ***/
      {
        path: "/myposts",
        element: (
          <PrivateRouteProvider>
            <MyPostsPage />
          </PrivateRouteProvider>
        ),
        loader: () => {},
      },

      /*** ----------*** :: PAGE => MY INTERESTS :: ***---------- ***/
      {
        path: "/myinterests",
        element: (
          <PrivateRouteProvider>
            <MyInterestsPage />
          </PrivateRouteProvider>
        ),
      },
    ],
  },

  /*** ----------*** :: LAYOUT => AUTHLAYOUT :: ***---------- ***/
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <LoadingPage />,
    children: [
      /*** ----------*** :: PAGE => AUTH :: ***---------- ***/
      { path: "", element: <AuthPage /> },

      /*** ----------*** :: PAGE => LOGIN :: ***---------- ***/
      { path: "/auth/login", element: <LoginPage /> },

      /*** ----------*** :: PAGE => REGISTER :: ***---------- ***/
      { path: "/auth/register", element: <RegisterPage /> },

      /*** ----------*** :: PAGE => FORGOT PASSWORD :: ***---------- ***/
      {
        path: "/auth/forgot/:prefilledEmail?",
        element: <ForgotPasswordPage />,
      },
    ],
  },
]);

export default router;
