import { Card } from "../components/card";
import axios from "axios";
import BaseUrl from "../helpers/baseUrl";
import { useEffect, useState } from "react";
import { getToken } from "../features/user/actions";


export const Dashboard = () => {
    const [count, setCount] = useState({
        user: 0,
        userActive: 0,
        product: 0,
        productActive: 0
    })

    const [products, setProducts] = useState([])

    const token = getToken()

    const fetchActivation = async () => {
        try {
            const {data} = await axios.get(BaseUrl + 'users/active', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            setCount(data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchProduct = async () => {
        try {
            const {data} = await axios.get(BaseUrl + 'products')
            setProducts(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchActivation()
        fetchProduct()
    }, [])


  return (
    <div className="flex flex-col p-3 gap-4">
      <h1 className="text-bold">DASHBOARD</h1>
      <div className="flex flex-row gap-2">
        <Card title={"Total User"} amount={count.user} type={"User"} />
        <Card title={"Total User Aktif"} amount={count.userActive} type={"User"} />
        <Card title={"Total Product Aktif"} amount={count.product} type={"Product"} />
        <Card title={"Total Product"} amount={count.productActive} type={"Product"} />
      </div>
      <div className="m-5 w-[784px] p-5">
        <h2 className="m-3">Produk Terbaru</h2>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-blue-500 text-slate-200 rounded">
              <tr>
                <th className="flex-1">Produk</th>
                <th>Tanggal Dibuat</th>
                <th>Harga {"(Rp)"}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((el) => {
                return (<tr>
                    <th>{el.image}</th>
                    <td>{el.name}</td>
                    <td>{el.price}</td>
                  </tr>)
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
