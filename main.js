import {casesOverview} from './scene1.js';
import {casesContinent} from './scene2.js';
import {casesCountry} from './scene3.js';

var current_scene =1;
var previous_scene =0;
var data = 0;
function loadCountryData(){

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

            });
        };

};
function onClickPrevious(){
    const previousButton = document.getElementById("P");
    const nextButton = document.getElementById("N");

    if (current_scene === 3){
        current_scene = 2
        previous_scene = 1;
        nextButton.disabled = false;

        casesByContinent();

    } else if (current_scene === 2){
        current_scene = 1
        previous_scene = 0;
        nextButton.disabled = false;
        previousButton.disabled = true;

        overview();

    } else if (current_scene === 1){
        previous_scene = 0;
    };
};

function onClickNext(){
    const previousButton = document.getElementById("P");
    const nextButton = document.getElementById("N");

    previous_scene = current_scene;
    current_scene = current_scene + 1
    nextButton.disabled = false;

    if (current_scene === 3){
        nextButton.disabled = true;
        casesByCountry();
    };
    previousButton.disabled = false;

    if (current_scene === 2){
        casesByContinent();
    };
};

function overview() {
    
    const previousButton = document.getElementById("P");
    previousButton.disabled = true;
    current_scene = 1;

    const nextButton = document.getElementById("N");
    nextButton.disabled = false;

    loadCountryData();
    casesOverview();
};

function casesByContinent() {

    current_scene = 2;
    const nextButton = document.getElementById("N");
    nextButton.disabled = false;

    menus.textContent = "Select Continent    ";
    casesContinent();
};

function casesByCountry() {

    current_scene = 3;

    const nextButton = document.getElementById("N");
    nextButton.disabled = true;

    menus.textContent = "Select Country  ";
    casesCountry();
};


window.main = overview();

document.getElementById("P").onclick = onClickPrevious;
document.getElementById("N").onclick = onClickNext;

export {data};
