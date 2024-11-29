function isDarkMode() {
	return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
const body = document.body;
console.log(isDarkMode());
if(isDarkMode() == true){
	body.style.setProperty('--theme', '#000000');
	body.style.setProperty('--theme_b', '#888888');
	body.style.setProperty('--theme_r', '#ffffff');
}else{
	body.style.setProperty('--theme', '#ffffff');
	body.style.setProperty('--theme_b', '#aaaaaa');
	body.style.setProperty('--theme_r', '#000000');
}