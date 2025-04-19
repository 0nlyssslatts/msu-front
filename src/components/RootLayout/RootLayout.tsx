import React from "react";
import "../../index.scss";
import TupBar from "@components/ui/TupBar/TupBar";

type RootLayoutProps = {
    children?: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <div>
            <div className="container">{children}</div>
            <TupBar/>
        </div>);
};

export default RootLayout;
