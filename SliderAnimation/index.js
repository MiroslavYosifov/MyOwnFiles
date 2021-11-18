var slider = document.getElementById('slider'),
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next');

function slide(wrapper, items, prev, next) {
  var posInitial,
      slides = items.getElementsByClassName('slide'),
      slidesLength = slides.length,
      slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
      index = 0,
      allowShift = true;
  
  // Clone first and last slide
  // items.appendChild(cloneFirst);
  // items.insertBefore(cloneLast, firstSlide);
  wrapper.classList.add('loaded');
  
  // Click events
  prev.addEventListener('click', function () { shiftSlide(-1) });
  next.addEventListener('click', function () { shiftSlide(1) });

  // Transition events
  items.addEventListener('transitionend', checkIndex);
  
  function shiftSlide(dir, action) {
    items.classList.add('shifting');
    
    // if(index < 0 || index > (slidesLength.length - 1)) return;
    console.log(index);

    if (allowShift) { 
      if (!action) { 
        posInitial = items.offsetLeft; 
      }
      if (dir == 1 && index < (slidesLength - 1)) {
        items.style.left = (posInitial - slideSize) + "px";
        index++;      
      } else if (dir == -1 && index > 0) {
        items.style.left = (posInitial + slideSize) + "px";
        index--;      
      }
    }

    if(index == 0 || index == (slidesLength - 1)) {
      allowShift = true;
    } else {
      allowShift = false;
    }
   

  }
    
  function checkIndex (){
    items.classList.remove('shifting');

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }
    
    allowShift = true;
  }
}

slide(slider, sliderItems, prev, next);