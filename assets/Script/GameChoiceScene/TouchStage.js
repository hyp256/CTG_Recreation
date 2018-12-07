//var ChoiceButton = require("ChoiceButton");

cc.Class({
    extends: cc.Component,
    //GameChoiceScene
    //Stage1
    //Stage2
    //Stage3
    
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
        //变色的FrameNode名 
        frameName: "",
        //从场景根节点开始逐级查找结点MeanTitlePath
        MeanTitlePath:"",
        //场景ID
        StageID: 0,
        //要替换的MeanTitle贴图,中文
        changeTexture2D: {
            default: null,
            url: cc.Texture2D,
        },
        //要替换的MeanTitle贴图,英文
        changeTexture2D_EN: {
            default: null,
            url: cc.Texture2D,
        },
    },

    // use this for initialization
    onLoad: function () {
        this.onTouch();
    },

    onTouch: function(){
        this.node.on('touchstart', this.changeFrameOpacity, this);
        this.node.on('touchend', this.touchendCallback, this);
    },

    //按下时变为不透明
    changeFrameOpacity: function(){
        var frameSprite = this.node.getChildByName(this.frameName);
        frameSprite.setOpacity(255);
    },
    
    //放开时恢复透明并改变MeanTitle
    touchendCallback: function(){
        this.resetFrameOpacity();
        this.changeMeanTitle();
        this.sendStageID();
    },
    
    resetFrameOpacity: function(){
        var frameSprite = this.node.getChildByName(this.frameName);
        frameSprite.setOpacity(0);
    },

    //改变MeanTitle
    changeMeanTitle: function(){
        var changeNode = cc.find(this.MeanTitlePath);
        //贴图信息属于精灵组件
        var changeSprite = changeNode.getComponent(cc.Sprite);
        var LanguageButton = cc.find("Canvas/LanguageButton");
        var LanguageButton_js = LanguageButton.getComponent("LanguageButton");
        var lsign = LanguageButton_js.Lsign;
        if ((lsign %2) == 0) {
            changeSprite.spriteFrame.setTexture(this.changeTexture2D_EN);
        console.log("Lsign:",lsign);
        }else if ((lsign %2) == 1){
            changeSprite.spriteFrame.setTexture(this.changeTexture2D);
        console.log("Lsign:",lsign);
        }
    },

    //显示确认按钮并传送StageID
    sendStageID: function(){
        var Canvas = cc.find("Canvas");
        Canvas.StageID = this.StageID;
        console.log("Canvas.StageID:",Canvas.StageID,"this.StageID",this.StageID);

        var ChoiceButton = cc.find("Canvas/ChoiceButton");
        var widC = ChoiceButton.getComponent("cc.Widget");
        widC.right = -44;
        ChoiceButton.setPositionX(580);
        //刷新Widget布局
        widC.updateAlignment();

        var LanguageButton = cc.find("Canvas/LanguageButton");
        var widL = LanguageButton.getComponent("cc.Widget");
        widL.left = -44;
        LanguageButton.setPositionX(180);
        //刷新Widget布局
        widL.updateAlignment();
    }
    
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
