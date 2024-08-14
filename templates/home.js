var msg=[];
function facility_resp(){
    ans='<b>Facilities</b><br>Information Resource Center(Library)<br>Bank<br>Xerox Centre<br>Canteen<br>Kisok<br>RO Plant<br>ELS Store<br>Non Residents Common Room<br>Hostel';
    let msg2 = { name: "Wednesday", message: ans };
    msg.push(msg2);
    updatechat();
}

function ug_resp(){
    ans='<b>Undergraduate Programs:</b><br><b>SHIFT-1(Government Aided):</b><br><br>1.B.A. History <br>2.B.A. English <br>3.B.Sc. Mathematics <br>4.B.Sc. Physics <br>5.B.Sc. Chemistry <br>5.B.Sc. Plant Biology & Plant Biotechnology <br>6.B.Sc. Advanced Zoology & Biotechnology <br>7.B.Sc. Home Science - Nutrition Food Service Management & Dietetics (General & Vocational Streams) <br>8.B.Sc. Computer Science B.Sc. Psychology<br><b>SHIFT 2(Self-financed):</b><br><br>1. B.Com.<br>2. B.Com. (General)<br>3. B.Com. (Accounting & Finance)<br>4. B.Com. (ComputerApplications)<br>5. B.Com. (Honours)<br>6. B.B.A.<br>7. B.C.A.<br>8. B.A. Corporate Economics<br>9. B.Sc. Visual Communication<br>10. B.Sc. Information Technology<br>11. B.Sc. Psychology'; 
    let msg2 = { name: "Wednesday", message: ans };
    msg.push(msg2);
    updatechat();
}

function pg_resp(){
    ans='<b>Postgraduate Programs :</b><br><b>SHIFT-1(Government Aided):</b><br><br>1.M.Sc. Home Science - Foods & Nutrition<br>2. M.Sc. Home Science - Food Service Management & Dietetic<br>3. M.Sc. Applied Psychology (with specialization in Organizational Behaviour /Counselling & Psychotherapy)<br><b>SHIFT 2(Self-financed):</b><br><br>1. M.Sc. Mathematics<br>2. M.Sc. Physics<br>3. M.Sc. Chemistry<br>4. M.Sc. Biotechnology<br>5. M.Sc. Information Technology<br>6. M.A. Communication<br>7. M.A. Human Resource Management<br>8. M.A. English<br>9. M.A. International Studies<br>10.M.Com. (General)';  
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
    fetch('http://127.0.0.1:5000/predict', {
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