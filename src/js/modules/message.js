export const message = () => {
    async function displayMessage() {
        const responce = await fetch('/data/hello.json');
        const data = await responce.json();

        const messageElm = document.getElementById('message');
        messageElm.innerHTML = data.message;
    }

    displayMessage();
}
