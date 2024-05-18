function sendText(socket, event, text) {
    socket.emit(event, {text:text})
}

export { sendText };