import axios from 'axios';

export const getServerStatus = () => axios.get(process.env.REACT_APP_STATUS_URL as string);
