import { ROUTE_POST_RECONNECT } from "../../constants/rest";

const reconnect = ({ router }) => {
  router.post(ROUTE_POST_RECONNECT, (_req, res) => {
    const { user } = res.locals;

    res.json({ message: "Successfully reconnected", data: { user } });
  }); 
};

export default reconnect;