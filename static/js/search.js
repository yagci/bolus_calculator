const search_term = document.getElementById('term')
const url = 'https://de.openfoodfacts.org/cgi/search.pl?action=process&json=true&search_terms=';
const max = 11;

function searchProducts() {
    let term = search_term.value;
    let uri = url + term;

    let thead = d3.select('thead');
    let tbody = d3.select('tbody');

    // remove previous table
    d3.selectAll('tr').remove();

    // set table head
    let tr = thead.append('tr');
    tr.append('th').text('Produktname');
    tr.append('th').text('Marke');

    // set table body
    d3.json(uri, function (data) {
        let d = data.products.slice(1, max);
        for (var i = 0; i < max - 1; i++) {
            let tr = tbody.append('tr');
            tr.append('td').html('<a href="product.html?id=' + d[i].id + '">' + d[i].product_name + '</a>');
            tr.append('td').text(d[i].brands);
        };
    }).header('User-Agent', 'Bolus-Rechner - Web - Version 1.0 - https://yagci.github.io/bolus_calculator/');
};

// if input is sent with enter
function keypress(event) {
    if (event.keyCode == 13 || event.which == 13) {
        event.preventDefault();
        searchProducts();
    };
};