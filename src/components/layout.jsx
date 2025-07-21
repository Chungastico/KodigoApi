
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
