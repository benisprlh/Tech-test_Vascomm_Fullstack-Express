import { useNavigate } from "react-router-dom";
import { Dashboard } from "../pages/dashboard";
import { UserManagement } from "../pages/user";

export const SideBar = ({content}) => {

  const navigate = useNavigate();

  const changePage = (target) => {
    navigate(target)
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-200">
        {content === 'dashboard' ? <Dashboard /> : content === 'user' ? <UserManagement /> : ''}
        
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side shadow-r-2 bg-base-100 ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
          <li className={content === "dashboard" ? "bg-blue-300 rounded-lg": ''} onClick={() => changePage('/admin/dashboard')}>
            <a>Dashboard</a>
          </li>
          <li className={content === "user" ? "bg-blue-300 rounded-lg": ''} onClick={() => changePage('/admin/user')}>
            <a>Manajemen User</a>
          </li>
          <li className={content === "product" ? "bg-blue-300 rounded-lg": ''} onClick={() => changePage('/admin/product')}>
            <a>Manajemen Produk</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
