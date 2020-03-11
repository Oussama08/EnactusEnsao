console.log("For any professional inquery please contact ");



// REGISTER FORM FUNCTION
var contact_send = function () {

    'use strict';

    var namae = $("#namae").val();
    var societe = $("#societe").val();
    var poste = $("#poste").val();
    var tel = $("#tel").val();
    var email = $("#email").val();
    var formule = $("#formule").val();


    if (namae == "") {
        alert("Le champ 'Nom' est vide!");
        $("#namae").focus();
    } else if (societe == "") {
        alert("Le champ 'Nom de l'entreprise' est vide!");
        $("#societe").focus();
    } else if (poste == "") {
        alert("Le champ 'Poste' est vide!");
        $("#poste").focus();
    } else if (tel == "") {
        alert("Le champ 'Numéro de Téléphone' est vide!");
        $("#tel").focus();
    } else if (email == "") {
        alert("Le champ 'Email' est vide!");
        $("#email").focus();
    } else if (!(email.includes("@") && email.includes("."))) {
        alert("Entrez un email valide");
        $("#email").focus();
    } else if (formule == null) {
        alert("veuillez sélectionner un pack!");
        $("#formule").focus();
    } else {
        $.post("form.php", {
            namae: namae,
            email: email,
            societe: societe,
            tel: tel,
            poste: poste,
            formule: formule,
        }, function (result) {
            if (result == "SUCCESS") {
                alert("Your contact form is sent.");
                setTimeout(function () {
                    $("#namae").val("");
                    $("#email").val("");
                    $("#tel").val("");
                    $("#societe").val("");
                    $("#poste").val("");
                    $("#formule").val("");
                }, 3000);
                window.location.replace("http://fee8.com");
            } else {
                alert("Your contact form isn't sent. Please check fields and try again.");
            }
        });
    }

};

//Newsletter (Still workin on it)
/* 
	var newsletter_send = function(){
	
		'use strict';
		
		var email 	= $("#newsletter_email").val();
		if ( email=="" ){ alert("Your email address is empty!"); $("#newsletter_email").focus(); }
		else {
			$.post("newsletter.send.php", { email:email }, function( result ){
				
				console.log( result );
				
				if ( result=="SUCCESS" ){
					alert("Thank you. Your email is added to our database.");
					setTimeout(function(){ $("#newsletter_email").val(""); }, 3000);
				}
				
				else if ( result=="EXIST" ){
					alert("Error. Your email address is already exist our database.");
					$("#newsletter_email").focus();
				}
				
				else {
					alert("Error. Your email isn't added to our database.");
					$("#newsletter_email").focus();
				}
				
			});
		}
	
	};

/* Form End*/

jQuery(document).ready(function ($) {

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        return false;
    });

    // Header fixed on scroll
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });

    if ($(window).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
    }

    // Real view height for mobile devices
    if (window.matchMedia("(max-width: 767px)").matches) {
        $('#intro').css({
            height: $(window).height()
        });
    }

    // Initiate the wowjs animation library
    new WOW().init();

    // Initialize Venobox
    $('.venobox').venobox({
        bgcolor: '',
        overlayColor: 'rgba(6, 12, 34, 0.85)',
        closeBackground: '',
        closeColor: '#fff'
    });

    // Initiate superfish on nav menu
    $('.nav-menu').superfish({
        animation: {
            opacity: 'show'
        },
        speed: 400
    });

    // Mobile Navigation
    if ($('#nav-menu-container').length) {
        var $mobile_nav = $('#nav-menu-container').clone().prop({
            id: 'mobile-nav'
        });
        $mobile_nav.find('> ul').attr({
            'class': '',
            'id': ''
        });
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
        $('body').append('<div id="mobile-body-overly"></div>');
        $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

        $(document).on('click', '.menu-has-children i', function (e) {
            $(this).next().toggleClass('menu-item-active');
            $(this).nextAll('ul').eq(0).slideToggle();
            $(this).toggleClass("fa-chevron-up fa-chevron-down");
        });

        $(document).on('click', '#mobile-nav-toggle', function (e) {
            $('body').toggleClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').toggle();
        });

        $(document).click(function (e) {
            var container = $("#mobile-nav, #mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                }
            }
        });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }

    // Smooth scroll for the menu and links with .scrollto classes
    $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                var top_space = 0;

                if ($('#header').length) {
                    top_space = $('#header').outerHeight();

                    if (!$('#header').hasClass('header-fixed')) {
                        top_space = top_space - 20;
                    }
                }

                $('html, body').animate({
                    scrollTop: target.offset().top - top_space
                }, 1500, 'easeInOutExpo');

                if ($(this).parents('.nav-menu').length) {
                    $('.nav-menu .menu-active').removeClass('menu-active');
                    $(this).closest('li').addClass('menu-active');
                }

                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                }
                return false;
            }
        }
    });

    // Gallery carousel (uses the Owl Carousel library)
    $(".gallery-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    });

    // Buy tickets select the ticket type on click
    $('#buy-ticket-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var ticketType = button.data('ticket-type');
        var modal = $(this);
        modal.find('#ticket-type').val(ticketType);
    })

    // custom code

});
