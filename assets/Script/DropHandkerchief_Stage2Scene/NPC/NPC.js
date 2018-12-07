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
        //该NPC位于Points_t[]中的下标编号
        NPCNum: 0,
        //NPC路径标记,6点为1个单位,为0时说明回到原点
        NPCFinMark: 1,
        //NPC初始点
        NPCLocalPos: cc.Vec2,
        //NPC移动速度
        //NPCSpeed: 50,
        //12NPC坐标组
        Points_t: [cc.Vec2], 
	    //半圈NPC坐标组
	    pHalf: [],        
	    //前半圈NPC坐标组
	    pBHalf: [],
	    //后半圈NPC坐标组
	    pAHalf:[],
	    //半圈NPC距离组
	    dHalf: [],
        //半圈NPC坐标,距离组
        pdHalf: [],
        //可变半圈NPC坐标,距离组
        pdHalfTemp: [],
        //可以捕捉Player
        isCouldCatch: false,
        //最多连续捉Player次数
        maxContinuation: 3,
        //sort倍率
        override_Sort: 1.7,
    },

    // use this for initialization
    onLoad: function () {
        this.NPCLocalPos = this.node.getPosition();
        console.log(this.NPCLocalPos);
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    //根据坐标选择方向执行对应动画
    SpriteMoveDongHua: function(holderNodeLocation){
        if (this.node){
		    //根据目的点y/x选择方向动画
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
    
    //this.NPCDonghua("Texture/DropHandkerchief_Stage2Scene/Player/",this.NPCName[NPCNameIndex],'_DOWN0',4,newNode,'DOWN');
    //加载资源并执行animiation
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
            self.NPCDongZuo(NPCNode,actName,frame,true);
        });
        
    },
    
    //执行animation
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

    //NPC移动
    SpriteSpeedMove: function(sprite, speed, aimPoint){
        var NPCPos = this.node.getPosition();

	    //速度 = 距离/s
	    //var speed = 50/1;
	    //取向量长度
	    var holderNodeLocation = cc.pSub(aimPoint, NPCPos);
	    var s = holderNodeLocation.mag();
	    var t = s / speed;

        var move = cc.moveTo(t,aimPoint);
        var delay = cc.delayTime(t+0.1);
        var seq = cc.sequence(move, delay);
	    if (sprite){
            sprite.runAction(seq);
	    }
	    
	    this.SpriteMoveDongHua(holderNodeLocation);
	    
	    return t;
    },

    //NPCAI步骤汇总
    AI_NPC: function(NPCNum,Points_t,NPCSpeed){
        console.log("NPC-AI_NPC-NPCNum",NPCNum);
        console.log("NPC-AI_NPC-Points_t",Points_t);                
        var func1 = cc.callFunc(this.moveToHandkerchief, this);
        //大约4秒完成
        var delay1 = cc.delayTime(4.0);
        
        //只能传入1个参数,由GamePanel逻辑决定
        var parameters_func2 = [];
        parameters_func2.NPCNum = NPCNum;
        parameters_func2.Points_t = Points_t;
        parameters_func2.NPCSpeed = NPCSpeed;
        
        var parameters_func3 = [];
        parameters_func3.NPCSpeed = NPCSpeed;
        
        var func2 = cc.callFunc(this.moveRoundFirstCatch, this, parameters_func2);
        //大约3.5秒完成
        var delay2 = cc.delayTime(3.5);
        var func3 = cc.callFunc(this.moveCatchToHalfEnd, this, parameters_func3);
        var seq = cc.sequence(func1, delay1, func2, delay2, func3);
        this.node.runAction(seq);
    },
    
    //AI(1),拾起手帕
    moveToHandkerchief: function(){
        var HandkerchiefNode = cc.find('Canvas/Handkerchief');
        var p = HandkerchiefNode.getPosition();
        var h = cc.pSub(HandkerchiefNode.getPosition(), this.node.getPosition());
        //手帕复位时间3秒
        var move = cc.moveTo(1.0,p);
        var delay = cc.delayTime(2.0);
        var seq = cc.sequence(delay, move);
        this.node.runAction(seq);
        this.SpriteMoveDongHua(h);
    },
    
    //AI(2),捡手帕后,根据当时Player位置算法,确定NPC环绕方向以及对应的半圈路径6点
    moveRoundFirstCatch: function(target,parameters){
        console.log("NPC-moveRoundFirstCatch-NPCNum",parameters.NPCNum);
        console.log("NPC-moveRoundFirstCatch-Points_t",parameters.Points_t[0]);
        console.log("NPC-moveRoundFirstCatch-NPCSpeed",parameters.NPCSpeed);
        //顺逆时针
        var isTurnRight = true;
        //在NPC与原点连线上或下
        var isUpOrDown = 0;
        var PlayerNode = cc.find('Canvas/Player');
        var p = PlayerNode.getPosition();
        console.log("NPC-moveRoundFirstCatch-p",p);
        //立即追逐Player一次
        var t = this.SpriteSpeedMove(this.node, parameters.NPCSpeed, p);

        //NPC追逐Player向量,根据直线与点位置算法确定isTurnRight        
        //实际原点位置(0,-50)要补偿回来
	    var Aimp = cc.pSub(p,cc.v2(0,-50));
	    //特殊情况在轴上,顺
	    if(Aimp.x === 0 || Aimp.y === 0){
	        isTurnRight = true;
	    }else{
	        //直线Ax+By+C=0中的A参数,直线过原点的话A=y/x
	        var Aparameter = this.node.y / this.node.x;
	        isUpOrDown = Aparameter*Aimp.x - Aimp.y;
	        console.log("NPC-moveRoundFirstCatch-isUpOrDown",isUpOrDown);
	        //isUpOrDown:<0 Up, >0 Down
	        //第1,4象限,上逆下顺
	        if(this.node.x > 0){
	            if(isUpOrDown < 0){
	                console.log("逆1");
	                isTurnRight = false;
	            }else if(isUpOrDown > 0){
	                console.log("顺1");
	                isTurnRight = true;
	            }
	       	//第2,3象限,上顺下逆     
	        }else if(this.node.x < 0){
	            if(isUpOrDown < 0){
	                console.log("顺2");
	                isTurnRight = true;
	            }else if(isUpOrDown > 0){
	                console.log("逆2");
	                isTurnRight = false;
	            }	            
	        }
	    }
	    
	    console.log("NPC-moveRoundFirstCatch-isTurnRight",isTurnRight);
	    
	    for(var i = 1;i <= 6;i++){
	        //前后半圈NPC下标
	        var n = 0;
	        var m = 0;
	        //顺时针先加法,后减法
	        if(isTurnRight){
	            n = parameters.NPCNum + i;
	            if(n==12){
	                n = 0;
	            }
	            if(n>12){
	                n = n - 12;
	            }
	            
	            m = parameters.NPCNum - i + 1;
	            if(m<0){
	                m = 12 + m;
	            }	            
	        //逆时针先减法,后加法     
	        }else{
	            n = parameters.NPCNum - i;
	            if(n<0){
	                n = 12 + n;
	            }
	            
	            m = parameters.NPCNum + i - 1;
	            if(m==12){
	                m = 0;
	            }
	            if(m>12){
	                m = m - 12;
	            }	            
	        }
	        this.pBHalf[i-1] = { 'NPCNum': n, 'point': parameters.Points_t[n],};
	        this.pAHalf[i-1] = { 'NPCNum': m, 'point': parameters.Points_t[m],};
	        //先取前半圈
	        this.pHalf = this.pBHalf;
	        //console.log(n);
	        //console.log(parameters.Points_t[n]);
	    }
	    
        console.log("NPC-moveRoundFirstCatch-this.pHalf",this.pHalf);
        
        var pNPC = this.node.getPosition();
        //计算与半圈坐标组各点的距离
        for(var i in this.pHalf){
            //console.log("this.pHalf[i]",this.pHalf[i]);
            //console.log(pNPC);
            this.dHalf[i] = cc.pSub(this.pHalf[i].point, pNPC).mag();
            console.log("NPC-moveRoundFirstCatch-this.dHalf",this.dHalf[i]);       
            //接近的的NPC点不加载,存储
            if(this.dHalf[i] > 50){
                this.pdHalf[i] = {'NPCNum': this.pHalf[i].NPCNum, 'point': this.pHalf[i].point, 'distance': this.dHalf[i],};
                this.pdHalfTemp[i] = {'TempNPCNum': this.pdHalf[i].NPCNum, 'Temppoint': this.pdHalf[i].point, 'Tempdistance': this.pdHalf[i].distance,};
            }
        }
        console.log("NPC-moveRoundFirstCatch-this.pdHalf",this.pdHalf);
        console.log("NPC-moveRoundFirstCatch-this.pdHalfTemp",this.pdHalfTemp);
    },
    
    //AI(3)循环,由前一次运动时间决定延时,保证动作执行完成 
    AIPart3: function(Dtime,parameters_func3){
        console.log("NPC-AIPart3-Dtime",Dtime);
        var func1 = cc.callFunc(this.moveCatchToHalfEnd, this, parameters_func3);
        //多加0.2秒延时,保证完成动作
        var delay1 = cc.delayTime(Dtime+0.2);
        var seq = cc.sequence(delay1,func1);
        this.node.runAction(seq);
    },
    
    //AI(3),确定环绕方向后,遍历捡手帕的NPC到半圈NPC点和Player共7个点的距离做比较,选出最近点作为下一步移动目标点
    moveCatchToHalfEnd: function(target,parameters){
        console.log("NPC-moveCatchToHalfEnd");

        var pNPC = this.node.getPosition();

        //可变组,输入当前NPC与6点距离
        for(var i in this.pdHalfTemp){
            this.dHalf[i] = cc.pSub(this.pdHalfTemp[i].Temppoint, pNPC).mag();
            //距离接近的的NPC点不加载
            if(this.dHalf[i] > 50){
                this.pdHalfTemp[i].Tempdistance = this.dHalf[i];                
            }
        }
        
        //可排序组
        var pdHalfTempSort = [];
        for(var i in this.pdHalfTemp){
            pdHalfTempSort[i] = this.pdHalfTemp[i];
        }         
        
        console.log("NPC-moveCatchToHalfEnd-this.pdHalfTemp",this.pdHalfTemp);
        //距离从小到大排
        pdHalfTempSort.sort(this.compare('Tempdistance'));
        console.log("NPC-moveCatchToHalfEnd-this.pdHalfTempSort",pdHalfTempSort);        
        var PlayerNode = cc.find('Canvas/Player');
        var pPlayer = PlayerNode.getPosition();
        //当前NPC与Player距离
        var dPlayer = cc.pSub(pPlayer, pNPC).mag();
        console.log(dPlayer);
        var t = 0;
        //距离短于Player或已经连续捉Player3次
        if(this.override_Sort*pdHalfTempSort[0].Tempdistance <= dPlayer || this.maxContinuation === 0){
            console.log("catch pdHalfTempSort");
            console.log("NPC-moveCatchToHalfEnd-this.override_Sort",this.override_Sort);
            //重新计数
            this.maxContinuation = 3;
            //本次移动需要的时间
            t = this.SpriteSpeedMove(this.node, parameters.NPCSpeed, pdHalfTempSort[0].Temppoint);
            for(var i in this.pdHalfTemp){
                //经过sort的0下标位置是最近点
                if(pdHalfTempSort[0].TempNPCNum == this.pdHalfTemp[i].TempNPCNum){
                    //从该点删除之前的点包括该点
                    for(var j=i;j>=0;j--){
                        this.pdHalfTemp.splice(j,1);
                        //假如删除完了
                        if(this.pdHalfTemp.length === 0){
                            //并且NPC未回到源点
                            if(this.NPCFinMark !== 0){
                                //NPC路径标记-1
                                this.NPCFinMark--;
                                //星星到NPC源位
                                var Star = cc.find("Canvas/Star");
                                Star.setPosition(this.NPCLocalPos);
                            }

                            //加载后半圈点
                            this.pHalf = this.pAHalf;
                            console.log("NPC-moveCatchToHalfEnd-this.pHalf",this.pHalf);
                            for(var i in this.pHalf){
                                this.pdHalfTemp[this.pHalf.length - 1 - i ] = {'TempNPCNum': this.pHalf[i].NPCNum, 'Temppoint': this.pHalf[i].point, 'Tempdistance': 0,};
                            }
                        }
                    }
                }
            }
        }else{
            console.log("catch Player");
            //捉一次减1
            this.maxContinuation--;
            //追逐Player
            t = this.SpriteSpeedMove(this.node, parameters.NPCSpeed, pPlayer);
            //并且重新填充半圈可变组,保证下次比较半圈所有点
            for(var i in this.pdHalf){
                this.pdHalfTemp[i] = {'TempNPCNum': this.pdHalf[i].NPCNum, 'Temppoint': this.pdHalf[i].point, 'Tempdistance': this.pdHalf[i].distance,};
            }
            console.log("NPC-moveCatchToHalfEnd-this.pdHalf",this.pdHalf);
        }
        //循环
        this.AIPart3(t,parameters);
    },
    
    //根据数组对象中的某个属性值进行sort从小到大排序
    compare: function(property){
        return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    },
    
});
