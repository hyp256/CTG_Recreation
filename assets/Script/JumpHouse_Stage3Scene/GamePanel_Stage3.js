cc.Class({
    extends: cc.Component,
    //JumpHouse_Stage3Scene
    //GamePanel

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
        
        labelPos: [cc.Vec2],
        
        GameOverLayoutNode: {
            default:null,
            type:cc.Node,
        },        
    },

    // use this for initialization
    onLoad: function () {

    },

    //移动超出边界提示
    outSide: function(){
        var labelNode = cc.find('Label',this.ASIDENode);
        var label = labelNode.getComponent(cc.Label);

        labelNode.setPosition(this.labelPos[1]);

        this.scheduleOnce(function() {
        back();
        }, 3);                   
        
        var self = this;    
        var back = function(){
            labelNode.setPosition(self.labelPos[0]);        
        }        
    },
    
    //同时打开或关闭碰撞体,便于跳跃
    bodyIsActive: function(isActive){
        var body1 = this.WINLatticeNode.getComponent(cc.RigidBody);
        var body2 = this.LOSELatticeP1Node.getComponent(cc.RigidBody);         
        var body3 = this.LOSELatticeP2Node.getComponent(cc.RigidBody);
        var body4 = this.HOUSENode.getComponent(cc.RigidBody);
        body1.active = isActive;
        body2.active = isActive;
        body3.active = isActive;
        body4.active = isActive;
    },
    
    //成功显示You Win,失败显示You Lose,3秒后重新刷新场景
    reflushGamePanel: function(isWin){
        var YouWinLabel = cc.find("YouWinLabel", this.GameOverLayoutNode);
        var YouLoseLabel = cc.find("YouLoseLabel", this.GameOverLayoutNode);

        if(isWin){
            YouWinLabel.setPositionY(-350);
        }else{
            YouLoseLabel.setPositionY(-350);
        }
        
        //暂停当前场景节点上注册的所有节点系统事件，节点系统事件包含触摸和鼠标事件。 如果传递 recursive 为 true，那么这个 API 将暂停本节点和它的子树上所有节点
        cc.director.getScene().pauseSystemEvents(true);
        var restart = function(){
            cc.director.loadScene("JumpHouse_Stage3Scene");
        };
        //3秒后刷新
        this.scheduleOnce(function(){
            restart();
        }, 3);   
                
    },    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
