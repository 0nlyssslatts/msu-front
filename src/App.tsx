import { Routes, Route, BrowserRouter } from "react-router";
// import PrivateRoute from "@components/PrivateRoute";
import RootLayout from "@components/RootLayout";
import { routerUrls } from '@config/routerUrls';

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function AppContent() {
    return (
        <RootLayout>
            <Routes>
                <Route path={routerUrls.login.mask} element={<LoginPage/>} />
                <Route
                        path={routerUrls.root.mask}
                        element={<HomePage />}
                />

                {/* <Route element={<PrivateRoute />}>
                    <Route
                        path={routerUrls.root}
                        element={<HomePage />}
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
