cc.Class({
    extends: cc.Component,
    //DropHandkerchief_Stage2Scene
    //CURTAIN_MOVE

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
        //要移除的节点
        removedNode: {
            default: null,
            type: cc.Node
        }        
    },

    // use this for initialization
    onLoad: function () {
        this.node.on('touchend', this.removeNode, this);
    },

    //移除节点
    removeNode: function() {
        //console.log("removeNode");
        this.removedNode.removeFromParent(true);
        this.node.removeFromParent(true);
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
