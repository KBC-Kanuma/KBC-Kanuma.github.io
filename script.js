function isDarkMode() {
	return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
const body = document.body;
console.log(isDarkMode());
if(isDarkMode() == true){
	body.style.setProperty('--background_image', 'url(background_b.png)');
	body.style.setProperty('--theme', '#000000');
}else{
	body.style.setProperty('--background_image', 'url(background.png)');
	body.style.setProperty('--theme', '#ffffff');
}