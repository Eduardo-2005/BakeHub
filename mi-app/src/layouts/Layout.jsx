import React from "react";
import {menu} from "../components/menu";
import {Footer} from "../pages/Footer";

export function Layout({children}) {
    return (
        <div className="container">
            <div className="init">
                <menu />
            </div>
            <div className="body p-4">{children}</div>
            <div className="Footer">
                <Footer />
            </div>
        </div>
    );
}