const express = require("express")
const http = require("http")
const path = require("path")
const child_process = require("child_process")

module.exports.api = null

module.exports.start = function() {
    const server = express();

    //Mount API
    if (module.exports.api != null) {
        server.use("/api", module.exports.api)
    }

    //Mount app
    if (process.argv.indexOf("--dev-server") > -1) {
        //If running in dev mode, forward all requests to a newly spawned Vite dev server

        server.use((req, res) => {
            const forward = http.request({
                host: "localhost",
                port: "8081",
                path: req.path,
                method: req.method,
                headers: req.headers
            }, (res2) => {
                res.statusCode = res2.statusCode
                res.headers = res2.headers
                res2.pipe(res)
            });
            req.pipe(forwrad);
            forward.on("error", (err) => {
                console.warn(err);
                res.statusCode = 500;
                res.end("Proxy error");
            })
        })

        const client_dir = path.resolve(__dirname + "../../../client")
        console.log(client_dir)
        const subprocess = child_process.spawn("npm", ["run-script", "dev"], {
            shell: true,
            stdio: "inherit",
            cwd: client_dir
        })
        subprocess.on("close", (code) => { process.exit(code) });
        process.on("close", () => { subprocess.close(); });
    } else {
        //Serve files from the Vite build directory

        const root = path.resolve(__dirname + "../../../client/dist")
        server.use(express.static(root))
    }

    return server.listen(parseInt(process.env.PORT ?? "8080"))
}