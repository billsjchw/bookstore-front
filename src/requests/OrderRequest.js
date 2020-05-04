import Ajax from "@/util/Ajax";
import Backend from "@/constants/Backend";

const OrderRequest = {
    addToCart(isbn, inc, callback) {
        Ajax.post(`${Backend.DOMAIN}/order/add-to-cart?isbn=${isbn}&inc=${inc}`, null, callback);
    },
    getCart(callback) {
        Ajax.get(`${Backend.DOMAIN}/order/get-cart`, callback);
    },
    placeOrder(callback) {
        Ajax.post(`${Backend.DOMAIN}/order/place-order`, null, callback);
    },
    getHistory(callback) {
        Ajax.get(`${Backend.DOMAIN}/order/get-history`, callback);
    }
};

export default OrderRequest;
