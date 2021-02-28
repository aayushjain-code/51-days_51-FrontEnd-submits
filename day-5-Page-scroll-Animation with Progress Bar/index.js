

//////////////////////////////////////////////////////////

gsap.timeline({
    scrollTrigger:{
        trigger:".box",
        start:"center center", //animation start at this point
        end:"bottom top", //animation ends at this point
        markers:false,
        scrub:true,
        pin:true
    }
})

.from(".text1",{x : innerWidth * 1})
.from(".text2",{x : innerWidth * -1})
.from(".text3",{x : innerWidth * 1})
.from(".logo",{
    y : innerHeight * 1,
    rotate : 360
})


////////////////////////////////////////////////////

gsap.timeline({
    scrollTrigger: {
      trigger: ".box2",
      start: "center center", //animation start at this point
      end: "bottom top", //animation ends at this point
      markers: false, 
      scrub: true,
      pin: true,
    },
  })

    // .from(".box2", { x: innerWidth * 1 })
.from(".box2", { opacity : 0 })
.from(".text4",{y : innerHeight * 1})
.from(".text5",{y : innerHeight * 1})
.from(".text6",{y : innerHeight * 1})


////////////////////////////////////////////////////Scroll Bar/////////////////////////////////////

var progressbar = document.getElementById("progressbar");
var percent = document.getElementById("percent");

var totalHeight = document.body.scrollHeight - window.innerHeight;

window.onscroll = function () {
  var progress = (window.pageYOffset / totalHeight) * 100;

  progressbar.style.height = progress + "%";

  percent.innerHTML = "Page Scrolled " + Math.round(progress) + "%";
};