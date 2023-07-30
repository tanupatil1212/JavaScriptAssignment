class Player{
    constructor(symbol,name){
        this.symbol=symbol
        this.name=name
    }
    markCell(cellObj){
        cellObj.mark=this.symbol;
    }

}
module.exports = Player;