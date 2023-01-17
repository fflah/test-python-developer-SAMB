jQuery(function($) {
    $('#id-material').on('click', function() {
        var icons = ['home', 'computer', 'border_all', 'edit', 'dashboard', 'calendar_today', 'camera', 'apps'];
        $('.sidebar').find('.nav > .nav-item > .nav-link > .nav-icon').each(function(index, e) {
            $(this).after('<i class="material-icons-outlined nav-icon">'+icons[index]+'</i>').remove();
        });

        $('.sidebar').find('.caret').attr('class', 'caret rt-n90 material-icons-outlined').html('chevron_left');
    });

    $('#id-jamicons').on('click', function() {
        var icons = ['dashboard', 'computer-alt', 'layout', 'pencil', 'task-list', 'calendar', 'picture', 'tag'];
        $('.sidebar').find('.nav > .nav-item > .nav-link > .nav-icon').each(function(index, e) {
            $(this).after('<i class="nav-icon jam jam-'+icons[index]+'"></i>').remove();
        });
        $('.sidebar').find('.caret').attr('class', 'caret rt-n90').addClass('jam jam-chevron-left').html('');
    });

    $('#id-evaicons').on('click', function() {
        var icons = ['home-outline', 'monitor-outline', 'grid-outline', 'edit-2-outline', 'layout-outline', 'calendar-outline', 'image-outline', 'cube-outline'];
        $('.sidebar').find('.nav > .nav-item > .nav-link > .nav-icon').each(function(index, e) {
            $(this).after('<i class="nav-icon eva eva-'+icons[index]+'"></i>').remove();
        });
        $('.sidebar').find('.caret').attr('class', 'caret rt-n90').addClass('eva eva-chevron-left-outline').html('');
    });

    $('#id-fontawesome').on('click', function() {
        var icons = ['fa fa-tachometer-alt', 'fa fa-desktop', 'fa fa-table', 'fa fa-edit', 'fa fa-list', 'far fa-calendar-alt', 'far fa-image', 'fa fa-tag'];
        $('.sidebar').find('.nav > .nav-item > .nav-link > .nav-icon').each(function(index, e) {
            $(this).after('<i class="nav-icon '+icons[index]+'"></i>').remove();
        });
        $('.sidebar').find('.caret').attr('class', 'caret rt-n90').addClass('fa fa-angle-left').html('');
    });
});