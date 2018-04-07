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
        text: {
            default: null,
            type: cc.Label,

        },
        roleName: {
            default: null,
            type: cc.Label,

        },
        avatar: {
            default: null,
            type: cc.Sprite,

        },
        sessionButton: {
            default: null,
            type: cc.Button,

        },
        chatList: {
            type: Array,
            default: []
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = 'ConversationWindow';
        clickEventHandler.handler = "onNext";
        clickEventHandler.customEventData = "";

        this.sessionButton.clickEvents.push(clickEventHandler);

        this.dataManager = cc.director.getScene().getChildByName('数据管理').getComponent('GameDataManager');

        this.chatNo = 0;
    },

    loadConversation() {
        const chatList = this.chatList;
        if (chatList.length <= this.chatNo) {
            this.node.destroy();
            return;
        }
        var chat = chatList[this.chatNo];

        this.text.string = chat.text;
        this.roleName.string = chat.roleName;

        const avatarRight = chat.avatarPosition === 'right';

        const widget = this.avatar.getComponent(cc.Widget);
        widget.horizontalCenter = avatarRight ? 270 : -270;
        widget.bottom = 0;

        widget.updateAlignment();

        cc.loader.loadRes(`/Avatar-big/${chat.avatar}`, cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                cc.error(err.message || err);

            } else {
                this.avatar.spriteFrame = spriteFrame;
            }
        });

        this.chatNo++;

        //处理事件
        const {action} = chat;
        if (action) {
            if (action.money) {
                
                this.dataManager.gameData.money += action.money;
                this.dataManager.node.dispatchEvent( new cc.Event.EventCustom('update-data', true) );
            }
        }
    },

    onNext() {
        this.loadConversation();
    },

    start() {
        this.loadConversation();
    },

    // update (dt) {},
});
