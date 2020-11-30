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

  let list=new LinkedList();
