const jwt = require('jsonwebtoken');
const jwks = require('jwks-rsa');
const {promisify} = require('util');

const jwksClient = jwks({
	jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

let signingkey;

const getAccessTokenFromHeaders = (headers) => {
	const rawAuthorization = headers.authorization;
	if (!rawAuthorization) {
		return null;
	}
	const authorizationParts = rawAuthorization.split(" ");
	if (authorizationParts[0] !== "Bearer" || authorizationParts.length !== 2) {
		return null;
	}
	return authorizationParts[1];
}

const validateAccessToken = async (token) => {
	if (!signingkey) {
		try {
			const getSigningKey = promisify(jwksClient.getSigningKey);
			const key = await getSigningKey(process.env.AUTH0_KEY_ID);
			signingkey = key.getPublicKey();
		} catch(err) {
			console.error(err);
			return null;
		}
	}
	try {
		const decoded = jwt.verify(token, signingkey);
		console.log(decoded);
		return decoded;
	} catch (err) {
		console.error(err);
		return null;
	}
}

module.exports = {
	getAccessTokenFromHeaders,
	validateAccessToken
};
