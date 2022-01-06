$(document).ready(function () {

    'use strict';
    
    // Modal contacts
    $('[data-modal=contact_message]').on('click', function () {
        $('.overlay, #contact_message').fadeIn('slow');
    });

    $('.modal_close').on('click', function () {
        $('.overlay, #contact_message, #thanks').fadeOut('slow');
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
                },
                text: {
                    required: "Введите свое сообщение"
                },
            }
        });
    }

    valideForms('#contact-form'),
    valideForms('#message-form'),

    $('input[name=phone]').mask("+1 (999) 999-99-99");

    // PHP mailer
    $('form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#contact_message').fadeOut();
            $('.overlay, #thanks').fadeIn();
            $('form').trigger('reset');
        });
        return false;
    });

    // About modal

    $('#about-modal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget);
        const workName = button.data('name');
        $(this).find('.modal-body').hide();
        $('.modal-body[data-name = ' + workName + ']').show();
    });

    //video

    var youtube_src = $("#video-modal iframe").attr("src");
        $('#video-modal').on('show.bs.modal', function () {
            $("#video-modal iframe").attr("src", youtube_src + "?autoplay=1");
        });
        $("#video-modal").on('hidden.bs.modal', function (e) {
            $("#video-modal iframe").attr("src", null);
        });
    
    // pageup
    $(window).scroll(function () {
        if ($(this).scrollTop() > 700) {
            $('.up').fadeIn();
        } else {
            $('.up').fadeOut();
        }
    });

});