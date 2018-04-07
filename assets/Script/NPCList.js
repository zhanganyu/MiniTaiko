
cc.Class({
    extends: cc.Component,

    properties: {
        npcItem: {
            type: cc.Prefab,
            default: null
        },
        list: {
            default: []
        },
        pageContent: {
            type: cc.Node,
            default: null
        }
    },
    onLoad() {

    },

    start() {
        this.list.forEach(row => {
            const node = cc.instantiate(this.npcItem);

            node.parent = this.pageContent;
            node.position = cc.p(0, 0);

            const label = node.getChildByName('武将名称').getComponent(cc.Label);
            label.string = row.name;

            const clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = 'NPCList';

            clickEventHandler.handler = "changeScene";
            clickEventHandler.customEventData = row;

            const button = node.getComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);
        });
    },

    closeWindow() {
        this.node.destroy();
    },
    changeScene(event, house) {
        cc.audioEngine.stopAll();
        cc.director.loadScene(house.scene, () => {
            const bgSprite = cc.Canvas.instance.node.getChildByName('房间背景').getComponent(cc.Sprite);
            cc.loader.loadRes(`Rooms/${house.roomImage}`, cc.SpriteFrame, (err, sp) => {
                bgSprite.spriteFrame = sp;
            });

            //默认对话
            const chapterManager = cc.director.getScene().getChildByName('剧本管理').getComponent('ChapterManager');
            chapterManager.chatList = [
                {
                    "roleName": house.name,
                    "avatar": house.avatar,
                    "text": "找我有何贵干呢？",
                    "avatarPosition": "right"
                }
            ];
        });
    }
});
