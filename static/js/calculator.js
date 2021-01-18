function calculate() {
    let carbohyradtes = document.getElementById('ch-100').value;
    let portion = document.getElementById('portion-size').value;

    let ke = (carbohyradtes / 100 * portion) / 10;
    let be = (carbohyradtes / 100 * portion) / 12;

    document.getElementById('ke').innerHTML = String(ke.round(1)) + '<span>CP</span>';
    document.getElementById('be').innerHTML = String(be.round(1)) + '<span>BE</span>';
}

Number.prototype.round = function(places) {
    return +(Math.round(this + "e+" + places)  + "e-" + places);
  }