//设计游戏类
class Game {
    constructor(select,scoreEle,gameoverbg) {
        //获取开始按钮
        this.startbtn = document.querySelector("#start");
        //获取游戏结束按钮
        this.gameoverbtn = document.querySelector(gameoverbg);
        //获取游戏结束时的图片
        this.gameoverimg = document.querySelector(gameoverbg);
        //地图
        this.map = document.querySelector(select);
        //计分板
        this.scoreEle = document.querySelector(scoreEle);
        //食物
        this.food = new Food(select);
        //蛇
        this.snake = new Snake(select);
        //定义计时器
        this.timer = 0;
        //得分
        this.cunt = 0;
       
        
    }
    //定义游戏开始的方法
    start(){

        this.timer=setInterval(()=>{

            //让蛇动起来
            this.snake.move();
            //判断是否吃到食物
            if(this.snake.isEat(this.food.x,this.food.y)){
                //吃到食物要变长，调用增加蛇头的方法
                this.snake.createHead();
                //食物的位置更新
                this.food.foodPos();
                //得分增加
                this.scorechange();
            }
            //判断蛇是否死亡
            if(this.snake.isDie()){
                clearTimeout(this.timer);
                this.gameover();
            }
        },500)
    }
    //暂停
    pause(){
        clearInterval(this.timer);
    }
    //重新开始
    restart(){
        //释放开始按钮
        this.startbtn.disabled = false;
        window.location.reload();
    }
    //改变方向
    change(type){
        this.snake.direction=type;
    }
    //得分增加
    scorechange(){
        this.cunt++;
        this.scoreEle.innerText = this.cunt;
    }
    //游戏结束
    gameover(){
        this.gameoverimg.style.display="block";
        //禁用掉开始按钮
        this.startbtn.disabled = true;
    }

}
