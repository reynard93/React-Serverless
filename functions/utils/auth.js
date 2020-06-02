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

module.exports = {
	getAccessTokenFromHeaders
};
