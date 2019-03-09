'use strict'

class Header {
	async handle({
		request,
		response
	}, next) {
		if (request.method() === "GET" || ((request.header('content-type') && request.header('content-type').includes( "application/json")) &&
				request.header('accept') === "application/json")) {
			await next()
			return
		}

		return response.jsend(null, "Improper header value for 'Content-Type' or 'Accept'. Value should be  'application/json'. ", 406);
	}
}

module.exports = Header
