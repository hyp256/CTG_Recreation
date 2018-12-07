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
    },

    // use this for initialization
    onLoad: function () {
    //init
            console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        sdkbox.PluginSdkboxAds.init();
            console.log("----------------------------------------------------------------------------------------------");

    //play ads
        var randNum = cc.rand();
        //随机贴图号
        var numPlacement = randNum % 2;
        //丢弃小数部分,保留整数部分
        numPlacement = parseInt(numPlacement);
            console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++1");        
        if (numPlacement == 0){
            console.log("play placement 1");
            sdkbox.PluginSdkboxAds.placement("placement-interstitial");
            console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++2");
        }else if (numPlacement == 1) {
            console.log("play placement 2");
            sdkbox.PluginSdkboxAds.placement("placement-reward");
            console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++3");
        }

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
