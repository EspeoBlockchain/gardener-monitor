import axios from 'axios';


export const checkServerStatus = () => axios.get(process.env.REACT_APP_STATUS_URL)
