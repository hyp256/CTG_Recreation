cc.Class({
    extends: cc.Component,

    //GameChoiceScene
    //ThrowingSandbags_Stage1Scene
    //DropHandkerchief_Stage2Scene
    //JumpHouse_Stage3Scene
    //Canvas
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
        //临时总分
        tScore: 0,
        changeLabel: {
            default: null,
            type: cc.Label,
        },

        audioSource: {
            type: cc.AudioSource,
            default: null
        },
    },

    // use this for initialization
    onLoad: function () {
        this.tScore = this.getScoreData();
        this.changeLabel.string = this.tScore;
    },

    reflushScore: function (getScore) {
        this.updateScoreData(this.tScore + getScore);
        //获得的分数为0,退出
	if (getScore == 0){
	    return;
	}else{
	//以500分为单位跳动分数
	    var j = 100;
	    var n = getScore / j;
	    if (n > 0){
                this.schedule(function() {
                //showScoreLabel
                this.tScore += j;
                this.changeLabel.string = this.tScore;
                this.audioSource.play();
                }, 1.0 / 20.0, n - 1, 0);
	    }
        }
    },

    getScoreData: function () {
        return UserData.sumScore;
    },

    updateScoreData: function (sumS) {
        UserData.sumScore = sumS;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
