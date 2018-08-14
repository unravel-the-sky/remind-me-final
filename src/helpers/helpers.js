exports.preg_replace = function(pattern, replace, subject, limit){
	if(limit === undefined) {
		limit = -1;
	}

	var _flag		= pattern.substr(pattern.lastIndexOf(pattern[0])+1),
		_pattern	= pattern.substr(1, pattern.lastIndexOf(pattern[0])-1),
		reg	= new RegExp(_pattern, _flag),
		rs	= null,
		res	= [],
		x	= 0,
		y	= 0,
		rtn	= subject;

	var tmp = [];
	if(limit === -1){
		do {
			tmp = reg.exec(subject);
			if(tmp !== null) {
				res.push(tmp);
			}
		} while(tmp !== null && _flag.indexOf('g') !== -1);
	}
	else {
		res.push(reg.exec(subject));
	}
	for(x = res.length -1; x > -1; x--){
		tmp = replace;

		for(y = res[x].length; y > -1; y--){
			tmp = tmp.replace('${' + y + '}', res[x][y])
				.replace('$' + y, res[x][y])
				.replace('\\' + y, res[x][y]);
		}
		rtn = rtn.replace(res[x][0], tmp);
	}
	return rtn;
};

/*
 * $.stringToList - jQuery Function to convert a block of text into a html list.
 * @requires: full stops after each sentence to match list elements
 * @param: list type: ul or ol
 * Usage: FC.UTIL.stringToList($('#inclusions'),'ul');
 */
// exports.stringToList = function(textContainer,listType)
// {
// 	var sentenceRegex = /[a-z0-9,'‘- ]+/igm, htmlList = '';
// 	$.each(textContainer.html().match(sentenceRegex), function(i, v)
// 	{
// 		/* Remove blank elements */
// 		if (v && (/[a-z0-9]+/igm.test(v)) && v != 'strong') 
// 		{
// 			htmlList += '' + v + '';
// 		}
// 	});
// 	htmlList += '';
// 	textContainer.html(htmlList);
// }

/* Convert text to html list */
// NAMESPACE.stringToList('#inclusions','ul');
