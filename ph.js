window.onload = function() {
  var phone = document.getElementById("phon");
  phone.value = "+373" + phone.value;
  phone.addEventListener("input", function() {
    if (phone.value.substring(0, 4) !== "+373") {
      phone.value = "+373" + phone.value.substring(4);
    }
  });
}