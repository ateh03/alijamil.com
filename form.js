function validateForm() {
if (isEmpty(document.getElementById('email1').value.trim())) {
alert('A valid email is required.');
return false;
}
if (!validateEmail(document.getElementById('email1').value.trim())) {
alert('The email address does not appear to be valid.');
return false;
}
if (isEmpty(document.getElementById('country1').value.trim())) {
alert('Country is required.');
return false;
}

return true;
}
function isEmpty(str) { return (str.length === 0 || !str.trim()); }
function validateEmail(email) {
var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,15}(?:\.[a-z]{2})?)$/i;
return isEmpty(email) || re.test(email);
}

function emailSuccess() {
if(validateForm(true)) {

alert("You're now subscribed to: Ali Jamil");
  }
}




