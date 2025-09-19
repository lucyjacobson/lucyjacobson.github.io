document.addEventListener("DOMContentLoaded", () => {
  // INTRO TEXT ANIMATION
  const introText = document.querySelector('.intro-text p');
  if (introText) {
    const text = introText.innerHTML.trim();
    const lines = text.split(/<br\s*\/?>/i);
    introText.innerHTML = ''; 

    lines.forEach((line, i) => {
      const span = document.createElement('span');
      span.innerHTML = line.trim();
      span.style.display = 'block';
      span.style.opacity = 0;
      span.style.transform = 'translateY(-20px)'; 
      span.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      introText.appendChild(span);

      setTimeout(() => {
        span.style.opacity = 1;
        span.style.transform = 'translateY(0)';  
      }, i * 500);  
    });
  }

  //LOGO
  const logo = document.getElementById('logo');

  logo.addEventListener('mouseover', () => {
  logo.src = 'Assets/Logo/Logo.gif';
  });

  logo.addEventListener('mouseout', () => {
  logo.src = 'Assets/Logo/Logo.png';
  });

  // POP-UP MODAL
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const close = document.getElementById('close');
  const backToTop = document.getElementById('backToTop');

  document.querySelectorAll('.popup-img').forEach(img => {
    const openModal = () => {
      modal.style.display = 'block';
      modalImg.src = img.src;
      document.body.style.overflow = 'hidden'; 
      if (backToTop) backToTop.classList.remove('show');
    };
    
    img.addEventListener('click', openModal);
    img.addEventListener('touchend', openModal);
  });

  const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; 
    if (backToTop && window.pageYOffset > 300) {
      backToTop.classList.add('show');
    }
  };

  if (close) {
    close.addEventListener('click', closeModal);
    close.addEventListener('touchend', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    modal.addEventListener('touchend', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // BACK TO TOP BUTTON
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // CAROUSEL LOGIC
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const slides = carousel.querySelectorAll(".carousel-slide");
    const dotsContainer = carousel.nextElementSibling; 
    const prevBtn = carousel.querySelector(".carousel-btn.prev");
    const nextBtn = carousel.querySelector(".carousel-btn.next");
    const carouselImages = carousel.querySelector(".carousel-images");

    let currentIndex = 0;

    function createDots() {
      dotsContainer.innerHTML = ""; 
      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("span");
        dot.classList.add("carousel-dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
          currentIndex = i;
          showSlide(currentIndex);
        });
        dotsContainer.appendChild(dot);
      }
    }

    function showSlide(index) {
      const slideWidth = carousel.clientWidth;
      carouselImages.style.transform = `translateX(-${index * slideWidth}px)`;
      const dots = dotsContainer.querySelectorAll(".carousel-dot");
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    });

    window.addEventListener("resize", () => showSlide(currentIndex));

    createDots();
    showSlide(currentIndex);
  });
});


