import { dataClimate } from './data/json_final.js'
var canvas = document.getElementById('myChart')
let activeClaim = -1
let activeSubClaim = -1

const nbTweetPerClaim = dataClimate.map((el) => {
	return el.reduce((acc, curr) => (acc += parseInt(curr.nbtweets)), 0)
})
const nbSubPerClaim = dataClimate.map((el) => el.length)
const nbTweetPerSubClaim = []
dataClimate.forEach((claim) => {
	claim.forEach((subclaim) => {
		nbTweetPerSubClaim.push(parseInt(subclaim.nbtweets))
	})
})
const dataClimateFlat = []
dataClimate.forEach((claim) => {
	claim.forEach((subclaim) => {
		dataClimateFlat.push(subclaim)
	})
})
console.log(dataClimateFlat)

const baseData = () => ({
	datasets: [
		{
			data: [100],
			backgroundColor: ['rgba(255, 26, 104, 0.0)'],
			borderColor: ['rgba(0, 0, 0, 0)'],
		},
		{
			data: nbTweetPerClaim,
			backgroundColor: [
				'#eb9d17ff',
				'#17abebff',
				'#ab17ebff',
				'#eb1729ff',
				'#25eb17ff',
			],
			borderColor: ['rgba(255, 26, 104, 0)'],
			borderWidth: 10,
		},
	],
})

const subclaimData = () => {
	console.log('-----------------')
	const colors = []
	dataClimate.forEach((claim, i) => {
		if (i === activeClaim) {
			claim.forEach((subclaim) => {
				colors.push(subclaim.color)
			})
		} else {
			for (let j = 0; j < nbSubPerClaim[i]; j++) {
				colors.push('#00000000')
			}
		}
	})
	return {
		data: nbTweetPerSubClaim,
		backgroundColor: colors,
		borderColor: ['rgba(255, 26, 104, 0)'],
	}
}

const displayData = () => {
	console.log(dataClimateFlat[activeSubClaim])
}

// config
const config = {
	type: 'doughnut',
	data: baseData(),
	options: {
		animation: {
			animateRotate: false,
			animateScale: true,
		},
		onClick: graphClickEvent,
		plugins: {
			tooltip: {
				enabled: false, // <-- this option disables tooltips
			},
		},
	},
}

// render init block
const myChart = new Chart(canvas, config)

function graphClickEvent(event, array) {
	if (array[0]) {
		if (array[0].datasetIndex === 1) {
			if (activeClaim !== array[0].index) {
				activeClaim = array[0].index
				myChart.data.datasets[0] = subclaimData()
				myChart.update()
			}
		} else {
			activeSubClaim = array[0].index
			displayData()
		}
	} else {
		console.error('no graph detected')
	}
}
