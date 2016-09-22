function getclass(selector,father){
	father=father||document
	if(father.getElementsByClassName){//1判断浏览器
		return father.getElementsByClassName(selector)
		//如果是可以用ClassName
	}else{//不可以则通过标签名获取大方围
		var newarr=[]
		var all=father.getElementsByTagName("*");
		for(var i=0;i<all.length;i++){//4遍历集合
			if(check(all[i].className,selector)){
				//5判断集合里的每一个==selector
				newarr.push(all[i])
				//6找到后保存新的数组
			}
		}
		return newarr//7返回新数组
	}
}


function check(str,selector){
	var arr=str.split(" ");//字符串转换为数组
	for(var i in arr){//遍历数组
		if(arr[i]==selector){
		//判断每一个每一个元素==selector
			return true;
			//条件为真时，表示找到了，返回这个真的
		}
	}
	return false;
	//所有元素比较后，都没有找到，返回假的
}




//获取样式的兼容
function getstyle(ele,attr){
	if(ele.currentStyle){
        return ele.currentStyle[attr]
	}else{
        return  getComputedStyle(ele,null)[attr];
	}
}

//获取元素的函数
// .box
// #one
// a p
// $(".box") 以类名
// $("#one") 以ID名
// $("p")    以标签
function $ (selector,father) {
	father=father||document
	if(typeof selector=="string"){
		selector=selector.replace(/^\s*|\s*$/g,"")
		if(selector.charAt(0)=="."){
			return getclass(selector.slice(1),father)
		}else if(selector.charAt(0)=="#"){
			return father.getElementById(selector.slice(1))
		}else if(/^[a-z1-6]{1,10}$/i.test(selector)){
            return father.getElementsByTagName(selector)
           }
		}else if(typeof selector=="function"){
			addEvent(window,"load",selector)
			
		 
	}
}



//获取元素子节点兼容函数
//元素子节点"a"
//元素子节点加文档"b"
function getchilds (father,type) {
	type=type||"a"
	var newall=[]
	var all=father.childNodes;
	for (var i = 0; i < all.length; i++) {
		if (type=="a") {
			if (all[i].nodeType==1) {
             newall.push(all[i])
		  }
		}else if(type=="b"){
			if (all[i].nodeType==1 || all[i].nodeType==3 && all[i].nodeValue.replace(/^\s*|\s*$/g,"")!="") {
				newall.push(all[i])
			};
		}
		
	}
	return newall
}



//第一个子节点
function getFirst(father){
	return getchilds(father)[0]
}

//最后一个子节点
function getLast(father){
	return getchilds(father)[getchilds(father).length-1]
}


//任意子节点
function getNum(father,num){
	return getchilds(father)[num]
}



//获取下一个兄弟节点
function getNext(ele){
	var next=ele.nextSibling;
    if(next==null){
			return false
		}
	while(next.nodeType==3 ||next.nodeType==8){
		next=next.nextSibling
		if(next==null){
			return false
		}
	}
	return next
}

//获取上一个兄弟节点
function getPrevious(ele){
	var up=ele.previousSibling;
    if(up==null){
			return false
		}
	while(up.nodeType==3 ||up.nodeType==8){
		up=up.nextSibling
		if(up==null){
			return false
		}
	}
	return up
}


function insertAfter(father,newNode,node){
	var next=getNext(node);
	if(next){
		father.insertBefore(newNode,next)
	}else{
		father.appendChild(newNode)
	}
}



//同一事件绑定多个处理程序
function addEvent(obj,event,callback){
	if (obj.addEventListener) {
		obj.addEventListener(event,callback,false)
	}else{
		obj.attachEvent("on"+event,callback)
	}
}

//删除
function delEvent(obj,event,callback){
	if(obj.removeEventListener){
		obj.removeEventListener(event,callback)
	}else{
		obj.detachEvent("on"+event,callback)
	}
}