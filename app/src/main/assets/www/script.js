//Код для разметки.
window.onresize = out;
document.body.onselectstart = function () { return false };

let height;
let width;
let side;

function out() {
	height = document.documentElement.clientHeight;
	width = document.documentElement.clientWidth;
	side = `${(width - 20) / 10}px`;
	let wrap = document.getElementById("wrap");
	wrap.style.width = `${width}px`;
	wrap.style.height = `${height}px`;
	let all = document.getElementById("all");
	all.style.width = `${width - 20}px`;
	all.style.height = `${(width - 20) * 16 / 10}px`;
	let menu = document.getElementById("menu");
	menu.style.height = side;
	menu.style.fontSize = `${(width - 20) / 20}px`;
	let main = document.getElementById("main");
	main.style.height = `${(width - 20) * 15 / 10}px`;
	for (let i = 1; i < 6; i++) {
		let div = document.getElementById("m" + i);
		div.style.width = `${(width - 20) / 5}px`;
		div.style.height = side;
		div.style.lineHeight = side;
		div.style.textAlign = "center";
	}
	for (let i = 0; i < 10; i++) {
		let div = document.getElementById("col" + i);
		div.style.width = side;
		div.style.height = `${(width - 20) * 15 / 10}px`;
	}
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 15; j++) {
			let div = document.getElementById(`${i}-${j}`);
			div.style.width = side;
			div.style.height = side;
			div.style.lineHeight = side;
			div.onmousedown = function () { firstClick(this.id) };
		}
	}
}

out();

//Код программы.

let hash = document.location.hash;
let level = hash[1];
let lang = hash[2];
let countOfmines;

let best;
let newRecord;
let rating = new Object;
rating.l0 = "∞";
rating.l1 = "∞";
rating.l2 = "∞";
rating.l3 = "∞";
rating.l4 = "∞";
rating.l5 = "∞";
let arrOfRating = new Array;
let difficulty;

function soundPlay(sound) {
	try {
		Android.play(sound);
	} catch (e) {
		console.log(e);
	}
}

function vibrateShort() {
	try {
		Android.vibrateShort();
	} catch (e) {
		console.log(e);
	}
}

function vibrateLong() {
	try {
		Android.vibrateLong();
	} catch (e) {
		console.log(e);
	}
}

function tapFx() {
	try {
		vibrateShort();
		soundPlay("tap")
	} catch (e) {
		console.log(e);
	}
}

function setFx() {
	try {
		vibrateShort();
		soundPlay("set")
	} catch (e) {
		console.log(e);
	}
}

function showMessage(message) {
	try {
		Android.rating(message)
	} catch (e) {
		console.log(e);
	}
}

if (lang == "1") {
	best = "Топ";
	newRecord = "Новый рекорд!"
	arrOfRating[0] = "Уровень сложности 0";
	arrOfRating[1] = "Уровень сложности 1";
	arrOfRating[2] = "Уровень сложности 2";
	arrOfRating[3] = "Уровень сложности 3";
	arrOfRating[4] = "Уровень сложности 4";
	arrOfRating[5] = "Уровень сложности 5";
}
else {
	best = "Best";
	newRecord = "New record!"
	arrOfRating[0] = "Difficulty level 0";
	arrOfRating[1] = "Difficulty level 1";
	arrOfRating[2] = "Difficulty level 2";
	arrOfRating[3] = "Difficulty level 3";
	arrOfRating[4] = "Difficulty level 4";
	arrOfRating[5] = "Difficulty level 5";
}

switch (level) {
	case "1": countOfmines = 15; difficulty = 1; break;
	case "2": countOfmines = 20; difficulty = 2; break;
	case "3": countOfmines = 25; difficulty = 3; break;
	case "4": countOfmines = 30; difficulty = 4; break;
	case "5": countOfmines = 35; difficulty = 5; break;
	default: countOfmines = 10; difficulty = 0;
}

document.getElementById("m1").innerHTML = best;

if (!localStorage.saper_best_score)
	localStorage.setItem('saper_best_score', JSON.stringify(rating));
else
	rating = JSON.parse(localStorage.getItem('saper_best_score'));

function setRating(difficulty, time) {
	if (difficulty == 0) {
		if (+rating.l0 > time || rating.l0 == "∞") {
			showMessage(newRecord);
			rating.l0 = time;
		}
	}
	else if (difficulty == 1) {
		if (+rating.l1 > time || rating.l1 == "∞") {
			showMessage(newRecord);
			rating.l1 = time;
		}
	}
	else if (difficulty == 2) {
		if (+rating.l2 > time || rating.l2 == "∞") {
			showMessage(newRecord);
			rating.l2 = time;
		}
	}
	else if (difficulty == 3) {
		if (+rating.l3 > time || rating.l3 == "∞") {
			showMessage(newRecord);
			rating.l3 = time;
		}
	}
	else if (difficulty == 4) {
		if (+rating.l4 > time || rating.l4 == "∞") {
			showMessage(newRecord);
			rating.l4 = time;
		}
	}
	else if (difficulty == 5) {
		if (+rating.l5 > time || rating.l5 == "∞") {
			showMessage(newRecord);
			rating.l5 = time;
		}
	}
	localStorage.setItem('saper_best_score', JSON.stringify(rating));
}

function getRating() {
	tapFx();
	showMessage(`${arrOfRating[0]}  -  ${rating.l0}\n${arrOfRating[1]}  -  ${rating.l1}\n${arrOfRating[2]}  -  ${rating.l2}\n${arrOfRating[3]}  -  ${rating.l3}\n${arrOfRating[4]}  -  ${rating.l4}\n${arrOfRating[5]}  -  ${rating.l5}\n`);
}

let time = 0;
let settimer;
let smiletimer;
let timer1;
let timer2;
let timer3;
let timer4;
let timer5;
let timer6;
let timer7;
let timer8;
let smile = false;
let sad = false;
let firstStep = false;
let isFlagSets = false;
let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
let flagInterval;
let countFlag;
let main;

function reload() {
	tapFx();
	time = 0;
	smile = false;
	sad = false;
	firstStep = false;
	isFlagSets = false;
	let face = document.getElementById("m3");
	face.className = "facePocker";
	let flag = document.getElementById("m4");
	flag.onmousedown = function () { return false };
	flag.className = "flag";
	let mine = document.getElementById("m5");
	outputMines = countOfmines;
	mine.innerHTML = outputMines;
	clearTimeout(settimer);
	document.getElementById("m2").innerHTML = "0";
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 15; j++) {
			let idNum = `${i}-${j}`;
			let div = document.getElementById(idNum);
			div.className = "divHidden";
			div.innerHTML = "";
			div.style.fontSize = "0px";
			div.onmousedown = function () { firstClick(this.id) };
		}
	}
}

//Секундомер.
function startF() {
	let output = time.toString();
	document.getElementById("m2").innerHTML = output;
	time++;
	settimer = setTimeout("startF()", 1000);
	if (output == "999") {
		lose();
	}
}

//Функция первого клика, установка мин и цифровых значений клеток возле них, задание обработчиков.
function firstClick(id) {
	firstStep = true;
	let divThis = document.getElementById(id)
	let idNumThis = divThis.id;
	divThis.className = "div";
	flag = document.getElementById("m4");
	flag.onmousedown = function () { setFlag() };
	startF();

	//Установка мин.
	for (let i = 0; i < countOfmines; i++) {

		let x = Math.floor(Math.random() * 10);
		let y = Math.floor(Math.random() * 15);
		let idNum = `${x}-${y}`;
		let div = document.getElementById(idNum);

		if ((div.innerHTML == "") && (idNum != idNumThis)) {
			div.innerHTML = "*";
			div.style.fontSize = "0px";
		}
		else
			i--;
	}

	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 15; j++) {
			let idNum = `${i}-${j}`;
			let div = document.getElementById(idNum);
			let count = 0;

			let idNum1 = `${i - 1}-${j - 1}`;
			let div1 = document.getElementById(idNum1);
			if (div1 != null) {
				if (div1.innerHTML == "*")
					count++;
			}
			let idNum2 = `${i}-${j - 1}`;
			let div2 = document.getElementById(idNum2);
			if (div2 != null) {
				if (div2.innerHTML == "*")
					count++;
			}
			let idNum3 = `${i + 1}-${j - 1}`;
			let div3 = document.getElementById(idNum3);
			if (div3 != null) {
				if (div3.innerHTML == "*")
					count++;
			}
			let idNum4 = `${i + 1}-${j}`;
			let div4 = document.getElementById(idNum4);
			if (div4 != null) {
				if (div4.innerHTML == "*")
					count++;
			}
			let idNum5 = `${i + 1}-${j + 1}`;
			let div5 = document.getElementById(idNum5);
			if (div5 != null) {
				if (div5.innerHTML == "*")
					count++;
			}
			let idNum6 = `${i}-${j + 1}`;
			let div6 = document.getElementById(idNum6);
			if (div6 != null) {
				if (div6.innerHTML == "*")
					count++;
			}
			let idNum7 = `${i - 1}-${j + 1}`;
			let div7 = document.getElementById(idNum7);
			if (div7 != null) {
				if (div7.innerHTML == "*")
					count++;
			}
			let idNum8 = `${i - 1}-${j}`;
			let div8 = document.getElementById(idNum8);
			if (div8 != null) {
				if (div8.innerHTML == "*")
					count++;
			}

			if ((count != 0) && (div.innerHTML != "*")) {
				div.innerHTML = count;
				switch (count) {
					case 1: div.style.color = "Blue"; break;
					case 2: div.style.color = "Green"; break;
					case 3: div.style.color = "Red"; break;
					case 4: div.style.color = "DarkBlue"; break;
					case 5: div.style.color = "Brown"; break;
					case 6: div.style.color = "DarkTurquoise"; break;
					case 7: div.style.color = "Purple"; break;
					case 8: div.style.color = "Black"; break;
				}
			}
		}
	}

	if (divThis.innerHTML == "")
		openEmptyFx(idNumThis);
	else
		open(idNumThis);

	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 15; j++) {
			let idNum = `${i}-${j}`;
			let div = document.getElementById(idNum);

			if (div.className == "divHidden") {
				div.onmousedown = function () { open(this.id) };
				div.style.fontSize = "0px";
			}
			else if ((div.className == "div") && (numbers.includes(div.innerHTML))) {
				div.onmousedown = function () { openNear(this.id) };
				div.style.fontSize = side;
			}
			else
				div.onmousedown = function () { return false };
		}
	}
}

//Функция открытия пустых клеток.
function openEmpty(idNum) {
	let div = document.getElementById(idNum);
	div.className = "div";
	div.onmousedown = function () { return false };
	let arr = idNum.split("-");
	let i = +arr[0];
	let j = +arr[1];

	let idNum1 = `${i - 1}-${j - 1}`;
	let div1 = document.getElementById(idNum1);
	if ((div1 != null) && (div1.className != "redFlag")) {
		if (numbers.includes(div1.innerHTML) && (div1.className = "divHidden")) {
			div1.className = "div";
			div1.style.fontSize = side;
			div1.onmousedown = function () { openNear(this.id) };
		}
		else if (div1.innerHTML == "") {
			div1.innerHTML = "&nbsp;";
			openEmpty(idNum1);
		}
	}
	let idNum2 = `${i}-${j - 1}`;
	let div2 = document.getElementById(idNum2);
	if ((div2 != null) && (div2.className != "redFlag")) {
		if (numbers.includes(div2.innerHTML) && (div2.className = "divHidden")) {
			div2.className = "div";
			div2.style.fontSize = side;
			div2.onmousedown = function () { openNear(this.id) };
		}
		else if (div2.innerHTML == "") {
			div2.innerHTML = '&nbsp;';
			openEmpty(idNum2);
		}
	}
	let idNum3 = `${i + 1}-${j - 1}`;
	let div3 = document.getElementById(idNum3);
	if ((div3 != null) && (div3.className != "redFlag")) {
		if (numbers.includes(div3.innerHTML) && (div3.className = "divHidden")) {
			div3.className = "div";
			div3.style.fontSize = side;
			div3.onmousedown = function () { openNear(this.id) };
		}
		else if (div3.innerHTML == "") {
			div3.innerHTML = "&nbsp;";
			openEmpty(idNum3);
		}
	}
	let idNum4 = `${i + 1}-${j}`;
	let div4 = document.getElementById(idNum4);
	if ((div4 != null) && (div4.className != "redFlag")) {
		if (numbers.includes(div4.innerHTML) && (div4.className = "divHidden")) {
			div4.className = "div";
			div4.style.fontSize = side;
			div4.onmousedown = function () { openNear(this.id) };
		}
		else if (div4.innerHTML == "") {
			div4.innerHTML = "&nbsp;";
			openEmpty(idNum4);
		}
	}
	let idNum5 = `${i + 1}-${j + 1}`;
	let div5 = document.getElementById(idNum5);
	if ((div5 != null) && (div5.className != "redFlag")) {
		if (numbers.includes(div5.innerHTML) && (div5.className = "divHidden")) {
			div5.className = "div";
			div5.style.fontSize = side;
			div5.onmousedown = function () { openNear(this.id) };
		}
		else if (div5.innerHTML == "") {
			div5.innerHTML = "&nbsp;";
			openEmpty(idNum5);
		}
	}
	let idNum6 = `${i}-${j + 1}`;
	let div6 = document.getElementById(idNum6);
	if ((div6 != null) && (div6.className != "redFlag")) {
		if (numbers.includes(div6.innerHTML) && (div6.className = "divHidden")) {
			div6.className = "div";
			div6.style.fontSize = side;
			div6.onmousedown = function () { openNear(this.id) };
		}
		else if (div6.innerHTML == "") {
			div6.innerHTML = "&nbsp;";
			openEmpty(idNum6);
		}
	}
	let idNum7 = `${i - 1}-${j + 1}`;
	let div7 = document.getElementById(idNum7);
	if ((div7 != null) && (div7.className != "redFlag")) {
		if (numbers.includes(div7.innerHTML) && (div7.className = "divHidden")) {
			div7.className = "div";
			div7.style.fontSize = side;
			div7.onmousedown = function () { openNear(this.id) };
		}
		else if (div7.innerHTML == "") {
			div7.innerHTML = "&nbsp;";
			openEmpty(idNum7);
		}
	}
	let idNum8 = `${i - 1}-${j}`;
	let div8 = document.getElementById(idNum8);
	if ((div8 != null) && (div8.className != "redFlag")) {
		if (numbers.includes(div8.innerHTML) && (div8.className = "divHidden")) {
			div8.className = "div";
			div8.style.fontSize = side;
			div8.onmousedown = function () { openNear(this.id) };
		}
		else if (div8.innerHTML == "") {
			div8.innerHTML = "&nbsp;";
			openEmpty(idNum8);
		}
	}
	win();
}

function openEmptyFx(idNum) {
	tapFx();
	let div = document.getElementById(idNum);
	div.className = "div";
	div.onmousedown = function () { return false };
	let arr = idNum.split("-");
	let i = +arr[0];
	let j = +arr[1];

	let idNum1 = `${i - 1}-${j - 1}`;
	let div1 = document.getElementById(idNum1);
	if ((div1 != null) && (div1.className != "redFlag")) {
		if (numbers.includes(div1.innerHTML) && (div1.className = "divHidden")) {
			div1.className = "div";
			div1.style.fontSize = side;
			div1.onmousedown = function () { openNear(this.id) };
		}
		else if (div1.innerHTML == "") {
			div1.innerHTML = "&nbsp;";
			openEmpty(idNum1);
		}
	}
	let idNum2 = `${i}-${j - 1}`;
	let div2 = document.getElementById(idNum2);
	if ((div2 != null) && (div2.className != "redFlag")) {
		if (numbers.includes(div2.innerHTML) && (div2.className = "divHidden")) {
			div2.className = "div";
			div2.style.fontSize = side;
			div2.onmousedown = function () { openNear(this.id) };
		}
		else if (div2.innerHTML == "") {
			div2.innerHTML = '&nbsp;';
			openEmpty(idNum2);
		}
	}
	let idNum3 = `${i + 1}-${j - 1}`;
	let div3 = document.getElementById(idNum3);
	if ((div3 != null) && (div3.className != "redFlag")) {
		if (numbers.includes(div3.innerHTML) && (div3.className = "divHidden")) {
			div3.className = "div";
			div3.style.fontSize = side;
			div3.onmousedown = function () { openNear(this.id) };
		}
		else if (div3.innerHTML == "") {
			div3.innerHTML = "&nbsp;";
			openEmpty(idNum3);
		}
	}
	let idNum4 = `${i + 1}-${j}`;
	let div4 = document.getElementById(idNum4);
	if ((div4 != null) && (div4.className != "redFlag")) {
		if (numbers.includes(div4.innerHTML) && (div4.className = "divHidden")) {
			div4.className = "div";
			div4.style.fontSize = side;
			div4.onmousedown = function () { openNear(this.id) };
		}
		else if (div4.innerHTML == "") {
			div4.innerHTML = "&nbsp;";
			openEmpty(idNum4);
		}
	}
	let idNum5 = `${i + 1}-${j + 1}`;
	let div5 = document.getElementById(idNum5);
	if ((div5 != null) && (div5.className != "redFlag")) {
		if (numbers.includes(div5.innerHTML) && (div5.className = "divHidden")) {
			div5.className = "div";
			div5.style.fontSize = side;
			div5.onmousedown = function () { openNear(this.id) };
		}
		else if (div5.innerHTML == "") {
			div5.innerHTML = "&nbsp;";
			openEmpty(idNum5);
		}
	}
	let idNum6 = `${i}-${j + 1}`;
	let div6 = document.getElementById(idNum6);
	if ((div6 != null) && (div6.className != "redFlag")) {
		if (numbers.includes(div6.innerHTML) && (div6.className = "divHidden")) {
			div6.className = "div";
			div6.style.fontSize = side;
			div6.onmousedown = function () { openNear(this.id) };
		}
		else if (div6.innerHTML == "") {
			div6.innerHTML = "&nbsp;";
			openEmpty(idNum6);
		}
	}
	let idNum7 = `${i - 1}-${j + 1}`;
	let div7 = document.getElementById(idNum7);
	if ((div7 != null) && (div7.className != "redFlag")) {
		if (numbers.includes(div7.innerHTML) && (div7.className = "divHidden")) {
			div7.className = "div";
			div7.style.fontSize = side;
			div7.onmousedown = function () { openNear(this.id) };
		}
		else if (div7.innerHTML == "") {
			div7.innerHTML = "&nbsp;";
			openEmpty(idNum7);
		}
	}
	let idNum8 = `${i - 1}-${j}`;
	let div8 = document.getElementById(idNum8);
	if ((div8 != null) && (div8.className != "redFlag")) {
		if (numbers.includes(div8.innerHTML) && (div8.className = "divHidden")) {
			div8.className = "div";
			div8.style.fontSize = side;
			div8.onmousedown = function () { openNear(this.id) };
		}
		else if (div8.innerHTML == "") {
			div8.innerHTML = "&nbsp;";
			openEmpty(idNum8);
		}
	}
	win();
}

let outputMines = countOfmines;
document.getElementById("m5").innerHTML = outputMines;

//Функция простого открытия.
function open(id) {
	let div = document.getElementById(id);
	let idNum = div.id;

	if (!isFlagSets) {
		if (div.className == "redFlag")
			return false;

		else if (div.innerHTML == "*") {
			div.className = "mineDivExplosion";
			lose();
		}
		else if (div.innerHTML == "") {
			openEmptyFx(idNum);
		}
		else {
			tapFx();
			div.className = "div";
			div.style.fontSize = side;
			div.onmousedown = function () { openNear(this.id) };
		}

		win();
	}

	else {
		if (div.className == "divHidden") {
			setFx();
			div.className = "redFlag";
			outputMines--;
			document.getElementById("m5").innerHTML = outputMines;
		}

		else if (div.className == "redFlag") {
			setFx();
			div.className = "divHidden";
			outputMines++;
			document.getElementById("m5").innerHTML = outputMines;
		}
	}
}

//Функция установки флага. Работает только после первого клика.
function setFlag() {
	tapFx();
	let flag = document.getElementById("m4");
	if (firstStep) {
		if (!isFlagSets) {
			isFlagSets = true;
			flag.className = "flagSelected";
		}
		else {
			isFlagSets = false;
			flag.className = "flag";
		}
	}
}

//Функция открытия всех закрытых клеток при установленном рядом флаге.
function openNear(id) {
	tapFx();

	let face = document.getElementById("m3");
	face.className = "faceWow";

	let div = document.getElementById(id);
	let value = +div.innerHTML;
	let idNum = div.id;
	let arr = idNum.split("-");
	let i = +arr[0];
	let j = +arr[1];

	let count = 0;

	let idNum1 = `${i - 1}-${j - 1}`;
	let div1 = document.getElementById(idNum1);
	if (div1 != null) {
		if (div1.className == "redFlag")
			count++;
	}
	let idNum2 = `${i}-${j - 1}`;
	let div2 = document.getElementById(idNum2);
	if (div2 != null) {
		if (div2.className == "redFlag")
			count++;
	}
	let idNum3 = `${i + 1}-${j - 1}`;
	let div3 = document.getElementById(idNum3);
	if (div3 != null) {
		if (div3.className == "redFlag")
			count++;
	}
	let idNum4 = `${i + 1}-${j}`;
	let div4 = document.getElementById(idNum4);
	if (div4 != null) {
		if (div4.className == "redFlag")
			count++;
	}
	let idNum5 = `${i + 1}-${j + 1}`;
	let div5 = document.getElementById(idNum5);
	if (div5 != null) {
		if (div5.className == "redFlag")
			count++;
	}
	let idNum6 = `${i}-${j + 1}`;
	let div6 = document.getElementById(idNum6);
	if (div6 != null) {
		if (div6.className == "redFlag")
			count++;
	}
	let idNum7 = `${i - 1}-${j + 1}`;
	let div7 = document.getElementById(idNum7);
	if (div7 != null) {
		if (div7.className == "redFlag")
			count++;
	}
	let idNum8 = `${i - 1}-${j}`;
	let div8 = document.getElementById(idNum8);
	if (div8 != null) {
		if (div8.className == "redFlag")
			count++;
	}

	if ((count == value) && (div1 != null) && (div1.className == "divHidden")) {
		if (div1.innerHTML == "*") {
			div1.className = "mineDivExplosion";
			lose();
		}
		else if (div1.innerHTML == "")
			openEmpty(idNum1);
		else {
			div1.className = "div";
			div1.style.fontSize = side;
			div1.onmousedown = function () { openNear(this.id) };
		}
	}
	else if ((count != value) && (div1 != null) && (div1.className == "divHidden")) {
		div1.className = "divHiddenHover"
		timer1 = setTimeout(() => div1.className = "divHidden", 100);
	}
	if ((count == value) && (div2 != null) && (div2.className == "divHidden")) {
		if (div2.innerHTML == "*") {
			div2.className = "mineDivExplosion";
			lose();
		}
		else if (div2.innerHTML == "")
			openEmpty(idNum2);
		else {
			div2.className = "div";
			div2.style.fontSize = side;
			div2.onmousedown = function () { openNear(this.id) };
		}
	}
	else if ((count != value) && (div2 != null) && (div2.className == "divHidden")) {
		div2.className = "divHiddenHover"
		timer2 = setTimeout(() => div2.className = "divHidden", 100);
	}
	if ((count == value) && (div3 != null) && (div3.className == "divHidden")) {
		if (div3.innerHTML == "*") {
			div3.className = "mineDivExplosion";
			lose();
		}
		else if (div3.innerHTML == "")
			openEmpty(idNum3);

		else {
			div3.className = "div";
			div3.style.fontSize = side;
			div3.onmousedown = function () { openNear(this.id) };
		}
	}
	else if ((count != value) && (div3 != null) && (div3.className == "divHidden")) {
		div3.className = "divHiddenHover"
		timer3 = setTimeout(() => div3.className = "divHidden", 100);
	}
	if ((count == value) && (div4 != null) && (div4.className == "divHidden")) {
		if (div4.innerHTML == "*") {
			div4.className = "mineDivExplosion";
			lose();
		}
		else if (div4.innerHTML == "")
			openEmpty(idNum4);
		else {
			div4.className = "div";
			div4.style.fontSize = side;
			div4.onmousedown = function () { openNear(this.id) };
		}
	}
	else if ((count != value) && (div4 != null) && (div4.className == "divHidden")) {
		div4.className = "divHiddenHover"
		timer4 = setTimeout(() => div4.className = "divHidden", 100);
	}
	if ((count == value) && (div5 != null) && (div5.className == "divHidden")) {
		if (div5.innerHTML == "*") {
			div5.className = "mineDivExplosion";
			lose();
		}
		else if (div5.innerHTML == "")
			openEmpty(idNum5);
		else {
			div5.className = "div";
			div5.style.fontSize = side;
			div5.onmousedown = function () { openNear(this.id) };
		}
	}
	else if ((count != value) && (div5 != null) && (div5.className == "divHidden")) {
		div5.className = "divHiddenHover"
		timer5 = setTimeout(() => div5.className = "divHidden", 100);
	}
	if ((count == value) && (div6 != null) && (div6.className == "divHidden")) {
		if (div6.innerHTML == "*") {
			div6.className = "mineDivExplosion";
			lose();
		}
		else if (div6.innerHTML == "")
			openEmpty(idNum6);
		else {
			div6.className = "div";
			div6.style.fontSize = side;
			div6.onmousedown = function () { openNear(this.id) };
		}
	}
	else if ((count != value) && (div6 != null) && (div6.className == "divHidden")) {
		div6.className = "divHiddenHover"
		timer6 = setTimeout(() => div6.className = "divHidden", 100);
	}
	if ((count == value) && (div7 != null) && (div7.className == "divHidden")) {
		if (div7.innerHTML == "*") {
			div7.className = "mineDivExplosion";
			lose();
		}
		else if (div7.innerHTML == "")
			openEmpty(idNum7);
		else {
			div7.className = "div";
			div7.style.fontSize = side;
			div7.onmousedown = function () { openNear(this.id) };
		}
	}
	else if ((count != value) && (div7 != null) && (div7.className == "divHidden")) {
		div7.className = "divHiddenHover"
		timer7 = setTimeout(() => div7.className = "divHidden", 100);
	}
	if ((count == value) && (div8 != null) && (div8.className == "divHidden")) {
		if (div8.innerHTML == "*") {
			div8.className = "mineDivExplosion";
			lose();
		}
		else if (div8.innerHTML == "")
			openEmpty(idNum8);
		else {
			div8.className = "div";
			div8.style.fontSize = side;
			div8.onmousedown = function () { openNear(this.id) };
		}
	}
	else if ((count != value) && (div8 != null) && (div8.className == "divHidden")) {
		div8.className = "divHiddenHover"
		timer8 = setTimeout(() => div8.className = "divHidden", 100);
	}

	win();

	if (!sad && !smile) {
		smiletimer = setTimeout(() => face.className = "facePocker", 500);
	}
}

//Функция определения победы.
function win() {
	let count = 0;
	let flag = document.getElementById("m5");
	countFlag = +flag.innerHTML;

	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 15; j++) {
			let idNum = `${i}-${j}`;
			let div = document.getElementById(idNum);
			if (div.innerHTML != "*" && div.className != "div")
				count++;
		}
	}

	if (count == 0) {
		soundPlay("win");
		vibrateLong();
		smile = true;
		clearTimeout(settimer);
		clearTimeout(smiletimer);
		clearTimeout(timer1);
		clearTimeout(timer2);
		clearTimeout(timer3);
		clearTimeout(timer4);
		clearTimeout(timer5);
		clearTimeout(timer6);
		clearTimeout(timer7);
		clearTimeout(timer8);
		let face = document.getElementById("m3");
		face.className = "faceSmile";
		let flag = document.getElementById("m4");
		flag.onmousedown = function () { return false };
		flag.style.backgroundColor = "";
		isFlagSets = false;
		let mine = document.getElementById("m5");
		mine.innerHTML = 0;

		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 15; j++) {
				let idNum = `${i}-${j}`;
				let div = document.getElementById(idNum);
				div.onmousedown = function () { return false };
				if (div.innerHTML == "*")
					div.className = "redFlag"
				else {
					div.style.fontSize = side;
					div.className = "div"
				}
			}
		}
		setTimeout("setRating(difficulty, (time - 1))", 50);
	}
}

//Функция проигрыша.
function lose() {
	soundPlay("lose");
	vibrateLong();
	sad = true;
	clearTimeout(settimer);
	clearTimeout(smiletimer);
	clearTimeout(timer1);
	clearTimeout(timer2);
	clearTimeout(timer3);
	clearTimeout(timer4);
	clearTimeout(timer5);
	clearTimeout(timer6);
	clearTimeout(timer7);
	clearTimeout(timer8);
	let face = document.getElementById("m3");
	face.className = "faceSad";
	let flag = document.getElementById("m4");
	flag.onmousedown = function () { return false };
	flag.style.backgroundColor = "";
	isFlagSets = false;
	let mine = document.getElementById("m5");
	mine.innerHTML = countOfmines;

	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 15; j++) {
			let idNum = `${i}-${j}`;
			let div = document.getElementById(idNum);
			div.onmousedown = function () { return false };
			if (div.innerHTML == '*' && div.className != "mineDivExplosion")
				div.className = "mineDiv";
			else if (div.innerHTML != '*' && div.className == "redFlag")
				div.className = "redFlagWrong";
		}
	}
}