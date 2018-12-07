cc.Class({
    extends: cc.Component,
    //ThrowingSandbags_Stage1Scene
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
        Score: 0,
        //朝向
        numFaceTo: 1,
    },

    // use this for initialization
    onLoad: function () {
        this.schedule(this.createShengXiao, 2);
    },

    createShengXiao: function(){
        var self = this;
        //随机数1,高度档
        var r1 = Math.round(cc.rand())% 3;
        //随机数2,速度档
        var r2 = Math.round(cc.rand())% 3;
        //随机数3,朝向
        var r3 = parseInt(cc.rand())% 2;
        //朝向影响Scale
        if(!r3){
            this.numFaceTo = -1;
        }else{
            this.numFaceTo = 1;
        }        
        // 加载 Prefab,设定逻辑
        cc.loader.loadRes("Prefab/ThrowingSandbags_Stage1Scene/ShengXiao", function (err, prefab) {
        var newNode = cc.instantiate(prefab);
        //分数分级
        self.Score = ((r1 + 1) + (3 - r2))*100;
        newNode.Score = self.Score;
        console.log("createShengXiao-r1,r2,r3",r1,r2,r3);
        //创建起点,朝向
        var p = self.createPosition(self.numFaceTo,r1);
        console.log("createShengXiao-p",p);
        newNode.setPosition(p);
        newNode.setScaleX(self.numFaceTo);
        console.log("createShengXiao-newNode.numFaceTo",self.numFaceTo);
        //cc.director.getScene().addChild(newNode);
        self.node.addChild(newNode);        
        //移动,到端点自毁
        var delta = self.createMoveDelta(self.numFaceTo);
        var movDuration = self.createMoveTime(r2);
        console.log("createShengXiao-movDuration:",movDuration);
        var movBy = cc.moveBy(movDuration,delta);
        var removeSelf = cc.removeSelf();
        var seq = cc.sequence(movBy, removeSelf);
        newNode.runAction(seq);
        });        
    },
    //ShengXiao初始点,6个点
    createPosition: function(faceTONum,levelNum){
        var point = cc.Vec2.ZERO;
        if(faceTONum==1){
            point = cc.v2(260-640,398 + levelNum*109 - 360);
        }else if(faceTONum==-1){
            point = cc.v2(1005-640,398 + levelNum*109 - 360);
        }
        return point;
    },
    //ShengXiao速度
    createMoveTime: function(levelNum){
        var t = 5 + levelNum*2;
        return t;
    },
    //shengxiao移动delta
    createMoveDelta: function(faceTONum){
        var deltaPos = cc.Vec2.ZERO;
        if(faceTONum==1){
            deltaPos = cc.v2(744,0);
        }else if(faceTONum==-1){
            deltaPos = cc.v2(-744,0);
        }
        return deltaPos;        
    },
    
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
