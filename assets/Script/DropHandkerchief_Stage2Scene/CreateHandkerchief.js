cc.Class({
    extends: cc.Component,
    //DropHandkerchief_Stage2Scene
    //DropHandkerchiefButton

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
        HandkerchiefNode: {
            default: null,
            type: cc.Node,
        },
        //拾起button不能按,否则能
        HandkerchiefIsPickup: false,
        
    },

    // use this for initialization
    onLoad: function () {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "CreateHandkerchief";//这个是代码文件名
        clickEventHandler.handler = "createHandkerchief";
        clickEventHandler.customEventData = "I drop the Handkerchief";

        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },

    createHandkerchief: function (event, customEventData) {
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        //var node = event.target;
        var button = this.node.getComponent(cc.Button);
        var self = this;
        //button不可选
        button.interactable = false;
        //这里的 customEventData 参数就等于你之前设置的 "I drop the Handkerchief"        
        console.log(customEventData);
        
        //放手帕
        var Handkerchief = this.HandkerchiefNode.getComponent("Handkerchief");
        Handkerchief.dropHandkerchief();
    }    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
