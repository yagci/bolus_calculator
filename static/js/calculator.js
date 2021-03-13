function calculate() {
    let carbs = document.getElementById('ch-100').value;
    let portion = document.getElementById('portion-size').value;

    let ke = (carbs / 100 * portion) / 10;
    let be = (carbs / 100 * portion) / 12;

    document.getElementById('ke').innerHTML = String(ke.round(1)) + '<span>CP</span>';
    document.getElementById('be').innerHTML = String(be.round(1)) + '<span>BE</span>';
}

Number.prototype.round = function (places) {
    return +(Math.round(this + "e+" + places) + "e-" + places);
}