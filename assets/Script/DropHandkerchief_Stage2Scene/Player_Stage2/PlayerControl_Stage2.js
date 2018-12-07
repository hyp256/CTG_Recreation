cc.Class({
    extends: cc.Component,
    //DropHandkerchief_Stage2Scene
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
    
        PlayerNode: {
            default: null,
            type: cc.Node,
        },
    
        //手势起点
        pointStart:cc.Vec2.ZERO,
        //手势Move点
        pointMove: cc.Vec2.ZERO,        
        //手势终点
        pointEnd: cc.Vec2.ZERO,
    },

    // use this for initialization
    onLoad: function () {
        this.node.on('touchstart', this.onTouchStart, this);
        this.node.on('touchmove', this.onTouchMove, this);
        this.node.on('touchend', this.onTouchEnd, this); 
        
        var animation = this.PlayerNode.getComponent(cc.Animation);
        var clips = [];
        clips = animation.getClips(); 
        console.log(clips);
        
    },

    onTouchStart: function(event){
        var touches = event.getTouches();
        this.pointStart = touches[0].getLocation();
        this.SpriteSpeedMove(this.PlayerNode,this.pointStart);
    },

    onTouchMove: function(event){
        //var touches = event.getTouches();
        //this.pointMove = touches[0].getLocation();
        //this.SpriteSpeedMove(this.PlayerNode,this.pointMove);
    },
    
    onTouchEnd: function(event){
    },

    SpriteSpeedMove: function(sprite, touchPoint){
        sprite.stopAllActions();
        var PlayerPos = this.PlayerNode.getPosition();
        //去除偏移量
        touchPoint = cc.pSub(touchPoint,cc.v2(640,360));
	    //速度 = 距离/s
	    var speed = 50/1;
	    //取向量长度
	    var holderNodeLocation = cc.pSub(touchPoint, PlayerPos);
	    var s = holderNodeLocation.mag();
	    var t = s / speed;

        var move = cc.moveTo(t,touchPoint);
	    if (sprite){
            sprite.runAction(move);
	    }
	    
	    var PlayerAnimation_Stage2 = this.PlayerNode.getComponent("PlayerAnimation_Stage2");
	    PlayerAnimation_Stage2.SpriteMoveDongHua(holderNodeLocation);
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
