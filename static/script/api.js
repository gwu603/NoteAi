function request(url, method, headers, body) {
    return fetch(url, {
        method: method,
        headers: headers,
        body: body
    })
}

function postClassifyRequest(text) {
    const url = '/classify';
    const method = 'POST';
    const headers = {
        'Content-Type': 'application/json'
    };
    const body = JSON.stringify({ "text" : text });
    return request(url, method, headers, body);
}
function getClassifyRequest() {
    const url = '/get_classified_text';
    const method = 'GET';
    const headers = {
        'Content-Type': 'application/json'
    };
    return request(url, method, headers);
}

function sendUpdatedText(socket, text) {
    socket.emit('update_text', {text:text});
}


export { postClassifyRequest, getClassifyRequest, sendUpdatedText };