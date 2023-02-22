//蛇对象
class Snake{
    constructor(select){
        this.map=document.querySelector(select);
        //蛇的运动方向
        this.direction="right";
        //蛇的数组（把蛇的头和身体都存储到数组当中，头从数组的第0位开始）
        this.snakeList=[];
        //调用一条蛇函数
        this.createSnake();
        this.move();
        
    }
    //创建蛇头的函数
    createHead(){
        //获取数组当中的第0位找到蛇头
        const head=this.snakeList[0];
        
        //定义坐标
        const pos={x:0,y:0};
        if(head){
            //如果有蛇头那么创建新的蛇头放到原先蛇头后面的坐标位置上
            //新蛇头坐标一定发生改变，改变方向我们需要罗列一下
            switch(this.direction){
                case "left":
                    pos.x=head.offsetLeft-20;
                    pos.y=head.offsetTop;
                    break;
                case "right":
                    pos.x=head.offsetLeft+20;
                    pos.y=head.offsetTop;
                    break;
                case "top":
                    pos.x=head.offsetLeft;
                    pos.y=head.offsetTop-20;
                    break;
                case "bottom":
                    pos.x=head.offsetLeft;
                    pos.y=head.offsetTop+20;
                    break;
                default:
                    break;

            }
            //需要把原先的蛇头变成身体
            head.className="body";
        }
        //创建蛇头
        const div=document.createElement("div");
        //定义样式
        div.className="head";
        //把蛇头存入数组
        this.snakeList.unshift(div);
        //给蛇头定义坐标
        div.style.left=pos.x+"px";
        div.style.top=pos.y+"px";
        //放到地图当中
        this.map.appendChild(div);
    }
    //创建一条蛇
    createSnake(){
        for(let i=0;i<4;i++){
            this.createHead();
        }
    }

    //蛇移动的方法
    move(){
        //思路是把原先的头部主标后面增加一个蛇头原本的蛇头变成身体，身体的末尾位置删除一个以此实现视觉上的位移
        //从数组中移除掉
        const body = this.snakeList.pop();
        //从页面删除
        body.remove();
        //新增蛇头
        this.createHead();

    }
    //判断蛇有没有吃到食物
    isEat(foodX,foodY){
        //判断坐标是否重合
        const head = this.snakeList[0];
        const headX = head.offsetLeft;
        const headY = head.offsetTop;

        if(foodX===headX && foodY===headY){
            return true;
        }
        return false;

    }
    //判断蛇死没死
    //判断蛇头有没有到边界
    isDie(){
        //判断蛇头有没有到边界
        const head = this.snakeList[0];
        const headX = head.offsetLeft;
        const headY = head.offsetTop;
        if(headX<0||headY<0||headX>=this.map.clientWidth||headY>=this.map.clientHeight){
            return true;
        }
            return false;
            
    }
    
}