import axios from "axios";
export async function getData() {
  return axios.get('api/inventory')

}
