cc.Class({
    extends: cc.Component,
    //DropHandkerchief_Stage2Scene
    //Handkerchief

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
        PlayerNode: {
            default: null,
            type: cc.Node,
        },
        DropHandkerchiefButtonNode: {
            default: null,
            type: cc.Node,
        },
        //手帕原位
        SourcePosition: cc.v2(0,500),
    },

    // use this for initialization
    onLoad: function () {

    },

    Animate: function() {
        var anim = this.node.getComponent(cc.Animation);

        // 如果没有指定播放哪个动画，并且有设置 defaultClip 的话，则会播放 defaultClip 动画
        anim.play("AnimationClip_Handkerchief");
    },
    
    dropHandkerchief: function() {
        //放下总在Player下方
        var p = cc.pSub(this.PlayerNode.getPosition(), cc.v2(0,this.node.height/4));
        this.node.setPosition(p);
        this.Animate();
        
        var self = this;
        //3秒未被NPC拾起,button可选,碰撞过程中改变碰撞体位置必须等碰撞处理完,否则报错 
        var back = function(){
            var isPickup = self.DropHandkerchiefButtonNode.HandkerchiefIsPickup;
            console.log(isPickup);
            //未拾起,button可选            
            if(!isPickup){
                var button = self.DropHandkerchiefButtonNode.getComponent(cc.Button);
                button.interactable = true;                
            }
            //复原位
            self.node.setPosition(self.SourcePosition);
        };

        this.scheduleOnce(function() {
        back();
        }, 3);        
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
