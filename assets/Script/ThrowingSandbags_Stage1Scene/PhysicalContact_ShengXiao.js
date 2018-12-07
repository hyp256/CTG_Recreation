cc.Class({
    extends: cc.Component,
    //ThrowingSandbags_Stage1Scene
    //ShengXiao
    
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
        audioSource: {
            type: cc.AudioSource,
            default: null
        },
    },

    // use this for initialization
    onLoad: function () {
    },

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact: function (contact, selfCollider, otherCollider) {
    },

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact: function (contact, selfCollider, otherCollider) {
        var score = this.node.Score;
        //console.log("PhysicalContact_ShengXiao&SandBag-onEndContact-&&&&&&&",score);
        
        //show分数动画
        var func = cc.callFunc(this.changeScoreTexTure2D, this, score);
        var delay = cc.delayTime(1);
        var removeSelf = cc.removeSelf();
        var seq = cc.sequence(func, delay, removeSelf);
        this.node.stopAllActions();
        this.node.setScale(1);
        this.node.runAction(seq);

        //刷新ScoreBoard
        var Canvas = cc.find("Canvas");
        var js = Canvas.getComponent('UpdateScoreData');
        js.reflushScore(score);

        //播放音效
        this.audioSource.play();
    },

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve: function (contact, selfCollider, otherCollider) {
    },

    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve: function (contact, selfCollider, otherCollider) {
    },

    //改变Score
    changeScoreTexTure2D: function(target, ScoreNum){
        var self = this;
        // 加载 SpriteAtlas（图集），并且获取其中的一个 SpriteFrame
        // 注意 atlas 资源文件（plist）通常会和一个同名的图片文件（png）放在一个目录下, 所以需要在第二个参数指定资源类型
        cc.loader.loadRes("Texture/ThrowingSandbags_Stage1Scene/SCORE", cc.SpriteAtlas, function (err, atlas) {
        var frame = atlas.getSpriteFrame(ScoreNum);
        var sprite = self.node.getComponent(cc.Sprite);
        sprite.spriteFrame = frame; 
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
