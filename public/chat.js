// FRONT-END JS

//Make connection
const socket = io.connect("http://localhost:8000")

const message = document.getElementById('message')
const user = document.getElementById('user')
const output = document.getElementById('output')
const btn = document.getElementById('send')
const feedback = document.getElementById('feedback')


//Events

btn.addEventListener('click', () => {
    if (message.value && user.value) {
        socket.emit('chat', {
            message: message.value,
            user: user.value
        })
    }

    message.value = ''
    user.value = ''
})

message.addEventListener('keypress', () => {
    socket.emit('typing', user.value)
})

//Listen for events
socket.on('chat', (data) => {
    output.innerHTML += `<p><b>${data.user}:</b> ${data.message}</p>`
    feedback.innerHTML = ""
})

socket.on('typing', (data) => {
    feedback.innerHTML = `<p><em>${data} is typing.....</em></p>`
})
