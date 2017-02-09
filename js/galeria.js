function galeria(params){
    $.getJSON(params.url, function(data){
        var index = 0;
        var first = true;
        var html = "";
        var clickeable = true;
        
        html += '<div class="desImg">';
        html += '<p><a href="#">Milett Figueroa calienta las redes sociales</a></p>';
        html += '</div>';
        html += '<span class="barDes"></span>';
        html += '<span class="arrow_left"></span>';
        html += '<span class="arrow_right"></span>';
        html += '<div class="barSocial">';
        html += '<a class="btnSocial" href="#"></a>';
        html += '<a class="btnTwitter" href="#"></a>';
        html += '<a class="btnFacebook" href="#"></a>';
        html += '<a class="btnGoogle" href="#"></a>';
        html += '</div>';
        
        var tempID = params.el.substr(1, params.el.length);
        
        for(var i = 0; i < data.length; i++){
            $(params.el).append('<img id="' + tempID + '-' + i + '" src="' + data[i].imagen + '" style="position:absolute"/>');
        }
        
        $(params.el).append(html);
        
        var interval = setInterval(nextImagen, 5000);
        nextImagen();
        
        function nextImagen(){
            if(first){
                first = false;
                $('#' + tempID + '-' + index).show();
                $('#' + tempID + '-' + index).css({position:'relative'});
            }else{
                clickeable = false;
                
                $('#' + tempID + '-' + index).hide('slide', {direction:'left'}, 1000);
                index++;
                if(index == data.length) index = 0;
                $('#' + tempID + '-' + index)
                    .css({position:'absolute'})
                    .show('slide', {direction:'right'}, 1000, function(){
                        $(this).css({position:'relative'});
                        $(params.el + ' .desImg p a').html(data[index].titular);
                        clickeable = true;
                    });
            }
        }
        
        function prevImagen(){
            clickeable = false;
            
            $('#' + tempID + '-' + index).hide('slide', {direction:'right'}, 1000);
            index--;
            if(index <= -1) index = data.length -1;
            $('#' + tempID + '-' + index)
                .css({position:'absolute'})
                .show('slide', {direction:'left'}, 1000, function(){
                    $(this).css({position:'relative'});
                    $(params.el + ' .desImg p a').html(data[index].titular);
                    clickeable = true;
                });
        }
        
        $(params.el + ' .arrow_left').click(function(){
            if(clickeable){
                clearInterval(interval);
                interval = setInterval(nextImagen, 5000);

                prevImagen();
            }
            
        });
        
        $(params.el + ' .arrow_right').click(function(){
            if(clickeable){
                clearInterval(interval);
                interval = setInterval(nextImagen, 5000);

                nextImagen();
            }
            
        });
    });
}