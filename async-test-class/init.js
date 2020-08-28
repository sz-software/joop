module.exports = function() {
	return new Promise(resolve => {
		setTimeout(() => {
			this.done = "initialised"

			resolve()
		}, 10)
	})
}
