require('dotenv').config();
const Airtable = require('airtable')

Airtable.configure({
	apiKey: process.env.AIRTABLE_API_KEY
});
const base = require('airtable').base(process.env.AIRTABLE_API_BASE);
const table = base.table('Table1');

const getHighScores = async (filterEmptyRecords) => {
	const queryOptions = {
		sort: [{field: 'score', direction: 'desc'}]
	};
	if(filterEmptyRecords) {
		queryOptions.filterByFormula = `AND(name != "", score > 0)`
	}
	const records = await table.select(queryOptions).firstPage();
	return records.map(record => ({
		id: record.id,
		fields: record.fields
	}));
}

module.exports = {
	getHighScores,
	table
}
