document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.custom-slider-wrp')
  const btns = document.querySelectorAll('.custom-slider-btn')

  // Helper function to set slide transforms
  const setSlideTransforms = (slides, reverse = false) => {
    slides.forEach((item, i) => {
      const translateY = reverse ? (slides.length - i - 1) * 20 : i * 20
      const rotate = reverse ? -3 : 3
      item.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`
    })
  }

  // Helper function to move a slide
  const moveSlide = (fromIndex, toIndex) => {
    const slides = Array.from(document.querySelectorAll('.custom-slider-slide'))
    if (
      fromIndex >= 0 &&
      toIndex >= 0 &&
      fromIndex < slides.length &&
      toIndex < slides.length
    ) {
      const [slide] = slides.splice(fromIndex, 1)
      slides.splice(toIndex, 0, slide)
      slider.innerHTML = ''
      slides.forEach(slide => slider.appendChild(slide))
    } else {
      console.error('Invalid indices')
    }
    fixRotate(slides)
  }

  // Helper function to fix rotate
  const fixRotate = newSlides => {
    const midIndex = Math.ceil(newSlides.length / 2)
    newSlides.forEach((elm, i) => {
      elm.classList.toggle('pre-slide', i < midIndex - 1)
      elm.classList.toggle('active-slide', i === midIndex - 1)
      elm.classList.toggle('next-slide', i > midIndex - 1)
    })

    document.querySelector('.active-slide').style.transform =
      'translateY(0) rotate(0deg)'
    setSlideTransforms(
      Array.from(document.querySelectorAll('.pre-slide')),
      true
    )
    setSlideTransforms(document.querySelectorAll('.next-slide'))

    slider.style.transition = 'opacity 0.5s'
    slider.style.opacity = '0.7'
    setTimeout(() => {
      slider.style.opacity = '1'
    }, 500)
  }

  // Button click event listeners
  btns[0].addEventListener('click', () =>
    moveSlide(0, document.querySelectorAll('.custom-slider-slide').length - 1)
  )
  btns[1].addEventListener('click', () =>
    moveSlide(document.querySelectorAll('.custom-slider-slide').length - 1, 0)
  )

  // Variables to track touch events
  let touchStartX = 0
  let touchEndX = 0

  // Function to handle swipe detection
  const handleGesture = () => {
    if (touchEndX < touchStartX) {
      moveSlide(document.querySelectorAll('.custom-slider-slide').length - 1, 0) // Swipe left, move last to first
    }
    if (touchEndX > touchStartX) {
      moveSlide(0, document.querySelectorAll('.custom-slider-slide').length - 1) // Swipe right, move first to last
    }
  }

  // Touch event listeners
  slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX
  })

  slider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX
    handleGesture()
  })

  // Initialize slide transforms
  const preSlides = document.querySelectorAll('.pre-slide')
  const nextSlides = document.querySelectorAll('.next-slide')
  setSlideTransforms(Array.from(preSlides), true)
  setSlideTransforms(nextSlides)
})
