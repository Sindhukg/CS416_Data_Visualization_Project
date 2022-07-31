import { displayChart } from './areachart.js';
import { dropdownMenu } from './dropdownMenu.js';
import { data } from './main.js';
import { defaultContinent } from './scene2.js';

var defaultCountry = 0;

function displayCountry() {
    
    var continentData = data.filter(d => { return d.continent == defaultContinent});
    let options = [...new Set(continentData.map(d => d.country))].sort();

    if (defaultCountry==0) {
        defaultCountry=options[0];
    };

    var selectedData = data.filter(d => { return d.country == defaultCountry});
    console.log(options[0]);
    displayChart(selectedData);

    dropdownMenu(d3.select('#menus'),{
        options: options,
        onOptionClicked: country => {
            defaultCountry = country;
            var selectedData = data.filter(d => { return d.country == country});
            displayChart(selectedData);
        },
        selectedOption:defaultCountry
    });
}

function casesCountry(){

    d3.select("#overview").style("display","none");
    d3.select("#continent").style("display","none");
    d3.select("#country").style("display","block");

    d3.select("#menus").style("display","block");

    if (data===0){
    d3.csv('./data/scene3.csv')
        .then(loadedData => {
            data = loadedData;
            data.forEach(d => {
                d.country = d.continent + ',' + d.country;
                d.cases = +d.cases;
                d.deaths = +d.deaths;
                var datesplit = d.date.split("-");
                d.date = new Date(datesplit[1]+'-'+datesplit[2]+"-"+datesplit[0]);
                
            });
            displayCountry();
        });
    }
    else {
        displayCountry();};
};

export {casesCountry}