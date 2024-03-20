import axios from "axios";
import BaseUrl from "../helpers/baseUrl";
import { useNavigate } from "react-router-dom";
import { getToken } from "../features/user/actions";

export const PopupDeleteProduct = ({id, username}) => {

    const navigate = useNavigate()
    const token = getToken()

    const deleteData = async () => {
        try {
            const {data} = await axios.delete(BaseUrl + `products/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
            console.log(data)
            navigate('/admin/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = async () => {
        await deleteData()
    }

  return (
    <dialog id="my_product_delete" className="modal">
      <div className="modal-box ">
        <div className="flex flex-col justify-center items-center">
          <h3 className="font-bold text-lg">Konfirmasi Hapus</h3>
          <p className="py-4">
            Apakah anda yakin ingin menghapus {username}
          </p>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Batal</button>
          </form>
            <button className="btn btn-info text-slate-200" onClick={handleClick}>Hapus</button>
        </div>
      </div>
    </dialog>
  );
};
