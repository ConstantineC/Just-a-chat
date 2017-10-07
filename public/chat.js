// Make connection
const socket = io.connect('http://localhost:4000'); 

// Query DOM
var element = function(id) {
    return document.getElementById(id);
}


const message = element('message');
const handle = element('handle');
const btn = element('send');
const output = element('output');
const feedback = element('feedback');

// Emit events

btn.addEventListener('click', function() {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', function() {
    socket.emit('typing', handle.value)
});

// Listen for events
socket.on('chat', function(data) {
    feedback.innerHTML = '';
    output.innerHTML += `<p><strong> ${data.handle}: </strong> ${data.message} </p>`;
}); 

socket.on('typing', function(data) {
    feedback.innerHTML = `<p><em> ${data} is typing a message...</em></p>`;
});