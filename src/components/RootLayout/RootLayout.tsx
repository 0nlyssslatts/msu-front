<<<<<<< HEAD
import React from 'react';
import '../../index.scss'

type RootLayoutProps = {
  children?: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return <div className="container">{children}</div>;
=======
import React from "react";
import "../../index.css";

type RootLayoutProps = {
    children?: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return <div className="container">{children}</div>;
>>>>>>> 32cc344eb6756468e2c9b67fcfc09566175372b4
};

export default RootLayout;
