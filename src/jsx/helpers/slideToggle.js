const slideToggle = (target) => {
  const container = target;
  if (!container.classList.contains('active')) {
    container.classList.add('active');
    container.style.height = 'auto';
    const height = `${container.clientHeight}px`;
    container.style.height = '0px';
    setTimeout(() => {
      container.style.height = height;
    }, 0);
  } else {
    container.style.height = '0px';
    container.addEventListener('transitionend', () => {
      container.classList.remove('active');
    }, {
      once: true
    });
  }
};

export default slideToggle;
