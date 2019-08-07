import download from 'downloadjs';

function main() {
	const storyDataElm = document.getElementsByTagName('tw-storydata')[0];
	const passageElms = [...document.getElementsByTagName('tw-passagedata')];
	const tagElms = [...document.getElementsByTagName('tw-tag')];

	var data = {
		name: storyDataElm.getAttribute('name'),
		startPassageId: storyDataElm.getAttribute('startnode'),
		tags: [],
		passages: []
	}

	tagElms.forEach(function (tagElm){
		data.tags.push(tagElm.getAttribute('name'));
		// they also have color attribute which seems useless outside of the editor
	});

	passageElms.forEach(function (passageElm){
		var tags = passageElm.getAttribute('tags');
		tags = tags ? tags.split(' ') : [];

		data.passages.push({
			id: passageElm.getAttribute('pid'),
			name: passageElm.getAttribute('name'),
			tags: tags,
			content: passageElm.innerHTML
		});
	});

	// avoid the last two arguments of JSON.stringify to produce condensed json
	download(JSON.stringify(data, null, 2), data.name + '.json', 'application/json');
}

window.onload = main;
