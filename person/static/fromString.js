module.exports = async function(str) {
	const [name, age] = str.split(",")

	const inst = await this(name)

	for (let i = 0; i < age; ++i) {
		inst.incAge()
	}

	return inst
}
