var indexDiv=document.getElementById("index");
var dataDiv=document.getElementById("data");
var addButton=document.getElementById("add");
var addAtIndexButton=document.getElementById("addAtIndex");
var removeButton=document.getElementById("remove");
var removeIndexButton=document.getElementById("removeByIndex");


var boxContainer=document.createElement("div")
boxContainer.setAttribute("class","boxContainer")
var box=document.createElement("div");
box.className="box";
var address=document.createElement("div");
address.className="address";

//
/**
 * {
 *  data:1,
 *  next:{
 *      data:2,
 *      next:{
 *          data:3,
 *          next:{
 *              data:4,
 *              next:null
 *              }
 *            }
 *          }
 * }
 * 
 */
function Node(data){
    this.data=data;
    this.next=null
}

function LinkedList(){
    this.head=null;
    this.size=0;
    
}

/**
 * When node is empty=?Done
 * add at begining=>Done
 * add at end 
 * add at any position
 */
LinkedList.prototype.add=function(data,position=null){
    let node=new Node(data,position)
   
    if(this.head===null){
        this.head=node
    }
    else if(this.size>0&&position==0){
        current=this.head;
        this.head=node;
        this.head.next=current;
    }
    else if(position!==null && position<this.getSize()){
        let current=this.head;
        let previous;
        let currentIndex=0;
        while(currentIndex<position){
           previous=current;
           current=current.next;
           currentIndex++;
        }
        node.next=current;
        previous.next=node
    }
    else{
        let current=this.head;

        while(current.next){
            current=current.next
        }
        current.next=node
    }
    this.size++;
    
}

/**
 * remove nothing=null;
 * remove last
 * remove first
 * remove by index 
 * 
 */

LinkedList.prototype.remove=function(index=null){
    let current=this.head;
    let previous;
    if(index<0||index>this.size){
       return "Invalid index"
    }
    if(this.isEmpty()){
        return -1;
    }
    else if(index===0){
        this.head=current.next;
    }
    else{
        
        let count=0;
        while(count<index){
            previous=current;
            current=current.next;
            count++
          }
          previous.next=current.next;
    }
    this.size--;
 
 }



LinkedList.prototype.getIndexOf=function(elementData){
    let position=[];
    let current=this.head
    for(let i=0;i<this.getSize();i++){
        if(current.data===elementData){
            position.push(i);
        }
        current=current.next
    }
    return position;
}

/**
 * Get the size
 */
LinkedList.prototype.getSize=function(){
   return this.size;
}

/**
 * isEmpty
 */

 LinkedList.prototype.isEmpty=function(){
     return this.getSize()===0;
 }

 /**
  * PRINT
  * return array/-1(when emptu)
  */

  LinkedList.prototype.print=function(){
    let array=[];
    if(this.isEmpty()){
        return -1
    }
    else{
        let current=this.head;
        while(current.next){
            array.push(current.data);
            current=current.next
        }
        array.push(current.data)
    }
    return array;
  }



//BOx
class Box extends LinkedList{
   constructor(_index){
    super();
    this.index=_index;
    this.randomAddress=[];
   }

   set setIndex(index){
    this.index=index
   }
   get getIndex(){
       return this.index
   }
   createRandomAddress(){
       let randomString=Math.floor(Math.random()*0x10000).toString(16).substring(1);
       this.index===null?this.randomAddress.push(randomString):
        this.randomAddress.splice(this.index-1,0,randomString)
   }

   removeRandomAddress(){
        this.index===null?this.randomAddress.pop():this.randomAddress.splice(this.index-1,1)    
   }

    createBox(){
        let renderArea=document.querySelector(".renderArea");
        renderArea.innerHTML="";
        let count=0;
        let previousAddress="head";
        let data=this.print();
        console.log("this.rand",this.randomAddress)
        console.log(this.size);
        while(count<=this.size){
            
            let nextAddress="null"
            if(this.size!==0&&count<this.size){
                nextAddress=this.randomAddress[count];
              
            }
            var boxContainer=document.createElement("div")
            boxContainer.setAttribute("class","box-container")
            if(count>0){
           
                boxContainer.style.width="85px";
                let dataBox=document.createElement("div");
                dataBox.className="box";
                dataBox.id="dataBox";
                dataBox.innerHTML=data[count-1];
                boxContainer.appendChild(dataBox)  
            }
            var addressBox=document.createElement("div");
            addressBox.className="box";
            addressBox.id="addressBox";
            addressBox.innerHTML=nextAddress
            boxContainer.appendChild(addressBox)
            var address=document.createElement("div");
            address.className="address";
            address.innerHTML=previousAddress;
            boxContainer.appendChild(address)
            previousAddress=nextAddress;
            renderArea.appendChild(boxContainer);
            count++;
        } 

    }

}


//

addButton.addEventListener('click',()=>{return addFunction(0)})
addAtIndexButton.addEventListener('click',()=>{return addFunction(1)})
removeButton.addEventListener('click',()=>{return removeFunction(0)})
removeIndexButton.addEventListener('click',()=>{return removeFunction(1)})



var boxObj=new Box(-1);
function addFunction(identifier){

    let data=dataDiv.value?dataDiv.value:null;
    let index=indexDiv.value?indexDiv.value:null;
    let condition= identifier===1?data && index:data

    if(condition){
        document.getElementById("validDiv").innerHTML="";
        boxObj.setIndex= identifier===1?index-1:null;
     
        identifier===1?boxObj.add(data,index-1):boxObj.add(data);
        boxObj.createRandomAddress();
        boxObj.createBox();
    }
    else{
        
        document.getElementById("validDiv").innerHTML=data===null?"Enter some data":"Enter the index where you want to add"
    }
}


function removeFunction(identifier){
    
    let index=indexDiv.value?indexDiv.value:null;
    index=identifier===1?index:index>boxObj.getSize()-1?boxObj.getSize()-1===0?true:boxObj.getSize()-1:false;
    if(index){
        document.getElementById("validDiv").innerHTML="";
        
        boxObj.setIndex=index-1;
        // let boxObj=new Box(data,index);
        boxObj.remove(index-1);
        boxObj.removeRandomAddress();
        boxObj.createBox();
    }
    else{
        document.getElementById("validDiv").innerHTML="Enter the index where you want to add";
    }
}
//class

