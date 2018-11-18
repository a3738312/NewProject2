import Data from "./Data";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Layout)
    private layout:cc.Layout=null;

    private cardList:number[][]=[];


    // onLoad () {}

    start () {
    }
    private showCard(){
        this.layout.node;
    }
    // update (dt) {}
}
