const path = require("path")
const proto = require("../index.js")
const util = require("util")

const testClassPath = path.resolve(__dirname, "..", "test-class")

describe("constructor", () => {
	test(
		"importing the same class twice should return the same constructor", 
		() => {
			const testClass1 = proto(testClassPath)
			const testClass2 = proto(testClassPath)

			expect(testClass1).toEqual(testClass2)
			expect(testClass1).toStrictEqual(testClass2)
		}
	)

	test(
		"constructor should be an async function",
		() => {
			const testClass = proto(testClassPath)

			expect(
				util.types.isAsyncFunction(testClass)
			).toEqual(true)
		}
	)

	test(
		"calling constructor should return a Promise",
		() => {
			const testClass = proto(testClassPath)

			expect(
				testClass()
			).toBeInstanceOf(Promise)
		}
	)

	test(
		"calling constructor with new should throw a TypeError",
		() => {
			const testClass = proto(testClassPath)

			expect(() => {
				const inst = new testClass()
			}).toThrowError(TypeError)
		}
	)

	test(
		"returned Promise from constructor should resolve to an object",
		async () => {
			const testClass = proto(testClassPath)

			const inst = await testClass()

			expect(inst).toBeInstanceOf(Object)
		}
	)
})
