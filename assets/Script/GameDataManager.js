
cc.Class({
    extends: cc.Component,

    properties: {
        rolebar: {
            type: cc.Prefab,
            default: null
        },
        taskbar: {
            type: cc.Prefab,
            default: null
        }
    },

    onLoad() {
        // this.clearData();
        this.gameData = JSON.parse(cc.sys.localStorage.getItem('gameData'));

        if (!this.gameData) {

            cc.loader.loadResDir('game-data', cc.Array, (err, data) => {
                if (err) {
                    cc.error(err);
                    return;
                }

                this.gameData = data[0];
                // console.log(this.gameData);
                this.setUpUI();


            });
        } else {
            // console.log(this.gameData);
            this.setUpUI();

        }

        this.node.on('update-data', (event) => {
            this.updateUI();
        });

    },

    setUpUI() {
        this.setupRoleBar();
        this.setupTaskBar();
    },
    updateUI() {
        this.updateRoleBar();
        this.updateTaskBar();
    },

    setupTaskBar() {
        const node = cc.instantiate(this.taskbar);
        node.parent = cc.Canvas.instance.node;
        node.setPosition(0, 0);

        this.taskbarNode = node;

        this.updateTaskBar();
    },

    setupRoleBar() {
        const node = cc.instantiate(this.rolebar);
        node.parent = cc.Canvas.instance.node;
        node.setPosition(0, 0);

        this.rolebarNode = node;

        this.updateRoleBar();
    },

    updateRoleBar() {
        const node = this.rolebarNode;

        const { roleName, gameDate, money, job, position, city, country, smallAvatar } = this.gameData;

        const nameLabel = node.getChildByName('name&job').getComponent(cc.Label);

        nameLabel.string = `${job} ${roleName}`;

        const posLabel = node.getChildByName('date&loc&country').getComponent(cc.Label);

        const date = this.stringToDate(gameDate);

        let gameDateDisplay = date.pattern("yyyy年MM月dd日");

        posLabel.string = `${gameDateDisplay} ${city.cityName} ${country}`;

        const moneyLabel = node.getChildByName('gold-bar').getComponentInChildren(cc.Label);

        const moneyBig = Math.floor(money);

        const moneySmall = Math.floor((money - moneyBig) * 1000).toString().padStart(3, "0");
        moneyLabel.string = `${moneyBig}貫${moneySmall}文`;

        const avatar = node.getChildByName('avatar-mask').getChildByName('avatar').getComponent(cc.Sprite);

        cc.loader.loadRes(`Avatar-small/${smallAvatar}`, cc.SpriteFrame, (err, sprite) => {
            if (err) {
                console.log(err);
            } else {
                avatar.spriteFrame = sprite;
            }

        });
    },

    updateTaskBar() {
        const node = this.taskbarNode;

        const meetingDateLabel = node.getChildByName('评定期限').getComponent(cc.Label);
        const meetingCityLabel = node.getChildByName('会议地点').getComponent(cc.Label);
        const taskTargetLabel = node.getChildByName('任务内容').getComponent(cc.Label);
        const taskDateLabel = node.getChildByName('任务期限').getComponent(cc.Label);

        const { task, meeting } = this.gameData;

        meetingDateLabel.string = meeting.date;
        meetingCityLabel.string = meeting.city;
        taskDateLabel.string = task.date;
        taskTargetLabel.string = task.target;

    },

    stringToDate(fDate) {
        var fullDate = fDate.split("-");

        return new Date(fullDate[0], fullDate[1] - 1, fullDate[2], 0, 0, 0);
    },

    saveData() {
        cc.sys.localStorage.setItem('gameData', JSON.stringify(this.gameData));
    },

    clearData() {
        cc.sys.localStorage.setItem('gameData', null);
    },

    onDestroy() {
        this.saveData();
    }
});

Date.prototype.pattern = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份         
        "d+": this.getDate(), //日         
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
        "H+": this.getHours(), //小时         
        "m+": this.getMinutes(), //分         
        "s+": this.getSeconds(), //秒         
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
        "S": this.getMilliseconds() //毫秒         
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}       
