jQuery(function($) {
    if (!window.Intl) {
      console.log("Calendar can't be displayed because your browser doesn's support `Intl`. You may use a polyfill!");
      return;
    }


    var Calendar = FullCalendar.Calendar;
    var Draggable = FullCalendarInteraction.Draggable;


    // initialize the external events
    new Draggable(document.getElementById('external-events'), {
      itemSelector: '.fc-event',
      longPressDelay: 50,
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText,
          classNames: eventEl.getAttribute('data-class').split(' ')
        };
      }
    });

    if('ontouchstart' in window) {
      $('.alert').removeClass('d-none')
    }


    var CustomTheme = FullCalendar.Theme;
    CustomTheme.prototype.classes = {
        widget: 'fc-bootstrap',
        tableGrid: 'table-bordered text-secondary-m1',
        tableList: 'table text-dark-tp4',
        tableListHeading: 'table-active',
        buttonGroup: 'btn-group',
        button: 'btn btn-lighter-grey btn-h-lighter-blue btn-a-blue',
        buttonActive: 'active',
        today: 'bgc-yellow-l1',
        popover: 'card card-primary',
        popoverHeader: 'card-header',
        popoverContent: 'card-body',
        // day grid
        // for left/right border color when border is inset from edges (all-day in timeGrid view)
        // avoid `table` class b/c don't want margins/padding/structure. only border color.
        headerRow: 'table-bordered bgc-primary-l4',
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

  // initialize the calendar
  var calendar = new Calendar(document.getElementById('calendar'), {
    plugins: [  'interaction', 'dayGrid', 'timeGrid' ],
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },

    events: [
		  {
        title: 'Some Event',
        start: new Date(y, m, 1, Math.random() * 23 + 1),
        className: 'bgc-danger text-white text-95'
		  },
		  {
        title: 'Long Event',
        start: new Date(y, m, day1, Math.random() * 23 + 1),
        end: new Date(y, m, day1 + 4, Math.random() * 23 + 1),
        className: 'bgc-success text-white text-95'
		  },
		  {
        title: 'Other Event',
        start: new Date(y, m, day2, Math.random() * 23 + 1),
        allDay: false,
        className: 'bgc-primary text-white text-95'
		  }
    ],
    

    selectable: true,
    selectHelper: true,
    selectLongPressDelay: 200,

		select: function(date) {
      bootbox.prompt("New Event Title:", function(title) {
          if (title !== null) {
            calendar.addEvent({
                title: title,
                start: date.start,
                end: date.end,
                allDay: date.allDay,
                classNames: ['text-95', 'bgc-info', 'text-white']
            });
          }
      });      
    },
    

    editable: true,
    droppable: true,

    drop: function(info) {
      // is the "remove after drop" checkbox checked?
      if ( document.getElementById('drop-remove').checked ) {
        info.draggedEl.parentNode.removeChild(info.draggedEl);
      }
    },


    eventClick: function(info) {

			//display a modal
			var modal = 
			'<div class="modal fade">\
			  <div class="modal-dialog">\
         <div class="modal-content">\
          <div class="modal-header">\
            <h5 class="modal-title">Edit Event</h5>\
            <button type="button" class="close" data-dismiss="modal">&times;</button>\
          </div>\
          <div class="modal-body">\
            <form class="m-0">\
              <div class="input-group">\
                  <div class="input-groupp-repend align-self-center mr-2">\
                    Title\
                  </div>\
                  <input class="form-control" autocomplete="off" type="text" value="' + info.event.title + '" />\
                  <div class="input-group-append">\
                    <button type="submit" class="btn btn-sm btn-success btn-bold"><i class="fa fa-check mr-2px"></i> Save</button>\
                    <button type="button" class="btn btn-sm btn-outline-danger btn-bold ml-2px" data-action="delete"><i class="far fa-trash-alt text-120"></i></button>\
                  </div>\
              </div>\
            </form>\
          </div>\
			  </div>\
			 </div>\
			</div>';
		
		
			var modal = $(modal).appendTo('body');
			modal.find('form').on('submit', function(ev){
        ev.preventDefault();

        info.event.setProp('title' , $(this).find("input[type=text]").val());

				modal.modal("hide");
			});
			modal.find('button[data-action=delete]').on('click', function() {
        info.event.remove();
				modal.modal("hide");
			});
			
			modal.modal('show').on('hidden.bs.modal', function(){
				modal.remove();
			});


    }
  
  });

  

  calendar.pluginSystem.add(CustomThemePlugin);
  calendar.setOption('themeSystem', 'customTheme');

  calendar.render();

});