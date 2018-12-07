cc.Class({
    extends: cc.Component,
    //JumpHouse_Stage3Scene
    //LeftButton
    //RightButton
    
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
        
        LeftOrRight: 0,
        
        PlayerNode: {
            default: null,
            type: cc.Node,
        },        
    },


    // use this for initialization
    onLoad: function () {
        this.node.on('touchstart', this.onTouchStart, this);
        this.node.on('touchmove', this.onTouchMove, this);
        this.node.on('touchend', this.onTouchEnd, this);        
    },

    //按下按钮后移动
    onTouchStart: function(event){
        this.playerMove();
        this.Animate();
    },

    onTouchMove: function(event){
    },

    //放开按钮后立即停止动作
    onTouchEnd: function(event){
        this.PlayerNode.stopActionByTag(1);
    },

    //player左右移
    playerMove: function (){
        var moveBy = cc.repeatForever(cc.moveBy(0.1,cc.v2(0,4*this.LeftOrRight)));
        moveBy.setTag(1);
        this.PlayerNode.runAction(moveBy);
    },
    
    //移动动画
    Animate: function()
    {
    	if (this.PlayerNode){
            var animation = this.PlayerNode.getComponent(cc.Animation);
            var clips = [];
            clips = animation.getClips(); 
            //console.log(clips);
            //console.log(clips[1].name);
            var a = animation.play(clips[0].name);
            //console.log(a.name);
            
    	}
    },    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
