import { ROUTE_GET_RECONNECT } from "../config/constants";

const reconnect = ({ router }) => {
  router.get(ROUTE_GET_RECONNECT, (req, res) => {
    const { user } = res.locals;

    if(user) {
      res.json({ message: "Successfully reconnected", data: { user } });
    } else {
      res.status(401).json({ message: "Unable to login due to invalid token" });
    }
  }); 
};

export default reconnect;