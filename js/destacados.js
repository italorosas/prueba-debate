// -- CONSTRUCTOR slideDestacado --
        function setupSliderDestacado(params)
        {
            $(params.el).each(function() {
                var destacado = new slideDestacado({
                 el: '#'+$(this).attr('id'), //elemento padre
                 time: params.time, //tiempo del slide
                });
            });
             
             return true;
        }

        function slideDestacado(params){
            
            if (!$(params.el).size()) return;
            $(params.el).data('page', 0);

            $(params.el +' .pagSlider span').click(function() {

                clearInterval(interval);
                interval = setInterval(autoSlideDestacado, params.time);
                var gallery = $(params.el),
                    page = $(this).data('page');

                gallery.find('.flGallery').hide();
                $(this).parent().find('span').removeClass('pgAct');
                $(this).addClass('pgAct');
         
                gallery.find('.flGallery:eq('+page+')').fadeIn();    
               

                gallery.data('page', page);
         
            });
            $(params.el +' .arrow_right').click(function() {
                var gallery = $(params.el),
                    page = gallery.data('page') +1;
                    console.log("esto vale page en arro",page);
                    console.log("esto vale gallery",gallery);
                if (page >= gallery.find('.flGallery').size()) page = 0;
                gallery.data('page', page);

                $(params.el +' .pagSlider span:eq('+page+')').click();
            });
            function autoSlideDestacado(){
                var page = $(params.el).data('page');
                $(params.el +' .pagSlider span').click();
                /*$(params.el +' .arrow_right').click();*/
                
            }
           var interval =  setInterval(autoSlideDestacado, params.time);
        }
        //----------------------------------------------------------------