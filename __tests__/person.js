const path = require("path")
const joop = require("../index.js")

const testClassPath = path.resolve(__dirname, "..", "person")
const person = joop(testClassPath)

describe("Person", () => {
	test(
		"should have correct api", 
		async () => {
			const inst = await person("Hans")

			expect(inst).toHaveProperty("getName")
			expect(inst).toHaveProperty("setName")
			expect(inst).toHaveProperty("incAge")

			expect(inst).toHaveProperty("age")
			expect(inst).not.toHaveProperty("_name")
		}
	)

	test(
		"initialisation should work", 
		async () => {
			const inst = await person("Hans")

			expect(inst.getName()).toEqual("Hans")
		}
	)

	test(
		"objects data should be encapsulated", 
		async () => {
			const inst1 = await person("Hans 1")
			const inst2 = await person("Hans 2")

			expect(inst1.getName()).toEqual("Hans 1")
			expect(inst2.getName()).toEqual("Hans 2")

			inst1.setName("Hans")

			expect(inst1.getName()).toEqual("Hans")
			expect(inst2.getName()).toEqual("Hans 2")
		}
	)

	test(
		"mutation of public variables should work",
		async () => {
			const inst = await person("Hans")

			expect(inst.age).toEqual(0)
			inst.incAge()
			expect(inst.age).toEqual(1)
		}
	)

	test(
		"constructor should have fromString function",
		() => {
			expect(
				person
			).toHaveProperty("fromString")
		}
	)

	test(
		"static fromString function should work",
		async () => {
			const inst = await person.fromString("Hans,42")

			expect(inst).toHaveProperty("getName")

			expect(inst.getName()).toEqual("Hans")
			expect(inst.age).toEqual(42)
		}
	)
})
