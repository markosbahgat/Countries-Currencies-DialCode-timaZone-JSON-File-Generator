const fs = require('fs');

let finalData = [];

const data1 = fs.readFileSync('./data/countries2.json', { encoding: 'utf-8', flag: 'r' });

JSON.parse(data1).map((item) =>
	finalData.push({
		name: item.name,
		dial_code: item.dial_code,
		code: item.code,
		flag: item.flag
	})
);

const data2 = fs.readFileSync('./data/countries1.json', { encoding: 'utf-8', flag: 'r' });
JSON.parse(data2).countries.map((item) => {
	const target = finalData.find((too) => item.name.toLowerCase() === too.name.toLowerCase());
	if (target) {
		target['timezone_offset'] = item['timezone_offset'];
		target['latLong'] = item['latlong'];
	}
});
let data3 = fs.readFileSync('./data/countries0.json', { encoding: 'utf-8', flag: 'r' });
data3 = JSON.parse(data3);
for (key in data3) {
	data3[key]['code'] = key;
	const target = finalData.find((too) => data3[key]['name'].toLowerCase() === too.name.toLowerCase());
	if (target) {
		target['native'] = data3[key]['native'];
		target['capital'] = data3[key]['capital'];
		target['language'] = data3[key]['languages'][0];
		target['currency'] = data3[key]['currency'][0];
	}
}

if (finalData) {
	fs.mkdir('./src', { recursive: true }, (err) => {
		fs.writeFile('./src/countries.json', JSON.stringify(finalData), (err) => {
			console.log(err);
		});
	});
}
