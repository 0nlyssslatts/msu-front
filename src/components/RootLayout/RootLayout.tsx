import React from "react";
import "../../index.scss";
import TupBar from "@components/ui/TupBar/TupBar";
import Button from "@components/ui/Button";
import Modal from "@components/Modal";
import AddTaskForm from "@components/AddTaskForm";

type RootLayoutProps = {
    children?: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div>
            <div className="container">{children}</div>
            <TupBar />
            {isOpen && (
                <Modal closeModal={() => setIsOpen(false)}>
                    <AddTaskForm closeForm={() => setIsOpen(false)} />
                </Modal>
            )}
            <Button
                style={{
                    position: "absolute",
                    bottom: 80,
                    right: 20,
                    zIndex: 1500,
                    borderRadius: "30%",
                }}
                onClick={() => setIsOpen(true)}
            >
                +
            </Button>
        </div>
    );
};

export default RootLayout;
