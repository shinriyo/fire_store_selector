(function (loadedListener) {

  function myFunction(num) {
    var ids = document.getElementsByClassName('click-target-id');
    
    var no = 0;
    for(var i = 0; i < ids.length; i++) {
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
    document.addEventListener('keydown', function(event) {
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
} );
