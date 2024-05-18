import { sendText } from "../services/socket.js"

const editor = document.getElementById('editor');
var socket = io();

socket.on('connect', function() {})

socket.on('connect_response', function(data) {
    editor.value = data['text']
})

function updateEditorText(text) {
    let x = Array.from(text)
    editor.value = ""
    x.forEach( pair => {
        editor.value += pair["text"] + ": " + pair["class"] + "\n";
    });
}

function handleTextChange() {
    sendText(socket, 'update_text', editor.value);
}

editor.addEventListener('input', handleTextChange);

export { updateEditorText, handleTextChange }
