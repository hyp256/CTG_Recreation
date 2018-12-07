cc.Class({
    extends: cc.Component,
    //WelcomeScene    
    //StartLabel
    
    //ThrowingSandbags_Stage1Scene
    //STARTLABEL
    
    //DropHandkerchief_Stage2Scene
    //STARTLABEL
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
        duration:0,
        blinks:0,
    },

    // use this for initialization
    onLoad: function () {
        this.actionBlink();
    },
    
    //闪烁动作
    actionBlink: function(){
        var blink = cc.blink(this.duration, this.blinks);
        this.node.runAction(blink);
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
