jQuery(function($) {
  if (!('ontouchstart' in window)) $('[data-toggle="tooltip"]').tooltip({container: 'body'});//show tooltips

	
	//Welcome message
	if (localStorage.getItem('welcome.ace') !== 'displayed') {
		$.aceToaster.add({
			placement: 'tr',
			body: " <div class='position-tl w-100 border-t-3 brc-success-m1'></div>\
					<div class='p-25 d-flex'>\
						<span class='d-inline-block text-center mb-3 py-3 px-1'>\
							<i class='fa fa-leaf fa-2x w-6 text-success-m2 mx-2px'></i>\
						</span>\
						<div>\
						<h3 class='text-125 text-default-d3'>Welcome to Ace <small>(v2.1)</small></h3>\
						A lightweight, feature-rich, customizable and easy to use admin template\
						</div>\
					</div>\
            <button data-dismiss='toast' class='btn btn-sm btn-brc-tp btn-lighter-grey btn-h-lighter-danger btn-a-lighter-danger radius-round position-tr mt-15 mr-1'>\
              <i class='fa fa-times px-1px'></i>\
            </button>\
					</div>",
				
			width: 360,
			delay: 6000,
			//sticky: true,

			close: false,
			belowNav: true,

			className: 'bgc-white-tp1 shadow overflow-hidden border-0 p-0 radius-t-0 radius-b-1',

			bodyClass: 'border-1 border-t-0 brc-success-m4 text-dark-tp3 text-110 p-0 radius-1',
			headerClass: 'd-none',
		});
		localStorage.setItem('welcome.ace', 'displayed');
	}

  //draw charts
  var _animate = !AceApp.Util.isReducedMotion();//make sure no animation is displayed according to user preferences
  

  //the traffic sources pie chart
  var config = {
      type: 'doughnut',
      data: {
          datasets: [{
              label: 'Traffic Sources',
              data: [38.7, 24.5, 10.2, 16.6, 10],
              backgroundColor: [
                "#6dbb6d",
                "#4697ca",
                "#e5758f",
                "#a072b9",
                "#fee074"
              ],
          }],
          labels: [
              'social networks',
              'search engines',
              'ad campaigns',
              'direct traffic',
              'other'
          ]
      },
      
      options: {
          responsive: true,

          cutoutPercentage: 50,
          legend: {
              display: true,
              position: 'right',
              labels: {
                  usePointStyle: true
              }
          },
          animation: {
              animateRotate: true,
              duration: _animate ? 1000 : false
          },
          tooltips: {
              enabled: true,
              cornerRadius: 0,
              bodyFontColor: '#fff',
              bodyFontSize: 14,
              fontStyle: 'bold',
              
              backgroundColor: 'rgba(34, 34, 34, 0.73)',
              borderWidth: 0,
             
              caretSize: 5,

              xPadding: 12,
              yPadding: 12,
              
              callbacks: {
                label: function(tooltipItem, data) {
                  var label = data.labels[tooltipItem.index];
                  return ' ' + label + ": " + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                }
              }
          }
      }
  };

  var trafficPieChart = new Chart(document.getElementById('piechart'), config);


  
  //////////////
  //the sales stats chart
  var canvas = document.getElementById("saleschart");
  canvas.className = 'mw-100';

  var ctx = canvas.getContext("2d");
  
  var gradient1 = ctx.createLinearGradient(0, 0, 0, 200);
      gradient1.addColorStop(0, 'rgba(253, 245, 231, 1)');
      gradient1.addColorStop(1, 'rgba(253, 245, 231, 0.5)');

  var gradient2 = ctx.createLinearGradient(0, 0, 0, 200);
      gradient2.addColorStop(0, 'rgba(95, 196, 144, 0.27)');   
      gradient2.addColorStop(1, 'rgba(95, 196, 144, 0.07)');


  var gradient3 = ctx.createLinearGradient(0, 0, 0, 200);
      gradient3.addColorStop(0, 'rgba(82, 181, 240, 0.27)');
      gradient3.addColorStop(1, 'rgba(82, 181, 240, 0.07)');
      

  var chartOptions1 = {
    lineTension: 0.3,
    borderWidth: 1.25,
    pointRadius: 3.5,
    pointHoverRadius: 5
  };
  new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Instagram",
          data : [3200, 1500, 3500, 2500, 3200, 7000, 2300, 3500, 3500, 6000, 6200, 8100],

          fill: true,
          
          borderColor: '#f0b552',
          backgroundColor : gradient1,

          pointBorderColor: 'transparent',
          pointBackgroundColor: 'transparent', 

          pointHoverBorderColor: '#f0b552',
          pointHoverBackgroundColor: '#fff',

          borderWidth: chartOptions1.borderWidth,
          pointRadius: chartOptions1.pointRadius,
          pointHoverRadius: chartOptions1.pointHoverRadius,

          lineTension: chartOptions1.lineTension,
        },
        {
          label: "Twitter",
          data: [2500, 4200, 3000, 4000, 5500, 4800, 4600, 5900, 5800, 8900, 8200, 9000],

          fill: true,

          borderColor: '#5fc490',
          backgroundColor : gradient2,

          pointBorderColor: 'transparent',
          pointBackgroundColor: 'transparent',
          
          pointHoverBorderColor: '#5fc490',
          pointHoverBackgroundColor: '#fff',
          

          borderWidth: chartOptions1.borderWidth,
          pointRadius: chartOptions1.pointRadius,
          pointHoverRadius: chartOptions1.pointHoverRadius,

          lineTension: chartOptions1.lineTension,
        }
      ]
      },
      options: {
        responsive: true,

        animation: {
          duration: _animate ? 1000 : false
        },

        tooltips: {
          enabled: true,
          cornerRadius: 2,
          
          titleFontColor: '#fff',
          titleFontSize: 16,
          titleFontStyle: 'normal',

          bodyFontColor: '#fff',
          bodyFontSize: 14,
          fontFamily: 'Open Sans',
          
          backgroundColor: '#587d97',
          borderWidth: 1,
          borderColor: '#395b6c',
         
          caretSize: 5,

          xPadding: 12,
          yPadding: 12,

          callbacks: {
            label: function(tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || '';
  
              if (label) {
                  label += ': ';
              }
              label += parseFloat(tooltipItem.yLabel / 1000) + 'k';
              return  " " + label;
            },
            labelColor: function(tooltipItem) {
              var backgroundColors = [
                '#f7d9a7',
                '#a7d7bd'
              ]
              var borderColors = [
                '#f0b552',
                '#5fc490'
              ]
              return {
                  borderColor: borderColors[tooltipItem.datasetIndex],
                  backgroundColor: backgroundColors[tooltipItem.datasetIndex]
              }
            }
          }
        },

        scales: {
          yAxes: [{
            ticks: {
              fontFamily: "Open Sans",
              fontColor: "#85808e",
              fontStyle: "normal",
              fontSize: "13",
              beginAtZero: false,
              maxTicksLimit: 6,
              padding: 12,
              callback: function(value) {
                var val = parseInt(value / 1000);
                return val > 0 ? val + 'k' : '';
              }
            },
            gridLines: {
              zeroLineColor: "#eaeaea",
              color: "#eaeaea",
              lineWidth: 1,
              //offsetGridLines: true,
              drawTicks: false,
              display: false
            }
          }],
          xAxes: [{
            gridLines: {
              zeroLineColor: "#eaeaea",
              color: "#eaeaea",
              lineWidth: 1,
              drawTicks: false,
              
              //offsetGridLines: true,
              //display: false
            },

            ticks: {
              fontFamily: "Open Sans",
              fontColor: "#85808e",
              fontSize: "13",
              padding: 12
            }
          }]
        },

        legend: {
          display: true,
          position: 'top',
          labels: {
            usePointStyle: true,
            generateLabels: function(chart) {
              labels = Chart.defaults.global.legend.labels.generateLabels(chart);
              labels[0].fillStyle = '#f0b552';
              labels[1].fillStyle = '#5fc490';
              return labels;
            }
          }
        }
      }
    });




    ///////////
    //the pageview bar charts in infoboxes

    $('canvas.info-chart').each(function() {

      var ctx = this.getContext('2d');
      var gradientbg = ctx.createLinearGradient(0, 0, 0, 50);
      gradientbg.addColorStop(0, 'rgba(109, 187, 109, 0.25)');   
      gradientbg.addColorStop(1, 'rgba(109, 187, 109, 0.05)');
  
      new Chart(ctx, {
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                /**
                {
                  type: 'bar',
                  data: $(this).data('values'),
                  backgroundColor: '#94c080',
                  hoverBackgroundColor: '#94c080',

                  borderColor: '#94c080',

                  borderWidth: 0,
                  
                  barThickness: 9
                },

                {
                  type: 'bar',
                  data: [850, 550, 600, 700, 750, 800, 700, 900, 800, 900, 1100, 900],
                  backgroundColor: '#eaedf3',
                  hoverBackgroundColor: '#eaedf3',

                  borderColor: '#eaedf3',

                  borderWidth: 0,
                  
                  barThickness: 9
                },
                */
                
                {
                  type: 'line',
                  data: $(this).data('values'),
                  backgroundColor: gradientbg,
                  hoverBackgroundColor: '#70bcd9',
                  fill: true,

                  borderColor: 'rgba(109, 187, 109, 0.6)',

                  borderWidth: 2.5,
                  pointRadius: 7,
                  lineTension: 0.4,

                  pointBackgroundColor: 'transparent',
                  pointBorderColor: 'transparent'
                },

                
            ]
        },

        options: {

          responsive: false,
          animation: {
            duration: _animate ? 1000 : false
          },
          
          legend: {
              display: false
          },
          layout: {
            padding: {
                left: 10,
                right: 10,
                top: 0,
                bottom: -10
            }
          },
          scales: {
              yAxes: [
                  {
                    stacked: true,
                    ticks: {
                      display: false,
                      beginAtZero: true,
                    },
                    gridLines: {
                      display: false,
                      drawBorder: false
                    }
                  }
              ],

              xAxes: [
                {
                  stacked: true,
                  gridLines: {
                    display: false,
                    drawBorder: false
                  },
                  ticks: {
                    display: false //this will remove only the label
                  }
                },
              ]
           },//scales

           tooltips: {
              // Disable the on-canvas tooltip, because canvas area is small and tooltips will be cut (clipped)
              enabled: false,

              //use bootstrap tooltip instead
              custom: function(tooltipModel) {
                var title = '';
                var canvas = this._chart.canvas;

                if (tooltipModel.body) {
                  title = tooltipModel.title[0] + ': ' + Number(tooltipModel.body[0].lines[0]).toLocaleString();
                }
                canvas.setAttribute('data-original-title', title);//will be used by bootstrap tooltip

                $(canvas)
                .tooltip({
                  placement: 'bottom',
                  template: '<div class="tooltip" role="tooltip"><div class="brc-info arrow"></div><div class="bgc-info tooltip-inner font-bolder text-110"></div></div>'
                })
                .tooltip('show')
                .on('hidden.bs.tooltip', function() {
                  canvas.setAttribute('data-original-title', '');//so that when mouse is back over canvas's blank area, no tooltip is shown
                });
       
              }
            }//tooltips
           
        }
    });

  });

 //infobox's circular progress bar
  $('canvas.info-pie, canvas.task-progress').each(function() {
    var color = $(this).css('color');

    new Chart(this.getContext('2d'), {
      type: 'doughnut',
      data: {
          datasets: [{
              data: [$(this).data('percent'), 100 - $(this).data('percent')],
              backgroundColor: [
                color,
                  "#e3e5ea"
              ],
              hoverBackgroundColor: [
                color,
                 "#e3e5ea"
              ],
              borderWidth: 0
          }]
      },
      
      options: {
          responsive: false,
          cutoutPercentage: 80,
          legend: {
              display: false
          },
          animation: {
              duration: _animate ? 500 : false,
              easing: 'easeInCubic'
          },
          tooltips: {
              enabled: false,
          }
      }
  });

});




////////

//Sortable task list
Sortable.create(document.getElementById('tasks'), {
  draggable: ".task-item",
  animation: 200,

  ghostClass: "bgc-yellow-l1",  // Class name for the drop placeholder
	chosenClass: "",  // Class name for the chosen item
	dragClass: "",  // Class name for the dragging item
});

//toggle tasks checkbox on/off
$('#tasks input[type=checkbox]').on('change', function() {
  $(this).closest('#tasks > div').toggleClass('bgc-secondary-l3', this.checked).find('label').toggleClass('line-through text-grey-d2 text-grey-m2', this.checked);
});


/**
//style it?
[draggable="true"] {
    border-style: dashed dashed dashed solid !important;
    border-width: 2px 2px 2px 3px !important;

    border-t-color: #c1c7cf !important;
    border-b-color: #c1c7cf !important;
    border-r-color: #c1c7cf !important;
}
*/

});