function vistoComentado(params){
    
    
    //cargar lo más visto
    $.getJSON(params.url_visto, function(data){
        var html = '';
        for(var i = 0; i < data.length; i++){
            
            var item = '';
            item += '<div class="item-visto lo-mas-item_' + data[i].categoria_letra + '">';
            item += '<p>' + data[i].categoria_nombre + '</p>'
            item += '<h3><a href="#">' + data[i].titular + '</a></h3>';
            item += '<p class="media-type">';
            if(data[i].tipo == "audio") item += '<img class="audio" src="images/media/ico_audio_gris.png">';
            if(data[i].tipo == "fotos") item += '<img class="fotos" src="images/media/ico_foto_gris.png">';
            if(data[i].tipo == "video") item += '<img class="video" src="images/media/ico_video_gris.png">';
            item += '<span>' + data[i].texto_bajo + '</span></p>';
            item += '</div>';
            
            html += item;
        }
        
        $(params.visto).html(html);
    });
    
    //cargar lo más comentado
    $.getJSON(params.url_comentado, function(data){
        var html = '';
        for(var i = 0; i < data.length; i++){
            
            var item = '';
            item += '<div class="item-visto lo-mas-item_' + data[i].categoria_letra + '">';
            item += '<p>' + data[i].categoria_nombre + '</p>'
            item += '<h3><a href="#">' + data[i].titular + '</a></h3>';
            item += '<p class="media-type">';
            if(data[i].tipo == "audio") item += '<img class="audio" src="images/media/ico_audio_gris.png">';
            if(data[i].tipo == "fotos") item += '<img class="fotos" src="images/media/ico_foto_gris.png">';
            if(data[i].tipo == "video") item += '<img class="video" src="images/media/ico_video_gris.png">';
            item += '<span>' + data[i].texto_bajo + '</span></p>';
            item += '</div>';
            
            html += item;
        }
        
        $(params.comentado).html(html);
    });
}