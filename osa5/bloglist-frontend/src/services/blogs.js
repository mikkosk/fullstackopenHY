import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async (object) => {
  const url = (baseUrl + '/' + object.id)
  const updatedObject = ({ ...object, likes: (object.likes + 1) })
  const response = await axios.put(url, updatedObject)
  return response.data
}

const remove = async (object) => {
  const config = {
    headers: { Authorization: token }
  }
  const url = (baseUrl + '/' + object.id)
  const response = await axios.delete(url, config)
  return response.data
}

export default { getAll, setToken, create, like, remove }