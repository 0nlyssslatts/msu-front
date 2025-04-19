import Input from "@components/ui/Input";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import Loader from "@components/Loader";
import { login } from "../../actions/authActions";
import Button from "@components/ui/Button";
import { useNavigate } from "react-router-dom";
import { routerUrls } from "@config/routerUrls";

import styles from "./LoginPage.module.scss";

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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(login({ token }));
    };

    if (accessToken || user) {
        navigate(routerUrls.root.mask);
    }

    if (loading && !user) {
        return <Loader />;
    }

    return (
        <div>
            <h1 className={styles.bold28}>Вход</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>Введите токен авторизации</label>
                <Input value={token} onChange={setToken}></Input>
                <Button type="submit">Войти</Button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
