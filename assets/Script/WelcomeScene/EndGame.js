cc.Class({
    extends: cc.Component,
    //WelcomeScene
    //CloseButton
    
    //GameChoiceScene
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
    },

    // use this for initialization
    onLoad: function () {
        this.onTouch();
    },

    onTouch: function() {
        this.node.on('touchend', this.endGame, this);
    },
    
    endGame: function(){
        cc.game.end();        
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
