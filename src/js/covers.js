function scroll() {
    const coversSection = document.querySelector('.covers-section');
    const lists = document.querySelectorAll('.covers-list');
  
    if (isViewport(coversSection)) {
      lists.forEach(list => list.classList.add('animate'));
    } else {
      lists.forEach(list => list.classList.remove('animate'));
    }
  }
  