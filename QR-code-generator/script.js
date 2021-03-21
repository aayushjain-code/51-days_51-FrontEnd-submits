// Function to HTML encode the text
// This creates a new hidden element,
// inserts the given text into it
// and outputs it out as HTML
function htmlEncode(value) {
	return $('<div/>').text(value)
		.html();
}

$(function () {

	// Specify an onclick function
	// for the generate button
	$('#generate').click(function () {

		// Generate the link that would be
		// used to generate the QR Code
		// with the given data
		let finalURL =
			'https://chart.googleapis.com/chart?cht=qr&chl=' +
			htmlEncode($('#content').val()) +
			'&chs=160x160&chld=L|0'

		// Replace the src of the image with
		// the QR code image
		$('.qr-code').attr('src', finalURL);
	});
});

$(document).ready(function () {

	// Global variable
	var element = $("#html-content-holder");

	// Global variable
	var getCanvas;
	$("#btn-Convert-Html2Image").on('click', function () {
		var imgageData =
			getCanvas.toDataURL("image/png");

		// Now browser starts downloading
		// it instead of just showing it
		var newData = imgageData.replace(
			/^data:image\/png/, "data:application/octet-stream");

		$("#btn-Convert-Html2Image").attr(
			"download", "GeeksForGeeks.png").attr(
				"href", newData);
	});
});
