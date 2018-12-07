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
        Score: 0,
        //朝向
        //numFaceTo: 1,     
    },

    // use this for initialization
    onLoad: function () {
        this.randShengXiaoSpriteFrame();
    },

    randShengXiaoSpriteFrame: function() {
        var self = this;
        var randNum = cc.rand();
        //随机贴图号
        var numShengXiao = randNum % 12;
        //丢弃小数部分,保留整数部分
        numShengXiao = parseInt(numShengXiao);
        //朝向
        //var numFaceTo = randNum % 2;
        //取整
        //numFaceTo = parseInt(numFaceTo);
        //if(!numFaceTo){
        //    numFaceTo = -1;
        //}
        
        // 加载 SpriteAtlas（图集），并且获取其中的一个 SpriteFrame
        // 注意 atlas 资源文件（plist）通常会和一个同名的图片文件（png）放在一个目录下, 所以需要在第二个参数指定资源类型
        cc.loader.loadRes("Texture/ThrowingSandbags_Stage1Scene/SHENGXIAO", cc.SpriteAtlas, function (err, atlas) {
        var frame = atlas.getSpriteFrame('SHENGXIAO'+ numShengXiao);
        //console.log('SHENGXIAO'+ numShengXiao);
        //console.log(numFaceTo);
        //self.node.setScaleX(self.numFaceTo);
        var sprite = self.node.getComponent(cc.Sprite);
        sprite.spriteFrame = frame;
        //console.log("Node Scale: " + self.node.getScale());
        });        
    },

    imShengXiao: function() {
        console.log("ShengXiao-imShengXiao-immmmmmmmmmmmmmmmmmmmShengXiao");
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
