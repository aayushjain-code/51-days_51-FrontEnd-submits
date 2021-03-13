$(document).ready(function () {
  $("#slider1, #slider2, #slider3, #slider4").on("input", function () {
    let slider1 = $("#slider1").val();
    let slider2 = $("#slider2").val();
    let slider3 = $("#slider3").val();
    let slider4 = $("#slider4").val();

    $("#output").css("border-top-right-radius", slider1 + "%");
    $("#output").css("border-top-left-radius", slider2 + "%");
    $("#output").css("border-bottom-right-radius", slider3 + "%");
    $("#output").css("border-bottom-left-radius", slider4 + "%");

    $("#box").val(
      "border-radius:" +
        slider1 +
        "% " +
        slider2 +
        "% " +
        slider3 +
        "% " +
        slider4 +
        "%;"
    );
  });
});

function copyPassword() {
  var copyPassText = document.getElementById("box");
  copyPassText.select();
  copyPassText.setSelectionRange(0, 9999);
  document.execCommand("copy");
}
