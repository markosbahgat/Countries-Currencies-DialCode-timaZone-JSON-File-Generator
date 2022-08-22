const fs = require('fs');

let finalData = [];
const data1 = fs.readFileSync('./src/countries.json', { encoding: 'utf-8', flag: 'r' });
const data2 = fs.readFileSync('./data/countries_with_timeZones.json', { encoding: 'utf-8', flag: 'r' });
JSON.parse(data1).map((item) => {
	const target = JSON.parse(data2).find(
		(too) => too.CountryName.toLowerCase() === item.name.toLowerCase() || too.IsoAlpha2 === item.code
	);
	if (target) {
		finalData.push({ ...item, timeZone: target['TimeZones'][0], windowsTimeZones: target['WindowsTimeZones'] });
	} else {
		finalData.push(item);
	}
});

if (finalData) {
	fs.writeFileSync('./src/countries1.json', JSON.stringify(finalData), (err) => {
		console.log(err);
	});
}
