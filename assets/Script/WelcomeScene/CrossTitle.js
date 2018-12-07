cc.Class({
    extends: cc.Component,
    //WelcomeScene
    //leftBar
    //rightBar
    
    //GameChoiceScene
    //Stage1
    //Stage2
    //Stage3
    
    //ThrowingSandbags_Stage1Scene
    //CURTAIN_TOP
    
    //DropHandkerchief_Stage2Scene
    //CURTAIN_MOVE
    
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
        //半幕position
        //halfBarPosition: cc.Vec2.ZERO,
        
        //半幕anchor
        //halfBarAnchor: cc.Vec2.ZERO,
        
        //半幕scale
        //halfBarScale: cc.Vec2.ONE,
        
        //scaleDuration
        scaleDuration: 0,
        
        //scaleDirection,xTrue,yfalse
        scaleDirection: true,
        
        //半幕size
        //halfBarSize: cc.Vec2.ZERO,
        
        //操作类型
        //0:不执行, 1:立即执行, 2:触摸执行
        doActCase:0,
        
        //2触摸重复,true重复,false不重复
        touchRepeat:false,
        //从场景根节点开始逐级查找幕布结点Bar
        findBarPath:"",
    },

    // use this for initialization
    onLoad: function () {

        switch(this.doActCase){
        case 0:break;
        case 1:this.actCross();break;
        case 2:this.node.on('touchend', this.actCross, this);break;
        default:break;   
        }
        
    },
    
    actCross: function() {
        var sx;
        var sy;
        var scaleNode = cc.find(this.findBarPath);
        if(this.scaleDirection){
            sx = 0;
            sy = 1;
        }else{
            sx = 1;
            sy = 0;
        }
        var actScale = cc.scaleTo(this.scaleDuration, sx, sy);
        scaleNode.setScale(cc.Vec2.ONE);
        scaleNode.runAction(actScale);
        if(!this.touchRepeat){
            this.node.off('touchend', this.actCross, this);            
        }
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
