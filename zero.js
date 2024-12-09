var input = document.getElementById("phon");

  input.addEventListener("input", function() {
    if (input.value.charAt(4) === "0") {
      input.value = input.value.slice(1);
    }
  });