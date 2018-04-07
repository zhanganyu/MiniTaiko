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
        cardPrefab: {
            type: cc.Prefab,
            default: null
        },
        npcList: {
            type: cc.Prefab,
            default: null
        }

    },

    onLoad() {
        this.cardList = [
            {
                "title": "城",
                "action": {
                    "scene": "House",
                    "roomImage": "room_image39",
                    "chatList": [
                        {
                            "roleName": "织田信长",
                            "avatar": "avatar_big196",
                            "text": "猴子你怎么来了？\n任务完成了吗？",
                            "avatarPosition": "right"
                        },
                        {
                            "roleName": "木下藤吉郎",
                            "avatar": "avatar_big518",
                            "text": "还没有呢主公。。。",
                            "avatarPosition": "left"
                        },
                    ]
                }
            },
            {
                "title": "自宅",
                "action": {
                    "scene": "House",
                    "roomImage": "room_image44",
                    "chatList": [
                        {
                            "roleName": "宁宁",
                            "avatar": "ningning",
                            "text": "相公，你回来啦？\n这里是我们的家，到下次评定召开，你可以在这里休息哦。",
                            "avatarPosition": "right"
                        }
                    ]
                }
            },
            {
                "title": "武将宅",
                "action": {
                    "dialog": "NPCList",
                    "title": "武将列表"
                }
            },
            {
                "title": "练兵场",
                "action": {
                    "scene": "TrainingPlace",
                }
            }
        ];

        this.cardList.forEach(card => {
            const node = cc.instantiate(this.cardPrefab);
            node.parent = cc.Canvas.instance.node.getChildByName('卡片组');
            node.setPosition(0, 0);

            const { title, action } = card;

            const titleLabel = node.getComponentInChildren(cc.Label);
            titleLabel.string = title;

            const button = node.getComponent(cc.Button);

            const clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = 'CityManager';

            if (action.scene) {
                clickEventHandler.handler = "changeScene";
                clickEventHandler.customEventData = action;
            } else if (action.dialog) {
                clickEventHandler.handler = "openDialog";
                clickEventHandler.customEventData = action;
            }

            button.clickEvents.push(clickEventHandler);
        });
    },
    start() {

    },
    changeScene(event, action) {
        cc.audioEngine.stopAll();
        cc.director.loadScene(action.scene, () => {
            const bgSprite = cc.Canvas.instance.node.getChildByName('房间背景').getComponent(cc.Sprite);
            cc.loader.loadRes(`Rooms/${action.roomImage}`, cc.SpriteFrame, (err, sp) => {
                bgSprite.spriteFrame = sp;
            });

            //默认对话
            const chapterManager = cc.director.getScene().getChildByName('剧本管理').getComponent('ChapterManager');
            chapterManager.chatList = action.chatList;
        });
    },
    openDialog(event, action) {
        if (action.dialog === 'NPCList') {
            const node = cc.instantiate(this.npcList);

            node.parent = cc.Canvas.instance.node;
            node.setPosition(0, 0);

            node.zIndex = 10;

            const windowTitle = node.getChildByName('页面标题').getComponentInChildren(cc.Label);
            windowTitle.string = action.title;

            const listComp = node.getComponent('NPCList');
            listComp.list = [
                {
                    "name": "竹中半兵卫",
                    "scene": "House",
                    "roomImage": "room_image50",
                    "avatar": "avatar_big456"
                },
                {
                    "name": "前田利家",
                    "scene": "House",
                    "roomImage": "room_image38",
                    "avatar": "avatar_big660"
                },
                {
                    "name": "浅井长政",
                    "scene": "House",
                    "roomImage": "room_image41",
                    "avatar": "avatar_big17"
                },
                {
                    "name": "织田信长",
                    "scene": "House",
                    "roomImage": "room_image39",
                    "avatar": "avatar_big196"
                }
            ]
        }
    }

    // update (dt) {},
});
