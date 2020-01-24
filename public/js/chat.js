$(function () {
    var socket = io();

    const sendMessage = () => {
        socket.emit('message_Client_Server', $('#message__area').val())
        $('#message__area').val("");
        $('#message__area').focus();
        $('#message__area').setCursorPosition(0);
    }
    $("#message__area").keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            sendMessage();
        }
    });
    $('#send__message').click(() => {
        sendMessage()
    })
    message__templete = document.querySelector('#message__templete').innerHTML

    socket.on('message_Server_Client', (message) => {
        const html = Mustache.render(message__templete, {
            message,
            userName: "Ahmed Fares",
            sendTime: "12:04 pm"
        })
        console.log(message)
        document.querySelector('#messages__container').insertAdjacentHTML('beforeend', html)
    })
});