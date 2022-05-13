import { dataClimate } from './data/json_final.js'

var canvas = document.getElementById('myChart')
let activeClaim = -1
let activeSubClaim = -1

let claimTitle = ['Global warmings is not happening', 'Humans greenhouse gazes are not causing global warming', 'Climate impact are not bad', "Climate solutions won't work", "Climate movement/science is unreliable"]

const _titleSubClaim= document.querySelector('.title-subclaim')
const _nbTweetSubClaim = document.querySelector('.desc-subclaim')
const _userList = document.querySelector('.list-user')
const _wordList = document.querySelector('.list-word')
const _informationsDiv=document.querySelector('.informations');

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
				'#30CB26FF',
				'#E6BF00ff',
				'#8461FFff',
				'#00C0B7ff',
				'#D56800ff',
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
	_informationsDiv.style.display = "flex"
	console.log(dataClimateFlat[activeSubClaim])
	const data = dataClimateFlat[activeSubClaim]
	_titleSubClaim.innerHTML = `&#8220;${data.quote}&#8221;`
	_nbTweetSubClaim.innerHTML = `${data.nbtweets} tweets`
	_userList.innerHTML = ""
	_wordList.innerHTML = ""
	data.top5authors.forEach(author=>_userList.innerHTML += `<li>${author.name} (${author.nbtweets} tweet${author.nbtweets != 1 ? "s": ""})</li>`)
	data.top5words.forEach(word=>_wordList.innerHTML += `<li>${word.word} (${word.use} use${word.use != 1 ? "s": ""})</li>`)

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
		onHover: graphClickEvent,
		onClick: subClaimClickEvent,
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
		} 
	} else {
		// console.error('no graph detected')
	}
}

function subClaimClickEvent(event, array){
	if (array[0]) {
		console.log(array[0])
		if (array[0].datasetIndex === 0) {
			if (activeSubClaim !== array[0].index) {
				activeSubClaim = array[0].index
				displayData()
			}
		} 
	}
}

Chart.pluginService.register({
	beforeDraw: function(chart) {
	  var width = chart.chart.width,
		  height = chart.chart.height,
		  ctx = chart.chart.ctx;
	  ctx.restore();
	  var fontSize = (height / 114).toFixed(2);
	  ctx.font = fontSize + "em sans-serif";
	  ctx.textBaseline = "middle";
	  var text = "75%",
		  textX = Math.round((width - ctx.measureText(text).width) / 2),
		  textY = height / 2;
	  ctx.fillText(text, textX, textY);
	  ctx.save();
	}
  });
