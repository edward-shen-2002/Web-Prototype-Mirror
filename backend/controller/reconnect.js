import { ROUTE_GET_RECONNECT } from "../config/constants";

const reconnect = ({ router }) => {
  router.post(ROUTE_GET_RECONNECT, (req, res) => {
    console.log("Reconnecting user!!")
  }); 
};

export default reconnect;