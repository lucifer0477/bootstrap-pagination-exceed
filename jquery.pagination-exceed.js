/*
*	plugin: bootstrap-pagination-exceed
*	author: ismael imholz
*	date:	2015 september 7th
*
*	DESCRIPTION:
*	jquery-plugin to avoid exceeding the displayed paging-items in a bootstrap-paging-bar
*
*	works for one ".pagination" on the current page!
*
*
*	USAGE (ALL VALUES ARE OPTIONAL):
*
*	jQuery().pagination_exceed({
*		showMaxPagingItems: 3,			// NUMBER: amount of displaying cells with numbered pagingItems
*		hideWhere: 			'beginEnd',	// possible string-values: 'nearActive', 'beginEnd'
*		placeHolder:		'...',		// possible string-values: 'anything', empty String '' to avoid Placeholder
*		size:				'MEDIUM'	// possible string-values: 'SMALL', 'MEDIUM', 'LARGE'
*	});
*
*/
(function($){
    $.fn.pagination_exceed = function(options){
		var settings = $.extend({
			showMaxPagingItems: 	4,
			hideWhere:				'beginEnd',
			placeHolder:			'...',
			size:					'MEDIUM'
		}, options);
		
		var showMaxPagingItems 	= settings.showMaxPagingItems;
		var hideWhere 			= settings.hideWhere;
		var placeHolder			= settings.placeHolder;
		var size				= settings.size;
		
		if (size=='SMALL') {
			jQuery('.pagination').addClass('pagination-sm').removeClass('pagination-lg');
		} else if (size=='MEDIUM') {
			jQuery('.pagination').removeClass('pagination-sm pagination-lg');
		} else if (size=='LARGE') {
			jQuery('.pagination').addClass('pagination-lg').removeClass('pagination-sm');
		}
		
		// only do stuff, if there is 1 pagination on page
		if ( jQuery('.pagination').length==1 ) {
			
			var li = jQuery('.pagination').find('li');
			
			li.each (function() {
				var me = jQuery(this);
				if ( me.is('li:first-child')==false && me.is('li:nth-child(2)')==false && me.is('li:last-child')==false && me.is('li:nth-last-child(2)')==false ) {	
					me.addClass('paging-item');
				}				
			});	
			
			var pagingItems = jQuery('.paging-item');
			var activeItem  = jQuery('.paging-item.active');
	
			if ( pagingItems.length > showMaxPagingItems ) {
				
				amountToHideTotal 	= pagingItems.length - showMaxPagingItems;
				amountToHideLeft 	= Math.floor(amountToHideTotal /2);
				amountToHideRight 	= amountToHideTotal - amountToHideLeft;
				
				//console.log("amountToHideTotal:"+amountToHideTotal+" amountToHideLeft:"+amountToHideLeft+" amountToHideRight:"+amountToHideRight);
				
				if ( hideWhere=='nearActive' ) {
					var prevItems = activeItem.prevAll(':lt('+amountToHideLeft+')');
					var nextItems = activeItem.nextAll(':lt('+amountToHideRight+')');
		
					var nextItemsMissing = amountToHideRight -nextItems.filter('.paging-item').length;
					var prevItemsMissing = amountToHideLeft -prevItems.filter('.paging-item').length;
					
					if ( prevItemsMissing!=0 ) {
						nextItems = activeItem.nextAll(':lt('+(amountToHideRight+prevItemsMissing)+')');
					}
					if ( nextItemsMissing!=0 ) {
						prevItems = activeItem.prevAll(':lt('+(amountToHideLeft+nextItemsMissing)+')');
					}
					
					//console.log('nextItemsMissing:'+nextItemsMissing+" | prevItemsMissing:"+prevItemsMissing);
								
					prevItems.each(function() {
						if ( jQuery(this).hasClass('paging-item') )	{
							jQuery(this).hide().addClass('deactivated');
						}
					});
					nextItems.each(function() {				
						if ( jQuery(this).hasClass('paging-item') ){
							jQuery(this).hide().addClass('deactivated');
						}
					});
					
					if (placeHolder!='') {
						var activeIsFirst = jQuery(activeItem).find('a').html()==1 ? true : false;
						var activeIsLast = jQuery(activeItem).find('a').html()==jQuery('.paging-item').last().find('a').html() ? true : false;
						
						if ( prevItemsMissing<=1 && activeIsFirst==false ) {
							jQuery("<li><a href='#' class='ignoreClick'>"+placeHolder+"</a></li>").insertBefore( activeItem );
						}
						if (nextItemsMissing<=1 && activeIsLast==false ) {
							jQuery("<li><a href='#' class='ignoreClick'>"+placeHolder+"</a></li>").insertAfter( activeItem );
						}
					}
				} else if ( hideWhere=='beginEnd' ) {
					
					activeINDEX = activeItem.index('.paging-item')+1;
					amountItems = pagingItems.length;
					
					//console.log("activeINDEX: "+activeINDEX +" | amountItems: "+amountItems);				
					
					if ( activeINDEX <= amountToHideLeft ) {
						amountToHideRight = amountToHideTotal;
						amountToHideLeft = 0;
					} else if ( activeINDEX > amountItems-amountToHideRight ) {
						amountToHideLeft = amountToHideTotal;
						amountToHideRight = 0;
					}
					
					pagingItems.filter(':lt('+amountToHideLeft+')').hide().addClass('deactivated-L');
					if (amountToHideRight!=0) {
						jQuery('.paging-item').slice(-amountToHideRight).hide().addClass('deactivated-R');
					}
					
					jQuery("<li><a href='#' class='ignoreClick'>"+placeHolder+"</a></li>").insertBefore( '.deactivated-L:first' );
					jQuery("<li><a href='#' class='ignoreClick'>"+placeHolder+"</a></li>").insertBefore( '.deactivated-R:last' );
					
				}
							
			}
			
			jQuery('.ignoreClick').on('click', function(e) {
				e.preventDefault();
			});
			
		}
	
    };

})(jQuery);
