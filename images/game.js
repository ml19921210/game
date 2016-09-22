/**
 * Created by 孟磊 on 2016/7/18.
 */
function game(){
    this.arr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W"];
    this.imgs={A:"images/A.png",B:"images/B.png",C:"images/C.png",D:"images/D.png",E:"images/E.png",F:"images/F.png",G:"images/G.png",H:"images/H.png",I:"images/I.png",J:"images/J.png",K:"images/K.png",L:"images/L.png",M:"images/M.png",N:"images/N.png",O:"images/O.png",P:"images/P.png",Q:"images/Q.png",R:"images/R.png",S:"images/S.png",T:"images/T.png",U:"images/U.png",V:"images/V.png",W:"images/W.png"}
    this.len=3;
    this.currArr=[];
    this.currSpan=[];
    this.clientW=document.documentElement.clientWidth;
    this.clientH=document.documentElement.clientHeight;
    this.speed=2
    this.t;
    this.life=3
    this.scroll=0
    this.zong=0
    this.teep=10
    this.dsb=$(".dsb")[0]
    this.dsb1=$(".dsb1")[0]
    this.dsb2=$(".dsb2")[0]
}
game.prototype={
    play:function(){
       //console.log(this.getRand(this.len))
        this._createLetter(this._getRand(this.len))
        this._move()
        this._key()
        var that=this
        this.dsb.onclick=function(){
          clearInterval(that.t)
          document.onkeydown=null
        }
        this.dsb1.onclick=function(){
          that._move()
          that._key()
        }
        this.dsb2.onclick=function(){
          location.reload()
        } 
},

       
   _getRand:function(num){
    var newarr=[]
    for(var i=0;i<num;i++){
        var letter=this.arr[Math.floor(Math.random()*this.arr.length)]
        while(this._checkLetter(letter,this.currArr)){
            letter=this.arr[Math.floor(Math.random()*this.arr.length)]
        }
        newarr.push(letter)
        this.currArr.push(letter)
    }
       return newarr
},
    _checkLetter:function (ele,arrele){
        for(var i=0;i<arrele.length;i++){
            if(ele==arrele[i]){
                return true
            }
        }
        return false
    },
    _createLetter:function(arr){
       var newarr=[]
        for(var i=0;i<arr.length;i++){
            var span=document.createElement("span")
            
            span.innerHTML="<img src="+this.imgs[arr[i]]+">"
            span.letter=arr[i]
            var lefts=(100+Math.random()*(this.clientW-200))
            span.lefts=lefts
            while(this._checkGot(lefts,this.currSpan)){
                lefts=(100+Math.random()*(this.clientW-200))
            }
            var tops=Math.random()*20-10
            newarr.push(span)
            this.currSpan.push(span)
            span.style.cssText="position:absolute;left:"+lefts+"px;top:"+tops+"px;"
            document.body.appendChild(span)
        }
        return newarr
    },
    _checkGot:function(aa,bb){
        for(var i=0;i<bb.length;i++){
            if(aa<bb[i].lefts+100&&aa>bb[i].lefts-100){
                return true
            }
        }
        return false
    },
   _move:function(){
       var that=this
       this.t=setInterval(function(){
           for(var i=0;i<that.currSpan.length;i++){
              var tops=that.currSpan[i].offsetTop+that.speed
               that.currSpan[i].style.top=tops+"px"
               if(tops>that.clientH){
                   document.body.removeChild(that.currSpan[i])
                   that.currSpan.splice(i,1)
                   that.currArr.splice(i,1)
                   that._createLetter(that._getRand(1))
                   that.life--
                   var life=$(".life")[0]
                   life.innerHTML=that.life
                   if(that.life<0){
                    that.dsb.onclick=null
                    that.dsb1.onclick=null
                       var box1=$(".box1")[0]
                       var box2=$(".box2")[0]
                       box1.style.display="block"
                       clearInterval(that.t)
                       box2.onclick=function(){
                           location.reload()
                       }
                   }
               }
           }
       },50)
   },
   _key:function(){
       var that=this
       document.onkeydown=function(e){
           var e=e||window.event
           for(var i=0;i<that.currSpan.length;i++){
               var jianzi=String.fromCharCode(e.keyCode)
               if(jianzi==that.currSpan[i].letter){
                   document.body.removeChild(that.currSpan[i])
                   that.currSpan.splice(i,1)
                   that.currArr.splice(i,1)
                   that._createLetter(that._getRand(1))
                   var scroll=$(".scroll")[0]
                   var zong=$(".zong")[0]
                   that.scroll++
                   scroll.innerHTML=that.scroll
                   that.zong++
                   zong.innerHTML=that.zong
                   if(that.scroll%that.teep==0){
                       that.scroll=0
                       that.dsb.onclick=null
                    that.dsb1.onclick=null
                       clearInterval(that.t)
                       var box3=$(".box3")[0]
                       var box6=$(".box6")[0]

                       box3.style.display="block"

                       box6.onclick=function() {
                           box3.style.display = "none"
                           that._next()
                       }
                   }
               }
           }
       }
   },
   _next:function(){
       var that=this
       clearInterval(that.t)
       for (var i = 0; i < that.currSpan.length; i++) {
           document.body.removeChild( that.currSpan[i])
       }
       that.currArr=[]
       that.currSpan=[]
       that.speed++
       if(that.speed>10){
           that.speed=10
       }
       that.len++
       if(that.len>13){
           that.len=13
       }
       that.dsb.onclick=function(){
          clearInterval(that.t)
          document.onkeydown=null
        }
        that.dsb1.onclick=function(){
          that._move()
          that._key()
        }
       that.teep+=5
       that._createLetter(that._getRand(that.len))
       that._move()
   }
}