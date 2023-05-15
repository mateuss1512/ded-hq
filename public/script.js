function smoothScroll(target) {
    const element = document.querySelector(target);
    window.scrollTo({
      top: element.offsetTop,
      behavior: 'smooth'
    });
  }
  
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); 
      const target = link.getAttribute('href'); 
      smoothScroll(target); 
    });
  });
  