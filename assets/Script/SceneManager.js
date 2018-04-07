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
        bgm: {
            default: null,
            url: cc.AudioClip
        },
        alertWindow: {
            type: cc.Prefab,
            default:null
        },
        alertText: {
            default: ''
        },
        actionScene: {
            default: ''
        }
    },

    start() {
        this.audioID = cc.audioEngine.play(this.bgm, true, 1);
    },

    sceneJumpToTarget(event,scene) {
        cc.audioEngine.stopAll();

        cc.director.loadScene(scene);
    },

    showAlertWindow() {
        const tPrefab = cc.instantiate(this.alertWindow);
        tPrefab.parent = cc.Canvas.instance.node;
        tPrefab.setPosition(0,0);

        const window = tPrefab.getComponent('AlertDialog');

        const label = window.promptText;
        label.string = this.alertText;

        window.actionScene = this.actionScene;
    }
});
