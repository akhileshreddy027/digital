document.addEventListener("DOMContentLoaded", () => {
  // Check if loader has already been shown
  if (!sessionStorage.getItem("loaderShown")) {
    // Loader animation
    const t1 = gsap.timeline();

    t1.to("#loader .animate h1, #loader .animate h2", {
      y: -100,
      duration: 1,
      stagger: 0.3,
      delay: 0.2,
    })
    .to(".second .heading p", {
      y: -215,
      duration: 1,
    })
    .to("#loader", {
      top: "-100vh",
      duration: 3,
      delay: 0.3,
      ease: "power4.inOut",
    })
    .eventCallback("onComplete", () => {
      // Mark loader as shown
      sessionStorage.setItem("loaderShown", "true");
    });
  }
  const container = document.querySelector(".container");
  const pages = document.querySelectorAll(".page");
  const numbers = document.querySelectorAll('.number-indicator');
  const totalPages = pages.length;
  let currentPage = 0;
  let isThrottled = false;
  let animating = false; // To avoid overlapping animations

  function updateNumberStyles() {
    numbers.forEach((num, index) => {
      if (index === currentPage) {
        num.style.backgroundColor = 'red';
        num.style.color = 'green';
      } else {
        num.style.backgroundColor = '';
        num.style.color = '';
      }
    });
  }

  function createPageTransitionTimeline(fromPage, toPage, direction) {
    const tl = gsap.timeline();

    // Page transition effect
    if (direction === 'up') {
      tl.to(fromPage, {
        duration: 1,
        scale: 0.9,
        transformOrigin: "bottom center",
        ease: "power2.inOut",
        onStart: () => {
          fromPage.classList.add("outgoing");
        },
        onComplete: () => {
          fromPage.classList.remove("outgoing");
        },
      }).to(
        toPage,
        {
          duration: 1,
          scale: 1,
          ease: "power2.inOut",
          onStart: () => {
            toPage.classList.add("incoming");
            toPage.classList.remove("outgoing");
            triggerAnimation(currentPage);
          },
        },
        0
      );
    } else if (direction === 'down') {
      tl.to(fromPage, {
        duration: 1,
        scale: 0.9,
        transformOrigin: "top center",
        ease: "power2.inOut",
        onStart: () => {
          fromPage.classList.add("outgoing");
        },
        onComplete: () => {
          fromPage.classList.remove("outgoing");
        },
      }).to(
        toPage,
        {
          duration: 1,
          scale: 1,
          ease: "power2.inOut",
          onStart: () => {
            toPage.classList.add("incoming");
            toPage.classList.remove("outgoing");
            triggerAnimation(currentPage);
          },
        },
        0
      );
    }

    return tl;
  }

  function updatePagePositions(nextPage) {
    if (animating) return;

    const fromPage = pages[currentPage];
    const toPage = pages[nextPage];
    const direction = nextPage > currentPage ? 'down' : 'up';

    if (toPage) {
      animating = true;
      createPageTransitionTimeline(fromPage, toPage, direction)
        .play()
        .eventCallback("onComplete", () => {
          animating = false; // Reset the animation flag
        });
      currentPage = nextPage; 
      // Update the current page only after transition is started
    }
    updateNumberStyles(); // Update the number styles based on the current page
  }

  function handleScroll(event) {
    if (isThrottled || animating) return;

    isThrottled = true;
    setTimeout(() => {
      isThrottled = false;
    }, 1500); // Throttle time to match the animation duration (1.5s)

    const nextPage = event.deltaY > 0 ? currentPage + 1 : currentPage - 1;

    if (nextPage >= 0 && nextPage < totalPages && nextPage !== currentPage) {
      updatePagePositions(nextPage);
    }
  }

  document.addEventListener("wheel", handleScroll);

  function updateNumberHighlight() {
    numbers.forEach((number, index) => {
      if (index === currentPage) {
        number.classList.add("active");
      } else {
        number.classList.remove("active");
      }
    });
  }

  function scrollToPage(index) {
    if (index >= 0 && index < totalPages) {
      updatePagePositions(index);
    }
  }

  function initializePages() {
    pages.forEach((page, index) => {
      if (index === currentPage) {
        page.classList.add("incoming");
      } else {
        page.classList.remove("incoming");
        page.classList.add("outgoing");
      }
    });
  }

  initializePages();

  function triggerAnimation(pageIndex) {
    gsap.killTweensOf("*"); // Kill any ongoing animations

    switch (pageIndex) {
      case 0:
        // Page 1 animations
        gsap.fromTo(
          "img",
          { scale: 1.1 },
          { scale: 1, duration: 1.5, ease: "power4.inOut" }
        );
        gsap.from(".heading p", {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power1.out",
        });
        break;
      case 1:
        // Page 2 animations
        gsap.fromTo(
          "img",
          { scale: 1.1 },
          { scale: 1, duration: 1.5, ease: "power4.inOut" }
        );
        gsap.from(".marketing h1, .marketing .head p, .marketing .heading p, .marketing .para li, .marketing a", {
          y: 10,
          opacity: 0,
          stagger: 0.5,
          duration: 1,
          delay: 2,
          ease: "power1.out",
        });
        gsap.fromTo(
          ".green",
          { width: "0vw", left: "100%" },
          { width: "100%", left: "-100%", duration: 1.5, stagger: 0.3, delay: 1, ease: "power4.inOut" }
        ).to(
          ".green",
          { width: "0vw", left: "-50%", duration: 1.5, stagger: 0.3, ease: "power4.inOut" },
          "+=1"
        );
        break;
      case 2:
        gsap.fromTo(
          "img", // Replace with your image class
          {
            scale: 1.1, // Start at normal size
          },
          {
            scale: 1, // Zoom in
            duration: 1.5,
            ease: "power4.inOut",
          }
        );
        gsap.from(".website h1, .website .head p,.website .heading p, .website .para li,.website a", {
          y: 10,
          opacity: 0,
          stagger: 0.3,
          duration: 1,
          delay:2,
          ease: "power1.out",
        });
       
        gsap.fromTo(
          ".green",
          {
            width: "0vw", // Start with a width of 0
            left: "100%",
         // Start from off-screen right
          },
          {
            width: "100%", // Expand green div to its final width
            left: "-100%", // Move into view from the right
            duration: 1.5,
            stagger: 0.3,
    
            ease: "power4.inOut",
          }
        ).to(
          ".green",
          {
            width: "0vw", // Collapse back to 0 width
            left: "-50%", // Move off-screen left
            duration: 1.5,
            stagger: 0.3,
            ease: "power4.inOut",
          },
          "+=1" // Start collapsing 1 second after expanding
        );
        break;
      case 3:
        gsap.fromTo(
          "img", // Replace with your image class
          {
            scale: 1.1, // Start at normal size
          },
          {
            scale: 1, // Zoom in
            duration: 1.5,
            ease: "power4.inOut",
          }
        );
        gsap.from(".Graphic h1, .Graphic .head p,.Graphic .heading p,.Graphic .para li,.Graphic a", {
          y: 10,
          opacity: 0,
          stagger: 0.3,
          duration: 1,
          delay:2,
          ease: "power1.out",
        });
        gsap.fromTo(
          ".green",
          {
            width: "0vw", // Start with a width of 0
            left: "100%",
         // Start from off-screen right
          },
          {
            width: "100%", // Expand green div to its final width
            left: "-100%", // Move into view from the right
            duration: 1.5,
            stagger: 0.3,
      
            ease: "power4.inOut",
          }
        ).to(
          ".green",
          {
            width: "0vw", // Collapse back to 0 width
            left: "-50%", // Move off-screen left
            duration: 1.5,
            stagger: 0.3,
            ease: "power4.inOut",
          },
          "+=1" // Start collapsing 1 second after expanding
        );
        break;
      case 4:
        gsap.fromTo(
          "img", // Replace with your image class
          {
            scale: 1.1, // Start at normal size
          },

          {
            scale: 1, // Zoom in
            duration: 1.5,
            ease: "power4.inOut",
          }
        );
        gsap.from(".CA h1, .CA .head p,.CA .heading p,.CA .para li,.CA a", {
          y: 10,
          opacity: 0,
          stagger: 0.3,
          duration: 1,
          delay:2,
          ease: "power1.out",
        });
      
        gsap.fromTo(
          ".green",
          {
            width: "0vw", // Start with a width of 0
            left: "100%",
         // Start from off-screen right
          },
          {
            width: "100%", // Expand green div to its final width
            left: "-100%", // Move into view from the right
            duration: 1.5,
            stagger: 0.3,
          
            ease: "power4.inOut",
          }
        ).to(
          ".green",
          {
            width: "0vw", // Collapse back to 0 width
            left: "-50%", // Move off-screen left
            duration: 1.5,
            stagger: 0.3,
            ease: "power4.inOut",
          },
          "+=1" // Start collapsing 1 second after expanding
        );
        break;
      case 5:
        gsap.fromTo(
          "img", // Replace with your image class
          {
            scale: 1.1, // Start at normal size
          },
          {
            scale: 1, // Zoom in
            duration: 1.5,
            ease: "power4.inOut",
          }
        );
        gsap.from(".Branding h1, .Branding .head p,.Branding .heading p, .Branding .para li,.Branding a", {
          y: 10,
          opacity: 0,
          stagger: 0.3,
          duration: 1,
          delay:2,
          ease: "power1.out",
        });
     
        gsap.fromTo(
          ".green",
          {
            width: "0vw", // Start with a width of 0
            left: "100%",
         // Start from off-screen right
          },
          {
            width: "100%", // Expand green div to its final width
            left: "-100%", // Move into view from the right
            duration: 1.5,
            stagger: 0.3,
        
            ease: "power4.inOut",
          }
        ).to(
          ".green",
          {
            width: "0vw", // Collapse back to 0 width
            left: "-50%", // Move off-screen left
            duration: 1.5,
            stagger: 0.3,
            ease: "power4.inOut",
          },
          "+=1" // Start collapsing 1 second after expanding
        );
        break;
      case 6:
        gsap.fromTo(
          "img", // Replace with your image class
          {
            scale: 1.1, // Start at normal size
          },
          {
            scale: 1, // Zoom in
            duration: 1.5,
            ease: "power4.inOut",
          }
        );
        gsap.from(".RealEstate h1, .RealEstate .head p,.RealEstate .heading p, .RealEstate .para li,.RealEstate a", {
          y: 10,
          opacity: 0,
          stagger: 0.3,
          delay:2,
          duration: 1,
          ease: "power1.out",
        });
        gsap.fromTo(
          ".green",
          {
            width: "0vw", // Start with a width of 0
            left: "100%",
         // Start from off-screen right
          },
          {
            width: "100%", // Expand green div to its final width
            left: "-100%", // Move into view from the right
            duration: 1.5,
            stagger: 0.3,
          
            ease: "power4.inOut",
          }
        ).to(
          ".green",
          {
            width: "0vw", // Collapse back to 0 width
            left: "-50%", // Move off-screen left
            duration: 1.5,
            stagger: 0.3,
            ease: "power4.inOut",
          },
          "+=1" // Start collapsing 1 second after expanding
        );
        break;
      case 7:
        gsap.fromTo(
          "img", // Replace with your image class
          {
            scale: 1.1, // Start at normal size
          },
          {
            scale: 1, // Zoom in
            duration: 1.5,
            ease: "power4.inOut",
          }
        );
        gsap.from(".franchise h1, .franchise .head p,.franchise .heading p, .franchise .para li,.franchise a", {
          y: 10,
          opacity: 0,
          stagger: 0.3,
          duration: 1,
          delay:2,
          ease: "power1.out",
        });
        gsap.fromTo(
          ".green",
          {
            width: "0vw", // Start with a width of 0
            left: "100%",
         // Start from off-screen right
          },
          {
            width: "100%", // Expand green div to its final width
            left: "-100%", // Move into view from the right
            duration: 1.5,
            stagger: 0.3,
          
            ease: "power4.inOut",
          }
        ).to(
          ".green",
          {
            width: "0vw", // Collapse back to 0 width
            left: "-50%", // Move off-screen left
            duration: 1.5,
            stagger: 0.3,
            ease: "power4.inOut",
          },
          "+=1" // Start collapsing 1 second after expanding
        );
        
        break;
        case 8:
        // Page 8 animations
        gsap.fromTo(
          "img",
          { scale: 1.1 },
          { scale: 1, duration: 1.5, ease: "power4.inOut" }
        );
        gsap.from(".startup h1, .startup .head p, .startup .heading p, .startup .para li, .startup a", {
          y: 10,
          opacity: 0,
          stagger: 0.3,
          duration: 1,
          delay: 2,
          ease: "power1.out",
        });
        gsap.fromTo(
          ".green",
          { width: "0vw", left: "100%" },
          { width: "100%", left: "-100%", duration: 1.5, stagger: 0.3, ease: "power4.inOut" }
        ).to(
          ".green",
          { width: "0vw", left: "-50%", duration: 1.5, stagger: 0.3, ease: "power4.inOut" },
          "+=1"
        );
        break;
    }
  }

  // Initialize Typed.js Text Animation
  updatePagePositions();
  new Typed(".auto", {
    strings: [
      "Digital Marketing",
      "Web Development",
      "Branding",
      "CA & Accounting",
      "Graphic Designing",
      "App Development",
    ],
    typeSpeed: 100,
    backSpeed: 100,
    loop: true,
  });
});

function openSidebar() {
  document.getElementById("Sidebar").classList.add("open");
  document.querySelector(".content").classList.add("sidebar-open");
}

function closeSidebar() {
  document.getElementById("Sidebar").classList.remove("open");
  document.querySelector(".content").classList.remove("sidebar-open");
}

const t1 = gsap.timeline();

t1.to("#loader .animate h1, #loader .animate h2", {
  y: -50,
  duration: 1,
  stagger: 0.3,
  delay: 0.2,
})
.to(".second .heading p", {
  y: -215,
  duration: 1,
})
.to("#loader", {
  top: "-100vh",
  duration: 3,
  delay: 0.3,
  ease: "power4.inOut",
});