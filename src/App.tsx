import { Routes, Route, BrowserRouter, Navigate } from "react-router";
import RootLayout from "@components/RootLayout";
import { routerUrls } from "@config/routerUrls";
import PrivateRoute from "@components/PrivateRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UsersGroupPage from "./pages/UsersGroupPage";
import WeekPage from "./pages/WeekPage";

function AppContent() {
    return (
        <RootLayout>
            <Routes>
                <Route path={routerUrls.login.mask} element={<LoginPage />} />
                <Route element={<PrivateRoute />}>
                    <Route path={routerUrls.root.mask} element={<HomePage />} />
                    <Route
                        path={routerUrls.confirm_users.mask}
                        element={<UsersGroupPage />}
                    />
                    <Route
                        path={routerUrls.schedule.mask}
                        element={<WeekPage />}
                    />
                    <Route
                        path="*"
                        element={
                            <Navigate
                                to={routerUrls.root.mask}
                                replace={true}
                            />
                        }
                    />
                </Route>
            </Routes>
        </RootLayout>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}
export default App;
