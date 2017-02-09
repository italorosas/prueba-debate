function displayContent(element) {
	var slug = element.data('cid'), ul;
	if (!slug || $('.aside_contenido .wait').size()>0) return;
	mnu = Session.get("menu_suggest");
	ul = element.parent().parent().next().find('ul');
	if (!mnu) {
		if (slug && (slug != 'redes' || slug !='hashtag')) {
			$('.aside_contenido ul').addClass('wait').html('<div></div>').html();
		}
	 	$.getJSON(SiteUrl+"home/menu_suggest_tree", function(data) {
			Session.set("menu_suggest", data);
			ul.removeClass('wait');
			$('.aside_contenido ul').removeClass('wait')
			ul.html(renderMenu(data, slug)).html();
	  	});
	} else {
		ul.html(renderMenu(mnu, slug)).html();
	}
	$('#slotMenu').appendTo(ul);
	setTimeout(function(){ googletag.pubads().refresh([window.slotMenu]) }, 100);
}
function renderMenu(mnu, slug){
	var out = "",
	items = mnu[slug];
	if (items) {
		
	  for (i in items) {
	   vw = items[i];
	   out+= "<div class=\"col-sm-6 col-md-3\"\><a href=\""+vw.url+"\" class=\"thumbnail\"\><img src=\""+vw.image+"\" \/\><\/a\><div\><p\><a href=\""+vw.url+"\" class=\"col_titulos\" \>"+vw.title+"<\/a><\/p><\/div><\/div>";
	  }
	  
	} else {
	  if (slug == 'redes' || slug=='hashtag' || slug=='whatsapp' || slug=='denuncias') {
	    $('.aside_redes').addClass('hide');
		$('#cm-'+slug).removeClass('hide');
		return;
	  }
	}
	return out;
}


 function shareButtons(){
    $('.btnFacebook').click(function() {
      var a = $(this).parent().prev().find('h3 a'),
      href='https://www.facebook.com/sharer/sharer.php?u='+a.attr('href')+'&amp;t='+a.text();
      window.open(href, '_blank', 'width=500,height=310');
      return false;
    });
    $('.btnGoogle').click(function() {
      var a = $(this).parent().prev().find('h3 a'),
      href='https://plus.google.com/share?url='+a.attr('href');
      window.open(href, '_blank', 'width=500,height=310');
      return false;
    });
    $('.btnTwitter').click(function() {
      var a = $(this).parent().prev().find('h3 a'),
      href='http://twitter.com/?status='+a.text()+'%20Via:%20'+a.attr('href');
      window.open(href, '_blank', 'width=500,height=310');
      return false;
    });
  
}
function initMenu() {
  $(".aside_titulos li").hover(function () {
	element=$(this);
	displayContent(element);
   }, function(){} );

  $('.nav_desk a.dropdown-toggle').hover(function() {
  	var name = $(this).attr('id');
  	if (name == 'm-redes' || name=='m-hashtag'  || name=='m-whatsapp'  || name=='m-denuncias') {
	    $('.aside_redes').addClass('hide');
		$('#c'+name).removeClass('hide');
		return;
	 } else {
  		displayContent($('[data-name="'+name+'"]:first'));
	 }
  }, function() {});
}
$(document).ready(function() {
	initMenu();
	//initSocialConnect();
	//checkLogin();
	//shareButtons();
	//checkMobileCookie();
	//setTimeout(function(){ $("span.time").timeago(); }, 500);
  
  $("body").on("click", "#myNavbar, .close-menu>i", function(){
    $("html").removeClass("open-menu");
    $(this).closest(".navbar-collapse").removeClass("in");
  }).on("click", ".navbar-toggle", function(){
    $("html").addClass("open-menu");
  }).on("click", ".navbar-list", function(e){
    e.stopPropagation();
  });
});

/*
function initSocialConnect() {

hello.init({
  facebook : 1417972515144615,
  google: '832141733578.apps.googleusercontent.com',
  windows: '000000004C132B1B',
  twitter: 'YmmycvVG6DpYMyiQ0SLYKKI5y'
},{
  scope : 'email',
  redirect_uri: window.site+'redirect.html'
});


 hello.on('auth.login', function(r){

  hello( r.network ).api( '/me' ).then( function(p){
    $('#profile_user_img').html("<img class='profile' src='"+ p.thumbnail + "' width='48' />");
    var isLogged = Session.get("userLatina");
    var profile = {statusObject :{id:p.id,name:p.name||p.displayName, mail:p.email||p.emails.account||p.emails[0].value, thumbnail:p.thumbnail,network:r.network }};
    profile.statusObject.status_newsletter = ($('#menu-status_newsletter').is(':checked'))?1:0;
    if (!isLogged) {
	    $.post(window.site+'visitors/social_register', profile.statusObject, function() {
	    	displayLoggin(profile);
	    });
	} else {
		displayLoggin(profile);
	}
  }, function(e){ });
});

}*/


function profileLogged(profile)
{
  expire = $('input[name="remember_me"]').is(':checked')?365:1;
  $.cookie("profileLogged", JSON.stringify(profile), { expires: expire });
  displayLoggin(profile);
}

function checkLogin()
{
  var profile = Session.get("userLatina");
  if (profile) {
    if (profile && profile.logged)
     displayLoggin(profile);
  }
}

function displayLoggin(profile)
{
  //$('.form-horizontal').slideUp();
  //$('.profile-logged').slideDown();
  window.USER = profile.statusObject;
  Session.set("userLatina", window.USER);
  $('#iniciar-sesion').html('Hola, '+window.USER.name);
  $('.login-container').html('<img src="'+window.USER.thumbnail+'" width="48" /><p class="msg_welcome">'+window.USER.name+' ya eres Latino</p>');
  if (window.callbackUserLatina) window.callbackUserLatina();
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
function checkMobileCookie() {
    var tuto = getCookie("sld_movil");
    if (tuto == "") {
    	$('#tuto-sliderDown').show();
    	setCookie("sld_movil", 'welcome');
    	setTimeout(function() {
        	$('#tuto-sliderDown').hide();
        }, 9000);
    }
}