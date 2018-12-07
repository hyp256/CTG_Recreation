        //全局变量对象UserData
        window.UserData = {
            sumScore: null,
            BGM_S1_CurrentTime: null,
        };

cc.Class({
    extends: cc.Component,

    //WelcomeScene
    //Canvas
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
        UserData.sumScore = 0;
    },

    getBGM_S1_CurrentTime: function () {
        var nodeBGM = cc.find("Canvas/BGM");
        var audio = nodeBGM.getComponent("cc.AudioSource");
        var time = audio.getCurrentTime();
        UserData.BGM_S1_CurrentTime = time;
        return time;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
