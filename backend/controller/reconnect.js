import { ROUTE_GET_RECONNECT } from "../config/constants";

const reconnect = ({ router }) => {
  router.get(ROUTE_GET_RECONNECT, (req, res) => {
    const { user } = res.locals;
    res.json({ message: "Successfully reconnected", data: { user } });
  }); 
};

export default reconnect;