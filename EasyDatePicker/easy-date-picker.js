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
      if (element.children) return element.children;
      var arr   = [],
          nodes = element.childNodes;


      for (var i = 0; i < nodes.length; i++) {
        var childItem = nodes[i];
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
     * @name: closestParent
     * @description: 寻找元素最近的父级元素
     * @param element:HTMLElement
     * @param selector 选择器
     * @returns {HTMLElement || null}
     */
    closestParent: function (element, selector) {
      var elem, elemLen, _parent_;
      if (typeof selector === 'string') {
        elem = document.querySelectorAll(selector);
        elemLen = elem.length;

        if (elemLen === 0) return null;

        while (1) {
          _parent_ = element.parentNode;

          if (_parent_) {
            for (let i = 0; i < elemLen; i++) {
              if (_parent_ === elem[i]) return _parent_;
            }
            element = _parent_;
          } else {
            return null;
          }
        }
      } else {
        while (1) {
          _parent_ = element.parentNode;

          if (_parent_) {
            if (_parent_ === selector) return _parent_;
            element = _parent_;
          } else {
            return null;
          }
        }
      }
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
  const {
          addEvent,
          elemChildren,
          getElemDocPosition,
          getStyles,
          closestParent,
          animate
        } = utils.domOperateTools;

  const EasyDatePicker = function (opt) {
    let defaultOpt = {
      container: '',
      defaultValue: '',
      // format: 'YYYY-MM-DD',
      ranges: ['1900-01-01', '2099-12-31'],
      supportRange: false,
      animate: false,
      animateTime: 200,
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

    // dom 元素
    this.dateSelector = doc.querySelector(this.container);
    this.dateStart = null;

    this.pickerPanelWrap = null;

    this.pickerBody = null;
    this.tdList = null;

    this.superPreBtn = null;
    this.preBtn = null;
    this.superNextBtn = null;
    this.nextBtn = null;

    this.yearBtn = null;
    this.monthBtn = null;

    this.todyBtn = null;
    this.clearBtn = null;

    // 数据记录
    this.curYear = 0; // 当前 date panel 年份
    this.curMonth = 0; // 当前 date panel 月份
    this.centerYear = 0; // 记录年份范围选择的中心年份

    this.selectYear = 0; // 当前选择的年份
    this.selectMonth = 0; // 当前选中的月份
    this.selectDay = 0; // 当前选中的日期

    this.minDate = this.ranges[0];
    this.maxDate = this.ranges[1];
  };

  EasyDatePicker.prototype = {
    // 面板显示日期个数
    panelDateNum: 42,

    // 面板显示年份的个数
    panelYearNum: 15,

    // 模板替换正则
    tplReg: /{{(.*?)}}/gim,

    // 动画移入移出的距离
    animateDis: 25,

    // 初始化
    init() {
      this.initSelect();
      this.bindDateSelect();
    },

    // 初始化select
    initSelect() {
      const _self = this;
      let dateObj;
      // 判断是否有默认值
      if (_self.defaultValue) {
        dateObj = _self.strToDate(_self.defaultValue);
        if (_self.dateInRange(dateObj, _self.ranges)) {
          // 且默认值在允许选择的范围
          _self.curYear = _self.selectYear = dateObj.year;
          _self.curMonth = _self.selectMonth = dateObj.month;
          _self.selectDay = dateObj.day;
          _self.renderDateSelect({startDate: _self.defaultValue});
        } else {
          dateObj = _self.strToDate(_self.minDate);
          _self.curYear = dateObj.year;
          _self.curMonth = dateObj.month;
          _self.renderDateSelect({
            startDate: '请选择日期'
          });
        }
      } else {
        // 没有默认值的情况下判断今天是否在范围内
        dateObj = _self.generateNowDate();
        if (!_self.dateInRange(dateObj, _self.ranges)) {
          dateObj = _self.strToDate(_self.minDate);
        }
        _self.curYear = dateObj.year;
        _self.curMonth = dateObj.month;
        _self.renderDateSelect({
          startDate: '请选择日期'
        });
      }
    },

    // 渲染 date picker
    renderDatePicker(dateObj, position) {
      const _self = this;
      // 初始化 date picker

      _self.pickerWrap = _self.addDatePicker(_self.generateDatePicker(dateObj));
      _self.pickerPanelWrap = _self.pickerWrap.getElementsByClassName('J-picker-panel-container')[0];

      _self.pickerWrap.style.left = position.left + 'px';

      _self.pickerWrap.style.top = position.top + _self.animateDis + 'px';

      _self.bindDatePanel();
      _self.bindCancelFocus();
    },

    // 渲染 date select
    renderDateSelect({startDate = '', endDate = ''}) {
      const _self = this;

      _self.dateSelector.innerHTML = '<span class="date-start J-date-start">' + startDate + '</span>';
      _self.dateStart = _self.dateSelector.getElementsByClassName('J-date-start')[0];
    },

    // 绑定 date panel 事件
    bindDatePanel() {
      const _self = this;

      _self.pickerBody = _self.pickerWrap.querySelector('.picker-content tbody');
      _self.tdList = _self.pickerBody.getElementsByTagName('td');

      _self.superPreBtn = _self.pickerWrap.getElementsByClassName('J-super-pre-btn')[0];
      _self.preBtn = _self.pickerWrap.getElementsByClassName('J-pre-btn')[0];
      _self.superNextBtn = _self.pickerWrap.getElementsByClassName('J-super-next-btn')[0];
      _self.nextBtn = _self.pickerWrap.getElementsByClassName('J-next-btn')[0];

      _self.yearBtn = _self.pickerWrap.getElementsByClassName('J-picker-year-btn')[0];
      _self.monthBtn = _self.pickerWrap.getElementsByClassName('J-picker-month-btn')[0];

      _self.todyBtn = _self.pickerWrap.getElementsByClassName('J-picker-today-btn')[0];
      _self.clearBtn = _self.pickerWrap.getElementsByClassName('J-picker-clear-btn')[0];

      // 上一年
      addEvent(_self.superPreBtn, 'click', _self.datePreYear.bind(_self));

      // 下一年
      addEvent(_self.superNextBtn, 'click', _self.dateNextYear.bind(_self));

      // 上一个月
      addEvent(_self.preBtn, 'click', _self.eventPreMonth.bind(_self));

      // 下一个月
      addEvent(_self.nextBtn, 'click', _self.eventNextMonth.bind(_self));

      // 选择日期
      addEvent(_self.pickerBody, 'click', _self.selectDate.bind(_self));

      // 选择今天
      addEvent(_self.todyBtn, 'click', _self.selectToday.bind(_self));

      // 选择年份
      addEvent(_self.yearBtn, 'click', _self.changeYear.bind(_self));

      // 选择月份
      addEvent(_self.monthBtn, 'click', _self.changeMonth.bind(_self));

      // 清除日期选择
      addEvent(_self.clearBtn, 'click', _self.clearDate.bind(_self));
    },

    // 绑定 year panel 事件
    bindYearPanel() {
      const _self = this;

      _self.pickerBody = _self.pickerWrap.querySelector('.picker-content tbody');
      _self.superPreBtn = _self.pickerWrap.getElementsByClassName('J-super-pre-btn')[0];
      _self.sectionYearBtn = _self.pickerWrap.getElementsByClassName('J-picker-section-btn')[0];
      _self.superNextBtn = _self.pickerWrap.getElementsByClassName('J-super-next-btn')[0];

      addEvent(_self.pickerBody, 'click', _self.eventSelectYear.bind(_self));
      addEvent(_self.superPreBtn, 'click', _self.preRangeYear.bind(_self));
      addEvent(_self.superNextBtn, 'click', _self.nextRangeYear.bind(_self));
    },

    // 绑定 month panel 事件
    bindMonthPanel() {
      const _self = this;

      _self.pickerBody = _self.pickerWrap.querySelector('.picker-content tbody');
      _self.superPreBtn = _self.pickerWrap.getElementsByClassName('J-super-pre-btn')[0];
      _self.yearBtn = _self.pickerWrap.getElementsByClassName('J-picker-year-btn')[0];
      _self.superNextBtn = _self.pickerWrap.getElementsByClassName('J-super-next-btn')[0];

      addEvent(_self.pickerBody, 'click', _self.eventSelectMonth.bind(_self));
      addEvent(_self.superPreBtn, 'click', _self.monthPreYear.bind(_self));
      addEvent(_self.yearBtn, 'click', _self.changeYear.bind(_self));
      addEvent(_self.superNextBtn, 'click', _self.monthNextYear.bind(_self));
    },

    // 绑定 date select 点击事件
    bindDateSelect() {
      const _self = this;
      addEvent(_self.dateStart, 'click', (e) => {
        e = e || window.event;
        const tar       = e.target || e.srcElement,
              parent    = tar.parentNode,
              position  = getElemDocPosition(parent),
              pHeight   = getStyles(parent, 'height'),
              panelLeft = position.left,
              panelTop  = position.top + pHeight + 3;

        tar.classList.add('focus');
        parent.classList.add('focus');

        if (!_self.pickerWrap) {
          _self.renderDatePicker({
            year: _self.curYear,
            month: _self.curMonth,
            day: _self.selectDay
          }, {
            left: panelLeft,
            top: panelTop
          });
          animate(_self.pickerWrap, {
            top: panelTop,
            opacity: 1
          }, 300);
        } else {
          if (_self.pickerWrap.className.includes('hidden')) {
            _self.pickerWrap.classList.remove('hidden');
            _self.pickerWrap.style.left = panelLeft + 'px';
            _self.pickerWrap.style.top = panelTop + _self.animateDis + 'px';
            animate(_self.pickerWrap, {
              top: panelTop,
              opacity: 1
            }, 300);
          }
        }
      });
    },

    // 绑定 取消 日期选择焦点 事件
    bindCancelFocus() {
      addEvent(doc, 'click', (e) => {
        e = e || window.event;
        const _self    = this,
              tar      = e.target || e.srcElement,
              isSelect = closestParent(tar, _self.container),
              isPicker = closestParent(tar, _self.pickerWrap);
        if (!(isPicker || isSelect)) {
          _self.dateCancelFocus();
        }
      }, true);
    },

    // 日期取消焦点
    dateCancelFocus() {
      const _self = this;

      _self.pickerWrap.classList.add('hidden');
      _self.pickerWrap.style.opacity = 0;
      _self.dateSelector.classList.remove('focus');
      _self.dateStart.classList.remove('focus');
      if (_self.selectYear) {
        _self.dateStart.innerText = _self.dateToStr({
          year: _self.selectYear,
          month: _self.selectMonth,
          day: _self.selectDay
        });
      } else {
        _self.dateStart.innerText = '请选择日期';
      }
    },

    // 日期 panel 上一年
    datePreYear() {
      const _self = this;
      _self.curYear--;
      _self.toYearMonth(_self.curYear, _self.curMonth);
    },

    // 日期 panel 下一年
    dateNextYear() {
      const _self = this;
      _self.curYear++;
      _self.toYearMonth(_self.curYear, _self.curMonth);
    },

    // 上个月事件
    eventPreMonth() {
      const _self = this;
      _self.curMonth--;
      if (_self.curMonth === 0) {
        _self.curMonth = 12;
        _self.curYear--;
      }
      _self.toYearMonth(_self.curYear, _self.curMonth);
    },

    // 下个月事件
    eventNextMonth() {
      const _self = this;
      _self.curMonth++;
      if (_self.curMonth === 13) {
        _self.curMonth = 1;
        _self.curYear++;
      }
      _self.toYearMonth(_self.curYear, _self.curMonth);
    },

    // 选择日期事件
    selectDate(e) {
      e = e || window.event;
      const _self  = this,
            tar    = e.target || e.srcElement,
            tdElem = _self.getTdElement(tar);

      let dateStr = '',
          dateObj = {};

      if (tdElem && !tdElem.className.includes('picker-cell-disable')) {
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

        _self.dateCancelFocus();
      }
    },

    // 选择年份事件
    eventSelectYear(e) {
      e = e || window.event;
      const _self  = this,
            tar    = e.target || e.srcElement,
            tdElem = _self.getTdElement(tar);

      let dateStr = '';

      if (tdElem) {
        let toDay = 0;
        dateStr = tdElem.getAttribute('title');
        _self.curYear = parseInt(dateStr);
        if (_self.curYear === _self.selectYear && _self.curMonth === _self.selectMonth) toDay = _self.selectDay;
        _self.removePanel();
        _self.addPanel(_self.generateDatePanel({
          year: _self.curYear,
          month: _self.curMonth,
          day: toDay
        }));

        _self.bindDatePanel();
      }
    },

    // 选择月份事件
    eventSelectMonth(e) {
      e = e || window.event;
      const _self  = this,
            tar    = e.target || e.srcElement,
            tdElem = _self.getTdElement(tar);

      let dateStr = '',
          dateObj = {};

      if (tdElem) {
        let toDay = 0;
        dateStr = tdElem.getAttribute('title');
        dateObj = _self.strToDate(dateStr);
        _self.curYear = dateObj.year;
        _self.curMonth = dateObj.month;
        if (_self.curYear === _self.selectYear && _self.curMonth === _self.selectMonth) toDay = _self.selectDay;
        _self.removePanel();
        _self.addPanel(_self.generateDatePanel({
          year: _self.curYear,
          month: _self.curMonth,
          day: toDay
        }));

        _self.bindDatePanel();
      }
    },

    // 选择今天事件
    selectToday() {
      const _self = this;
      const todayDateObj = _self.generateNowDate();
      _self.curYear = _self.selectYear = todayDateObj.year;
      _self.curMonth = _self.selectMonth = todayDateObj.month;
      _self.selectDay = todayDateObj.day;
      _self.toYearMonth(todayDateObj.year, todayDateObj.month);
      _self.onChange(todayDateObj, _self.dateToStr(todayDateObj));
      _self.dateCancelFocus();
    },

    // 清除日期选择
    clearDate() {
      const _self = this;
      _self.selectYear = 0;
      _self.selectMonth = 0;
      _self.selectDay = 0;
      _self.dateCancelFocus();
      _self.toYearMonth(_self.curYear, _self.curMonth);
    },

    // 触发选择年份
    changeYear() {
      const _self = this,
            dif   = Math.floor(_self.panelYearNum / 2);

      _self.removePanel();
      _self.addPanel(_self.generateYearPanel({
        startYear: _self.curYear - dif,
        endYear: _self.curYear + dif,
        selectYear: _self.selectYear
      }));

      _self.centerYear = _self.curYear;
      _self.bindYearPanel();
    },

    // 向前一个年份范围
    preRangeYear() {
      const _self     = this,
            dif       = Math.floor(_self.panelYearNum / 2),
            startYear = _self.centerYear - dif - _self.panelYearNum,
            endYear   = _self.centerYear - dif - 1;
      _self.centerYear -= _self.panelYearNum;
      _self.sectionYearBtn.innerText = startYear + '-' + endYear;
      _self.removeContent();
      _self.addContent(_self.generateYearContent(
        {startYear, endYear, selectYear: _self.selectYear}
      ));
    },

    // 向后一个年份范围
    nextRangeYear() {
      const _self     = this,
            dif       = Math.floor(_self.panelYearNum / 2),
            startYear = _self.centerYear + dif + 1,
            endYear   = _self.centerYear + dif + _self.panelYearNum;
      _self.centerYear += _self.panelYearNum;
      _self.sectionYearBtn.innerText = startYear + '-' + endYear;
      _self.removeContent();
      _self.addContent(_self.generateYearContent(
        {startYear, endYear, selectYear: _self.selectYear}
      ));
    },

    // 触发选择月份
    changeMonth() {
      const _self = this;

      _self.removePanel();
      _self.addPanel(_self.generateMonthPanel({
        year: _self.curYear,
        selectMonth: (_self.curYear === _self.selectYear) ? _self.selectMonth : 0
      }));

      _self.bindMonthPanel();
    },

    // 月份 panel 上一年
    monthPreYear() {
      const _self = this;
      _self.curYear--;
      _self.yearBtn.innerText = _self.curYear + '年';
      _self.removeContent();
      _self.addContent(_self.generateMonthContent({
        year: _self.curYear,
        selectMonth: (_self.curYear === _self.selectYear) ? _self.selectMonth : 0
      }));
    },

    // 月份 panel 下一年
    monthNextYear() {
      const _self = this;
      _self.curYear++;
      _self.yearBtn.innerText = _self.curYear + '年';
      _self.removeContent();
      _self.addContent(_self.generateMonthContent({
        year: _self.curYear,
        selectMonth: (_self.curYear === _self.selectYear) ? _self.selectMonth : 0
      }));
    },

    // 切换到某年某月 - 切换 日期 content
    toYearMonth(toYear, toMonth) {
      const _self = this;
      let toDay = 0;
      if (toYear === _self.selectYear && toMonth === _self.selectMonth) toDay = _self.selectDay;
      _self.yearBtn.innerText = _self.curYear + '年';
      _self.monthBtn.innerText = _self.curMonth + '月';

      if (_self.animate) {
        animate(_self.pickerBody, {
          opacity: 0
        }, _self.animateTime, function () {
          _self.removeContent();
          _self.addContent(
            _self.generateDateContent({
              year: toYear,
              month: toMonth,
              day: toDay
            }));

          animate(_self.pickerBody, {
            opacity: 1
          }, _self.animateTime);
        });
      } else {
        _self.removeContent();
        _self.addContent(
          _self.generateDateContent({
            year: toYear,
            month: toMonth,
            day: toDay
          }));
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
    generateDatePanel({year, month, day}) {
      const _self = this;

      let datePaneTpl = _self.getDatePanelTpl(),
          dataObj     = {};

      dataObj = {
        year,
        month,
        trList: _self.generateDateContent({year, month, day})
      };

      return datePaneTpl.replace(_self.tplReg, (node, key) => dataObj[key]);
    },

    // 生成日期 content
    generateDateContent({year, month, day}) {
      const _self         = this,
            date          = new Date(`${year}-${month}-01`), // 1号日期对象
            weekForOne    = date.getDay(), // 1号是星期几
            thisMonthDays = new Date(year, month, 0).getDate(), // 本月天数
            preMonth      = (month - 1) === 0 ? 12 : (month - 1), // 上个月是几月
            preYear       = preMonth === 12 ? year - 1 : year, // 上个月属于哪年
            nextMonth     = (month + 1) === 13 ? 1 : (month + 1),// 下个月是几月
            nextYear      = nextMonth === 1 ? year + 1 : year,// 下个月属于哪年
            preMonthDays  = new Date(preYear, preMonth, 0).getDate(); // 上个月天数

      let tempDiv   = doc.createElement('div'),
          tr        = doc.createElement('tr'),
          td        = '',
          tdNum     = 0,
          isWeekend = false;

      for (let i = weekForOne; i > 0; i--) {
        isWeekend = (tdNum % 7 === 0 || (tdNum + 1) % 7 === 0);
        td = _self.generateDateTd({
          year: preYear,
          month: preMonth,
          day: preMonthDays - i + 1,
          isOut: true,
          isSelected: false,
          isWeekend: isWeekend,
          isRange: _self.dateInRange({
            year: preYear,
            month: preMonth,
            day: i
          }, _self.ranges)
        });
        tr.innerHTML += td;
        tdNum++;
      }

      for (let i = 1; i <= thisMonthDays; i++) {
        isWeekend = (tdNum % 7 === 0 || (tdNum + 1) % 7 === 0);
        td = _self.generateDateTd({
          year: year,
          month: month,
          day: i,
          isOut: false,
          isSelected: (day === i),
          isWeekend: isWeekend,
          isRange: _self.dateInRange({
            year,
            month,
            day: i
          }, _self.ranges)
        });
        if (tdNum % 7 === 0 && tdNum !== 0) {
          tempDiv.appendChild(tr);
          tr = doc.createElement('tr');
        }
        tr.innerHTML += td;
        tdNum++;
      }

      for (let i = 1; i <= _self.panelDateNum - weekForOne - thisMonthDays; i++) {
        isWeekend = (tdNum % 7 === 0 || (tdNum + 1) % 7 === 0);
        td = _self.generateDateTd({
          year: nextYear,
          month: nextMonth,
          day: i,
          isOut: true,
          isSelected: false,
          isWeekend: isWeekend,
          isRange: _self.dateInRange({
            year: nextYear,
            month: nextMonth,
            day: i
          }, _self.ranges)
        });
        if (tdNum % 7 === 0) {
          tempDiv.appendChild(tr);
          tr = doc.createElement('tr');
        }
        tr.innerHTML += td;
        tdNum++;
      }

      tempDiv.appendChild(tr);

      return tempDiv.innerHTML;
    },

    // 生成日期 td
    generateDateTd({year, month, day, isOut, isSelected, isWeekend, isRange}) {
      let _self          = this,
          tdClassName    = 'picker-cell',
          innerClassName = 'picker-cell-inner',
          tdTpl          = _self.getDateTdTpl(),
          dataObj        = {};
      tdClassName += isOut ? ' picker-out-view' : '';
      tdClassName += isSelected ? ' picker-cell-selected' : '';
      tdClassName += !isRange ? ' picker-cell-disable' : '';
      innerClassName += isWeekend ? ' weekend' : '';
      dataObj = {
        tdClassName,
        innerClassName,
        title: _self.dateToStr({year, month, day}),
        day,
      };

      return tdTpl.replace(_self.tplReg, (node, key) => {
        return dataObj[key];
      });
    },

    // 生成年份 panel
    generateYearPanel({startYear, endYear, selectYear}) {
      const _self = this;

      let datePaneTpl = _self.getYearPanelTpl(),
          dataObj     = {};

      dataObj = {
        yearSection: startYear + '-' + endYear,
        trList: _self.generateYearContent({startYear, endYear, selectYear})
      };

      return datePaneTpl.replace(_self.tplReg, (node, key) => dataObj[key]);
    },

    // 生成年份 content
    generateYearContent({startYear, endYear, selectYear}) {
      const _self = this;

      let tempDiv = doc.createElement('div'),
          tr      = doc.createElement('tr'),
          td      = '',
          tdNum   = 0;

      for (let i = startYear; i <= endYear; i++) {
        td = _self.generateYearTd({
          year: i,
          isSelected: (selectYear === i),
        });
        if (tdNum % 3 === 0 && tdNum !== 0) {
          tempDiv.appendChild(tr);
          tr = doc.createElement('tr');
        }
        tr.innerHTML += td;
        tdNum++;
      }

      tempDiv.appendChild(tr);

      return tempDiv.innerHTML;
    },

    // 生成年份 td
    generateYearTd({year, isSelected}) {
      let _self          = this,
          tdClassName    = 'picker-cell',
          innerClassName = 'picker-cell-inner',
          tdTpl          = _self.getYearTdTpl(),
          dataObj        = {};
      tdClassName += isSelected ? ' picker-cell-selected' : '';
      dataObj = {
        tdClassName,
        innerClassName,
        year,
        title: year
      };

      return tdTpl.replace(_self.tplReg, (node, key) => {
        return dataObj[key];
      });
    },

    // 生成月份 panel
    generateMonthPanel({year, selectMonth}) {
      const _self = this;

      let datePaneTpl = _self.getMonthPanelTpl(),
          dataObj     = {};

      dataObj = {
        year,
        trList: _self.generateMonthContent({year, selectMonth})
      };

      return datePaneTpl.replace(_self.tplReg, (node, key) => dataObj[key]);
    },

    // 生成月份 content
    generateMonthContent({year, selectMonth}) {
      const _self = this;

      let tempDiv = doc.createElement('div'),
          tr      = doc.createElement('tr'),
          td      = '',
          tdNum   = 0;

      for (let i = 1; i <= 12; i++) {
        td = _self.generateMonthTd({
          year: year,
          month: i,
          isSelected: (selectMonth === i),
        });
        if (tdNum % 3 === 0 && tdNum !== 0) {
          tempDiv.appendChild(tr);
          tr = doc.createElement('tr');
        }
        tr.innerHTML += td;
        tdNum++;
      }

      tempDiv.appendChild(tr);

      return tempDiv.innerHTML;
    },

    // 生成月份 td
    generateMonthTd({year, month, isSelected}) {
      let _self          = this,
          tdClassName    = 'picker-cell',
          innerClassName = 'picker-cell-inner',
          tdTpl          = _self.getMonthTdTpl(),
          dataObj        = {};
      tdClassName += isSelected ? ' picker-cell-selected' : '';
      dataObj = {
        tdClassName,
        innerClassName,
        month,
        title: year + '-' + month
      };

      return tdTpl.replace(_self.tplReg, (node, key) => {
        return dataObj[key];
      });
    },

    // 生成 date picker
    generateDatePicker(dateObj) {
      const _self = this;

      let pickerTpl = _self.getDatePickerTpl(),
          dataObj   = {};

      dataObj = {
        children: _self.generateDatePanel(dateObj),
      };

      return pickerTpl.replace(_self.tplReg, (node, key) => dataObj[key]);
    },

    /******************************************
     * 添加 content
     */
    addContent(content) {
      const _self = this;
      _self.pickerBody.innerHTML = content;
    },

    // 删除 content
    removeContent() {
      const _self = this;
      _self.pickerBody.innerHTML = '';
    },

    // 添加 panel
    addPanel(panel) {
      const _self = this;
      _self.pickerPanelWrap.innerHTML = panel;
    },

    // 删除 panel
    removePanel() {
      const _self = this;
      _self.pickerPanelWrap.innerHTML = '';
    },

    // 添加 date picker 组件到document.body
    addDatePicker(picker) {
      let div      = doc.createElement('div'),
          children = null;
      if (typeof picker == 'string') {
        div.innerHTML = picker;
        children = elemChildren(div)[0];
        doc.body.appendChild(children);
        return children;
      }
    },

    /******************************************
     * 点击事件委托，点击到的元素可能不是td，这里需要获取到真的td元素
     * @param tar 目标元素
     * @return element | null
     */
    getTdElement(tar) {
      const tagName    = tar.tagName.toLowerCase(),
            className  = tar.className.toLowerCase(),
            isTd       = tagName === 'td',
            isInnerDiv = className.includes('picker-cell-inner');

      let tdElem = tar;

      if (isInnerDiv) {
        tdElem = tar.parentNode;
      }

      if (isTd || isInnerDiv) {
        return tdElem;
      } else {
        return null;
      }
    },

    /******************************************
     * 获取日期panel模板
     */
    getDatePanelTpl() {
      // year month trList
      return '<div class="date-picker-panel">\
                 <div class="picker-header">\
                    <button class="super-pre-btn J-super-pre-btn"></button>\
                    <button class="pre-btn J-pre-btn"></button>\
                    <div class="header-view">\
                      <button class="picker-year-btn J-picker-year-btn">{{year}}年</button>\
                      <button class="picker-month-btn J-picker-month-btn">{{month}}月</button>\
                    </div>\
                    <button class="next-btn J-next-btn"></button>\
                    <button class="super-next-btn J-super-next-btn"></button>\
                 </div>\
                 <div class="picker-body">\
                    <table class="picker-content">\
                      <thead>\
                      <tr>\
                        <th>日</th>\
                        <th>一</th>\
                        <th>二</th>\
                        <th>三</th>\
                        <th>四</th>\
                        <th>五</th>\
                        <th>六</th>\
                      </tr>\
                      </thead>\
                      <tbody>{{trList}}</tbody>\
                    </table>\
                 </div>\
                 <div class="picker-footer">\
                   <button class="picker-today-btn J-picker-today-btn">今天</button>\
                   <button class="picker-clear-btn J-picker-clear-btn">清除</button>\
                 </div>\
              </div>';
    },

    // 获取日期td模板
    getDateTdTpl() {
      return '<td title="{{title}}" class="{{tdClassName}}">\
                <div class="{{innerClassName}}">{{day}}</div>\
              </td>';
    },

    // 获取年份panel模板
    getYearPanelTpl() {
      // yearSection trList
      return '<div class="year-picker-panel">\
                <div class="picker-header">\
                  <button class="super-pre-btn J-super-pre-btn"></button>\
                  <div class="header-view">\
                    <button class="picker-section-btn J-picker-section-btn">{{yearSection}}</button>\
                  </div>\
                  <button class="super-next-btn J-super-next-btn"></button>\
                </div>\
                <div class="picker-body">\
                  <table class="picker-content">\
                    <tbody>{{trList}}</tbody>\
                  </table>\
                </div>\
              </div>';
    },

    // 获取月份panel模板
    getMonthPanelTpl() {
      // year trList
      return '<div class="month-picker-panel">\
                <div class="picker-header">\
                  <button class="super-pre-btn J-super-pre-btn"></button>\
                  <div class="header-view">\
                    <button class="picker-year-btn J-picker-year-btn">{{year}}年</button>\
                  </div>\
                  <button class="super-next-btn J-super-next-btn"></button>\
                </div>\
                <div class="picker-body">\
                  <table class="picker-content">\
                    <tbody>{{trList}}</tbody>\
                  </table>\
                </div>\
              </div>';
    },

    // 获取年份td模板
    getYearTdTpl() {
      return '<td title="{{title}}" class="{{tdClassName}}">\
                <div class="{{innerClassName}}">{{year}}</div>\
              </td>';
    },

    // 获取月份td模板
    getMonthTdTpl() {
      return '<td title="{{title}}" class="{{tdClassName}}">\
                <div class="{{innerClassName}}">{{month}}月</div>\
              </td>';
    },

    // 获取 date picker 外层模板
    getDatePickerTpl() {
      return '<div class="easy-date-picker">\
                <div class="picker-panel-container J-picker-panel-container">{{children}}</div>\
              </div>';
    },

    /******************************************
     * 时期字符串转换为日期对象
     */
    strToDate(str, format) {
      let dateArr = str.split('-');
      return {
        year: dateArr[0] && parseInt(dateArr[0]),
        month: dateArr[1] && parseInt(dateArr[1].replace(/^0/, '')),
        day: dateArr[2] && parseInt(dateArr[2].replace(/^0/, ''))
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
    },

    // 判断年月日是否在范围内
    dateInRange(date, range) {
      const _self = this,
            min   = new Date(range[0]),
            max   = new Date(range[1]),
            now   = new Date(_self.dateToStr(date));
      return now >= min && now <= max;
    },
  };

  window.EasyDatePicker = EasyDatePicker;
})(document);