import { useEffect, useState } from "react";
import BaseUrl from "../helpers/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ModalEditUser = ({id}) => {
  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const navigate = useNavigate()

  const editUser = async () => {
    try {
        const {data} = await axios.put(BaseUrl + `users/update/${id}`,user)
        console.log(data)
        

    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    try {
        const {data} = await axios.get(BaseUrl + `users/${id}`)
        setUser(data)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [id])

  const handleChangeInput = (param) => {
    setUser({ ...user, ...param});
    console.log(user);
  };

  const handleSubmit = async () => {
    await editUser();
    navigate('/admin/dashboard')
  }

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box m-0">
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
        <h3 className="text-center text-lg ">Tambah User</h3>
        <div className="flex justify-center w-full">
          <label className="form-control w-full max-w-xs gap-2">
            <span className="label-text">Nama</span>
            <input
              type="text"
              placeholder="Type here"
              name="name"
              value={user.name}
              className="input input-bordered input-sm w-full max-w-xs"
              onChange={(e) => handleChangeInput({name: e.target.value})}
            />
            <span className="label-text">Nomor Telepon</span>
            <input
              type="text"
              placeholder="Type here"
              name="phoneNumber"
              value={user.phoneNumber}
              className="input input-bordered input-sm w-full max-w-xs"
              onChange={(e) => handleChangeInput({phoneNumber: e.target.value})}
            />
            <span className="label-text">Email</span>
            <input
              type="text"
              placeholder="Type here"
              name="email"
              value={user.email}
              className="input input-bordered input-sm w-full max-w-xs"
              onChange={(e) => handleChangeInput({email: e.target.value})}
            />
            <button className="btn btn-info rounded-sm mt-4 text-slate-200" onClick={handleSubmit}>
              SIMPAN
            </button>
          </label>
        </div>
      </div>
    </dialog>
  );
};
