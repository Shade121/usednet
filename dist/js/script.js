$(document).ready(function () {

    'use strict';
    
    // Modal contacts
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal_close').on('click', function () {
        $('.overlay, #consultation, #thanks').fadeOut('slow');
    });

    //Valide Forms
    function valideForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Введите своё имя",
                    minlength: jQuery.validator.format("Введите минимум {0} символа!")
                },
                phone: {
                    required: "Введите свой номер телефона",
                },
                email: {
                    required: "Введите свой email",
                    email: "Ваш email должен быть формата name@domain.com",
                }
            }
        });
    }

    valideForms('#consultation form'),

        $('input[name=phone]').mask("+38 (999) 999-99-99");

    // PHP mailer
    $('form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    // active-tabs    
    $('ul.industries_tabs, ul.dropdown-menu').on('click', 'li:not(.industries_tab-active)', function () {
        $(this)
            .addClass('industries_tab-active').siblings().removeClass('industries_tab-active')
            .closest('div.container').find('div.industries_item').removeClass('industries_item-active').eq($(this).index()).addClass('industries_item-active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.industries_item').eq(i).toggleClass('industries_item-active');
            });
        });
    }
    toggleSlide('.industries_link');
    toggleSlide('.button_mini');

    // pageup
    $(window).scroll(function () {
        if ($(this).scrollTop() > 700) {
            $('.up').fadeIn();
        } else {
            $('.up').fadeOut();
        }
    });

    // promo-carousel
    $('.carousel').slick({
        dots: true,
        infinite: true,
        dotsClass: "dots-castom",
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/prev.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/next.png"></button>',
        responsive: [{
            breakpoint: 991,
            settings: {
                arrows: false,
            }
        }]
    });

    // industries-carousel
    $('.mac_carousel').slick({
        dots: false,
        infinite: true,
        fade: true,
        cssEase: 'ease-in-out',
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',

        responsive: [
            {
                breakpoint: 575,
                settings: {
                    arrows: false,
                    dots: true,
                    dotsClass: "dots-castom"
                }
            }
        ]
    });

});