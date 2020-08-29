const path = require("path")
const joop = require("../index.js")
const util = require("util")

const testClassPath = path.resolve(__dirname, "..", "test-class")

describe("constructor", () => {
	test(
		"importing the same class twice should return the same constructor", 
		() => {
			const testClass1 = joop(testClassPath)
			const testClass2 = joop(testClassPath)

			expect(testClass1).toEqual(testClass2)
			expect(testClass1).toStrictEqual(testClass2)
		}
	)

	test(
		"constructor should be an async function",
		() => {
			const testClass = joop(testClassPath)

			expect(
				util.types.isAsyncFunction(testClass)
			).toEqual(true)
		}
	)

	test(
		"calling constructor should return a Promise",
		() => {
			const testClass = joop(testClassPath)

			expect(
				testClass()
			).toBeInstanceOf(Promise)
		}
	)

	test(
		"calling constructor with new should throw a TypeError",
		() => {
			const testClass = joop(testClassPath)

			expect(() => {
				const inst = new testClass()
			}).toThrowError(TypeError)
		}
	)

	test(
		"returned Promise from constructor should resolve to an object",
		async () => {
			const testClass = joop(testClassPath)

			const inst = await testClass()

			expect(inst).toBeInstanceOf(Object)
		}
	)
})
