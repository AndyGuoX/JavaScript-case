/**
 * @name easy-date-picer
 * @description 日期选择插件
 * @date 2020-07-30
 * @author andyguo
 */

/**
 * 工具函数集合 created by andyguo
 */
var utils = (function () {
  /**
   * @name: 工具类函数集合
   * @author: andyGuo
   * @version: 1.0
   * @description: 常用工具类
   * @dateTime: 2020-7-20
   */

  /**
   * @name: domOperateTools
   * @description: dom操作相关工具函数
   */
  var domOperateTools = {
    /**
     * @name: addEvent
     * @description: 事件绑定 - 兼容ie
     * @param el:HTMLElement 绑定元素
     * @param type:string 绑定类型
     * @param fn:function 绑定函数
     * @param capture:boolean true为捕获，默认false为冒泡
     */
    addEvent: function (el, type, fn, capture) {
      capture = capture || false;
      if (el.addEventListener) {
        el.addEventListener(type, fn, capture);
      } else if (el.attachEvent) {
        el.attachEvent('on' + type, function () {
          fn.call(el);
        });
      } else {
        el['on' + type] = fn;
      }
    },

    /**
     * @name: removeEvent
     * @description: 接触事件绑定 - 兼容ie
     * @param elem:HTMLElement 解绑元素
     * @param type:string 解绑类型
     * @param fn:function 解绑函数
     */
    removeEvent: function (elem, type, fn) {
      if (elem.addEventListener) {
        elem.removeEventListener(type, fn, false);
      } else if (elem.attachEvent) {
        elem.detachEvent('on' + type, fun);
      } else {
        elem['on' + type] = null;
      }
    },

    /**
     * @name: pagePos
     * @description: 获取鼠标在文档的位置
     * @param e:MouseEvent
     * @returns {{X: number, Y: number}}
     */
    pagePos: function (e) {
      e = e || window.event;
      var sLeft = getScrollOffset().left,
          sTop  = getScrollOffset().top,
          cLeft = document.documentElement.clientLeft || 0,
          cTop  = document.documentElement.clientTop || 0;

      return {
        X: e.clientX + sLeft - cLeft,
        Y: e.clientY + sTop - cTop
      };
    },

    /**
     * @name: getScrollOffset
     * @description: 获取滚动条滚动距离 - 兼容ie
     * @returns {{top: number, left: number}}
     */
    getScrollOffset: function () {
      if (window.pageXOffset) {
        return {
          left: window.pageXOffset,
          top: window.pageYOffset
        };
      } else {
        return {
          left: document.body.scrollLeft + document.documentElement.scrollLeft,
          top: document.body.scrollTop + document.documentElement.scrollTop
        };
      }
    },

    /**
     * @name: getViewportSize
     * @description: 获取可视窗口的大小 - 兼容ie
     * @returns {{width: number, height: number}}
     */
    getViewportSize: function () {
      if (window.innerWidth) {
        return {
          width: window.innerWidth,
          height: window.innerHeight
        };
      } else {
        if (document.compatMode === 'BackCompat') {
          return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
          };
        } else {
          return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
          };
        }
      }
    },

    /**
     * @name: getScrollSize
     * @description: 获取整个html文档的大小 - 兼容ie
     * @returns {{width: number, height: number}}
     */
    getScrollSize: function () {
      if (document.body.scrollWidth) {
        return {
          width: document.body.scrollWidth,
          height: document.body.scrollHeight
        };
      } else {
        return {
          width: document.documentElement.scrollWidth,
          height: document.documentElement.scrollHeight
        };
      }
    },

    /**
     * @name: getStyles
     * @description: 获取css样式 - 兼容ie
     * @param elem:HTMLElement 获取元素
     * @param prop:string 获取的属性
     * @returns {string|CSSStyleDeclaration|*}
     */
    getStyles: function (elem, prop) {
      var map = ['width', 'height', 'left', 'right', 'top', 'bottom', 'opacity'];
      if (window.getComputedStyle) {
        if (prop) {
          if (map.indexOf(prop) !== -1) {
            return parseInt(window.getComputedStyle(elem, null)[prop]);
          } else {
            return window.getComputedStyle(elem, null)[prop];
          }
        } else {
          return window.getComputedStyle(elem, null);
        }
      } else {
        if (prop) {
          return elem.currentStyle[prop];
        } else {
          return elem.currentStyle;
        }
      }
    },

    /**
     * @name: cancelBubble
     * @description: 阻止冒泡行为 - 兼容ie
     * @param e:MouseEvent
     */
    cancelBubble: function (e) {
      e = e || window.event;
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    },

    /**
     * @name: preventDefaultEvent
     * @description: 阻止默认行为 - 兼容ie
     * @param e:MouseEvent
     */
    preventDefaultEvent: function (e) {
      e = e || window.event;
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    },

    /**
     * @name: elemChildren
     * @description: 获取子元素列表
     * @param element:HTMLElement
     * @returns {[]}
     */
    elemChildren: function (element) {
      var arr      = [],
          children = element.childNodes;

      for (var i = 0; i < children.length; i++) {
        var childItem = children[i];
        if (childItem.nodeType === 1) {
          arr.push(childItem);
        }
      }

      return arr;
    },

    /**
     * @name: insertAfter
     * @description: 向元素之前插入元素
     * @param target:HTMLElement 被插入的元素
     * @param afterNode:HTMLElement 插入到谁的后面
     */
    insertAfter: function (target, afterNode) {
      var nextElem = afterNode.nextElementSibling;
      if (nextElem) {
        this.insertBefore(target, nextElem);
      } else {
        this.appendChild(target);
      }
    },

    /**
     * @name: getElemDocPosition
     * @description: 获取元素距离文档的top和left值
     * @param el:HTMLElement
     * @returns {{top: number, left: number}}
     */
    getElemDocPosition: function (el) {
      var parent     = el.offsetParent,
          offsetLeft = el.offsetLeft,
          offsetTop  = el.offsetTop;
      while (parent) {
        offsetLeft += parent.offsetLeft;
        offsetTop += parent.offsetTop;
        parent = parent.offsetParent;
      }
      return {
        left: offsetLeft,
        top: offsetTop
      };
    },

    /**
     * @name: elemParent
     * @description: 寻找第n层父元素
     * @param element:HTMLElement
     * @param n
     * @returns {HTMLElement}
     */
    elemParent: function (element, n) {
      n = n || 1;
      var _parentNode = element;

      if (n < 0 || typeof n !== 'number') return undefined;

      for (var i = 0; i < n; i++) {
        var _parent_ = _parentNode.parentNode;
        _parentNode = _parent_;
        if (!_parent_) break;
      }

      return _parentNode;
    },
    animate: function (ele, opt, time, callback) {
      // 记录定时器的数量
      ele.timerLen = 0;
      for (var attr in opt) {
        if (opt.hasOwnProperty(attr)) {
          (function (attr) {
            ele.timerLen++;
            var timerName  = attr + 'Timer', // 计时器名称
                start      = domOperateTools.getStyles(ele, attr), // 初始值
                target     = opt[attr], // 目标值
                createTime = new Date(); // 开始运动的时间

            clearInterval(ele[timerName]);
            ele[timerName] = setInterval(function () {
              var unit      = attr === 'opacity' ? '' : 'px', // 单位
                  passTime  = new Date() - createTime, // 已经经过的时间
                  passRatio = passTime / time > 1 ? 1 : passTime / time, // 经过时间占总时间的比例
                  toValue   = (target - start) * passRatio + start; // 应该设置的值

              // 属性赋值
              ele.style[attr] = toValue + unit;

              // 目标判断
              if (toValue === target) {
                // 运动完成，清除计时器，减少定时器数量并且调用完成的回调
                clearInterval(ele[timerName]);
                ele.timerLen--;
                if (typeof callback === 'function' && ele.timerLen === 0) {
                  // callback为函数，且所以动画结束
                  callback();
                }
              }
            }, 20);
          })(attr);
        }
      }
    }
  };

  /**
   * @name: commonTools
   * @description: 常用工具函数
   */
  var commonTools = {
    /**
     * @name: getType
     * @description: 获取变量的准确类型
     * @param val
     * @returns {"undefined"|"boolean"|"number"|"string"|"function"|"object"|"array"|"object-number"
     *           |"object-string"|"object-boolean"|"regexp"|"date"}
     */
    getType: function (val) {
      var type  = typeof val,
          toStr = Object.prototype.toString;
      var resMap = {
        '[object Object]': 'object',
        '[object Array]': 'array',
        '[object Number]': 'object-number',
        '[object String]': 'object-string',
        '[object Boolean]': 'object-boolean',
        '[object RegExp]': 'regexp',
        '[object Date]': 'date'
      };
      if (val === null) {
        return 'null';
      } else if (type === 'object') {
        var res = toStr.call(val);
        return resMap[res];
      } else {
        return type;
      }
    },

    /**
     * @name: deepClone
     * @description: object 深拷贝
     * @param origin:object 要拷贝的数组
     * @returns {object} 新数组
     */
    deepClone: function (origin) {
      var map = new WeakMap(); // 弱引用，垃圾回收会自动收回这部分内存
      if (typeof origin === 'object') {
        var tar = origin instanceof Array ? [] : {};
        if (map.get(origin)) {
          return map.get(origin);
        }
        map.set(origin, tar);
        for (var key in origin) {
          if (origin.hasOwnProperty(key)) {
            if (origin[key] !== null) { // 不是null
              tar[key] = deepClone(origin[key]);
            } else {
              tar[key] = null;
            }
          }
        }
        return tar;
      } else {
        return origin;
      }
    },

    /**
     * @name throttle
     * @description 节流函数，delay秒内只触发一次
     * @param fn 被节流的函数
     * @param delay 节流的时长
     * @returns {function(...[*]=)} 节流完毕的函数
     */
    throttle: function (fn, delay) {
      var t     = null,
          begin = new Date().getTime();

      return function () {
        var _self = this,
            args  = arguments,
            cur   = new Date().getTime();

        clearTimeout(t);

        if (cur - begin >= delay) {
          fn.apply(_self, args);
          begin = cur;
        } else {
          t = setTimeout(function () {
            fn.apply(_self, args);
          }, delay);
        }
      };
    }
  };

  /**
   * @name: netWorkTools
   * @description: 常用网络工具函数
   */
  var netWorkTools = {
    /**
     * @name ajax
     * @description 原生封装ajax请求
     * @param opt:object 配置项 {url必填 | type = 'GET' | dataType = 'JSON '| data = null | async = true
     *                          success = function(){成功回调} | error = function(){失败回调} | complete = function(){完成回调}}
     */
    ajax: function (opt) {
      opt = opt || {};
      var o = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP'),
          t = null;

      if (!o) {
        throw new Error('您的浏览器不支持发起异步HTTP请求');
      }

      var type          = (opt.type || 'GET').toUpperCase(),
          async         = '' + opt.async === 'false' || true,
          url           = opt.url,
          data          = opt.data || null,
          dataType      = opt.dataType || 'JSON',
          jsonp         = opt.jsonp || 'cb',
          jsonpCallback = opt.jsonpCallback || 'jQuery' + randomNum() + '_' + new Date().getTime(),
          error         = opt.error || function () {},
          success       = opt.success || function () {},
          complete      = opt.complete || function () {},
          timeout       = opt.timeout || 30000;

      if (!url) {
        throw new Error('您没有填写URL');
      }

      if (dataType.toUpperCase() === 'JSONP') {
        if (type !== 'GET') {
          throw new Error('JSONP expect GET method');
        } else {
          var oScript = document.createElement('script');
          oScript.src = url.indexOf('?') === -1 ?
            url + '?' + jsonp + '=' + jsonpCallback :
            url + '&' + jsonp + '=' + jsonpCallback;
          window[jsonpCallback] = function (data) {
            success(data);
          };
          document.body.appendChild(oScript);
          document.body.removeChild(oScript);
          return null;
        }
      }

      o.onreadystatechange = function () {
        if (o.readyState === 4) {
          if (o.status >= 200 && o.status < 300 || o.status === 304) {
            switch (dataType.toUpperCase()) {
              case 'JSON':
                success(JSON.parse(o.responseText));
                break;
              case 'TEXT':
                success(o.responseText);
                break;
              case 'XML':
                success(o.responseXML);
                break;
              default:
                success(JSON.parse(o.responseText));
            }
          } else {
            error();
          }
          _done();
        }
      };

      o.open(type, url, async);
      type === 'POST' && o.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      o.send(type === 'GET' ? null : formatData(data));

      t = setTimeout(function () {
        o.abort();
        _done();
        throw new Error('请求超时' + url);
      }, timeout);

      function _done() {
        clearTimeout(t);
        t = null;
        o = null;
        complete();
      }

      function formatData(obj) {
        var str = '';
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            str += key + '=' + obj[key] + '&';
          }
        }
        return str.replace(/&$/, '');
      }

      function randomNum() {
        var num = '';
        for (var i = 0; i < 20; i++) {
          num += Math.floor(Math.random() * 10);
        }
        return num;
      }
    }
  };

  /**
   * @name getChildElement
   * @description 获取子元素
   * @param num:number 第几个子元素
   * @returns {HTMLElement} num为数字返回一个，num不存在或不为数字返回所有子元素
   */
  HTMLElement.prototype.getChildElement = function (num) {
    var children     = this.childNodes,
        _elementNode = [],
        item;

    // 有参数
    for (var i = 0; i < children.length; i++) {
      item = children[i];
      if (item.nodeType === 1) {
        _elementNode.push(item);
      }
    }

    return typeof num === 'number' ? _elementNode[num] : _elementNode;
  };

  /**
   * @name getParentElement
   * @description 获取第几层父级元素
   * @param n:number 第几层
   * @returns {ParentNode||undefined} n不为数字或小于零活不存在父级元素返回undefined
   */
  HTMLElement.prototype.getParentElement = function (n) {
    n = n || 1;
    var elem        = this,
        _parentNode = elem.parentNode;

    if (n < 0 || typeof n !== 'number') return undefined;

    for (var i = 0; i < n; i++) {
      if (!_parentNode) return undefined;
      _parentNode = _parentNode.parentNode;
    }

    return _parentNode;
  };

  return {
    domOperateTools,
    commonTools,
    netWorkTools
  };
})();

;(function (doc) {
  const {addEvent} = utils.domOperateTools;
  const EasyDatePicker = function (opt) {
    let defaultOpt = {
      container: 'J_easy_date_picker',
      defaultValue: '2020-07-29',
      ranges: '',
      // format: 'YYYY-MM-DD',
      supportRange: false,
      animate: false,
      onChange: function () {}
    };

    opt = Object.assign(defaultOpt, opt);

    if (typeof (opt.container) !== 'string') throw new Error('The parameter container expects a string');

    // 初始化配置参数
    for (let key in opt) {
      if (opt.hasOwnProperty(key)) {
        this[key] = opt[key];
      }
    }

    this.pickerContent = doc.querySelector('.picker-content tbody');
    this.tdList = this.pickerContent.getElementsByTagName('td');

    this.superPreBtn = doc.getElementsByClassName('J-super-pre-btn')[0];
    this.preBtn = doc.getElementsByClassName('J-pre-btn')[0];
    this.superNextBtn = doc.getElementsByClassName('J-super-next-btn')[0];
    this.nextBtn = doc.getElementsByClassName('J-next-btn')[0];

    this.yearBtn = doc.getElementsByClassName('J-picker-year-btn')[0];
    this.monthBtn = doc.getElementsByClassName('J-picker-month-btn')[0];

    this.todyBtn = doc.getElementsByClassName('J-picker-today-btn')[0];
    this.clearBtn = doc.getElementsByClassName('J-picker-today-btn')[0];

    this.curYear = 0;
    this.curMonth = 0;

    this.selectYear = 0;
    this.selectMonth = 0;
    this.selectDay = 0;
  };

  EasyDatePicker.prototype = {
    // 面板显示日期个数
    panelDateNum: 42,
    // 初始化
    init() {
      this.initOpt();
      this.bindEvent();
    },

    // 事件绑定
    bindEvent() {
      const _self = this;

      // 上一年
      addEvent(_self.superPreBtn, 'click', () => {
        _self.curYear--;
        _self.toYearMonth(_self.curYear, _self.curMonth);
      });

      // 下一年
      addEvent(_self.superNextBtn, 'click', () => {
        _self.curYear++;
        _self.toYearMonth(_self.curYear, _self.curMonth);
      });

      // 上一个月
      addEvent(_self.preBtn, 'click', () => {
        _self.curMonth--;
        if (_self.curMonth === 0) {
          _self.curMonth = 12;
          _self.curYear--;
        }
        _self.toYearMonth(_self.curYear, _self.curMonth);
      });

      // 下一个月
      addEvent(_self.nextBtn, 'click', () => {
        _self.curMonth++;
        if (_self.curMonth === 13) {
          _self.curMonth = 1;
          _self.curYear++;
        }

        _self.toYearMonth(_self.curYear, _self.curMonth);
      });

      // 选择日期
      addEvent(_self.pickerContent, 'click', (e) => {
        _self.selectDate(e);
      });

      // 选择今天
      addEvent(_self.todyBtn, 'click', () => {
        const todayDateObj = _self.generateNowDate();
        _self.curYear = _self.selectYear = todayDateObj.year;
        _self.curMonth = _self.selectMonth = todayDateObj.month;
        _self.selectDay = todayDateObj.day;
        _self.toYearMonth(todayDateObj.year, todayDateObj.month);

      });
    },

    // 切换到某年某月
    toYearMonth(toYear, toMonth) {
      const _self = this;
      let toDay = 0;
      if (toYear === _self.selectYear && toMonth === _self.selectMonth) toDay = _self.selectDay;
      _self.yearBtn.innerText = _self.curYear + '年';
      _self.monthBtn.innerText = _self.curMonth + '月';
      _self.removeDatePanel();
      _self.generateDatePanel({
        year: toYear,
        month: toMonth,
        day: toDay
      });
    },

    // 配置 opt
    initOpt() {
      const _self = this;
      let dateObj = _self.strToDate(_self.defaultValue);
      _self.curYear = _self.selectYear = dateObj.year;
      _self.curMonth = _self.selectMonth = dateObj.month;
      _self.selectDay = dateObj.day;

      _self.generateDatePanel(dateObj);
    },

    // 选择日期
    selectDate(e) {
      e = e || window.event;
      const _self      = this,
            tar        = e.target || e.srcElement,
            tagName    = tar.tagName.toLowerCase(),
            className  = tar.className.toLowerCase(),
            isTd       = tagName === 'td',
            isInnerDiv = className.includes('picker-cell-inner');

      let tdElem  = tar,
          dateStr = '',
          dateObj = {};

      if (isInnerDiv) {
        tdElem = tar.parentNode;
      }

      if (isTd || isInnerDiv) {
        dateStr = tdElem.getAttribute('title');
        dateObj = _self.strToDate(dateStr);
        _self.selectYear = dateObj.year;
        _self.selectMonth = dateObj.month;
        _self.selectDay = dateObj.day;

        _self.activeCurDate(tdElem);

        _self.onChange(dateObj, dateStr);

        if (tdElem.className.includes('picker-out-view')) {
          _self.curYear = _self.selectYear;
          _self.curMonth = _self.selectMonth;
          _self.toYearMonth(_self.curYear, _self.curMonth);
        }
      }
    },

    // 激活当前选中日期
    activeCurDate(tar) {
      const _self = this;
      for (let i = 0; i < _self.panelDateNum; i++) {
        _self.tdList[i].classList.remove('picker-cell-selected');
      }
      tar.classList.add('picker-cell-selected');
    },

    // 生成日期 panel
    generateDatePanel({year, month, day = 0}) {
      const _self         = this,
            date          = new Date(`${year}-${month}-01`),
            weekForOne    = date.getDay(), // 1号是星期几
            thisMonthDays = new Date(year, month, 0).getDate(), // 本月天数
            preMonth      = (month - 1) === 0 ? 12 : (month - 1), // 上个月是几月
            preYear       = preMonth === 12 ? year - 1 : year, // 上个月属于哪年
            nextMonth     = (month + 1) === 13 ? 1 : (month + 1),// 下个月是几月
            nextYear      = nextMonth === 1 ? year + 1 : year,// 下个月属于哪年
            preMonthDays  = new Date(preYear, preMonth, 0).getDate(); // 上个月天数

      let frag      = doc.createDocumentFragment(),
          tr        = doc.createElement('tr'),
          td        = null,
          tdNum     = 0,
          isWeekend = false;

      for (let i = weekForOne; i > 0; i--) {
        isWeekend = (tdNum % 7 === 0 || (tdNum + 1) % 7 === 0);
        td = _self.generateTd(
          preYear,
          preMonth,
          preMonthDays - i + 1,
          true,
          false,
          isWeekend
        );
        tr.appendChild(td);
        tdNum++;
      }

      for (let i = 1; i <= thisMonthDays; i++) {
        isWeekend = (tdNum % 7 === 0 || (tdNum + 1) % 7 === 0);
        td = _self.generateTd(
          year,
          month,
          i,
          false,
          (day === i),
          isWeekend);
        if (tdNum % 7 === 0 && tdNum !== 0) {
          frag.appendChild(tr);
          tr = doc.createElement('tr');
        }
        tr.appendChild(td);
        tdNum++;
      }

      for (let i = 1; i <= _self.panelDateNum - weekForOne - thisMonthDays; i++) {
        isWeekend = (tdNum % 7 === 0 || (tdNum + 1) % 7 === 0);
        td = _self.generateTd(
          nextYear,
          nextMonth,
          i,
          true,
          false,
          isWeekend);
        if (tdNum % 7 === 0) {
          frag.appendChild(tr);
          tr = doc.createElement('tr');
        }
        tr.appendChild(td);
        tdNum++;
      }

      frag.appendChild(tr);

      _self.pickerContent.appendChild(frag);
    },

    // 删除日期 panel
    removeDatePanel() {
      const _self = this;
      _self.pickerContent.innerHTML = '';
    },

    // 日期td element 生成函数
    generateTd(year, month, day, isOut, isSelected, isWeekend) {
      let _self     = this,
          td        = doc.createElement('td'),
          inner     = doc.createElement('div'),
          className = 'picker-cell';
      className += isOut ? ' picker-out-view' : '';
      className += isSelected ? ' picker-cell-selected' : '';
      inner.className = 'picker-cell-inner';
      inner.className += isWeekend ? ' weekend' : '';
      inner.innerText = day;
      td.className = className;
      td.setAttribute('title', _self.dateToStr({year, month, day}));
      td.appendChild(inner);
      return td;
    },

    // 时期字符串转换为日期对象
    strToDate(str, format) {
      let dateArr = str.split('-');
      return {
        year: parseInt(dateArr[0]),
        month: parseInt(dateArr[1].replace(/^0/, '')),
        day: parseInt(dateArr[2].replace(/^0/, ''))
      };
    },

    // 日期对象转换为日期字符串
    dateToStr(dateObj, format) {
      let {year, month, day} = dateObj;
      if (month < 10) month = '0' + month;
      if (day < 10) day = '0' + day;
      return `${year}-${month}-${day}`;
    },

    // 生成当前日期的对象
    generateNowDate() {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      return {year, month, day};
    }
  };

  window.EasyDatePicker = EasyDatePicker;
})(document);