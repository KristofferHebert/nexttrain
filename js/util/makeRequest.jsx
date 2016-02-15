import 'whatwg-fetch'

// Check status and return response or throw error
function _checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response
	} else {
		var error = new Error(response.statusText)
		error.response = response
		throw error
	}
}

// Helper function that return promise with data
function _parseJSON(response) {
	return response.json()
}

let defaultOptions = {
	headers: {
		'Accept': 'application/json'
	}
}

function makeRequest(endpoint, userOptions) {
    let options = Object.assign(defaultOptions, userOptions)

    if(options.method === 'get'|| options.method === 'GET'){
        delete options.body
    }

    return fetch(endpoint, options)
			.then(response => {
			    return response.json().then(json => {
			    	return response.ok ? json : Promise.reject(json)
			    })
			})
}

export default makeRequest
