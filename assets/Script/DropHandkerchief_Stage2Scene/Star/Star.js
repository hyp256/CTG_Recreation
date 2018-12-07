cc.Class({
    extends: cc.Component,
    //DropHandkerchief_Stage2Scene
    //Star
    
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
        //记录对应NPC
        NPCNum: 0,
        //star源位置
        SourcePosition: cc.v2(-100,700),
        //NPC对应的分数
        Score: 500,
    },

    // use this for initialization
    onLoad: function () {

    },

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact: function (contact, selfCollider, otherCollider) {
        var body1 = this.node.getComponent(cc.RigidBody);
        if(selfCollider.body == body1){
            console.log('i m Star');
            //1秒后回原位,避免碰撞过程中移动,会报错
            this.scheduleOnce(function() {
            this.back();
            }, 1);            
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

    back: function(){
        this.node.setPosition(this.SourcePosition);
        //刷新ScoreBoard
        var Canvas = cc.find("Canvas");
        var js = Canvas.getComponent('UpdateScoreData');
        js.reflushScore(this.Score);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
