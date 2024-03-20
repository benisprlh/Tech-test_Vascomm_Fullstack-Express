import { useEffect, useState } from "react";
import { ModalAddUser } from "../components/modalAddUser";
import { ModalEditUser } from "../components/modalEditUser";
import axios from "axios";
import BaseUrl from "../helpers/baseUrl";
import { PopupDelete } from "../components/popupDelete";
import { useResolvedPath } from "react-router-dom";

export const UserManagement = () => {
    const [user, setUser] = useState([])
    const [id, setId] = useState(0)
    const [usernameSelected, setUsernameSelected] = useState()


    const fetchUsers = async () => {
        try {
          console.log(BaseUrl + 'users')
            const {data} = await axios.get(BaseUrl + 'users/getall')
            setUser(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchUsers()
    }, [])

    const handleEditModal =(newId) => {
      setId(newId)
      document.getElementById("my_modal_2").showModal()
    }

    const handleDeleteModal = (newId, index) => {
      setId(newId)
      setUsernameSelected(user[index]?.name)
      document.getElementById("my_modal_delete").showModal()
    }


  return (
    <section className="m-3">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="p-1">Manajemen User</h1>
        </div>
        <button
          className="btn btn-info rounded-sm p-1 px-5 text-slate-200"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Tambah User
        </button>
        <ModalAddUser />
        <ModalEditUser id={id}/>
        <PopupDelete id={id} username={usernameSelected}/>
      </div>
      <div className="m-2">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Lengkap</th>
                <th>Email</th>
                <th>Nomor Telepon</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {user?.map((el, index) => {
              return <tr className="bg-base-200">
                 <th>{index + 1}</th>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>{el.phoneNumber}</td>
                <td>
                  <div className="flex flex-row gap-1">
                    <h2 className="btn" onClick={() => handleDeleteModal(el.id, index)}>delete</h2>
                    <h2 className="btn" onClick={() => handleEditModal(el.id)}>edit</h2>
                   
                  </div>
                </td>
              </tr>}
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
