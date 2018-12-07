cc.Class({
    extends: cc.Component,

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
        audio: {
            default: null,
            url: cc.AudioClip
        },
        isFromWelcomeScene: true,
    },

    // use this for initialization
    onLoad: function () {
        if(this.isFromWelcomeScene){
            this.play();
        }
    },

    play: function () {
        this.audio.setCurrentTime(UserData.BGM_S1_CurrentTime);
        console.log("**********************UserData.BGM_S1_CurrentTime");
        console.log(UserData.BGM_S1_CurrentTime);
        //this.audio.play(this.audio, true, 1);
        //this.isFromWelcomeScene = false;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
