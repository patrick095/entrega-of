!(function () {
  "use strict";
  function e(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
  function t(e) {
    return e[e.length - 1];
  }
  function i(e, ...t) {
    return (
      t.forEach((t) => {
        e.includes(t) || e.push(t);
      }),
      e
    );
  }
  function r(e, t) {
    return e ? e.split(t) : [];
  }
  function a(e, t, i) {
    return (void 0 === t || e >= t) && (void 0 === i || e <= i);
  }
  function s(e, t, i) {
    return e < t ? t : e > i ? i : e;
  }
  function n(e, t, i = {}, r = 0, a = "") {
    a += `<${Object.keys(i).reduce((e, t) => {
      let a = i[t];
      return "function" == typeof a && (a = a(r)), `${e} ${t}="${a}"`;
    }, e)}></${e}>`;
    const s = r + 1;
    return s < t ? n(e, t, i, s, a) : a;
  }
  function d(e) {
    return e.replace(/>\s+/g, ">").replace(/\s+</, "<");
  }
  function o(e) {
    return new Date(e).setHours(0, 0, 0, 0);
  }
  function c() {
    return new Date().setHours(0, 0, 0, 0);
  }
  function l(...e) {
    switch (e.length) {
      case 0:
        return c();
      case 1:
        return o(e[0]);
    }
    const t = new Date(0);
    return t.setFullYear(...e), t.setHours(0, 0, 0, 0);
  }
  function h(e, t) {
    const i = new Date(e);
    return i.setDate(i.getDate() + t);
  }
  function u(e, t) {
    const i = new Date(e),
      r = i.getMonth() + t;
    let a = r % 12;
    a < 0 && (a += 12);
    const s = i.setMonth(r);
    return i.getMonth() !== a ? i.setDate(0) : s;
  }
  function g(e, t) {
    const i = new Date(e),
      r = i.getMonth(),
      a = i.setFullYear(i.getFullYear() + t);
    return 1 === r && 2 === i.getMonth() ? i.setDate(0) : a;
  }
  function f(e, t) {
    return (e - t + 7) % 7;
  }
  function p(e, t, i = 0) {
    const r = new Date(e).getDay();
    return h(e, f(t, i) - f(r, i));
  }
  function m(e, t) {
    const i = new Date(e).getFullYear();
    return Math.floor(i / t) * t;
  }
  const b = /dd?|DD?|mm?|MM?|yy?(?:yy)?/,
    y = /[\s!-/:-@[-`{-~年月日]+/;
  let w = {};
  const k = {
      y: (e, t) => new Date(e).setFullYear(parseInt(t, 10)),
      m(e, t, i) {
        const r = new Date(e);
        let a = parseInt(t, 10) - 1;
        if (isNaN(a)) {
          if (!t) return NaN;
          const e = t.toLowerCase(),
            r = (t) => t.toLowerCase().startsWith(e);
          if (
            ((a = i.monthsShort.findIndex(r)) < 0 &&
              (a = i.months.findIndex(r)),
            a < 0)
          )
            return NaN;
        }
        return (
          r.setMonth(a),
          r.getMonth() !==
          (function e(t) {
            return t > -1 ? t % 12 : e(t + 12);
          })(a)
            ? r.setDate(0)
            : r.getTime()
        );
      },
      d: (e, t) => new Date(e).setDate(parseInt(t, 10)),
    },
    v = {
      d: (e) => e.getDate(),
      dd: (e) => D(e.getDate(), 2),
      D: (e, t) => t.daysShort[e.getDay()],
      DD: (e, t) => t.days[e.getDay()],
      m: (e) => e.getMonth() + 1,
      mm: (e) => D(e.getMonth() + 1, 2),
      M: (e, t) => t.monthsShort[e.getMonth()],
      MM: (e, t) => t.months[e.getMonth()],
      y: (e) => e.getFullYear(),
      yy: (e) => D(e.getFullYear(), 2).slice(-2),
      yyyy: (e) => D(e.getFullYear(), 4),
    };
  function D(e, t) {
    return e.toString().padStart(t, "0");
  }
  function x(e) {
    if ("string" != typeof e) throw new Error("Invalid date format.");
    if (e in w) return w[e];
    const i = e.split(b),
      r = e.match(new RegExp(b, "g"));
    if (0 === i.length || !r) throw new Error("Invalid date format.");
    const a = r.map((e) => v[e]),
      s = Object.keys(k).reduce((e, t) => {
        return (
          r.find((e) => "D" !== e[0] && e[0].toLowerCase() === t) && e.push(t),
          e
        );
      }, []);
    return (w[e] = {
      parser(e, t) {
        const i = e.split(y).reduce((e, t, i) => {
          if (t.length > 0 && r[i]) {
            const a = r[i][0];
            "M" === a ? (e.m = t) : "D" !== a && (e[a] = t);
          }
          return e;
        }, {});
        return s.reduce((e, r) => {
          const a = k[r](e, i[r], t);
          return isNaN(a) ? e : a;
        }, c());
      },
      formatter: (e, r) =>
        a.reduce((t, a, s) => t + `${i[s]}${a(e, r)}`, "") + t(i),
    });
  }
  function M(e, t, i) {
    if (e instanceof Date || "number" == typeof e) {
      const t = o(e);
      return isNaN(t) ? void 0 : t;
    }
    if (e) {
      if ("today" === e) return c();
      if (t && t.toValue) {
        const r = t.toValue(e, t, i);
        return isNaN(r) ? void 0 : o(r);
      }
      return x(t).parser(e, i);
    }
  }
  function S(e, t, i) {
    if (isNaN(e) || (!e && 0 !== e)) return "";
    const r = "number" == typeof e ? new Date(e) : e;
    return t.toDisplay ? t.toDisplay(r, t, i) : x(t).formatter(r, i);
  }
  const O = new WeakMap(),
    { addEventListener: C, removeEventListener: E } = EventTarget.prototype;
  function F(e, t) {
    let i = O.get(e);
    i || ((i = []), O.set(e, i)),
      t.forEach((e) => {
        C.call(...e), i.push(e);
      });
  }
  function V(e) {
    let t = O.get(e);
    t &&
      (t.forEach((e) => {
        E.call(...e);
      }),
      O.delete(e));
  }
  if (!Event.prototype.composedPath) {
    const e = (t, i = []) => {
      let r;
      return (
        i.push(t),
        t.parentNode
          ? (r = t.parentNode)
          : t.host
          ? (r = t.host)
          : t.defaultView && (r = t.defaultView),
        r ? e(r, i) : i
      );
    };
    Event.prototype.composedPath = function () {
      return e(this.target);
    };
  }
  function L(e, t) {
    const i = "function" == typeof t ? t : (e) => e.matches(t);
    return (function e(t, i, r, a = 0) {
      const s = t[a];
      return i(s) ? s : s !== r && s.parentElement ? e(t, i, r, a + 1) : void 0;
    })(e.composedPath(), i, e.currentTarget);
  }
  const N = {
      en: {
        days: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        months: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        monthsShort: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        today: "Today",
        clear: "Clear",
        titleFormat: "MM y",
      },
    },
    B = {
      autohide: !1,
      beforeShowDay: null,
      beforeShowDecade: null,
      beforeShowMonth: null,
      beforeShowYear: null,
      calendarWeeks: !1,
      clearBtn: !1,
      dateDelimiter: ",",
      datesDisabled: [],
      daysOfWeekDisabled: [],
      daysOfWeekHighlighted: [],
      defaultViewDate: void 0,
      disableTouchKeyboard: !1,
      format: "mm/dd/yyyy",
      language: "en",
      maxDate: null,
      maxNumberOfDates: 1,
      maxView: 3,
      minDate: null,
      nextArrow:
        '<svg class="w-4 h-4 rtl:rotate-180 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/></svg>',
      orientation: "auto",
      pickLevel: 0,
      prevArrow:
        '<svg class="w-4 h-4 rtl:rotate-180 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/></svg>',
      showDaysOfWeek: !0,
      showOnClick: !0,
      showOnFocus: !0,
      startView: 0,
      title: "",
      todayBtn: !1,
      todayBtnMode: 0,
      todayHighlight: !1,
      updateOnBlur: !0,
      weekStart: 0,
    },
    A = document.createRange();
  function Y(e) {
    return A.createContextualFragment(e);
  }
  function W(e) {
    "none" !== e.style.display &&
      (e.style.display && (e.dataset.styleDisplay = e.style.display),
      (e.style.display = "none"));
  }
  function j(e) {
    "none" === e.style.display &&
      (e.dataset.styleDisplay
        ? ((e.style.display = e.dataset.styleDisplay),
          delete e.dataset.styleDisplay)
        : (e.style.display = ""));
  }
  function _(e) {
    e.firstChild && (e.removeChild(e.firstChild), _(e));
  }
  const { language: K, format: H, weekStart: T } = B;
  function $(e, t) {
    return e.length < 6 && t >= 0 && t < 7 ? i(e, t) : e;
  }
  function P(e) {
    return (e + 6) % 7;
  }
  function R(e, t, i, r) {
    const a = M(e, t, i);
    return void 0 !== a ? a : r;
  }
  function I(e, t, i = 3) {
    const r = parseInt(e, 10);
    return r >= 0 && r <= i ? r : t;
  }
  function q(t, r) {
    const a = Object.assign({}, t),
      s = {},
      n = r.constructor.locales;
    let {
      format: d,
      language: o,
      locale: c,
      maxDate: h,
      maxView: u,
      minDate: g,
      pickLevel: f,
      startView: p,
      weekStart: m,
    } = r.config || {};
    if (a.language) {
      let e;
      if (
        (a.language !== o &&
          (n[a.language]
            ? (e = a.language)
            : void 0 === n[(e = a.language.split("-")[0])] && (e = !1)),
        delete a.language,
        e)
      ) {
        o = s.language = e;
        const t = c || n[K];
        (c = Object.assign({ format: H, weekStart: T }, n[K])),
          o !== K && Object.assign(c, n[o]),
          (s.locale = c),
          d === t.format && (d = s.format = c.format),
          m === t.weekStart &&
            ((m = s.weekStart = c.weekStart), (s.weekEnd = P(c.weekStart)));
      }
    }
    if (a.format) {
      const e = "function" == typeof a.format.toDisplay,
        t = "function" == typeof a.format.toValue,
        i = b.test(a.format);
      ((e && t) || i) && (d = s.format = a.format), delete a.format;
    }
    let y = g,
      w = h;
    if (
      (void 0 !== a.minDate &&
        ((y = null === a.minDate ? l(0, 0, 1) : R(a.minDate, d, c, y)),
        delete a.minDate),
      void 0 !== a.maxDate &&
        ((w = null === a.maxDate ? void 0 : R(a.maxDate, d, c, w)),
        delete a.maxDate),
      w < y
        ? ((g = s.minDate = w), (h = s.maxDate = y))
        : (g !== y && (g = s.minDate = y), h !== w && (h = s.maxDate = w)),
      a.datesDisabled &&
        ((s.datesDisabled = a.datesDisabled.reduce((e, t) => {
          const r = M(t, d, c);
          return void 0 !== r ? i(e, r) : e;
        }, [])),
        delete a.datesDisabled),
      void 0 !== a.defaultViewDate)
    ) {
      const e = M(a.defaultViewDate, d, c);
      void 0 !== e && (s.defaultViewDate = e), delete a.defaultViewDate;
    }
    if (void 0 !== a.weekStart) {
      const e = Number(a.weekStart) % 7;
      isNaN(e) || ((m = s.weekStart = e), (s.weekEnd = P(e))),
        delete a.weekStart;
    }
    if (
      (a.daysOfWeekDisabled &&
        ((s.daysOfWeekDisabled = a.daysOfWeekDisabled.reduce($, [])),
        delete a.daysOfWeekDisabled),
      a.daysOfWeekHighlighted &&
        ((s.daysOfWeekHighlighted = a.daysOfWeekHighlighted.reduce($, [])),
        delete a.daysOfWeekHighlighted),
      void 0 !== a.maxNumberOfDates)
    ) {
      const e = parseInt(a.maxNumberOfDates, 10);
      e >= 0 && ((s.maxNumberOfDates = e), (s.multidate = 1 !== e)),
        delete a.maxNumberOfDates;
    }
    a.dateDelimiter &&
      ((s.dateDelimiter = String(a.dateDelimiter)), delete a.dateDelimiter);
    let k = f;
    void 0 !== a.pickLevel && ((k = I(a.pickLevel, 2)), delete a.pickLevel),
      k !== f && (f = s.pickLevel = k);
    let v = u;
    void 0 !== a.maxView && ((v = I(a.maxView, u)), delete a.maxView),
      (v = f > v ? f : v) !== u && (u = s.maxView = v);
    let D = p;
    if (
      (void 0 !== a.startView && ((D = I(a.startView, D)), delete a.startView),
      D < f ? (D = f) : D > u && (D = u),
      D !== p && (s.startView = D),
      a.prevArrow)
    ) {
      const e = Y(a.prevArrow);
      e.childNodes.length > 0 && (s.prevArrow = e.childNodes),
        delete a.prevArrow;
    }
    if (a.nextArrow) {
      const e = Y(a.nextArrow);
      e.childNodes.length > 0 && (s.nextArrow = e.childNodes),
        delete a.nextArrow;
    }
    if (
      (void 0 !== a.disableTouchKeyboard &&
        ((s.disableTouchKeyboard =
          "ontouchstart" in document && !!a.disableTouchKeyboard),
        delete a.disableTouchKeyboard),
      a.orientation)
    ) {
      const e = a.orientation.toLowerCase().split(/\s+/g);
      (s.orientation = {
        x: e.find((e) => "left" === e || "right" === e) || "auto",
        y: e.find((e) => "top" === e || "bottom" === e) || "auto",
      }),
        delete a.orientation;
    }
    if (void 0 !== a.todayBtnMode) {
      switch (a.todayBtnMode) {
        case 0:
        case 1:
          s.todayBtnMode = a.todayBtnMode;
      }
      delete a.todayBtnMode;
    }
    return (
      Object.keys(a).forEach((t) => {
        void 0 !== a[t] && e(B, t) && (s[t] = a[t]);
      }),
      s
    );
  }
  const J = d(
      '<div class="datepicker hidden">\n  <div class="datepicker-picker inline-block rounded-lg bg-white shadow-lg p-4">\n    <div class="datepicker-header">\n      <div class="datepicker-title bg-white  px-2 py-3 text-center font-semibold"></div>\n      <div class="datepicker-controls flex justify-between mb-2">\n        <button type="button" class="bg-white rounded-lg text-gray-500  hover:bg-gray-100  hover:text-gray-900  text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 prev-btn"></button>\n        <button type="button" class="text-sm rounded-lg text-gray-900  bg-white font-semibold py-2.5 px-5 hover:bg-gray-100  focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch"></button>\n        <button type="button" class="bg-white rounded-lg text-gray-500  hover:bg-gray-100  hover:text-gray-900  text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 next-btn"></button>\n      </div>\n    </div>\n    <div class="datepicker-main p-1"></div>\n    <div class="datepicker-footer">\n      <div class="datepicker-controls flex space-x-2 rtl:space-x-reverse mt-2">\n        <button type="button" class="%buttonClass% today-btn text-white bg-blue-700 !bg-primary-700   hover:bg-blue-800 hover:!bg-primary-800 focus:ring-4 focus:ring-blue-300 focus:!ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/2"></button>\n        <button type="button" class="%buttonClass% clear-btn text-gray-900  bg-white border border-gray-300 hover:bg-gray-100  focus:ring-4 focus:ring-blue-300 focus:!ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/2"></button>\n      </div>\n    </div>\n  </div>\n</div>'
    ),
    z = d(
      `<div class="days">\n  <div class="days-of-week grid grid-cols-7 mb-1">${n(
        "span",
        7,
        {
          class:
            "dow block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm",
        }
      )}</div>\n  <div class="datepicker-grid w-64 grid grid-cols-7">${n(
        "span",
        42,
        {
          class:
            "block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm h-6 leading-6 text-sm font-medium text-gray-500",
        }
      )}</div>\n</div>`
    ),
    U = d(
      `<div class="calendar-weeks">\n  <div class="days-of-week flex"><span class="dow h-6 leading-6 text-sm font-medium text-gray-500"></span></div>\n  <div class="weeks">${n(
        "span",
        6,
        {
          class:
            "week block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm",
        }
      )}</div>\n</div>`
    );
  class X {
    constructor(e, t) {
      Object.assign(this, t, {
        picker: e,
        element: Y('<div class="datepicker-view flex"></div>').firstChild,
        selected: [],
      }),
        this.init(this.picker.datepicker.config);
    }
    init(e) {
      void 0 !== e.pickLevel && (this.isMinView = this.id === e.pickLevel),
        this.setOptions(e),
        this.updateFocus(),
        this.updateSelection();
    }
    performBeforeHook(e, t, r) {
      let a = this.beforeShow(new Date(r));
      switch (typeof a) {
        case "boolean":
          a = { enabled: a };
          break;
        case "string":
          a = { classes: a };
      }
      if (a) {
        if (
          (!1 === a.enabled &&
            (e.classList.add("disabled"), i(this.disabled, t)),
          a.classes)
        ) {
          const r = a.classes.split(/\s+/);
          e.classList.add(...r), r.includes("disabled") && i(this.disabled, t);
        }
        a.content &&
          (function (e, t) {
            _(e),
              t instanceof DocumentFragment
                ? e.appendChild(t)
                : "string" == typeof t
                ? e.appendChild(Y(t))
                : "function" == typeof t.forEach &&
                  t.forEach((t) => {
                    e.appendChild(t);
                  });
          })(e, a.content);
      }
    }
  }
  class G extends X {
    constructor(e) {
      super(e, { id: 0, name: "days", cellClass: "day" });
    }
    init(e, t = !0) {
      if (t) {
        const e = Y(z).firstChild;
        (this.dow = e.firstChild),
          (this.grid = e.lastChild),
          this.element.appendChild(e);
      }
      super.init(e);
    }
    setOptions(t) {
      let i;
      if (
        (e(t, "minDate") && (this.minDate = t.minDate),
        e(t, "maxDate") && (this.maxDate = t.maxDate),
        t.datesDisabled && (this.datesDisabled = t.datesDisabled),
        t.daysOfWeekDisabled &&
          ((this.daysOfWeekDisabled = t.daysOfWeekDisabled), (i = !0)),
        t.daysOfWeekHighlighted &&
          (this.daysOfWeekHighlighted = t.daysOfWeekHighlighted),
        void 0 !== t.todayHighlight && (this.todayHighlight = t.todayHighlight),
        void 0 !== t.weekStart &&
          ((this.weekStart = t.weekStart),
          (this.weekEnd = t.weekEnd),
          (i = !0)),
        t.locale)
      ) {
        const e = (this.locale = t.locale);
        (this.dayNames = e.daysMin),
          (this.switchLabelFormat = e.titleFormat),
          (i = !0);
      }
      if (
        (void 0 !== t.beforeShowDay &&
          (this.beforeShow =
            "function" == typeof t.beforeShowDay ? t.beforeShowDay : void 0),
        void 0 !== t.calendarWeeks)
      )
        if (t.calendarWeeks && !this.calendarWeeks) {
          const e = Y(U).firstChild;
          (this.calendarWeeks = {
            element: e,
            dow: e.firstChild,
            weeks: e.lastChild,
          }),
            this.element.insertBefore(e, this.element.firstChild);
        } else
          this.calendarWeeks &&
            !t.calendarWeeks &&
            (this.element.removeChild(this.calendarWeeks.element),
            (this.calendarWeeks = null));
      void 0 !== t.showDaysOfWeek &&
        (t.showDaysOfWeek
          ? (j(this.dow), this.calendarWeeks && j(this.calendarWeeks.dow))
          : (W(this.dow), this.calendarWeeks && W(this.calendarWeeks.dow))),
        i &&
          Array.from(this.dow.children).forEach((e, t) => {
            const i = (this.weekStart + t) % 7;
            (e.textContent = this.dayNames[i]),
              (e.className = this.daysOfWeekDisabled.includes(i)
                ? "dow disabled text-center h-6 leading-6 text-sm font-medium text-gray-500 cursor-not-allowed"
                : "dow text-center h-6 leading-6 text-sm font-medium text-gray-500");
          });
    }
    updateFocus() {
      const e = new Date(this.picker.viewDate),
        t = e.getFullYear(),
        i = e.getMonth(),
        r = l(t, i, 1),
        a = p(r, this.weekStart, this.weekStart);
      (this.first = r),
        (this.last = l(t, i + 1, 0)),
        (this.start = a),
        (this.focused = this.picker.viewDate);
    }
    updateSelection() {
      const { dates: e, rangepicker: t } = this.picker.datepicker;
      (this.selected = e), t && (this.range = t.dates);
    }
    render() {
      (this.today = this.todayHighlight ? c() : void 0),
        (this.disabled = [...this.datesDisabled]);
      const e = S(this.focused, this.switchLabelFormat, this.locale);
      if (
        (this.picker.setViewSwitchLabel(e),
        this.picker.setPrevBtnDisabled(this.first <= this.minDate),
        this.picker.setNextBtnDisabled(this.last >= this.maxDate),
        this.calendarWeeks)
      ) {
        const e = p(this.first, 1, 1);
        Array.from(this.calendarWeeks.weeks.children).forEach((t, i) => {
          t.textContent = (function (e) {
            const t = p(e, 4, 1),
              i = p(new Date(t).setMonth(0, 4), 4, 1);
            return Math.round((t - i) / 6048e5) + 1;
          })(h(e, 7 * i));
        });
      }
      Array.from(this.grid.children).forEach((e, t) => {
        const r = e.classList,
          a = h(this.start, t),
          s = new Date(a),
          n = s.getDay();
        if (
          ((e.className = `datepicker-cell hover:bg-gray-100  block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900  font-semibold text-sm ${this.cellClass}`),
          (e.dataset.date = a),
          (e.textContent = s.getDate()),
          a < this.first
            ? r.add("prev", "text-gray-500")
            : a > this.last &&
              r.add("next", "text-gray-500"),
          this.today === a && r.add("today", "bg-gray-100"),
          (a < this.minDate || a > this.maxDate || this.disabled.includes(a)) &&
            r.add("disabled", "cursor-not-allowed"),
          this.daysOfWeekDisabled.includes(n) &&
            (r.add("disabled", "cursor-not-allowed"), i(this.disabled, a)),
          this.daysOfWeekHighlighted.includes(n) && r.add("highlighted"),
          this.range)
        ) {
          const [e, t] = this.range;
          a > e &&
            a < t &&
            (r.add("range", "bg-gray-200"),
            r.remove("rounded-lg", "rounded-l-lg", "rounded-r-lg")),
            a === e &&
              (r.add(
                "range-start",
                "bg-gray-100",
                "rounded-l-lg"
              ),
              r.remove("rounded-lg", "rounded-r-lg")),
            a === t &&
              (r.add(
                "range-end",
                "bg-gray-100",
                "rounded-r-lg"
              ),
              r.remove("rounded-lg", "rounded-l-lg"));
        }
        this.selected.includes(a) &&
          (r.add(
            "selected",
            "bg-blue-700",
            "!bg-primary-700",
            "text-white"
          ),
          r.remove(
            "text-gray-900",
            "text-gray-500",
            "hover:bg-gray-100",
            "bg-gray-100",
            "bg-gray-200"
          )),
          a === this.focused && r.add("focused"),
          this.beforeShow && this.performBeforeHook(e, a, a);
      });
    }
    refresh() {
      const [e, t] = this.range || [];
      this.grid
        .querySelectorAll(
          ".range, .range-start, .range-end, .selected, .focused"
        )
        .forEach((e) => {
          e.classList.remove(
            "range",
            "range-start",
            "range-end",
            "selected",
            "bg-blue-700",
            "!bg-primary-700",
            "text-white",
            "focused"
          ),
            e.classList.add("text-gray-900", "rounded-lg");
        }),
        Array.from(this.grid.children).forEach((i) => {
          const r = Number(i.dataset.date),
            a = i.classList;
          a.remove(
            "bg-gray-200",
            "rounded-l-lg",
            "rounded-r-lg"
          ),
            r > e &&
              r < t &&
              (a.add("range", "bg-gray-200"),
              a.remove("rounded-lg")),
            r === e &&
              (a.add(
                "range-start",
                "bg-gray-200",
                "rounded-l-lg"
              ),
              a.remove("rounded-lg", "rounded-r-lg")),
            r === t &&
              (a.add(
                "range-end",
                "bg-gray-200",
                "rounded-r-lg"
              ),
              a.remove("rounded-lg", "rounded-l-lg")),
            this.selected.includes(r) &&
              (a.add(
                "selected",
                "bg-blue-700",
                "!bg-primary-700",
                "text-white"
              ),
              a.remove(
                "text-gray-900",
                "hover:bg-gray-100",
                "bg-gray-100",
                "bg-gray-200"
              )),
            r === this.focused && a.add("focused");
        });
    }
    refreshFocus() {
      const e = Math.round((this.focused - this.start) / 864e5);
      this.grid.querySelectorAll(".focused").forEach((e) => {
        e.classList.remove("focused");
      }),
        this.grid.children[e].classList.add("focused");
    }
  }
  function Q(e, t) {
    if (!e || !e[0] || !e[1]) return;
    const [[i, r], [a, s]] = e;
    return i > t || a < t ? void 0 : [i === t ? r : -1, a === t ? s : 12];
  }
  class Z extends X {
    constructor(e) {
      super(e, { id: 1, name: "months", cellClass: "month" });
    }
    init(e, t = !0) {
      t &&
        ((this.grid = this.element),
        this.element.classList.add(
          "months",
          "datepicker-grid",
          "w-64",
          "grid",
          "grid-cols-4"
        ),
        this.grid.appendChild(Y(n("span", 12, { "data-month": (e) => e })))),
        super.init(e);
    }
    setOptions(t) {
      if (
        (t.locale && (this.monthNames = t.locale.monthsShort), e(t, "minDate"))
      )
        if (void 0 === t.minDate)
          this.minYear = this.minMonth = this.minDate = void 0;
        else {
          const e = new Date(t.minDate);
          (this.minYear = e.getFullYear()),
            (this.minMonth = e.getMonth()),
            (this.minDate = e.setDate(1));
        }
      if (e(t, "maxDate"))
        if (void 0 === t.maxDate)
          this.maxYear = this.maxMonth = this.maxDate = void 0;
        else {
          const e = new Date(t.maxDate);
          (this.maxYear = e.getFullYear()),
            (this.maxMonth = e.getMonth()),
            (this.maxDate = l(this.maxYear, this.maxMonth + 1, 0));
        }
      void 0 !== t.beforeShowMonth &&
        (this.beforeShow =
          "function" == typeof t.beforeShowMonth ? t.beforeShowMonth : void 0);
    }
    updateFocus() {
      const e = new Date(this.picker.viewDate);
      (this.year = e.getFullYear()), (this.focused = e.getMonth());
    }
    updateSelection() {
      const { dates: e, rangepicker: t } = this.picker.datepicker;
      (this.selected = e.reduce((e, t) => {
        const r = new Date(t),
          a = r.getFullYear(),
          s = r.getMonth();
        return void 0 === e[a] ? (e[a] = [s]) : i(e[a], s), e;
      }, {})),
        t &&
          t.dates &&
          (this.range = t.dates.map((e) => {
            const t = new Date(e);
            return isNaN(t) ? void 0 : [t.getFullYear(), t.getMonth()];
          }));
    }
    render() {
      (this.disabled = []),
        this.picker.setViewSwitchLabel(this.year),
        this.picker.setPrevBtnDisabled(this.year <= this.minYear),
        this.picker.setNextBtnDisabled(this.year >= this.maxYear);
      const e = this.selected[this.year] || [],
        t = this.year < this.minYear || this.year > this.maxYear,
        i = this.year === this.minYear,
        r = this.year === this.maxYear,
        a = Q(this.range, this.year);
      Array.from(this.grid.children).forEach((s, n) => {
        const d = s.classList,
          o = l(this.year, n, 1);
        if (
          ((s.className = `datepicker-cell hover:bg-gray-100  block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900  font-semibold text-sm ${this.cellClass}`),
          this.isMinView && (s.dataset.date = o),
          (s.textContent = this.monthNames[n]),
          (t || (i && n < this.minMonth) || (r && n > this.maxMonth)) &&
            d.add("disabled"),
          a)
        ) {
          const [e, t] = a;
          n > e && n < t && d.add("range"),
            n === e && d.add("range-start"),
            n === t && d.add("range-end");
        }
        e.includes(n) &&
          (d.add(
            "selected",
            "bg-blue-700",
            "!bg-primary-700",
            "text-white"
          ),
          d.remove(
            "text-gray-900",
            "hover:bg-gray-100"
          )),
          n === this.focused && d.add("focused"),
          this.beforeShow && this.performBeforeHook(s, n, o);
      });
    }
    refresh() {
      const e = this.selected[this.year] || [],
        [t, i] = Q(this.range, this.year) || [];
      this.grid
        .querySelectorAll(
          ".range, .range-start, .range-end, .selected, .focused"
        )
        .forEach((e) => {
          e.classList.remove(
            "range",
            "range-start",
            "range-end",
            "selected",
            "bg-blue-700",
            "!bg-primary-700",
            "text-white",
            "focused"
          ),
            e.classList.add(
              "text-gray-900",
              "hover:bg-gray-100",
            );
        }),
        Array.from(this.grid.children).forEach((r, a) => {
          const s = r.classList;
          a > t && a < i && s.add("range"),
            a === t && s.add("range-start"),
            a === i && s.add("range-end"),
            e.includes(a) &&
              (s.add(
                "selected",
                "bg-blue-700",
                "!bg-primary-700",
                "text-white"
              ),
              s.remove(
                "text-gray-900",
                "hover:bg-gray-100"
              )),
            a === this.focused && s.add("focused");
        });
    }
    refreshFocus() {
      this.grid.querySelectorAll(".focused").forEach((e) => {
        e.classList.remove("focused");
      }),
        this.grid.children[this.focused].classList.add("focused");
    }
  }
  class ee extends X {
    constructor(e, t) {
      super(e, t);
    }
    init(e, t = !0) {
      var i;
      t &&
        ((this.navStep = 10 * this.step),
        (this.beforeShowOption = `beforeShow${
          ((i = this.cellClass),
          [...i].reduce((e, t, i) => (e += i ? t : t.toUpperCase()), ""))
        }`),
        (this.grid = this.element),
        this.element.classList.add(
          this.name,
          "datepicker-grid",
          "w-64",
          "grid",
          "grid-cols-4"
        ),
        this.grid.appendChild(Y(n("span", 12)))),
        super.init(e);
    }
    setOptions(t) {
      if (
        (e(t, "minDate") &&
          (void 0 === t.minDate
            ? (this.minYear = this.minDate = void 0)
            : ((this.minYear = m(t.minDate, this.step)),
              (this.minDate = l(this.minYear, 0, 1)))),
        e(t, "maxDate") &&
          (void 0 === t.maxDate
            ? (this.maxYear = this.maxDate = void 0)
            : ((this.maxYear = m(t.maxDate, this.step)),
              (this.maxDate = l(this.maxYear, 11, 31)))),
        void 0 !== t[this.beforeShowOption])
      ) {
        const e = t[this.beforeShowOption];
        this.beforeShow = "function" == typeof e ? e : void 0;
      }
    }
    updateFocus() {
      const e = new Date(this.picker.viewDate),
        t = m(e, this.navStep),
        i = t + 9 * this.step;
      (this.first = t),
        (this.last = i),
        (this.start = t - this.step),
        (this.focused = m(e, this.step));
    }
    updateSelection() {
      const { dates: e, rangepicker: t } = this.picker.datepicker;
      (this.selected = e.reduce((e, t) => i(e, m(t, this.step)), [])),
        t &&
          t.dates &&
          (this.range = t.dates.map((e) => {
            if (void 0 !== e) return m(e, this.step);
          }));
    }
    render() {
      (this.disabled = []),
        this.picker.setViewSwitchLabel(`${this.first}-${this.last}`),
        this.picker.setPrevBtnDisabled(this.first <= this.minYear),
        this.picker.setNextBtnDisabled(this.last >= this.maxYear),
        Array.from(this.grid.children).forEach((e, t) => {
          const i = e.classList,
            r = this.start + t * this.step,
            a = l(r, 0, 1);
          if (
            ((e.className = `datepicker-cell hover:bg-gray-100  block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900  font-semibold text-sm ${this.cellClass}`),
            this.isMinView && (e.dataset.date = a),
            (e.textContent = e.dataset.year = r),
            0 === t ? i.add("prev") : 11 === t && i.add("next"),
            (r < this.minYear || r > this.maxYear) && i.add("disabled"),
            this.range)
          ) {
            const [e, t] = this.range;
            r > e && r < t && i.add("range"),
              r === e && i.add("range-start"),
              r === t && i.add("range-end");
          }
          this.selected.includes(r) &&
            (i.add(
              "selected",
              "bg-blue-700",
              "!bg-primary-700",
              "text-white"
            ),
            i.remove(
              "text-gray-900",
              "hover:bg-gray-100"
            )),
            r === this.focused && i.add("focused"),
            this.beforeShow && this.performBeforeHook(e, r, a);
        });
    }
    refresh() {
      const [e, t] = this.range || [];
      this.grid
        .querySelectorAll(
          ".range, .range-start, .range-end, .selected, .focused"
        )
        .forEach((e) => {
          e.classList.remove(
            "range",
            "range-start",
            "range-end",
            "selected",
            "bg-blue-700",
            "!bg-primary-700",
            "text-white",
            "focused"
          );
        }),
        Array.from(this.grid.children).forEach((i) => {
          const r = Number(i.textContent),
            a = i.classList;
          r > e && r < t && a.add("range"),
            r === e && a.add("range-start"),
            r === t && a.add("range-end"),
            this.selected.includes(r) &&
              (a.add(
                "selected",
                "bg-blue-700",
                "!bg-primary-700",
                "text-white"
              ),
              a.remove(
                "text-gray-900",
                "hover:bg-gray-100"
              )),
            r === this.focused && a.add("focused");
        });
    }
    refreshFocus() {
      const e = Math.round((this.focused - this.start) / this.step);
      this.grid.querySelectorAll(".focused").forEach((e) => {
        e.classList.remove("focused");
      }),
        this.grid.children[e].classList.add("focused");
    }
  }
  function te(e, t) {
    const i = {
      date: e.getDate(),
      viewDate: new Date(e.picker.viewDate),
      viewId: e.picker.currentView.id,
      datepicker: e,
    };
    e.element.dispatchEvent(new CustomEvent(t, { detail: i }));
  }
  function ie(e, t) {
    const { minDate: i, maxDate: r } = e.config,
      { currentView: a, viewDate: n } = e.picker;
    let d;
    switch (a.id) {
      case 0:
        d = u(n, t);
        break;
      case 1:
        d = g(n, t);
        break;
      default:
        d = g(n, t * a.navStep);
    }
    (d = s(d, i, r)), e.picker.changeFocus(d).render();
  }
  function re(e) {
    const t = e.picker.currentView.id;
    t !== e.config.maxView && e.picker.changeView(t + 1).render();
  }
  function ae(e) {
    e.config.updateOnBlur
      ? e.update({ autohide: !0 })
      : (e.refresh("input"), e.hide());
  }
  function se(e, t) {
    const i = e.picker,
      r = new Date(i.viewDate),
      a = i.currentView.id,
      s = 1 === a ? u(r, t - r.getMonth()) : g(r, t - r.getFullYear());
    i.changeFocus(s)
      .changeView(a - 1)
      .render();
  }
  function ne(t, i) {
    if (
      (void 0 !== i.title &&
        (i.title
          ? ((t.controls.title.textContent = i.title), j(t.controls.title))
          : ((t.controls.title.textContent = ""), W(t.controls.title))),
      i.prevArrow)
    ) {
      const e = t.controls.prevBtn;
      _(e),
        i.prevArrow.forEach((t) => {
          e.appendChild(t.cloneNode(!0));
        });
    }
    if (i.nextArrow) {
      const e = t.controls.nextBtn;
      _(e),
        i.nextArrow.forEach((t) => {
          e.appendChild(t.cloneNode(!0));
        });
    }
    if (
      (i.locale &&
        ((t.controls.todayBtn.textContent = i.locale.today),
        (t.controls.clearBtn.textContent = i.locale.clear)),
      void 0 !== i.todayBtn &&
        (i.todayBtn ? j(t.controls.todayBtn) : W(t.controls.todayBtn)),
      e(i, "minDate") || e(i, "maxDate"))
    ) {
      const { minDate: e, maxDate: i } = t.datepicker.config;
      t.controls.todayBtn.disabled = !a(c(), e, i);
    }
    void 0 !== i.clearBtn &&
      (i.clearBtn ? j(t.controls.clearBtn) : W(t.controls.clearBtn));
  }
  function de(e) {
    const { dates: i, config: r } = e;
    return s(i.length > 0 ? t(i) : r.defaultViewDate, r.minDate, r.maxDate);
  }
  function oe(e, t) {
    const i = new Date(e.viewDate),
      r = new Date(t),
      { id: a, year: s, first: n, last: d } = e.currentView,
      o = r.getFullYear();
    switch (
      ((e.viewDate = t),
      o !== i.getFullYear() && te(e.datepicker, "changeYear"),
      r.getMonth() !== i.getMonth() && te(e.datepicker, "changeMonth"),
      a)
    ) {
      case 0:
        return t < n || t > d;
      case 1:
        return o !== s;
      default:
        return o < n || o > d;
    }
  }
  function ce(e) {
    return window.getComputedStyle(e).direction;
  }
  class le {
    constructor(e) {
      this.datepicker = e;
      const t = J.replace(/%buttonClass%/g, e.config.buttonClass),
        i = (this.element = Y(t).firstChild),
        [r, a, s] = i.firstChild.children,
        n = r.firstElementChild,
        [d, o, l] = r.lastElementChild.children,
        [h, u] = s.firstChild.children,
        g = {
          title: n,
          prevBtn: d,
          viewSwitch: o,
          nextBtn: l,
          todayBtn: h,
          clearBtn: u,
        };
      (this.main = a), (this.controls = g);
      const f = e.inline ? "inline" : "dropdown";
      i.classList.add(`datepicker-${f}`),
        "dropdown" === f &&
          i.classList.add(
            "dropdown",
            "absolute",
            "top-0",
            "left-0",
            "z-50",
            "pt-2"
          ),
        ne(this, e.config),
        (this.viewDate = de(e)),
        F(e, [
          [
            i,
            "click",
            function (e) {
              e.inline || e.config.disableTouchKeyboard || e.inputField.focus();
            }.bind(null, e),
            { capture: !0 },
          ],
          [
            a,
            "click",
            function (e, t) {
              const i = L(t, ".datepicker-cell");
              if (!i || i.classList.contains("disabled")) return;
              const { id: r, isMinView: a } = e.picker.currentView;
              a
                ? e.setDate(Number(i.dataset.date))
                : se(
                    e,
                    1 === r ? Number(i.dataset.month) : Number(i.dataset.year)
                  );
            }.bind(null, e),
          ],
          [
            g.viewSwitch,
            "click",
            function (e) {
              re(e);
            }.bind(null, e),
          ],
          [
            g.prevBtn,
            "click",
            function (e) {
              ie(e, -1);
            }.bind(null, e),
          ],
          [
            g.nextBtn,
            "click",
            function (e) {
              ie(e, 1);
            }.bind(null, e),
          ],
          [
            g.todayBtn,
            "click",
            function (e) {
              const t = e.picker,
                i = c();
              if (1 === e.config.todayBtnMode) {
                if (e.config.autohide) return void e.setDate(i);
                e.setDate(i, { render: !1 }), t.update();
              }
              t.viewDate !== i && t.changeFocus(i), t.changeView(0).render();
            }.bind(null, e),
          ],
          [
            g.clearBtn,
            "click",
            function (e) {
              e.setDate({ clear: !0 });
            }.bind(null, e),
          ],
        ]),
        (this.views = [
          new G(this),
          new Z(this),
          new ee(this, { id: 2, name: "years", cellClass: "year", step: 1 }),
          new ee(this, {
            id: 3,
            name: "decades",
            cellClass: "decade",
            step: 10,
          }),
        ]),
        (this.currentView = this.views[e.config.startView]),
        this.currentView.render(),
        this.main.appendChild(this.currentView.element),
        e.config.container.appendChild(this.element);
    }
    setOptions(e) {
      ne(this, e),
        this.views.forEach((t) => {
          t.init(e, !1);
        }),
        this.currentView.render();
    }
    detach() {
      this.datepicker.config.container.removeChild(this.element);
    }
    show() {
      if (this.active) return;
      this.element.classList.add("active", "block"),
        this.element.classList.remove("hidden"),
        (this.active = !0);
      const e = this.datepicker;
      if (!e.inline) {
        const t = ce(e.inputField);
        t !== ce(e.config.container)
          ? (this.element.dir = t)
          : this.element.dir && this.element.removeAttribute("dir"),
          this.place(),
          e.config.disableTouchKeyboard && e.inputField.blur();
      }
      te(e, "show");
    }
    hide() {
      this.active &&
        (this.datepicker.exitEditMode(),
        this.element.classList.remove("active", "block"),
        this.element.classList.add("active", "block", "hidden"),
        (this.active = !1),
        te(this.datepicker, "hide"));
    }
    place() {
      const { classList: e, style: t } = this.element,
        { config: i, inputField: r } = this.datepicker,
        a = i.container,
        { width: s, height: n } = this.element.getBoundingClientRect(),
        { left: d, top: o, width: c } = a.getBoundingClientRect(),
        { left: l, top: h, width: u, height: g } = r.getBoundingClientRect();
      let f,
        p,
        m,
        { x: b, y: y } = i.orientation;
      a === document.body
        ? ((f = window.scrollY), (p = l + window.scrollX), (m = h + f))
        : ((p = l - d), (m = h - o + (f = a.scrollTop))),
        "auto" === b &&
          (p < 0
            ? ((b = "left"), (p = 10))
            : (b = p + s > c ? "right" : "rtl" === ce(r) ? "right" : "left")),
        "right" === b && (p -= s - u),
        "auto" === y && (y = m - n < f ? "bottom" : "top"),
        "top" === y ? (m -= n) : (m += g),
        e.remove(
          "datepicker-orient-top",
          "datepicker-orient-bottom",
          "datepicker-orient-right",
          "datepicker-orient-left"
        ),
        e.add(`datepicker-orient-${y}`, `datepicker-orient-${b}`),
        (t.top = m ? `${m}px` : m),
        (t.left = p ? `${p}px` : p);
    }
    setViewSwitchLabel(e) {
      this.controls.viewSwitch.textContent = e;
    }
    setPrevBtnDisabled(e) {
      this.controls.prevBtn.disabled = e;
    }
    setNextBtnDisabled(e) {
      this.controls.nextBtn.disabled = e;
    }
    changeView(e) {
      const t = this.currentView,
        i = this.views[e];
      return (
        i.id !== t.id &&
          ((this.currentView = i),
          (this._renderMethod = "render"),
          te(this.datepicker, "changeView"),
          this.main.replaceChild(i.element, t.element)),
        this
      );
    }
    changeFocus(e) {
      return (
        (this._renderMethod = oe(this, e) ? "render" : "refreshFocus"),
        this.views.forEach((e) => {
          e.updateFocus();
        }),
        this
      );
    }
    update() {
      const e = de(this.datepicker);
      return (
        (this._renderMethod = oe(this, e) ? "render" : "refresh"),
        this.views.forEach((e) => {
          e.updateFocus(), e.updateSelection();
        }),
        this
      );
    }
    render(e = !0) {
      const t = (e && this._renderMethod) || "render";
      delete this._renderMethod, this.currentView[t]();
    }
  }
  function he(e, t, i, r) {
    const s = e.picker,
      n = s.currentView,
      d = n.step || 1;
    let o,
      c,
      l = s.viewDate;
    switch (n.id) {
      case 0:
        (l = r ? h(l, 7 * i) : t.ctrlKey || t.metaKey ? g(l, i) : h(l, i)),
          (o = h),
          (c = (e) => n.disabled.includes(e));
        break;
      case 1:
        (l = u(l, r ? 4 * i : i)),
          (o = u),
          (c = (e) => {
            const t = new Date(e),
              { year: i, disabled: r } = n;
            return t.getFullYear() === i && r.includes(t.getMonth());
          });
        break;
      default:
        (l = g(l, i * (r ? 4 : 1) * d)),
          (o = g),
          (c = (e) => n.disabled.includes(m(e, d)));
    }
    void 0 !==
      (l = (function e(t, i, r, s, n, d) {
        if (a(t, n, d)) return s(t) ? e(i(t, r), i, r, s, n, d) : t;
      })(l, o, i < 0 ? -d : d, c, n.minDate, n.maxDate)) &&
      s.changeFocus(l).render();
  }
  function ue(e, t) {
    return e.map((e) => S(e, t.format, t.locale)).join(t.dateDelimiter);
  }
  function ge(e, t, i = !1) {
    const { config: r, dates: s, rangepicker: n } = e;
    if (0 === t.length) return i ? [] : void 0;
    const d = n && e === n.datepickers[1];
    let o = t.reduce((e, t) => {
      let i = M(t, r.format, r.locale);
      if (void 0 === i) return e;
      if (r.pickLevel > 0) {
        const e = new Date(i);
        i =
          1 === r.pickLevel
            ? d
              ? e.setMonth(e.getMonth() + 1, 0)
              : e.setDate(1)
            : d
            ? e.setFullYear(e.getFullYear() + 1, 0, 0)
            : e.setMonth(0, 1);
      }
      return (
        !a(i, r.minDate, r.maxDate) ||
          e.includes(i) ||
          r.datesDisabled.includes(i) ||
          r.daysOfWeekDisabled.includes(new Date(i).getDay()) ||
          e.push(i),
        e
      );
    }, []);
    return 0 !== o.length
      ? (r.multidate &&
          !i &&
          (o = o.reduce(
            (e, t) => (s.includes(t) || e.push(t), e),
            s.filter((e) => !o.includes(e))
          )),
        r.maxNumberOfDates && o.length > r.maxNumberOfDates
          ? o.slice(-1 * r.maxNumberOfDates)
          : o)
      : void 0;
  }
  function fe(e, t = 3, i = !0) {
    const { config: r, picker: a, inputField: s } = e;
    if (2 & t) {
      const e = a.active ? r.pickLevel : r.startView;
      a.update().changeView(e).render(i);
    }
    1 & t && s && (s.value = ue(e.dates, r));
  }
  function pe(e, t, i) {
    let { clear: r, render: a, autohide: s } = i;
    void 0 === a && (a = !0),
      a ? void 0 === s && (s = e.config.autohide) : (s = !1);
    const n = ge(e, t, r);
    n &&
      (n.toString() !== e.dates.toString()
        ? ((e.dates = n), fe(e, a ? 3 : 1), te(e, "changeDate"))
        : fe(e, 1),
      s && e.hide());
  }
  class me {
    constructor(e, t = {}, i) {
      (e.datepicker = this), (this.element = e);
      const a = (this.config = Object.assign(
        {
          buttonClass: (t.buttonClass && String(t.buttonClass)) || "button",
          container: document.body,
          defaultViewDate: c(),
          maxDate: void 0,
          minDate: void 0,
        },
        q(B, this)
      ));
      (this._options = t), Object.assign(a, q(t, this));
      const s = (this.inline = "INPUT" !== e.tagName);
      let n, d;
      if (s)
        (a.container = e),
          (d = r(e.dataset.date, a.dateDelimiter)),
          delete e.dataset.date;
      else {
        const i = t.container ? document.querySelector(t.container) : null;
        i && (a.container = i),
          (n = this.inputField = e).classList.add("datepicker-input"),
          (d = r(n.value, a.dateDelimiter));
      }
      if (i) {
        const e = i.inputs.indexOf(n),
          t = i.datepickers;
        if (e < 0 || e > 1 || !Array.isArray(t))
          throw Error("Invalid rangepicker object.");
        (t[e] = this),
          Object.defineProperty(this, "rangepicker", { get: () => i });
      }
      this.dates = [];
      const o = ge(this, d);
      o && o.length > 0 && (this.dates = o), n && (n.value = ue(this.dates, a));
      const l = (this.picker = new le(this));
      if (s) this.show();
      else {
        const e = function (e, t) {
          const i = e.element;
          if (i !== document.activeElement) return;
          const r = e.picker.element;
          L(t, (e) => e === i || e === r) || ae(e);
        }.bind(null, this);
        F(this, [
          [
            n,
            "keydown",
            function (e, t) {
              if ("Tab" === t.key) return void ae(e);
              const i = e.picker,
                { id: r, isMinView: a } = i.currentView;
              if (i.active)
                if (e.editMode)
                  switch (t.key) {
                    case "Escape":
                      i.hide();
                      break;
                    case "Enter":
                      e.exitEditMode({
                        update: !0,
                        autohide: e.config.autohide,
                      });
                      break;
                    default:
                      return;
                  }
                else
                  switch (t.key) {
                    case "Escape":
                      i.hide();
                      break;
                    case "ArrowLeft":
                      if (t.ctrlKey || t.metaKey) ie(e, -1);
                      else {
                        if (t.shiftKey) return void e.enterEditMode();
                        he(e, t, -1, !1);
                      }
                      break;
                    case "ArrowRight":
                      if (t.ctrlKey || t.metaKey) ie(e, 1);
                      else {
                        if (t.shiftKey) return void e.enterEditMode();
                        he(e, t, 1, !1);
                      }
                      break;
                    case "ArrowUp":
                      if (t.ctrlKey || t.metaKey) re(e);
                      else {
                        if (t.shiftKey) return void e.enterEditMode();
                        he(e, t, -1, !0);
                      }
                      break;
                    case "ArrowDown":
                      if (t.shiftKey && !t.ctrlKey && !t.metaKey)
                        return void e.enterEditMode();
                      he(e, t, 1, !0);
                      break;
                    case "Enter":
                      a ? e.setDate(i.viewDate) : i.changeView(r - 1).render();
                      break;
                    case "Backspace":
                    case "Delete":
                      return void e.enterEditMode();
                    default:
                      return void (
                        1 !== t.key.length ||
                        t.ctrlKey ||
                        t.metaKey ||
                        e.enterEditMode()
                      );
                  }
              else
                switch (t.key) {
                  case "ArrowDown":
                  case "Escape":
                    i.show();
                    break;
                  case "Enter":
                    e.update();
                    break;
                  default:
                    return;
                }
              t.preventDefault(), t.stopPropagation();
            }.bind(null, this),
          ],
          [
            n,
            "focus",
            function (e) {
              e.config.showOnFocus && !e._showing && e.show();
            }.bind(null, this),
          ],
          [
            n,
            "mousedown",
            function (e, t) {
              const i = t.target;
              (e.picker.active || e.config.showOnClick) &&
                ((i._active = i === document.activeElement),
                (i._clicking = setTimeout(() => {
                  delete i._active, delete i._clicking;
                }, 2e3)));
            }.bind(null, this),
          ],
          [
            n,
            "click",
            function (e, t) {
              const i = t.target;
              i._clicking &&
                (clearTimeout(i._clicking),
                delete i._clicking,
                i._active && e.enterEditMode(),
                delete i._active,
                e.config.showOnClick && e.show());
            }.bind(null, this),
          ],
          [
            n,
            "paste",
            function (e, t) {
              t.clipboardData.types.includes("text/plain") && e.enterEditMode();
            }.bind(null, this),
          ],
          [document, "mousedown", e],
          [document, "touchstart", e],
          [window, "resize", l.place.bind(l)],
        ]);
      }
    }
    static formatDate(e, t, i) {
      return S(e, t, (i && N[i]) || N.en);
    }
    static parseDate(e, t, i) {
      return M(e, t, (i && N[i]) || N.en);
    }
    static get locales() {
      return N;
    }
    get active() {
      return !(!this.picker || !this.picker.active);
    }
    get pickerElement() {
      return this.picker ? this.picker.element : void 0;
    }
    setOptions(e) {
      const t = this.picker,
        i = q(e, this);
      Object.assign(this._options, e),
        Object.assign(this.config, i),
        t.setOptions(i),
        fe(this, 3);
    }
    show() {
      if (this.inputField) {
        if (this.inputField.disabled) return;
        this.inputField !== document.activeElement &&
          ((this._showing = !0), this.inputField.focus(), delete this._showing);
      }
      this.picker.show();
    }
    hide() {
      this.inline ||
        (this.picker.hide(),
        this.picker.update().changeView(this.config.startView).render());
    }
    destroy() {
      return (
        this.hide(),
        V(this),
        this.picker.detach(),
        this.inline || this.inputField.classList.remove("datepicker-input"),
        delete this.element.datepicker,
        this
      );
    }
    getDate(e) {
      const t = e ? (t) => S(t, e, this.config.locale) : (e) => new Date(e);
      return this.config.multidate
        ? this.dates.map(t)
        : this.dates.length > 0
        ? t(this.dates[0])
        : void 0;
    }
    setDate(...e) {
      const i = [...e],
        r = {},
        a = t(e);
      "object" != typeof a ||
        Array.isArray(a) ||
        a instanceof Date ||
        !a ||
        Object.assign(r, i.pop()),
        pe(this, Array.isArray(i[0]) ? i[0] : i, r);
    }
    update(e) {
      if (this.inline) return;
      const t = { clear: !0, autohide: !(!e || !e.autohide) };
      pe(this, r(this.inputField.value, this.config.dateDelimiter), t);
    }
    refresh(e, t = !1) {
      let i;
      e && "string" != typeof e && ((t = e), (e = void 0)),
        fe(this, (i = "picker" === e ? 2 : "input" === e ? 1 : 3), !t);
    }
    enterEditMode() {
      this.inline ||
        !this.picker.active ||
        this.editMode ||
        ((this.editMode = !0),
        this.inputField.classList.add(
          "in-edit",
          "border-blue-700",
          "!border-primary-700"
        ));
    }
    exitEditMode(e) {
      if (this.inline || !this.editMode) return;
      const t = Object.assign({ update: !1 }, e);
      delete this.editMode,
        this.inputField.classList.remove(
          "in-edit",
          "border-blue-700",
          "!border-primary-700"
        ),
        t.update && this.update(t);
    }
  }
  function be(e) {
    const t = Object.assign({}, e);
    return (
      delete t.inputs, delete t.allowOneSidedRange, delete t.maxNumberOfDates, t
    );
  }
  function ye(e, t, i, r) {
    F(e, [[i, "changeDate", t]]), new me(i, r, e);
  }
  function we(e, t) {
    if (e._updating) return;
    e._updating = !0;
    const i = t.target;
    if (void 0 === i.datepicker) return;
    const r = e.datepickers,
      a = { render: !1 },
      s = e.inputs.indexOf(i),
      n = 0 === s ? 1 : 0,
      d = r[s].dates[0],
      o = r[n].dates[0];
    void 0 !== d && void 0 !== o
      ? 0 === s && d > o
        ? (r[0].setDate(o, a), r[1].setDate(d, a))
        : 1 === s && d < o && (r[0].setDate(d, a), r[1].setDate(o, a))
      : e.allowOneSidedRange ||
        (void 0 === d && void 0 === o) ||
        ((a.clear = !0), r[n].setDate(r[s].dates, a)),
      r[0].picker.update().render(),
      r[1].picker.update().render(),
      delete e._updating;
  }
  (window.Datepicker = me),
    (window.DateRangePicker = class {
      constructor(e, t = {}) {
        const i = Array.isArray(t.inputs)
          ? t.inputs
          : Array.from(e.querySelectorAll("input"));
        if (i.length < 2) return;
        (e.rangepicker = this),
          (this.element = e),
          (this.inputs = i.slice(0, 2)),
          (this.allowOneSidedRange = !!t.allowOneSidedRange);
        const r = we.bind(null, this),
          a = be(t),
          s = [];
        Object.defineProperty(this, "datepickers", { get: () => s }),
          ye(this, r, this.inputs[0], a),
          ye(this, r, this.inputs[1], a),
          Object.freeze(s),
          s[0].dates.length > 0
            ? we(this, { target: this.inputs[0] })
            : s[1].dates.length > 0 && we(this, { target: this.inputs[1] });
      }
      get dates() {
        return 2 === this.datepickers.length
          ? [this.datepickers[0].dates[0], this.datepickers[1].dates[0]]
          : void 0;
      }
      setOptions(e) {
        this.allowOneSidedRange = !!e.allowOneSidedRange;
        const t = be(e);
        this.datepickers[0].setOptions(t), this.datepickers[1].setOptions(t);
      }
      destroy() {
        this.datepickers[0].destroy(),
          this.datepickers[1].destroy(),
          V(this),
          delete this.element.rangepicker;
      }
      getDates(e) {
        const t = e
          ? (t) => S(t, e, this.datepickers[0].config.locale)
          : (e) => new Date(e);
        return this.dates.map((e) => (void 0 === e ? e : t(e)));
      }
      setDates(e, t) {
        const [i, r] = this.datepickers,
          a = this.dates;
        (this._updating = !0),
          i.setDate(e),
          r.setDate(t),
          delete this._updating,
          r.dates[0] !== a[1]
            ? we(this, { target: this.inputs[1] })
            : i.dates[0] !== a[0] && we(this, { target: this.inputs[0] });
      }
    });
})();
