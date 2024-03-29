import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseUrl from "../helpers/baseUrl";
import axios from "axios";
import { getRole, getToken } from "../features/user/actions";

export const Login = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const login = async () => {
        try {
            const {data} = await axios.post(BaseUrl + 'users/login', formData)
            console.log(data)
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('role', data.role)
            if(data.role === 'admin') {
                navigate('/admin/dashboard')
            } else {
                navigate('')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleInput = (target) => {
        console.log(target)
        setFormData({...formData, ...target})
    }

    const handleSubmit = () => {
        login()
    }


    const handleClick = (param) => {
        navigate(param)
    }

    return (
      <div class="flex h-screen">
        <div class="hidden lg:flex items-center justify-center flex-1 bg-white text-black bg-sky-500"></div>
  
        <div class="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
          <div class="max-w-md w-full p-6">
            <h1 class="text-3xl font-semibold mb-6 text-black text-center">
                Login Page
            </h1>
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  onChange={(e) => handleInput({email: e.target.value})}
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  onChange={(e) => handleInput({password: e.target.value})}
                />
              </div>
              <div>
                <button
                  type="submit"
                  class="w-full mt-2 bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                  onClick={handleSubmit}
                >
                  Masuk
                </button>
              </div>
            <div class="mt-4 text-sm text-gray-600 text-center">
              <p>
                Sudah Memiliki Akun?
                <a class="text-black hover:underline" onClick={() => handleClick('/register')}>
                  Register here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  