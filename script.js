const locoScroll=()=>{
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});


}

// var main = document.querySelector("#main");
// var cursor = document.querySelector("#cursor");
// main.addEventListener("mousemove",function(dets){
//     gsap.to(cursor,{
//      x:dets.clientX-25,
//      y:dets.clientY-25,
//      duration:0.7,
//      ease:"power.out"
//     })
// }) 
function startLoader(){
    let counterElement = document.querySelector(".counter");
    let currentValue = 0;
    function updateCounter(){
        if(currentValue === 100){
            locoScroll();
            return;
        }
        currentValue += Math.floor(Math.random()*10)+1;
        if(currentValue > 100){
            currentValue =100;
        }
        counterElement.textContent = currentValue;
        let delay = Math.floor(Math.random()*200)+50;
        setTimeout(updateCounter,delay)
    }
updateCounter();
}
startLoader();

gsap.to(".counter", 0.25,{
    delay:3.5,
    opacity:0,
});
gsap.to(".bar",1.5,{
    delay:3.5,
    height:0,
    stagger:{
        amount:0.5,
    },
    ease:"power4.inOut",
});
gsap.from(".h1",1.5,{
    delay:4,
    y:700,
    stagger:{
        amount:0.5,
    },
    ease:"power4.inOut",
});
gsap.from(".hero",2, {
    delay:4.5,
    y:400,
    ease:"power4.inOut",
});
