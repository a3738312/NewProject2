import CardData from "./CardData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Data extends cc.Component {


    private Servants: CardData[] = [];

    public static ins: Data;
    @property
    private sjs: number = 0;//圣晶石

    private servantCardList: CardData[] = [];
    private mysticCodeCardList: CardData[] = [];
    @property(cc.Texture2D)
    private texture: cc.Texture2D = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        Data.ins = this;
        window.localStorage.clear();
        var self = this;
        cc.loader.load('res/raw-assets/resource/json/cardData.json',(err,jso)=>{
            if(!err){
                for(var i in jso){
                    self.servantCardList.push(jso[i] as CardData);
                }
            }else{
                console.error(err);
            }
            console.log(self.servantCardList)
        });

    }

    public getSjs(): number {
        return this.sjs;
    }

    public setSjs(n: number) {
        this.sjs = n;
    }

    public getCardDataById(id: number): CardData {
        var cardData: CardData = null;
        var wl = window.localStorage;
        var str = wl.getItem("cardData" + (id + 1));
        if (str != null && str != 'undefined') {
            cardData = JSON.parse(str);
        }
        return cardData;
    }

    public getCardDataList(): CardData[] {
        var cd: CardData[] = [];
        var wl = window.localStorage;
        for (var i = 0; i < wl.length; i++) {
            var cdd = this.getCardDataById(i);
            if (cdd != null)
                cd.push(cdd);
        }
        return cd;
    }
    public getServantCardList(): CardData[] {
        return this.servantCardList;
    }

    public addCardDataListOne(cd: CardData) {
        if (cd == null) return;
        let a = window.localStorage;
        a.setItem("cardData" + (a.length + 1), JSON.stringify(cd));
    }

    public addCardDataList(n: CardData[]) {
        if (n[0] == null) return;
        for (var i in n) {
            this.addCardDataListOne(n[i]);
        }
    }
    public getIconByCardData(i,cd:CardData,callback:Function){
        var icon = cd.icon;
        var nu = i;
        cc.loader.load(icon,(err,texture)=>{
            callback(nu,err,texture);
        });
    }
    // update (dt) {}
}
