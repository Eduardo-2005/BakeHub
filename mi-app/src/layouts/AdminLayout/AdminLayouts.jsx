var _s = $RefreshSig$();
import { useState } from "react";
import { MenuLateral, Header } from "../../components";

export function AdminLayouts({ children }) {
  _s();
  const [sideBar, setsideBar] = useState(false);

  const toggleSidebar = () => setsideBar(!sideBar);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      <MenuLateral isOpen={sideBar} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header userName="Dany" toggleSidebar={toggleSidebar}/>
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}