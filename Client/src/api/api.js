import * as axios from "axios"

const server = "/api/list"

// ------------------------- Get Product List -------------------------
export const getFullListAPI = () => {
  return axios.get(`${server}`)
}

export const setNextItemAPI = (nextItem) => {
  // let data = JSON.stringify(nextItem)
  return axios.post(`${server}`, nextItem)
}

export const delItemAPI = (currentID, marker) => {
  // let data = JSON.stringify(nextItem)
  return axios.delete(`${server}/${currentID}/${marker}`)
}

export const updateItemAPI = (item) => {
  // let data = JSON.stringify(nextItem)
  return axios.put(`${server}/${item._id}`, item)
}
