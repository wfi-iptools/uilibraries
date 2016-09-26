/*This Fixed Header library works like this:-
* When user starts scrolling the page, the JS checks if the table top has reached the top part of the browser and then it detaches the header of the table from the body, but then each <th>
* attains a width of itself depending on the length of the text it has and <td> in <tbody> attains a width of itself as per it's text length.
* So in order to sync both the widths of <th> of <thead> and <td> of <tbody>, the whole calculation works thrice and the assigning of width is two way-binding which means if width of <th> is larger than the
 * corresponding <td> then <th>'s width will be assigned to <td> and vice-versa. It takes care of all the scenarios if there is "No access" data available for multiple columns etc.
* */

jQuery(document).ajaxSuccess(function(){
	try{
		var scrollPos = 0;
		var scrollCheck = 0;
		var rowCount = jQuery('#displayTable thead tr:eq(1) th').length;
		for(var a = 0; a < rowCount; a++){
			jQuery('#displayTable tbody tr:eq(0) td:eq(' + a + ')').css('min-width', jQuery('#displayTable tbody tr:eq(0) td:eq(' + a + ')').width());
			jQuery('#displayTable thead tr:eq(1) th:eq(' + a + ')').css('min-width', jQuery('#displayTable thead tr:eq(1) th:eq(' + a + ')').width());
		}
		jQuery(window).on('scroll', function(){
			scrollPos = jQuery(this).scrollTop();
			if(jQuery('#displayTable').length){
				var tableTop = jQuery('#displayTable').offset().top;
				if (tableTop < scrollPos){
					jQuery('#displayTable thead').addClass('fixedTop');
					if(scrollCheck < ieScrollCheck()) {
						scrollCheck++;
						var p = jQuery('#displayTable thead tr:eq(1) th').length;
						var rows = jQuery('#displayTable tbody tr').length;
						var c;
						var r;
						for (var j = 0; j < rows; j++) {
							r = !jQuery('#displayTable tbody tr:eq(' + j + ') td').hasClass('no-access-background-color');
							if (r && j == (rows - 1)){
								c = j;
							}
							else if (!r && j == (rows - 1)) {
								c = 0;
							}
							else if(r && j != (rows -1)){
								c = j;
								break;
							}
						}
						if(c == 0 && !r){
							for(var k = 0; k < 4; k++){
								var td = jQuery('#displayTable tbody tr:eq(1) td:eq('+k+')');
								/*Below code for last column that has class="no-access-background-color"*/
								if(td.hasClass('no-access-background-color')){
									jQuery('#displayTable thead tr:eq(1) th:eq(0)').css('min-width', jQuery('#displayTable tbody tr:eq(' + c + ') td:eq(0)').width()-ieAssignmentTbody());
									jQuery('#displayTable thead tr:eq(1) th:eq(0)').css('padding', jQuery('#displayTable tbody tr:eq(' + c + ') td:eq(0)').css('padding'));
								}
								/*Below code for MISC Access columns*/
								else{
									jQuery('#displayTable thead tr:eq(1) th:eq('+k+')').css('min-width', jQuery('#displayTable tbody tr:eq(' + c + ') td:eq('+k+')').width()-ieAssignmentThead());
									jQuery('#displayTable thead tr:eq(1) th:eq('+k+')').css('padding', jQuery('#displayTable tbody tr:eq(' + c + ') td:eq('+k+')').css('padding'));
								}
							}
							jQuery('#displayTable thead tr:eq(0) th:last-child').width(jQuery('#displayTable thead tr:eq(0) th:last-child').width() + jQuery('#displayTable tbody').width() - jQuery('#displayTable thead').width());
							var theadWidth = jQuery('#displayTable thead tr:eq(1)').width();
							var tbodyWidth = jQuery('#displayTable tbody tr:eq(1)').width();
							if(jQuery('#displayTable thead tr:eq(1)').width() > jQuery('#displayTable tbody tr:eq(1)').width()){
								jQuery('#displayTable tbody tr:eq(0) td.no-access-background-color').not('.hidden').css('min-width',jQuery('#displayTable tbody tr:eq(0) td.no-access-background-color').not('.hidden').width() + theadWidth - tbodyWidth+ieAssignmentTbody());
							}
						}
						else if(c >= 0 && r) {
							for (var i = 0; i < p; i++) {
								var x = jQuery('#displayTable thead tr:eq(1) th:eq(' + i + ')').width();
								var a = jQuery('#displayTable tbody tr:eq(' + c + ') td:eq(' + i + ')').width();
								if (x > a) {
									jQuery('#displayTable tbody tr:eq(' + c + ') td:eq(' + i + ')').css('min-width', jQuery('#displayTable thead tr:eq(1) th:eq(' + i + ')').width()+ieAssignmentTbody());
									jQuery('#displayTable tbody tr:eq(' + c + ') td:eq(' + i + ')').css('padding', jQuery('#displayTable thead tr:eq(1) th:eq(' + i + ')').css('padding'));
								}
								else{
									jQuery('#displayTable thead tr:eq(1) th:eq(' + i + ')').css('min-width', jQuery('#displayTable tbody tr:eq(' + c + ') td:eq(' + i + ')').width()+ieAssignmentThead());
									jQuery('#displayTable thead tr:eq(1) th:eq(' + i + ')').css('padding', jQuery('#displayTable tbody tr:eq(' + c + ') td:eq(' + i + ')').css('padding'));
								}
							}
						}
					}
						jQuery(".fixedTop").css('left', jQuery('#displayTable').offset().left - jQuery(window).scrollLeft() + 'px');
				}
				else {scrollCheck = 0;
					jQuery('#displayTable thead').removeClass('fixedTop');
					jQuery('#displayTable thead tr:eq(1) th').css('width', '').css('min-width', '').css('padding', '');
					jQuery('#displayTable tbody tr:eq(0) td').css('width', '').css('min-width', '');
					if(ieAssignmentTbody()){
						for (var a = 0; a < rowCount; a++) {
							jQuery('#displayTable tbody tr:eq(0) td:eq(' + a + ')').css('min-width', jQuery('#displayTable tbody tr:eq(0) td:eq(' + a + ')').width());
							jQuery('#displayTable thead tr:eq(1) th:eq(' + a + ')').css('min-width', jQuery('#displayTable thead tr:eq(1) th:eq(' + a + ')').width());
						}
					}
				}
			}
			if(jQuery('.collapsibleAsset').length) {
				jQuery('.collapsibleAsset').each(function() {
					var elem = jQuery(this);
					if(jQuery('#displayTable thead').hasClass('fixedTop')){
						if (!elem.hasClass('fixAsset') && !elem.hasClass('userClick')) {
							if (!elem.hasClass('greyColor')) {
								jQuery('.clone').removeClass('hidden');
							}
						}
						else if (elem.hasClass('userClick')) {
							jQuery('.clone').removeClass('hidden');
						}
					}
					else if(!jQuery('#displayTable thead').hasClass('fixedTop')){
						if(elem.hasClass('fixAsset') && !elem.hasClass('userClick')){
							if (elem.hasClass('greyColor')) {
								jQuery('.clone').addClass('hidden');
							}
						}
						else if(elem.hasClass('userClick')){
							jQuery('.clone').addClass('hidden');
						}
					}
				});
			}
		});
	}
	catch(err){

	}
});

function ieAssignmentTbody(){
	if(navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv 11/))){
		return 22;
	}
	else{
		return 0;
	}
}

function ieAssignmentThead(){
	if(navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv 11/))){
		return 20;
	}
	else{
		return 0;
	}
}

function ieScrollCheck(){
	if(navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv 11/))){
		return 2;
	}
	else{
		return 3;
	}
}