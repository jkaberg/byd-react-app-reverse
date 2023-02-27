(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
	["chunk-2bf6ee08"], {
		cbae: function(e, t, n) {
			"use strict";
			n("ec1e")
		},
		ec1e: function(e, t, n) {},
		ffea: function(e, t, n) {
			"use strict";
			n.r(t);
			var a = function() {
					var e = this,
						t = e.$createElement,
						n = e._self._c || t;
					return n("div", {
						staticClass: "phone-page"
					}, [n("p", {
						staticClass: "html-content",
						domProps: {
							innerHTML: e._s(e.textHtml)
						}
					})])
				},
				i = [],
				s = (n("d3b7"), n("25f0"), n("ca00")),
				c = n("0fea"),
				r = {
					name: "AppNotice",
					data: function() {
						return {
							textHtml: ""
						}
					},
					created: function() {
						var e = "test11";
						this.textHtml = e, this.initHtml()
					},
					methods: {
						initHtml: function() {
							var e = "0",
								t = "0",
								n = "1.0",
								a = "E987E8B6BBEC3F920D219F7A4B5C619A",
								i = (new Date).getTime();
							i = 1633523328123;
							var r = "agreementType=" + t + "&reqTimestamp=" + i + "&softType=" + e + "&version=" + n + "&password=" + a,
								o = Object(s["a"])(r),
								p = {
									sign: o,
									reqTimestamp: i.toString(),
									encryData: {
										softType: e,
										agreementType: t,
										version: n
									}
								},
								f = Object(s["d"])(JSON.stringify(p)),
								m = "http://124.71.64.133:9090/app/agreement/getContent";
							Object(c["a"])(m, f).then((function(e) {
								0 === e.code && e.data
							}))
						}
					}
				},
				o = r,
				p = (n("cbae"), n("2877")),
				f = Object(p["a"])(o, a, i, !1, null, "ee23145e", null);
			t["default"] = f.exports
		}
	}
]);