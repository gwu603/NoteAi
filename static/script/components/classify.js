import { startLoading, stopLoading } from "./loading.js";
import { postClassifyRequest, getClassifyRequest } from "../services/api/api.js";
import { updateEditorText, handleTextChange } from "./editor.js";

const classifyButton = document.getElementById('classifyButton');
const editor = document.getElementById('editor');

async function onClick() {
    const pulled_text = editor.value
                                .split(/\n+/)
                                .filter(x => x)
                                .map(x => x.trim());

    startLoading();
    await postClassifyRequest(pulled_text);
    getClassifyRequest()
        .then((response) => response.json())
        .then((data) => {
            updateEditorText(data);
            handleTextChange();
            stopLoading();
        }
    );
}

classifyButton.addEventListener('click', onClick);
