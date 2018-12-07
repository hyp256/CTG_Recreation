cc.Class({
    extends: cc.Component,
    //GameChoiceScene
    //ChoiceButton
    
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
        //场景ID
        StageID: 0,
        //BGM
        audioBGMSource: {
            type: cc.AudioSource,
            default: null
        },
    },

    // use this for initialization
    onLoad: function () {
        this.node.on('touchend', this.replaceToGameStage, this);
    },

    replaceToGameStage: function() {
        var Canvas = cc.find("Canvas");
        this.StageID = Canvas.StageID;
        console.log("replaceToStage:",this.StageID);
        var nameScene = '';
        switch (this.StageID)
		    {
		    case 1:
			    nameScene = 'ThrowingSandbags_Stage1Scene'; break;
		    case 2:
			    nameScene = 'DropHandkerchief_Stage2Scene'; break;
		    case 3:
			    nameScene = 'JumpHouse_Stage3Scene';break;
		    default:
			    break;
		    }
        //停止BGM音乐,网页版切换场景不会停音乐
        this.audioBGMSource.stop();
        cc.director.loadScene(nameScene);
        //cc.director.loadScene("GameChoiceScene");
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
