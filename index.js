"use strict";
const fs = require("fs")
const path = require("path")
const isDirectory = require("is-directory")
const cache = {}

const _addFunctionsFromDir = function(obj, dir) {
	for (const entry of fs.readdirSync(dir)) {
		if (entry.slice(-3) !== ".js") continue

		const fn = entry.slice(0, -3)

		obj[fn] = require(
			path.resolve(dir, entry)
		).bind(obj)
	}
}

module.exports = function(dir) {
	// Resolve array
	if (Array.isArray(dir)) {
		dir = path.join.apply(null, dir)
	}

	const abs_dir = path.resolve(dir)
	const name = path.basename(dir)

	if (abs_dir in cache) {
		return cache[abs_dir]
	}

	const definition = function() {
		_addFunctionsFromDir(this, abs_dir)
	}

	// Make asynchronous instantiation the standard way
	// to create a new object
	const constructor = async function(...args) {
		const inst = new definition()

		await inst.init(...args)

		delete inst.init

		let proxy = {}

		Object.keys(inst)
		.filter(key => key[0] !== "_")
		.forEach(key => {
			Object.defineProperty(proxy, key, {
				get() {
					return inst[key]
				},
				enumerable: true
			})
		})

		return proxy
	}

	// Add static methods
	const static_dir = path.resolve(abs_dir, "static")

	if (isDirectory.sync(static_dir)) {
		_addFunctionsFromDir(constructor, static_dir)
	}

	return cache[abs_dir] = constructor
}
