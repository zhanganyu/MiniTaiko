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
        playerPrefab: {
            type: cc.Prefab,
            default: null
        },
        dialogPrefab: {
            type: cc.Prefab,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //读取山路
        cc.loader.loadRes('road', cc.Object, (err, roads) => {
            //console.log(roads);
            this.roads = roads;
        });
    },

    start() {
        this.dataManager = cc.director.getScene().getChildByName('数据管理').getComponent('GameDataManager');
        const userLoc = this.dataManager.gameData.position;

        this.userLoc = cc.p(userLoc.lat, userLoc.lng);

        this.SCW = cc.director.getVisibleSize().width;
        this.SCH = cc.director.getVisibleSize().height;
        this.screenCenter = cc.v2(- this.SCW / 2, 8160 - this.SCH / 2);

        const scroll = this.node.parent.parent.getComponent(cc.ScrollView);
        let mapCenter = cc.v2(userLoc.lat, - userLoc.lng);
        scroll.scrollToOffset(mapCenter.add(this.screenCenter), 0.1);

        scroll.node.on('scroll-ended', (e) => {

            mapCenter = cc.v2(-scroll.getScrollOffset().x + this.SCW / 2, scroll.getScrollOffset().y + this.SCH / 2 - 8160);

            console.log(mapCenter);
        });




        this.node.on('mousedown', (event) => {

            var point = cc.v2(event.getLocation().x, event.getLocation().y);
            point = this.node.convertToNodeSpaceAR(point);
            // console.log('触摸坐标:' + event.getLocation().x + ',' + event.getLocation().y);
            // console.log('pos after trans' + point);
        }, this);

        this.scale = 1;
        this.node.on(cc.Node.EventType.MOUSE_WHEEL, (event) => {

            var s = event.getScrollY() > 0 ? 0.1 : -0.1;

            this.scale += s;

            this.scale = cc.clampf(this.scale, 0.5, 1);

            scroll.scrollToOffset(mapCenter.mul(this.scale).add(this.screenCenter), 0.1);

            this.node.scale = this.scale;
        }, this);

        this.setUpUser(userLoc);
    },

    setUpUser(loc) {
        const node = cc.instantiate(this.playerPrefab);

        node.parent = this.node;
        node.zIndex = 5;
        node.position = cc.p(loc.lat, loc.lng);

        this.pNode = node;
    },

    onMove(event, city) {
        console.log(city);
        var target = cc.p(city.lat, city.lng);

        var vec = cc.v2(city.lat - this.userLoc.x, city.lng - this.userLoc.y);
        var dist = vec.mag();

        const speed = 500;
        const duration = dist / speed;

        // 创建一个移动动作
        var action = cc.moveTo(duration, target.x, target.y);
        // 停止所有动作
        this.pNode.stopAllActions();
        // 执行动作
        this.pNode.runAction(action);

        this.userLoc = target;

        setTimeout(() => {
            console.log("到达目的地");
            this.userLoc = target;

            this.dataManager.gameData.city = city;
            this.dataManager.gameData.position = { lat: city.lat, lng: city.lng };
            this.dataManager.node.dispatchEvent(new cc.Event.EventCustom('update-data', true));


            this.showDialog(`确认进入[${city.cityName}]?`);

        }, duration * 1000);
    },
    showDialog(title) {
        const node = cc.instantiate(this.dialogPrefab);
        node.parent = cc.Canvas.instance.node;
        node.setPosition(0,0);
        

        const window = node.getComponent('AlertDialog');

        const label = window.promptText;
        label.string = title;

        window.actionScene = 'City';
    }

});
