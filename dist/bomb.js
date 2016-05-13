'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;
(function (factory, win) {
  win.Bomb = win.Bomb || factory(win);
})(function (win) {

  var $wrap = document.createElement('div'); // 临时的dom元素

  var Bomb = function () {
    /**
     * 入口
     * @param  {NodeElement}  $img    需要爆炸的图片
     * @param  {JSON}         config  一些配置项 有默认值
     * @return Bomb
     */

    function Bomb($img) // 默认50列
    {
      var config = arguments.length <= 1 || arguments[1] === undefined ? {
        x: 50, // 默认每行50个
        y: 50 } : arguments[1];

      _classCallCheck(this, Bomb);

      this.config = config;
      this.$img = $img;

      this.setInfo();

      this.buildMasks();
    }

    _createClass(Bomb, [{
      key: 'setInfo',
      value: function setInfo() {
        var $img = this.$img;
        var computedStyle = win.getComputedStyle(this.$img);
        this.imgWidth = parseFloat(computedStyle.width);
        this.imgHeight = parseFloat(computedStyle.height);
        this.imgTop = parseFloat($img.offsetTop);
        this.imgLeft = parseFloat($img.offsetLeft);
        this.ammoWidth = this.imgWidth / this.config.x;
        this.ammoHeight = this.imgHeight / this.config.y;
      }
    }, {
      key: 'buildMasks',
      value: function buildMasks() {

        var ammoWidth = this.ammoWidth;
        var ammoHeight = this.ammoHeight;
        var halfX = this.config.x / 2;
        var halfY = this.config.y / 2;
        var ammo = document.createDocumentFragment();

        var index = 0;
        var len = this.config.x * this.config.y;
        for (; index < len; index++) {
          var y = index / this.config.x | 0;
          var x = index - y * this.config.x;
          var top = y * ammoHeight;
          var left = x * ammoWidth;

          ammo.appendChild(create('div', {
            'class': 'bomb-mask bomb-' + (x < halfX ? 'left' : 'right') + ' bomb-' + (y < halfY ? 'top' : 'bottom'),
            style: {
              width: ammoWidth + 'px',
              height: ammoHeight + 'px',
              top: top + 'px',
              left: left + 'px',
              background: 'url(' + this.$img.src + ') no-repeat',
              'background-size': this.imgWidth + 'px ' + this.imgHeight + 'px',
              'background-position': '-' + left + 'px -' + top + 'px',
              position: 'absolute'
            }
          }));
        }

        this.$img.parentNode.appendChild(ammo);
        this.$img.style.display = 'none';

        var self = this;
        setTimeout(function () {
          self.bomb();
        }, 1000);
      }
    }, {
      key: 'bomb',
      value: function bomb() {
        var $container = this.$img.parentNode;
        var masks = $container.querySelectorAll('.bomb-mask');
        var width = this.imgWidth;
        var height = this.imgHeight;
        var index = 0;
        var len = masks.length;
        for (; index < len; index++) {
          var item = masks[index];
          var bombWidth = (Math.random() * 10 | 0) * width;
          var bombHeight = (Math.random() * 10 | 0) * height;
          if (item.classList.contains('bomb-left')) {
            bombWidth = ~bombWidth + 1;
          }
          if (item.classList.contains('bomb-top')) {
            bombHeight = ~bombHeight + 1;
          }
          item.setAttribute('style', item.getAttribute('style') + ';transform: translate3d(' + bombWidth + 'px, ' + bombHeight + 'px, 0); opacity: 0; border-radius: 50%;');
        }
      }
    }]);

    return Bomb;
  }();

  /**
   * 生成dom元素
   * @param  {string} tag  dom的标签名
   * @param  {object} attr 一个属性的集合
   * @return {Element}     生成后的dom元素
   */


  function create(tag, attr) {
    var str = '';
    str += '<' + tag;
    for (var key in attr) {
      var item = attr[key];
      // 属性值不为object 应当生成如下格式 key="item"
      if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object') {
        str += ' ' + key + '="' + item + '" ';
      } else {
        str += ' ' + key + '=" ';
        for (var aKey in item) {
          var aItem = item[aKey];
          str += ' ' + aKey + ': ' + aItem + '; ';
        }
        str += ' "';
      }
    }
    str += '/>';
    $wrap.innerHTML = str;
    return $wrap.removeChild($wrap.firstChild);
  }

  return Bomb;
}, window);