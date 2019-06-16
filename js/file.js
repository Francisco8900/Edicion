var Wx,Wy,Wy1=0;
var imagen;    
var componenetx,componenety;
const  x0=100;
      const y0=0;
      const w0=670;
      const h0=420;
      const w=w0-x0;
      const h=420;

      function iniciar(){
    var elemento=document.getElementById('lienzo');
    lienzo=elemento.getContext('2d');
var kx=screen.width;
Sx=(300-kx)/2;
Sy=150;
lienzo.translate(Sx,Sy);
    var archivos=document.getElementById('archivos');
    archivos.addEventListener('change', procesar, false);
    window.webkitRequestFileSystem(window.PERSISTENT, 5*1024*1024,
    creardd, errores);
    //alert('funciona hasta aqui');

}
   function creardd(sistema){
    dd=sistema.root;
    cargarlienzo();
   }
   function errores(e){
//    alert('Error: '+e.code);
   }
   function componenteMayor(  componente){
    componenteA=componente;
        Cx=(300/componente)*componente;
    return Cx;
       }
       
       function componenteOpuesta( componenteO){
          Cy= (Cx/componenteA)*componenteO;
          return Cy;
       }
       function componenteMenor(  componente){
        componenteA=componente;
            Cx=(componente/300)*componente;
        return Cx;
           }
           
           function componenteOpuestaMenor( componenteO){
              Cy= (componenteA/Cx)*componenteO;
              return Cy;
           }
               function procesar(e){
    var archivos=e.target.files;
    for(var f=0;f<archivos.length;f++){
    var archivo=archivos[f];
    if(archivo.type.match(/image.*/i)){
    var lector=new FileReader();
    lector.onload=mostrar;
    lector.readAsDataURL(archivo);
    
}
    }
   }
   function valorY(componenteyy){
       Yy=(300-componenteyy)/2;
       return Yy;
   }
   function mostrar(e){
    var resultado=e.target.result; 
     imagen=new Image();
     imagen.src=resultado;
    componenetx=imagen.width;
     componenety=imagen.height;
    alert('componente X'+componenety);
    
     if(componenetx>=componenety){
        alert('hasta aqui funciona X>Y !='+componenetx);

        if(componentx>300){
           Wx= componenteMayor(componenetx);
           Wy=componenteOpuesta(componenety);
            Wy1=valorY(Wy);
            alert('hasta aqui funciona X>300');
        }else{
            alert('hasta aqui funciona Y > X'+componenetx);

            Wx=componenteOpuestaMenor(componenetx);
            Wy=componenteOpuesta(componenety);
            Wy1=valorY(Wy);
            alert('hasta aqui funciona X<300');
        }
    }else{
        alert('hasta aqui funciona Y>X'+componenetx);

        if(componenety>300){
        Wy=componenteMayor(componenety);
        Wx=componenteOpuestaMenor(componenetx);
        alert('hasta aqui funciona Y>300');
    
    
    }else{
        Wy=componenteOpuestaMenor(componenety);
        Wx=componenteOpuesta(componenetx);
        Wy1=valorY(Wy);
        alert('hasta aqui funciona Y<300');
    
    }   
    }

    lienzo.translate(0,Wy1);

    imagen.addEventListener("load", function(){
        var x1=imagen.width;
        var y1=imagen.height;
        alert('valor X'+x1);
        var x2=y1*((w*w/h)/x1);
        var gx=(x2-x0)/2;
        var s;
        if(x1<y1){
    s=1+x1/y1;
}else{
    s=1+y1/x1;
}
var qx,qy;
if(x1<w/3)
{
    qx=s*x1;
 qy=s*y1;
       }else{
qx=x1;
qy=y1;
       }
              lienzo.drawImage(imagen,Wx,Wy);
    
            }, false);
   }
   function cargarlienzo(){
    dd.getFile('lienzo.dat', {create: false}, function(entrada) {
    entrada.file(function(archivo){
    var lector=new FileReader();
    lector.onload=function(e){
    var imagen=new Image();
    imagen.src=e.target.result;
    imagen.addEventListener("load", function(){
    lienzo.drawImage(imagen,0,0);
    }, false);
    };
    lector.readAsBinaryString(archivo);
    }, errores);
    }, errores);
   }
   function grabarlienzo(){
    var elemento=document.getElementById('lienzo');
    var info=elemento.toDataURL();
    dd.getFile('lienzo.dat', {create: true, exclusive: false},
    function(entrada) {
    entrada.createWriter(function(fileWriter){
    var blob=new WebKitBlobBuilder();
    blob.append(info);
    fileWriter.write(blob.getBlob());
    }, errores);
    }, errores);
   }
   window.addEventListener('load', iniciar, false);