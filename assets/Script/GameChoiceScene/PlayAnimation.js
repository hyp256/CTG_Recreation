cc.Class({
    extends: cc.Component,
    //GameChoiceScene
    //AnimationClip_Stage1
    //AnimationClip_Stage2
    //AnimationClip_Stage3

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
        //动画名 
        animName:'',
    },

    // use this for initialization
    onLoad: function () {
        var anim = this.getComponent(cc.Animation);

        // 如果没有指定播放哪个动画，并且有设置 defaultClip 的话，则会播放 defaultClip 动画
        anim.play(this.animName);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
