import Input from "@components/ui/Input";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import Loader from "@components/Loader";
import Button from "@components/ui/Button";
import { useNavigate } from "react-router-dom";
import { routerUrls } from "@config/routerUrls";

import { login } from "../../actions/authActions";

import styles from "./LoginPage.module.scss";
import { logout } from "../../reducers/authReducer";

const LoginPage = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, user } = useSelector(
        (state: RootState) => state.auth
    );
    const accessToken = useSelector(
        (state: RootState) => state.auth.accessToken
    );

    useEffect(() => {
        if (accessToken || user) {
          navigate(routerUrls.root.mask, { replace: true });
        }
      }, [accessToken, user, navigate]);
    
    if (loading) return <Loader />;
    if (accessToken || user) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(login({ token }));
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate(routerUrls.login.mask);
    };

    return (
        <div className={styles.loginPage}>
            <h1 className={styles.bold28}>Вход</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>Введите токен авторизации</label>
                <Input value={token} onChange={setToken}></Input>
                <Button type="submit">Войти</Button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <br/>
                <Button onClick={handleLogout}>
                    Выйти
                </Button>
            </form>
        </div>
    );
};

export default LoginPage;
