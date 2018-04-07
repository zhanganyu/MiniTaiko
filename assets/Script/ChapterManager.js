cc.Class({
    extends: cc.Component,

    properties: {
        chatList: {
            type: Array,
            default: []
        },
        chapterNo: {
            type: cc.Integer,
            default: 0
        },
        chatWindow: {
            type: cc.Prefab,
            default: null
        },
        chapter: {
            default: []
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    },

    start() {
        if (this.chatList.length != 0) {
            this.startConverstation();
        } else {

            this.dataManager = cc.director.getScene().getChildByName('数据管理').getComponent('GameDataManager');
            console.log(this.dataManager.gameData.chapterNo);
            if (this.chapterNo > this.dataManager.gameData.chapterNo) {
                console.log('触发剧情');
                cc.loader.loadRes(`/Chapter/${this.chapterNo}`, cc.Array, (err, list) => {
                    if (err) {
                        cc.error(err.message || err);
                        return;
                    }

                    this.chatList = list;

                    if (list.length != 0) {
                        this.startConverstation();
                    }

                    this.dataManager.gameData.chapterNo = this.chapterNo;
                    this.dataManager.node.dispatchEvent(new cc.Event.EventCustom('update-data', true));

                });
            }
        }
    },

    startConverstation() {
        const tPrefab = cc.instantiate(this.chatWindow);
        tPrefab.parent = cc.Canvas.instance.node;
        tPrefab.setPosition(0, 0);

        const window = tPrefab.getComponent('ConversationWindow');
        window.chatList = this.chatList;
    },

    // update (dt) {},
});
