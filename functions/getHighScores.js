require('dotenv').config();
const Airtable = require('airtable')

Airtable.configure({
	apiKey: process.env.AIRTABLE_API_KEY
});
const base = require('airtable').base(process.env.AIRTABLE_API_BASE);
const table = base.table('Table1')

exports.handler = async (event) => {
	try {
		const records = await table.select({
				sort:[{field: "score", direction: "desc"}]
				,filterByFormula: `AND(name != "", score > 0)`}).firstPage();
		const formattedRecords = records.map(record => ({
			id: record.id,
			fields: record.fields
		}))
		return {
			statusCode: 200,
			body: JSON.stringify(formattedRecords)
		}
	} catch(err) {
		return {
			statusCode: 500,
			body: JSON.stringify({err: 'Failed to query records in Airtable'})
		}
	}

}
