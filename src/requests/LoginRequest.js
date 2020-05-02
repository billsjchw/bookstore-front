import Ajax from "@/util/Ajax";
import Backend from "@/constants/Backend";

const LoginRequest = {
    login(callback) {
        Ajax.get(`${Backend.DOMAIN}/login`, callback);
    }
}

export default LoginRequest;
