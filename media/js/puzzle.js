(function(){
	
	window.onload = function(){
		$('#picture').removeClass().addClass('win');
		$('#initial').removeClass().addClass('win');
		ListenChoiceFourClick();
		ListenChoiceThreeClick();
		ListenTilesClick();
		ListenRestartClick();
	};

	var pos=[], totalnum, pictureClassName, topClassName, leftClassName, bacgroundClassName, pictureWhenWinClassName, picturenum;

	var ListenChoiceFourClick = function() {
		$('#four').click(function(event){
			setDetailsForChoiceFour();
			setOtherDetailForChoiceFour();
			createTiles(4);
			ListenTilesClick();
			ListenRestartClick();
		});
	};

	var ListenChoiceThreeClick = function() {
		$('#three').click(function(event){
			setDetailsForChoiceThree();
			setOtherDetailForChoiceThree();			
			createTiles(5);
			ListenTilesClick();
			ListenRestartClick();
		});
	};

	var setDetailsForChoiceFour = function() {
		pos = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
		totalnum = 15;
		pictureClassName = 'pic';
		topClassName = 'top';
		leftClassName = 'left';
		bacgroundClassName = 'bac';
		pictureWhenWinClassName = 'win';
	};

	var setDetailsForChoiceThree = function() {
		pos=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,0];
		totalnum = 24;
		picturenum = parseInt(Math.random()*6);
		pictureClassName = 'pic'+picturenum;
		topClassName = 'toptwo';
		leftClassName = 'lefttwo';
		bacgroundClassName = 'bactwo';
		pictureWhenWinClassName = 'win' + picturenum;
	};

	var setOtherDetailForChoiceFour = function() {
		$('#picture').removeClass();
		$('#initial').removeClass().addClass('win');
		$('#tips').removeClass().addClass('youwin');
	};

	var setOtherDetailForChoiceThree = function() {
		$('#picture').removeClass();
		$('#initial').removeClass().addClass('win'+ picturenum);
		$('#tips').removeClass().addClass('youwin');
	};

	var createTiles = function(num) {
		$('#main').empty();
		for (var i = 1; i < num*num; i++) {
			var child = $('<div></div>').addClass(pictureClassName + " " + topClassName + parseInt((i-1)/num+1) + " " + leftClassName + ((i-1)%num+1)).attr('id', bacgroundClassName+i);
			$('#main').append(child);
		}
	};

	var ListenTilesClick = function() {
		$('#main div').click(function(event){
			var tile = event.target;
			if (canmove(tile)) {
				moveToBlanket(tile);
				checkResult();
			}
		});
		ListenRestartClick();
	};

	var checkResult = function() {
		if (IsSuccess()) {
			$('#main').empty();
			$('#picture').removeClass().addClass(pictureWhenWinClassName);
			$('#tips').removeClass();
		}
	};

	var IsSuccess = function() {
		for (var a = 1; a <= totalnum; a++) {
			if (a != pos[a-1]) return false;
		}
		return true;
	};

	var ListenRestartClick = function() {
		$('#restart').click(function(){
			shuffle();
		});
	};

	var shuffle = function() {
		for (var a = 0; a < 1000; a++) {
			num = parseInt(Math.random()*totalnum);
			var pic = $('#main div')[num];
			if (canmove(pic)) moveToBlanket(pic);
			if (search(0) === totalnum && a > 500) break;
		}
		if(IsSuccess() || search(0) !== totalnum) shuffle();
	};

	var canmove = function(tile) {
		var s = tile.className.match(/\d/g);
		var positionOfThis = (parseInt(s[s.length-2]) - 1) * Math.pow(totalnum+1,0.5) + parseInt(s[s.length-1]) - 1;
		var positionOfZero = search(0);
		if ((positionOfZero%Math.pow(totalnum+1,0.5) == positionOfThis%Math.pow(totalnum+1,0.5) && Math.abs(positionOfThis - positionOfZero) == Math.pow(totalnum+1,0.5))|| (Math.abs(positionOfThis - positionOfZero) === 1 && parseInt(positionOfZero/Math.pow(totalnum+1,0.5))==parseInt(positionOfThis/Math.pow(totalnum+1,0.5)))) {
			return true;
		}
		return false;
	};

	var moveToBlanket = function(tile) {
		var s = tile.className.match(/\d/g);
		var positionOfThis = (parseInt(s[s.length-2]) - 1) * Math.pow(totalnum+1,0.5) + parseInt(s[s.length-1]) - 1;
		var positionOfZero = search(0);
		tile.className = pictureClassName + ' ' + topClassName + parseInt(positionOfZero/Math.pow(totalnum+1,0.5)+1) + ' ' + leftClassName + parseInt(positionOfZero%Math.pow(totalnum+1,0.5)+1);
		var change = pos[positionOfThis];
		pos[positionOfThis] = pos[positionOfZero];
		pos[positionOfZero] = change;
	};

	var search = function(target) {
		for (var i = 0; i < totalnum; i++) {
			if (pos[i] == target) return i;
		}
		return i;
	};
})();