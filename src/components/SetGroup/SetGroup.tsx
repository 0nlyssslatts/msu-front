import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";

import { setGroup, resetSetGroupError } from '../../actions/userAction';

import styles from './SetGroup.module.scss'

const SetGroup = () => {
    const [groupNumber, setGroupNumber] = useState('')
    const { loading, error } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(setGroup({ group_number: groupNumber }));
      };
    
      useEffect(() => {
        return () => {
          dispatch(resetSetGroupError());
        };
      }, [dispatch]);
    
    return(
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>Введите номер своей группы</label>
                <Input
                value={groupNumber}
                onChange={(value) => setGroupNumber(value)}
                />
                <Button type="submit" disabled={loading}>
                {loading ? 'Отправка...' : 'Отправить'}
                </Button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}

export default SetGroup;