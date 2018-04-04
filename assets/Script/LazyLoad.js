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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        //console.log(bgMap);

        //bgMap.node.setNodeDirty(true);

        
        

    },

    start () {
        
        this.SCW = cc.director.getVisibleSize().width;
        this.SCH = cc.director.getVisibleSize().height;
        
        //init word position 6587.73, 2366.17 
        
        this.node.position = cc.v2(-6587*this.node.scale, -2366*this.node.scale);
        
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function ( event ) {
          
          var delta = event.getDelta();
          
          console.log('touchDelta:' + delta.x +"width" + (this.node.width*this.node.scale - this.SCW));
          
          var posX = this.node.x + delta.x;
          var posY = this.node.y + delta.y;
          
          console.log('posx:' + posX);
          if (posX >=this.SCW - this.node.width*this.node.scale && posX <=0) {
              this.node.x = posX;
          }
          
          if (posY >=this.SCH - this.node.height*this.node.scale && posY <=0) {
              this.node.y = posY;
          }
        },this);
        
        
        this.node.on('mousedown', function ( event ) {
          
            var point = cc.v2(event.getLocation().x, event.getLocation().y);
            point = this.node.convertToNodeSpace(point);
            console.log('触摸坐标:' + event.getLocation().x +','+ event.getLocation().y);
            console.log('pos after trans' + point);
        },this);
        
        
        
        //控制缩放
        this.scroll = 0.7;
        
        this.node.on(cc.Node.EventType.MOUSE_WHEEL, function(event) {
            var s = event.getScrollY() > 0 ? 0.1 : -0.1;
            //console.log('滚轮 ：' + s);
            
            this.scroll += s;
            
            this.scroll = cc.clampf(this.scroll, 0.1, 1);

            this.node.scale = this.scroll;
        }, this);
    },

    // update (dt) {},
});
