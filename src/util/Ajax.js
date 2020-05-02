import Message from "@/util/Message";
import HttpRespStat from "@/constants/HttpRespStat";

const Ajax = {
    get(url, callback) {
        Ajax.send("GET", url, undefined, callback);
    },
    put(url, body, callback) {
        Ajax.send("PUT", url, body, callback);
    },
    post(url, body, callback) {
        Ajax.send("POST", url, body, callback);
    },
    delete(url, callback) {
        Ajax.send("DELETE", url, undefined, callback);
    },
    send(method, url, body, callback) {
        let user = sessionStorage.getItem("user");
        if (user === null) {
            callback(new Message("UNAUTHORIZED", null));
            return;
        }
        let auth = "Basic " + user;
        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth
            },
            body: JSON.stringify(body)
        }).then(resp => {
            if (resp.status !== HttpRespStat.SUCCESS)
                return Promise.reject(resp);
            return resp.json();
        }).then(msg => {
            callback(msg);
        }).catch(resp => {
            if (resp.status === HttpRespStat.UNAUTHORIZED)
                callback(new Message("UNAUTHORIZED", null));
            else
                callback(new Message("UNKNOWN_HTTP_ERROR", null));
        });
    }
}

export default Ajax;
