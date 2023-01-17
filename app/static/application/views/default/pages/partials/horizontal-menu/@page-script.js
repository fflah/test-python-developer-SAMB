jQuery(function($) {

  //change menu texts to make them shorter
   var sidebarNames = ['Home', 'Mega', 'Elements', 'Tables', 'Forms', 'Cards', 'Calendar', 'Gallery', 'More'];
   $('#sidebar .nav > .nav-item > .nav-link > .nav-text > span:first-child').each(function(index) {
      $(this).text(sidebarNames[index])
   })
   $('#sidebar .badge-primary').remove();

   //add big buttons to the "mega" menu
   $('#sidebar .nav > .nav-item.active > .submenu > .submenu-inner').prepend(
'<li class="nav-item">\
   <div class="d-flex flex-wrap justify-content-center flex-xl-nowrap p-2 bgc-default-l4">\
    <button type="button" class="btn btn-sm btn-app btn-outline-primary btn-bgc-white radius-1 my-1 mx-1">\
			<i class="d-block h-6 fa fa-edit text-190"></i>\
			Edit\
			<span class="badge badge-warning badge-sm position-tl m-n2 text-70">11</span>\
    </button>\
    <button type="button" class="btn btn-sm btn-app btn-outline-secondary btn-bgc-white radius-1 my-1 mx-1">\
			<i class="d-block h-6 fa fa-cog text-190"></i>\
			Settings\
			<span class="badge badge-sm py-2px position-tr text-75 mt-1px text-dark-tp4">+3</span>\
		</button>\
		<button type="button" class="btn btn-sm btn-app btn-outline-success btn-bgc-white radius-1 my-1 mx-1">\
			<i class="d-block h-6 fa fa-sync text-190"></i>\
			Reload\
		</button>\
	</div>\
</li>');

   // in demo we have added .invisible class to .sidebar-inner
   // because we are dynamically chaning it, like the above changes
   // and now we remove .invisible
   $('#sidebar .sidebar-inner').removeClass('invisible');

   // when collapsing it, remove nav-fill
   $('#sidebar').on('collapse.ace.sidebar', function() {
    $(this).find('.nav').removeClass('nav-fill text-center');
    $('#id-full-width').prop('checked', false)
   })
   $('#sidebar').on('expand.ace.sidebar', function() {
    $(this).find('.nav').addClass('nav-fill text-center');
    $('#id-full-width').prop('checked', true)
   })


   // make navbar not fixed, sidebar fixed (sticky)
   $('#id-navbar-fixed').prop('checked', false)
   $('.navbar').toggleClass('navbar-fixed', false)


   /**
   $('#id-full-height').on('change', function() {
      $('.sidebar .container').toggleClass('align-items-xl-end');
      $('.sidebar .nav').toggleClass('nav-link-rounded');
   });
   */

   $('#id-full-width').on('change', function() {
      $('.sidebar .nav').toggleClass('nav-fill text-center');
   });

   $('#id-flip-highlight').on('change', function() {
      $('.sidebar .nav').toggleClass('active-on-right');
   });

   $('#id-sm-highlight').on('change', function() {
      $('.sidebar .nav').toggleClass('nav-active-sm');
   });




   /////////////

   var _animate = !AceApp.Util.isReducedMotion();//make sure no animation is displayed according to user preferences

   var quickStatsCanvas = document.getElementById("quickstats-chart");
   if(window.innerWidth < 500) quickStatsCanvas.height = 200;
   var ctx1 = quickStatsCanvas.getContext('2d');
   var gradient1 = ctx1.createLinearGradient(0, 0, 0, quickStatsCanvas.clientHeight * 2);
   gradient1.addColorStop(0, 'rgba(23, 167, 178, 0.2)');   
   gradient1.addColorStop(1, 'rgba(23, 167, 178, 0.0)');

   var gradient2 = ctx1.createLinearGradient(0, 0, 0, quickStatsCanvas.clientHeight * 1.5);
   gradient2.addColorStop(0, 'rgba(22, 176, 255, 0.2)');   
   gradient2.addColorStop(1, 'rgba(22, 176, 255, 0.0)');


   new Chart(ctx1, {
    type: 'line',
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{
        type: 'line',
        label: 'Offline',
        
        data: [8000, 6000, 4000, 4500, 3000, 9000, 11000],

        borderColor: 'rgba(23, 167, 178, 0.67)',
        borderWidth: 1.25,

        fill: false,
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
        label: 'Online',
        
        data: [4500, 9000, 5000, 7000, 6000, 11000, 7500],
        

        borderColor: 'rgba(22, 176, 255, 0.67)',
        borderWidth: 1.25,

        fill: false,
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
                fontColor: "#95909e",
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
              tickMarkLength: 16,
              color: '#dbe1e5'
            },
            ticks: {
              fontFamily: "Open Sans",
              fontColor: "#95909e",
              fontSize: "13",
              padding: 0,
              scaleBeginAtZero : true
            }
          },
        ]
      },

      legend: {
        display: true,
        position: 'top',
        labels: {
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




  //the task progress circles
  $('canvas.task-progress').each(function() {
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
             borderWidth: 2
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




/// FullCalendar
    if (!window.Intl) {
      console.log("Calendar can't be displayed because your browser doesn's support `Intl`. You may use a polyfill!");
      return;
    }

    var Calendar = FullCalendar.Calendar;

    var CustomTheme = FullCalendar.Theme;
    CustomTheme.prototype.classes = {
        widget: 'fc-bootstrap',
        tableGrid: 'table table-bordered brc-secondary-l1 text-dark-tp3 m-0',
        tableList: 'table text-dark-tp4',
        tableListHeading: 'table-active',
        buttonGroup: 'btn-group',
        button: 'btn btn-white btn-h-outline-blue btn-a-blue',
        buttonActive: 'active',
        today: 'bgc-warning-l3',
        popover: 'card card-primary',
        popoverHeader: 'card-header',
        popoverContent: 'card-body',
        // day grid
        // for left/right border color when border is inset from edges (all-day in timeGrid view)
        // avoid `table` class b/c don't want margins/padding/structure. only border color.
        headerRow: 'bgc-white py-1',
        dayRow: 'table-bordered',
        // list view
        listView: 'card card-primary'
    };
    CustomTheme.prototype.baseIconClass = 'fa';
    CustomTheme.prototype.iconClasses = {
        close: 'fa-times',
        prev: 'fa-chevron-left',
        next: 'fa-chevron-right',
        prevYear: 'fa-angle-double-left',
        nextYear: 'fa-angle-double-right'
    };
    CustomTheme.prototype.iconOverrideOption = 'FontAwesome';
    CustomTheme.prototype.iconOverrideCustomButtonOption = 'FontAwesome';
    CustomTheme.prototype.iconOverridePrefix = 'fa-';
    var CustomThemePlugin = FullCalendar.createPlugin({
        themeClasses: {
          customTheme: CustomTheme
        }
    });

  

    //for some random events to be added
    var date = new Date();
    var m = date.getMonth();
    var y = date.getFullYear();

    var day1 = Math.random() * 20 + 2;
    var day2 = Math.random() * 25 + 1;
    var day3 = Math.random() * 15 + 1;

  // initialize the calendar
  var calendar = new Calendar(document.getElementById('calendar'), {
    plugins: [ 'dayGrid', 'timeGrid' ],
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },

    events: [
		  {
        title: 'Some Event',
        description: 'Event 1 description',
        start: new Date(y, m, 1, Math.random() * 23 + 1),
        className: 'brc-red-m1 border-l-3 radius-0 text-dark-tp2 bgc-red-l3 text-95 px-2 py-1'
		  },
		  {
        title: 'Long Event',
        description: 'Event 2 description',
        start: new Date(y, m, day1, Math.random() * 23 + 1),
        end: new Date(y, m, day1 + 4, Math.random() * 23 + 1),
        className: 'brc-green-m1 border-l-3 radius-0 text-dark-tp2 bgc-green-l3 text-95 px-2 py-1'
		  },
		  {
        title: 'Other Event',
        description: 'Event 3 description',
        start: new Date(y, m, day2, Math.random() * 23 + 1),
        allDay: false,
        className: 'brc-blue-m1 border-l-3 radius-0 text-dark-tp2 bgc-blue-l3 text-95 px-2 py-1'
      },
      {
        title: 'More Events',
        description: 'Event 4 description',
        start: new Date(y, m, day3, Math.random() * 10 + 1),
        end: new Date(y, m, day3 + 1, Math.random() * 10 + 1),
        className: 'brc-purple-m1 border-l-3 radius-0 text-dark-tp2 bgc-purple-l3 text-95 px-2 py-1'
		  },
    ],
    
    eventRender: function(info) {
      $(info.el).find('.fc-title').append("<span class='d-block mt-1 text-95 text-dark-tp3'>" + info.event.extendedProps.description + "</span>"); 
      $(info.el).popover({
        title: info.event.title,
        content: info.event.extendedProps.description,
        placement: 'top',
        trigger: 'hover',
        container: 'body'
      });

    }
   
  
  });

  

  calendar.pluginSystem.add(CustomThemePlugin);
  calendar.setOption('themeSystem', 'customTheme');

  calendar.render();



});