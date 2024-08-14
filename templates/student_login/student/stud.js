var msg=[];
function att_resp(){
    ans='ATTENDANCE<br><b>Software Testing: </b>92%<br><b>Android: </b>93%<br><b>Android Practical: </b>95%';
    let msg2 = { name: "Wednesday", message: ans };
    msg.push(msg2);
    updatechat();
}
function cia_resp(){
    ans='CIA I<br><b>Software Testing: </b>32<br><b>Android: </b>33<br><b>Android Practical: </b>40<br><br>CIA II<br><b>Software Testing: </b>31<br><b>Android: </b>34<br><b>Android Practical: </b>40';
    let msg2 = { name: "Wednesday", message: ans };
    msg.push(msg2);
    updatechat();
}
function sem_resp(){
    ans= 'SEMESTER<br><b>Software Testing: </b>92<br><b>Android: </b>93<br><b>Android Practical: </b>100';  
    let msg2 = { name: "Wednesday", message: ans };
    msg.push(msg2);
    updatechat();
}
function speech_text(){
    this.state=!this.state;
    var final_transcript='';
    var interim_transcript='';
    if(this.state){
        var ouput=document.querySelector('.chatbox__messages');
        var action=document.getElementById('action');
        var SpeechRecognition= SpeechRecognition || webkitSpeechRecognition;
        var recognition=new SpeechRecognition();

        recognition.onstart=function(){
            action.innerHTML="<small>Listening please speak...</small>";
        }
        recognition.onspeeched=function(){
            action.innerHTML="<small>stopped listening,Hope you are completed...</small>";
        }
        recognition.onresult=function(event){
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                  final_transcript = event.results[i][0].transcript;
                } else {
                  interim_transcript = event.results[i][0].transcript;
                }
              }
            let msg1 = { name: "User", message: final_transcript }
            msg.push(msg1);
            console.log(final_transcript);
            display(final_transcript);
        }
        recognition.start();
    }
    else{
        var action=document.getElementById('action');
        var SpeechRecognition= SpeechRecognition || webkitSpeechRecognition;
        var recognition=new SpeechRecognition();
        recognition.stop();
        action.innerHTML="";
    }
}

function display(text1){
    var val=String(text1)
    fetch('http://127.0.0.1:5000/user', {
            method: 'POST',
            body: JSON.stringify({ message: val }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
            let msg2 = { name: "Wednesday", message: r.answer };
            msg.push(msg2);
            updatechat();
        }).catch((error) => {
            console.error('Error:', error)
          });   
}

function updatechat(){
  var html = '';
  msg.slice().reverse().forEach(function(item, index) {
  if (item.name === "Wednesday")
  {
    html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
  }
  else
  {
    html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
  }
  });
  const chatmessage = document.querySelector('.chatbox__messages');
  chatmessage.innerHTML = html;
}
