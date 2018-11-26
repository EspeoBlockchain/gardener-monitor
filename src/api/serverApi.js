import axios from 'axios';


const checkServerStatus = () => axios.get(process.env.REACT_APP_STATUS_URL);

export default checkServerStatus;
