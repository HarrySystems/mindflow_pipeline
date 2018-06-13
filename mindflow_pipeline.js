require("mindflow")
let pipeline = MindFlow.node({
	about: {
		name: 'pipeline',
		description: "Execute one step after another"
	},
	
	format: {
		input: [
			{
				name: "steps",
				description: "Array with the list of defined ",
				type: "array",
				required: true
			}
		]
	},
	
	execute: function({ data, input }) {
		// empty step
		let last_step = {
			data: { },
			input: { }
		}
		
		// for each step
		for(let step of input.steps) {
			let node = step.node
			if(typeof step.node == "string")
				MindFlow.nodes[step.node]
			
			step.data = MindFlow.nodes[step.node].execute({
				data: Object.assign(
					last_step.data,
					step.data
				),
				input: step.input
			})
			
			last_step = step
		}
		
		// return end of pipeline data
		return input.steps[input.steps.length - 1].data
	}
})

if(module) {
	module.exports = pipeline
}
