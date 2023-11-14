import jwt from "jsonwebtoken";

/**
 * Middleware for å sjekke hvis bruker er logget inn
 */
const auth = async (request, response, next) => {
    try {
        // få tak i token fra request
        const token = await request.headers.authorization.split(" ")[1];

        // skjekk hvis token er gyldig
        const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");

        // få tak i bruker id fra token
        const user = await decodedToken;

        // legg til bruker id til request
        request.user = user;

        // fortsett med neste middleware
        next();
    } catch (error) {
        response.status(401).json({
            error: new Error("Invalid request!"),
        });
        console.log("Invalid request!");
    }
};

export default auth;
