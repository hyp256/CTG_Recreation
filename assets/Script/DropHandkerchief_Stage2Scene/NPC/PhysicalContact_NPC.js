cc.Class({
    extends: cc.Component,
    //DropHandkerchief_Stage2Scene
    //NPC

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
            console.log('i m NPC');
        }

        var StarNode = cc.find('Canvas/Star');
        var DropHandkerchiefButton = cc.find('Canvas/DropHandkerchiefButton');
        var HandkerchiefNode = cc.find('Canvas/Handkerchief');
        var GamePanelNode = cc.find('Canvas/GamePanel');
        var GamePanel_js = GamePanelNode.getComponent('GamePanel_Stage2');         
        
        //假如是Star,则显示You Lose,暂停场景,3秒后重新载入场景
        var body2 = StarNode.getComponent(cc.RigidBody);
        if(otherCollider.body == body2){
            GamePanel_js.reflushGamePanel(false);
        }

        //假如是Handkerchief,则拾起
        var body3 = HandkerchiefNode.getComponent(cc.RigidBody);        
        if(otherCollider.body == body3){
            console.log('i m Handkerchief');
            //通过GamePanel外包NPCAI,因为有些逻辑参数在GamePanel中定义
            GamePanel_js.AI_NPC_GamePanel(this.node);
            //拾起了,按钮不可选
            DropHandkerchiefButton.HandkerchiefIsPickup = true;
            console.log(DropHandkerchiefButton.HandkerchiefIsPickup);
            //记录本次行动的NPC编号
            StarNode.NPCNum = this.node.NPCNum;
            //可以捉Player
            this.node.isCouldCatch = true;
        }
        
        //假如是Player,则显示You Lose,暂停场景,3秒后重新载入场景
        var PlayerNode = cc.find('Canvas/Player');
        var body4 = PlayerNode.getComponent(cc.RigidBody); 
        //保证只被捡手帕的NPC捉
        if(otherCollider.body == body4 && this.node.isCouldCatch){
            GamePanel_js.reflushGamePanel(false);
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
