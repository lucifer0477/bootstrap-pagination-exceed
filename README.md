# jquery-plugin to avoid bootstrap-pagination-exceed
jquery-plugin to avoid exceeding the displayed paging-items in a bootstrap-paging-bar

works for one ".pagination" on the current page!

USAGE:

`jQuery().pagination_exceed({
	showMaxPagingItems:	3,		// NUMBER: amount of displaying cells with numbered pagingItems
	hideWhere:		'beginEnd',	// possible string-values: 'nearActive', 'beginEnd'
	placeHolder:		'...',		// possible string-values: 'anything', empty String '' to avoid Placeholder
	size:			'MEDIUM'	// possible string-values: 'SMALL', 'MEDIUM', 'LARGE'
});`


all values are optional
