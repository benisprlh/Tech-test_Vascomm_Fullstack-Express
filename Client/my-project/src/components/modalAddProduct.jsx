import { useEffect, useState } from "react";
import BaseUrl from "../helpers/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken } from "../features/user/actions";

export const ModalAddProduct = ({ id }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [fileName, setFileName] = useState("");
  const [formData, setFormData] = useState();

  const navigate = useNavigate();

  const token = getToken();

  const addProduct = async () => {
    try {
      const { data } = await axios.post(BaseUrl + `products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      navigate('/admin/dashboard')
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    console.log(e.target.files[0], e.target.files[0].name);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("status", status);
    setFormData(formData)

    await addProduct();
    navigate("/admin/product");
  };

  return (
    <dialog id="my_modal_addProduct" className="modal">
      <div className="modal-box">
        <div className="modal-action">
          <form method="dialog">
            <button className=" btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
        <h3 className="text-center text-lg ">Tambah Produk</h3>
        <div className="flex justify-center w-full">
          <form onSubmit={handleSubmit}>
            <label className="form-control w-max max-w-xs gap-2">
              <span className="label-text">Nama</span>
              <input
                type="text"
                placeholder="Type here"
                name="name"
                value={name}
                className="input input-bordered input-sm w-full max-w-xs"
                onChange={handleNameChange}
              />
              <span className="label-text">Harga</span>
              <input
                type="text"
                placeholder="Type here"
                name="phoneNumber"
                value={price}
                className="input input-bordered input-sm w-full max-w-xs"
                onChange={handlePriceChange}
              />
              <span className="label-text">Status</span>
              <select
                className="select select-bordered"
                value={status}
                onChange={handleStatusChange}
              >
                <option disabled selected>
                  Pilih Status
                </option>
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
              </select>
              <span className="label-text">Upload Gambar</span>
              <div class="flex items-center justify-center w-full">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      {fileName ? (
                        <span className="font-semibold">{fileName}</span>
                      ) : (
                        "Click to upload or drag and drop"
                      )}
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    class="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              <button
                className="btn btn-info rounded-sm mt-4 text-slate-200"
                onClick={handleSubmit}
              >
                SIMPAN
              </button>
            </label>
          </form>
        </div>
      </div>
    </dialog>
  );
};
