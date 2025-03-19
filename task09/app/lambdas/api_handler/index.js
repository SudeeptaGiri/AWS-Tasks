import axios from "axios";

exports.handler = async (event) => {
    const path = event.rawPath;
    const method = event.requestContext.http.method;

    if (path === "/weather" && method === "GET") {
        try {
            const response = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m', {
                params: {
                    latitude: 50.4375,
                    longitude: 30.5,
                    hourly: "temperature_2m,relative_humidity_2m,wind_speed_10m",
                    current: "temperature_2m,wind_speed_10m",
                    timezone: "Europe/Kiev"
                }
            });

            return {
                statusCode: 200,
                body: JSON.stringify(response.data),
                headers: { "content-type": "application/json" },
                isBase64Encoded: false
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Failed to fetch weather data" }),
                headers: { "content-type": "application/json" }
            };
        }
    }

    return {
        statusCode: 400,
        body: JSON.stringify({
            statusCode: 400,
            message: `Bad request syntax or unsupported method. Request path: ${path}. HTTP method: ${method}`
        }),
        headers: { "content-type": "application/json" },
        isBase64Encoded: false
    };
};
