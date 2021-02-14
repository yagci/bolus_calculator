let searchParams = new URLSearchParams(window.location.search);

const id = searchParams.get('id');
const url = 'https://de.openfoodfacts.org/api/v0/product/';
const uri = url + id;

// pie chart prep
let width = 300;
let height = 300;
let margin = 50;
let radius = Math.min(width, height) / 2 - margin

let kh;

// get product
d3.json(uri, function(data) {
    let p = data.product;

    d3.select('h1').text(p.product_name + ' (' + p.brands + ')');

    let svg = d3.select("#pie")
                .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    // create data for pie chart and calc
    let other = 100 - (p.nutriments.carbohydrates_100g + p.nutriments.fat_100g + p.nutriments.proteins_100g)
    let data_s = {
        'Kohlenhydrate': p.nutriments.carbohydrates_100g,
        'Fett': p.nutriments.fat_100g,
        'Protein': p.nutriments.proteins_100g,
        'Andere': other.toFixed(1)
    };

    kh = p.nutriments.carbohydrates_100g;

    let color = d3.scaleOrdinal()
        .domain(data_s)
        .range(["#E88484", "#AAA", "#CCC", "#EEE"])

    let pie = d3.pie()
        .value(function(d) {return d.value; })
    let data_ready = pie(d3.entries(data_s))

    svg.selectAll('all')
        .data(data_ready)
        .enter()
        .append('path').attr('d', d3.arc()
            .innerRadius(60)
            .outerRadius(radius)
        ).attr('fill', function(d) { return(color(d.data.key)) })
        .attr('stroke', 'white');
    
    let tbody = d3.select('tbody');
    for (let key in data_s) {
        let tr = tbody.append('tr');
        tr.append('td').text(key);
        tr.append('td').text(data_s[key]);
    };
}).header('User-Agent', 'Bolus-Rechner - Web - Version 1.0 - https://yagci.github.io/bolus_calculator/');


function calc() {
    let carbohyradtes = kh;
    let portion = document.getElementById('portion-size').value;

    let ke = (carbohyradtes / 100 * portion) / 10;
    let be = (carbohyradtes / 100 * portion) / 12;

    document.getElementById('ke').innerHTML = String(ke.round(1)) + '<span>CP</span>';
    document.getElementById('be').innerHTML = String(be.round(1)) + '<span>BE</span>';
};

Number.prototype.round = function(places) {
    return +(Math.round(this + "e+" + places)  + "e-" + places);
};

// if input is sent with enter
function keypress(event){
    if (event.keyCode == 13 || event.which == 13){
        event.preventDefault();
        calc();
    };
};