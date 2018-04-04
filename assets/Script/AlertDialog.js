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
        sureBtn: {
            type: cc.Button,
            default: null
        },
        cancelBtn: {
            type: cc.Button,
            default: null
        },
        closeBtn: {
            type: cc.Button,
            default: null
        },
        promptText: {
            type: cc.Label,
            default: null
        },
        actionScene: {
            type: cc.String,
            default:''
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = 'AlertDialog';
        clickEventHandler.handler = "onSure";
        clickEventHandler.customEventData = "save";

        this.sureBtn.clickEvents.push(clickEventHandler);

        clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = 'AlertDialog';
        clickEventHandler.handler = "onCancel";
        clickEventHandler.customEventData = "cancel";
        this.cancelBtn.clickEvents.push(clickEventHandler);

        clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = 'AlertDialog';
        clickEventHandler.handler = "onClose";
        clickEventHandler.customEventData = "close";
        this.closeBtn.clickEvents.push(clickEventHandler);

    },

    start() {
    },

    onSure(event) {
        console.log("save and close:%s", event);

        this.node.destroy();

        const sceneManager = cc.director.getScene().getChildByName('场景管理').getComponent('SceneManager');

        cc.audioEngine.stop(sceneManager.audioID);

        cc.director.loadScene(this.actionScene);

    },

    onClose(event) {
        console.log("close:%s", event);

        this.node.destroy();
    },

    onCancel(event) {
        console.log("cancel:%s", event);

        this.node.destroy();
    }

    // update (dt) {},
});
