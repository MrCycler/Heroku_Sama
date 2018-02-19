var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

/*var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
*/
/*
var serialPort = new SerialPort("/dev/cu.usbmodem14131", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
});
*/
const APP_TOKEN ='EAACj7WZBrSiABAGBfVnLfS6TZA4vO34LMN6ieF2fjvJXtY5i0w6T1yRHaGz2ZCgw3FACiygXupFqB4DZAZCnnc1MZC6UL6nVNw3ZAZChH57H98Q3YZBC6yckR3nLuq5oRrPsAk1GcbO1fOMtXYLgAa452IGoaNncxsfR8eUhwNW4ZCzwZDZD';

var app = express();
app.use(bodyParser.json());

console.log("El servidor esta en el puerto 3000");
    app.listen(3000,function (){
});

app.get('/',function(req,res){
    res.send('Bienvenido al taller');
});

app.get('/webhook',function(req,res){
    if(req.query['hub.verify_token']==='token_rkz')
    {
        res.send(req.query['hub.challenge']);
    }else
    {
        res.send('Largate');
    }
});

app.post('/webhook',function(req,res){
    var data = req.body;
    if(data.object =='page')
    {
        data.entry.forEach(function(pageEntry)
    {
        pageEntry.messaging.forEach(function(messagingEvent)
    {
        if(messagingEvent.message)
        {
            receiveMessage(messagingEvent);
        }
    }    
    );
    });
    res.sendStatus(200);
    }
});

function receiveMessage(event){
    var senderID = event.sender.id;
    var messageText = event.message.text;
    evaluateMessage(senderID,messageText);
}

function evaluateMessage(senderID,message){
    var finalMessage = 'Estimado cliente lo atenderan en un momento';
    if (isContain(message,'Hola'))
    {
        finalMessage = 'Hola amiguit@';
    }
	if(isContain(message,'mejor heroe de RKZ'))
    {
        finalMessage = 'El pangolin';
    }
    if(isContain(message,'Hailo'))
    {
		finalMessage = 'Es un correlon';
    }
    if(isContain(message,'Joel'))
	{
        finalMessage = 'Es un vago dotero';
	}
     if(isContain(message,'Pedro'))
	{
        finalMessage = 'Es un sacolargo';
	}  
	 if(isContain(message,'nani'))
	{
        finalMessage = 'omaigua mo shindeiru';
	}
	 if(isContain(message,'ctmr'))
	{
        finalMessage = 'yamero';
	}
    sendMessageText(senderID,finalMessage);
}

function sendMessageText(recipientId,message)
{   var messageDate ={
    recipient :{
        id : recipientId
    },
    message:{
        text:message
    }
    };
    callSendAPI(messageDate);
}

function callSendAPI(messageData){
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs : {access_token : APP_TOKEN},
        method: 'POST',
        json: messageData
    },function(error,response,data){
        if(error){
            console.log('Me fui a la mrd');
        }
        else
        {
            console.log('Ya le respondi papi');
        }
    });
}

function isContain(sentence,word){
    return sentence.indexOf(word)>-1;
}

