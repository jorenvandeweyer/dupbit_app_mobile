var Default_options = {
    host: "dupbit.com",
    socket: true,
    socketOptions: {
        retry: 0,
        noRetry: false,
    }
};
var retrySeconds = [0, 1, 5, 15, 30, 60, 180, 240];

(function() {
    this.EventEmitter = class {
        constructor() {
            this.listeners = new Map();
        }
        emit(type, message) {
            if (this.listeners.has(type)) {
                this.listeners.get(type).forEach(listener => listener(message));
            }
        }
        on(type, listener) {
            if (!this.listeners.has(type)){
                this.listeners.set(type, new Array());
            }
            this.listeners.get(type).push(listener);
        }
        removeListener(type, listener) {
            if (this.listeners.has(type)) {
                listeners = this.listeners.get(type)
                listeners.splice(listeners.indexOf(listener), 1);
            }
        }
        removeAllListeners(type) {
            if (this.listeners.has(type)) {
                this.listeners.remove(type);
            }
        }
    };
    this.WS = class extends this.EventEmitter {
        constructor(url) {
            super();
            this.socket = new WebSocket(url);
            this.socket.onopen = (event) => { this.emit("open", event) };
            this.socket.onmessage = (event) => { this.emit(event.type, event.data) };
            this.socket.onerror = (event) => { this.emit("error", event) };
            this.socket.onclose = (event) => { this.emit("close", event) };
        }

        close() {
            this.socket.close();
        }

        send(data) {
            this.socket.send(data);
        }
    }
})();

class Dupbit_API extends EventEmitter{
    constructor(options={}, search=false) {
        super();

        Object.assign(this, Default_options);
        Object.assign(this, options);

        if (!options.token && !search) throw "Need a token to create a websocket/api connection, or use \"(..., true)\"";

        this.connect();
    }

    async connect() {
        await this._validateToken();

        if (!this.authenticated) return this.emit("error", "invalid token");
        
        if (this.socket) {
            this.connectSocket();
        } else {
            this.emit("ready");
        }
    }

    async connectSocket() {
        this.ws = new WS(`wss://${this.host}`, {
            headers: {
                authentication: this.token,
            },
        });

        this.ws.on("error", (e) => {
            this.emit("error_socket", e);
            console.log(e);
        });

        this.ws.on("open", () => {
            this.socketOptions.retry = 0;
            this.emit("ready");
        });

        this.ws.on("message", (data) => {
            data = JSON.parse(data);
            this.emit("message", {
                data,
                reply: (response, cb) => {
                    this.ws.send(JSON.stringify({
                        original: data,
                        response,
                    }), (err) => {
                        if (typeof cb === "function") cb(err);
                    });
                }
            });
        });

        this.ws.on("close", (code) => {
            const SO = this.socketOptions;
            this.emit("disconnect_socket");

            if (!SO.noRetry) {
                SO.retry++;
                if (SO.retry >= retrySeconds.length) SO.retry = retrySeconds.length - 1;
                const delay = retrySeconds[SO.retry];
                console.log("reconnection in:" ,delay);
                this.emit("reconnecting_socket", delay);
                setTimeout(() => {
                    this.connectSocket();
                }, delay*1000);
            }
        })
    }

    async close() {
        if (this.ws) {
            this.SocketOptions.noRetry = true;
            this.ws.close();
        }
    }

    async list() {
        if (!this.authenticated) return this.emit("error", "invalid token");

        return Request({
            token: this.token,
            path: "/api/connect/open",
        });
    }

    async sendAPICall(options) {
        if (!this.authenticated) return this.emit("error", "invalid token");

        return Request({
            token: this.token,
            path: "/api/connect/open",
            body: options,
            method: "POST",
        });
    }

    static async login(username, password) {
        return await Request({
            body: {
                username,
                password,
                remote: "api_lib",
            },
            path: "/api/account/login",
            method: "POST",
        });
    }

    async _validateToken() {
        this.session = await Request({
            token: this.token,
            path: `/api/account/status`,
            host: this.host,
        });
    }

    get authenticated() {
        return this.session && this.session.isLoggedIn;
    }
}

async function Request(options) {
    options = {
        method: "GET",
        headers: {
            authorization: options.token || "",
            "content-type": "application/json",
        },
        host: Default_options.host,
        ...options,
    };
    const response = await Browser_Request(options).catch((result) => {
        return null;  
    });

    return response && response.data;

}

async function Browser_Request(options) {
    const xhr = new XMLHttpRequest();
    const result = {
        statusCode: 200,
        statusMessage: "OK",
        data: {},
        json: true,
    };

    return new Promise((resolve, reject) => {
        xhr.open(options.method, "https://" + options.host + options.path + (options.method === "GET" ? "?" + encodeData(options.body) : ""), true);
        
        for (let header in options.headers) {
            xhr.setRequestHeader(header, options.headers[header]);
        }
        xhr.onload = () => {
            if (xhr.status < 200 || xhr.status >=300) {
                result.statusCode = xhr.status;
                result.json = false;
                result.statusMessage = xhr.statusText;
                reject(result);
            } else {
                const contentType = xhr.getResponseHeader("content-type");
                if (contentType.includes("application/json")) {
                    result.data = JSON.parse(xhr.responseText);
                } else {
                    result.data = xhr.responseText;
                    result.json = false;
                }
                resolve(result);
            }
        };
        xhr.onerror = (err) => {
            result.json = false;
            result.statusCode = xhr.status;
            result.statusMessage = xhr.statusText;
            reject(result);
        };
        xhr.send(options.method !== "GET" ? JSON.stringify(options.body) : undefined);
    });
}

function encodeData(data) {
    if (!data) return "";
    return Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
}

export default Dupbit_API;
