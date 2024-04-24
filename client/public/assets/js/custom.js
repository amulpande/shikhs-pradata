/* Table of Content
==================================================
1.    Mean Menu JS
2.    Popup Button JS
3.    Banner Slider Area JS
4.    Testimonial Card Area JS
5.    Testimonial Slider Area-2 JS
6.    Testimonial Slider Area-3 JS
7.    Service Card Slider JS
8.    Brands Slider JS
9.    Video Popup JS
10.   Language Select JS
11.   Odometer JS
12.   Wow JS
*/

(function ($) {
    "use strict";
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0) {
            $(".navbar-area").addClass("sticky");
        } else {
            $(".navbar-area").removeClass("sticky");
        }
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0) {
            $(".navbar-area .main-nav").addClass("sticky");
        } else {
            $(".navbar-area .main-nav").removeClass("sticky");
        }
    });

    /*  Mean Menu JS  */
    $(".mean-menu").meanmenu({
        meanScreenWidth: "1199",
    });
    
    /*  Popup Button JS  */
    $('.popup-button').click(function () {
        $('.popup').css('visibility', 'visible');
        $('.popup-content').addClass('hi');
    })

    $('#popup-close').click(function () {
        $('.popup').css('visibility', 'hidden');
        $('.popup-content').removeClass('hi');
    })

    /*  Banner Slider Area JS  */
    $(".banner-slider-area").owlCarousel({
        autoplayHoverPause: true,
        autoplaySpeed: 1500,
        loop: true,
        autoplay: true,
        dots: true,
        dotsData: true,
        nav: false,
        items: 1,
    });

    /*  Testimonial Card Area JS  */
    $(".testimonial-card-area").owlCarousel({
        autoplayHoverPause: true,
        autoplaySpeed: 1500,
        loop: true,
        autoplay: true,
        dots: true,
        nav: false,
        items: 1,
    });

    /*  Testimonial Slider Area-2 JS  */
    $(".testimonial-slider-area-2").owlCarousel({
        autoplayHoverPause: true,
        autoplaySpeed: 1500,
        loop: true,
        autoplay: true,
        dots: false,
        nav: true,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        items: 1,
    });

    /*  Testimonial Slider Area-3 JS  */
    $(".testimonial-slider-area-3").owlCarousel({
        autoplayHoverPause: true,
        autoplaySpeed: 1500,
        loop: true,
        autoplay: true,
        dots: false,
        nav: true,
        navText: ['<i class="fas fa-caret-left"></i>', '<i class="fas fa-caret-right"></i>'],
        items: 1,
    });

    /*  Service Card Slider JS  */
    $(".service-card-slider").owlCarousel({
        autoplayHoverPause: true,
        loop: true,
        autoplay: true,
        dots: false,
        nav: true,
        navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>'],
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            }
        },
    });

    /*  Brands Slider JS  */
    $(".brands-slider").owlCarousel({
        autoplayHoverPause: true,
        loop: true,
        autoplay: true,
        dots: false,
        margin: 30,
        nav: false,
        responsive: {
            0: {
                items: 2,
            },
            500: {
                items: 3,
            },
            768: {
                items: 3,
            },
            992: {
                items: 6,
            }
        },
    });

    /*  Video Popup JS  */
    $(".video-popup").magnificPopup({
        type: "iframe",
    });

    /*  Language Select JS  */
    $(".language-select select").niceSelect();
    $('input[type="number"]').niceNumber();
    $(function () {
        $(window).on("scroll", function () {
            var scrolled = $(window).scrollTop();
            if (scrolled > 600) $(".go-top").addClass("active");
            if (scrolled < 600) $(".go-top").removeClass("active");
        });
        $(".go-top").on("click", function () {
            $("html, body").animate({
                scrollTop: "0"
            }, 500);
        });
    });

    /*  Odometer JS  */
    $(".odometer").appear(function (e) {
        var odo = $(".odometer");
        odo.each(function () {
            var countNumber = $(this).attr("data-count");
            $(this).html(countNumber);
        });
    });

    /*  Wow JS  */
    if ($(".wow").length) {
        var wow = new WOW({
            mobile: false,
        });
        wow.init();
    }
})(jQuery);
