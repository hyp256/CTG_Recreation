var PlayerAnimation_Stage2 = cc.Class({
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
        this.NPCDonghua("Texture/DropHandkerchief_Stage2Scene/Player/",'PLAYM','_DOWN0',4,this.node,'DOWN');
        this.NPCDonghua("Texture/DropHandkerchief_Stage2Scene/Player/",'PLAYM','_UP0',4,this.node,'UP');
        this.NPCDonghua("Texture/DropHandkerchief_Stage2Scene/Player/",'PLAYM','_LEFT0',4,this.node,'LEFT');    
        this.NPCDonghua("Texture/DropHandkerchief_Stage2Scene/Player/",'PLAYM','_RIGHT0',4,this.node,'RIGHT');
        //log();
    },

    //根据坐标选择方向执行对应动画
    SpriteMoveDongHua: function(holderNodeLocation){
        if (this.node){
		    //根据触点y/x选择方向动画
		    var direction = Math.abs(holderNodeLocation.y) - Math.abs(holderNodeLocation.x);
		    var choose = 0;
		    if (direction < 0.001){
			    if (holderNodeLocation.x < 0.001){
				    choose = 1;
			    }
			    else{
				    choose = 2;
			    }
		    }
		    else if (direction > 0.001){
			    if (holderNodeLocation.y < 0.001){
				    choose = 3;
			    }
			    else{
				    choose = 4;
			    }
		    }

		    switch (choose)
		    {
		    case 1:
			    this.Animate("DongHua_LEFT"); break;
		    case 4:
			    this.Animate("DongHua_UP"); break;
		    case 2:
			    this.Animate("DongHua_RIGHT"); break;
		    case 3:
			    this.Animate("DongHua_DOWN"); break;
		    default:
			    break;
		    }
        }
    },

    Animate: function(clipName)
    {
    	if (this.node){
            var animation = this.node.getComponent(cc.Animation);
            var clips = [];
            clips = animation.getClips(); 
            console.log(clips);
            var a = animation.play(clipName);
            //console.log(a.name);
            
    	}
    },

    NPCDonghua: function(pathName,firstName,secondName,frameNum,NPCNode,actName) {
        // 加载 SpriteAtlas（图集），并且获取其中的一个 SpriteFrame
        // 注意 atlas 资源文件（plist）通常会和一个同名的图片文件（png）放在一个目录下, 所以需要在第二个参数指定资源类型
        var atlasPath = pathName + firstName;
        var frameName = firstName + secondName;
        
        console.log(pathName +frameName);
        var self = this;
        cc.loader.loadRes(atlasPath, cc.SpriteAtlas, function (err, atlas) {
            var frame = [];
            for(var i=1;i<=frameNum;i++)
            {
                frame[i-1] = atlas.getSpriteFrame(frameName + i);
            } 
            //console.log(frame);   
            self.NPCDongZuo(NPCNode,actName,frame,true);
        });
        
    },
    
    NPCDongZuo: function(NPCNode,actName,frames,isloop) {
        var animation = NPCNode.getComponent(cc.Animation);
        // frames 这是一个 SpriteFrame 的数组.
        var clip = cc.AnimationClip.createWithSpriteFrames(frames, 4);
        clip.name = 'DongHua_' + actName;
        //console.log('NPCDongZuo');

        if(isloop){
            clip.wrapMode = cc.WrapMode.Loop;           
        }

        var s = animation.addClip(clip);
        //console.log(s.name);
        //var clips = [];
        //clips = animation.getClips(); 
        //console.log(clips);
        //var a = animation.play(clip.name);
        //console.log(a.name);           
    },

    log2: function(){
        console.log("log2");
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

function log1(){
    console.log("log1");
}
