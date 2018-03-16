//交换i和k行 i > K
var swapRow = function(tableObject, Rowi, Rowk) {
	var Rows = tableObject.find('tr');
	Rows.eq(Rowi).insertBefore(Rows.eq(Rowk));
	if(Rowk !== Rowi-1) Rows.eq(Rowk).insertAfter(Rows.eq(Rowi-1));
};

//升序
var ascend = function(tableObject, col, ncol) {
	for (var i = 1; i < ncol; i++) {
		for (var k = i+1; k < ncol; k++) {
			var Rows = tableObject.find('tr');
			if(Rows.eq(i).find('td').eq(col).text() > Rows.eq(k).find('td').eq(col).text()) {
				swapRow(tableObject, k, i);
			}
		}
	}
};

//降序
var descend = function(tableObject, col, ncols) {
	for (var i = 1; i < ncols; i++) {
		for (var k = i+1; k < ncols; k++) {
			var Rows = tableObject.find('tr');
			if(Rows.eq(i).find('td').eq(col).text() < Rows.eq(k).find('td').eq(col).text()) {
				swapRow(tableObject, k, i);
			}
		}
	}
};

//清除前面的Class
var ClearClasses = function(tableObject_id) {
	var tableObject = "#" + tableObject_id;
	var tableObject_th = $(tableObject).find('th');
	for (var i = 0; i < tableObject_th.length; i++) {
		tableObject_th.eq(i).removeClass();
	}
};

var keepEvenRowGray = function(tableObject) {
	$('tr:odd').removeClass();
	$('tr:even').addClass('alternate');
};

//
var ascend_operate = function(that, ID, index) {
	ClearClasses(ID);
	$(that).addClass('ascend');
	var tableObject = $('#'+ID);
	var len = tableObject.find('tr').length;
	ascend(tableObject, index, len);
	keepEvenRowGray(tableObject);
};

var descend_operate = function(that, ID, index) {
	ClearClasses(ID);
	$(that).addClass('descend');
	var tableObject = $('#'+ID);
	var n = tableObject.find('tr').length;
	descend(tableObject, index, n);
	keepEvenRowGray(tableObject);
};

window.onload = function() {
	$('th').click(function(){
		var ID = $(this).closest('table').attr('id');
		var index = $('#'+ ID + ' th').index($(this));
		if($(this).hasClass('ascend')) 
			descend_operate(this, ID, index);
		else 
			ascend_operate(this, ID, index);
	});
};