/* Go to top */
window.scrollTo(0, 0);

/* Show Bootstrap Tooltip */
// data-toggle="tooltip" data-placement="top" title="..."
// $('[data-toggle="tooltip"]').tooltip();

/* Collapse/Close ibox */
$('.collapse-link').on('click', function () {
	var ibox = $(this).closest('div.ibox');
	var button = $(this).find('i');
	var content = ibox.children('.ibox-content');
	content.slideToggle(200);
	button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
	ibox.toggleClass('').toggleClass('border-bottom');
	setTimeout(function () {
		ibox.resize();
		ibox.find('[id^=map-]').resize();
	}, 50);
});

$('.close-link').on('click', function () {
	var content = $(this).closest('div.ibox');
	content.remove();
});