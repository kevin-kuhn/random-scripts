(() => {
    let messagesLength = -1;
    let lastMessageLength = -1;
    let events = {};
    
    window.chatbot = {
        sendMessage: function(...args) {
            let message = document.querySelector("*[name=\"chatTextInput\"]");
            let button = message.parentElement.parentElement.parentElement.parentElement.children[1]; // Best way I found
            
            if (message && button) {
                let lastValue = message.value + "";
                message.value = args.join("");
                button.ariaDisabled = null
                button.click();
                
                let success = message.value === "";
                message.value = lastValue;
                
                return success;
            }
            
            return false;
        },
        on: function(event, f) {
            if (!events[event] && typeof(f) == "function")
                events[event] = f
        },
        emit: function(event, ...args) {
            if (events[event])
                events[event](...args);
        }
    }
    if (window.messagesInterval)
        try {
            clearInterval(messagesInterval);
        } catch (err) {}
    window.messagesInterval = setInterval(() => {
        var messages = document.querySelectorAll('[data-sender-name]');
        if (messages) {
            if (messages.length > 0)
                var message = messages[messages.length - 1];
            if (messagesLength === -1) {
                messagesLength = messages.length;
                lastMessageLength = message ? message.childNodes[1].childNodes.length : 0;
            } else if (messagesLength != messages.length || (message && lastMessageLength != message.childNodes[1].childNodes.length)) {
                let messageText = message.childNodes[1].childNodes[message.childNodes[1].childNodes.length - 1].dataset.messageText;
                messagesLength = messages.length;
                lastMessageLength = message.childNodes[1].childNodes.length;
                window.chatbot.emit("message", message.dataset.senderName, messageText, parseInt(message.dataset.timestamp));
            }
        }
    }, 100);
})();
// Sample
var prefix = '';
chatbot.on("message", (username, message, date) => {
    let m_prefix = message.slice(0, prefix.length);
    let splitted = message.slice(prefix.length).toLowerCase().split(' ');
    
    if (m_prefix === prefix) {
        switch (splitted[0]) {
            case "ok":
                chatbot.sendMessage("GENTE ALGM AI GOSTA DE CLUB PENGUIN? ESTOU JOGANDO AGR!");
                break;
            case "calc":
                let expression = splitted.slice(1).join("").replace(/[^-()\d/*+.]/g, "");
                let value = eval(expression); 
                
                if (value)
                    chatbot.sendMessage("Expression:  ", expression, "\nResult: ", value);
                break;
            case "oi":
                chatbot.sendMessage('(Só você consegue ver isso) O Google informa que o seguinte arquivo: feetsuckerfever.exe baixado no site: www.xvideoscom é malicioso, desconecte sua máquina agora! ');
                break;
            case "kkk":
                chatbot.sendMessage('O Google identificou a presença do caracter k em seu texto, infelizmente sua conta será comprometida devido a um suspeita de envolvimento com associações criminosas');
                break;
            case "invite":
                chatbot.sendMessage("Invite URL: ", window.location.href.split('?')[0]);
                break;
            default:
                chatbot.sendMessage("Professor olha esse video aqui: https://bit.ly/3iLICz2");
                break;
        }
    }
})