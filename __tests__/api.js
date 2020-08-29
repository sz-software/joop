const path = require("path")
const joop = require("../index.js")

const testClassPath = path.resolve(__dirname, "..", "test-class")
const testClass = joop(testClassPath)

describe("API", () => {
	test(
		"when directory arugment is an array, path.join should be used",
		async () => {
			const testClass2 = joop([
				__dirname,
				"..",
				"test-class"
			])

			expect(testClass2).toEqual(testClass)
		}
	)

	test(
		".init() should not be exported", 
		async () => {
			const inst = await testClass()

			expect(inst).not.toHaveProperty("init")
		}
	)

	test(
		".testFn() should be exported",
		async () => {
			const inst = await testClass()

			expect(inst).toHaveProperty("testFn")
			expect(inst.testFn()).toEqual("Hello")
		}
	)

	test(
		"._privateFn() should not be exported",
		async () => {
			const inst = await testClass()

			expect(inst).not.toHaveProperty("_privateFn")
			expect(inst.proxyPrivateFn()).toEqual("Private")
		}
	)

	test(
		".publicVar should be exported",
		async () => {
			const inst = await testClass()

			expect(inst).toHaveProperty("publicVar")
			expect(inst.publicVar).toEqual("Hans")
		}
	)
})
