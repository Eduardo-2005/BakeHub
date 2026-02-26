import React, { Children } from "react";
import {MenuLateral} from "../../components";

export default function MenuLateral({children}) {
  return (
    <div>
     <MenuLateral/>
        {children}
    </div>
  );
}