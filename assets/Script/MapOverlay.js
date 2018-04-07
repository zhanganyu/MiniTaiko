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
        cityPrefab: {
            type: cc.Prefab,
            default: null
        }

    },

    onLoad() {
        cc.loader.loadResDir('city-data', cc.Array, (err, data) => {
            if (err) {
                cc.error(err);
                return;
            }

            data[0].forEach(city => {
                const { lat, lng, cityName, cityId, cityType } = city;

                const node = cc.instantiate(this.cityPrefab);
                node.position = cc.v2(lat, lng);

                const label = node.getComponentInChildren(cc.Label);
                label.string = cityName;

                const sprite = node.getComponent(cc.Sprite);

                var url = `map-icon/CITY_${cityType}`;
                this.addSpritePic(sprite, url);
                this.node.addChild(node);

                const clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = 'MapManager';
                clickEventHandler.handler = "onMove";
                clickEventHandler.customEventData = city;
                node.getComponent(cc.Button).clickEvents.push(clickEventHandler);
            });

        });




    },
    addSpritePic(container, url) {
        cc.loader.loadRes(url, cc.SpriteFrame, (err, spFrame) => {
            container.spriteFrame = spFrame;
        });
    },

});
