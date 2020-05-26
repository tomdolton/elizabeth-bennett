(function ($) { // Begin jQuery

    // Mobile nav dropdown button function ===================================//
    var $mobileNavToggleBtn = $('.mobile-nav-toggle');

    function onNavClick() {
        var $this = $(this),
            $selectors = $('.mobile-nav');

        $this.toggleClass('is-open');
        $selectors.toggleClass('is-open');

        /* Any click event that gets to the document
       will hide the dropdown */
        $(document).click(function () {
            $selectors.removeClass('is-open');
            $mobileNavToggleBtn.removeClass('is-open');
        });

        //  /* Clicks within the dropdown won't make
        //     it past the dropdown itself */
        $(".mobile-nav, .mobile-nav-toggle, header").click(function (e) {
            e.stopPropagation();
        });
    }





    // var $innerNavToggleBtn = $('.dropbtn');
    //
    // function onInnerNavClick() {
    //     var $this = $(this),
    //     $dropContent = $('.dropdown__content');
    //
    //     $this.toggleClass('is-active');
    //     $dropContent.toggleClass('is-active');
    // }

    // $(document).mouseup(function (e) {
    //     if (!container.is(e.target) && container.has(e.target).length === 0) {
    //         $('.mobile-nav').toggleClass('is-active');
    //     }
    // });



    // Carousel slider function ============================================//

    // Next and Previous buttons
    var $nextLink = $('.next-link'),
        $prevLink = $('.prev-link');

    // Next image function
    var onNextClick = function () {
        var $activeImg = $('.item--is-shown'),
            $nextImg = $activeImg.next();

        // Revolves to the start of image list
        if ($nextImg.length == 0) {
            $nextImg = $('.carousel-inner li').first();
        }

        // current active li toggle class .item--is-shown with .image-hidden
        $activeImg.toggleClass('item--is-shown');
        // next sibling li toggle class .image-hidden with .item--is-shown
        $nextImg.toggleClass('item--is-shown');

        // // call set height when next item function is called
        setButtonsHeight();
    };



    // Previous image function
    function onPrevClick() {
        var $activeImg = $('.item--is-shown'),
            $prevImg = $activeImg.prev();

        // Revolves to the end of image list
        if ($prevImg.length == 0) {
            $prevImg = $('.carousel-inner li').last();
        }

        // current active li toggle class .item--is-shown with .image-hidden
        $activeImg.toggleClass('item--is-shown');
        // previous sibling li toggle class .image-hidden with .item--is-shown
        $prevImg.toggleClass('item--is-shown');


        // // call buttons set height when previous item function is called
        setButtonsHeight();

    }


    // Auto cycle through images function
    function autoCycle() {
        // Pauses cycle when hovered over 'next' button area of image
        var isPaused = false;

        $nextLink.mouseenter(function () {
            isPaused = true;
        });
        $prevLink.mouseenter(function () {
            isPaused = true;
        });
        $nextLink.mouseleave(function () {
            isPaused = false;
        });
        $prevLink.mouseleave(function () {
            isPaused = false;
        });
        // Set timer of cycle
        setInterval(function () {
            if (!isPaused) {
                onNextClick();
            }
        }, 10000);
    }


    // Keyboard left and right arrows to control carousel-outer
    function keyboardLeftRight(e) {
        switch (e.which) {
            case 37: //left
                onPrevClick();
                break;

            case 39: //right
                onNextClick();
                break;

            default: return; //exit this handler for other keys
        }
        e.preventDefault(); //prevent the default action (scroll)
    }




    // Set .carousel-outer height with height of responsive image similar to above
    // All images files to be same height in folder.

    function setCarouselHeight() {
        var $activeImg = $('.item--is-shown'),
            currentHeight = $activeImg.height();
        // change the height attribute of carousel-outer
        $('.carousel-outer').height(currentHeight);
    }

    // // Set the height of the next and previous buttons:
    function setButtonsHeight() {
        // get the height of the current active image
        var $activeImg = $('.item--is-shown'),
            currentHeight = $activeImg.height();
        // change the height attribute of both $nextLink and $prevLink
        $nextLink.height(currentHeight);
        $prevLink.height(currentHeight);

    }





    // Nav drop down buttons
    $mobileNavToggleBtn.on('click', onNavClick);
    // $innerNavToggleBtn.on('click', onInnerNavClick);
    // Carousel (active on larger screens)
    if ($(window).width() > 768) {
        $nextLink.on('click', onNextClick);
        $prevLink.on('click', onPrevClick);
        autoCycle();
        $(document).on('keydown', keyboardLeftRight);
        // set buttons height for the first time 

        // set buttons & carousel height on window resize event
        window.onresize = setButtonsHeight;
        window.onresize = setCarouselHeight;
        // set buttons & carousel height on document load
        document.onload = setButtonsHeight;
        document.onload = setCarouselHeight;
    }






})(jQuery); // end jQuery
