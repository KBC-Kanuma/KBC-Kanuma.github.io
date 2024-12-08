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
// ページチェンジ
function change_pages(m_, f) {
	function show_pages(data) {
		const old_box = document.querySelector("#main");
		const new_box = document.createElement("div");
		new_box.innerHTML = data;
		new_box.id = "main";
		old_box.replaceWith(new_box);
	}


	// ページの内容を切り替え
	function show_pages_(type) {
		const validTypes = ["home", "adv", "works", "manual", "issues", "files", "base", "loading"];
		if (!validTypes.includes(type)) {
			console.error(`Invalid page type: ${type}`);
			return false;
		}

		// 既にデータがある場合はそのまま表示
		if (window[`${type}_data`]) {
			const data = window[`${type}_data`][0]["html"];
			console.log(`Using cached data for: ${type}`);
			show_pages(data);
		} else {
			// データを非同期でロード
			if (type == "loading") {
				show_pages('<div class="loading-pages"><div class="loading-container"><div class="shape1"></div><div class="shape2"></div><div class="shape3"></div><div class="shape4"></div><div class="shape5"></div><div class="shape6"></div><div class="shape7"></div><div class="shape8"></div></div></div>');

			} else {
				load_pages(type)
					.then((data) => {
						const html = data[0]["html"];
						window[`${type}_data`] = data; // キャッシュに保存
						console.log(`Loaded data for: ${type}`);
						show_pages(html);
					})
					.catch((err) => {
						console.error(`Failed to load data for: ${type}`, err);
					});
			}
		}
	}
	if (f == true) {
		// ローディング画面を表示
		show_pages_('loading');
		//本命
		setTimeout(function () {
			show_pages_(m_);
		}, 3000);
	} else {
		// ローディング画面を表示
		show_pages_('loading');
		show_pages_(m_);
	}

}

// ページデータをロード
function load_pages(type) {
	return fetch(`./${type}.json`)
		.then((response) => {
			if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
			return response.json();
		})
		.then((obj) => {
			console.log("Loaded object:", obj);
			return obj;
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
	change_pages(mode, true);
}


/*!
 * --直列回路実行コーナ--
 * loadAndExecute
 */

loadAndExecute();