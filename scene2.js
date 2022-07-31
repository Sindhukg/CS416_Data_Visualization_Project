import {displayChart} from './areachart.js';
import {dropdownMenu} from './dropdownMenu.js';

var defaultContinent = 'Africa';

function displayContinent(data) {
    let options = [...new Set(data.map(d => d.continent))].sort();
    var selectedData = data.filter(d => { return d.continent == defaultContinent});
    displayChart(selectedData);

    dropdownMenu(d3.select('#menus'),{
        options: options,
        onOptionClicked: continent => {
            defaultContinent = continent;
            var selectedData = data.filter(d => { return d.continent == continent});
            displayChart(selectedData);
        },
        selectedOption:defaultContinent
    });
}

function casesContinent(){

    d3.select("#overview").style("display","none");
    d3.select("#continent").style("display","block");
    d3.select("#country").style("display","none");
    d3.select("#menus").style("display","block");

    d3.csv('./data/scene2.csv')
        .then(loadedData => {
            let data = loadedData;
            data.forEach(d => {
                d.cases = +d.cases;
                d.deaths = +d.deaths;
                var datesplit = d.date.split("-");
                d.date = new Date(datesplit[1]+'-'+datesplit[2]+"-"+datesplit[0]);
     
            });
            displayContinent(data);
        });
};

export {casesContinent,defaultContinent}