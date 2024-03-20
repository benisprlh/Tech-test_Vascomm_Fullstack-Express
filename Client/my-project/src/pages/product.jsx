import { useEffect, useState } from "react";
import axios from "axios";
import BaseUrl from "../helpers/baseUrl";
import { PopupDelete } from "../components/popupDeleteUser";
import { ModalEditProduct } from "../components/modalEditProduct";
import { ModalAddProduct } from "../components/modalAddProduct";
import { getToken } from "../features/user/actions";
import { PopupDeleteProduct } from "../components/popupDeleteProduct";

export const ProductManagement = () => {
    const [product, setProduct] = useState([])
    const [id, setId] = useState(0)
    const [usernameSelected, setUsernameSelected] = useState()

    const token = getToken()


    const fetchProducts = async () => {
        try {
          console.log(BaseUrl + 'products')
            const {data} = await axios.get(BaseUrl + 'products', 
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            setProduct(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditModal =(newId) => {
      setId(newId)
      document.getElementById("my_modal_2").showModal()
    }

    const handleDeleteModal = (newId, index) => {
      setId(newId)
      setUsernameSelected(product[index]?.name)
      document.getElementById("my_product_delete").showModal()
    }

    useEffect(() => {
      fetchProducts()
    }, [])


  return (
    <section className="m-3">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="p-1">Manajemen Produk</h1>
        </div>
        <button
          className="btn btn-info rounded-sm p-1 px-5 text-slate-200"
          onClick={() => document.getElementById("my_modal_addProduct").showModal()}
        >
          Tambah Produk
        </button>
        <ModalAddProduct />
        {/* <ModalEditProduct id={id}/> */}
        <PopupDeleteProduct id={id} username={usernameSelected}/>
      </div>
      <div className="m-2">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Gambar Produk</th>
                <th>Nama Produk</th>
                <th>Harga</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {product?.map((el, index) => {
              return <tr className="bg-base-200">
                 <th>{index + 1}</th>
                <td ><img src={el.image} alt="" className="h-[50px] aspect-square"/></td>
                <td>{el.name}</td>
                <td>{el.price}</td>
                <td>{el.status}</td>
                <td>
                  <div className="flex flex-row gap-1">
                    <h2 className="btn" onClick={() => handleDeleteModal(el.id, index)}>Hapus</h2>
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
