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
    }, "-=0.5")  // Overlap with the previous animation
    .to(".green", {
        height: '100vh',  // Expand green div to full screen height
        duration: 1,
        ease: "power4.inOut"
    }, "-=1.5")  // Increased overlap with the previous animation
    .to(".green", {
        top: '-100vh',  // Move green div from the bottom to cover the screen
        duration: 1,
        ease: "power4.inOut"
    }, "-=0.5")  // Overlap with the previous animation
    .to(".blue", {
        height: '100vh',  // Expand blue div to full screen height
        duration: 1,
        ease: "power4.inOut"
    }, "-=1.5")
    .to(".blue", {
        top: '-100vh',  // Move blue div from the bottom to cover the screen
        duration: 1,
        ease: "power4.inOut"
    }, "-=0.5")
    .to('.page-content', {
        opacity: 1,
        duration: 1,
        y: 0,
        ease: 'power2.out'
    }, '-=0.5') // Start shortly before the overlays finish

    // Animate Headings
    .from('.head h1', {
        opacity: 0,
        y: 50,
        duration: 2,
        ease: 'power2.out',
        stagger: 0.3 // Stagger the animation for multiple headings
    }, '-=0.3') // Delay to make sure the content is visible

    // Animate Paragraphs
    .from('.head p,.ser h1', {
        opacity: 0,
        y: 30,
        duration: 2,
        ease: 'power2.out',
       
    }, '-=1.7')  // Adjust overlap with heading animation
   
    // Animate Cards
    .from('.container h2,.card', {
        opacity: 0,
        y: 50,
        duration: 2,
        ease: 'power2.out',
        stagger: 0.2, // Stagger the animation for each card
        
    }, '-=1.5') // Adjust overlap with paragraph animation

    // Animate 'Why Choose Us?' Section
    .from('.choose h1', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        delay: 1.2
    }, '-=1.3') // Adjust overlap

    .from('.choose p', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power2.out',
        delay: 1.5,
        stagger: 0.3 // Stagger the animation for each paragraph
    }, '-=1.2'); // Adjust overlap
});
document.getElementById('backButton').addEventListener('click', function() {
    window.history.back();
  });
  