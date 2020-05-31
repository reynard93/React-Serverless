const {table, getHighScores} = require("./utils/airtable")

exports.handler = async (event) => {
	if (event.httpMethod !== "POST") {
		return {
			statusCode: 405,
			body: JSON.stringify({err: 'That method is not allowed'})
		}
	}
	const {score, name} = JSON.parse(event.body)
	if (!score || !name) {
		return {
			statusCode: 400,
			body: JSON.stringify({err: 'Bad request'})
		}
	}
	try {
		const records = await getHighScores(false);
		console.log(records, 'records')
		const lowestRecord = records[9];
		console.log(lowestRecord, 'what is lwoes')
		if (typeof lowestRecord.fields.score === 'undefined' || score > lowestRecord.fields.score) {
			// update this record with the incoming score
			const updatedRecord = {
				id: lowestRecord.id,
				fields: {name, score}
			};
			await table.update([updatedRecord])
			return {
				statusCode: 200,
				body: JSON.stringify(updatedRecord)
			}
		} else {
			return {
				statusCode: 200,
				body: JSON.stringify({})
			}
		}
	} catch(err) {
		return {
			statusCode: 500,
			body: JSON.stringify({err: 'Failed to save score.'})
		}
	}

}
