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
        //Player
        PlayerNode: {
            default: null,
            type: cc.Node,
        },
        //ontouchMove要换的贴图
        changeTexture2DontouchMove: {
            default: null, 
            type : cc.SpriteFrame,
        },
        //ontouchEnd要换的贴图        
        changeTexture2DontouchEnd: {
            default: null, 
            type : cc.SpriteFrame,
        },        
        //Player面朝方向,true-right,false-left
        PlayerFaceto: true,
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
    },

    onTouchStart: function(event){
        var touches = event.getTouches();
        this.pointStart = touches[0].getLocation();
        console.log(this.pointStart.x);
        this.PlayerNode.setPositionX(this.pointStart.x-640);
    },

    onTouchMove: function(event){
        //同时暂停动画
        var anim = this.PlayerNode.getComponent(cc.Animation);
        //如果没有指定则是当前正在播放的对象
        anim.pause();
        
        //根据手势方向改变精灵翻转
        var touches = event.getTouches();
        this.pointMove = touches[0].getLocation();        
        this.playerFaceto(this.pointStart,this.pointMove);        
        
        //换move贴图
        var changeSprite = this.PlayerNode.getComponent(cc.Sprite);
        //修改spriteFrame
        changeSprite.spriteFrame = this.changeTexture2DontouchMove;
    },
    
    onTouchEnd: function(event){
        //var touches = event.getTouches();
        //this.pointEnd = touches[0].getLocation();

        //换end贴图
        var changeSprite = this.PlayerNode.getComponent(cc.Sprite);
        //修改spriteFrame
        changeSprite.spriteFrame = this.changeTexture2DontouchEnd;
        //1秒后执行1次
        this.scheduleOnce(function() {
            //恢复动画
            var anim = this.PlayerNode.getComponent(cc.Animation);
            //如果没有指定则是当前正在播放的对象
            anim.resume();      
        }, 1);
    },
    
    playerFaceto: function(start,end){
        var shifting = cc.pSub(end,start);
        console.log(shifting.x);
        if(shifting.x>=0){
            console.log("------------------------");
            this.PlayerNode.setScaleX(-1);
            return true;
        }else{
            console.log("+++++++++++++++++++++++++");
            this.PlayerNode.setScaleX(1);
            return false;
        }
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
