const spinner = document.getElementById('spinner');

function startLoading() {
    document.onkeydown = () => false;
    document.onclick = () => false;
    document.body.classList.add('no-scroll');
    spinner.style.display = 'flex';
}

function stopLoading() {
    document.onkeydown = () => true;
    document.onclick = () => true;
    document.body.classList.remove('no-scroll');
    spinner.style.display = 'none';
}

export { startLoading, stopLoading };