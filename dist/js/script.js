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
                    required: "Enter your name",
                    minlength: jQuery.validator.format("Enter the minimum {0} symbol!")
                },
                phone: {
                    required: "Enter your phone number",
                },
                email: {
                    required: "Enter your email",
                    email: "Your email must be of the format name@domain.com",
                },
                text: {
                    required: "Enter your message"
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
    var youtube = $("#video-modal video").attr("src");
        $('#video-modal').on('show.bs.modal', function () {
            $("#video-modal video").attr("src", youtube + "?autoplay=1");
        });
        $("#video-modal").on('hidden.bs.modal', function (e) {
            $("#video-modal video").attr("src", null);
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