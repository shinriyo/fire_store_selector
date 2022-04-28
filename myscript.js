(function (loadedListener) {
  // TimeStamp用
  const jsInitCheckTimerForTimeStamp = setInterval(fixTimeStamp, 500);

  const fixer = function (elm) {
    const timestamp = elm.value;
    const isMorning = timestamp.includes(' 午前');
    const isNight = timestamp.includes(' 午後');
    if (isMorning) {
      const splited = timestamp.split(' ')[0];
      console.log(splited);
      elm.value = splited;
    } else if (isNight) {
      const splited = timestamp.split(' ')[0];
      const origHour = splited.split(':')[0];
      const hour = String(parseInt(origHour) + 12);
      const replaced = splited.replace(`${origHour}:`, `${hour}:`)
      console.log(splited);
      elm.value = replaced;
    }
  }

  function fixTimeStamp() {
    const elms = document.getElementsByClassName('add-timestamp-time');
    if (elms && elms.length > 0) {
      const elm = elms[0];
      fixer(elm);
    }
  }

  function copyClipboard(e) {
    // 1秒ごとに
    const jsInitCheckTimer = setInterval(jsLoaded, 1000);
    function jsLoaded() {
      // 取得したい要素
      // console.log($('.container-text'));
      if ($('.container-text') != null) {
        // clearInterval(jsInitCheckTimer);
        // テキストたち
        var texts = $('.container-text');
        for (var i = 0; i < texts.length; i++) {
          texts[i].onclick = function () {
            var title = $(this).attr("title");
            // クリップボードでエラーさせないおまじない
            // http://var.blog.jp/archives/79909512.html?fbclid=IwAR3iSXkDy_aHB9HgquBF5Rc93GeZKPrde74I-gvwiqjy1ud8BibV96E6Q2g
            setTimeout(async () => {
              await navigator.clipboard.writeText(title);
              // Toastをだす
              iqwerty.toast.toast(`${title}をコピーしました`);
            }, 1000);
          }
        }
      }
    }
  };

  window.addEventListener("load", copyClipboard, false);

  // 矢印キーからの
  function myFunction(num) {
    var ids = document.getElementsByClassName('click-target-id');

    var no = 0;
    for (var i = 0; i < ids.length; i++) {
      var element = ids[i].parentElement.parentElement;
      if (element.className.includes('selected')) {
        no = i;
        break;
      }
    }

    if (ids != null) {
      var idx = no + num;
      if (idx < 0 || idx >= ids.length) {
        return;
      }

      ids[idx].click();
    }
  }

  var doc, readyState;

  doc = document;
  readyState = doc.readyState;

  if (readyState === 'complete' || readyState === 'interactive') {
    loadedListener();
    // 矢印キー
    document.addEventListener('keydown', function (event) {
      if (event.code == 'ArrowUp') {
        // 上
        myFunction(-1);
      } else if (event.code == 'ArrowDown') {
        // 下
        myFunction(+1);
      }
    });
  } else {
    doc.addEventListener("DOMContentLoaded", loadedListener, false);
  }
})(function () {
});
