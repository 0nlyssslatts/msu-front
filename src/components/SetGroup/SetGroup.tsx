import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { FormEvent, useState } from "react";

import styles from './SetGroup.module.scss'

const SetGroup = () => {
    const [groupNumber, setGroupNumber] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return(
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>Введите номер своей группы</label>
                <Input value={groupNumber} onChange={setGroupNumber}/>
                <Button type="submit">Отправить</Button>
                {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
            </form>
        </div>
    );
}

export default SetGroup;