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
			expect(
				testClass2.__joop.root
			).toEqual(
				testClassPath
			)
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
		"index.js should be ignored",
		async () => {
			const inst = await testClass()

			expect(inst).not.toHaveProperty("index")
		}
	)

	test(
		"index.js should work correctly",
		async () => {
			const constructor1 = joop(testClassPath)
			const constructor2 = require("../test-class")

			expect(constructor1).toEqual(constructor2)
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

	test(
		".publicVar should not be writable",
		async () => {
			const inst = await testClass()

			expect(inst.publicVar).toEqual("Hans")
			inst.publicVar = "x"
			expect(inst.publicVar).toEqual("Hans")
		}
	)

	test(
		".__constructor should equal the actual constructor",
		async () => {
			const inst = await testClass()

			expect(inst.getConstructor()).toEqual(testClass)
		}
	)
})
