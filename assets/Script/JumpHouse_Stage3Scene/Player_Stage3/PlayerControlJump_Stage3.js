cc.Class({
    extends: cc.Component,
    //JumpHouse_Stage3Scene
    //JumpButton

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
        //进度条
        JumpPowerProgressBarNode: {
            default: null,
            type: cc.Node,
        },

        //进度条长度1
        changeTextureJumpPowerProgressBar1: {
            default: null, 
            type : cc.SpriteFrame,
        },
        //进度条长度2
        changeTextureJumpPowerProgressBar2: {
            default: null, 
            type : cc.SpriteFrame,
        },
        //进度条长度3
        changeTextureJumpPowerProgressBar3: {
            default: null, 
            type : cc.SpriteFrame,
        },            
        
        //Jump按钮状态,1进度条滚动2确认
        JumpButtonType: [cc.Integer],
        Btype: 1,
        
        PlayerNode: {
            default: null,
            type: cc.Node,
        },

        audioSource: {
            type: cc.AudioSource,
            default: null
        },
    },

    // use this for initialization
    onLoad: function () {
        this.node.on('touchstart', this.onTouchStart, this);
        this.node.on('touchmove', this.onTouchMove, this);
        this.node.on('touchend', this.onTouchEnd, this);
    },

    onTouchStart: function(event){
        console.log(this.Btype);
        var labelNode = cc.find("Label", this.node);
        var label = labelNode.getComponent(cc.Label); 
        var button = this.node.getComponent(cc.Button);
        var progressBar = this.JumpPowerProgressBarNode.getComponent(cc.ProgressBar);
        var sprite = this.JumpPowerProgressBarNode.getComponent(cc.Sprite);        
        var GamePanelNode = cc.find('Canvas/GamePanel');
        var GamePanel_js = GamePanelNode.getComponent('GamePanel_Stage3');

        //3秒未被NPC拾起,button可选,碰撞过程中改变碰撞体位置必须等碰撞处理完,否则报错 
        var back = function(){
            GamePanel_js.bodyIsActive(true);
        };

        switch(this.Btype){
            //Jump按钮状态1            
            case 1:{
                //恢复进度条框
                sprite.spriteFrame = this.changeTextureJumpPowerProgressBar1;
                //进度条滚动
                this.barMove();
                //改边按钮label
                label.string = 'DONE';
                //改变按钮状态为2
                this.Btype = this.JumpButtonType[1];
                break;
            }
            //Jump按钮状态2
            case 2:{
                //button.interactable = false;
                //this.node.off('touchstart', this.onTouchStart, this);

                console.log(progressBar.progress);
                
                //跳跃长度 = 单位长度100 * 进度条百分比
                var jump = cc.moveBy(1,cc.v2(-100*progressBar.progress,0));
                this.PlayerNode.runAction(jump);
                this.Animate();
                console.log(this.PlayerNode.position);

                //播放音效
                this.audioSource.play();
                
                //停止进度条
                this.unscheduleAllCallbacks();
                //改边按钮label                
                label.string = 'JUMP';   
                //改变按钮状态为1                
                this.Btype = this.JumpButtonType[0];
                
                //关闭碰撞体
                GamePanel_js.bodyIsActive(false);
                //激活碰撞体
                this.scheduleOnce(function() {
                    console.log("back");
                back();
                }, 1);                
                break;                
            }
            default: break;
        }
        
    },

    onTouchMove: function(event){
    },

    onTouchEnd: function(event){
        //this.PlayerNode.stopActionByTag(1);
    },

    barMove: function (){
        var progressBar = this.JumpPowerProgressBarNode.getComponent(cc.ProgressBar);
        progressBar.progress = 0;
        var sprite = this.JumpPowerProgressBarNode.getComponent(cc.Sprite);  
        
        //进度条滚动方向
        var addOrsub = true;
        //进度条滚动单位量
        var num = 0.05;
        
        var self = this;
        var update = function(){
            //增量方向
            if(addOrsub){
                num = Math.abs(num);
            //减量方向    
            }else{
                num = -1 * Math.abs(num);
            }
            progressBar.progress += num;
            //到达端点改变方向
            if(progressBar.progress >= 1){
                progressBar.progress = 1;
                addOrsub = false;
            }else if(progressBar.progress <= 0){
                progressBar.progress = 0;
                addOrsub = true;
            }
            
            //改变进度条框
            if(progressBar.progress>0.5 && progressBar.progress<0.8){
                sprite.spriteFrame = self.changeTextureJumpPowerProgressBar2;
            }else if(progressBar.progress>= 0.8){
                sprite.spriteFrame = self.changeTextureJumpPowerProgressBar3;
            }else if(progressBar.progress<=0.5){
                sprite.spriteFrame = self.changeTextureJumpPowerProgressBar1;
            }            
        };

        //this.updateFunc = update;
        // 以秒为单位的时间间隔
        var interval = 0.3;
        // 重复次数
        var repeat = 79;
        // 开始延时
        var delay = 0;
        this.schedule(function() {
        // 这里的 this 指向 component
        update();
        }, interval, repeat, delay);
    },
    
    playerJump: function (){
        component.scheduleOnce(function() {
        // 这里的 this 指向 component
        this.doSomething();
        }, 2);        
    },

    Animate: function()
    {
    	if (this.PlayerNode){
            var animation = this.PlayerNode.getComponent(cc.Animation);
            var clips = [];
            clips = animation.getClips(); 
            //console.log(clips);
            //console.log(clips[1].name);
            var a = animation.play(clips[1].name);
            //console.log(a.name);
            
    	}
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
