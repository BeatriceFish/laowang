'use strict';
const db = uniCloud.database()
const _ = db.command
exports.main = async (event, context) => {
	const collection = db.collection('product')
	const res = await collection.where({
		type:_.eq(event.name)
	}).get()
	return res
};
