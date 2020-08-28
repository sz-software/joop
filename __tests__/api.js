const path = require("path")
const proto = require("../index.js")

const testClassPath = path.resolve(__dirname, "..", "test-class")
const testClass = proto(testClassPath)

describe("API", () => {
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
