'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('types')
	const res = await collection.get()
	console.log(res)
	return res
};
