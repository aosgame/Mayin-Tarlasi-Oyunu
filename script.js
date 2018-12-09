$(function(){//kodlar sayfa tamamen yüklendikten sonra çalışacak

    var svg=Pablo('#ground').svg({
        width:310,
        height:310
    })

    var bombalar=new Array();
    var area=new Array(5);
    var pointX=10;
    var pointY=10;
    var bombaAdet=3;

    for(var i=0;i<area.length;i++){

        area[i]=new Array(5);
    }

    console.log(area);
    

    for(var i=0;i<bombaAdet;i++){
        var bomba={
            x:Math.floor(Math.random()*5),
            y:Math.floor(Math.random()*5)
        }
        bombalar.push(bomba);
    }

    console.log(bombalar);

    for(var x=0;x<5;x++){
        for(var y=0;y<5;y++){

            var kutu={
                value:0,
                kare:kareOlustur(pointX,pointY,'#dcdde1'),
                pointX:pointX,
                pointY:pointY
            }

            area[x][y]=kutu;

            for(var i=0;i<bombalar.length;i++){
                if(x==bombalar[i].x && y==bombalar[i].y){

                    var kutu={
                        value:null,
                        kare:kareOlustur(pointX,pointY,'#dcdde1'),
                        pointX:pointX,
                        pointY:pointY
                    }
                }
                area[x][y]=kutu;
            }

            pointY=pointY+60;
        }
        pointX=pointX+60;
        pointY=10;
    }

    for(var x=0;x<5;x++){
        for(var y=0;y<5;y++){
            if(area[x][y].value==null){
                //console.log(x+','+y);
                for(var i=x-1;i<=x+1;i++){
                    for(var j=y-1;j<=y+1;j++){
                        //area[i][j].value=area[i][j].value+1;
                        if(i<0||i>4){

                        }else{
                            if(j<0||j>4){

                            }else{
                                if(area[i][j].value!=null)
                                    area[i][j].value=area[i][j].value+1;
                            }
                        }
                    }
                }
                area[x][y].value=null 

            }
        }
    }

    for(var x=0;x<5;x++){
        for(var y=0;y<5;y++){
            // if(area[x][y].value!=null){
            //     textOlustur(area[x][y].pointX,area[x][y].pointY,'#1abc9c',area[x][y].value)
            // }

            var obj=Pablo(area[x][y].kare[0])
            console.log(obj);

            obj.on('click',function(e){

                var PointX=Pablo(this).attr('x');
                var PointY=Pablo(this).attr('y');
                var value;

                for(var x=0;x<5;x++){
                    for(var y=0;y<5;y++){
                        if(area[x][y].pointX==PointX && area[x][y].pointY==PointY){
                            value=area[x][y].value;
                            PointX=area[x][y].pointX;
                            PointY=area[x][y].pointY;
                        }
                    }
                }

                if(value!=null){
                    textOlustur(PointX,PointY,'#1abc9c',value);
                }
                else{
                    Pablo(this).attr('fill','#2c3e50');
                    if(confirm('Yeniden Oynamak İster misiniz')){
                        window.location.reload(false);
                    }else{
                            
                    }
                }


            }).css({cursor:'pointer'})
            

        }
    }


    function kareOlustur(x,y,renk){

        var kare=svg.rect({
            x:x,
            y:y,
            width:50,height:50,
            fill:renk
        });

        return kare;
    }

    function textOlustur(x,y,renk,value){

        text=svg.text({
            x:x+20,y:y+35,
            fill:renk,
            'font-size':'15px',
            'font-family':'sans-serif'
        });

        text.content(value);
    }
    
    
    
})