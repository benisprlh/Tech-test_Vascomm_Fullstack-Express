import { Outlet, useNavigate } from "react-router-dom"

export const Navbar = () => {
  const navigate = useNavigate()

    const logout = () => {
      localStorage.clear();
      navigate('/login')
    }

    return <>
    <div className="navbar bg-base-100 border-b-2">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">LOGO</a>
    </div>
    <div className="flex-none gap-2">
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded w-52 items-center">
          <li >
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar w-full">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
          </li>
          <li className="items-center ">
            <div className="flex flex-col gap-0">
                <a className="text-sm">Beni Saprulah</a>
                <a className="text-xs">benisaprulah5@gmail.com</a>
            </div>
          </li>
          <li className="" onClick={logout} ><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
  <Outlet />
    </>
}