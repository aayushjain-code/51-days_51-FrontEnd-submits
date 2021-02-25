
for(let i=1;i<= 100; i++){
    let box = document.createElement('div');
    box.classList.add('txtBox');
    box.innerHTML = "Front <span>-End-</span> projects";
    document.querySelector('.text').appendChild(box); 
}   
 
document.body.addEventListener("mousemove",e=>{
    gsap.to('.txtBox',{
        x:e.clientX,
        y:e.clientY,
        stagger: -0.005,
        rotate :(i,target) =>{
            return(i + 1)*0.1;
        }
    })
})