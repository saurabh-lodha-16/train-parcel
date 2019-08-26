$(document).ready(function(){
    // Hide submenus
    $('#body-row .collapse').collapse('hide'); 
    
    // Collapse/Expand icon
    $('#collapse-icon').addClass('fa-chevron-left'); 
    
    // Collapse click
    $('[data-toggle=sidebar-colapse]').click(function() {
        SidebarCollapse();
    });
    
    function SidebarCollapse () {
        $('.menu-collapsed').toggleClass('d-none');
        $('.sidebar-submenu').toggleClass('d-none');
        $('.submenu-icon').toggleClass('d-none');
        $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');
        
        // Collapse/Expand icon
        $('#collapse-icon').toggleClass('fa-chevron-right');
    }
    });