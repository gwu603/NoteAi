import { postClassifyRequest, getClassifyRequest } from './api.js';
import { handleTextChange } from './websocket.js';

const editor = document.getElementById('editor');

function update_editor_text(text) {
    let x = Array.from(text)
    editor.value = ""
    x.forEach( pair => {
        editor.value += pair["text"] + ": " + pair["class"] + "\n";
    });
}
async function handleClassifyButtonClick() {
    const pulled_text = editor.value
                                .split(/\n+/)
                                .filter(x => x)
                                .map(x => x.trim());

    await postClassifyRequest(pulled_text)
    getClassifyRequest()
        .then((response) => response.json())
        .then((data) => {
            update_editor_text(data)
            handleTextChange()
        }
    );
}

const classifyButton = document.getElementById('classifyButton');
classifyButton.addEventListener('click', handleClassifyButtonClick);