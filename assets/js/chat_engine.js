class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');
        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets....!');

            self.socket.emit('join_room', {
                user_email : self.userEmail,
                chatroom : 'codeial'
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined !', data);
            });

        });

        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if(msg != ''){
                console.log("button clicked");
                self.socket.emit('send_message', {
                    message : msg,
                    user_email : self.userEmail,
                    chatroom : 'codeial'
                })
            }

            $('#chat-message-input').val('');
        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);

            let newMessage = $('<li>');

            let messageType = 'other-message';

            if(data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<div>', {
                'class' : 'message-container',
                'html' : data.user_email
            }));

            let realMessageDiv = ($('<div>', {
                'class' : 'real-message',
                'html' : data.message
            }));

            newMessage.find('.message-container').append(realMessageDiv);
            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }

}