// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        avatarImg_1Sprite:cc.Sprite,
        avatarImg_2Sprite:cc.Sprite,
        duiyou:cc.Node,
        nickLabel:cc.Label,
        level:cc.Label,
        rankImg:cc.Node,
        ranklabel:cc.Label,
        ranksprite:{
            default:[],
            type:cc.SpriteFrame,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    init(data){
        this.ranklabel.string = "第"+data.lvl+"关";
        if(data.rank <=3){
            this.rankImg.active = true;
            this.rankImg.getComponent(cc.Sprite).spriteFrame = this.ranksprite[data.rank-1];
        }else{
            this.rankImg.active = false;
            this.level.string = data.rank;
        }
        if(data.users.length == 2){
            this.duiyou.active = true;
            let avatarUrl = data.users[0].headurl;
            this.createImage(avatarUrl);
            
            let headurl = data.users[1].headurl;
            if(headurl){
                this.createImage2(headurl);
            }
            data.users[0].nick = data.users[0].nick.substr(0,2);
            let emojiReg  = new RegExp(/(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f])|(\ud83d[\ude80-\udeff])/);
            let ishave = emojiReg.test(data.users[0].nick);
            if(!ishave){
                data.users[0].nick = data.users[0].nick.substr(0,1);
            }
            if(data.users[1].nick){
                data.users[1].nick = data.users[1].nick.substr(0,2);
                let ishave_2 = emojiReg.test(data.users[1].nick);
                if(!ishave_2){
                    data.users[1].nick = data.users[1].nick.substr(0,1);
                }
            }else{
                data.users[1].nick = "游";
            }
            
            this.nickLabel.string = data.users[0].nick+data.users[1].nick+"战队";
        }else{
            this.duiyou.active = false;
            let avatarUrl = data.users[0].headurl;
            this.createImage(avatarUrl);
            if(data.users[0].nick.length>6){
                data.users[0].nick = data.users[0].nick.substr(0,6);
            }
            this.nickLabel.string = data.users[0].nick;
        }

    },
    createImage(avatarUrl) {
        let self = this;
        cc.loader.load({url:avatarUrl +"?aaa=aa.jpg", type: 'jpg'},function(err, texture){
            if(texture){ 
                self.avatarImg_1Sprite.spriteFrame = new cc.SpriteFrame(texture);
            }
        });
    },
    createImage2(avatarUrl) {
        let self = this;
        cc.loader.load({url:avatarUrl +"?aaa=aa.jpg", type: 'jpg'},function(err, texture){
            if(texture){ 
                self.avatarImg_2Sprite.spriteFrame = new cc.SpriteFrame(texture);
            }
        });
    }
    // update (dt) {},
});
