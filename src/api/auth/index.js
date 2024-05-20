import axios from "axios";

export const getMe = async (token) => {
    const response = await axios.get('http://localhost:3000/auth/me', {
      headers: { Authorization : `Bearer ${token}` },
    })

    return response.data.data
}

export const getUsers = async (token) => {
  const response = await axios.get('http://localhost:3000/admin/users', {
    headers: { Authorization : 'Bearer ' + token }
  })

  return response.data.data
}