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
        posInMap: {
            default:cc.v2(0,0)
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // const mapNode = this.node.getParent();
        // console.log(mapNode);

        // const posInMap =  this.node.getNodeToParentTransform();

        // console.log(posInMap);
    },

    // update (dt) {},
});
