var SITE_THEME = {
                'noticias': 'theme_f',
                'entretenimiento': 'theme_a',
                'deportes': 'theme_e',
                'horario estelar': 'theme_b',
                'series y novelas': 'theme_b',
                'especiales': 'theme_d',
                'talentos': 'theme_c',
                'redes': 'theme_f',
                'tu denuncia': 'theme_f',
                'ver más': 'theme_f'
            };
(function(){
    
    $(document).ready(onReady);
    
    function onReady(){
        /*url = 'noticias';
         $('body').removeClass().addClass(SITE_THEME[url]);*/
        
        //CAMBIAR COLORES AL NAVEGAR EN EL MEGAMENU
        (function(){
            
            
            $(document).on('mouseenter', '.navbar-inverse .navbar-nav > li > a', function(e){
                $('body')
                    .removeClass()
                    .addClass(SITE_THEME[$(this).text().toLowerCase()]);
                
                if($('#iniciar-sesion').attr('aria-expanded') == 'true'){
                    $('#iniciar-sesion').dropdown('toggle');
                }
            });
            
            //SI ES TOUCH DESHABILITAR EL MOUSEENTER
            $(document).on('touchstart', '.navbar-inverse .navbar-nav > li > a', function(e){
                $(document).off('mouseenter', '.navbar-inverse .navbar-nav > li > a');
            });
        })();
        
        //CARGAR CONTENIDO DEL MENU

        
        //SLIDE DESTACADOS
        (function(){
            var destacado = new setupSliderDestacado({
                el: '.mainGallery', //elemento padre
                time: 10000, //tiempo del slide
            });
           
        })();
        
        
        
        
        
        //REDES SOCIALES DEL ARTICULO
        (function(){
            //MOSTRAR OCULTAR
            $(document).on('click', '.btnSocial', function(e){
                e.preventDefault();
                $(this).parent().find('a:not(:first-child)').slideToggle();
            });
        })();
        
        //MOSTRAR CATEGORIA AL HACER OVER EN LAS NOTICIAS
        (function(){
            //MOSTRAR OCULTAR
            
            $(document).on('mouseenter', '.wrapNot', function(e){
                if($(window).width() > 600){
                    $(this).find('.barBottom').stop().animate({bottom:0}, 400);
                }
                
            });
            
            $(document).on('mouseleave', '.wrapNot', function(e){
                if($(window).width() > 600){
                    $(this).find('.barBottom').stop().animate({bottom:-20}, 500);
                }
            });
            
        })();
        
        //GALERIA
      /*  (function(){
            var gal = new galeria({
                el: '#galeria',
                url: site+'home/galeria'
            });
        })();
        */
        //SCROLL
        (function(){
            $('body').bind('touchmove', function(e) { 
                onScroll();
            });
            $(window).on('scroll', function(e) {
                onScroll();
                
            });
            
            function onScroll(){
                //MENU FIXED
                var scrollPosition = $(window).scrollTop();
                
                if(scrollPosition >= 88 ){
                    $('#slide-nav').addClass('navbar-fixed-top');
                    $('#barCategories').addClass('nav-fixed');
                    $('.topBar').css({display: 'none'});
                }else{
                    $('#slide-nav').removeClass('navbar-fixed-top');
                    $('#barCategories').removeClass('nav-fixed');
                    $('.topBar').css({display: 'block'});

                }
            }
        })();
        
        //BUSCAR
        (function(){
            $(document).on('click', '.ico_search', function(e){
                e.preventDefault();
               $('.search-input').slideToggle(); 
            });
        })();
    }
    
})();
(function(){
    
    $(document).ready(onReady);
    
    function onReady(){
        
        
        //ARREGLAR ITEMS AL RESIZE
        (function(){
            onResize();
            $(window).resize(onResize);
            
            function onResize(){
                //itemSmall fix height
                fixSmall();
                
                //itemMedium fix height
                fixMedium();
            }
            
            function fixSmall(){
                var items = $('.barNot02');
                items.removeAttr('style');
                
                if($(window).width() < 600){
                    items.css( 'height', 'auto' );
 
                    var perRow = 2;
                    if( perRow == null || perRow < 2 ) return true;

                    for( var i = 0, j = items.length; i < j; i += perRow )
                    {
                        var maxHeight   = 0,
                            $row        = items.slice( i, i + perRow );

                        $row.each( function()
                        {
                            var itemHeight = parseInt( $( this ).outerHeight() );
                            if ( itemHeight > maxHeight ) maxHeight = itemHeight;

                            //console.log(itemHeight, maxHeight, maxHeight);
                        });
                        items.css( 'height', maxHeight );
                    }
                }
                
            }
            
            function fixMedium(){
                $('.itemMedium').removeAttr('style');
                $('.barNot03').removeAttr('style');
                
                if($(window).width() < 600){
                    var blockHeight = $('.itemMedium').parent().height();
                    var imgHeight = $('.itemMedium').find('.wrapNot > img').height();
                    $('.itemMedium').height(blockHeight/2 - 2.5);
                    $('.barNot03').height($('.itemMedium').height() - imgHeight - 20);
                }
            }
        })();
    }
    
})();