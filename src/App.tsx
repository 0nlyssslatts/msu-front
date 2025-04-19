import { Routes, Route, BrowserRouter, Navigate } from "react-router";
// import PrivateRoute from "@components/PrivateRoute";
import RootLayout from "@components/RootLayout";

import { routerUrls } from "@config/routerUrl";
import HomePage from "@pages/HomePage";

function AppContent() {
    return (
        <RootLayout>
            <Routes>
                <Route path={routerUrls.home.mask} element={<HomePage />} />
                <Route
                    path="*"
                    element={
                        <Navigate to={routerUrls.home.mask} replace={true} />
                    }
                />

                {/* <Route element={<PrivateRoute />}>
                    <Route
                        path={routerUrls.profile.mask}
                        element={<ProfilePage />}
                    />
                </Route> */}
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
