/*!
 * Space
 * © 2024 KanumaHighSchool Broadcasting Club. All rights reserved.
 * kbc-kanuma.github.io
 */

const body = document.body;

/*!
 * --Jquery読み込みコーナー--
 * load_jquery
 */

function load_jquery() {
	return new Promise((resolve) => {
		const jquery_script = document.createElement('script');
		jquery_script.src = "jquery-3.7.1.min.js";
		jquery_script.onload = () => resolve();
		document.body.appendChild(jquery_script);
	});
}

/*!
 * --定義コーナー--
 * definitions
*/
function definitions() {
	isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	isPC = !(navigator.userAgent.match(/iPhone|Android.+Mobile/));
	mode = url_pram("r", "m");
	mode_serond = url_pram("r", "s");
	id = url_pram("r", "i");

}


/*!
 * --分岐コーナー--
 * branch
 */

function branch() {
	if (isDarkMode == true) {
		body.style.setProperty('--theme', '#000000');
		body.style.setProperty('--theme_b', '#888888');
		body.style.setProperty('--theme_r', '#ffffff');
	} else {
		body.style.setProperty('--theme', '#ffffff');
		body.style.setProperty('--theme_b', '#aaaaaa');
		body.style.setProperty('--theme_r', '#000000');
	}

	if (isPC == false) {
		$('.header_pc').hide();
		$('.dotnet').show();
	}
	console.log(mode);
	if (mode == null) {
		url_pram("w", "m", "home");
		mode = "home";
	}

}


/*!
 * --その他関数--
 * (others)
 */

//URLパラメーター変更

function url_pram(t, i, f) {
	const url_p = new URLSearchParams(location.search)
	if (t == "r") {
		return url_p.get(i)
	}
	if (t == "w") {
		url_p.set(i, f);
		history.replaceState("", "", `?${url_p.toString()}`);
		return
	}

	if (t == !"r" && t == !"w") {
		return false
	}

}

//ページチェンジ

function change_pages(m_) {
	function show_pages(data) {
		const old_box = document.querySelector("#main");
		const new_box = document.createElement("div");
		new_box.innerHTML = data;
		new_box.id = "main";
		old_box.replaceWith(new_box);
		return
	}
	show_pages('<div class="loading-container"><div class="shape1"></div><div class="shape2"></div><div class="shape3"></div><div class="shape4"></div><div class="shape5"></div><div class="shape6"></div><div class="shape7"></div><div class="shape8"></div></div>');
	function show_pages_(type) {
		if (type == "home" || type == "adv" || type == "works" || type == "manual" || type == "issues" || type == "files" || type == "base") {
			if (!window[`${type}_data`]) {
				async function run_strict() {
					console.log(`${type}=load_pages("${type}")`);
					await eval(`${type}=load_pages("${type}")`);
					let data = window[`${type}_data`].html;
					console.log(data);
					show_pages(data);
				}
				run_strict();
			} else {
				let data = window[`${type}_data`];
				show_pages(data);
			}
		} else {
			return false
		}
	}
	show_pages_(m_);
}


//読み込み

function load_pages(type) {
		fetch(`./${type}.json`)
			.then((data) => data.json())
			.then((obj) => {
				let code = obj;
				return code
			});


}


/*!
 * --asynkコーナー--
 * Promise.resolve
*/

async function loadAndExecute() {
	await load_jquery();
	definitions();
	branch();
}


/*!
 * --直列回路実行コーナ--
 * loadAndExecute
 */

loadAndExecute();