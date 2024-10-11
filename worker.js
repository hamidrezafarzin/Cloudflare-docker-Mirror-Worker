// Cloudflare Worker Script with Ping Endpoint
async function handleRequest(request) {
    const { pathname } = new URL(request.url);

    // Check if the request is for the "/ping" endpoint
    if (pathname === "/ping") {
        return new Response("pong", {
            status: 200,
            headers: {
                "Content-Type": "text/plain",
            },
        });
    }

    // Docker Hub mirror logic
    const dockerHubURL = `https://registry-1.docker.io${pathname}`;

    const modifiedHeaders = new Headers(request.headers);
    modifiedHeaders.set("Host", "registry-1.docker.io");

    const response = await fetch(dockerHubURL, {
        method: request.method,
        headers: modifiedHeaders,
        body: request.method !== "GET" && request.method !== "HEAD" ? request.body : null,
    });
    const workerURL = `https://${request.headers.get("host")}`;

    const modifiedResponseHeaders = new Headers(response.headers);
    modifiedResponseHeaders.set("Access-Control-Allow-Origin", "*");

    if (modifiedResponseHeaders.has("location")) {
        const location = modifiedResponseHeaders.get("location");
        const newLocation = location.replace("https://registry-1.docker.io", workerURL);
        modifiedResponseHeaders.set("location", newLocation);
    }

    return new Response(response.body, {
        status: response.status,
        headers: modifiedResponseHeaders,
    });
}

addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request));
});
