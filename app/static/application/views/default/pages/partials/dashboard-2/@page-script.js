jQuery(function($) {
  window.isAceLayout2 = true;//only used in demo settings in .assets/js/demo.js

  $('#id-auto-match').prop('checked', false);
    var displayed = parseInt(localStorage.getItem('welcome.ace2') || '0');
    if (displayed < 2) {
      localStorage.setItem('welcome.ace2', displayed + 1)

      if (window.matchMedia('(min-width: 1200px)').matches) {
        $.aceToaster.add({
          placement: 'tc',
          body: " <div class='position-tl w-100 border-t-3 brc-purple-m1'></div>\
              <div class='py-3 pl-2 pr-4 d-flex '>\
                <span class='d-inline-block text-center py-3 px-1'>\
                  <i class='pos-abs fa fa-question fa-2x w-6 text-yellow-m2 mt-1'></i>\
                  <i class='pos-rel fa fa-question fa-2x w-6 text-purple-m1 mr-1'></i>\
                </span>\
                <div>\
                  In this layout, <span class='text-600'>sidebar</span> starts from <span class='bgc-yellow-m3 px-2px'>top</span> of the page and <i>navbar</i> is inside content area.\
                  <hr />\
                  <a href='#' class='text-dark-tp3 bgc-h-blue-l2 border-b-2 brc-blue-m3 px-2px no-underline pb-2px' onclick='jQuery(\"[name=sidebar-theme][value=dark]\").parent().trigger(\"click\"); return false;'>\
                    <i class='far fa-hand-point-right'></i> Change sidebar color\
                  </a> or\
                  <label for='id-navbar-fixed' class='text-dark-tp3 bgc-h-warning-l1 border-b-2 brc-warning-m3 px-2px'>unfix navbar</label> to  see it!\
                </div>\
              </div>\
                <button data-dismiss='toast' class='btn btn-sm btn-brc-tp btn-lighter-grey btn-h-lighter-danger btn-a-lighter-danger radius-round position-tr mt-1 mr-2px'>\
                  <i class='fa fa-times px-1px'></i>\
                </button>\
              </div>",
            
          width: 500,
          delay: 25,
          //sticky: true,

          close: false,

          className: 'bgc-white-tp1 shadow overflow-hidden border-0 p-0 radius-t-0 radius-b-1',

          bodyClass: 'border-1 border-t-0 brc-grey-m4 text-dark-tp3 text-120 p-0 radius-1',
          headerClass: 'd-none'
        })
      }
      else if('ontouchstart' in window) {
        $.aceToaster.add({
          placement: 'tc',
          body: " <div class='position-tl w-100 border-t-3 brc-purple-m1'></div>\
              <div class='py-3 pl-2 pr-4 d-flex '>\
                <span class='d-inline-block text-center py-3 px-1'>\
                  <i class='pos-abs fa fa-question fa-2x w-6 text-yellow-m2 mt-1'></i>\
                  <i class='pos-rel fa fa-question fa-2x w-6 text-purple-m1 mr-1'></i>\
                </span>\
                <div>\
                  This layout is a little different in desktop view.\
                  <hr />\
                  You can <b class='text-600'>swipe</b> sidebar </b> <b class='text-600'>left</b> in mobile view to hide it.<br />\
                  <a href='#' class='text-dark-tp3 bgc-h-blue-l2 border-b-2 brc-blue-m3 px-2px no-underline pb-2px' onclick='jQuery(\"[data-toggle-mobile=sidebar]\").trigger(\"click\"); $.aceToaster.removeAll(); return false;'>\
                    <i class='far fa-hand-point-right'></i> Show sidebar\
                  </a>\
                </div>\
              </div>\
                <button data-dismiss='toast' class='btn btn-sm btn-brc-tp btn-lighter-grey btn-h-lighter-danger btn-a-lighter-danger radius-round position-tr mt-1 mr-2px'>\
                  <i class='fa fa-times px-1px'></i>\
                </button>\
              </div>",
            
          width: 500,
          delay: 25,
          //sticky: true,
          belowNav: true,

          close: false,

          className: 'bgc-white-tp1 shadow overflow-hidden border-0 p-0 radius-t-0 radius-b-1',

          bodyClass: 'border-1 border-t-0 brc-grey-m4 text-dark-tp3 text-120 p-0 radius-1',
          headerClass: 'd-none'
        })
      }
    
	}

  ////////
  //add background color to sidebar icons
  //should be done in your HTML rather than in Javascript ... but this is just demo
  var bgcColors = ['bgc-primary-tp1', 'bgc-warning-tp1', 'bgc-success-tp1', 'bgc-purple-tp1', 'bgc-danger-tp1', 'bgc-info-tp1', 'bgc-pink-tp1', 'bgc-secondary-tp1', 'bgc-brown-tp1'];

  $('.nav > .nav-item > .nav-link > .nav-icon').addClass('nav-icon-round').each(function(a, b) {
    this.classList.add( bgcColors[a] );//.addClass( 'icon-glossy' );
  });

  $('.nav-item-caption').remove();
  /////////

  //show tooltips
  $('.page-tools .btn').tooltip({
    container: 'body',
    template: '<div class="tooltip" role="tooltip"><div class="arrow brc-secondary"></div><div class="tooltip-inner text-600 text-110 pb-2 bgc-secondary-d1"></div></div>',
    trigger: 'hover',
    placement: 'top'
  });

  /////////////

  var _animate = !AceApp.Util.isReducedMotion();

  var pageViewChart = document.getElementById("chart-1").getContext('2d');
  var gradient1 = pageViewChart.createLinearGradient(0, 0, 0, 200);
  gradient1.addColorStop(0, 'rgba(89, 182, 218, 0.27)');   
  gradient1.addColorStop(1, 'rgba(89, 182, 218, 0)');

  new Chart(pageViewChart, {
    type: 'bar',
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
              type: 'line',
              label: '',
              
              data: [107, 122, 136, 112, 139, 120, 134, 128, 108, 122, 119, 125],
              
              spanGaps: true,

              lineTension: 0,
              backgroundColor: 'transparent',
              borderColor: 'rgba(93, 170, 201, 0.67)',
              borderWidth: 2,

              fill: true,
              backgroundColor : gradient1,

              pointRadius: 5,
              pointBorderColor: 'transparent',
              pointBackgroundColor: 'transparent',
              pointBorderWidth: 5,

              pointHoverBackgroundColor: 'rgb(93, 170, 201)',
              pointHoverBorderColor: 'rgb(93, 170, 201)'
            }
        ]
    },
    options: {
      responsive: true,
      animation: {
         duration: _animate ? 1000 : false
      },
      legend: {
          display: false
      },
      scales: {
        yAxes: [
            {
                ticks: {
                    display: false,
                    min: 80, // minimum value
                    max: 200 // maximum value
                },
                gridLines: {
                  display: false,
                  drawBorder: false
                }
            }
        ],

        xAxes: [
          {
            barThickness: 4,
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
                display: false //this will remove only the label
            }
          },
        ]
      },

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
            template: '<div class="tooltip" role="tooltip"><div class="bgc-info tooltip-inner font-bolder text-110"></div></div>'
          })
          .tooltip('show')
          .on('hidden.bs.tooltip', function() {
            canvas.setAttribute('data-original-title', '');//so that when mouse is back over canvas's blank area, no tooltip is shown
          });
 
        }
      }//tooltips
    }
  });


  //pie chart
  var config = {
    type: 'doughnut',
    data: {
        datasets: [{
            label: 'Traffic Sources',
            data: [38.7, 24.5, 8.2, 18.6, 10],
            backgroundColor: [
                "#ea5d6a",
                "#718ff1",
                "#12d18f",
                "#ff7124",
                "#ffc688",
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
            display: false
        },
        animation: {
           // animateScale: true,
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

new Chart(document.getElementById('piechart'), config);


////////


var canvas = document.getElementById("saleschart");
var ctx = canvas.getContext("2d");

/*** Gradient ***/
var gradient1 = ctx.createLinearGradient(0, 0, 0, 300);
    gradient1.addColorStop(0, 'rgba(89, 182, 218, 0.27)');   
    gradient1.addColorStop(1, 'rgba(89, 182, 218, 0)');

var gradient2 = ctx.createLinearGradient(0, 0, 0, 200);
    gradient2.addColorStop(0, 'rgba(112, 187, 112, 0.2)');   
    gradient2.addColorStop(1, 'rgba(112, 187, 112, 0)');

 var gradients = [];
     gradients.push(gradient1, gradient2);



var chartOptions1 = {
  lineTenstion: 0.3,
  borderWidth: 2,
  pointRadius: 2
};
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
        label: "Twitter",
        data : [150, 320, 250, 300, 450, 380, 360, 490, 480, 790, 720, 910],
        
        borderColor: 'rgba(89, 182, 218, 0.53)',
        pointBorderColor: 'rgba(89, 182, 218, 0.67)',

        fill: true,
        backgroundColor : gradients[0],
        pointBackgroundColor: '#FFF',

        borderWidth: chartOptions1.borderWidth,
        pointRadius: chartOptions1.pointRadius,
        lineTension: chartOptions1.lineTension,
      },
      {
        label: "Facebook",
        data: [ 600, 700, 520, 450, 580, 650, 720, 850, 650, 500, 350, 400],

        borderColor: 'rgba(112, 187, 112, 0.53)',
        pointBorderColor: 'rgba(112, 187, 112, 0.67)',          

        fill: true,
        backgroundColor : gradients[1],
        pointBackgroundColor: '#FFF',
        
        borderWidth: chartOptions1.borderWidth,
        pointRadius: chartOptions1.pointRadius,
        lineTension: chartOptions1.lineTension,
      }
    ]
    },
    options: {
      responsive: true,
      animation: {
        duration: _animate ? 1000 : false
     },

      datasetStrokeWidth : 3,
      pointDotStrokeWidth : 4,

      tooltips: {
        enabled: true,
        cornerRadius: 0,
        
        titleFontColor: 'rgba(0, 0, 0, 0.8)',
        titleFontSize: 16,
        titleFontStyle: 'normal',

        bodyFontColor: 'rgba(0, 0, 0, 0.8)',
        bodyFontSize: 14,
        fontFamily: 'Open Sans',
        
        backgroundColor: 'rgba(255, 255, 255, 0.73)',
        borderWidth: 2,
        borderColor: 'rgba(254, 224, 116, 0.73)',
       
        caretSize: 5,

        xPadding: 12,
        yPadding: 12,
     
      },

      scales: {
        yAxes: [{
          ticks: {
            fontFamily: "Open Sans",
            fontColor: "#85808e",
            fontStyle: "bolder",
            fontSize: "13",
            beginAtZero: false,
            maxTicksLimit: 3,
            padding: 16
        },
        gridLines: {
            drawTicks: false,
            display: false
        }
        }],
        xAxes: [{
          gridLines: {
              zeroLineColor: "transparent"
          },
          ticks: {                
            fontFamily: "Open Sans",
            fontColor: "#85808e",
            fontSize: "14",
            padding: 12
          }
        }]
      },
      
      legend: {
        display: true,
        position: 'top'
      }
    }
  });

});