(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
	["chunk-e7cff020"], {
		"1ab2": function(t, e, r) {
			var i = r("7bcc"),
				n = r("bc6c");

			function o(t, e) {
				var r = new n(e);
				return r.process(t)
			}
			for (var a in e = t.exports = o, e.FilterCSS = n, i) e[a] = i[a];
			"undefined" !== typeof window && (window.filterCSS = t.exports)
		},
		"2f8d": function(t, e, r) {
			"use strict";
			r("9ee4")
		},
		"3b16": function(t, e, r) {
			var i = r("1ab2").FilterCSS,
				n = r("bda0"),
				o = r("50e1"),
				a = o.parseTag,
				s = o.parseAttr,
				l = r("eb71");

			function c(t) {
				return void 0 === t || null === t
			}

			function u(t) {
				var e = l.spaceIndex(t);
				if (-1 === e) return {
					html: "",
					closing: "/" === t[t.length - 2]
				};
				t = l.trim(t.slice(e + 1, -1));
				var r = "/" === t[t.length - 1];
				return r && (t = l.trim(t.slice(0, -1))), {
					html: t,
					closing: r
				}
			}

			function f(t) {
				var e = {};
				for (var r in t) e[r] = t[r];
				return e
			}

			function g(t) {
				t = f(t || {}), t.stripIgnoreTag && (t.onIgnoreTag, t.onIgnoreTag = n.onIgnoreTagStripAll), t.whiteList = t.whiteList || t.allowList || n.whiteList, t.onTag = t.onTag || n.onTag, t.onTagAttr = t.onTagAttr || n.onTagAttr, t.onIgnoreTag = t.onIgnoreTag || n.onIgnoreTag, t.onIgnoreTagAttr = t.onIgnoreTagAttr || n.onIgnoreTagAttr, t.safeAttrValue = t.safeAttrValue || n.safeAttrValue, t.escapeHtml = t.escapeHtml || n.escapeHtml, this.options = t, !1 === t.css ? this.cssFilter = !1 : (t.css = t.css || {}, this.cssFilter = new i(t.css))
			}
			g.prototype.process = function(t) {
				if (t = t || "", t = t.toString(), !t) return "";
				var e = this,
					r = e.options,
					i = r.whiteList,
					o = r.onTag,
					f = r.onIgnoreTag,
					g = r.onTagAttr,
					p = r.onIgnoreTagAttr,
					d = r.safeAttrValue,
					m = r.escapeHtml,
					h = e.cssFilter;
				r.stripBlankChar && (t = n.stripBlankChar(t)), r.allowCommentTag || (t = n.stripCommentTag(t));
				var b = !1;
				if (r.stripIgnoreTagBody) {
					b = n.StripTagBody(r.stripIgnoreTagBody, f);
					f = b.onIgnoreTag
				}
				var v = a(t, (function(t, e, r, n, a) {
					var b = {
							sourcePosition: t,
							position: e,
							isClosing: a,
							isWhite: i.hasOwnProperty(r)
						},
						v = o(r, n, b);
					if (!c(v)) return v;
					if (b.isWhite) {
						if (b.isClosing) return "</" + r + ">";
						var y = u(n),
							w = i[r],
							x = s(y.html, (function(t, e) {
								var i = -1 !== l.indexOf(w, t),
									n = g(r, t, e, i);
								if (!c(n)) return n;
								if (i) return e = d(r, t, e, h), e ? t + '="' + e + '"' : t;
								n = p(r, t, e, i);
								return c(n) ? void 0 : n
							}));
						n = "<" + r;
						return x && (n += " " + x), y.closing && (n += " /"), n += ">", n
					}
					v = f(r, n, b);
					return c(v) ? m(n) : v
				}), m);
				return b && (v = b.remove(v)), v
			}, t.exports = g
		},
		"50e1": function(t, e, r) {
			var i = r("eb71");

			function n(t) {
				var e = i.spaceIndex(t);
				if (-1 === e) var r = t.slice(1, -1);
				else r = t.slice(1, e + 1);
				return r = i.trim(r).toLowerCase(), "/" === r.slice(0, 1) && (r = r.slice(1)), "/" === r.slice(-1) && (r = r.slice(0, -1)), r
			}

			function o(t) {
				return "</" === t.slice(0, 2)
			}

			function a(t, e, r) {
				"use strict";
				var i = "",
					a = 0,
					s = !1,
					l = !1,
					c = 0,
					u = t.length,
					f = "",
					g = "";
				t: for (c = 0; c < u; c++) {
					var p = t.charAt(c);
					if (!1 === s) {
						if ("<" === p) {
							s = c;
							continue
						}
					} else if (!1 === l) {
						if ("<" === p) {
							i += r(t.slice(a, c)), s = c, a = c;
							continue
						}
						if (">" === p) {
							i += r(t.slice(a, s)), g = t.slice(s, c + 1), f = n(g), i += e(s, i.length, f, g, o(g)), a = c + 1, s = !1;
							continue
						}
						if ('"' === p || "'" === p) {
							var d = 1,
								m = t.charAt(c - d);
							while ("" === m.trim() || "=" === m) {
								if ("=" === m) {
									l = p;
									continue t
								}
								m = t.charAt(c - ++d)
							}
						}
					} else if (p === l) {
						l = !1;
						continue
					}
				}
				return a < t.length && (i += r(t.substr(a))), i
			}
			var s = /[^a-zA-Z0-9_:\.\-]/gim;

			function l(t, e) {
				"use strict";
				var r = 0,
					n = [],
					o = !1,
					a = t.length;

				function l(t, r) {
					if (t = i.trim(t), t = t.replace(s, "").toLowerCase(), !(t.length < 1)) {
						var o = e(t, r || "");
						o && n.push(o)
					}
				}
				for (var f = 0; f < a; f++) {
					var p, d, m = t.charAt(f);
					if (!1 !== o || "=" !== m)
						if (!1 === o || f !== r || '"' !== m && "'" !== m || "=" !== t.charAt(f - 1))
							if (/\s|\n|\t/.test(m)) {
								if (t = t.replace(/\s|\n|\t/g, " "), !1 === o) {
									if (d = c(t, f), -1 === d) {
										p = i.trim(t.slice(r, f)), l(p), o = !1, r = f + 1;
										continue
									}
									f = d - 1;
									continue
								}
								if (d = u(t, f - 1), -1 === d) {
									p = i.trim(t.slice(r, f)), p = g(p), l(o, p), o = !1, r = f + 1;
									continue
								}
							} else;
					else {
						if (d = t.indexOf(m, f + 1), -1 === d) break;
						p = i.trim(t.slice(r + 1, d)), l(o, p), o = !1, f = d, r = f + 1
					} else o = t.slice(r, f), r = f + 1
				}
				return r < t.length && (!1 === o ? l(t.slice(r)) : l(o, g(i.trim(t.slice(r))))), i.trim(n.join(" "))
			}

			function c(t, e) {
				for (; e < t.length; e++) {
					var r = t[e];
					if (" " !== r) return "=" === r ? e : -1
				}
			}

			function u(t, e) {
				for (; e > 0; e--) {
					var r = t[e];
					if (" " !== r) return "=" === r ? e : -1
				}
			}

			function f(t) {
				return '"' === t[0] && '"' === t[t.length - 1] || "'" === t[0] && "'" === t[t.length - 1]
			}

			function g(t) {
				return f(t) ? t.substr(1, t.length - 2) : t
			}
			e.parseTag = a, e.parseAttr = l
		},
		"5e38": function(t, e, r) {
			var i = r("bda0"),
				n = r("50e1"),
				o = r("3b16");

			function a(t, e) {
				var r = new o(e);
				return r.process(t)
			}
			for (var s in e = t.exports = a, e.filterXSS = a, e.FilterXSS = o, i) e[s] = i[s];
			for (var s in n) e[s] = n[s];

			function l() {
				return "undefined" !== typeof self && "undefined" !== typeof DedicatedWorkerGlobalScope && self instanceof DedicatedWorkerGlobalScope
			}
			"undefined" !== typeof window && (window.filterXSS = t.exports), l() && (self.filterXSS = t.exports)
		},
		"7bcc": function(t, e) {
			function r() {
				var t = {
					"align-content": !1,
					"align-items": !1,
					"align-self": !1,
					"alignment-adjust": !1,
					"alignment-baseline": !1,
					all: !1,
					"anchor-point": !1,
					animation: !1,
					"animation-delay": !1,
					"animation-direction": !1,
					"animation-duration": !1,
					"animation-fill-mode": !1,
					"animation-iteration-count": !1,
					"animation-name": !1,
					"animation-play-state": !1,
					"animation-timing-function": !1,
					azimuth: !1,
					"backface-visibility": !1,
					background: !0,
					"background-attachment": !0,
					"background-clip": !0,
					"background-color": !0,
					"background-image": !0,
					"background-origin": !0,
					"background-position": !0,
					"background-repeat": !0,
					"background-size": !0,
					"baseline-shift": !1,
					binding: !1,
					bleed: !1,
					"bookmark-label": !1,
					"bookmark-level": !1,
					"bookmark-state": !1,
					border: !0,
					"border-bottom": !0,
					"border-bottom-color": !0,
					"border-bottom-left-radius": !0,
					"border-bottom-right-radius": !0,
					"border-bottom-style": !0,
					"border-bottom-width": !0,
					"border-collapse": !0,
					"border-color": !0,
					"border-image": !0,
					"border-image-outset": !0,
					"border-image-repeat": !0,
					"border-image-slice": !0,
					"border-image-source": !0,
					"border-image-width": !0,
					"border-left": !0,
					"border-left-color": !0,
					"border-left-style": !0,
					"border-left-width": !0,
					"border-radius": !0,
					"border-right": !0,
					"border-right-color": !0,
					"border-right-style": !0,
					"border-right-width": !0,
					"border-spacing": !0,
					"border-style": !0,
					"border-top": !0,
					"border-top-color": !0,
					"border-top-left-radius": !0,
					"border-top-right-radius": !0,
					"border-top-style": !0,
					"border-top-width": !0,
					"border-width": !0,
					bottom: !1,
					"box-decoration-break": !0,
					"box-shadow": !0,
					"box-sizing": !0,
					"box-snap": !0,
					"box-suppress": !0,
					"break-after": !0,
					"break-before": !0,
					"break-inside": !0,
					"caption-side": !1,
					chains: !1,
					clear: !0,
					clip: !1,
					"clip-path": !1,
					"clip-rule": !1,
					color: !0,
					"color-interpolation-filters": !0,
					"column-count": !1,
					"column-fill": !1,
					"column-gap": !1,
					"column-rule": !1,
					"column-rule-color": !1,
					"column-rule-style": !1,
					"column-rule-width": !1,
					"column-span": !1,
					"column-width": !1,
					columns: !1,
					contain: !1,
					content: !1,
					"counter-increment": !1,
					"counter-reset": !1,
					"counter-set": !1,
					crop: !1,
					cue: !1,
					"cue-after": !1,
					"cue-before": !1,
					cursor: !1,
					direction: !1,
					display: !0,
					"display-inside": !0,
					"display-list": !0,
					"display-outside": !0,
					"dominant-baseline": !1,
					elevation: !1,
					"empty-cells": !1,
					filter: !1,
					flex: !1,
					"flex-basis": !1,
					"flex-direction": !1,
					"flex-flow": !1,
					"flex-grow": !1,
					"flex-shrink": !1,
					"flex-wrap": !1,
					float: !1,
					"float-offset": !1,
					"flood-color": !1,
					"flood-opacity": !1,
					"flow-from": !1,
					"flow-into": !1,
					font: !0,
					"font-family": !0,
					"font-feature-settings": !0,
					"font-kerning": !0,
					"font-language-override": !0,
					"font-size": !0,
					"font-size-adjust": !0,
					"font-stretch": !0,
					"font-style": !0,
					"font-synthesis": !0,
					"font-variant": !0,
					"font-variant-alternates": !0,
					"font-variant-caps": !0,
					"font-variant-east-asian": !0,
					"font-variant-ligatures": !0,
					"font-variant-numeric": !0,
					"font-variant-position": !0,
					"font-weight": !0,
					grid: !1,
					"grid-area": !1,
					"grid-auto-columns": !1,
					"grid-auto-flow": !1,
					"grid-auto-rows": !1,
					"grid-column": !1,
					"grid-column-end": !1,
					"grid-column-start": !1,
					"grid-row": !1,
					"grid-row-end": !1,
					"grid-row-start": !1,
					"grid-template": !1,
					"grid-template-areas": !1,
					"grid-template-columns": !1,
					"grid-template-rows": !1,
					"hanging-punctuation": !1,
					height: !0,
					hyphens: !1,
					icon: !1,
					"image-orientation": !1,
					"image-resolution": !1,
					"ime-mode": !1,
					"initial-letters": !1,
					"inline-box-align": !1,
					"justify-content": !1,
					"justify-items": !1,
					"justify-self": !1,
					left: !1,
					"letter-spacing": !0,
					"lighting-color": !0,
					"line-box-contain": !1,
					"line-break": !1,
					"line-grid": !1,
					"line-height": !1,
					"line-snap": !1,
					"line-stacking": !1,
					"line-stacking-ruby": !1,
					"line-stacking-shift": !1,
					"line-stacking-strategy": !1,
					"list-style": !0,
					"list-style-image": !0,
					"list-style-position": !0,
					"list-style-type": !0,
					margin: !0,
					"margin-bottom": !0,
					"margin-left": !0,
					"margin-right": !0,
					"margin-top": !0,
					"marker-offset": !1,
					"marker-side": !1,
					marks: !1,
					mask: !1,
					"mask-box": !1,
					"mask-box-outset": !1,
					"mask-box-repeat": !1,
					"mask-box-slice": !1,
					"mask-box-source": !1,
					"mask-box-width": !1,
					"mask-clip": !1,
					"mask-image": !1,
					"mask-origin": !1,
					"mask-position": !1,
					"mask-repeat": !1,
					"mask-size": !1,
					"mask-source-type": !1,
					"mask-type": !1,
					"max-height": !0,
					"max-lines": !1,
					"max-width": !0,
					"min-height": !0,
					"min-width": !0,
					"move-to": !1,
					"nav-down": !1,
					"nav-index": !1,
					"nav-left": !1,
					"nav-right": !1,
					"nav-up": !1,
					"object-fit": !1,
					"object-position": !1,
					opacity: !1,
					order: !1,
					orphans: !1,
					outline: !1,
					"outline-color": !1,
					"outline-offset": !1,
					"outline-style": !1,
					"outline-width": !1,
					overflow: !1,
					"overflow-wrap": !1,
					"overflow-x": !1,
					"overflow-y": !1,
					padding: !0,
					"padding-bottom": !0,
					"padding-left": !0,
					"padding-right": !0,
					"padding-top": !0,
					page: !1,
					"page-break-after": !1,
					"page-break-before": !1,
					"page-break-inside": !1,
					"page-policy": !1,
					pause: !1,
					"pause-after": !1,
					"pause-before": !1,
					perspective: !1,
					"perspective-origin": !1,
					pitch: !1,
					"pitch-range": !1,
					"play-during": !1,
					position: !1,
					"presentation-level": !1,
					quotes: !1,
					"region-fragment": !1,
					resize: !1,
					rest: !1,
					"rest-after": !1,
					"rest-before": !1,
					richness: !1,
					right: !1,
					rotation: !1,
					"rotation-point": !1,
					"ruby-align": !1,
					"ruby-merge": !1,
					"ruby-position": !1,
					"shape-image-threshold": !1,
					"shape-outside": !1,
					"shape-margin": !1,
					size: !1,
					speak: !1,
					"speak-as": !1,
					"speak-header": !1,
					"speak-numeral": !1,
					"speak-punctuation": !1,
					"speech-rate": !1,
					stress: !1,
					"string-set": !1,
					"tab-size": !1,
					"table-layout": !1,
					"text-align": !0,
					"text-align-last": !0,
					"text-combine-upright": !0,
					"text-decoration": !0,
					"text-decoration-color": !0,
					"text-decoration-line": !0,
					"text-decoration-skip": !0,
					"text-decoration-style": !0,
					"text-emphasis": !0,
					"text-emphasis-color": !0,
					"text-emphasis-position": !0,
					"text-emphasis-style": !0,
					"text-height": !0,
					"text-indent": !0,
					"text-justify": !0,
					"text-orientation": !0,
					"text-overflow": !0,
					"text-shadow": !0,
					"text-space-collapse": !0,
					"text-transform": !0,
					"text-underline-position": !0,
					"text-wrap": !0,
					top: !1,
					transform: !1,
					"transform-origin": !1,
					"transform-style": !1,
					transition: !1,
					"transition-delay": !1,
					"transition-duration": !1,
					"transition-property": !1,
					"transition-timing-function": !1,
					"unicode-bidi": !1,
					"vertical-align": !1,
					visibility: !1,
					"voice-balance": !1,
					"voice-duration": !1,
					"voice-family": !1,
					"voice-pitch": !1,
					"voice-range": !1,
					"voice-rate": !1,
					"voice-stress": !1,
					"voice-volume": !1,
					volume: !1,
					"white-space": !1,
					widows: !1,
					width: !0,
					"will-change": !1,
					"word-break": !0,
					"word-spacing": !0,
					"word-wrap": !0,
					"wrap-flow": !1,
					"wrap-through": !1,
					"writing-mode": !1,
					"z-index": !1
				};
				return t
			}

			function i(t, e, r) {}

			function n(t, e, r) {}
			var o = /javascript\s*\:/gim;

			function a(t, e) {
				return o.test(e) ? "" : e
			}
			e.whiteList = r(), e.getDefaultWhiteList = r, e.onAttr = i, e.onIgnoreAttr = n, e.safeAttrValue = a
		},
		8753: function(t, e) {
			t.exports = {
				indexOf: function(t, e) {
					var r, i;
					if (Array.prototype.indexOf) return t.indexOf(e);
					for (r = 0, i = t.length; r < i; r++)
						if (t[r] === e) return r;
					return -1
				},
				forEach: function(t, e, r) {
					var i, n;
					if (Array.prototype.forEach) return t.forEach(e, r);
					for (i = 0, n = t.length; i < n; i++) e.call(r, t[i], i, t)
				},
				trim: function(t) {
					return String.prototype.trim ? t.trim() : t.replace(/(^\s*)|(\s*$)/g, "")
				},
				trimRight: function(t) {
					return String.prototype.trimRight ? t.trimRight() : t.replace(/(\s*$)/g, "")
				}
			}
		},
		"9ee4": function(t, e, r) {},
		a0c3: function(t, e, r) {
			"use strict";
			r.r(e);
			var i = function() {
					var t = this,
						e = t.$createElement,
						r = t._self._c || e;
					return r("div", {
						staticClass: "phone-page"
					}, [r("p", {
						staticClass: "html-content",
						domProps: {
							innerHTML: t._s(t.textHtml)
						}
					})])
				},
				n = [],
				o = (r("d3b7"), r("25f0"), r("2b0e")),
				a = r("ca00"),
				s = r("0fea"),
				l = r("5e38"),
				c = r.n(l);
			Object.defineProperty(o["a"].prototype, "$xss", {
				value: c.a
			});
			var u = {
					name: "AppNotice",
					data: function() {
						return {
							textHtml: ""
						}
					},
					created: function() {
						this.initHtml()
					},
					watch: {
						$route: function() {
							this.initHtml()
						}
					},
					methods: {
						initHtml: function() {
							var t = this.$route.query.softType || "",
								e = this.$route.query.agreementType || "",
								r = this.$route.query.version || "",
								i = "E987E8B6BBEC3F920D219F7A4B5C619A",
								n = Object(a["f"])(16).toString(),
								o = this.$route.query.language || "",
								l = this.$route.query.country || "",
								c = (new Date).getTime().toString(),
								u = "agreementType=" + e + "&country=" + l + "&language=" + o + "&random=" + n + "&reqTimestamp=" + c + "&softType=" + t + "&version=" + r + "&password=" + i,
								f = Object(a["a"])(u),
								g = {
									encryData: {
										agreementType: e,
										random: n,
										softType: t,
										version: r,
										country: l
									},
									language: o,
									reqTimestamp: c,
									sign: f
								},
								p = Object(a["d"])(JSON.stringify(g)),
								d = "/app/agreement/getContent",
								m = this;
							Object(s["a"])(d, {
								request: p
							}).then((function(t) {
								"0" == t.data.code && (m.textHtml = Object(a["e"])(t.data.respondData.agreementContent))
							}))
						}
					}
				},
				f = u,
				g = (r("2f8d"), r("2877")),
				p = Object(g["a"])(f, i, n, !1, null, "a3336f4e", null);
			e["default"] = p.exports
		},
		ae34: function(t, e, r) {
			var i = r("8753");

			function n(t, e) {
				t = i.trimRight(t), ";" !== t[t.length - 1] && (t += ";");
				var r = t.length,
					n = !1,
					o = 0,
					a = 0,
					s = "";

				function l() {
					if (!n) {
						var r = i.trim(t.slice(o, a)),
							l = r.indexOf(":");
						if (-1 !== l) {
							var c = i.trim(r.slice(0, l)),
								u = i.trim(r.slice(l + 1));
							if (c) {
								var f = e(o, s.length, c, u, r);
								f && (s += f + "; ")
							}
						}
					}
					o = a + 1
				}
				for (; a < r; a++) {
					var c = t[a];
					if ("/" === c && "*" === t[a + 1]) {
						var u = t.indexOf("*/", a + 2);
						if (-1 === u) break;
						a = u + 1, o = a + 1, n = !1
					} else "(" === c ? n = !0 : ")" === c ? n = !1 : ";" === c ? n || l() : "\n" === c && l()
				}
				return i.trim(s)
			}
			t.exports = n
		},
		bc6c: function(t, e, r) {
			var i = r("7bcc"),
				n = r("ae34");
			r("8753");

			function o(t) {
				return void 0 === t || null === t
			}

			function a(t) {
				var e = {};
				for (var r in t) e[r] = t[r];
				return e
			}

			function s(t) {
				t = a(t || {}), t.whiteList = t.whiteList || i.whiteList, t.onAttr = t.onAttr || i.onAttr, t.onIgnoreAttr = t.onIgnoreAttr || i.onIgnoreAttr, t.safeAttrValue = t.safeAttrValue || i.safeAttrValue, this.options = t
			}
			s.prototype.process = function(t) {
				if (t = t || "", t = t.toString(), !t) return "";
				var e = this,
					r = e.options,
					i = r.whiteList,
					a = r.onAttr,
					s = r.onIgnoreAttr,
					l = r.safeAttrValue,
					c = n(t, (function(t, e, r, n, c) {
						var u = i[r],
							f = !1;
						if (!0 === u ? f = u : "function" === typeof u ? f = u(n) : u instanceof RegExp && (f = u.test(n)), !0 !== f && (f = !1), n = l(r, n), n) {
							var g = {
								position: e,
								sourcePosition: t,
								source: c,
								isWhite: f
							};
							if (f) {
								var p = a(r, n, g);
								return o(p) ? r + ":" + n : p
							}
							p = s(r, n, g);
							return o(p) ? void 0 : p
						}
					}));
				return c
			}, t.exports = s
		},
		bda0: function(t, e, r) {
			var i = r("1ab2").FilterCSS,
				n = r("1ab2").getDefaultWhiteList,
				o = r("eb71");

			function a() {
				return {
					a: ["target", "href", "title"],
					abbr: ["title"],
					address: [],
					area: ["shape", "coords", "href", "alt"],
					article: [],
					aside: [],
					audio: ["autoplay", "controls", "crossorigin", "loop", "muted", "preload", "src"],
					b: [],
					bdi: ["dir"],
					bdo: ["dir"],
					big: [],
					blockquote: ["cite"],
					br: [],
					caption: [],
					center: [],
					cite: [],
					code: [],
					col: ["align", "valign", "span", "width"],
					colgroup: ["align", "valign", "span", "width"],
					dd: [],
					del: ["datetime"],
					details: ["open"],
					div: [],
					dl: [],
					dt: [],
					em: [],
					figcaption: [],
					figure: [],
					font: ["color", "size", "face"],
					footer: [],
					h1: [],
					h2: [],
					h3: [],
					h4: [],
					h5: [],
					h6: [],
					header: [],
					hr: [],
					i: [],
					img: ["src", "alt", "title", "width", "height"],
					ins: ["datetime"],
					li: [],
					mark: [],
					nav: [],
					ol: [],
					p: [],
					pre: [],
					s: [],
					section: [],
					small: [],
					span: [],
					sub: [],
					summary: [],
					sup: [],
					strong: [],
					strike: [],
					table: ["width", "border", "align", "valign"],
					tbody: ["align", "valign"],
					td: ["width", "rowspan", "colspan", "align", "valign"],
					tfoot: ["align", "valign"],
					th: ["width", "rowspan", "colspan", "align", "valign"],
					thead: ["align", "valign"],
					tr: ["rowspan", "align", "valign"],
					tt: [],
					u: [],
					ul: [],
					video: ["autoplay", "controls", "crossorigin", "loop", "muted", "playsinline", "poster", "preload", "src", "height", "width"]
				}
			}
			var s = new i;

			function l(t, e, r) {}

			function c(t, e, r) {}

			function u(t, e, r) {}

			function f(t, e, r) {}

			function g(t) {
				return t.replace(d, "&lt;").replace(m, "&gt;")
			}

			function p(t, e, r, i) {
				if (r = j(r), "href" === e || "src" === e) {
					if (r = o.trim(r), "#" === r) return "#";
					if ("http://" !== r.substr(0, 7) && "https://" !== r.substr(0, 8) && "mailto:" !== r.substr(0, 7) && "tel:" !== r.substr(0, 4) && "data:image/" !== r.substr(0, 11) && "ftp://" !== r.substr(0, 6) && "./" !== r.substr(0, 2) && "../" !== r.substr(0, 3) && "#" !== r[0] && "/" !== r[0]) return ""
				} else if ("background" === e) {
					if (x.lastIndex = 0, x.test(r)) return ""
				} else if ("style" === e) {
					if (k.lastIndex = 0, k.test(r)) return "";
					if (A.lastIndex = 0, A.test(r) && (x.lastIndex = 0, x.test(r))) return "";
					!1 !== i && (i = i || s, r = i.process(r))
				}
				return r = L(r), r
			}
			var d = /</g,
				m = />/g,
				h = /"/g,
				b = /&quot;/g,
				v = /&#([a-zA-Z0-9]*);?/gim,
				y = /&colon;?/gim,
				w = /&newline;?/gim,
				x = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi,
				k = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi,
				A = /u\s*r\s*l\s*\(.*/gi;

			function T(t) {
				return t.replace(h, "&quot;")
			}

			function S(t) {
				return t.replace(b, '"')
			}

			function I(t) {
				return t.replace(v, (function(t, e) {
					return "x" === e[0] || "X" === e[0] ? String.fromCharCode(parseInt(e.substr(1), 16)) : String.fromCharCode(parseInt(e, 10))
				}))
			}

			function C(t) {
				return t.replace(y, ":").replace(w, " ")
			}

			function O(t) {
				for (var e = "", r = 0, i = t.length; r < i; r++) e += t.charCodeAt(r) < 32 ? " " : t.charAt(r);
				return o.trim(e)
			}

			function j(t) {
				return t = S(t), t = I(t), t = C(t), t = O(t), t
			}

			function L(t) {
				return t = T(t), t = g(t), t
			}

			function E() {
				return ""
			}

			function H(t, e) {
				"function" !== typeof e && (e = function() {});
				var r = !Array.isArray(t);

				function i(e) {
					return !!r || -1 !== o.indexOf(t, e)
				}
				var n = [],
					a = !1;
				return {
					onIgnoreTag: function(t, r, o) {
						if (i(t)) {
							if (o.isClosing) {
								var s = "[/removed]",
									l = o.position + s.length;
								return n.push([!1 !== a ? a : o.position, l]), a = !1, s
							}
							return a || (a = o.position), "[removed]"
						}
						return e(t, r, o)
					},
					remove: function(t) {
						var e = "",
							r = 0;
						return o.forEach(n, (function(i) {
							e += t.slice(r, i[0]), r = i[1]
						})), e += t.slice(r), e
					}
				}
			}

			function z(t) {
				var e = "",
					r = 0;
				while (r < t.length) {
					var i = t.indexOf("\x3c!--", r);
					if (-1 === i) {
						e += t.slice(r);
						break
					}
					e += t.slice(r, i);
					var n = t.indexOf("--\x3e", i);
					if (-1 === n) break;
					r = n + 3
				}
				return e
			}

			function q(t) {
				var e = t.split("");
				return e = e.filter((function(t) {
					var e = t.charCodeAt(0);
					return 127 !== e && (!(e <= 31) || (10 === e || 13 === e))
				})), e.join("")
			}
			e.whiteList = a(), e.getDefaultWhiteList = a, e.onTag = l, e.onIgnoreTag = c, e.onTagAttr = u, e.onIgnoreTagAttr = f, e.safeAttrValue = p, e.escapeHtml = g, e.escapeQuote = T, e.unescapeQuote = S, e.escapeHtmlEntities = I, e.escapeDangerHtml5Entities = C, e.clearNonPrintableCharacter = O, e.friendlyAttrValue = j, e.escapeAttrValue = L, e.onIgnoreTagStripAll = E, e.StripTagBody = H, e.stripCommentTag = z, e.stripBlankChar = q, e.cssFilter = s, e.getDefaultCSSWhiteList = n
		},
		eb71: function(t, e) {
			t.exports = {
				indexOf: function(t, e) {
					var r, i;
					if (Array.prototype.indexOf) return t.indexOf(e);
					for (r = 0, i = t.length; r < i; r++)
						if (t[r] === e) return r;
					return -1
				},
				forEach: function(t, e, r) {
					var i, n;
					if (Array.prototype.forEach) return t.forEach(e, r);
					for (i = 0, n = t.length; i < n; i++) e.call(r, t[i], i, t)
				},
				trim: function(t) {
					return String.prototype.trim ? t.trim() : t.replace(/(^\s*)|(\s*$)/g, "")
				},
				spaceIndex: function(t) {
					var e = /\s|\n|\t/,
						r = e.exec(t);
					return r ? r.index : -1
				}
			}
		}
	}
]);