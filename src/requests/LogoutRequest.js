import Ajax from "@/util/Ajax";
import Backend from "@/constants/Backend";

const LogoutRequest = {
    logout(callback) {
        Ajax.get(`${Backend.DOMAIN}/logout`, callback);
    }
};

export default LogoutRequest;
