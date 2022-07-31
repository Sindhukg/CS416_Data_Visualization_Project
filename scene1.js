import {displayChart} from './areachart.js';

function casesOverview(){

    d3.select("#overview").style("display","block");
    d3.select("#continent").style("display","none");
    d3.select("#country").style("display","none");
    d3.select("#menus").style("display","none");

    d3.csv('./data/scene1.csv')
        .then(data => {
            data.forEach(d => {
                d.cases = +d.cases;
                d.deaths = +d.deaths;
                var datesplit = d.date.split("-");
                d.date = new Date(datesplit[1]+'-'+datesplit[2]+"-"+datesplit[0]);
                
        });
       
    displayChart(data);

    });

};


export {casesOverview}