/**
 * Выполнение операций
 * при загрузке страницы
 */
window.onload = function ()
{
  // Передача UTM меток на сервер
	let utm = window.location.search.replace( '?', '');
	let ref = location.protocol + '//' + location.host + location.pathname;
	let forms = document.getElementsByTagName('form');

	if (utm != false) {
		for (let i=0; i<forms.length; i++) {
      let actionUrl = forms[i].getAttribute("action");
      if (actionUrl.indexOf("?")>-1){
        actionUrl = actionUrl.substring(0, actionUrl.indexOf("?"));
      }
			forms[i].action = (actionUrl+'?'+utm+'&referer='+ref);
		}
	}
	else {
		for (let i=0; i<forms.length; i++) {
      let actionUrl = forms[i].getAttribute("action");
      if (actionUrl.indexOf("?")>-1){
        actionUrl = actionUrl.substring(0, actionUrl.indexOf("?"));
      }
			forms[i].action = (actionUrl+'?referer='+ref);
		}
	}

	// Передача Google Client ID на серевер
	let gcid = ga.getAll()[0].get('clientId');
  let gcidInputs = document.getElementsByName('client_id');
  if (gcidInputs != false) {
    for (let i=0; i<gcidInputs.length; i++) {
      gcidInputs[i].value = gcid;
    }
  }

	// Передача Facebook Browser ID на серевер
	let fbp = getCookie('_fbp');
  let fbpInputs = document.getElementsByName('fbp');
  if (fbpInputs != false) {
    for (let i=0; i<fbpInputs.length; i++) {
      fbpInputs[i].value = fbp;
    }
  }

}

/**
 * Функция используется на лендингах,
 * где у пользователя есть выбор товара
 */
function setModel(item_id, item_name, product_sum=false, item_type=false) {
	document.getElementById(item_id).value = item_name;
	if (product_sum != false) {
		document.getElementById('product_sum').value = product_sum;
	}
	if (item_type != false) {
		$(item_id).after('<input type="hidden" name="product_type" value="'+item_type+'" />');
	}
}

/**
 * Функция возвращает значение Cookie
 */
function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

/**
 * Функция записывает в Cookie метку о том,
 * что форма была отправлена. Используется
 * для уменьшения количесвтва дублей заявок.
 *
 */
function sendForm()
{
    var cookie_date = new Date ( );
    cookie_date.setTime ( cookie_date.getTime() + (5*60*1000) );
    var nameCookie = "sendForm";
    var valueCookie = "Y";

    document.cookie=nameCookie+"="+escape(valueCookie)+";expires=" + cookie_date.toGMTString();
}

/**
 * Функция возвращает GET-параметр из URL
 */
function $_GET(key) {
	var p = window.location.search;
	p = p.match(new RegExp(key + '=([^&=]+)'));
	return p ? p[1] : false;
}
