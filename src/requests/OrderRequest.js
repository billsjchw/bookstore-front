import Ajax from "@/util/Ajax";
import Backend from "@/constants/Backend";

const OrderRequest = {
    placeOrder(consignee, callback) {
        Ajax.post(`${Backend.DOMAIN}/order/place-order`, consignee, callback);
    },
    findAllMyOrders(callback) {
        Ajax.get(`${Backend.DOMAIN}/order/find-all-my-orders`, callback);
    }
};

export default OrderRequest;
