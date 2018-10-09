<?php
session_start(); 
?>
<!DOCTYPE html>
<html>
    <head>
        <title>
            Estadistica
        </title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/estilo.css">
        <link rel="stylesheet" href="css/estadistica.css">
        <link rel="stylesheet" href="css/loader.css">
        <script src="js/jquery.js" type="text/javascript"></script>
        <script src="js/funciones.js" type="text/javascript"></script>
        <script src="js/estadistica.js" type="text/javascript"></script>
        <script src="js/chart.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="cabecera" id="cabecera">
            
        </div>
        <div id="menu" class="menu">
           
        </div>
        <div class="contenedor_central">
            Fecha de hoy
            <div class="central" id="central">
                <div class="totales" id="totales">
                    <canvas id="arco" style="transform: rotate(50deg)">Su navegador no soporta canvas :( </canvas>
                    agregar grafico total servicios del dia de dona
                    total servicos del dia: 15
                    tipos de servicos (titulo)
                        recogida: 12
                        reparto:  1
                        servicio especial: 3   
                         colores grsfico numeros en amrillo y color grafico naranjo
                </div>
                <div class="conductores" id="conductores">
                    agregar grafico conductores de barra
                    total servicos del dia: 15
                    tipos de servicos (titulo)
                        recogida: 12
                        reparto:  1
                        servicio especial: 3   
                        
                      
                </div>
                <div id="container">
                        <canvas id="chart" height="150" width="100"></canvas>
                    </div>
                <div style="width: 400px;height: 400px">
                                        <canvas id="myChart" width="200" height="200"></canvas>                    
                </div>
                <canvas id="pie-chart" width="800" height="450"></canvas>

            </div>    
        </div>   
        <script>
            const red_min_hex = '45';
const red_min_dec = parseInt(red_min_hex, 16);
const red_max_hex = 'cc';
const red_max_dec = parseInt(red_max_hex, 16);
const green_min_hex = '35';
const green_min_dec = parseInt(green_min_hex, 16);
const green_max_hex = 'ac';
const green_max_dec = parseInt(green_max_hex, 16);
const blue_min_hex = '20';
const blue_min_dec = parseInt(blue_min_hex, 16);
const blue_max_hex = '78';
const blue_max_dec = parseInt(blue_max_hex, 16);

const pi = Math.PI;

const animateArc = chart => {
  let arc = chart.getDatasetMeta(0).data[0];
  let angle = arc._view.endAngle + pi / 2;
  let angle_inverse = 2 * pi - angle;
  let blue = Math.round(
    (angle / (2 * pi)) * blue_max_dec + (angle_inverse / (2 * pi)) * blue_min_dec
  ).toString(16);
  if (arc._view.endAngle < pi / 2) {
    let green = Math.round(
      (angle / pi) * green_max_dec + ((pi - angle) / pi) * green_min_dec
    ).toString(16);
    if (green.length < 2) green = '0' + green;
    let color = `#${red_max_hex}${green}${blue}`;
    arc.round.backgroundColor = color;
    drawArc(chart, arc, color);
  } else {
    let red = Math.round(
      ((2 * pi - angle) / pi) * red_max_dec + ((angle - pi) / pi) * red_min_dec
    ).toString(16);
    if (red.length < 2) red = '0' + red;
    if (red === '45') red = 50;
    if (blue === '78') blue = 74;
    let color = `#${red}${green_max_hex}${blue}`;
    arc.round.backgroundColor = color;
    drawArc(chart, arc, color);
  }
}

const drawArc = (chartm, arc, color) => {
  let x = (chart.chartArea.left + chart.chartArea.right) / 2;
	let y = (chart.chartArea.top + chart.chartArea.bottom) / 2;
	chart.ctx.fillStyle = color;
	chart.ctx.strokeStyle = color;
	chart.ctx.beginPath();
	if (arc != null) {
		chart.ctx.arc(x, y, chart.outerRadius, arc._view.startAngle, arc._view.endAngle);
		chart.ctx.arc(x, y, chart.innerRadius, arc._view.endAngle, arc._view.startAngle, true);
	} else {
		chart.ctx.arc(x, y, chart.outerRadius, 0, 2 * pi);
		chart.ctx.arc(x, y, chart.innerRadius, 0, 2 * pi, true);
	}
	chart.ctx.fill();
}

const addCenterTextAfterUpdate = chart => {
  if (
		chart.config.options.elements.center &&
		chart.config.options.elements.centerSub &&
		chart.ctx
	) {
		const centerConfig = chart.config.options.elements.center;
		const centerConfigSub = chart.config.options.elements.centerSub;
		const globalConfig = Chart.defaults.global;
		let fontStyle = centerConfig.fontStyle;
		let fontFamily = Chart.helpers.getValueOrDefault(centerConfig.fontFamily, 'Roboto');
		let fontSize = Chart.helpers.getValueOrDefault(centerConfig.minFontSize, 20);
		let maxFontSize = Chart.helpers.getValueOrDefault(centerConfig.maxFontSize, 90);
		let maxText = Chart.helpers.getValueOrDefault(centerConfig.maxText, centerConfig.text);
		do {
			chart.ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
			let textWidth = chart.ctx.measureText(maxText).width;
			if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize) fontSize += 1;
			else {
				fontSize -= 1;
				break;
			}
		} while (true);
		chart.center = {
			font: Chart.helpers.fontString(fontSize, fontStyle, fontFamily),
			fillStyle: Chart.helpers.getValueOrDefault(
				centerConfig.fontColor,
				globalConfig.defaultFontColor
			),
		};
		fontSize = Chart.helpers.getValueOrDefault(centerConfigSub.minFontSize, 10);
		maxFontSize = Chart.helpers.getValueOrDefault(centerConfigSub.maxFontSize, 25);
		maxText = centerConfigSub.text;
		do {
			chart.ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
			let textWidth = chart.ctx.measureText(maxText).width;
			if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize) fontSize += 1;
			else {
				fontSize -= 1;
				break;
			}
		} while (true);
		chart.centerSub = {
			font: Chart.helpers.fontString(fontSize, fontStyle, fontFamily),
			fillStyle: Chart.helpers.getValueOrDefault(
				centerConfigSub.fontColor,
				globalConfig.defaultFontColor
			),
		};
	}
}

const roundCornersAfterUpdate = chart => {
	if (chart.config.options.elements.arc.roundCorners !== undefined) {
		let arc = chart.getDatasetMeta(0).data[chart.config.options.elements.arc.roundCorners];
		arc.round = {
			x: (chart.chartArea.left + chart.chartArea.right) / 2,
			y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
			radius: (chart.outerRadius + chart.innerRadius) / 2,
			thickness: (chart.outerRadius - chart.innerRadius) / 2,
			backgroundColor: arc._model.backgroundColor,
		};
	}
};

const addCenterTextAfterDraw = chart => {
	if (chart.center && chart.centerSub) {
		chart.ctx.textAlign = 'center';
		chart.ctx.textBaseline = 'middle';
		const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
		const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
		const lowerY = (chart.chartArea.top + chart.chartArea.bottom) / 2 + 65;
		const centerConfig = chart.config.options.elements.center;
		chart.ctx.font = chart.center.font;
		chart.ctx.fillStyle = chart.center.fillStyle;
		chart.ctx.fillText(centerConfig.text, centerX, centerY);
		const centerSubConfig = chart.config.options.elements.centerSub;
		chart.ctx.font = chart.centerSub.font;
		chart.ctx.fillStyle = chart.centerSub.fillStyle;
		chart.ctx.fillText(centerSubConfig.text, centerX, lowerY);
	}
};

const roundCornersAfterDraw = chart => {
	if (chart.config.options.elements.arc.roundCorners !== undefined) {
		var arc = chart.getDatasetMeta(0).data[chart.config.options.elements.arc.roundCorners];
		var startAngle = pi / 2 - arc._view.startAngle;
		var endAngle = pi / 2 - arc._view.endAngle;
		chart.ctx.save();
		chart.ctx.translate(arc.round.x, arc.round.y);
    chart.ctx.fillStyle = arc.round.backgroundColor;
		chart.ctx.beginPath();
		chart.ctx.arc(
			arc.round.radius * Math.sin(startAngle),
			arc.round.radius * Math.cos(startAngle),
			arc.round.thickness,
			0,
			2 * pi
		);
		chart.ctx.arc(
			arc.round.radius * Math.sin(endAngle),
			arc.round.radius * Math.cos(endAngle),
			arc.round.thickness,
			0,
			2 * pi
		);
		chart.ctx.fill();
		chart.ctx.restore();
	}
};

var datasets = [{
  "data": [15, 85],
  "backgroundColor": [ "#e0e0e0", "#e0e0e0" ]
}];
var chartData = {
  type: 'doughnut',
  data: { datasets: datasets },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 90,
    segmentShowStroke: false,
    events: [],
    elements: {
      arc: {
        roundCorners: 0,
        borderWidth: 0
      },
      center: {
        maxText: "100%",
        text: `${datasets[0].data[0]}`,
        fontColor: "#646464",
        fontFamily: "Roboto",
        fontStyle: "normal",
        minFontSize: 20,
        maxFontSize: 90
      },
      centerSub: {
        text: `${datasets[0].data[1]} is the remainder.`,
        fontColor: "#a6a6a6",
        minFontSize: 10,
        maxFontSize: 25
      }
    },
    animation: {
      onProgress: animation => {
        animation.easing = 'linear';
        animateArc(animation.chart)
      }
    }
  }
}

var ctx = document.getElementById('chart').getContext('2d');
var chart = new Chart(ctx, {
  ...chartData,
  plugins: [{
    beforeDraw: chart => {
      drawArc(chart, null, '#e0e0e0');
    },
    afterUpdate: chart => {
      addCenterTextAfterUpdate(chart);
      roundCornersAfterUpdate(chart);
     },
    afterDraw: chart => {
      addCenterTextAfterDraw(chart);
      roundCornersAfterDraw(chart);
    },
    resize: () => new Chart(ctx, {
      ...chartData,
      plugins: [{
        beforeDraw: chart => {
          drawArc(chart, null, '#e0e0e0');
        },
        afterUpdate: chart => {
          addCenterTextAfterUpdate(chart);
          roundCornersAfterUpdate(chart);
         },
        afterDraw: chart => {
          addCenterTextAfterDraw(chart);
          roundCornersAfterDraw(chart);
        },
      }]
    })
  }]
});

	var elCanvas = document.getElementById("arco");
		if (elCanvas && elCanvas.getContext) {
		var context = elCanvas.getContext("2d");
			if (context) {
					var X = elCanvas.width/2;
					var Y = 100;
					var r = 50;
					var aPartida = (Math.PI / 180) * 120;
					var aFinal =  (Math.PI / 180) * 320;
					context.strokeStyle = "orange";
					context.lineWidth = 15;
					context.arc(X,Y,r,aPartida,aFinal,false);
					context.stroke();
			}
		}




        var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var config = {
			type: 'line',
			data: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [{
					label: 'My First dataset',
					backgroundColor: 'red',
					borderColor: 'red',
					data: [
						12,
						23,
						50,
						44,
						33,
						11,
						23
					],
					fill: false,
				}, {
					label: 'My Second dataset',
					fill: false,
					backgroundColor: 'blue',
					borderColor: 'blue',
					data: [
						22,
						13,
						10,
						74,
						33,
						31,
						83
					],
				}, {
					label: 'My Second dataset',
					fill: false,
					backgroundColor: 'white',
					borderColor: 'white',
					data: [
						23,
						223,
						13,
						44,
						23,
						41,
						63
					],
				}]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: 'Chart.js Line Chart'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Month'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Value'
						}
					}]
				}
			}
		};

		window.onload = function() {
			var ctx = document.getElementById('canvas').getContext('2d');
			window.myLine = new Chart(ctx, config);
		};

		var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Conductor1", "Conductor2", "Conductor3", "Conductor4", "Conductor5","Conductor6", "Conductor7", "Conductor8", "Conductor9", "Conductor10"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3,5,4,3,2],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
   
        new Chart(document.getElementById("pie-chart"), {
    type: 'pie',
    data: {
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [{
        label: "Population (millions)",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: [2478,5267,734,784,433]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050'
      }
    }
});

        
        </script>
    </body>
</html>