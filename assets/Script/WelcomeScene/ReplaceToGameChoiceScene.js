cc.Class({
    extends: cc.Component,
    //WelcomeScene
    //Canvas

    //DropHandkerchief_Stage2Scene
    //CloseButton
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
        //BGM
        audioBGMSource: {
            type: cc.AudioSource,
            default: null
        },
    },

    // use this for initialization
    onLoad: function () {
        this.onTouch();
    },

    onTouch: function() {
        this.node.on('touchend', this.replaceToGameChoiceScene, this);
    },

    replaceToGameChoiceScene: function() {    
        //Õ£÷πBGM“Ù¿÷,Õ¯“≥∞Ê«–ªª≥°æ∞≤ªª·Õ£“Ù¿÷
        this.audioBGMSource.stop();
        cc.director.loadScene("GameChoiceScene");
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
