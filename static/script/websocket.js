import { sendUpdatedText } from './api.js';

var socket = io();

socket.on('connect', function() {
})

socket.on('connect_response', function(data) {
    editor.value = data['text']
})

const editor = document.getElementById('editor');

function handleTextChange() {
    sendUpdatedText(socket, editor.value)
}

editor.addEventListener('input', handleTextChange);

export { handleTextChange };