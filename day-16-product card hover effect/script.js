$(document).ready(function () {
  $(".size li").click(function () {
    $(this).addClass("active").siblings().removeClass("active"); //line imp h
  });

  $(".colors span").click(function () {
    $(this).addClass("active").siblings().removeClass("active");

    let image = $(this).attr("data-image");
    $(".image img").attr("src", image);

    let color = $(this).css("background");
    $(".content .btn").css("background", color);
  });
});
