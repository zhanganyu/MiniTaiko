// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        chatList:{
            type:Array,
            default:[]
        },
        chatperNo: {
            type:Number,
            default:0
        },
        chatWindow: {
            type:cc.Prefab,
            default:null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.loader.loadRes(`/Chapter/${this.chatperNo}.json`, cc.Array, (err, list) => {
            if (err) {
                cc.error(err.message || err);
                return;
            }

            this.chatList = list;

            if (list.lenght != 0) {
                this.startConverstation();
            }
            
        });
    },

    start () {
        
    },

    startConverstation() {
        const tPrefab = cc.instantiate(this.chatWindow);
        tPrefab.parent = cc.Canvas.instance.node;
        tPrefab.setPosition(0,0);

        const window = tPrefab.getComponent('ConversationWindow');
        window.chatList = this.chatList;
    },

    // update (dt) {},
});
