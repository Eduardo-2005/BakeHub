import{NavLink} from "react-router";
import {LayoutDashboard, Home, Settings, X} from "lucide-react";

export function MenuLateral({isOpen, toggleSidebar}) {

  const menuItems=[
    {name: "Dashoboard",path:"/", icon:<LayoutDashboard size={20}/>},
    {name: "Home",path:"/home", icon:<Home size={20}/>},
    {name: "Gestion",path:"/gestion", icon:<Settings size={20}/>}
  ]

  return (
<aside className={`fixed inset-y-0 left-0 z-50 bg-slate-900 w-64 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0':'-translate-x-full'}`}>
  <div className="p-6 border-b border-slate-800 flex justify-between items-center">
    <h1 className="text-xl font-bold tracking-tight">Nombre empresa</h1>
    <button onClick={toggleSidebar} className="lg:hidden text-slate-400"><X size={24}/></button>
  </div>
  <nav className="flex-1 p-4 mt-4 space-y-2">
    {
      menuItems.map((menuitem)=>(
        <NavLink key={menuitem.name} to={menuitem.path}
        onClick={()=>{if (window.innerWidth<1024) toggleSidebar()}}
        className={({isActive})=>`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-blue-600 text-white shadow-lg':'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
        >
          {menuitem.icon}
          <span className="font-medium">{menuitem.name}</span>
        </NavLink>
      ))
    }
  </nav>
</aside>
  
  );
}