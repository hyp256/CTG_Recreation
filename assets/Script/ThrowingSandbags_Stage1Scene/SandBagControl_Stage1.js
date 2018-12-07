cc.Class({
    extends: cc.Component,
    //ThrowingSandbags_Stage1Scene
    //GameControl
    
    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        //手势起点
        pointStart:cc.Vec2.ZERO,
        //手势Move点
        pointMove: cc.Vec2.ZERO,        
        //手势终点
        pointEnd: cc.Vec2.ZERO,
        //Canvas
        Canvas:{
            default:null,
            type: cc.Node,
        },       
        //Player
        Player:{
            default:null,
            type: cc.Node,
        },
    },

    // use this for initialization
    onLoad: function () {
        this.node.on('touchstart', this.onTouchStart, this);
        this.node.on('touchmove', this.onTouchMove, this);
        this.node.on('touchend', this.onTouchEnd, this);        
    },
    
    onTouchStart: function(event){
        var touches = event.getTouches();
        this.pointStart = touches[0].getLocation();
        console.log("SandBagControl_Stage1-onTouchStart-this.pointStart",this.pointStart);
    },

    onTouchMove: function(event){

    },
    
    onTouchEnd: function(event){
        var self = this;
        var touches = event.getTouches();
        this.pointEnd = touches[0].getLocation();
        var shifting = cc.pSub(this.pointEnd,this.pointStart);
        // 加载 Prefab,设定逻辑
        cc.loader.loadRes("Prefab/ThrowingSandbags_Stage1Scene/SandBag", function (err, prefab) {
        var newNode = cc.instantiate(prefab);
        newNode.setScale(self.Player.getScale());
        newNode.setPosition(cc.pAdd(self.Player.getPosition(),cc.v2(0,80)));
        console.log("PlayerControl_Stage1-onTouchEnd-self.Player.getPosition()",self.Player.getPosition());
        //self.Canvas.addChild(newNode);
        self.node.addChild(newNode);        
        
        //移动,到端点自毁
        //var delta = self.createMoveDelta(self.numFaceTo);
        //var movDuration = self.createMoveTime(r2);
        //console.log("createShengXiao-movDuration:",movDuration);
        //var movBy = cc.moveBy(3,shifting);
        console.log("PlayerControl_Stage1-onTouchEnd-shifting",shifting);
        //var removeSelf = cc.removeSelf();
        //var seq = cc.sequence(movBy, removeSelf);
        //newNode.runAction(movBy);
        //必须向上扔
        if(shifting.y>0){
            self.flySandBag(newNode,shifting);
        }

        //根据手势方向改变精灵翻转,不需要,方向与父节点同步了
        });          
    },
    //近似抛物线运动
    flySandBag: function(nodeSandBag,shifting){
        //第一点,SandBag初始点,在抛物线上
        var startPoint = nodeSandBag.getPosition();
        //canvas的x轴位置在-640,y轴位置在-360而不是0,先转换坐标便于模型计算
        startPoint = cc.pAdd(startPoint,cc.v2(640,360));
	    //第二点，touchStartPoint点到touchEndPoint位移量，在抛物线上
	    var mid_cPoint = cc.pAdd(startPoint,shifting);

	    //直线k1,Mid_lPoint与startPoint连接线
	    //方程startPoint.y = i*k1*startPoint.x + c1
	    //mid_lPoint = i*k1*mid_cPoint.x + c1
	    var k1 = (2*(mid_cPoint.y - startPoint.y)/(mid_cPoint.x - startPoint.x));	    
	    var c1 = startPoint.y - k1*(startPoint.x);
	    //直线k2,Mid_cPoint与 startPoint关于x=mid_cPoint.x的在抛物线上的对称点 连接线
	    //var k2 = (startPoint.y - mid_cPoint.y)/(mid_cPoint.x - startPoint.x);
	    //var c2 = mid_cPoint.y - k2*mid_cPoint.x;
	    
	    //相对于第二点，直线运动本来应该到达的坐标，在这个时刻后SandBag表现为开始自由落体
	    //此刻y方向上的速度为0,g*t1 = (Mid_lPoint.y - StartPoint.y)/t1
	    //受到了重力的影响，向下运动了距离S = 1/2*g* pow(t1, 2) = Mid_cPoint.y - StartPoint.y
	    //根据两个方程解得Mid_lPoint.y = 2 * Mid_cPoint.y - StartPoint.y
	    //var mid_lPoint = cc.v2(mid_cPoint.x, 2 * mid_cPoint.y - startPoint.y);	    
	    //从k1解得也一致
        var mid_lPoint = cc.v2(mid_cPoint.x, k1 * mid_cPoint.x + c1 );
	    //实际直线运动应该到达的偏移量
	    var  EndPoint = cc.Vec2.ZERO;
	    EndPoint = cc.pSub(mid_lPoint,startPoint);

	    //重力加速度
	    var g = 320;
	    //时间段t1,从第一点运动到第二点的时间，从已得可得
	    var t1 = Math.sqrt(Math.abs(2*(mid_lPoint.y - mid_cPoint.y) / g));

	    /*console.log("------------------------------------------------------------------------------------");
	    console.log("PlayerControl_Stage1-flySandBag-startPoint",startPoint);
	    console.log("PlayerControl_Stage1-flySandBag-mid_cPoint",mid_cPoint);	    
	    console.log("PlayerControl_Stage1-flySandBag-mid_lPoint",mid_lPoint);
	    console.log("PlayerControl_Stage1-flySandBag-k1c1",k1,c1);	    
	    console.log("PlayerControl_Stage1-flySandBag-t1",t1);
	    //console.log("PlayerControl_Stage1-flySandBag-t2",t2);	    
	    console.log("PlayerControl_Stage1-flySandBag-EndPoint",EndPoint);
	    console.log("------------------------------------------------------------------------------------");	    
	    */
	    var moveBy = cc.repeatForever(cc.moveBy(t1, EndPoint));
	    nodeSandBag.runAction(moveBy);
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
