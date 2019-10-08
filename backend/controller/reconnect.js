import { ROUTE_GET_RECONNECT } from "../config/constants";

const reconnect = ({ router }) => {
  router.post(ROUTE_GET_RECONNECT, (req, res) => {
    const { user } = res.locals;
    res.json({ message: "Successfully reconnected", data: { user } });
  }); 
};

export default reconnect;