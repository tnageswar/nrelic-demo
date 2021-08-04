const data = require('./original_csv_to_json.json');

console.log(`The data length is ${data.length}`);
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// const comset = new Set();
// data.forEach((ele) => {
//     comset.add(ele['company_name']);
// });

// comset.forEach((element) => {
//     console.log(element);
// });

//Just randomly selecting companies
const comp_arr = [];
for (let i = 0; i < 8; i++) {
    let indx = getRandomInt(499);
    console.log(`${data[indx]['company_name']}`);
    comp_arr.push(data[indx]['company_name']);
}

data.forEach((ele, idx) => {
    ele.company_name = comp_arr[getRandomInt(7)];
    ele.uid = 1000 + idx;
    console.log(`comp: ${ele.company_name}`);
});

const fs = require('fs');

const content = JSON.stringify(data);

try {
    const data = fs.writeFileSync(`./withcompany_${Date.now()}.json`, content);
    //file written successfully
} catch (err) {
    console.error(err);
}
