(function ($) {

    // Mobile nav dropdown button function
    var $mobileNavToggleBtn = $('.mobile-nav-toggle');

    function onNavClick(e) {
        var $this = $(this),
            $selectors = $('.mobile-nav');

        $(this).toggleClass('is-open');
        $selectors.toggleClass('is-open');
    }


    // Carousel slider function

    // Next and Previous buttons
    var $nextLink = $('.next-link'),
        $prevLink = $('.prev-link');

    // Next image function
    function onNextClick() {
        var $activeImg = $('.item--is-shown'),
            $nextImg = $activeImg.next();

        // Revolves to the start of image list
        if($nextImg.length == 0) {
            $nextImg = $('.carousel-inner li').first();
        }

        // current active li toggle class .item--is-shown with .image-hidden
        $activeImg.toggleClass('item--is-shown');
        // next sibling li toggle class .image-hidden with .item--is-shown
        $nextImg.toggleClass('item--is-shown');

    }

    // Previous image function
    function onPrevClick() {
        var $activeImg = $('.item--is-shown'),
            $prevImg = $activeImg.prev();

        // Revolves to the end of image list
        if($prevImg.length == 0) {
            $prevImg = $('.carousel-inner li').last();
        }

        // current active li toggle class .item--is-shown with .image-hidden
        $activeImg.toggleClass('item--is-shown');
        // previous sibling li toggle class .image-hidden with .item--is-shown
        $prevImg.toggleClass('item--is-shown');

    }

    // Auto cycle through images function
    function autoCycle() {
        // Pauses cycle when hovered over 'next' button area of image
        var isPaused = false;

        $nextLink.mouseenter(function() {
            isPaused = true;
        });
        $prevLink.mouseenter(function() {
            isPaused = true;
        });
        $nextLink.mouseleave(function() {
            isPaused = false;
        });
        $prevLink.mouseleave(function() {
            isPaused = false;
        });
        // Set timer of cycle
        setInterval(function() {
            if (!isPaused) {
                onNextClick();
            }
        }, 8000);



    }


    // Document ready activates functions
    $(document).ready(function () {
        $mobileNavToggleBtn.on('click', onNavClick);
        $nextLink.on('click', onNextClick);
        $prevLink.on('click', onPrevClick);
        autoCycle();
    });




})(jQuery);





// $(function() {
//     // Rotation speed and timer
//     var speed = 1000;
//     var width = 720;
//     var pause = 3000;
//
//     // cache DOM
//     var $slider = $('.slider');
//
//     setInterval(function() {
//         $('.slider .slides').animate({'margin-left': '-=720px'}, 500);
//     }, speed);
//
//     // Animate the slider
//
// });
