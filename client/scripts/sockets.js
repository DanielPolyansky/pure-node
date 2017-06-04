const socket = io();
let sending_btn = document.getElementById('send');
let message = document.getElementById('message');
let output = document.getElementById('output');
sending_btn.addEventListener('click', () => {
    console.log('send button was clicked');
    socket.emit('new_msg', {
        message: message.value
    });
    message.value = '';
});

socket.on('new_income_msg', (data) => {
    output.innerHTML += '<p>' + data.message + '</p>';
});