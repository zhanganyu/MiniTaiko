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
        chatList:{
            type:Array,
            default:[]
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

        cc.loader.loadRes(`/Avatar-big/${chat.avatar}`, cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            cc.log('Result should be a sprite frame: ' + (spriteFrame instanceof cc.SpriteFrame));

            this.avatar.spriteFrame = spriteFrame;
        });

        this.chatNo++;
    },

    onNext() {
        this.loadConversation();
    },

    start() {
        this.loadConversation();
    },

    // update (dt) {},
});
