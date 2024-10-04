window.addEventListener('load', () => {
    const t1 = gsap.timeline();

    t1.to("#loader .animate h1, #loader .animate h2", {
        y: -130,
        stagger: 0.3,
        duration: 1,
        delay: 0.2
    })
    .to("#loader", {
        top: "-100vh",  // Move loader out of the screen upwards
        duration: 2,
        ease: "power4.inOut"
    }, "-=0.5")  
    .to(".story-content", {
        y: "-100vh",  // Move loader out of the screen upwards
        duration: 1,
        stagger: 0.3,
        ease: "power4.inOut"
    }, "-=0.5")  
    .from(".about p,.about h2",{
        y: 10,
        stagger: 0.3,
        duration: 2,
        ease: "power4.inOut"
    })
   
});
document.getElementById('backButton').addEventListener('click', function() {
    window.history.back();
  });
  

function openSidebar() {
    document.getElementById("Sidebar").classList.add("open");
    document.querySelector(".content").classList.add("sidebar-open");
  }
  
  function closeSidebar() {
    document.getElementById("Sidebar").classList.remove("open");
    document.querySelector(".content").classList.remove("sidebar-open");
  }