import Data from "./Data";
import CardData from "./CardData";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class FGO extends cc.Component {

    @property(cc.Node)
    private type: cc.Node = null;
    @property
    private servantStar5: number = 10;
    @property
    private servantStar4: number = 50;
    @property
    private mysticCodeStar5: number = 510;
    @property
    private mysticCodeStar4: number = 550;
    @property
    private servantType: number = 500;

    @property(cc.Label)
    private text: cc.Label[] = [];

    // onLoad () {}

    start() {

    }

    update(dt) {
        this.text[0].string = "x" + Data.ins.getSjs();
    }

    public chouStart() {
        if (Data.ins.getSjs() < 30) return;

        this.clearCard();

        var card: CardData[] = [];
        for (var i = 0; i < 10; i++) {
            var cd: CardData = this.chou();
            if (cd != null)
                card.push(cd);
        }

        if (card.length < 10)
            return;

        Data.ins.setSjs(Data.ins.getSjs() - 30);
        Data.ins.addCardDataList(card);
        this.cardShow(card);
    }
    private chou(): CardData {
        var h = Math.random() * 1000;
        var a = 0;
        if (h < this.servantType) {
            a = 1;
            if (h < this.servantStar5)
                h = 5;
            else if (h < this.servantStar4)
                h = 4;
            else
                h = 3;
        } else {
            a = 2;
            if (h < this.mysticCodeStar5)
                h = 5;
            else if (h < this.mysticCodeStar4)
                h = 4;
            else
                h = 3;
        }
        return this.randomCardByType(h, a);
    }
    /**
     * 
     * @param lv 卡片星级: 5 4 3
     * @param tp 卡片类型: 1.Servant 2.Mystic Code
     */
    private randomCardByType(lv: number, tp: number): CardData {
        var cdList: CardData[] = Data.ins.getServantCardList();
        var returnList: CardData[] = [];
        for (var i in cdList) {
            if (cdList[i] != null) {
                if (cdList[i].level == lv && cdList[i].type == tp) {
                    returnList.push(cdList[i]);
                }
            }
        }
        var random = Math.floor(Math.random() * returnList.length);
        return returnList[random];
    }
    private cardShow(card:CardData[]) {
        var cardList = card;
        for (var i = 0; i < cardList.length; i++) {
            if (cardList[i] == null) continue;
            var self = this;
            Data.ins.getIconByCardData(i, cardList[i], function (nu, err, texture) {
                var a = cc.instantiate(self.type);
                var sf = new cc.SpriteFrame(texture);
                a.getComponent(cc.Sprite).spriteFrame = sf;
                if (nu < 6) {
                    a.setPosition(-326 + nu * 130, 140);
                } else {
                    a.setPosition(-196 + (nu - 6) * 130, -60);
                }
                a.parent = self.node;

            });
        }
    }
    private clearCard() {
        this.node.destroyAllChildren();
    }
    private goBag() {
        cc.director.loadScene("Bag");
    }
}
