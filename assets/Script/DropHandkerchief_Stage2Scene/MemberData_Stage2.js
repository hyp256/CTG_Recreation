cc.Class({
    extends: cc.Component,

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
        NPCName: {
            default: null,
            [0]: 'PlayM',
            [1]: 'NPC007',
            [2]: 'NPC010',
            [3]: 'NPC019',
            [4]: 'NPC030',
            [5]: 'NPC042',
            [6]: 'PlayFM',
            [7]: 'NPC050',
            [8]: 'NPC051',
            [9]: 'NPC052',
            [10]: 'NPC080',
            [11]: 'NPC104',
        },
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
