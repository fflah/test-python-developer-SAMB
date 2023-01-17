jQuery(function($) {
  window.isAceLayout3 = true;//only used in demo settings in .assets/js/demo.js

  $('.sidebar .fa-exclamation-triangle').removeClass('text-danger-m2').addClass('text-danger-l2');
  $('.sidebar .badge-primary').addClass('border-1 brc-white-tp2');

  if (!('ontouchstart' in window)) $('[data-toggle="tooltip"]').tooltip({container: 'body'});//show tooltips


  //draw charts
  var _animate = !AceApp.Util.isReducedMotion();//make sure no animation is displayed according to user preferences
  

  //the traffic sources pie chart
  var config = {
      type: 'doughnut',
      data: {
          datasets: [{
              label: 'Traffic Sources',
              data: [38.7, 24.5, 8.2, 18.6, 10],
              backgroundColor: [
                  "#6dbb6d",
                  "#4697ca",
                  "#a072b9",
                  "#fee074",
                  "#e5e5e5"
              ],
          }],
          labels: [
              'Social Networks',
              'Search Engines',
              'Ad Campaigns',
              'Direct Traffic',
              'Other'
          ]
      },
      
      options: {
          responsive: true,

          cutoutPercentage: 60,
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
                  var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || 'Other';
                  var label = data.labels[tooltipItem.index];
                  return ' ' + label + ": " + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                }
              }
          }
      }
  };


  var config2 = {
    type: 'doughnut',
    data: {
        datasets: [{
            label: 'User Devices',
            data: [45, 18, 37],
            backgroundColor: [
                "#f0b552",
                "#17a7b2",
                "#5fb1e6"
            ],
        }],
        labels: [
            'Desktop',
            'Tablet',
            'Mobile'
        ]
    },
    
    options: {
        responsive: true,

        cutoutPercentage: 60,
        legend: {
            display: true,
            position: 'left',
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
                var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || 'Other';
                var label = data.labels[tooltipItem.index];
                return ' ' + label + ": " + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              }
            }
        }
    }
};


var windowSize = $(window).width();
var hideLegends = windowSize >= 992 && windowSize < 1400;//when window size is between 1200 and 1400, hide legends for so that piecharts have enough space

if( hideLegends ) {
  config.options.legend.display = false;
  config2.options.legend.display = false;
}

var trafficPieChart = new Chart(document.getElementById('piechart'), config);
var devicePieChart = new Chart(document.getElementById('piechart2'), config2);

if( hideLegends ) {
  $(document.getElementById('piechart')).after("<div class='piechart-legends mt-1'>"+trafficPieChart.generateLegend()+"</div>")
  $(document.getElementById('piechart2')).after("<div class='piechart-legends mt-1'>"+devicePieChart.generateLegend()+"</div>")
}

  
  //////////////
 


var mix = document.getElementById("saleschart").getContext('2d');
var mixChart = new Chart(mix, {
  type: 'bar',
  data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [     
        {
          label: "Revenues",
          data: [4500, 4200, 5000, 3900, 6500, 6800, 6600, 5900, 7000, 8900, 9800, 9100],
          borderColor: 'rgba(0, 0, 0, 0.3)',
          borderWidth: 1,
          backgroundColor: '#54c696',//'#6dbb6d',
          hoverBackgroundColor: '#3eb985',
          
          barPercentage: 0.75,
          categoryPercentage: 0.75
        },
        {
          label: "Expenses",
          data: [ 2000, 1900, 2200, 2100, 1500, 2050, 1220, 2850, 1650, 2500, 2350, 2400],
          borderColor: 'rgba(0, 0, 0, 0.25)',
          borderWidth: 1,
          backgroundColor: 'rgba(240, 181, 82, 0.67)',//'#ebecee',
          hoverBackgroundColor: 'rgba(240, 181, 82, 0.47)',

          barPercentage: 0.65,
          categoryPercentage: 0.65
        },
        
      ]
  },
  options: {
    legend: {
        display: true
    },
    animation: {
       duration: _animate ? 1000 : false
    },
    scales: {
      yAxes: [{
        ticks: {
          fontFamily: "Open Sans",
          fontColor: "#a0a4a9",
          fontStyle: "600",
          fontSize: "12",
          beginAtZero: false,
          maxTicksLimit: 8,
          padding: 16,
          callback: function(value, index, values) {
            var val = parseInt(value / 1000);
            return val > 0 ? val + 'k' : val;
          }
        },
        gridLines: {
          zeroLineColor: "transparent",
            drawTicks: false,
            display: false
        }
      }],
      xAxes: [{
        gridLines: {
            zeroLineColor: "transparent",
            display: true,
            borderDash: [2, 3],
            tickMarkLength: 3
        },
        ticks: {          
          fontFamily: "Open Sans",
          fontColor: "#808489",
          fontSize: "13",
          fontStyle: "400",
          padding: 12
        }
      }]
    },

    tooltips: {
      enabled: true,
      callbacks: {
        label: function(tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';

            if (label) {
                label += ': ';
            }
            label += "$"+ parseFloat(tooltipItem.yLabel / 1000) + 'k';
            return label;
        }
      }
    }

  }
});




var pageViewCanvas = document.getElementById("pageviewschart");
var ctx1 = pageViewCanvas.getContext('2d');
var gradient1 = ctx1.createLinearGradient(0, 0, 0, pageViewCanvas.clientHeight);
gradient1.addColorStop(0, 'rgba(23, 167, 178, 0.47)');   
gradient1.addColorStop(1, 'rgba(23, 167, 178, 0.2)');

var gradient2 = ctx1.createLinearGradient(0, 0, 0, pageViewCanvas.clientHeight);
gradient2.addColorStop(0, 'rgba(22, 176, 255, 0.47)');   
gradient2.addColorStop(1, 'rgba(22, 176, 255, 0.2)');


new Chart(ctx1, {
    type: 'line',
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
        type: 'line',
        label: 'Desktop',
        
        data: [26000, 32000, 22000, 34000, 24000, 20000, 28000, 40000, 28000, 34000, 25000, 40000],

        lineTension: 0,
        borderColor: 'rgba(23, 167, 178, 0.67)',
        borderWidth: 1,

        fill: true,
        backgroundColor : gradient1,

        pointRadius: 10,
        pointBorderWidth: 10,
        pointBackgroundColor: 'transparent',
        pointHoverBackgroundColor: 'rgba(0, 0, 0, 0.27)',
        pointBorderColor: 'transparent',

        lineTension: 0.3
      },
      {
        type: 'line',
        label: 'Mobile',
        
        data: [12000, 28000, 40000, 30000, 20000, 15000, 15000, 22000, 15000, 16000, 20000, 30500],
        

        lineTension: 0,
        borderColor: 'rgba(22, 176, 255, 0.67)',
        borderWidth: 1,

        fill: true,
        backgroundColor : gradient2,

        pointRadius: 10,
        pointBorderWidth: 10,
        pointBackgroundColor: 'transparent',
        pointHoverBackgroundColor: 'rgba(0, 0, 0, 0.27)',
        pointBorderColor: 'transparent',

        lineTension: 0.3
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
        callbacks: {
          label: function(tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';

            if (label) {
                label += ': ';
            }
            label += parseFloat(tooltipItem.yLabel / 1000) + 'k';
            return  " " + label;
          },
        }
      },

      scales: {
        yAxes: [
            {
              ticks: {
                fontFamily: "Open Sans",
                fontColor: "#85808e",
                fontStyle: "normal",
                fontSize: "13",
                beginAtZero: false,
                maxTicksLimit: 6,
                padding: 12,
                callback: function(value, index, values) {
                  var val = parseInt(value / 1000);
                  return val > 0 ? val + 'k' : val;
                }
              },
              gridLines: {
                display: false,
                drawBorder: false,
                
                borderDash: [2, 4],
                color: '#cbd1d5'
              }
            }
        ],
  
        xAxes: [
          {          
            gridLines: {
              display: false,
              borderDash: [2, 2],
              tickMarkLength: 8,
              color: '#dbe1e5'
            },
            ticks: {
              fontFamily: "Open Sans",
              fontColor: "#85808e",
              fontSize: "13",
              padding: 0
            }
          },
        ]
      },

      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          generateLabels: function(chart) {
            labels = Chart.defaults.global.legend.labels.generateLabels(chart);
            labels[0].fillStyle = '#75cad0';
            labels[1].fillStyle = '#5dc7fe';
            return labels;
          }
        }
      },
    }
  });



////////

//Sortable task list
 $('#tasks-1, #tasks-2, #tasks-3').each(function() {
  Sortable.create(this, {
    group: "taks",

    draggable: "> .task-item",
    animation: 200,

    ghostClass: "bgc-yellow-l1",  // Class name for the drop placeholder
    chosenClass: "",  // Class name for the chosen item
    dragClass: "",  // Class name for the dragging item
  });
});


});