document.addEventListener('DOMContentLoaded',() =>{
    const slideTime = 500;
    const previousButton = document.querySelector('#previous');
    const nextButton = document.querySelector('#next');
    const allSlides = [...document.querySelectorAll(".slide")];

    let clickable = true;
    let active = null;
    let newActive = null;

    function initSlider(){
        allSlides.forEach(slide => {
            slide.setAttribute(
                'style', 
                `transition: transform ${slideTime}ms ease;
                             animation-duration: ${slideTime}ms;`       
            );
        });
    }

    function changeSlide(forward){
        if(clickable){
            clickable = false;
            active = document.querySelector(".active");
            const activeSlideIndex = allSlides.indexOf(active);
            if(forward) {
                // console.log(activeSlideIndex)
                // console.log(allSlides.length)
                // console.log((activeSlideIndex + 1) % allSlides.length)

                newActive = allSlides[(activeSlideIndex + 1) % allSlides.length];
                active.classList.add('slideOutLeft');
                newActive.classList.add('slideInRight', 'active');
            } else {
                newActive = allSlides[(activeSlideIndex -1 + allSlides.length) % allSlides.length];
                active.classList.add('slideOutRight');
                newActive.classList.add('slideInLeft', 'active');
            }
        }
    }
    allSlides.forEach(slide => {
        slide.addEventListener('transitionend', () => {
            if (slide === active && !clickable) {
                clickable = true;
                active.className = 'slide';
            }
        });
    });

    //Event Listeners - make buttons clickable
    nextButton.addEventListener('click', () => {
        changeSlide(true);
    })
    previousButton.addEventListener('click', () => {
        changeSlide(false);
    })

    //Initslider making it happen
    initSlider();
})