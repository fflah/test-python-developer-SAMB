jQuery(function($) {
    var bodyContainer = document.querySelector('.body-container');
    bodyContainer.style.overflow = 'visible' // for sticky nav to work

    document.querySelector('.page-content').classList.add('px-md-4')// for the following 'mx-md-n4'

    //when nav-tabs becomes stuck
    var stickyNav = document.querySelector('.sticky-nav');
    stickyNav.addEventListener('sticky-change', function(e) {
        this.classList.toggle('is-stuck', e.detail.isSticky)
        
        var insideContainer = bodyContainer.classList.contains('container') || document.querySelector('.page-content').classList.contains('container');
        var pageNav = stickyNav.querySelector('.page-nav-tabs');

        if (!e.detail.isSticky) {
            pageNav.classList.add('nav-tabs-boxed', 'mx-lg-0');
            pageNav.classList.remove('nav-tabs-simple', 'shadow-md', 'bgc-white', 'mx-md-n4', 'border-x-1', 'px-1');
            pageNav.style.height = '';

            pageNav.classList.remove('border-b-1', 'brc-secondary-l1', 'pb-1px', 'shadow');
        }
        else {
            pageNav.classList.add('nav-tabs-simple', 'bgc-white', 'shadow-md', 'mx-md-n4');

            if( insideContainer ) pageNav.classList.add('border-x-1');
            pageNav.classList.add('px-1')
    
            pageNav.classList.remove('nav-tabs-boxed', 'mx-lg-0');
            pageNav.style.height = '3.75rem';//specify height

            pageNav.classList.add('border-b-1', 'brc-secondary-l1', 'pb-1px', 'shadow');
        }
    });
    

    $('#sidebar')
    .on('show.ace.sidebar', function() {
        if (this.classList.contains('sidebar-push') ) {
            bodyContainer.style.overflow = '' // so we don't have body scrollbars
        }
    })
    .on('hide.ace.sidebar', function() {
        if (this.classList.contains('sidebar-push') ) {
            bodyContainer.style.overflow = 'visible' //so we have our sticky nav back
        }
    })



    $('#tooltip').tooltip();
    $('#tooltip-1').tooltip({
        template: '<div class="tooltip" role="tooltip"><div class="brc-secondary arrow"></div><div class="bgc-secondary tooltip-inner"></div></div>'
    });
    $('#tooltip-2').tooltip({
        template: '<div class="tooltip" role="tooltip"><div class="arrow brc-danger"></div><div class="bgc-danger tooltip-inner text-110 p-2"></div></div>'
    });
    $('#tooltip-3').tooltip({
        template: '<div class="tooltip" role="tooltip"><div class="arrow brc-success"></div><div class="bgc-success tooltip-inner text-dark-tp3 text-600 text-110 px-2 pb-2"></div></div>'
    });
    $('#tooltip-4').tooltip({
        template: '<div class="tooltip" role="tooltip"><div class="arrow brc-yellow"></div><div class="bgc-yellow brc-yellow border-1 border-r-2 tooltip-inner text-dark-tp3 text-110 text-600 px-2 pb-2"></div></div>'
    });

    $('#popover-1').popover({
        container: 'body',
        trigger: 'focus'
    });
    $('#popover-2').popover({
        container: 'body',
        trigger: 'focus',
        template: '<div class="popover brc-primary-m2 border-b-2" role="tooltip"><div class="arrow arrow2 brc-primary-l2"></div><div class="arrow brc-primary-m1"></div><h3 class="popover-header bgc-primary-l2 border-0 text-110 text-dark-tp4 text-600"></h3><div class="popover-body text-grey-d2"></div></div>'
    });
    $('#popover-3').popover({
        container: 'body',
        trigger: 'focus',
        template: '<div class="popover brc-success-m3" role="tooltip"><div class="arrow brc-success"></div><h3 class="popover-header border-0 bgc-success-m2 text-dark-tp4 text-600"></h3><div class="popover-body text-grey-d2"></div></div>'
    });
    $('#popover-4').popover({
        container: 'body',
        trigger: 'focus',
        template: '<div class="popover bgc-white brc-purple-m3 border-2" role="tooltip"><div class="arrow brc-purple"></div><div class="popover-body text-grey-d1 text-110"></div></div>'
    });
    $('#popover-5').popover({
        container: 'body',
        trigger: 'focus',
        template: '<div class="popover bgc-primary-tp1 border-0" role="tooltip"><div class="arrow arrow2 brc-primary-tp1"></div><div class="popover-body text-white text-110"></div></div>'
    });


    
    $('#id-toast-removeall').on('click', function() {
        $.aceToaster.removeAll()
        //$.aceToaster.hideAll()
    })

    /**
    $(document).on('add.ace.toaster', function(e) {
        // triggered when a new toast is made
    })    
    $(document).on('clear.ace.toaster', function(e, info) {
        // info.placement
        // info.remove (remove or just hide)
        // e.preventDefault()        
    })
    */
    

    $('#id-toast-default').on('click', function() {
        $.aceToaster.add({
            placement: 'tr',
            title: 'This is a sample notice!',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',

            icon: '<i class="text-blue ml-2 mr-1 text-130"><i class="far fa-lightbulb text-200"></i></i>',

            className: 'bgc-white-tp1 brc-secondary-tp4 rounded-sm',
            headerClass: 'bg-transparent border-0 text-120 text-dark-m3 font-bolder',
            bodyClass: 'pt-0'
        });
    });

    $('#id-toast-info2').on('click', function() {
        $.aceToaster.add({
            placement: 'tr',
            body: "<p class='p-3 mb-0 text-center'>\
                        <span class='d-inline-block text-center mb-3 py-3 px-1 border-1 brc-success radius-round'>\
                            <i class='fa fa-check fa-2x w-6 text-success-m1 mx-2px'></i>\
                        </span><br />\
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit!\
                    </p>\
                    <button data-dismiss='toast' class='btn btn-block btn-info radius-t-0 border-0'>OK</button></div>",
                
            width: 360,
            delay: 5000,

            close: false,

            className: 'bgc-white-tp1 shadow ',

            bodyClass: 'border-0 p-0 text-dark-tp2',
            headerClass: 'd-none',
        });
    });


    $('#id-toast-error').on('click', function() {
        $.aceToaster.add({
            placement: 'br',
            body: "<div class='p-3 m-2 border-l-4 brc-danger d-flex'>\
                     <span class='align-self-center text-center mr-3 py-2 px-1 border-1 bgc-danger radius-round'>\
                        <i class='fa fa-times text-180 w-4 text-white mx-2px'></i>\
                     </span>\
                     <div>\
                        <h4 class='text-dark-tp3'>Something went wrong</h4>\
                        <span class='text-dark-tp4 text-110'>Lorem ipsum dolor sit amet, consectetur adipiscing elit!</span>\
                     </div>\
                    </div>\
                    <button data-dismiss='toast' class='btn text-grey btn-h-light-danger position-tr mr-1 mt-1'><i class='fa fa-times'></i></button></div>",
                
            width: 480,
            delay: 5000,

            close: false,

            className: 'shadow border-0 radius-2',

            bodyClass: 'border-0 p-0',
            headerClass: 'd-none',
        });
    });


    $('#id-toast-dark').on('click', function() {
        $.aceToaster.add({
            placement: 'tl',
            title: 'This is a dark notice with 5s delay!',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. <a href="#" class="text-warning-m3">Vivamus eget</a> tincidunt velit.',

            //closeClass: 'btn btn-link btn-xs text-yellow text-150 text-decoration-none p-1',
            closeClass: 'btn btn-dark btn-h-danger btn-xs px-2 py-0 text-150 radius-round border-2 brc-white-tp2 shadow position-tr mr-n2 mt-n2',

            image: 'assets/image/avatar/avatar2.png',

            delay: 5000,

            className: 'bgc-dark-tp1 radius-1 border-0 overflow-visible',

            headerClass: 'bg-transparent border-0 text-warning-m2',
            bodyClass: 'text-white pt-0'
        });
    });

    $('#id-toast-info').on('click', function() {
        $.aceToaster.add({
            placement: 'center',
            title: 'This is a primary notice!',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. <a href="#" class="text-warning-m3 font-bolder">Vivamus eget</a> tincidunt velit.',

            image: 'assets/image/avatar/avatar.png',
            className: 'bgc-primary-tp1 border-2 brc-primary',
            headerClass: 'bg-transparent border-0 text-white text-120',
            bodyClass: 'text-white pt-0'
        });
    });

    $('#id-toast-success').on('click', function() {
        var toast = $.aceToaster.add({
            placement: 'tc',
            title: 'This is a draggable sticky success notice!',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. <a href="#" class="text-blue font-bolder">Vivamus eget</a> tincidunt velit.\
                    <hr />\
                    <p class="text-right mt-2 mb-0">\
                        <button type="button" data-dismiss="toast" class="btn btn-sm btn-light-secondary">Cancel</button>\
                        <button type="button" data-dismiss="toast" class="btn btn-sm btn-success">Continue</button>\
                    </p>',
            
            width: '420px',

            sticky: true,
            belowNav: true,

            closeClass: 'btn btn-danger btn-xs px-3 py-0 align-self-start text-100 font-normal align-self-start',

            //icon: '<i class="fa fa-user fa-2x text-success-m3 ml-2 mr-1"></i>',
           
            headerClass: 'bgc-success-tp1 border-0 text-white text-120 font-normal mb-2 pt-0 pb-2 pr-0',
            titleClass: 'font-normal pt-1',

            className: 'brc-success-m2 border-2 radius-1 pr-0',

            bodyClass: 'pt-0'
        });

        toast.style.touchAction = 'none';

        var position = { x: 0, y: 0 }
        interact(toast)
        .draggable({
          ignoreFrom: 'button', //for Firefox on Android to react to button events
          listeners: {
            //start : function(event) {
            //},
            move : function(event) {
             position.x += event.dx
             position.y += event.dy
     
             Object.assign(event.target.style, {
                 transform: "translateX("+position.x+"px) translateY("+position.y+"px)"
             })
            },
          }
        })
    });




    ////////////////
    $('#id-sweeralert-1').on('click', function() {
        var swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success mx-2',
              cancelButton: 'btn btn-danger mx-2'
            },
            buttonsStyling: false
        });
          
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            scrollbarPadding: false,
            confirmButtonText: 'Yes, do it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then(function(result) {
            if (result.value) {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Operation completed successfully.',
                'success'
              )
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Cancelled successfully.',
                'error'
              )
            }
        });

    });

    $('#id-sweeralert-2').on('click', function() {
      Swal.fire({
        position: 'top-end',
        scrollbarPadding: false,
        type: 'info',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 2000
      });
    });
    ////////////////
    //BootBox
    $('#id-bootbox-alert').on('click', function() {
        bootbox.alert({
            message: "This is alert.",
            onEscape: true,
            backdrop: true,
            callback: function(){
            }
        });
    });

    $('#id-bootbox-confirm').on('click', function() {
        bootbox.confirm({
            message: "This is confirm.",
            onEscape: true,
            backdrop: true,
            callback: function(result) {
            }
        });
    });

    $('#id-bootbox-prompt').on('click', function() {
        bootbox.prompt({
            title: "<p class='text-orange-d2 mb-0'>Are you sure?</p><p class='text-80 text-secondary'>Type \"yes\" and then click \"OK\" to conintue</p>",
            onEscape: true,
            backdrop: true,
            callback: function(result) {
                //console.log(result);
            }
        });
    });


    $('#id-bootbox-custom').on('click', function() {
       bootbox.dialog({
        message: '<p>This dialog demonstrates many of the options available when using the Bootbox library</p>',
        onEscape: true,
        backdrop: true,
        buttons: {
                success :
                 {
                    label : "<i class='fa fa-check'></i> Success!",
                    className : "btn-success",
                    callback: function() {
                        //Example.show("great success");
                    }
                },
                danger :
                {
                    label : "Danger!",
                    className : "btn-danger",
                    callback: function() {
                        //Example.show("uh oh, look out!");
                    }
                }, 
                click :
                {
                    label : "Click ME!",
                    className : "btn-primary",
                    callback: function() {
                        //Example.show("Primary button");
                    }
                }, 
                button :
                {
                    label : "Just a button...",
                    className : "btn-secondary"
                }
            }
      })
    });

    
    //////

    //Ace Aside example    
    $('#aside-1')
    .aceAside({
        placement: 'right',
        dismiss: true,
        belowNav: true,
        extraClass: 'my-2'
    })
    
   
   //make it draggable and resizable
   $('#draggable-1').css({height: '200px', 'touch-action': 'none'});
   var position = { x: 0, y: 0 }
   interact('#draggable-1')
   .draggable({
     ignoreFrom: 'button', //for Firefox on Android to react to button events
     listeners: {
       //start : function(event) {
       //},
       move : function(event) {
        position.x += event.dx
        position.y += event.dy

        Object.assign(event.target.style, {
            left: position.x+'px',
            top:  position.y+'px'
        })
       },
     }
   })
   .resizable({
    ignoreFrom: 'button', //for Firefox on Android to react to button events
    edges: {
        top   : true,
        left  : true,
        bottom: true,
        right: true
    },
  })
  .on('resizemove', function(event) {
    if(event.rect.width < 200) {
        event.rect.width = 200;
        return;
    }
    if(event.rect.height < 100) {
        event.rect.height = 100;
        return;
    }

    if(event.edges.bottom) position.y += event.delta.y;
    else if(event.edges.left || event.edges.right) position.x += event.delta.x / 2;

    //position.x += event.delta.x;
    Object.assign(event.target.style, {
        left: position.x+'px',
        top:  position.y+'px'
    });

    Object.assign(event.target.style, {
      height: event.rect.height+'px',
      width:  event.rect.width+'px'
    })
  });
   
});
