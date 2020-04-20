const axios = require('axios')

async function service(url, data) {
	let response;
	try {
		response = await axios.get(url, {
			params: {
				...data
			},
		});
	} catch (e) {
		throw e
	}
	return response.data;
}

module.exports = service
