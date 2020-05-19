import { ROUTE_RECONNECT } from "../../constants/rest";
import { MESSAGE_SUCCESS_RECONNECT } from "../../constants/messages";

const reconnect = ({ router }) => {
  router.post(ROUTE_RECONNECT, (_req, res) => {
    const { user } = res.locals;

    res.json({ message: MESSAGE_SUCCESS_RECONNECT, data: { user } });
  }); 
};

export default reconnect;