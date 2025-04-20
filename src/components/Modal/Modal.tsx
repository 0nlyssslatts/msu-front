import { ReactNode } from "react";

import style from "./Modal.module.scss";

const AddTaskModal = ({
    children,
    closeModal,
}: {
    children: ReactNode;
    closeModal: () => void;
}) => {
    return (
        <div className={style.modal_overlay}>
            <div className={style.modal}>
                <div className={style.close} onClick={closeModal}>
                    x
                </div>
                {children}
            </div>
        </div>
    );
};

export default AddTaskModal;
