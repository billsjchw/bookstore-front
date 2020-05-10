import Ajax from "@/util/Ajax";
import Backend from "@/constants/Backend";

const CartRequest = {
    addToCart(isbn, increment, callback) {
        Ajax.post(`${Backend.DOMAIN}/cart/add-to-cart?isbn=${isbn}&increment=${increment}`, null, callback);
    },
    findCart(callback) {
        Ajax.get(`${Backend.DOMAIN}/cart/find-my-cart`, callback);
    }
};

export default CartRequest;
