cc.Class({
    extends: cc.Component,
    //DropHandkerchief_Stage2Scene
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
        NPCName: [cc.String],
        
        NPCSpriteFrame: {
            default:null, 
            type:cc.SpriteFrame,
        },
        
        NPCprefab:{
            default:null,
            type:cc.Prefab,
        },
        
        //NPC对象组
        NPCTags: [],
        //目前还留下的NPC数量
        NPCLelfNums:11,
        //NPC速度累加器
        NPCSpeedSum:50,
        
        GameOverLayoutNode: {
            default:null,
            type:cc.Node,
        },
    },

    // use this for initialization
    onLoad: function () {
        this.createAllNPC();
    },

    //创建所有NPC
    createAllNPC: function (){
        var Canvas = cc.find("Canvas");
        //12边型范围
        var dodecagonSize = cc.size(Canvas.width * 450 / 1280, Canvas.height * 350 / 720);
        var points = [];
        points = this.dodecagonPoints(cc.v2(0,-50),dodecagonSize);

        for(var i=1;i<12;i++){
            this.createNPC(i,points);
        }

    },

    //单独创建NPC
    createNPC: function (NPCNameIndex,pos) {
        // 加载 Prefab,设定逻辑
        var newNode = cc.instantiate(this.NPCprefab);
        var self = this;
        var url = "Texture/DropHandkerchief_Stage2Scene/Player/" + this.NPCName[NPCNameIndex];
        cc.loader.loadRes(url, cc.SpriteAtlas, function (err, atlas) {
           var changeSprite = newNode.getComponent(cc.Sprite);
           //修改spriteFrame
           var frame = atlas.getSpriteFrame(self.NPCName[NPCNameIndex] + '_DOWN01');
           changeSprite.spriteFrame = frame;
        });

        newNode.setPosition(pos[NPCNameIndex]);
        this.node.addChild(newNode); 
        
        //加载动画缓存
        var js = newNode.getComponent("NPC");
        js.NPCDonghua("Texture/DropHandkerchief_Stage2Scene/Player/",this.NPCName[NPCNameIndex],'_DOWN0',4,newNode,'DOWN');
        js.NPCDonghua("Texture/DropHandkerchief_Stage2Scene/Player/",this.NPCName[NPCNameIndex],'_UP0',4,newNode,'UP');
        js.NPCDonghua("Texture/DropHandkerchief_Stage2Scene/Player/",this.NPCName[NPCNameIndex],'_LEFT0',4,newNode,'LEFT');
        js.NPCDonghua("Texture/DropHandkerchief_Stage2Scene/Player/",this.NPCName[NPCNameIndex],'_RIGHT0',4,newNode,'RIGHT');
        
        //存储NPC编号,坐标组,结点
        newNode.NPCNum = NPCNameIndex;
        newNode.Points_t = pos;
        this.NPCTags[NPCNameIndex] = newNode;
    },

    //根据中心点创建12边型
    dodecagonPoints: function(center,size){
        //将圆分成12等分，节点与节点相隔30度，推广开到12多边形
	    var x0 = center.x;
	    var y0 = center.y;
	    var w = size.width;
	    var h = size.height;    
	    
    	var x1 = x0;
	    var y1 = y0 + (h / 2);
	    var p1 = cc.v2(x1, y1);

	    var x2 = x0 + w / 4;
	    var y2 = y0 + Math.sqrt(3)* h / 4;
	    var p2 = cc.v2(x2, y2);

	    var x3 = x0 + Math.sqrt(3)* w / 4;
	    var y3 = y0 + h / 4;
	    var p3 = cc.v2(x3, y3);

	    var x4 = x0 + w / 2;
    	var y4 = y0;
    	var p4 = cc.v2(x4, y4);

	    var x5 = x3;
	    var y5 = y0 - h / 4;
	    var p5 = cc.v2(x5, y5);

	    var x6 = x2;
    	var y6 = y0 - Math.sqrt(3)* h / 4;
	    var p6 = cc.v2(x6, y6);

	    var x7 = x1;
	    var y7 = y0 - h / 2;
	    var p7 = cc.v2(x7, y7);

	    var x8 = x0 - w / 4;
	    var y8 = y6;
	    var p8 = cc.v2(x8, y8);

	    var x9 = x0 - Math.sqrt(3)*w / 4;
	    var y9 = y5;
	    var p9 = cc.v2(x9, y9);

	    var x10 = x0 - w / 2;
	    var y10 = y4;
	    var p10 = cc.v2(x10, y10);

	    var x11 = x9;
	    var y11 = y3;
    	var p11 = cc.v2(x11, y11);

	    var x12 = x8;
	    var y12 = y2;
	    var p12 = cc.v2(x12, y12);

    var b =[];
	b = [ p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12 ];
	for (var i = 0; i < 12; i++){
		 b[i] = cc.v2(Math.round(b[i].x), Math.round(b[i].y));
	}

	return b;	    
    },
    
    //NPCAI外包,因为数据是在这里定义的
    AI_NPC_GamePanel: function(NPCNode){
        var NPC_js = NPCNode.getComponent('NPC');
        NPC_js.AI_NPC(NPCNode.NPCNum,NPCNode.Points_t,this.NPCSpeedSum);
        console.log("GamePanel_Stage2-AI_NPC_GamePanel-NPCNode.NPCNum",NPCNode.NPCNum);
        console.log("GamePanel_Stage2-AI_NPC_GamePanel-NPCNode.Points_t",NPCNode.Points_t);        
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
            cc.director.loadScene("DropHandkerchief_Stage2Scene");
        };
        //3秒后刷新
        this.scheduleOnce(function(){
            restart();
        }, 3);   
                
    },
    
    //根据编号删除NPC
    removeNPC: function(NPCNum){
        this.NPCTags[NPCNum].removeFromParent(true);
        this.NPCLelfNums--;
        this.NPCSpeedSum+=2;
        if(this.NPCLelfNums === 0){
            this.reflushGamePanel(true);            
        } 
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
