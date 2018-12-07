cc.Class({
    extends: cc.Component,
    //GameChoiceScene
    //LanguageButton

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
        //中英文，标志,双英文，单中文
        Lsign: 0,
        //要换字的Label名称
        LabelName: "",
    },

    // use this for initialization
    onLoad: function () {
        this.node.on('touchend', this.changeLsign, this);
    },

    changeLsign: function() {
        this.Lsign += 1;
        var LabelNode = this.node.getChildByName(this.LabelName);
        var label = LabelNode.getComponent("cc.Label");
        if ((this.Lsign %2) == 0) {
            label.string = 'CHINESE';
        }else if ((this.Lsign %2) == 1){
            label.string = 'ENGLISH';
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
