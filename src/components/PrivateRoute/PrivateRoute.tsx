// import React, { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Navigate, Outlet } from "react-router-dom";
// // import Loader from "components/Loader";
// // import { AppDispatch, RootState } from "store";
// // import { getCurrentUser, refresh } from "../../actions/authActions";

// const PrivateRoute: React.FC = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const { user, loading } = useSelector((state: RootState) => state.auth);
//     const accessToken =
//         useSelector((state: RootState) => state.auth.accessToken) ||
//         localStorage.getItem("access_token");

//     useEffect(() => {
//         const fetchUserData = async () => {
//             if (!accessToken) return;

//             // Получаем данные пользователя и проверяем статус
//             const result = await dispatch(getCurrentUser());
//             // result.meta.requestStatus будет "fulfilled" если запрос успешен
//             if (result.meta.requestStatus !== "fulfilled" || !result.payload) {
//                 // Если данные пользователя не получены, выполняем refresh и пробуем снова
//                 await dispatch(refresh());
//                 await dispatch(getCurrentUser());
//             }
//         };

//         fetchUserData();
//     }, [accessToken, dispatch]);

//     if (loading) {
//         return <Loader />;
//     }

//     if (!accessToken) {
//         return <Navigate to="/login" />;
//     }

//     if (accessToken && !user) {
//         return <div>токену пизда</div>;
//     }

//     return <Outlet />;
// };

// export default PrivateRoute;
