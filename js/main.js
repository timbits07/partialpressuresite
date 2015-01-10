(function($) {

  "use strict"; 

  $(window).load(function() {

    //Preloader
    if ($('#rotator').length) {
      $("#rotator").rotator({
        starting: 0,
        ending: 100,
        percentage: true,
        color: '#fff',
        lineWidth: 10,
        timer: 10,
        radius: 40,
        fontStyle: 'Montserrat, sans-serif',
        fontSize: '20px',
        fontColor: '#fff',
        backgroundColor: '#363636',
        callback: function () {
          $('#mask').fadeOut(300);
        }
      });
    }

    //Animated Background Slider
    $('#backgrounds.animated').flexslider({
      animation: "fade",
      directionNav: false,
      controlNav: false,
      keyboard: false,
      slideshowSpeed: 6000,
      start: function () {
        $('#backgrounds').find(".slides > li.flex-active-slide").each(function () {
          var $content = $(this);
          $content.css({
            '-webkit-transform': 'scale(1.2)',
            '-moz-transform': 'scale(1.2)',
            'transform': 'scale(1.2)',
          });
        })
      },
      before: function () {
        $('#backgrounds').find(".slides > li").each(function () {
          var $content = $(this);
          $content.css({
            '-webkit-transform': 'scale(1)',
            '-moz-transform': 'scale(1)',
            'transform': 'scale(1)',
          });
        })
      },
      after: function () {
        $('#backgrounds').find(".slides > li.flex-active-slide").each(function () {
          var $content = $(this);
          $content.css({
            '-webkit-transform': 'scale(1.2)',
            '-moz-transform': 'scale(1.2)',
            'transform': 'scale(1.2)',
          });
        })
      },
    });

    //Not Animated Background Slider
    $('#backgrounds.not-animated').flexslider({
      animation: "fade",
      directionNav: false,
      controlNav: false,
      keyboard: false,
      slideshowSpeed: 6000
    });

    //Home text rotator
    $('#home-slider').flexslider({
      animation: "slide",
      directionNav: false,
      controlNav: false,
      slideshowSpeed: 6000,
      direction: "vertical",
      animationSpeed: 800,
      touch: false
    });

    //Video background
    if ($('.player').length) {
      $(".player").mb_YTPlayer({
        containment: '#video-wrapper',
        mute: true,
        quality: 'default'
      });
    };

    //Portfolio masonry
    var $container = $('#projects');
    $container.isotope({
      masonry: {
       columnWidth: 0
      },
      itemSelector: '.project'
    });

    //Portfolio filters
    $('#filters').on( 'click', 'li', function() {
      $('#filters li').removeClass('active');
      $(this).addClass('active');
      var filterValue = $(this).attr('data-filter');
      $container.isotope({ filter: filterValue });
    });

  });
  
  //Navigation Scrolling
  $('a[href*=#]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 700);
        return false;
      }
    }
  });

  //Close responsive nav
  $('#navigation li a').on('click', function() {
    if ($(window).width() < 768) {
      $('.navbar-toggle').click();
    }
  });

  //Toggle menu button transition
  $(window).scroll(function(event) {
    if ($(document).scrollTop() >= $('#home').height()) {
      $('#menu-toggle').addClass('dark');
    } else{
      $('#menu-toggle').removeClass('dark');
    }
  }).trigger('scroll');

  //Topnav transition
  $(window).scroll(function(event) {
    if ($(document).scrollTop() >= $('#home').height() / 2) {
      $('#topnav').addClass('scrolled');
    } else{
      $('#topnav').removeClass('scrolled');
    }
  }).trigger('scroll');

  //Sidebar open
  $('#menu-toggle').on('click', function(event) {
    $(this).toggleClass('active');
    $('#menu').toggleClass('open');
    $('#wrap').toggleClass('menu-open');
  });

  //Sidebar Navigation
  $('#main-menu a').click(function(event) {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 700);
      }
    }    
    setTimeout(function(e){      
      $('#menu-toggle').trigger('click');
    }, 700)
    return false;
  });

  //Elements animation
  $('.animated').appear(function(){
    var element = $(this);
    var animation = element.data('animation');
    var animationDelay = element.data('delay');
    if (animationDelay) {
      setTimeout(function(){
        element.addClass( animation + " visible" );
        if (element.hasClass('counter')) {
          element.find('.value').countTo();
        }
      }, animationDelay); 
    } else{
      element.addClass( animation + " visible" );
      if (element.hasClass('counter')) {
        element.find('.value').countTo();
      }
    }  
  },{accY: -150});

  $(window).resize(function() {
   $('#projects').isotope('reloadItems');
  });  

  //Background images
  $('#backgrounds img').each(function() {
    var image = $(this).attr('src');
    $(this).parents('li').css('background-image', 'url('+image+')');
    $(this).remove();
  });

  // Side Images
  $('.bg-img').each(function() {
    var image = $(this).attr('src');
    $(this).parents('.img-holder').css('background-image', 'url('+image+')');
    $(this).remove();
  });

  //Parallax sections
  $('.parallax-section').each(function(index, el) {
    $(this).parallax('50%', 0.4);
  });

  //Services carousel
  $("#services-carousel").owlCarousel({
    items : 4,
    itemsDesktop : [1000,4],
    itemsDesktopSmall : [900,3],
    itemsTablet: [600,2],
    itemsMobile : false,
    autoPlay: 4000,
    pagination: false,
    navigation: true,
    navigationText: ['', '']
  });

  //Services tooltip
  $('.service').tooltip({
    trigger: 'hover',
    container: 'body',
    template: '<div class="tooltip service-tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  });

  //Project slider
  $('.project-slider').flexslider({
    animation: "slide"
  });

  //Portfolio project slider
  function initProjectSlider() {
    $('.project-slider').flexslider({
      animation: "slide"
    });
  };

  //Portfolio Modal
  $('.project-overlay a').on('click', function(){     
    var projectUrl = $(this).attr("href");

    var project = '<div class="modal fade" id="project-modal"><div class="modal-dialog"><div class="modal-content"></div></div></div>';
    var closeButton = '<a href="#" id="modal-close" data-dismiss="modal" aria-hidden="true"><i class="icon-cancel-circled"></i></a>';

    $(project).modal({
      remote: projectUrl + ' #project'
    })
    .on('shown.bs.modal', function () {
      initProjectSlider();
      $('#project-modal .modal-dialog').prepend(closeButton);
    })
    .on('hidden.bs.modal', function () {
      $(this).remove();      
    })   


    return false;
  
  });

  //Testimonials slides
  $('#testimonials-slider').flexslider({
    directionNav: false,
    animation: "slide"
  });  

  //Blog Carousel
  $("#blog-carousel").owlCarousel({
    items : 3,
    itemsDesktop : [1000,3],
    itemsDesktopSmall : [900,2],
    itemsTablet: [600,2],
    itemsMobile : false,
    autoPlay: 4000,
    pagination: true,
    navigation: false,
    navigationText: ['', '']
  });

  //Coming soon countdown
  var theDate = $('.countdown').data('date');
  if ($('.countdown').length) {
    $(".countdown").downCount({
      date: theDate,
      offset: 0
    });
  }

  $('img').on('dragstart', function(event){
    event.preventDefault();
  });

  //Contact form validation and submit with ajax
  $('#contact-form').validate({
    errorPlacement: function(error, element) {},
    highlight: function(element, errorClass) {        
        $(element).parent().removeClass('success').addClass('error');
    },
    unhighlight: function(element, errorClass) {
        $(element).parent().removeClass('error').addClass('success');
    },
    rules: {
      fullname:{
        required: true
      },
      email: {
        required: true,
        email: true
      },
      message: {
        required: true
      }
    },
    submitHandler: function(form) {
      var url = $(form).attr('action');
      $('#contact-form button').text('Sending..');
      $.ajax({
        type: "POST",
        url: url,
        data: $(form).serialize(), // serializes the form's elements.
        success: function(data)
        {
          setTimeout(function(){
            $('#contact-form button').text('Thank You!');
            $('#contact-form button').attr('disabled', 'disabled');
          }, 500);
        }
      });
    }
  });

  //Google Maps
  function initMap() {
    var myLatlng = new google.maps.LatLng(40.773328,-73.960088); // <- Your latitude and longitude
    var styles = [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},{"featureType":"landscape","stylers":[{"color":"#f2e5d4"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}]
    
    var mapOptions = {
      zoom: 12,
      center: myLatlng,
      mapTypeControl: false,
      disableDefaultUI: true,
      zoomControl: false,
      scrollwheel: false,
      styles: styles
    }
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var infowindow = new google.maps.InfoWindow({
        content: "We are here!"
    });

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: 'images/marker.png',
        title: 'We are here!'
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
  }

  if ($('#map').length) {
    google.maps.event.addDomListener(window, 'load', initMap);
    $('#map').css('position', 'absolute');
  }  
  
})(jQuery);