cc.Class({
    extends: cc.Component,
    //JumpHouse_Stage3Scene
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
        //获胜得分
        Score: 5000,

        HOUSENode:{
            default: null,            
            type: cc.Node,
        },

        ASIDENode:{
            default: null,            
            type: cc.Node,
        },

        WINLatticeNode:{
            default: null,            
            type: cc.Node,
        },
        
        LOSELatticeP1Node:{
            default: null,            
            type: cc.Node,
        },
        
        LOSELatticeP2Node:{
            default: null,            
            type: cc.Node,
        },         
        
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

        var GamePanelNode = cc.find('Canvas/GamePanel');
        var GamePanel_js = GamePanelNode.getComponent('GamePanel_Stage3');         
        
        //假如是ASIDE,则文字提示,文字2秒后复位
        var body2 = this.ASIDENode.getComponent(cc.RigidBody);
        if(otherCollider.body == body2){
            GamePanel_js.outSide();
        }

        //假如是LOSELatticeP1,LOSELatticeP2,HOUSE,则YOULOSE  
        var body3 = this.LOSELatticeP1Node.getComponent(cc.RigidBody);
        var body4 = this.LOSELatticeP2Node.getComponent(cc.RigidBody); 
        var body5 = this.HOUSENode.getComponent(cc.RigidBody);
        if(otherCollider.body == body3 || otherCollider.body == body4 ||otherCollider.body == body5){
            GamePanel_js.reflushGamePanel(false);
        }   

        //假如是WINLattice,则YOUWIN       
        var body6 = this.WINLatticeNode.getComponent(cc.RigidBody);
        if(otherCollider.body == body6){
            //刷新ScoreBoard
            var Canvas = cc.find("Canvas");
            var js = Canvas.getComponent('UpdateScoreData');
            js.reflushScore(this.Score);
            GamePanel_js.reflushGamePanel(true);
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
