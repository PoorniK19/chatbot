function validate(){
    let username=document.getElementById("name").value;
    let password=document.getElementById("pass").value;

    if(username === "20BCA55" && password === "01/01/2003"){
        window.location.assign("student/student.html");
        alert("Login Successfull");
    }
    else{
        alert('Login failed');
    }
}