
$(function() {
  $("[name=send]").click(function (e) {
   var btn = $(this);
   var form = $(this).closest('form');

   $(":input.error").removeClass('error');
   $(".allert").remove();

   var error;
   var ref = btn.closest('form').find('[required]');
   var msg = btn.closest('form').find('input, textarea, select');
   var send_btn = btn.closest('form').find('[name=send]');
   var send_adress = btn.closest('form').find('[name=send_adress]').val();
   var send_options = btn.closest('form').find('[name=campaign_token]');;
   var formType = btn.closest('form').find('[name=form_type]').val();

   var category = btn.closest('form').find('[name=category]').val();
   var action_form = btn.closest('form').find('[name=action_form]').val();

   var alertImage = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z" fill="#E2574C"/></svg>';



   $(ref).each(function() {
    if ($(this).val() == '') {
      var errorfield = $(this);
      $(this).addClass('error').parent('.field').append('<div class="allert"><span>Заполните это поле</span>' + alertImage + '</div>');
      error = 1;
      $(":input.error:first").focus();
      return;
    } else {
      var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
      if ($(this).attr("type") == 'email') {
        if (!pattern.test($(this).val())) {
          $("[name=email]").val('');
          $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный e-mail</span>' + alertImage + '</div>');
          error = 1;
          $(":input.error:first").focus();
        }
      }
      var patterntel = /^()[- +()0-9]{9,18}/i;
      if ($(this).attr("type") == 'tel') {
        if (!patterntel.test($(this).val())) {
          $("[name=phone]").val('');
          $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите номер телефона в формате +3809999999</span>' + alertImage + '</div>');
          error = 1;
          $(":input.error:first").focus();
        }
      }
    }
  });
   if (!(error == 1)) {
    $(send_btn).each(function() {
      $(this).attr('disabled', true);
    });
     // Отправка в базу данных
     $.ajax({
      type: 'POST',
      url: 'db/registration.php',
      dataType: 'json',
      data: form.serialize(),
    });
    // Отправка на почту
    $.ajax({
      type: 'POST',
      url: 'mail.php',
      data: msg,
      success: function() {
        setTimeout(function() {
          $("[name=send]").removeAttr("disabled");
        }, 1000);
        $('div.md-show').removeClass('md-show');
        dataLayer.push({'event': 'autoEvent', 'eventCategory': category, 'eventAction': action_form, 'eventLabel' : ''});
        $('form').trigger("reset");
        $("#call_ok")[0].click();
      },
      error: function(xhr, str) {
        console.log("Erorr")
      }
    });

  }
  return false;
})
});


 // Smooth scroll to anchor

 $('.scroll').click(function(){
  $('html, body').animate({
    scrollTop: $( $.attr(this, 'href') ).offset().top
  }, 1000);
  return false;
});

//  INPUT TEL MASK

jQuery(function($){
 $("input[type='tel']").mask("+99 (999) 999-9999");
});



//YOUTUBE

$(function() {
  $(".youtube").each(function() {
    // $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

    $(this).append($('<div/>', {'class': 'play'}));

    $(document).delegate('#'+this.id, 'click', function() {
      var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
      if ($(this).data('params')) iframe_url+='&'+$(this).data('params');

      var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height() })

      $(this).replaceWith(iframe);
    });
  });
});



// PREVENT SCROLLING

$('.md-trigger').click(function() {
  $("body").addClass('unscroll');
});

$('.md-close').click(function() {
  $("body").removeClass('unscroll');
});

$('.md-overlay').click(function() {
  $("body").removeClass('unscroll');
});


// SLIDER

$(document).ready(function() {
  $('.slider').slick({
    slidesToShow: 1,
    dots: true,
    arrows: false,
    fade: true,
    slidesToScroll: 1,
    autoplay: false,
    adaptiveHeight: false
  });
});

$(document).ready(function() {
  $('.slider_mobile').slick({
    slidesToShow: 1,
    dots: true,
    arrows: true,
    fade: false,
    slidesToScroll: 1,
    autoplay: false,
    adaptiveHeight: true
  });
});

$(document).ready(function() {
  $('.slider_testimonial').slick({
    slidesToShow: 1,
    dots: false,
    arrows: false,
    slidesToScroll: 1,
    autoplay: false,
    adaptiveHeight: true,
    asNavFor: '.slider_control'
  });
});


$(document).ready(function() {
  $('.slider_control').slick({
    slidesToShow: 1,
    dots: true,
    arrows: true,
    slidesToScroll: 1,
    autoplay: false,
    fade: true,
    adaptiveHeight: true,
    asNavFor: '.slider_testimonial'
  });
});


//  CURSOR ON SLIDER HOVER FUNCTION

$(document).ready(function() {
  jQuery(".slider_testimonial").mousedown(function() {
    jQuery(this).removeClass("touch_mode_grab")
    .addClass("touch_mode_grabbing");
  }).mouseup(function() {
    jQuery(this).removeClass("touch_mode_grabbing")
    .addClass("touch_mode_grab");
  })
});


// Menu

$(document).ready(function() {
    (function() {
      var i, resize;

      i = setInterval(function() {
        return $("#nav .wrapper").toggleClass("cross");
    }, 1500);

      $("#nav .wrapper").click(function() {
        clearInterval(i);
        if($('#nav').hasClass('open')){
            return $("#nav .wrapper").addClass("cross");
        } else {
            return $("#nav .wrapper").removeClass("cross");
        }
    });
      $('.callback').click(function(){
        clearInterval(i);
        $("#nav .wrapper").addClass("cross");
      });
  }).call(this);

    $('#menu').click(function(){
        $('#nav').toggleClass('open');
        $('body').toggleClass('unscroll');
    });

    $('#nav li a').click(function(){
      $('#nav').removeClass('open');
      $("#nav .wrapper").removeClass("cross");
    })

});


// Coaches

$('.more_coaches').click(function(event) {
  $('.coaches_hidden').slideToggle();
  $(this).toggleClass('opened');
  if($(this).hasClass('opened')){
    $(this).html('Скрыть')
  } else {
    $(this).html('Показать всех')
  }
});

