'use strict';
const db = uniCloud.database()
const _ = db.command
exports.main = async (event, context) => {
	const collection = db.collection('sku')
	const res = await collection.where({
		product:_.eq(event.product)
	}).get()
	return res
};
