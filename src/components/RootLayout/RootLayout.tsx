import React from "react";
import "../../index.scss";

type RootLayoutProps = {
    children?: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return <div className="container">{children}</div>;
};

export default RootLayout;
