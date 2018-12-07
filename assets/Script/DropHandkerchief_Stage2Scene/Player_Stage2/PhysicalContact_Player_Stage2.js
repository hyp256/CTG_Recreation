cc.Class({
    extends: cc.Component,
    //DropHandkerchief_Stage2Scene
    //Player
    
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

    },

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact: function (contact, selfCollider, otherCollider) {
        //cc.PhysicsContact
        console.log(selfCollider);
        //cc.RigidBody
        console.log(selfCollider.body);
        var body1 = this.node.getComponent(cc.RigidBody);
        if(selfCollider.body == body1){
            console.log('i m Player');
        }

        var StarNode = cc.find('Canvas/Star');
        var DropHandkerchiefButton = cc.find('Canvas/DropHandkerchiefButton');
        var button = DropHandkerchiefButton.getComponent(cc.Button);
        var GamePanelNode = cc.find('Canvas/GamePanel');
        var GamePanel_js = GamePanelNode.getComponent('GamePanel_Stage2');         
        
        //假如是Star,则删除对应NPC并恢复按钮
        var body2 = StarNode.getComponent(cc.RigidBody);
        if(otherCollider.body == body2){
            GamePanel_js.removeNPC(StarNode.NPCNum);
            
            //恢复按钮
            DropHandkerchiefButton.HandkerchiefIsPickup = false;
            console.log(DropHandkerchiefButton.HandkerchiefIsPickup);
            button.interactable = true; 
        }
        
    },

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact: function (contact, selfCollider, otherCollider) {
   
    },

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve: function (contact, selfCollider, otherCollider) {
    },

    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve: function (contact, selfCollider, otherCollider) {
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
