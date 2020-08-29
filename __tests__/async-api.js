const path = require("path")
const joop = require("../index.js")

const testClassPath = path.resolve(__dirname, "..", "async-test-class")
const testClass = joop(testClassPath)

describe("Async API", () => {
	test(
		"should wait for object to initialise", 
		async () => {
			const inst = await testClass()

			expect(inst).toHaveProperty("done")
			expect(inst.done).toEqual("initialised")
		}
	)
})
