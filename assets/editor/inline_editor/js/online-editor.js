/*!
 * froala_editor v2.0.6 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function(b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c
    } : a(jQuery)
}(function(a) {
    "use strict";
    var b = function(c, d) {
        this.opts = a.extend(!0, {}, a.extend({}, b.DEFAULTS, "object" == typeof d && d)), this.$original_element = a(c), this.$original_element.data("froala.editor", this), this.id = ++a.FroalaEditor.ID, this.original_document = c.ownerDocument, this.original_window = "defaultView" in this.original_document ? this.original_document.defaultView : this.original_document.parentWindow;
        var e = a(this.original_window).scrollTop();
        this.$original_element.on("froala.doInit", a.proxy(function() {
            this.$original_element.off("froala.doInit"), this.document = this.$el.get(0).ownerDocument, this.window = "defaultView" in this.document ? this.document.defaultView : this.document.parentWindow, this.$document = a(this.document), this.$window = a(this.window), "undefined" == typeof this.opts.pluginsEnabled && (this.opts.pluginsEnabled = Object.keys(a.FroalaEditor.PLUGINS)), this.opts.initOnClick ? (this.load(a.FroalaEditor.MODULES), this.$el.on("mousedown.init dragenter.init focus.init", a.proxy(function(b) {
                if (1 === b.which) {
                    this.$el.off("mousedown.init dragenter.init focus.init"), this.load(a.FroalaEditor.MODULES), this.load(a.FroalaEditor.PLUGINS);
                    var c = b.originalEvent && b.originalEvent.originalTarget;
                    c && "IMG" == c.tagName && a(c).trigger("mousedown"), "undefined" == typeof this.ul && this.destroy(), this.events.trigger("initialized")
                }
            }, this))) : (this.load(a.FroalaEditor.MODULES), this.load(a.FroalaEditor.PLUGINS), a(this.original_window).scrollTop(e), "undefined" == typeof this.ul && this.destroy(), this.events.trigger("initialized"))
        }, this)), this._init()
    };
    b.DEFAULTS = {
        initOnClick: !1
    }, b.MODULES = {}, b.PLUGINS = {}, b.VERSION = "2.0.6", b.INSTANCES = [], b.ID = 0, b.prototype._init = function() {
        var b = this.$original_element.prop("tagName"),
            c = a.proxy(function() {
                this._original_html = this._original_html || this.$original_element.html(), this.$box = this.$box || this.$original_element, this.opts.fullPage && (this.opts.iframe = !0), this.opts.iframe ? (this.$iframe = a('<iframe src="about:blank" frameBorder="0">'), this.$wp = a("<div></div>"), this.$box.html(this.$wp), this.$wp.append(this.$iframe), this.$iframe.get(0).contentWindow.document.open(), this.$iframe.get(0).contentWindow.document.write("<!DOCTYPE html>"), this.$iframe.get(0).contentWindow.document.write("<html><head></head><body></body></html>"), this.$iframe.get(0).contentWindow.document.close(), this.$el = this.$iframe.contents().find("body"), this.$head = this.$iframe.contents().find("head"), this.$html = this.$iframe.contents().find("html"), this.iframe_document = this.$iframe.get(0).contentWindow.document, this.$original_element.trigger("froala.doInit")) : (this.$el = a("<div></div>"), this.$wp = a("<div></div>").append(this.$el), this.$box.html(this.$wp), this.$original_element.trigger("froala.doInit"))
            }, this),
            d = a.proxy(function() {
                this.$box = a("<div>"), this.$original_element.before(this.$box).hide(), this._original_html = this.$original_element.val(), this.$original_element.parents("form").on("submit." + this.id, a.proxy(function() {
                    this.events.trigger("form.submit")
                }, this)), c()
            }, this),
            e = a.proxy(function() {
                this.$el = this.$original_element, this.$el.attr("contenteditable", !0).css("outline", "none"), this.opts.multiLine = !1, this.opts.toolbarInline = !1, this.$original_element.trigger("froala.doInit")
            }, this),
            f = a.proxy(function() {
                this.$el = this.$original_element, this.opts.toolbarInline = !1, this.$original_element.trigger("froala.doInit")
            }, this),
            g = a.proxy(function() {
                this.$el = this.$original_element, this.opts.toolbarInline = !1, this.$original_element.on("click.popup", function(a) {
                    a.preventDefault()
                }), this.$original_element.trigger("froala.doInit")
            }, this);
        this.opts.editInPopup ? g() : "TEXTAREA" == b ? d() : "A" == b ? e() : "IMG" == b ? f() : "BUTTON" == b || "INPUT" == b ? (this.opts.editInPopup = !0, this.opts.toolbarInline = !1, g()) : c()
    }, b.prototype.load = function(b) {
        for (var c in b)
            if (!this[c] && !(a.FroalaEditor.PLUGINS[c] && this.opts.pluginsEnabled.indexOf(c) < 0) && (this[c] = new b[c](this), this[c]._init && (this[c]._init(), this.opts.initOnClick && "core" == c))) return !1
    }, b.prototype.destroy = function() {
        this.events.trigger("destroy"), this.$original_element.parents("form").off("submit." + this.id), this.$original_element.off("click.popup"), this.$original_element.removeData("froala.editor")
    }, a.fn.froalaEditor = function(c) {
        for (var d = [], e = 0; e < arguments.length; e++) d.push(arguments[e]);
        if ("string" == typeof c) {
            var f = [];
            return this.each(function() {
                var b = a(this),
                    e = b.data("froala.editor");
                if (e) {
                    var g, h;
                    if (c.indexOf(".") > 0 && e[c.split(".")[0]] ? (e[c.split(".")[0]] && (g = e[c.split(".")[0]]), h = c.split(".")[1]) : (g = e, h = c.split(".")[0]), !g[h]) return a.error("Method " + c + " does not exist in Froala Editor.");
                    var i = g[h].apply(e, d.slice(1));
                    void 0 === i ? f.push(this) : 0 === f.length && f.push(i)
                }
            }), 1 == f.length ? f[0] : f
        }
        return "object" != typeof c && c ? void 0 : this.each(function() {
            var d = a(this).data("froala.editor");
            d || new b(this, c)
        })
    }, a.fn.froalaEditor.Constructor = b, a.FroalaEditor = b, a.FroalaEditor.MODULES.node = function(b) {
        function c(b) {
            return b && "IFRAME" != b.tagName ? a(b).contents() : []
        }

        function d(b) {
            return b ? b.nodeType != Node.ELEMENT_NODE ? !1 : a.FroalaEditor.BLOCK_TAGS.indexOf(b.tagName.toLowerCase()) >= 0 : !1
        }

        function e(b, e) {
            if (a(b).find("table").length > 0) return !1;
            var f = c(b);
            1 == f.length && d(f[0]) && (f = c(f[0]));
            for (var g = !1, h = 0; h < f.length; h++) {
                var i = f[h];
                if (!e || !a(i).hasClass("fr-marker")) {
                    if (!("BR" == i.tagName || i.textContent && 0 == i.textContent.replace(/\u200B/gi, "").length) || 1 == g) return !1;
                    "BR" == i.tagName && (g = !0)
                }
            }
            return !0
        }

        function f(c) {
            for (; c && c.parentNode !== b.$el.get(0) && (!c.parentNode || !a(c.parentNode).hasClass("fr-inner"));)
                if (c = c.parentNode, d(c)) return c;
            return null
        }

        function g(c, e, f) {
            if ("undefined" == typeof e && (e = []), "undefined" == typeof f && (f = !0), e.push(b.$el.get(0)), e.indexOf(c.parentNode) >= 0 || c.parentNode && a(c.parentNode).hasClass("fr-inner") || c.parentNode && a.FroalaEditor.SIMPLE_ENTER_TAGS.indexOf(c.parentNode.tagName) >= 0 && f) return null;
            for (; e.indexOf(c.parentNode) < 0 && c.parentNode && !a(c.parentNode).hasClass("fr-inner") && (a.FroalaEditor.SIMPLE_ENTER_TAGS.indexOf(c.parentNode.tagName) < 0 || !f) && (!d(c) || !d(c.parentNode) || !f);) c = c.parentNode;
            return c
        }

        function h(a) {
            var b = {},
                c = a.attributes;
            if (c)
                for (var d = 0; d < c.length; d++) {
                    var e = c[d];
                    b[e.nodeName] = e.value
                }
            return b
        }

        function i(a) {
            for (var b = "", c = h(a), d = Object.keys(c).sort(), e = 0; e < d.length; e++) {
                var f = d[e],
                    g = c[f];
                b += g.indexOf('"') < 0 ? " " + f + '="' + g + '"' : " " + f + "='" + g + "'"
            }
            return b
        }

        function j(a) {
            for (var b = a.attributes, c = 0; c < b.length; c++) {
                var d = b[c];
                a.removeAttribute(d.nodeName)
            }
        }

        function k(a) {
            return "<" + a.tagName.toLowerCase() + i(a) + ">"
        }

        function l(a) {
            return "</" + a.tagName.toLowerCase() + ">"
        }

        function m(b, c) {
            "undefined" == typeof c && (c = !0);
            for (var d = b.previousSibling; d && c && a(d).hasClass("fr-marker");) d = d.previousSibling;
            return d ? d.nodeType == Node.TEXT_NODE && "" === d.textContent ? m(d) : !1 : !0
        }

        function n(b) {
            return b && a.FroalaEditor.VOID_ELEMENTS.indexOf((b.tagName || "").toLowerCase()) >= 0
        }

        function o(a) {
            return a ? ["UL", "OL"].indexOf(a.tagName) >= 0 : !1
        }

        function p(a) {
            return a === b.$el.get(0)
        }

        function q(a) {
            return a === b.document.activeElement && (!b.document.hasFocus || b.document.hasFocus()) && !!(p(a) || a.type || a.href || ~a.tabIndex)
        }

        function r(a) {
            return !a.getAttribute || "false" != a.getAttribute("contenteditable")
        }
        return {
            isBlock: d,
            isEmpty: e,
            blockParent: f,
            deepestParent: g,
            rawAttributes: h,
            attributes: i,
            clearAttributes: j,
            openTagString: k,
            closeTagString: l,
            isFirstSibling: m,
            isList: o,
            isElement: p,
            contents: c,
            isVoid: n,
            hasFocus: q,
            isEditable: r
        }
    }, a.extend(a.FroalaEditor.DEFAULTS, {
        htmlAllowedTags: ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "queue", "rp", "rt", "ruby", "s", "samp", "script", "style", "section", "select", "small", "source", "span", "strike", "strong", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "var", "video", "wbr"],
        htmlRemoveTags: ["script", "style"],
        htmlAllowedAttrs: ["accept", "accept-charset", "accesskey", "action", "align", "allowfullscreen", "allowtransparency", "alt", "async", "autocomplete", "autofocus", "autoplay", "autosave", "background", "bgcolor", "border", "charset", "cellpadding", "cellspacing", "checked", "cite", "class", "color", "cols", "colspan", "content", "contenteditable", "contextmenu", "controls", "coords", "data", "data-.*", "datetime", "default", "defer", "dir", "dirname", "disabled", "download", "draggable", "dropzone", "enctype", "for", "form", "formaction", "fr-.*", "frameborder", "headers", "height", "hidden", "high", "href", "hreflang", "http-equiv", "icon", "id", "ismap", "itemprop", "keytype", "kind", "label", "lang", "language", "list", "loop", "low", "max", "maxlength", "media", "method", "min", "mozallowfullscreen", "multiple", "name", "novalidate", "open", "optimum", "pattern", "ping", "placeholder", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "reversed", "rows", "rowspan", "sandbox", "scope", "scoped", "scrolling", "seamless", "selected", "shape", "size", "sizes", "span", "src", "srcdoc", "srclang", "srcset", "start", "step", "summary", "spellcheck", "style", "tabindex", "target", "title", "type", "translate", "usemap", "value", "valign", "webkitallowfullscreen", "width", "wrap"],
        htmlAllowComments: !0,
        fullPage: !1
    }), a.FroalaEditor.HTML5Map = {
        B: "STRONG",
        I: "EM",
        STRIKE: "S"
    }, a.FroalaEditor.MODULES.clean = function(b) {
        function c(a) {
            if (a.className && a.className.indexOf("fr-marker") >= 0) return !1;
            var d, e = b.node.contents(a),
                f = [];
            for (d = 0; d < e.length; d++) e[d].className && e[d].className.indexOf("fr-marker") >= 0 && f.push(e[d]);
            if (e.length - f.length == 1 && 0 === a.textContent.replace(/\u200b/g, "").length) {
                for (d = 0; d < f.length; d++) a.parentNode.insertBefore(f[d].cloneNode(!0), a);
                return a.parentNode.removeChild(a), !1
            }
            for (d = 0; d < e.length; d++) e[d].nodeType == Node.ELEMENT_NODE ? e[d].textContent.replace(/\u200b/g, "").length != e[d].textContent.length && c(e[d]) : e[d].nodeType == Node.TEXT_NODE && (e[d].textContent = e[d].textContent.replace(/\u200b/g, ""))
        }

        function d(a) {
            if (a.nodeType == Node.COMMENT_NODE) return "<!--" + a.nodeValue + "-->";
            if (a.nodeType == Node.TEXT_NODE) return a.textContent.replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\u00A0/g, "&nbsp;");
            if (a.nodeType != Node.ELEMENT_NODE) return a.outerHTML;
            if (a.nodeType == Node.ELEMENT_NODE && ["STYLE", "SCRIPT"].indexOf(a.tagName) >= 0) return a.outerHTML;
            if ("IFRAME" == a.tagName) return a.outerHTML;
            var c = a.childNodes;
            if (0 === c.length) return a.outerHTML;
            for (var e = "", f = 0; f < c.length; f++) e += d(c[f]);
            return b.node.openTagString(a) + e + b.node.closeTagString(a)
        }

        function e(a) {
            return x = [], a = a.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, function(a) {
                return x.push(a), "<!--[FROALA.EDITOR.SCRIPT " + (x.length - 1) + "]-->"
            }), a = a.replace(/<img((?:[\w\W]*?)) src="/g, '<img$1 data-src="')
        }

        function f(a) {
            return a = a.replace(/<!--\[FROALA\.EDITOR\.SCRIPT ([\d]*)]-->/gi, function(a, b) {
                return x[parseInt(b, 10)]
            }), b.opts.htmlRemoveTags.indexOf("script") >= 0 && (a = a.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")), a = a.replace(/<img((?:[\w\W]*?)) data-src="/g, '<img$1 src="')
        }

        function g(a) {
            var b;
            for (b in a) b.match(w) || delete a[b];
            for (var c = "", d = Object.keys(a).sort(), e = 0; e < d.length; e++) b = d[e], c += a[b].indexOf('"') < 0 ? " " + b + '="' + a[b] + '"' : " " + b + "='" + a[b] + "'";
            return c
        }

        function h(a, c, d) {
            if (b.opts.fullPage) {
                var e = b.html.extractDoctype(d),
                    f = g(b.html.extractNodeAttrs(d, "html"));
                c = null == c ? b.html.extractNode(d, "head") || "<title></title>" : c;
                var h = g(b.html.extractNodeAttrs(d, "head")),
                    i = g(b.html.extractNodeAttrs(d, "body"));
                return e + "<html" + f + "><head" + h + ">" + c + "</head><body" + i + ">" + a + "</body></html>"
            }
            return a
        }

        function i(c, e) {
            var f = a("<div>" + c + "</div>"),
                g = "";
            if (f) {
                for (var h = b.node.contents(f.get(0)), i = 0; i < h.length; i++) e(h[i]);
                h = b.node.contents(f.get(0));
                for (var i = 0; i < h.length; i++) g += d(h[i])
            }
            return g
        }

        function j(a, c, d) {
            a = e(a);
            var g = a,
                j = null;
            if (b.opts.fullPage) {
                var g = (b.html.extractNode(a, "body") || a).replace(/\r|\n/g, "");
                d && (j = (b.html.extractNode(a, "head") || "").replace(/\r|\n/g, ""))
            }
            g = i(g, c), j && (j = i(j, c));
            var k = h(g, j, a).replace(/\r|\n/g, "");
            return f(k)
        }

        function k(a) {
            return a.replace(/\u200b/g, "").length == a.length ? a : b.clean.exec(a, c)
        }

        function l() {
            var c = b.$el.find(Object.keys(a.FroalaEditor.HTML5Map).join(",")).filter(function() {
                return "" === b.node.attributes(this)
            });
            c.length && (b.selection.save(), c.each(function() {
                a(this).replaceWith("<" + a.FroalaEditor.HTML5Map[this.tagName] + ">" + a(this).html() + "</" + a.FroalaEditor.HTML5Map[this.tagName] + ">")
            }), b.selection.restore())
        }

        function m(c) {
            if ("PRE" == c.tagName && o(c), c.nodeType == Node.ELEMENT_NODE && (c.getAttribute("data-src") && c.setAttribute("data-src", b.helpers.sanitizeURL(c.getAttribute("data-src"))), c.getAttribute("href") && c.setAttribute("href", b.helpers.sanitizeURL(c.getAttribute("href"))), ["TABLE", "TBODY", "TFOOT", "TR"].indexOf(c.tagName) >= 0 && (c.innerHTML = c.innerHTML.trim())), !b.opts.pasteAllowLocalImages && c.nodeType == Node.ELEMENT_NODE && "IMG" == c.tagName && c.getAttribute("data-src") && 0 == c.getAttribute("data-src").indexOf("file://")) return c.parentNode.removeChild(c), !1;
            if (c.nodeType == Node.ELEMENT_NODE && a.FroalaEditor.HTML5Map[c.tagName] && "" === b.node.attributes(c)) {
                var d = a.FroalaEditor.HTML5Map[c.tagName],
                    e = "<" + d + ">" + c.innerHTML + "</" + d + ">";
                c.insertAdjacentHTML("beforebegin", e), c = c.previousSibling, c.parentNode.removeChild(c.nextSibling)
            }
            if (b.opts.htmlAllowComments || c.nodeType != Node.COMMENT_NODE)
                if (c.tagName && c.tagName.match(v)) c.parentNode.removeChild(c);
                else if (c.tagName && !c.tagName.match(u)) c.outerHTML = c.innerHTML;
            else {
                var f = c.attributes;
                if (f)
                    for (var g = f.length - 1; g >= 0; g--) {
                        var h = f[g];
                        h.nodeName.match(w) || c.removeAttribute(h.nodeName)
                    }
            } else 0 !== c.data.indexOf("[FROALA.EDITOR") && c.parentNode.removeChild(c)
        }

        function n(a) {
            for (var c = b.node.contents(a), d = 0; d < c.length; d++) c[d].nodeType != Node.TEXT_NODE && n(c[d]);
            m(a)
        }

        function o(a) {
            var b = a.innerHTML;
            b.indexOf("\n") >= 0 && (a.innerHTML = b.replace(/\n/g, "<br>"))
        }

        function p(c, d, e, f) {
            "undefined" == typeof d && (d = []), "undefined" == typeof e && (e = []), "undefined" == typeof f && (f = !1), c = c.replace(/\u0009/g, "");
            var g, h = a.merge([], b.opts.htmlAllowedTags);
            for (g = 0; g < d.length; g++) h.indexOf(d[g]) >= 0 && h.splice(h.indexOf(d[g]), 1);
            var i = a.merge([], b.opts.htmlAllowedAttrs);
            for (g = 0; g < e.length; g++) i.indexOf(e[g]) >= 0 && i.splice(i.indexOf(e[g]), 1);
            return u = new RegExp("^" + h.join("$|^") + "$", "gi"), w = new RegExp("^" + i.join("$|^") + "$", "gi"), v = new RegExp("^" + b.opts.htmlRemoveTags.join("$|^") + "$", "gi"), c = j(c, n, !0)
        }

        function q() {
            for (var c = b.$el.find("blockquote + blockquote"), d = 0; d < c.length; d++) {
                var e = a(c[d]);
                b.node.attributes(c[d]) == b.node.attributes(e.prev().get(0)) && (e.prev().append(e.html()), e.remove())
            }
        }

        function r() {
            for (var c = b.$el.find("tr").filter(function() {
                    return a(this).find("th").length > 0
                }), d = 0; d < c.length; d++) {
                var e = a(c[d]).parents("table:first").find("thead");
                0 === e.length && (e = a("<thead>"), a(c[d]).parents("table:first").prepend(e), e.append(c[d]))
            }
            b.$el.find("table").filter(function() {
                for (var a = this.previousSibling; a && a.nodeType == Node.TEXT_NODE && 0 == a.textContent.length;) a = a.previousSibling;
                return a && !b.node.isBlock(a) && "BR" != a.tagName ? !0 : !1
            }).before("<br>");
            var f = b.html.defaultTag();
            f && b.$el.find("td > " + f + ", th > " + f).each(function() {
                "" === b.node.attributes(this) && a(this).replaceWith(this.innerHTML + "<br>")
            })
        }

        function s() {
            for (var c = b.$el.find("ol + ol, ul + ul"), d = 0; d < c.length; d++) {
                var e = a(c[d]);
                b.node.attributes(c[d]) == b.node.attributes(e.prev().get(0)) && (e.prev().append(e.html()), e.remove())
            }
            var f = [],
                g = function() {
                    return !b.node.isList(this.parentNode)
                };
            do {
                if (f.length) {
                    var h = f.get(0),
                        i = a("<ul></ul>").insertBefore(a(h));
                    do {
                        var j = h;
                        h = h.nextSibling, i.append(a(j))
                    } while (h && "LI" == h.tagName)
                }
                f = b.$el.find("li").filter(g)
            } while (f.length > 0);
            var k, l = function(b, c) {
                var d = a(c);
                0 === d.find("LI").length && (k = !0, d.remove())
            };
            do k = !1, b.$el.find("li:empty").remove(), b.$el.find("ul, ol").each(l); while (k === !0);
            for (var m = b.$el.find("ol, ul").find("> ul, > ol"), n = 0; n < m.length; n++) {
                var o = m[n],
                    p = o.previousSibling;
                p && ("LI" == p.tagName ? a(p).append(o) : a(o).wrap("<li></li>"))
            }
            b.$el.find("li > ul, li > ol").each(function(b, c) {
                if (c.nextSibling) {
                    var d = c.nextSibling,
                        e = a("<li>");
                    a(c.parentNode).after(e);
                    do {
                        var f = d;
                        d = d.nextSibling, e.append(f)
                    } while (d)
                }
            }), b.$el.find("li > ul, li > ol").each(function(c, d) {
                if (b.node.isFirstSibling(d)) a(d).before("<br/>");
                else if (d.previousSibling && "BR" == d.previousSibling.tagName) {
                    for (var e = d.previousSibling.previousSibling; e && a(e).hasClass("fr-marker");) e = e.previousSibling;
                    e && "BR" != e.tagName && a(d.previousSibling).remove()
                }
            }), b.$el.find("li:empty").remove()
        }

        function t() {
            b.opts.fullPage && a.merge(b.opts.htmlAllowedTags, ["head", "title", "style", "link", "base", "body", "html"])
        }
        var u, v, w, x = [],
            x = [];
        return {
            _init: t,
            html: p,
            toHTML5: l,
            tables: r,
            lists: s,
            quotes: q,
            invisibleSpaces: k,
            exec: j
        }
    }, a.FroalaEditor.XS = 0, a.FroalaEditor.SM = 1, a.FroalaEditor.MD = 2, a.FroalaEditor.LG = 3, a.FroalaEditor.MODULES.helpers = function(b) {
        function c() {
            var a, b, c = -1;
            return "Microsoft Internet Explorer" == navigator.appName ? (a = navigator.userAgent, b = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})"), null !== b.exec(a) && (c = parseFloat(RegExp.$1))) : "Netscape" == navigator.appName && (a = navigator.userAgent, b = new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})"), null !== b.exec(a) && (c = parseFloat(RegExp.$1))), c
        }

        function d() {
            var a = {};
            if (c() > 0) a.msie = !0;
            else {
                var b = navigator.userAgent.toLowerCase(),
                    d = /(edge)[ \/]([\w.]+)/.exec(b) || /(chrome)[ \/]([\w.]+)/.exec(b) || /(webkit)[ \/]([\w.]+)/.exec(b) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(b) || /(msie) ([\w.]+)/.exec(b) || b.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(b) || [],
                    e = {
                        browser: d[1] || "",
                        version: d[2] || "0"
                    };
                d[1] && (a[e.browser] = !0), parseInt(e.version, 10) < 9 && a.msie && (a.oldMsie = !0), a.chrome ? a.webkit = !0 : a.webkit && (a.safari = !0)
            }
            return a
        }

        function e() {
            return /(iPad|iPhone|iPod)/g.test(navigator.userAgent) && !h()
        }

        function f() {
            return /(Android)/g.test(navigator.userAgent) && !h()
        }

        function g() {
            return /(Blackberry)/g.test(navigator.userAgent)
        }

        function h() {
            return /(Windows Phone)/gi.test(navigator.userAgent)
        }

        function i() {
            return f() || e() || g()
        }

        function j() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(a) {
                window.setTimeout(a, 1e3 / 60)
            }
        }

        function k(a) {
            return parseInt(a, 10) || 0
        }

        function l() {
            var b = a('<div class="fr-visibility-helper"></div>').appendTo("body"),
                c = k(b.css("margin-left"));
            return b.remove(), c
        }

        function m() {
            return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch
        }

        function n(a) {
            if (!/^(https?:|ftps?:|)\/\//.test(a)) return !1;
            a = String(a).replace(/</g, "%3C").replace(/>/g, "%3E").replace(/"/g, "%22").replace(/ /g, "%20");
            var b = /\(?(?:(https?:|ftps?:|)\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|(?:www.)?(?:[^\W\s]|\.|-)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/gi;
            return b.test(a)
        }

        function o(a) {
            if (/^(https?:|ftps?:|)\/\//.test(a)) {
                if (!n(a)) return ""
            } else a = encodeURIComponent(a).replace(/%23/g, "#").replace(/%2F/g, "/").replace(/%25/g, "%").replace(/mailto%3A/g, "mailto:").replace(/file%3A/g, "file:").replace(/sms%3A/g, "sms:").replace(/tel%3A/g, "tel:").replace(/data%3Aimage/g, "data:image").replace(/webkit-fake-url%3A/g, "webkit-fake-url:").replace(/%3F/g, "?").replace(/%3D/g, "=").replace(/%26/g, "&").replace(/&amp;/g, "&").replace(/%2C/g, ",").replace(/%3B/g, ";").replace(/%2B/g, "+").replace(/%40/g, "@");
            return a
        }

        function p(a) {
            return a && !a.propertyIsEnumerable("length") && "object" == typeof a && "number" == typeof a.length
        }

        function q(a) {
            function b(a) {
                return ("0" + parseInt(a, 10).toString(16)).slice(-2)
            }
            try {
                return a && "transparent" !== a ? /^#[0-9A-F]{6}$/i.test(a) ? a : (a = a.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/), ("#" + b(a[1]) + b(a[2]) + b(a[3])).toUpperCase()) : ""
            } catch (c) {
                return null
            }
        }

        function r(a) {
            var b = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            a = a.replace(b, function(a, b, c, d) {
                return b + b + c + c + d + d
            });
            var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
            return c ? "rgb(" + parseInt(c[1], 16) + ", " + parseInt(c[2], 16) + ", " + parseInt(c[3], 16) + ")" : ""
        }

        function s(b) {
            var c = (b.css("text-align") || "").replace(/-(.*)-/g, "");
            if (["left", "right", "justify", "center"].indexOf(c) < 0) {
                if (!u) {
                    var d = a('<div dir="auto" style="text-align: initial; position: fixed; left: -3000px;"><span id="s1">.</span><span id="s2">.</span></div>');
                    a("body").append(d);
                    var e = d.find("#s1").get(0).getBoundingClientRect().left,
                        f = d.find("#s2").get(0).getBoundingClientRect().left;
                    d.remove(), u = f > e ? "left" : "right"
                }
                c = u
            }
            return c
        }

        function t() {
            b.browser = d(), b.ie_version = c()
        }
        var u;
        return {
            _init: t,
            isIOS: e,
            isAndroid: f,
            isBlackberry: g,
            isWindowsPhone: h,
            isMobile: i,
            requestAnimationFrame: j,
            getPX: k,
            screenSize: l,
            isTouch: m,
            sanitizeURL: o,
            isArray: p,
            RGBToHex: q,
            HEXtoRGB: r,
            isURL: n,
            getAlignment: s
        }
    }, a.FroalaEditor.MODULES.events = function(b) {
        function c(a, c, d) {
            a.on(c.split(" ").join("." + b.id + " ") + "." + b.id, d), r("destroy", function() {
                a.off(c.split(" ").join("." + b.id + " ") + "." + b.id)
            })
        }

        function d() {
            c(b.$el, "cut copy paste beforepaste", function(a) {
                s(a.type, [a])
            })
        }

        function e() {
            c(b.$el, "click mouseup mousedown touchstart touchend dragenter dragover dragleave dragend drop", function(a) {
                s(a.type, [a])
            })
        }

        function f() {
            c(b.$el, "keydown keypress keyup input", function(a) {
                s(a.type, [a])
            })
        }

        function g() {
            c(b.$window, b._mousedown, function(a) {
                s("window.mousedown", [a]), n()
            }), c(b.$window, b._mouseup, function(a) {
                s("window.mouseup", [a])
            }), c(b.$window, "keydown keyup touchmove", function(a) {
                s("window." + a.type, [a])
            })
        }

        function h() {
            c(b.$document, "drop", function(a) {
                s("document.drop", [a])
            })
        }

        function i(c) {
            if ("undefined" == typeof c && (c = !0), !b.$wp) return !1;
            if (!b.core.hasFocus() && c) return b.$el.focus(), !1;
            if (!b.core.hasFocus() || b.$el.find(".fr-marker").length > 0) return !1;
            var d = b.selection.info(b.$el.get(0));
            if (d.atStart && b.selection.isCollapsed() && null != b.html.defaultTag()) {
                var e = b.markers.insert();
                if (e && !b.node.blockParent(e)) {
                    a(e).remove();
                    var f = b.$el.find(b.html.blockTagsQuery()).get(0);
                    f && (a(f).prepend(a.FroalaEditor.MARKERS), b.selection.restore())
                } else e && a(e).remove()
            }
        }

        function j() {
            c(b.$el, "focus", function(a) {
                p() && (i(!1), y === !1 && s(a.type, [a]))
            }), c(b.$el, "blur", function(a) {
                p() && y === !0 && s(a.type, [a])
            }), r("focus", function() {
                y = !0
            }), r("blur", function() {
                y = !1
            })
        }

        function k() {
            b.helpers.isMobile() ? (b._mousedown = "touchstart", b._mouseup = "touchend", b._move = "touchmove", b._mousemove = "touchmove") : (b._mousedown = "mousedown", b._mouseup = "mouseup", b._move = "", b._mousemove = "mousemove")
        }

        function l(c) {
            var d = a(c.currentTarget);
            return b.edit.isDisabled() || d.hasClass("fr-disabled") ? (c.preventDefault(), !1) : "mousedown" === c.type && 1 !== c.which ? !0 : (b.helpers.isMobile() || c.preventDefault(), (b.helpers.isAndroid() || b.helpers.isWindowsPhone()) && 0 === d.parents(".fr-dropdown-menu").length && (c.preventDefault(), c.stopPropagation()), d.addClass("fr-selected"), void b.events.trigger("commands.mousedown", [d]))
        }

        function m(c, d) {
            var e = a(c.currentTarget);
            if (b.edit.isDisabled() || e.hasClass("fr-disabled")) return c.preventDefault(), !1;
            if ("mouseup" === c.type && 1 !== c.which) return !0;
            if (!e.hasClass("fr-selected")) return !0;
            if ("touchmove" != c.type) {
                if (c.stopPropagation(), c.stopImmediatePropagation(), c.preventDefault(), !e.hasClass("fr-selected")) return a(".fr-selected").removeClass("fr-selected"), !1;
                if (a(".fr-selected").removeClass("fr-selected"), e.data("dragging") || e.attr("disabled")) return e.removeData("dragging"), !1;
                var f = e.data("timeout");
                f && (clearTimeout(f), e.removeData("timeout")), d.apply(b, [c])
            } else e.data("timeout") || e.data("timeout", setTimeout(function() {
                e.data("dragging", !0)
            }, 100))
        }

        function n() {
            w = !0
        }

        function o() {
            w = !1
        }

        function p() {
            return w
        }

        function q(a, c, d) {
            a.on(b._mousedown, c, function(a) {
                l(a)
            }), a.on(b._mouseup + " " + b._move, c, function(a) {
                m(a, d)
            }), a.on("mousedown click mouseup", c, function(a) {
                a.stopPropagation()
            }), r("window.mouseup", function() {
                a.find(c).removeClass("fr-selected"), n()
            }), r("destroy", function() {
                a.off(b._mousedown, c), a.off(b._mouseup + " " + b._move)
            })
        }

        function r(a, b, c) {
            "undefined" == typeof c && (c = !1);
            var d = x[a] = x[a] || [];
            c ? d.unshift(b) : d.push(b)
        }

        function s(c, d, e) {
            if (!b.edit.isDisabled() || e) {
                var f, g = x[c];
                if (g)
                    for (var h = 0; h < g.length; h++)
                        if (f = g[h].apply(b, d), f === !1) return !1;
                return f = b.$original_element.triggerHandler("froalaEditor." + c, a.merge([b], d || [])), f === !1 ? !1 : f
            }
        }

        function t(c, d, e) {
            if (!b.edit.isDisabled() || e) {
                var f, g = x[c];
                if (g)
                    for (var h = 0; h < g.length; h++) f = g[h].apply(b, [d]), "undefined" != typeof f && (d = f);
                return f = b.$original_element.triggerHandler("froalaEditor." + c, a.merge([b], [d])), "undefined" != typeof f && (d = f), d
            }
        }

        function u() {
            for (var a in x) delete x[a]
        }

        function v() {
            k(), e(), g(), h(), f(), j(), n(), d(), r("destroy", u)
        }
        var w, x = {},
            y = !1;
        return {
            _init: v,
            on: r,
            trigger: s,
            bindClick: q,
            disableBlur: o,
            enableBlur: n,
            blurActive: p,
            focus: i,
            chainTrigger: t
        }
    }, a.FroalaEditor.INVISIBLE_SPACE = "&#8203;", a.FroalaEditor.START_MARKER = '<span class="fr-marker" data-id="0" data-type="true" style="display: none; line-height: 0;">' + a.FroalaEditor.INVISIBLE_SPACE + "</span>", a.FroalaEditor.END_MARKER = '<span class="fr-marker" data-id="0" data-type="false" style="display: none; line-height: 0;">' + a.FroalaEditor.INVISIBLE_SPACE + "</span>", a.FroalaEditor.MARKERS = a.FroalaEditor.START_MARKER + a.FroalaEditor.END_MARKER, a.FroalaEditor.MODULES.markers = function(b) {
        function c(c, d) {
            return a('<span class="fr-marker" data-id="' + d + '" data-type="' + c + '" style="display: ' + (b.browser.safari ? "none" : "inline-block") + '; line-height: 0;">' + a.FroalaEditor.INVISIBLE_SPACE + "</span>", b.document)[0]
        }

        function d(d, e, f) {
            try {
                var g = d.cloneRange();
                if (g.collapse(e), g.insertNode(c(e, f)), e === !0 && d.collapsed)
                    for (var h = b.$el.find('span.fr-marker[data-type="true"][data-id="' + f + '"]').get(0).nextSibling; h && h.nodeType === Node.TEXT_NODE && 0 === h.textContent.length;) a(h).remove(), h = b.$el.find('span.fr-marker[data-type="true"][data-id="' + f + '"]').get(0).nextSibling;
                if (e === !0 && !d.collapsed) {
                    var e = b.$el.find('span.fr-marker[data-type="true"][data-id="' + f + '"]').get(0),
                        h = e.nextSibling;
                    if (h && h.nodeType === Node.ELEMENT_NODE && b.node.isBlock(h)) {
                        var i = [h];
                        do h = i[0], i = b.node.contents(h); while (i[0] && b.node.isBlock(i[0]));
                        a(h).prepend(a(e))
                    }
                }
                if (e === !1 && !d.collapsed) {
                    var e = b.$el.find('span.fr-marker[data-type="false"][data-id="' + f + '"]').get(0),
                        h = e.previousSibling;
                    if (h && h.nodeType === Node.ELEMENT_NODE && b.node.isBlock(h)) {
                        var i = [h];
                        do h = i[i.length - 1], i = b.node.contents(h); while (i[i.length - 1] && b.node.isBlock(i[i.length - 1]));
                        a(h).append(a(e))
                    }
                    e.parentNode && ["TD", "TH"].indexOf(e.parentNode.tagName) >= 0 && e.parentNode.previousSibling && !e.previousSibling && a(e.parentNode.previousSibling).append(e)
                }
                return e
            } catch (j) {
                return null
            }
        }

        function e() {
            if (!b.$wp) return null;
            try {
                var c = b.selection.ranges(0),
                    d = c.commonAncestorContainer;
                if (d != b.$el.get(0) && 0 == b.$el.find(d).length) return null;
                var e = c.cloneRange(),
                    f = c.cloneRange();
                e.collapse(!0);
                var g = a('<span class="fr-marker" style="display: none; line-height: 0;">' + a.FroalaEditor.INVISIBLE_SPACE + "</span>", b.document)[0];
                if (e.insertNode(g), g = b.$el.find("span.fr-marker").get(0)) {
                    for (var h = g.nextSibling; h && h.nodeType === Node.TEXT_NODE && 0 === h.textContent.length;) a(h).remove(), h = b.$el.find("span.fr-marker").get(0).nextSibling;
                    return b.selection.clear(), b.selection.get().addRange(f), g
                }
                return null
            } catch (i) {}
        }

        function f(a) {
            var c = a.clientX,
                d = a.clientY;
            g();
            var f, h = null;
            if ("undefined" != typeof b.document.caretPositionFromPoint ? (f = b.document.caretPositionFromPoint(c, d), h = b.document.createRange(), h.setStart(f.offsetNode, f.offset), h.setEnd(f.offsetNode, f.offset)) : "undefined" != typeof b.document.caretRangeFromPoint && (f = b.document.caretRangeFromPoint(c, d), h = b.document.createRange(), h.setStart(f.startContainer, f.startOffset), h.setEnd(f.startContainer, f.startOffset)), null !== h && "undefined" != typeof b.window.getSelection) {
                var i = b.window.getSelection();
                i.removeAllRanges(), i.addRange(h)
            } else if ("undefined" != typeof b.document.body.createTextRange) try {
                h = b.document.body.createTextRange(), h.moveToPoint(c, d);
                var j = h.duplicate();
                j.moveToPoint(c, d), h.setEndPoint("EndToEnd", j), h.select()
            } catch (k) {}
            e()
        }

        function g() {
            b.$el.find(".fr-marker").remove()
        }
        return {
            place: d,
            insert: e,
            insertAtPoint: f,
            remove: g
        }
    }, a.FroalaEditor.MODULES.selection = function(b) {
        function c() {
            var a = "";
            return b.window.getSelection ? a = b.window.getSelection() : b.document.getSelection ? a = b.document.getSelection() : b.document.selection && (a = b.document.selection.createRange().text), a.toString()
        }

        function d() {
            var a = "";
            return a = b.window.getSelection ? b.window.getSelection() : b.document.getSelection ? b.document.getSelection() : b.document.selection.createRange()
        }

        function e(a) {
            var c = d(),
                e = [];
            if (c && c.getRangeAt && c.rangeCount)
                for (var e = [], f = 0; f < c.rangeCount; f++) e.push(c.getRangeAt(f));
            else e = b.document.createRange ? [b.document.createRange()] : [];
            return "undefined" != typeof a ? e[a] : e
        }

        function f() {
            var a = d();
            try {
                a.removeAllRanges ? a.removeAllRanges() : a.empty ? a.empty() : a.clear && a.clear()
            } catch (b) {}
        }

        function g() {
            var f = d();
            try {
                if (f.rangeCount) {
                    var g = e(0),
                        h = g.startContainer;
                    if (h.nodeType == Node.ELEMENT_NODE) {
                        var i = !1;
                        if (h.childNodes.length > 0 && h.childNodes[g.startOffset]) {
                            for (var j = h.childNodes[g.startOffset]; j && j.nodeType == Node.TEXT_NODE && 0 == j.textContent.length;) j = j.nextSibling;
                            j && j.textContent.replace(/\u200B/g, "") === c().replace(/\u200B/g, "") && (h = j, i = !0)
                        } else if (!g.collapsed && h.nextSibling && h.nextSibling.nodeType == Node.ELEMENT_NODE) {
                            var j = h.nextSibling;
                            j && j.textContent.replace(/\u200B/g, "") === c().replace(/\u200B/g, "") && (h = j, i = !0)
                        }!i && h.childNodes.length > 0 && a(h.childNodes[0]).text().replace(/\u200B/g, "") === c().replace(/\u200B/g, "") && ["BR", "IMG", "HR"].indexOf(h.childNodes[0].tagName) < 0 && (h = h.childNodes[0])
                    }
                    for (; h.nodeType != Node.ELEMENT_NODE && h.parentNode;) h = h.parentNode;
                    for (var k = h; k && "HTML" != k.tagName;) {
                        if (k == b.$el.get(0)) return h;
                        k = a(k).parent()[0]
                    }
                }
            } catch (l) {}
            return b.$el.get(0)
        }

        function h() {
            var f = d();
            try {
                if (f.rangeCount) {
                    var g = e(0),
                        h = g.endContainer;
                    if (h.nodeType == Node.ELEMENT_NODE) {
                        var i = !1;
                        if (h.childNodes.length > 0 && h.childNodes[g.endOffset] && a(h.childNodes[g.endOffset]).text() === c()) h = h.childNodes[g.endOffset], i = !0;
                        else if (!g.collapsed && h.previousSibling && h.previousSibling.nodeType == Node.ELEMENT_NODE) {
                            var j = h.previousSibling;
                            j && j.textContent.replace(/\u200B/g, "") === c().replace(/\u200B/g, "") && (h = j, i = !0)
                        }!i && h.childNodes.length > 0 && a(h.childNodes[h.childNodes.length - 1]).text() === c() && ["BR", "IMG", "HR"].indexOf(h.childNodes[h.childNodes.length - 1].tagName) < 0 && (h = h.childNodes[h.childNodes.length - 1])
                    }
                    for (h.nodeType == Node.TEXT_NODE && 0 == g.endOffset && h.previousSibling && h.previousSibling.nodeType == Node.ELEMENT_NODE && (h = h.previousSibling); h.nodeType != Node.ELEMENT_NODE && h.parentNode;) h = h.parentNode;
                    for (var k = h; k && "HTML" != k.tagName;) {
                        if (k == b.$el.get(0)) return h;
                        k = a(k).parent()[0]
                    }
                }
            } catch (l) {}
            return b.$el.get(0)
        }

        function i(a, b) {
            var c = a;
            return c.nodeType == Node.ELEMENT_NODE && c.childNodes.length > 0 && c.childNodes[b] && (c = c.childNodes[b]), c.nodeType == Node.TEXT_NODE && (c = c.parentNode), c
        }

        function j() {
            var c = [],
                f = d();
            if (t() && f.rangeCount)
                for (var g = e(), h = 0; h < g.length; h++) {
                    var j = g[h],
                        k = i(j.startContainer, j.startOffset),
                        l = i(j.endContainer, j.endOffset);
                    b.node.isBlock(k) && c.indexOf(k) < 0 && c.push(k);
                    var m = b.node.blockParent(k);
                    m && c.indexOf(m) < 0 && c.push(m);
                    for (var n = [], o = k; o !== l && o !== b.$el.get(0);) n.indexOf(o) < 0 && o.children && o.children.length ? (n.push(o), o = o.children[0]) : o.nextSibling ? o = o.nextSibling : o.parentNode && (o = o.parentNode, n.push(o)), b.node.isBlock(o) && n.indexOf(o) < 0 && c.indexOf(o) < 0 && c.push(o);
                    b.node.isBlock(l) && c.indexOf(l) < 0 && c.push(l);
                    var m = b.node.blockParent(l);
                    m && c.indexOf(m) < 0 && c.push(m)
                }
            for (var h = c.length - 1; h > 0; h--) a(c[h]).find(c).length && "LI" != c[h].tagName && c.splice(h, 1);
            return c
        }

        function k() {
            if (b.$wp) {
                b.markers.remove();
                for (var a = e(), c = [], d = 0; d < a.length; d++)
                    if (a[d].startContainer !== b.document) {
                        var f = a[d],
                            g = f.collapsed,
                            h = b.markers.place(f, !0, d),
                            i = b.markers.place(f, !1, d);
                        if (b.browser.safari && !g) {
                            var f = b.document.createRange();
                            f.setStartAfter(h), f.setEndBefore(i), c.push(f)
                        }
                    }
                if (b.browser.safari && c.length) {
                    b.selection.clear();
                    for (var d = 0; d < c.length; d++) b.selection.get().addRange(c[d])
                }
            }
        }

        function l() {
            var c = b.$el.find('.fr-marker[data-type="true"]');
            if (!b.$wp) return c.remove(), !1;
            if (0 === c.length) return !1;
            b.core.hasFocus() || b.browser.msie || b.$el.focus(), f();
            for (var e = d(), g = 0; g < c.length; g++) {
                var h = a(c[g]).data("id"),
                    i = c[g],
                    j = b.document.createRange(),
                    k = b.$el.find('.fr-marker[data-type="false"][data-id="' + h + '"]'),
                    l = null;
                if (k.length > 0) {
                    k = k[0];
                    try {
                        for (var n = !1, o = i.nextSibling; o && o.nodeType == Node.TEXT_NODE && 0 == o.textContent.length;) {
                            var p = o;
                            o = o.nextSibling, a(p).remove()
                        }
                        for (var q = k.nextSibling; q && q.nodeType == Node.TEXT_NODE && 0 == q.textContent.length;) {
                            var p = q;
                            q = q.nextSibling, a(p).remove()
                        }
                        if (i.nextSibling == k || k.nextSibling == i) {
                            for (var r = i.nextSibling == k ? i : k, s = r == i ? k : i, t = r.previousSibling; t && t.nodeType == Node.TEXT_NODE && 0 == t.length;) {
                                var p = t;
                                t = t.previousSibling, a(p).remove()
                            }
                            if (t && t.nodeType == Node.TEXT_NODE)
                                for (; t && t.previousSibling && t.previousSibling.nodeType == Node.TEXT_NODE;) t.previousSibling.textContent = t.previousSibling.textContent + t.textContent, t = t.previousSibling, a(t.nextSibling).remove();
                            for (var u = s.nextSibling; u && u.nodeType == Node.TEXT_NODE && 0 == u.length;) {
                                var p = u;
                                u = u.nextSibling, a(p).remove()
                            }
                            if (u && u.nodeType == Node.TEXT_NODE)
                                for (; u && u.nextSibling && u.nextSibling.nodeType == Node.TEXT_NODE;) u.nextSibling.textContent = u.textContent + u.nextSibling.textContent, u = u.nextSibling, a(u.previousSibling).remove();
                            if (t && b.node.isVoid(t) && (t = null), u && b.node.isVoid(u) && (u = null), t && u && t.nodeType == Node.TEXT_NODE && u.nodeType == Node.TEXT_NODE) {
                                a(i).remove(), a(k).remove();
                                var v = t.textContent.length;
                                t.textContent = t.textContent + u.textContent, a(u).remove(), b.html.normalizeSpaces(t), j.setStart(t, v), j.setEnd(t, v), n = !0
                            } else !t && u && u.nodeType == Node.TEXT_NODE ? (a(i).remove(), a(k).remove(), b.html.normalizeSpaces(u), l = a(b.document.createTextNode("​")), a(u).before(l), j.setStart(u, 0), j.setEnd(u, 0), n = !0) : !u && t && t.nodeType == Node.TEXT_NODE && (a(i).remove(), a(k).remove(), b.html.normalizeSpaces(t), l = a(b.document.createTextNode("​")), a(t).after(l), j.setStart(t, t.textContent.length), j.setEnd(t, t.textContent.length), n = !0)
                        }
                        if (!n) {
                            var w, x;
                            b.browser.chrome && i.nextSibling == k ? (w = m(k, j, !0) || j.setStartAfter(k), x = m(i, j, !1) || j.setEndBefore(i)) : (i.previousSibling == k && (i = k, k = i.nextSibling), k.nextSibling && "BR" === k.nextSibling.tagName || !k.nextSibling && b.node.isBlock(i.previousSibling) || i.previousSibling && "BR" == i.previousSibling.tagName || (i.style.display = "inline", k.style.display = "inline", l = a(b.document.createTextNode("​"))), w = m(i, j, !0) || a(i).before(l) && j.setStartBefore(i), x = m(k, j, !1) || a(k).after(l) && j.setEndAfter(k)), "function" == typeof w && w(), "function" == typeof x && x()
                        }
                    } catch (y) {}
                }
                l && l.remove(), e.addRange(j)
            }
            b.markers.remove()
        }

        function m(c, d, e) {
            var f = c.previousSibling,
                g = c.nextSibling;
            if (f && g && f.nodeType == Node.TEXT_NODE && g.nodeType == Node.TEXT_NODE) {
                var h = f.textContent.length;
                return e ? (g.textContent = f.textContent + g.textContent, a(f).remove(), a(c).remove(), b.html.normalizeSpaces(g), function() {
                    d.setStart(g, h)
                }) : (f.textContent = f.textContent + g.textContent, a(g).remove(), a(c).remove(), b.html.normalizeSpaces(f), function() {
                    d.setEnd(f, h)
                })
            }
            return !1
        }

        function n() {
            return !0
        }

        function o() {
            for (var a = e(), b = 0; b < a.length; b++)
                if (!a[b].collapsed) return !1;
            return !0
        }

        function p(a) {
            var c, d, e = !1,
                f = !1;
            if (b.window.getSelection) {
                var g = b.window.getSelection();
                g.rangeCount && (c = g.getRangeAt(0), d = c.cloneRange(), d.selectNodeContents(a), d.setEnd(c.startContainer, c.startOffset), e = "" === d.toString(), d.selectNodeContents(a), d.setStart(c.endContainer, c.endOffset), f = "" === d.toString())
            } else b.document.selection && "Control" != b.document.selection.type && (c = b.document.selection.createRange(), d = c.duplicate(), d.moveToElementText(a), d.setEndPoint("EndToStart", c), e = "" === d.text, d.moveToElementText(a), d.setEndPoint("StartToEnd", c), f = "" === d.text);
            return {
                atStart: e,
                atEnd: f
            }
        }

        function q() {
            if (o()) return !1;
            b.$el.find("td").prepend('<span class="fr-mk">' + a.FroalaEditor.INVISIBLE_SPACE + "</span>"), b.$el.find("img").append('<span class="fr-mk">' + a.FroalaEditor.INVISIBLE_SPACE + "</span>");
            var c = !1,
                d = p(b.$el.get(0));
            return d.atStart && d.atEnd && (c = !0), b.$el.find(".fr-mk").remove(), c
        }

        function r(c, d) {
            "undefined" == typeof d && (d = !0);
            var e = a(c).html();
            e && e.replace(/\u200b/g, "").length != e.length && a(c).html(e.replace(/\u200b/g, ""));
            for (var f = b.node.contents(c), g = 0; g < f.length; g++) f[g].nodeType != Node.ELEMENT_NODE ? a(f[g]).remove() : (r(f[g], 0 == g), 0 == g && (d = !1));
            c.nodeType == Node.TEXT_NODE ? a(c).replaceWith('<span data-first="true" data-text="true"></span>') : d && a(c).attr("data-first", !0)
        }

        function s(c, d) {
            var e = b.node.contents(c.get(0));
            ["TD", "TH"].indexOf(c.get(0).tagName) >= 0 && 1 == c.find(".fr-marker").length && a(e[0]).hasClass("fr-marker") && c.attr("data-del-cell", !0);
            for (var f = 0; f < e.length; f++) {
                var g = e[f];
                a(g).hasClass("fr-marker") ? d = (d + 1) % 2 : d ? a(g).find(".fr-marker").length > 0 ? d = s(a(g), d) : ["TD", "TH"].indexOf(g.tagName) < 0 && !a(g).hasClass("fr-inner") ? !b.opts.keepFormatOnDelete || d > 1 || b.$el.find("[data-first]").length > 0 ? a(g).remove() : r(g) : a(g).hasClass("fr-inner") ? 0 == a(g).find(".fr-inner").length ? a(g).html("<br>") : a(g).find(".fr-inner").filter(function() {
                    return 0 == a(this).find("fr-inner").length
                }).html("<br>") : (a(g).empty(), a(g).attr("data-del-cell", !0)) : a(g).find(".fr-marker").length > 0 && (d = s(a(g), d))
            }
            return d
        }

        function t() {
            try {
                if (!b.$wp) return !1;
                for (var a = e(0), c = a.commonAncestorContainer; c && !b.node.isElement(c);) c = c.parentNode;
                return b.node.isElement(c) ? !0 : !1
            } catch (d) {
                return !1
            }
        }

        function u() {
            k();
            for (var c = function(b) {
                    for (var c = b.previousSibling; c && c.nodeType == Node.TEXT_NODE && 0 == c.textContent.length;) {
                        var d = c,
                            c = c.previousSibling;
                        a(d).remove()
                    }
                    return c
                }, d = function(b) {
                    for (var c = b.nextSibling; c && c.nodeType == Node.TEXT_NODE && 0 == c.textContent.length;) {
                        var d = c,
                            c = c.nextSibling;
                        a(d).remove()
                    }
                    return c
                }, e = b.$el.find('.fr-marker[data-type="true"]'), f = 0; f < e.length; f++)
                for (var g = e[f]; !c(g) && !b.node.isBlock(g.parentNode);) a(g.parentNode).before(g);
            for (var h = b.$el.find('.fr-marker[data-type="false"]'), f = 0; f < h.length; f++)
                for (var i = h[f]; !d(i) && !b.node.isBlock(i.parentNode);) a(i.parentNode).after(i);
            if (n()) {
                s(b.$el, 0);
                var j = b.$el.find('[data-first="true"]');
                if (j.length) b.$el.find(".fr-marker").remove(), j.append(a.FroalaEditor.INVISIBLE_SPACE + a.FroalaEditor.MARKERS).removeAttr("data-first"), j.attr("data-text") && j.replaceWith(j.html());
                else {
                    b.$el.find("table").filter(function() {
                        var b = a(this).find("[data-del-cell]").length > 0 && a(this).find("[data-del-cell]").length == a(this).find("td, th").length;
                        return b
                    }).remove(), b.$el.find("[data-del-cell]").removeAttr("data-del-cell");
                    for (var e = b.$el.find('.fr-marker[data-type="true"]'), f = 0; f < e.length; f++) {
                        var m = e[f],
                            o = m.nextSibling,
                            p = b.$el.find('.fr-marker[data-type="false"][data-id="' + a(m).data("id") + '"]').get(0);
                        if (p) {
                            if (o && o == p);
                            else if (m) {
                                var q = b.node.blockParent(m),
                                    r = b.node.blockParent(p);
                                if (a(m).after(p), q == r);
                                else if (null == q) {
                                    var t = b.node.deepestParent(m);
                                    t ? (a(t).after(a(r).html()), a(r).remove()) : 0 == a(r).parentsUntil(b.$el, "table").length && (a(m).next().after(a(r).html()), a(r).remove())
                                } else if (null == r && 0 == a(q).parentsUntil(b.$el, "table").length) {
                                    for (var o = q; !o.nextSibling && o.parentNode != b.$el.get(0);) o = o.parentNode;
                                    for (o = o.nextSibling; o && "BR" != o.tagName;) {
                                        var u = o.nextSibling;
                                        a(q).append(o), o = u
                                    }
                                } else 0 == a(q).parentsUntil(b.$el, "table").length && 0 == a(r).parentsUntil(b.$el, "table").length && (a(q).append(a(r).html()), a(r).remove())
                            }
                        } else p = a(m).clone().attr("data-type", !1), a(m).after(p)
                    }
                }
            }
            b.opts.keepFormatOnDelete || b.html.fillEmptyBlocks(!0), b.html.cleanEmptyTags(!0), b.clean.lists(), b.html.normalizeSpaces(), l()
        }

        function v(c) {
            if (a(c).find(".fr-marker").length > 0) return !1;
            for (var d = b.node.contents(c); d.length && b.node.isBlock(d[0]);) c = d[0], d = b.node.contents(c);
            a(c).prepend(a.FroalaEditor.MARKERS)
        }

        function w(c) {
            if (a(c).find(".fr-marker").length > 0) return !1;
            for (var d = b.node.contents(c); d.length && b.node.isBlock(d[d.length - 1]);) c = d[d.length - 1], d = b.node.contents(c);
            a(c).append(a.FroalaEditor.MARKERS)
        }

        function x(c) {
            for (var d = c.previousSibling; d && d.nodeType == Node.TEXT_NODE && 0 == d.textContent.length;) d = d.previousSibling;
            return d ? (b.node.isBlock(d) ? w(d) : "BR" == d.tagName ? a(d).before(a.FroalaEditor.MARKERS) : a(d).after(a.FroalaEditor.MARKERS), !0) : !1
        }

        function y(c) {
            for (var d = c.nextSibling; d && d.nodeType == Node.TEXT_NODE && 0 == d.textContent.length;) d = d.nextSibling;
            return d ? (b.node.isBlock(d) ? v(d) : a(d).before(a.FroalaEditor.MARKERS), !0) : !1
        }
        return {
            text: c,
            get: d,
            ranges: e,
            clear: f,
            element: g,
            endElement: h,
            save: k,
            restore: l,
            isCollapsed: o,
            isFull: q,
            inEditor: t,
            remove: u,
            blocks: j,
            info: p,
            setAtEnd: w,
            setAtStart: v,
            setBefore: x,
            setAfter: y,
            rangeElement: i
        }
    }, a.FroalaEditor.UNICODE_NBSP = String.fromCharCode(160), a.FroalaEditor.VOID_ELEMENTS = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr"], a.FroalaEditor.BLOCK_TAGS = ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "pre", "blockquote", "ul", "ol", "li", "table", "td", "th", "thead", "tfoot", "tbody", "tr", "hr"], a.extend(a.FroalaEditor.DEFAULTS, {
        htmlAllowedEmptyTags: ["textarea", "a", "iframe", "object", "video", "style", "script"],
        htmlSimpleAmpersand: !1
    }), a.FroalaEditor.MODULES.html = function(b) {
        function c() {
            return b.opts.enter == a.FroalaEditor.ENTER_P ? "p" : b.opts.enter == a.FroalaEditor.ENTER_DIV ? "div" : b.opts.enter == a.FroalaEditor.ENTER_BR ? null : void 0
        }

        function d(c) {
            "undefined" == typeof c && (c = !1);
            var d, g, h = [];
            if (c)
                for (d = b.$el.find(f()), g = 0; g < d.length; g++) {
                    for (var i = b.node.contents(d[g]), j = !1, k = 0; k < i.length; k++)
                        if (i[k].nodeType != Node.COMMENT_NODE && (i[k].nodeType == Node.ELEMENT_NODE && a.FroalaEditor.VOID_ELEMENTS.indexOf(i[k].tagName.toLowerCase()) >= 0 || i[k].textContent && i[k].textContent.replace(/\u200B/g, "").length > 0)) {
                            j = !0;
                            break
                        }
                    j || 0 !== a(d[g]).find(f()).length || h.push(d[g])
                } else
                    for (d = b.$el.find(e()), g = 0; g < d.length; g++) 0 === a(d[g]).find(f()).length && h.push(d[g]);
            return a(a.makeArray(h))
        }

        function e() {
            return a.FroalaEditor.BLOCK_TAGS.join(":empty, ") + ":empty"
        }

        function f() {
            return a.FroalaEditor.BLOCK_TAGS.join(", ")
        }

        function g() {
            var c = a.merge(["TD", "TH"], a.FroalaEditor.VOID_ELEMENTS);
            c = a.merge(c, b.opts.htmlAllowedEmptyTags);
            var d, e;
            do {
                e = !1, d = b.$el.find("*:empty").not(c.join(", ") + ", .fr-marker");
                for (var f = 0; f < d.length; f++) 0 === d[f].attributes.length && (a(d[f]).remove(), e = !0);
                d = b.$el.find("*:empty").not(c.join(", ") + ", .fr-marker")
            } while (d.length && e)
        }

        function h(d, e) {
            var f = c();
            if (e && (f = 'div class="fr-temp-div"'), f)
                for (var g = b.node.contents(d.get(0)), h = null, i = 0; i < g.length; i++) {
                    var j = g[i];
                    if (j.nodeType == Node.ELEMENT_NODE && b.node.isBlock(j)) h = null;
                    else if (j.nodeType != Node.ELEMENT_NODE && j.nodeType != Node.TEXT_NODE) h = null;
                    else if (j.nodeType == Node.ELEMENT_NODE && "BR" == j.tagName)
                        if (null == h) e ? a(j).replaceWith("<" + f + ' data-empty="true"><br></div>') : a(j).replaceWith("<" + f + "><br></" + f + ">");
                        else {
                            a(j).remove();
                            for (var k = b.node.contents(h), l = !1, m = 0; m < k.length; m++)
                                if (!a(k[m]).hasClass("fr-marker") && (k[m].nodeType != Node.TEXT_NODE || 0 !== k[m].textContent.replace(/ /g, "").length)) {
                                    l = !0;
                                    break
                                }
                            l === !1 && (h.append("<br>"), h.data("empty", !0)), h = null
                        } else j.nodeType == Node.TEXT_NODE && 0 == a(j).text().trim().length ? a(j).remove() : (null == h && (h = a("<" + f + ">"), a(j).before(h)), j.nodeType == Node.TEXT_NODE && a(j).text().trim().length > 0 ? (h.append(a(j).clone()), a(j).remove()) : h.append(a(j)))
                }
        }

        function i(c, d, e) {
            return b.$wp ? ("undefined" == typeof c && (c = !1), "undefined" == typeof d && (d = !1), "undefined" == typeof e && (e = !1), h(b.$el, c), b.$el.find(".fr-inner").each(function() {
                h(a(this), c)
            }), d && b.$el.find("td, th").each(function() {
                h(a(this), c)
            }), void(e && b.$el.find("blockquote").each(function() {
                h(a(this), c)
            }))) : !1
        }

        function j() {
            b.$el.find("div.fr-temp-div").each(function() {
                a(this).data("empty") || "LI" == this.parentNode.tagName ? a(this).replaceWith(a(this).html()) : a(this).replaceWith(a(this).html() + "<br>")
            }), b.$el.find(".fr-temp-div").removeClass("fr-temp-div").filter(function() {
                return "" == a(this).attr("class")
            }).removeAttr("class")
        }

        function k(b) {
            d(b).not("hr").filter(function() {
                return "false" != a(this).attr("contenteditable")
            }).append("<br/>")
        }

        function l() {
            return b.$el.find(f())
        }

        function m(a) {
            "undefined" == typeof a && (a = b.$el.get(0));
            for (var c = b.node.contents(a), d = c.length - 1; d >= 0; d--)
                if (c[d].nodeType == Node.TEXT_NODE && b.node.isBlock(a)) {
                    for (var e = -1; e != c[d].textContent.length;) e = c[d].textContent.length, c[d].textContent = c[d].textContent.replace(/(?!^)  (?!$)/g, " ");
                    c[d].textContent = c[d].textContent.replace(/^  /g, " "), c[d].textContent = c[d].textContent.replace(/  $/g, " "), b.node.isBlock(a) && (c[d].previousSibling || (c[d].textContent = c[d].textContent.replace(/^ */, "")), c[d].nextSibling || (c[d].textContent = c[d].textContent.replace(/ *$/, "")))
                } else m(c[d])
        }

        function n(a) {
            return a && (b.node.isBlock(a) || ["STYLE", "SCRIPT", "HEAD", "BR", "HR"].indexOf(a.tagName) >= 0 || a.nodeType == Node.COMMENT_NODE)
        }

        function o(c) {
            if ("undefined" == typeof c && (c = b.$el.get(0)), c.nodeType == Node.ELEMENT_NODE && ["STYLE", "SCRIPT", "HEAD"].indexOf(c.tagName) < 0)
                for (var d = b.node.contents(c), e = d.length - 1; e >= 0; e--) a(d[e]).hasClass("fr-marker") || o(d[e]);
            else if (c.nodeType == Node.TEXT_NODE && c.textContent.length > 0) {
                var f = c.previousSibling,
                    g = c.nextSibling;
                if (n(f) && n(g) && 0 === c.textContent.trim().length) a(c).remove();
                else {
                    var h = c.textContent;
                    h = h.replace(new RegExp(a.FroalaEditor.UNICODE_NBSP, "g"), " ");
                    for (var i = "", j = 0; j < h.length; j++) i += 32 != h.charCodeAt(j) || 0 !== j && 32 != i.charCodeAt(j - 1) ? h[j] : a.FroalaEditor.UNICODE_NBSP;
                    c.nextSibling || (i = i.replace(/ $/, a.FroalaEditor.UNICODE_NBSP)), c.previousSibling && !b.node.isVoid(c.previousSibling) && (i = i.replace(/^\u00A0([^ $])/, " $1")), i = i.replace(/([^ \u00A0])\u00A0([^ \u00A0])/g, "$1 $2"), c.textContent != i && (c.textContent = i)
                }
            }
        }

        function p(a, b, c) {
            var d = new RegExp(b, "gi"),
                e = d.exec(a);
            return e ? e[c] : null
        }

        function q(a, b) {
            var c = a.match(/<!DOCTYPE ?([^ ]*) ?([^ ]*) ?"?([^"]*)"? ?"?([^"]*)"?>/i);
            return c ? b.implementation.createDocumentType(c[1], c[3], c[4]) : b.implementation.createDocumentType("html")
        }

        function r(a) {
            var b = a.doctype,
                c = "<!DOCTYPE html>";
            return b && (c = "<!DOCTYPE " + b.name + (b.publicId ? ' PUBLIC "' + b.publicId + '"' : "") + (!b.publicId && b.systemId ? " SYSTEM" : "") + (b.systemId ? ' "' + b.systemId + '"' : "") + ">"), c
        }

        function s() {
            i(), m(), g(), o(), k(!0), b.clean.quotes(), b.clean.lists(), b.clean.tables(), b.clean.toHTML5(), b.clean.quotes(), b.placeholder.refresh(), b.selection.restore(), t()
        }

        function t() {
            b.core.isEmpty() && (null != c() ? 0 === b.$el.find(f()).length && (b.core.hasFocus() ? (b.$el.html("<" + c() + ">" + a.FroalaEditor.MARKERS + "<br/></" + c() + ">"), b.selection.restore()) : b.$el.html("<" + c() + "><br/></" + c() + ">")) : 0 === b.$el.find("*:not(.fr-marker):not(br)").length && (b.core.hasFocus() ? (b.$el.html(a.FroalaEditor.MARKERS + "<br/>"), b.selection.restore()) : b.$el.html("<br/>")))
        }

        function u(a, b) {
            return p(a, "<" + b + "[^>]*?>([\\w\\W]*)</" + b + ">", 1)
        }

        function v(c, d) {
            var e = a("<div " + (p(c, "<" + d + "([^>]*?)>", 1) || "") + ">");
            return b.node.rawAttributes(e.get(0))
        }

        function w(a) {
            return p(a, "<!DOCTYPE([^>]*?)>", 0) || "<!DOCTYPE html>"
        }

        function x(a) {
            var c = b.clean.html(a, [], [], b.opts.fullPage);
            if (c = c.replace(/\r|\n/g, ""), b.opts.fullPage) {
                var d = (u(c, "body") || c).replace(/\r|\n/g, ""),
                    e = v(c, "body"),
                    f = u(c, "head") || "<title></title>",
                    g = v(c, "head"),
                    h = w(c),
                    i = v(c, "html");
                b.$el.html(d), b.node.clearAttributes(b.$el.get(0)), b.$el.attr(e), b.$head.html(f), b.node.clearAttributes(b.$head.get(0)), b.$head.attr(g), b.node.clearAttributes(b.$html.get(0)), b.$html.attr(i), b.iframe_document.doctype.parentNode.replaceChild(q(h, b.iframe_document), b.iframe_document.doctype)
            } else b.$el.html(c);
            b.edit.on(), b.core.injectStyle(b.opts.iframeStyle), s(), b.$el.find("[fr-original-class]").each(function() {
                this.setAttribute("class", this.getAttribute("fr-original-class")), this.removeAttribute("fr-original-class")
            }), b.$el.find("[fr-original-style]").each(function() {
                this.setAttribute("style", this.getAttribute("fr-original-style")), this.removeAttribute("fr-original-style")
            }), b.events.trigger("html.set")
        }

        function y(a, c) {
            var d = "";
            b.events.trigger("html.beforeGet");
            var e, f = [];
            if (!b.opts.useClasses && !c) {
                for (e = 0; e < b.document.styleSheets.length; e++) {
                    var g;
                    try {
                        g = b.document.styleSheets[e].cssRules
                    } catch (h) {}
                    if (g)
                        for (var i = 0, j = g.length; j > i; i++) {
                            var k = b.opts.iframe ? "body " : ".fr-view ";
                            if (g[i].selectorText && 0 === g[i].selectorText.indexOf(k) && g[i].style.cssText.length > 0)
                                for (var l = g[i].selectorText.replace(k, "").replace(/::/g, ":"), m = b.$el.get(0).querySelectorAll(l), n = 0; n < m.length; n++) !m[n].getAttribute("fr-original-style") && m[n].getAttribute("style") && (m[n].setAttribute("fr-original-style", m[n].getAttribute("style")), f.push(m[n])), m[n].style.cssText += g[i].style.cssText
                        }
                }
                for (e = 0; e < f.length; e++) f[e].getAttribute("class") && (f[e].setAttribute("fr-original-class", f[e].getAttribute("class")), f[e].removeAttribute("class"))
            }
            if (b.core.isEmpty() ? b.opts.fullPage && (d = r(b.iframe_document), d += "<html" + b.node.attributes(b.$html.get(0)) + ">" + b.$html.html() + "</html>") : ("undefined" == typeof a && (a = !1), b.opts.fullPage ? (d = r(b.iframe_document), d += "<html" + b.node.attributes(b.$html.get(0)) + ">" + b.$html.html() + "</html>") : d = b.$el.html()), !b.opts.useClasses && !c)
                for (e = 0; e < f.length; e++) f[e].getAttribute("fr-original-class") && (f[e].setAttribute("class", f[e].getAttribute("fr-original-class")), f[e].removeAttribute("fr-original-class")), f[e].setAttribute("style", f[e].getAttribute("fr-original-style")), f[e].removeAttribute("fr-original-style");
            d = d.replace(/<pre(?:[\w\W]*?)>(?:[\w\W]*?)<\/pre>/g, function(a) {
                return a.replace(/<br>/g, "\n")
            }), b.opts.fullPage && (d = d.replace(/<style data-fr-style="true">(?:[\w\W]*?)<\/style>/g, ""), d = d.replace(/<style(?:[\w\W]*?)class="firebugResetStyles"(?:[\w\W]*?)>(?:[\w\W]*?)<\/style>/g, ""), d = d.replace(/<body((?:[\w\W]*?)) spellcheck="true"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>"), d = d.replace(/<body((?:[\w\W]*?)) contenteditable="(true|false)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>"), d = d.replace(/<body((?:[\w\W]*?)) dir="([\w]*)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>"), d = d.replace(/<body((?:[\w\W]*?))class="([\w\W]*?)(fr-rtl|fr-ltr)([\w\W]*?)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, '<body$1class="$2$4"$5>$6</body>'), d = d.replace(/<body((?:[\w\W]*?)) class=""((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>")), b.opts.htmlSimpleAmpersand && (d = d.replace(/\&amp;/gi, "&")), b.events.trigger("html.afterGet"), a || (d = d.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, "")), d = b.clean.invisibleSpaces(d);
            var o = b.events.chainTrigger("html.get", d);
            return "string" == typeof o && (d = o), d
        }

        function z() {
            var c = function(c, d) {
                    for (; d && (d.nodeType == Node.TEXT_NODE || !b.node.isBlock(d));) d && d.nodeType != Node.TEXT_NODE && a(c).wrapInner(b.node.openTagString(d) + b.node.closeTagString(d)), d = d.parentNode;
                    d && c.innerHTML == d.innerHTML && (c.innerHTML = d.outerHTML)
                },
                d = function() {
                    var c, d = null;
                    return b.window.getSelection ? (c = b.window.getSelection(), c && c.rangeCount && (d = c.getRangeAt(0).commonAncestorContainer, d.nodeType != Node.ELEMENT_NODE && (d = d.parentNode))) : (c = b.document.selection) && "Control" != c.type && (d = c.createRange().parentElement()), null != d && (a.inArray(b.$el.get(0), a(d).parents()) >= 0 || d == b.$el.get(0)) ? d : null
                },
                e = "";
            if ("undefined" != typeof b.window.getSelection) {
                b.browser.mozilla && (b.selection.save(), b.$el.find('.fr-marker[data-type="false"]').length > 1 && (b.$el.find('.fr-marker[data-type="false"][data-id="0"]').remove(), b.$el.find('.fr-marker[data-type="false"]:last').attr("data-id", "0"), b.$el.find(".fr-marker").not('[data-id="0"]').remove()), b.selection.restore());
                for (var f = b.selection.ranges(), g = 0; g < f.length; g++) {
                    var h = document.createElement("div");
                    h.appendChild(f[g].cloneContents()), c(h, d()), e += h.innerHTML
                }
            } else "undefined" != typeof b.document.selection && "Text" == b.document.selection.type && (e = b.document.selection.createRange().htmlText);
            return e
        }

        function A(b) {
            var c = a("<div>").html(b);
            return c.find(f()).length > 0
        }

        function B(a) {
            var c = b.document.createElement("div");
            return c.innerHTML = a, b.selection.setAtEnd(c), c.innerHTML
        }

        function C(a) {
            return a.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/"/gi, "&quot;").replace(/'/gi, "&apos;")
        }

        function D(c, d) {
            "" !== b.selection.text() && b.selection.remove();
            var e;
            if (e = d ? c : b.clean.html(c), c.indexOf('class="fr-marker"') < 0 && (e = B(e)), b.core.isEmpty()) b.$el.html(e);
            else {
                b.markers.insert();
                var f, g = b.$el.find(".fr-marker").get(0);
                if (A(e) && (f = b.node.deepestParent(g)))
                    if (b.node.isBlock(f) && b.node.isEmpty(f)) a(f).replaceWith(e);
                    else {
                        var h = g,
                            i = "",
                            j = "";
                        do h = h.parentNode, i += b.node.closeTagString(h), j = b.node.openTagString(h) + j; while (h != f);
                        a(g).replaceWith('<span id="fr-break"></span>');
                        var k = b.node.openTagString(f) + a(f).html() + b.node.closeTagString(f);
                        k = k.replace(/<span id="fr-break"><\/span>/g, i + e + j), a(f).replaceWith(k)
                    } else a(g).replaceWith(e)
            }
            s(), b.events.trigger("html.inserted")
        }

        function E(c) {
            var d = null;
            "undefined" == typeof c && (d = b.selection.element());
            var e, f;
            do {
                f = !1, e = b.$el.find("*").not(d).not(".fr-marker");
                for (var g = 0; g < e.length; g++) {
                    var h = e.get(g),
                        i = h.textContent;
                    0 === a(h).find("*").length && 1 === i.length && 8203 == i.charCodeAt(0) && (a(h).remove(), f = !0)
                }
            } while (f)
        }

        function F() {
            var a = function() {
                E(), b.placeholder && b.placeholder.refresh()
            };
            b.events.on("mouseup", a), b.events.on("keydown", a), b.events.on("contentChanged", t)
        }
        return {
            defaultTag: c,
            emptyBlocks: d,
            emptyBlockTagsQuery: e,
            blockTagsQuery: f,
            fillEmptyBlocks: k,
            cleanEmptyTags: g,
            cleanWhiteTags: E,
            normalizeSpaces: o,
            cleanBlankSpaces: m,
            blocks: l,
            getDoctype: r,
            set: x,
            get: y,
            getSelected: z,
            insert: D,
            wrap: i,
            unwrap: j,
            escapeEntities: C,
            checkIfEmpty: t,
            extractNode: u,
            extractNodeAttrs: v,
            extractDoctype: w,
            _init: F
        }
    }, a.extend(a.FroalaEditor.DEFAULTS, {
        height: null,
        heightMax: null,
        heightMin: null,
        width: null
    }), a.FroalaEditor.MODULES.size = function(a) {
        function b() {
            a.opts.height && a.$el.css("minHeight", a.opts.height - a.helpers.getPX(a.$el.css("padding-top")) - a.helpers.getPX(a.$el.css("padding-bottom"))), a.$iframe.height(a.$el.outerHeight(!0))
        }

        function c() {
            a.opts.height && (a.$wp.height(a.opts.height), a.$el.css("minHeight", a.opts.height - a.helpers.getPX(a.$el.css("padding-top")) - a.helpers.getPX(a.$el.css("padding-bottom")))), a.opts.heightMin && a.$el.css("minHeight", a.opts.heightMin), a.opts.heightMax && a.$wp.css("maxHeight", a.opts.heightMax), a.opts.width && a.$box.width(a.opts.width)
        }

        function d() {
            return a.$wp ? (c(), void(a.opts.iframe && (a.events.on("keyup", b), a.events.on("commands.after", b), a.events.on("html.set", b), a.events.on("init", b), a.events.on("initialized", b)))) : !1
        }
        return {
            _init: d,
            syncIframe: b,
            refresh: c
        }
    }, a.extend(a.FroalaEditor.DEFAULTS, {
        language: null
    }), a.FroalaEditor.LANGUAGE = {}, a.FroalaEditor.MODULES.language = function(b) {
        function c(a) {
            return e && e.translation[a] ? e.translation[a] : a
        }

        function d() {
            a.FroalaEditor.LANGUAGE && (e = a.FroalaEditor.LANGUAGE[b.opts.language]), e && e.direction && (b.opts.direction = e.direction)
        }
        var e;
        return {
            _init: d,
            translate: c
        }
    }, a.extend(a.FroalaEditor.DEFAULTS, {
        placeholderText: "Type something",
        placeholderFontFamily: "Arial, Helvetica, sans-serif"
    }), a.FroalaEditor.MODULES.placeholder = function(b) {
        function c() {
            var c = 0,
                d = b.node.contents(b.$el.get(0));
            d.length && d[0].nodeType == Node.ELEMENT_NODE ? (c = b.helpers.getPX(a(d[0]).css("margin-top")), b.$placeholder.css("font-size", a(d[0]).css("font-size")), b.$placeholder.css("line-height", a(d[0]).css("line-height"))) : (b.$placeholder.css("font-size", b.$el.css("font-size")), b.$placeholder.css("line-height", b.$el.css("line-height"))), b.$wp.addClass("show-placeholder"), b.$placeholder.css("margin-top", c).text(b.language.translate(b.opts.placeholderText || b.$original_element.attr("placeholder") || ""))
        }

        function d() {
            b.$wp.removeClass("show-placeholder")
        }

        function e() {
            return b.$wp ? b.$wp.hasClass("show-placeholder") : !0
        }

        function f() {
            return b.$wp ? void(b.core.isEmpty() ? c() : d()) : !1
        }

        function g() {
            return b.$wp ? (b.$placeholder = a('<span class="fr-placeholder"></span>'), b.$wp.append(b.$placeholder), b.events.on("init", f), b.events.on("input", f), b.events.on("keydown", f), b.events.on("keyup", f), void b.events.on("contentChanged", f)) : !1
        }
        return {
            _init: g,
            show: c,
            hide: d,
            refresh: f,
            isVisible: e
        }
    }, a.FroalaEditor.MODULES.edit = function(a) {
        function b() {
            a.browser.mozilla && (a.document.execCommand("enableObjectResizing", !1, "false"), a.document.execCommand("enableInlineTableEditing", !1, "false"))
        }

        function c() {
            a.$wp && (a.$el.attr("contenteditable", !0), a.$el.removeClass("fr-disabled"), a.$tb && a.$tb.removeClass("fr-disabled"), b()), f = !1
        }

        function d() {
            a.$wp && (a.$el.attr("contenteditable", !1), a.$el.addClass("fr-disabled"), a.$tb.addClass("fr-disabled")), f = !0
        }

        function e() {
            return f
        }
        var f = !1;
        return {
            on: c,
            off: d,
            disableDesign: b,
            isDisabled: e
        }
    }, a.extend(a.FroalaEditor.DEFAULTS, {
        editorClass: null,
        typingTimer: 500,
        iframe: !1,
        requestWithCORS: !0,
        requestHeaders: {},
        useClasses: !0,
        spellcheck: !0,
        iframeStyle: 'html{margin: 0px;}body{padding:10px;background:transparent;color:#000000;position:relative;z-index: 2;-webkit-user-select:auto;margin:0px}body:after{content:"";clear:both;display:block}',
        direction: "auto",
        zIndex: 1,
        disableRightClick: !1,
        scrollableContainer: "body",
        keepFormatOnDelete: !1
    }), a.FroalaEditor.MODULES.core = function(b) {
        function c(a) {
            b.opts.iframe && b.$head.append('<style data-fr-style="true">' + a + "</style>")
        }

        function d() {
            b.opts.iframe || b.$el.addClass("fr-element fr-view")
        }

        function e() {
            if (b.$box.addClass("fr-box" + (b.opts.editorClass ? " " + b.opts.editorClass : "")), b.$wp.addClass("fr-wrapper"), d(), b.opts.iframe) {
                b.$iframe.addClass("fr-iframe");
                for (var a = 0; a < b.original_document.styleSheets.length; a++) {
                    var c;
                    try {
                        c = b.original_document.styleSheets[a].cssRules
                    } catch (e) {}
                    if (c)
                        for (var f = 0, g = c.length; g > f; f++) c[f].selectorText && 0 === c[f].selectorText.indexOf(".fr-view") && c[f].style.cssText.length > 0 && (b.opts.iframeStyle += c[f].selectorText.replace(/\.fr-view/g, "body") + "{" + c[f].style.cssText + "}")
                }
            }
            "auto" != b.opts.direction && b.$box.removeClass("fr-ltr fr-rtl").addClass("fr-" + b.opts.direction), b.$el.attr("dir", b.opts.direction), b.$wp.attr("dir", b.opts.direction), b.opts.zIndex > 1 && b.$box.css("z-index", b.opts.zIndex), b.$box && b.opts.theme && b.$box.addClass(b.opts.theme + "-theme")
        }

        function f() {
            return b.node.isEmpty(b.$el.get(0))
        }

        function g() {
            b.drag_support = {
                filereader: "undefined" != typeof FileReader,
                formdata: !!b.window.FormData,
                progress: "upload" in new XMLHttpRequest
            }
        }

        function h(a, c) {
            var d = new XMLHttpRequest;
            d.open(c, a, !0), b.opts.requestWithCORS && (d.withCredentials = !0);
            for (var e in b.opts.requestHeaders) d.setRequestHeader(e, b.opts.requestHeaders[e]);
            return d
        }

        function i() {
            "TEXTAREA" == b.$original_element.get(0).tagName && b.$original_element.val(b.html.get()), b.$wp && ("TEXTAREA" == b.$original_element.get(0).tagName ? (b.$box.replaceWith(b.$original_element), b.$original_element.show()) : (b.$el.off("contextmenu.rightClick"), b.$wp.replaceWith(b.html.get()), b.$box.removeClass("fr-view fr-ltr fr-box " + (b.opts.editorClass || "")), b.opts.theme && b.$box.addClass(b.opts.theme + "-theme")))
        }

        function j() {
            return b.node.hasFocus(b.$el.get(0))
        }

        function k() {
            if (a.FroalaEditor.INSTANCES.push(b), g(), b.$wp) {
                e(), b.html.set(b._original_html), b.$el.attr("spellcheck", b.opts.spellcheck), b.helpers.isMobile() && (b.$el.attr("autocomplete", b.opts.spellcheck ? "on" : "off"), b.$el.attr("autocorrect", b.opts.spellcheck ? "on" : "off"), b.$el.attr("autocapitalize", b.opts.spellcheck ? "on" : "off")), b.opts.disableRightClick && b.$el.on("contextmenu.rightClick", function(a) {
                    return 2 == a.button ? !1 : void 0
                });
                try {
                    b.document.execCommand("styleWithCSS", !1, !1)
                } catch (c) {}
            }
            b.events.trigger("init"), b.events.on("destroy", i), "TEXTAREA" == b.$original_element.get(0).tagName && (b.events.on("contentChanged", function() {
                b.$original_element.val(b.html.get())
            }), b.events.on("form.submit", function() {
                b.$original_element.val(b.html.get())
            }), b.$original_element.val(b.html.get()))
        }
        return {
            _init: k,
            isEmpty: f,
            getXHR: h,
            injectStyle: c,
            hasFocus: j
        }
    }, a.FroalaEditor.COMMANDS = {
        bold: {
            title: "Bold"
        },
        italic: {
            title: "Italic"
        },
        underline: {
            title: "Underline"
        },
        strikeThrough: {
            title: "Strikethrough"
        },
        subscript: {
            title: "Subscript"
        },
        superscript: {
            title: "Superscript"
        },
        outdent: {
            title: "Decrease Indent"
        },
        indent: {
            title: "Increase Indent"
        },
        undo: {
            title: "Undo",
            undo: !1,
            forcedRefresh: !0,
            disabled: !0
        },
        redo: {
            title: "Redo",
            undo: !1,
            forcedRefresh: !0,
            disabled: !0
        },
        insertHR: {
            title: "Insert Horizontal Line"
        },
        clearFormatting: {
            title: "Clear Formatting"
        },
        selectAll: {
            title: "Select All",
            undo: !1
        }
    }, a.FroalaEditor.RegisterCommand = function(b, c) {
        a.FroalaEditor.COMMANDS[b] = c
    }, a.FroalaEditor.MODULES.commands = function(b) {
        function c(c, d) {
            if (b.events.trigger("commands.before", a.merge([c], d || [])) !== !1) {
                var e = a.FroalaEditor.COMMANDS[c] && a.FroalaEditor.COMMANDS[c].callback || k[c],
                    f = !0;
                a.FroalaEditor.COMMANDS[c] && "undefined" != typeof a.FroalaEditor.COMMANDS[c].focus && (f = a.FroalaEditor.COMMANDS[c].focus), b.core.hasFocus() || !f || b.popups.areVisible() || b.events.focus(!0), a.FroalaEditor.COMMANDS[c] && a.FroalaEditor.COMMANDS[c].undo !== !1 && b.undo.saveStep(), e && e.apply(b, a.merge([c], d || [])), b.events.trigger("commands.after", a.merge([c], d || [])), a.FroalaEditor.COMMANDS[c] && a.FroalaEditor.COMMANDS[c].undo !== !1 && b.undo.saveStep()
            }
        }

        function d(c, d) {
            if (b.selection.isCollapsed() && b.document.queryCommandState(c) === !1) {
                b.markers.insert();
                var e = b.$el.find(".fr-marker");
                e.replaceWith("<" + d + ">" + a.FroalaEditor.INVISIBLE_SPACE + a.FroalaEditor.MARKERS + "</" + d + ">"), b.selection.restore()
            } else {
                var f = b.selection.element();
                if (b.selection.isCollapsed() && b.document.queryCommandState(c) === !0 && f.tagName == d.toUpperCase() && 0 === (f.textContent || "").replace(/\u200B/g, "").length) a(f).replaceWith(a.FroalaEditor.MARKERS), b.selection.restore();
                else {
                    var g = b.$el.find("span"),
                        h = !1;
                    b.document.queryCommandState(c) === !1 && (b.selection.save(), h = !0), b.document.execCommand(c, !1, !1), h && b.selection.restore();
                    var i = b.$el.find("span[style]").not(g).filter(function() {
                        return a(this).attr("style").indexOf("font-weight: normal") >= 0
                    });
                    i.length && (b.selection.save(), i.each(function() {
                        a(this).replaceWith(a(this).html())
                    }), b.selection.restore()), b.clean.toHTML5()
                }
            }
        }

        function e(c) {
            b.selection.save(), b.html.wrap(!0, !0), b.selection.restore();
            for (var d = b.selection.blocks(), e = 0; e < d.length; e++)
                if ("LI" != d[e].tagName && "LI" != d[e].parentNode.tagName) {
                    var f = a(d[e]),
                        g = "rtl" == b.opts.direction || "rtl" == f.css("direction") ? "margin-right" : "margin-left",
                        h = b.helpers.getPX(f.css(g));
                    f.css(g, Math.max(h + 20 * c, 0) || ""), f.removeClass("fr-temp-div")
                }
            b.selection.save(), b.html.unwrap(), b.selection.restore()
        }

        function f() {
            var c = function(a) {
                return a.attr("style").indexOf("font-size") >= 0
            };
            b.$el.find("[style]").each(function() {
                var b = a(this);
                c(b) && (b.attr("data-font-size", b.css("font-size")), b.css("font-size", ""))
            })
        }

        function g() {
            b.$el.find("[data-font-size]").each(function() {
                var b = a(this);
                b.css("font-size", b.attr("data-font-size")), b.removeAttr("data-font-size")
            })
        }

        function h() {
            b.$el.find("span").each(function() {
                "" === b.node.attributes(this) && a(this).replaceWith(a(this).html())
            })
        }

        function i(c, d) {
            if (b.selection.isCollapsed()) {
                b.markers.insert();
                var e = b.$el.find(".fr-marker");
                e.replaceWith('<span style="' + c + ": " + d + ';">' + a.FroalaEditor.INVISIBLE_SPACE + a.FroalaEditor.MARKERS + "</span>"), b.selection.restore()
            } else {
                f(), b.document.execCommand("fontSize", !1, 4), b.selection.save(), g();
                for (var i, j = function(b) {
                        var d = a(b);
                        d.css(c, ""), "" === d.attr("style") && d.replaceWith(d.html())
                    }, k = function() {
                        return 0 === a(this).attr("style").indexOf(c + ":") || a(this).attr("style").indexOf(";" + c + ":") >= 0 || a(this).attr("style").indexOf("; " + c + ":") >= 0
                    }; b.$el.find("font").length > 0;) {
                    var l = b.$el.find("font:first"),
                        m = a('<span class="fr-just" style="' + c + ": " + d + ';">' + l.html() + "</span>");
                    l.replaceWith(m);
                    var n = m.find("span");
                    for (i = n.length - 1; i >= 0; i--) j(n[i]);
                    var o = m.parentsUntil(b.$el, "span:first").filter(k);
                    if (o.length) {
                        var p = "",
                            q = "",
                            r = "",
                            s = "",
                            t = m.get(0);
                        do t = t.parentNode, p += b.node.closeTagString(t), q = b.node.openTagString(t) + q, o.get(0) != t && (r += b.node.closeTagString(t), s = b.node.openTagString(t) + s); while (o.get(0) != t);
                        var u = p + '<span class="fr-just" style="' + c + ": " + d + ';">' + s + m.html() + r + "</span>" + q;
                        m.replaceWith('<span id="fr-break"></span>');
                        var v = o.get(0).outerHTML;
                        o.replaceWith(v.replace(/<span id="fr-break"><\/span>/g, u))
                    }
                }
                b.html.cleanEmptyTags(), h();
                var w = b.$el.find(".fr-just + .fr-just");
                for (i = 0; i < w.length; i++) {
                    var x = a(w[i]);
                    x.prepend(x.prev().html()), x.prev().remove()
                }
                b.$el.find(".fr-marker + .fr-just").each(function() {
                        a(this).prepend(a(this).prev())
                    }), b.$el.find(".fr-just + .fr-marker").each(function() {
                        a(this).append(a(this).next())
                    }), b.$el.find(".fr-just").removeAttr("class"),
                    b.selection.restore()
            }
        }

        function j(a) {
            return function() {
                c(a)
            }
        }
        var k = {
                bold: function() {
                    d("bold", "strong")
                },
                subscript: function() {
                    d("subscript", "sub")
                },
                superscript: function() {
                    d("superscript", "sup")
                },
                italic: function() {
                    d("italic", "em")
                },
                strikeThrough: function() {
                    d("strikeThrough", "s")
                },
                underline: function() {
                    d("underline", "u")
                },
                undo: function() {
                    b.undo.run()
                },
                redo: function() {
                    b.undo.redo()
                },
                indent: function() {
                    e(1)
                },
                outdent: function() {
                    e(-1)
                },
                show: function() {
                    b.opts.toolbarInline && b.toolbar.showInline(null, !0)
                },
                insertHR: function() {
                    b.selection.remove(), b.html.insert('<hr id="fr-just">');
                    var a = b.$el.find("hr#fr-just");
                    a.removeAttr("id"), b.selection.setAfter(a.get(0)) || b.selection.setBefore(a.get(0)), b.selection.restore()
                },
                clearFormatting: function() {
                    b.document.execCommand("removeFormat", !1, !1), b.document.execCommand("unlink", !1, !1)
                },
                selectAll: function() {
                    b.document.execCommand("selectAll", !1, !1)
                }
            },
            l = {};
        for (var m in k) l[m] = j(m);
        return a.extend(l, {
            exec: c,
            applyProperty: i
        })
    }, a.FroalaEditor.MODULES.cursorLists = function(b) {
        function c(a) {
            for (var b = a;
                "LI" != b.tagName;) b = b.parentNode;
            return b
        }

        function d(a) {
            for (var c = a; !b.node.isList(c);) c = c.parentNode;
            return c
        }

        function e(e) {
            var f, g = c(e),
                h = g.nextSibling,
                i = g.previousSibling,
                j = b.html.defaultTag();
            if (b.node.isEmpty(g, !0) && h) {
                for (var k = "", l = "", m = e.parentNode; !b.node.isList(m) && m.parentNode && "LI" !== m.parentNode.tagName;) k = b.node.openTagString(m) + k, l += b.node.closeTagString(m), m = m.parentNode;
                k = b.node.openTagString(m) + k, l += b.node.closeTagString(m);
                var n = "";
                for (n = m.parentNode && "LI" == m.parentNode.tagName ? l + "<li>" + a.FroalaEditor.MARKERS + "<br>" + k : j ? l + "<" + j + ">" + a.FroalaEditor.MARKERS + "<br></" + j + ">" + k : l + a.FroalaEditor.MARKERS + "<br>" + k, a(g).html('<span id="fr-break"></span>');
                    ["UL", "OL"].indexOf(m.tagName) < 0 || m.parentNode && "LI" === m.parentNode.tagName;) m = m.parentNode;
                var o = b.node.openTagString(m) + a(m).html() + b.node.closeTagString(m);
                o = o.replace(/<span id="fr-break"><\/span>/g, n), a(m).replaceWith(o), b.$el.find("li:empty").remove()
            } else i && h || !b.node.isEmpty(g, !0) ? (a(g).before("<li><br></li>"), a(e).remove()) : i ? (f = d(g), f.parentNode && "LI" == f.parentNode.tagName ? a(f.parentNode).after("<li>" + a.FroalaEditor.MARKERS + "<br></li>") : j ? a(f).after("<" + j + ">" + a.FroalaEditor.MARKERS + "<br></" + j + ">") : a(f).after(a.FroalaEditor.MARKERS + "<br>"), a(g).remove()) : (f = d(g), f.parentNode && "LI" == f.parentNode.tagName ? a(f.parentNode).before("<li>" + a.FroalaEditor.MARKERS + "<br></li>") : j ? a(f).before("<" + j + ">" + a.FroalaEditor.MARKERS + "<br></" + j + ">") : a(f).before(a.FroalaEditor.MARKERS + "<br>"), a(g).remove())
        }

        function f(d) {
            for (var e = c(d), f = "", g = d, h = "", i = ""; g != e;) {
                g = g.parentNode;
                var j = "A" == g.tagName && b.cursor.isAtEnd(d, g) ? "fr-to-remove" : "";
                h = b.node.openTagString(a(g).clone().addClass(j).get(0)) + h, i = b.node.closeTagString(g) + i
            }
            f = i + f + h + a.FroalaEditor.MARKERS, a(d).replaceWith('<span id="fr-break"></span>');
            var k = b.node.openTagString(e) + a(e).html() + b.node.closeTagString(e);
            k = k.replace(/<span id="fr-break"><\/span>/g, f), a(e).replaceWith(k)
        }

        function g(d) {
            for (var e = c(d), f = a.FroalaEditor.MARKERS, g = d; g != e;) {
                g = g.parentNode;
                var h = "A" == g.tagName && b.cursor.isAtEnd(d, g) ? "fr-to-remove" : "";
                f = b.node.openTagString(a(g).clone().addClass(h).get(0)) + f + b.node.closeTagString(g)
            }
            a(d).remove(), a(e).after(f)
        }

        function h(e) {
            var f = c(e),
                g = f.previousSibling;
            if (g) {
                g = a(g).find(b.html.blockTagsQuery()).get(-1) || g, a(e).replaceWith(a.FroalaEditor.MARKERS);
                var h = b.node.contents(g);
                h.length && "BR" == h[h.length - 1].tagName && a(h[h.length - 1]).remove(), a(f).find(b.html.blockTagsQuery()).not("ol, ul, table").each(function() {
                    this.parentNode == f && a(this).replaceWith(a(this).html() + (b.node.isEmpty(this) ? "" : "<br>"))
                });
                for (var i, j = b.node.contents(f)[0]; j && !b.node.isList(j);) i = j.nextSibling, a(g).append(j), j = i;
                for (g = f.previousSibling; j;) i = j.nextSibling, a(g).append(j), j = i;
                a(f).remove()
            } else {
                var k = d(f);
                if (a(e).replaceWith(a.FroalaEditor.MARKERS), k.parentNode && "LI" == k.parentNode.tagName) {
                    var l = k.previousSibling;
                    b.node.isBlock(l) ? (a(f).find(b.html.blockTagsQuery()).not("ol, ul, table").each(function() {
                        this.parentNode == f && a(this).replaceWith(a(this).html() + (b.node.isEmpty(this) ? "" : "<br>"))
                    }), a(l).append(a(f).html())) : a(k).before(a(f).html())
                } else {
                    var m = b.html.defaultTag();
                    m && 0 === a(f).find(b.html.blockTagsQuery()).length ? a(k).before("<" + m + ">" + a(f).html() + "</" + m + ">") : a(k).before(a(f).html())
                }
                a(f).remove(), 0 === a(k).find("li").length && a(k).remove()
            }
        }

        function i(d) {
            var e, f = c(d),
                g = f.nextSibling;
            if (g) {
                e = b.node.contents(g), e.length && "BR" == e[0].tagName && a(e[0]).remove(), a(g).find(b.html.blockTagsQuery()).not("ol, ul, table").each(function() {
                    this.parentNode == g && a(this).replaceWith(a(this).html() + (b.node.isEmpty(this) ? "" : "<br>"))
                });
                for (var h, i = d, j = b.node.contents(g)[0]; j && !b.node.isList(j);) h = j.nextSibling, a(i).after(j), i = j, j = h;
                for (; j;) h = j.nextSibling, a(f).append(j), j = h;
                a(d).replaceWith(a.FroalaEditor.MARKERS), a(g).remove()
            } else {
                for (var k = f; !k.nextSibling && k != b.$el.get(0);) k = k.parentNode;
                if (k == b.$el.get(0)) return !1;
                if (k = k.nextSibling, b.node.isBlock(k)) a.FroalaEditor.NO_DELETE_TAGS.indexOf(k.tagName) < 0 && (a(d).replaceWith(a.FroalaEditor.MARKERS), e = b.node.contents(f), e.length && "BR" == e[e.length - 1].tagName && a(e[e.length - 1]).remove(), a(f).append(a(k).html()), a(k).remove());
                else
                    for (e = b.node.contents(f), e.length && "BR" == e[e.length - 1].tagName && a(e[e.length - 1]).remove(), a(d).replaceWith(a.FroalaEditor.MARKERS); k && !b.node.isBlock(k) && "BR" != k.tagName;) a(f).append(a(k)), k = k.nextSibling
            }
        }
        return {
            _startEnter: e,
            _middleEnter: f,
            _endEnter: g,
            _backspace: h,
            _del: i
        }
    }, a.FroalaEditor.NO_DELETE_TAGS = ["TH", "TD", "TABLE"], a.FroalaEditor.SIMPLE_ENTER_TAGS = ["TH", "TD", "LI"], a.FroalaEditor.MODULES.cursor = function(b) {
        function c(a) {
            return b.node.isBlock(a) ? !0 : a.nextSibling ? !1 : c(a.parentNode)
        }

        function d(a) {
            return b.node.isBlock(a) ? !0 : a.previousSibling ? !1 : d(a.parentNode)
        }

        function e(a, c) {
            return a ? a == b.$wp.get(0) ? !1 : a.previousSibling ? !1 : a.parentNode == c ? !0 : e(a.parentNode, c) : !1
        }

        function f(a, c) {
            return a ? a == b.$wp.get(0) ? !1 : a.nextSibling ? !1 : a.parentNode == c ? !0 : f(a.parentNode, c) : !1
        }

        function g(c) {
            return a(c).parentsUntil(b.$el, "LI").length > 0 && 0 === a(c).parentsUntil("LI", "TABLE").length
        }

        function h(c) {
            var d = a(c).parentsUntil(b.$el, "BLOCKQUOTE").length > 0,
                e = b.node.deepestParent(c, [], !d);
            if (e && "BLOCKQUOTE" == e.tagName) {
                var f = b.node.deepestParent(c, [a(c).parentsUntil(b.$el, "BLOCKQUOTE").get(0)]);
                f && f.previousSibling && (e = f)
            }
            if (null !== e) {
                var g, h = e.previousSibling;
                if (b.node.isBlock(e) && b.node.isEditable(e) && h && a.FroalaEditor.NO_DELETE_TAGS.indexOf(h.tagName) < 0 && b.node.isEditable(h))
                    if (b.node.isBlock(h))
                        if (b.node.isEmpty(h) && !b.node.isList(h)) a(h).remove();
                        else {
                            if (b.node.isList(h) && (h = a(h).find("li:last").get(0)), g = b.node.contents(h), g.length && "BR" == g[g.length - 1].tagName && a(g[g.length - 1]).remove(), "BLOCKQUOTE" == h.tagName && "BLOCKQUOTE" != e.tagName)
                                for (g = b.node.contents(h); g.length && b.node.isBlock(g[g.length - 1]);) h = g[g.length - 1], g = b.node.contents(h);
                            else if ("BLOCKQUOTE" != h.tagName && "BLOCKQUOTE" == e.tagName)
                                for (g = b.node.contents(e); g.length && b.node.isBlock(g[0]);) e = g[0], g = b.node.contents(e);
                            a(c).replaceWith(a.FroalaEditor.MARKERS), a(h).append(e.innerHTML), a(e).remove()
                        } else a(c).replaceWith(a.FroalaEditor.MARKERS), "BLOCKQUOTE" == e.tagName && h.nodeType == Node.ELEMENT_NODE ? a(h).remove() : (a(h).after(b.node.isEmpty(e) ? "" : a(e).html()), a(e).remove(), "BR" == h.tagName && a(h).remove())
            }
        }

        function i(c) {
            for (var d = c; !d.previousSibling;) d = d.parentNode;
            d = d.previousSibling;
            var e;
            if (b.node.isBlock(d)) {
                if (a.FroalaEditor.NO_DELETE_TAGS.indexOf(d.tagName) < 0)
                    if (b.node.isEmpty(d) && !b.node.isList(d)) a(d).remove(), a(c).replaceWith(a.FroalaEditor.MARKERS);
                    else {
                        for (b.node.isList(d) && (d = a(d).find("li:last").get(0)), e = b.node.contents(d), e && "BR" == e[e.length - 1].tagName && a(e[e.length - 1]).remove(), e = b.node.contents(d); e && b.node.isBlock(e[e.length - 1]);) d = e[e.length - 1], e = b.node.contents(d);
                        a(d).append(a.FroalaEditor.MARKERS);
                        for (var f = c; !f.previousSibling;) f = f.parentNode;
                        for (; f && "BR" !== f.tagName && !b.node.isBlock(f);) {
                            var g = f;
                            f = f.nextSibling, a(d).append(g)
                        }
                        f && "BR" == f.tagName && a(f).remove(), a(c).remove()
                    }
            } else {
                for (e = b.node.contents(d); d.nodeType != Node.TEXT_NODE && e.length && !a(d).is("[contenteditable='false']");) d = e[e.length - 1], e = b.node.contents(d);
                if (d.nodeType == Node.TEXT_NODE) {
                    if (b.helpers.isIOS()) return !0;
                    a(d).after(a.FroalaEditor.MARKERS);
                    var h = d.textContent,
                        i = h.length - 1;
                    if (b.opts.tabSpaces && h.length >= b.opts.tabSpaces) {
                        var j = h.substr(h.length - b.opts.tabSpaces, h.length - 1);
                        0 == j.replace(/ /g, "").replace(new RegExp(a.FroalaEditor.UNICODE_NBSP, "g"), "").length && (i = h.length - b.opts.tabSpaces)
                    }
                    d.textContent = h.substring(0, i), d.textContent.length && 55357 == d.textContent.charCodeAt(d.textContent.length - 1) && (d.textContent = d.textContent.substr(0, d.textContent.length - 1))
                } else b.events.trigger("node.remove", [a(d)]) !== !1 && (a(d).after(a.FroalaEditor.MARKERS), a(d).remove())
            }
        }

        function j() {
            var f = !1,
                j = b.markers.insert();
            if (!j) return !0;
            b.$el.get(0).normalize();
            var k = j.previousSibling;
            if (k) {
                var l = k.textContent;
                l && l.length && 8203 == l.charCodeAt(l.length - 1) && (1 == l.length ? a(k).remove() : (k.textContent = k.textContent.substr(0, l.length - 1), k.textContent.length && 55357 == k.textContent.charCodeAt(k.textContent.length - 1) && (k.textContent = k.textContent.substr(0, k.textContent.length - 1))))
            }
            return c(j) ? f = i(j) : d(j) ? g(j) && e(j, a(j).parents("li:first").get(0)) ? b.cursorLists._backspace(j) : h(j) : f = i(j), a(j).remove(), b.$el.find("blockquote:empty").remove(), b.html.fillEmptyBlocks(!0), b.html.cleanEmptyTags(!0), b.clean.quotes(), b.clean.lists(), b.html.normalizeSpaces(), b.selection.restore(), f
        }

        function k(c) {
            var d = a(c).parentsUntil(b.$el, "BLOCKQUOTE").length > 0,
                e = b.node.deepestParent(c, [], !d);
            if (e && "BLOCKQUOTE" == e.tagName) {
                var f = b.node.deepestParent(c, [a(c).parentsUntil(b.$el, "BLOCKQUOTE").get(0)]);
                f && f.nextSibling && (e = f)
            }
            if (null !== e) {
                var g, h = e.nextSibling;
                if (b.node.isBlock(e) && b.node.isEditable(e) && h && a.FroalaEditor.NO_DELETE_TAGS.indexOf(h.tagName) < 0)
                    if (b.node.isBlock(h) && b.node.isEditable(h))
                        if (b.node.isList(h))
                            if (b.node.isEmpty(e, !0)) a(e).remove(), a(h).find("li:first").prepend(a.FroalaEditor.MARKERS);
                            else {
                                var i = a(h).find("li:first");
                                "BLOCKQUOTE" == e.tagName && (g = b.node.contents(e), g.length && b.node.isBlock(g[g.length - 1]) && (e = g[g.length - 1])), 0 === i.find("ul, ol").length && (a(c).replaceWith(a.FroalaEditor.MARKERS), i.find(b.html.blockTagsQuery()).not("ol, ul, table").each(function() {
                                    this.parentNode == i.get(0) && a(this).replaceWith(a(this).html() + (b.node.isEmpty(this) ? "" : "<br>"))
                                }), a(e).append(b.node.contents(i.get(0))), i.remove(), 0 === a(h).find("li").length && a(h).remove())
                            } else {
                    if (g = b.node.contents(h), g.length && "BR" == g[0].tagName && a(g[0]).remove(), "BLOCKQUOTE" != h.tagName && "BLOCKQUOTE" == e.tagName)
                        for (g = b.node.contents(e); g.length && b.node.isBlock(g[g.length - 1]);) e = g[g.length - 1], g = b.node.contents(e);
                    else if ("BLOCKQUOTE" == h.tagName && "BLOCKQUOTE" != e.tagName)
                        for (g = b.node.contents(h); g.length && b.node.isBlock(g[0]);) h = g[0], g = b.node.contents(h);
                    a(c).replaceWith(a.FroalaEditor.MARKERS), a(e).append(h.innerHTML), a(h).remove()
                } else {
                    for (a(c).replaceWith(a.FroalaEditor.MARKERS); h && "BR" !== h.tagName && !b.node.isBlock(h) && b.node.isEditable(h);) {
                        var j = h;
                        h = h.nextSibling, a(e).append(j)
                    }
                    h && "BR" == h.tagName && b.node.isEditable(h) && a(h).remove()
                }
            }
        }

        function l(d) {
            for (var e = d; !e.nextSibling;) e = e.parentNode;
            if (e = e.nextSibling, "BR" == e.tagName && b.node.isEditable(e))
                if (e.nextSibling) {
                    if (b.node.isBlock(e.nextSibling) && b.node.isEditable(e.nextSibling)) {
                        if (!(a.FroalaEditor.NO_DELETE_TAGS.indexOf(e.nextSibling.tagName) < 0)) return;
                        e = e.nextSibling, a(e.previousSibling).remove()
                    }
                } else if (c(e)) {
                if (g(d)) b.cursorLists._del(d);
                else {
                    var f = b.node.deepestParent(e);
                    f && (a(e).remove(), k(d))
                }
                return
            }
            var h;
            if (!b.node.isBlock(e) && b.node.isEditable(e)) {
                for (h = b.node.contents(e); e.nodeType != Node.TEXT_NODE && h.length && b.node.isEditable(e);) e = h[0], h = b.node.contents(e);
                e.nodeType == Node.TEXT_NODE ? (a(e).before(a.FroalaEditor.MARKERS), e.textContent.length && 55357 == e.textContent.charCodeAt(0) ? e.textContent = e.textContent.substring(2, e.textContent.length) : e.textContent = e.textContent.substring(1, e.textContent.length)) : b.events.trigger("node.remove", [a(e)]) !== !1 && (a(e).before(a.FroalaEditor.MARKERS), a(e).remove()), a(d).remove()
            } else if (a.FroalaEditor.NO_DELETE_TAGS.indexOf(e.tagName) < 0)
                if (b.node.isList(e)) d.previousSibling ? (a(e).find("li:first").prepend(d), b.cursorLists._backspace(d)) : (a(e).find("li:first").prepend(a.FroalaEditor.MARKERS), a(d).remove());
                else if (h = b.node.contents(e), h && "BR" == h[0].tagName && a(h[0]).remove(), h && "BLOCKQUOTE" == e.tagName) {
                var i = h[0];
                for (a(d).before(a.FroalaEditor.MARKERS); i && "BR" != i.tagName;) {
                    var j = i;
                    i = i.nextSibling, a(d).before(j)
                }
                i && "BR" == i.tagName && a(i).remove()
            } else a(d).after(a(e).html()).after(a.FroalaEditor.MARKERS), a(e).remove()
        }

        function m() {
            var e = b.markers.insert();
            if (!e) return !1;
            if (b.$el.get(0).normalize(), c(e))
                if (g(e))
                    if (0 === a(e).parents("li:first").find("ul, ol").length) b.cursorLists._del(e);
                    else {
                        var f = a(e).parents("li:first").find("ul:first, ol:first").find("li:first");
                        f = f.find(b.html.blockTagsQuery()).get(-1) || f, f.prepend(e), b.cursorLists._backspace(e)
                    } else k(e);
            else l(d(e) ? e : e);
            a(e).remove(), b.$el.find("blockquote:empty").remove(), b.html.fillEmptyBlocks(!0), b.html.cleanEmptyTags(!0), b.clean.quotes(), b.clean.lists(), b.html.normalizeSpaces(), b.selection.restore()
        }

        function n() {
            b.$el.find(".fr-to-remove").each(function() {
                for (var c = b.node.contents(this), d = 0; d < c.length; d++) c[d].nodeType == Node.TEXT_NODE && (c[d].textContent = c[d].textContent.replace(/\u200B/g, ""));
                a(this).replaceWith(this.innerHTML)
            })
        }

        function o(c, d, e) {
            var g, h = b.node.deepestParent(c, [], !e);
            if (h && "BLOCKQUOTE" == h.tagName) return f(c, h) ? (g = b.html.defaultTag(), g ? a(h).after("<" + g + ">" + a.FroalaEditor.MARKERS + "<br></" + g + ">") : a(h).after(a.FroalaEditor.MARKERS + "<br>"), a(c).remove(), !1) : (q(c, d, e), !1);
            if (null == h) a(c).replaceWith("<br/>" + a.FroalaEditor.MARKERS + "<br/>");
            else {
                var i = c,
                    j = "";
                (!b.node.isBlock(h) || d) && (j = "<br/>");
                var k = "",
                    l = "";
                g = b.html.defaultTag();
                var m = "",
                    n = "";
                g && b.node.isBlock(h) && (m = "<" + g + ">", n = "</" + g + ">");
                do
                    if (i = i.parentNode, !d || i != h || d && !b.node.isBlock(h))
                        if (k += b.node.closeTagString(i), i == h && b.node.isBlock(h)) l = m + l;
                        else {
                            var o = "A" == i.tagName && f(c, i) ? "fr-to-remove" : "";
                            l = b.node.openTagString(a(i).clone().addClass(o).get(0)) + l
                        }
                while (i != h);
                j = k + j + l + (c.parentNode == h && b.node.isBlock(h) ? "" : a.FroalaEditor.INVISIBLE_SPACE) + a.FroalaEditor.MARKERS, b.node.isBlock(h) && !a(h).find("*:last").is("br") && a(h).append("<br/>"), a(c).after('<span id="fr-break"></span>'), a(c).remove(), h.nextSibling && !b.node.isBlock(h.nextSibling) || b.node.isBlock(h) || a(h).after("<br>");
                var p;
                p = !d && b.node.isBlock(h) ? b.node.openTagString(h) + a(h).html() + n : b.node.openTagString(h) + a(h).html() + b.node.closeTagString(h), p = p.replace(/<span id="fr-break"><\/span>/g, j), a(h).replaceWith(p)
            }
        }

        function p(c, d, g) {
            var h = b.node.deepestParent(c, [], !g);
            if (h && "BLOCKQUOTE" == h.tagName) {
                if (e(c, h)) {
                    var i = b.html.defaultTag();
                    return i ? a(h).before("<" + i + ">" + a.FroalaEditor.MARKERS + "<br></" + i + ">") : a(h).before(a.FroalaEditor.MARKERS + "<br>"), a(c).remove(), !1
                }
                f(c, h) ? o(c, d, !0) : q(c, d, !0)
            }
            if (null == h) a(c).replaceWith("<br>" + a.FroalaEditor.MARKERS);
            else {
                if (b.node.isBlock(h))
                    if (d) a(c).remove(), a(h).prepend("<br>" + a.FroalaEditor.MARKERS);
                    else {
                        if (b.node.isEmpty(h, !0)) return o(c, d, g);
                        a(h).before(b.node.openTagString(h) + "<br>" + b.node.closeTagString(h))
                    } else a(h).before("<br>");
                a(c).remove()
            }
        }

        function q(c, d, g) {
            var h = b.node.deepestParent(c, [], !g);
            if (null == h)(!c.nextSibling || b.node.isBlock(c.nextSibling)) && a(c).after("<br>"), a(c).replaceWith("<br>" + a.FroalaEditor.MARKERS);
            else {
                var i = c,
                    j = "";
                "PRE" == h.tagName && (d = !0), (!b.node.isBlock(h) || d) && (j = "<br>");
                var k = "",
                    l = "";
                do {
                    var m = i;
                    if (i = i.parentNode, "BLOCKQUOTE" == h.tagName && b.node.isEmpty(m) && !a(m).hasClass("fr-marker") && a(m).find(c).length > 0 && a(m).after(c), ("BLOCKQUOTE" != h.tagName || !f(c, i) && !e(c, i)) && (!d || i != h || d && !b.node.isBlock(h))) {
                        k += b.node.closeTagString(i);
                        var n = "A" == i.tagName && f(c, i) ? "fr-to-remove" : "";
                        l = b.node.openTagString(a(i).clone().addClass(n).get(0)) + l
                    }
                } while (i != h);
                var o = h == c.parentNode && b.node.isBlock(h) || c.nextSibling;
                if ("BLOCKQUOTE" == h.tagName) {
                    c.previousSibling && b.node.isBlock(c.previousSibling) && c.nextSibling && "BR" == c.nextSibling.tagName && (a(c.nextSibling).after(c), c.nextSibling && "BR" == c.nextSibling.tagName && a(c.nextSibling).remove());
                    var p = b.html.defaultTag();
                    j = k + j + (p ? "<" + p + ">" : "") + a.FroalaEditor.MARKERS + "<br>" + (p ? "</" + p + ">" : "") + l
                } else j = k + j + l + (o ? "" : a.FroalaEditor.INVISIBLE_SPACE) + a.FroalaEditor.MARKERS;
                a(c).replaceWith('<span id="fr-break"></span>');
                var q = b.node.openTagString(h) + a(h).html() + b.node.closeTagString(h);
                q = q.replace(/<span id="fr-break"><\/span>/g, j), a(h).replaceWith(q)
            }
        }

        function r(e) {
            var f = b.markers.insert();
            if (!f) return !0;
            b.$el.get(0).normalize();
            var h = !1;
            a(f).parentsUntil(b.$el, "BLOCKQUOTE").length > 0 && (e = !1, h = !0), a(f).parentsUntil(b.$el, "TD, TH").length && (h = !1), c(f) ? !g(f) || e || h ? o(f, e, h) : b.cursorLists._endEnter(f) : d(f) ? !g(f) || e || h ? p(f, e, h) : b.cursorLists._startEnter(f) : !g(f) || e || h ? q(f, e, h) : b.cursorLists._middleEnter(f), n(), b.html.fillEmptyBlocks(!0), b.html.cleanEmptyTags(!0), b.clean.lists(), b.html.normalizeSpaces(), b.selection.restore()
        }
        return {
            enter: r,
            backspace: j,
            del: m,
            isAtEnd: f
        }
    }, a.FroalaEditor.MODULES.data = function(a) {
        function b(a) {
            return a
        }

        function c(a) {
            if (!a) return a;
            for (var c = "", f = b("charCodeAt"), g = b("fromCharCode"), h = l.indexOf(a[0]), i = 1; i < a.length - 2; i++) {
                for (var j = d(++h), k = a[f](i), m = "";
                    /[0-9-]/.test(a[i + 1]);) m += a[++i];
                m = parseInt(m, 10) || 0, k = e(k, j, m), k ^= h - 1 & 31, c += String[g](k)
            }
            return c
        }

        function d(a) {
            for (var b = a.toString(), c = 0, d = 0; d < b.length; d++) c += parseInt(b.charAt(d), 10);
            return c > 10 ? c % 9 + 1 : c
        }

        function e(a, b, c) {
            for (var d = Math.abs(c); d-- > 0;) a -= b;
            return 0 > c && (a += 123), a
        }

        function f(a) {
            return a && "none" == a.css("display") ? (a.remove(), !0) : !1
        }

        function g() {
            return f(j) || f(k)
        }

        function h() {
            return a.$box ? (a.$box.append(n(b(n("kTDD4spmKD1klaMB1C7A5RA1G3RA10YA5qhrjuvnmE1D3FD2bcG-7noHE6B2JB4C3xXA8WF6F-10RG2C3G3B-21zZE3C3H3xCA16NC4DC1f1hOF1MB3B-21whzQH5UA2WB10kc1C2F4D3XC2YD4D1C4F3GF2eJ2lfcD-13HF1IE1TC11TC7WE4TA4d1A2YA6XA4d1A3yCG2qmB-13GF4A1B1KH1HD2fzfbeQC3TD9VE4wd1H2A20A2B-22ujB3nBG2A13jBC10D3C2HD5D1H1KB11uD-16uWF2D4A3F-7C9D-17c1E4D4B3d1D2CA6B2B-13qlwzJF2NC2C-13E-11ND1A3xqUA8UE6bsrrF-7C-22ia1D2CF2H1E2akCD2OE1HH1dlKA6PA5jcyfzB-22cXB4f1C3qvdiC4gjGG2H2gklC3D-16wJC1UG4dgaWE2D5G4g1I2H3B7vkqrxH1H2EC9C3E4gdgzKF1OA1A5PF5C4WWC3VA6XA4e1E3YA2YA5HE4oGH4F2H2IB10D3D2NC5G1B1qWA9PD6PG5fQA13A10XA4C4A3e1H2BA17kC-22cmOB1lmoA2fyhcptwWA3RA8A-13xB-11nf1I3f1B7GB3aD3pavFC10D5gLF2OG1LSB2D9E7fQC1F4F3wpSB5XD3NkklhhaE-11naKA9BnIA6D1F5bQA3A10c1QC6Kjkvitc2B6BE3AF3E2DA6A4JD2IC1jgA-64MB11D6C4==")))), j = a.$box.find("> div:last"), k = j.find("> a"), void("rtl" == a.opts.direction && j.css("left", "auto").css("right", 0))) : !1
        }

        function i() {
            var c = a.opts.key || [""];
            "string" == typeof c && (c = [c]), a.ul = !0;
            for (var d = 0; d < c.length; d++) {
                var e = n(c[d]) || "";
                if (!(e !== n(b(n("mcVRDoB1BGILD7YFe1BTXBA7B6=="))) && e.indexOf(m, e.length - m.length) < 0 && [n("9qqG-7amjlwq=="), n("KA3B3C2A6D1D5H5H1A3==")].indexOf(m) < 0)) {
                    a.ul = !1;
                    break
                }
            }
            a.ul === !0 && h(), a.events.on("contentChanged", function() {
                a.ul === !0 && g() && h()
            })
        }
        var j, k, l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            m = function() {
                for (var a = 0, b = document.domain, c = b.split("."), d = "_gd" + (new Date).getTime(); a < c.length - 1 && -1 == document.cookie.indexOf(d + "=" + d);) b = c.slice(-1 - ++a).join("."), document.cookie = d + "=" + d + ";domain=" + b + ";";
                return document.cookie = d + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + b + ";", b
            }(),
            n = b(c);
        return {
            _init: i
        }
    }, a.FroalaEditor.ENTER_P = 0, a.FroalaEditor.ENTER_DIV = 1, a.FroalaEditor.ENTER_BR = 2, a.FroalaEditor.KEYCODE = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        ESC: 27,
        SPACE: 32,
        DELETE: 46,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        FF_SEMICOLON: 59,
        FF_EQUALS: 61,
        QUESTION_MARK: 63,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        META: 91,
        NUM_ZERO: 96,
        NUM_ONE: 97,
        NUM_TWO: 98,
        NUM_THREE: 99,
        NUM_FOUR: 100,
        NUM_FIVE: 101,
        NUM_SIX: 102,
        NUM_SEVEN: 103,
        NUM_EIGHT: 104,
        NUM_NINE: 105,
        NUM_MULTIPLY: 106,
        NUM_PLUS: 107,
        NUM_MINUS: 109,
        NUM_PERIOD: 110,
        NUM_DIVISION: 111,
        SEMICOLON: 186,
        DASH: 189,
        EQUALS: 187,
        COMMA: 188,
        PERIOD: 190,
        SLASH: 191,
        APOSTROPHE: 192,
        TILDE: 192,
        SINGLE_QUOTE: 222,
        OPEN_SQUARE_BRACKET: 219,
        BACKSLASH: 220,
        CLOSE_SQUARE_BRACKET: 221
    }, a.extend(a.FroalaEditor.DEFAULTS, {
        enter: a.FroalaEditor.ENTER_P,
        multiLine: !0,
        tabSpaces: 0
    }), a.FroalaEditor.MODULES.keys = function(b) {
        function c() {
            b.helpers.isIOS() && (b.events.disableBlur(), b.selection.save(), b.$el.blur(), b.selection.restore(), b.events.enableBlur())
        }

        function d(a) {
            a.preventDefault(), a.stopPropagation(), b.opts.multiLine && (b.selection.isCollapsed() || b.selection.remove(), b.cursor.enter()), c()
        }

        function e(a) {
            a.preventDefault(), a.stopPropagation(), b.opts.multiLine && (b.selection.isCollapsed() || b.selection.remove(), b.cursor.enter(!0))
        }

        function f(a) {
            b.selection.isCollapsed() ? b.cursor.backspace() || (a.preventDefault(), a.stopPropagation(), x = !1) : (a.preventDefault(), a.stopPropagation(), b.selection.remove(), b.html.fillEmptyBlocks(!0), x = !1), b.placeholder.refresh()
        }

        function g(a) {
            a.preventDefault(), a.stopPropagation(), "" === b.selection.text() ? b.cursor.del() : b.selection.remove(), b.placeholder.refresh()
        }

        function h(c) {
            if (b.browser.mozilla) {
                c.preventDefault(), c.stopPropagation(), b.selection.isCollapsed() || b.selection.remove(), b.markers.insert();
                var d = b.$el.find(".fr-marker").get(0),
                    e = d.previousSibling;
                e && e.nodeType == Node.TEXT_NODE && 1 == e.textContent.length && 160 == e.textContent.charCodeAt(0) ? a(e).after(" ") : a(d).before("&nbsp;"), a(d).replaceWith(a.FroalaEditor.MARKERS), b.selection.restore()
            }
        }

        function i() {
            if (b.browser.mozilla && b.selection.isCollapsed() && !A) {
                var a = b.selection.ranges(0),
                    c = a.startContainer,
                    d = a.startOffset;
                c && c.nodeType == Node.TEXT_NODE && d <= c.textContent.length && d > 0 && 32 == c.textContent.charCodeAt(d - 1) && (b.selection.save(), b.html.normalizeSpaces(), b.selection.restore())
            }
        }

        function j() {
            b.selection.isFull() && setTimeout(function() {
                var c = b.html.defaultTag();
                c ? b.$el.html("<" + c + ">" + a.FroalaEditor.MARKERS + "<br/></" + c + ">") : b.$el.html(a.FroalaEditor.MARKERS + "<br/>"), b.selection.restore(), b.placeholder.refresh(), b.button.bulkRefresh(), b.undo.saveStep()
            }, 0)
        }

        function k(a) {
            if (b.opts.tabSpaces > 0)
                if (b.selection.isCollapsed()) {
                    a.preventDefault(), a.stopPropagation();
                    for (var c = "", d = 0; d < b.opts.tabSpaces; d++) c += "&nbsp;";
                    b.html.insert(c), b.placeholder.refresh()
                } else a.preventDefault(), a.stopPropagation(), a.shiftKey ? b.commands.outdent() : b.commands.indent()
        }

        function l(a) {
            A = !1
        }

        function m() {
            return A
        }

        function n(c) {
            b.events.disableBlur(), x = !0;
            var i = c.which;
            if (16 === i) return !0;
            if (229 === i) return A = !0, !0;
            A = !1;
            var j = s(i) && !r(c),
                l = i == a.FroalaEditor.KEYCODE.BACKSPACE || i == a.FroalaEditor.KEYCODE.DELETE;
            if (b.selection.isFull() && !b.opts.keepFormatOnDelete || l && b.placeholder.isVisible() && b.opts.keepFormatOnDelete) {
                if (j || l) {
                    var m = b.html.defaultTag();
                    m ? b.$el.html("<" + m + ">" + a.FroalaEditor.MARKERS + "<br/></" + m + ">") : b.$el.html(a.FroalaEditor.MARKERS + "<br/>")
                }
                b.selection.restore()
            }
            i == a.FroalaEditor.KEYCODE.ENTER ? c.shiftKey ? e(c) : d(c) : i != a.FroalaEditor.KEYCODE.BACKSPACE || r(c) ? i != a.FroalaEditor.KEYCODE.DELETE || r(c) ? i == a.FroalaEditor.KEYCODE.SPACE ? h(c) : i == a.FroalaEditor.KEYCODE.TAB ? k(c) : r(c) || !s(c.which) || b.selection.isCollapsed() || b.selection.remove() : g(c) : f(c), b.events.enableBlur()
        }

        function o(c) {
            for (var d = 0; d < c.length; d++) c[d].nodeType == Node.TEXT_NODE && /\u200B/gi.test(c[d].textContent) ? (c[d].textContent = c[d].textContent.replace(/\u200B/gi, ""), 0 === c[d].textContent.length && a(c[d]).remove()) : c[d].nodeType == Node.ELEMENT_NODE && "IFRAME" != c[d].nodeType && o(b.node.contents(c[d]))
        }

        function p() {
            if (!b.$wp) return !0;
            var c;
            b.opts.height || b.opts.heightMax ? (c = b.position.getBoundingRect().top, b.opts.iframe && (c += b.$iframe.offset().top), c > b.$wp.offset().top - a(b.original_window).scrollTop() + b.$wp.height() - 20 && b.$wp.scrollTop(c + b.$wp.scrollTop() - (b.$wp.height() + b.$wp.offset().top) + a(b.original_window).scrollTop() + 20)) : (c = b.position.getBoundingRect().top, b.opts.iframe && (c += b.$iframe.offset().top), c > b.original_window.innerHeight - 20 && a(b.original_window).scrollTop(c + a(b.original_window).scrollTop() - b.original_window.innerHeight + 20), c = b.position.getBoundingRect().top, b.opts.iframe && (c += b.$iframe.offset().top), c < b.$tb.height() + 20 && a(b.original_window).scrollTop(c + a(b.original_window).scrollTop() - b.$tb.height() - 20))
        }

        function q(c) {
            if (A) return !1;
            if (!b.selection.isCollapsed()) return !1;
            !c || c.which != a.FroalaEditor.KEYCODE.ENTER && c.which != a.FroalaEditor.KEYCODE.BACKSPACE || c.which == a.FroalaEditor.KEYCODE.BACKSPACE && x || p();
            for (var d = b.$el.find(b.html.blockTagsQuery()).andSelf().not("TD, TH").find(" > br"), e = 0; e < d.length; e++) {
                var f = d[e],
                    g = f.previousSibling,
                    h = f.nextSibling,
                    i = b.node.blockParent(f) || b.$el.get(0);
                g && i && "BR" != g.tagName && !b.node.isBlock(g) && !h && a(i).text().replace(/\u200B/g, "").length > 0 && a(g).text().length > 0 && (b.selection.save(), a(f).remove(), b.selection.restore())
            }
            var j = function(b) {
                    if (!b) return !1;
                    var c = a(b).html();
                    return c = c.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, ""), c && /\u200B/.test(c) && c.replace(/\u200B/gi, "").length > 0 ? !0 : !1
                },
                k = b.selection.element();
            j(k) && 0 === a(k).find("li").length && !a(k).hasClass("fr-marker") && "IFRAME" != k.tagName && (b.selection.save(), o(b.node.contents(k)), b.selection.restore())
        }

        function r(a) {
            if (-1 != navigator.userAgent.indexOf("Mac OS X")) {
                if (a.metaKey && !a.altKey) return !0
            } else if (a.ctrlKey && !a.altKey) return !0;
            return !1
        }

        function s(c) {
            if (c >= a.FroalaEditor.KEYCODE.ZERO && c <= a.FroalaEditor.KEYCODE.NINE) return !0;
            if (c >= a.FroalaEditor.KEYCODE.NUM_ZERO && c <= a.FroalaEditor.KEYCODE.NUM_MULTIPLY) return !0;
            if (c >= a.FroalaEditor.KEYCODE.A && c <= a.FroalaEditor.KEYCODE.Z) return !0;
            if (b.browser.webkit && 0 === c) return !0;
            switch (c) {
                case a.FroalaEditor.KEYCODE.SPACE:
                case a.FroalaEditor.KEYCODE.QUESTION_MARK:
                case a.FroalaEditor.KEYCODE.NUM_PLUS:
                case a.FroalaEditor.KEYCODE.NUM_MINUS:
                case a.FroalaEditor.KEYCODE.NUM_PERIOD:
                case a.FroalaEditor.KEYCODE.NUM_DIVISION:
                case a.FroalaEditor.KEYCODE.SEMICOLON:
                case a.FroalaEditor.KEYCODE.FF_SEMICOLON:
                case a.FroalaEditor.KEYCODE.DASH:
                case a.FroalaEditor.KEYCODE.EQUALS:
                case a.FroalaEditor.KEYCODE.FF_EQUALS:
                case a.FroalaEditor.KEYCODE.COMMA:
                case a.FroalaEditor.KEYCODE.PERIOD:
                case a.FroalaEditor.KEYCODE.SLASH:
                case a.FroalaEditor.KEYCODE.APOSTROPHE:
                case a.FroalaEditor.KEYCODE.SINGLE_QUOTE:
                case a.FroalaEditor.KEYCODE.OPEN_SQUARE_BRACKET:
                case a.FroalaEditor.KEYCODE.BACKSLASH:
                case a.FroalaEditor.KEYCODE.CLOSE_SQUARE_BRACKET:
                    return !0;
                default:
                    return !1
            }
        }

        function t(a) {
            var c = a.which;
            return r(a) || c >= 37 && 40 >= c ? !0 : (y || (z = b.snapshot.get()), clearTimeout(y), void(y = setTimeout(function() {
                y = null, b.undo.saveStep()
            }, 500)))
        }

        function u(a) {
            return r(a) ? !0 : void(z && y && (b.undo.saveStep(z), z = null))
        }

        function v() {
            y && (clearTimeout(y), b.undo.saveStep(), z = null)
        }

        function w() {
            if (b.events.on("keydown", t), b.events.on("input", i), b.events.on("keyup", u), b.events.on("keypress", l), b.events.on("keydown", n), b.events.on("keyup", q), b.events.on("html.inserted", q), b.events.on("cut", j), b.$el.get(0).msGetInputContext) try {
                b.$el.get(0).msGetInputContext().addEventListener("MSCandidateWindowShow", function() {
                    A = !0
                }), b.$el.get(0).msGetInputContext().addEventListener("MSCandidateWindowHide", function() {
                    A = !1, q()
                })
            } catch (a) {}
        }
        var x, y, z, A = !1;
        return {
            _init: w,
            ctrlKey: r,
            isCharacter: s,
            forceUndo: v,
            isIME: m
        }
    }, a.extend(a.FroalaEditor.DEFAULTS, {
        pastePlain: !1,
        pasteDeniedTags: ["colgroup", "col"],
        pasteDeniedAttrs: ["class", "id", "style"],
        pasteAllowLocalImages: !1
    }), a.FroalaEditor.MODULES.paste = function(b) {
        function c(c) {
            l = b.html.getSelected(), m = a("<div>").html(l).text(), "cut" == c.type && (b.undo.saveStep(), setTimeout(function() {
                b.html.wrap(), b.events.focus(), b.undo.saveStep()
            }, 0))
        }

        function d(a) {
            if (a.originalEvent && (a = a.originalEvent), b.events.trigger("paste.before", [a]) === !1) return !1;
            if (n = b.$window.scrollTop(), a && a.clipboardData && a.clipboardData.getData) {
                var c = "",
                    d = a.clipboardData.types;
                if (b.helpers.isArray(d))
                    for (var f = 0; f < d.length; f++) c += d[f] + ";";
                else c = d;
                if (o = "", /text\/html/.test(c) ? o = a.clipboardData.getData("text/html") : /text\/rtf/.test(c) && b.browser.safari ? o = a.clipboardData.getData("text/rtf") : /text\/plain/.test(c) && !this.browser.mozilla && (o = b.html.escapeEntities(a.clipboardData.getData("text/plain")).replace(/\n/g, "<br>")), "" !== o) return h(), a.preventDefault && (a.stopPropagation(), a.preventDefault()), !1;
                o = null
            }
            e()
        }

        function e() {
            b.selection.save(), b.events.disableBlur(), o = null, p ? p.html("") : (p = a('<div contenteditable="true" style="position: fixed; top: 0; left: -9999px; height: 100%; width: 0; z-index: 9999; line-height: 140%;" tabindex="-1"></div>'), b.$box.after(p)), p.focus(), b.window.setTimeout(h, 1)
        }

        function f(c) {
            c = c.replace(/<p(.*?)class="?'?MsoListParagraph"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li>$3</li></ul>"), c = c.replace(/<p(.*?)class="?'?NumberedText"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li>$3</li></ol>"), c = c.replace(/<p(.*?)class="?'?MsoListParagraphCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li$3>$5</li>"), c = c.replace(/<p(.*?)class="?'?NumberedTextCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li$3>$5</li>"), c = c.replace(/<p(.*?)class="?'?MsoListParagraphCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>"), c = c.replace(/<p(.*?)class="?'?NumberedTextCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>"), c = c.replace(/<p(.*?)class="?'?MsoListParagraphCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ul>"), c = c.replace(/<p(.*?)class="?'?NumberedTextCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ol>"), c = c.replace(/<span([^<]*?)style="?'?mso-list:Ignore"?'?([\s\S]*?)>([\s\S]*?)<span/gi, "<span><span"), c = c.replace(/<!--\[if \!supportLists\]-->([\s\S]*?)<!--\[endif\]-->/gi, ""), c = c.replace(/<!\[if \!supportLists\]>([\s\S]*?)<!\[endif\]>/gi, ""), c = c.replace(/(\n|\r| class=(")?Mso[a-zA-Z0-9]+(")?)/gi, " "), c = c.replace(/<!--[\s\S]*?-->/gi, ""), c = c.replace(/<(\/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>/gi, "");
            for (var d = ["style", "script", "applet", "embed", "noframes", "noscript"], e = 0; e < d.length; e++) {
                var f = new RegExp("<" + d[e] + ".*?" + d[e] + "(.*?)>", "gi");
                c = c.replace(f, "")
            }
            c = c.replace(/&nbsp;/gi, " "), c = c.replace(/<td([^>]*)><\/td>/g, "<td$1><br></td>"), c = c.replace(/<th([^>]*)><\/th>/g, "<th$1><br></th>");
            var g;
            do g = c, c = c.replace(/<[^\/>][^>]*><\/[^>]+>/gi, ""); while (c != g);
            c = c.replace(/<lilevel([^1])([^>]*)>/gi, '<li data-indent="true"$2>'), c = c.replace(/<lilevel1([^>]*)>/gi, "<li$1>"), c = b.clean.html(c, b.opts.pasteDeniedTags, b.opts.pasteDeniedAttrs), c = c.replace(/<a>(.[^<]+)<\/a>/gi, "$1");
            var h = a("<div>").html(c);
            return h.find("li[data-indent]").each(function(b, c) {
                var d = a(c);
                if (d.prev("li").length > 0) {
                    var e = d.prev("li").find("> ul, > ol");
                    0 === e.length && (e = a("ul"), d.prev("li").append(e)), e.append(c)
                } else d.removeAttr("data-indent")
            }), c = h.html()
        }

        function g(c) {
            var d = a("<div>").html(c);
            d.find("p, div, h1, h2, h3, h4, h5, h6, pre, blockquote").each(function(c, d) {
                a(d).replaceWith("<" + (b.html.defaultTag() || "DIV") + ">" + a(d).html() + "</" + (b.html.defaultTag() || "DIV") + ">")
            }), a(d.find("*").not("p, div, h1, h2, h3, h4, h5, h6, pre, blockquote, ul, ol, li, table, tbody, thead, tr, td, br").get().reverse()).each(function() {
                a(this).replaceWith(a(this).html())
            });
            var e = function(c) {
                for (var d = b.node.contents(c), f = 0; f < d.length; f++) 3 != d[f].nodeType && 1 != d[f].nodeType ? a(d[f]).remove() : e(d[f])
            };
            return e(d.get(0)), d.html()
        }

        function h() {
            b.keys.forceUndo();
            var c = b.snapshot.get();
            null === o && (o = p.html(), b.selection.restore(), b.events.enableBlur());
            var d = b.events.chainTrigger("paste.beforeCleanup", o);
            if ("string" == typeof d && (o = d), o.indexOf("<body") >= 0 && (o = o.replace(/[.\s\S\w\W<>]*<body[^>]*>([.\s\S\w\W<>]*)<\/body>[.\s\S\w\W<>]*/g, "$1")), o.match(/(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument)/gi) ? (o = o.replace(/^\n*/g, "").replace(/^ /g, ""), 0 === o.indexOf("<colgroup>") && (o = "<table>" + o + "</table>"), o = f(o), o = j(o)) : (b.opts.htmlAllowComments = !1, o = b.clean.html(o, b.opts.pasteDeniedTags, b.opts.pasteDeniedAttrs), b.opts.htmlAllowComments = !0, o = j(o), o = o.replace(/\r|\n|\t/g, ""), m && a("<div>").html(o).text().replace(/(\u00A0)/gi, " ").replace(/\r|\n/gi, "") == m.replace(/(\u00A0)/gi, " ").replace(/\r|\n/gi, "") && (o = l), o = o.replace(/^ */g, "").replace(/ *$/g, "")), b.opts.pastePlain && (o = g(o)), d = b.events.chainTrigger("paste.afterCleanup", o), "string" == typeof d && (o = d), "" !== o) {
                var e = a("<div>").html(o);
                b.html.cleanBlankSpaces(e.get(0)), b.html.normalizeSpaces(e.get(0)), o = e.html(), b.html.insert(o, !0)
            }
            i(), b.undo.saveStep(c), b.undo.saveStep()
        }

        function i() {
            b.events.trigger("paste.after")
        }

        function j(b) {
            for (var c, d = a("<div>").html(b), e = d.find("*:empty:not(br, img, td, th)"); e.length;) {
                for (c = 0; c < e.length; c++) a(e[c]).remove();
                e = d.find("*:empty:not(br, img, td, th)")
            }
            for (var f = d.find("> div:not([style]), td > div, th > div, li > div"); f.length;) {
                var g = a(f[f.length - 1]);
                g.replaceWith(g.html() + "<br>"), f = d.find("> div:not([style]), td > div, th > div, li > div")
            }
            for (f = d.find("div:not([style])"); f.length;) {
                for (c = 0; c < f.length; c++) {
                    var h = a(f[c]),
                        i = h.html().replace(/\u0009/gi, "").trim();
                    h.replaceWith(i)
                }
                f = d.find("div:not([style])")
            }
            return d.html()
        }

        function k() {
            b.events.on("copy", c), b.events.on("cut", c), b.events.on("paste", d), b.events.on("beforepaste", d)
        }
        var l, m, n, o, p;
        return {
            _init: k
        }
    }, a.FroalaEditor.MODULES.tooltip = function(b) {
        function c() {
            b.$tooltip.removeClass("fr-visible").css("left", "-3000px")
        }

        function d(c, d) {
            if (c.data("title") || c.data("title", c.attr("title")), !c.data("title")) return !1;
            c.removeAttr("title"), b.$tooltip.text(c.data("title")), b.$tooltip.addClass("fr-visible");
            var e = c.offset().left + (c.outerWidth() - b.$tooltip.outerWidth()) / 2;
            0 > e && (e = 0), e + b.$tooltip.outerWidth() > a(b.original_window).width() && (e = a(b.original_window).width() - b.$tooltip.outerWidth()), b.$tooltip.css("left", e), "undefined" == typeof d && (d = b.opts.toolbarBottom), b.$tooltip.css("top", d ? c.offset().top - b.$tooltip.height() : c.offset().top + c.outerHeight())
        }

        function e(e, f, g) {
            b.helpers.isMobile() || (e.on("mouseenter", f, function(b) {
                a(b.currentTarget).hasClass("fr-disabled") || d(a(b.currentTarget), g)
            }), e.on("mouseleave " + b._mousedown + " " + b._mouseup, f, function(a) {
                c()
            })), b.events.on("destroy", function() {
                e.off("mouseleave " + b._mousedown + " " + b._mouseup, f), e.off("mouseenter", f)
            }, !0)
        }

        function f() {
            b.helpers.isMobile() || (b.$tooltip = a('<div class="fr-tooltip"></div>'), b.opts.theme && b.$tooltip.addClass(b.opts.theme + "-theme"), a(b.original_document).find("body").append(b.$tooltip), b.events.on("destroy", function() {
                b.$tooltip.html("").removeData().remove()
            }, !0))
        }
        return {
            _init: f,
            hide: c,
            to: d,
            bind: e
        }
    }, a.FroalaEditor.ICON_DEFAULT_TEMPLATE = "font_awesome", a.FroalaEditor.ICON_TEMPLATES = {
        font_awesome: '<i class="fa fa-[NAME]"></i>',
        text: '<span style="text-align: center;">[NAME]</span>',
        image: "<img src=[SRC] alt=[ALT] />"
    }, a.FroalaEditor.ICONS = {
        bold: {
            NAME: "bold"
        },
        italic: {
            NAME: "italic"
        },
        underline: {
            NAME: "underline"
        },
        strikeThrough: {
            NAME: "strikethrough"
        },
        subscript: {
            NAME: "subscript"
        },
        superscript: {
            NAME: "superscript"
        },
        color: {
            NAME: "tint"
        },
        outdent: {
            NAME: "outdent"
        },
        indent: {
            NAME: "indent"
        },
        undo: {
            NAME: "rotate-left"
        },
        redo: {
            NAME: "rotate-right"
        },
        insertHR: {
            NAME: "minus"
        },
        clearFormatting: {
            NAME: "eraser"
        },
        selectAll: {
            NAME: "mouse-pointer"
        }
    }, a.FroalaEditor.DefineIconTemplate = function(b, c) {
        a.FroalaEditor.ICON_TEMPLATES[b] = c
    }, a.FroalaEditor.DefineIcon = function(b, c) {
        a.FroalaEditor.ICONS[b] = c
    }, a.FroalaEditor.MODULES.icon = function(b) {
        function c(b) {
            var c = null,
                d = a.FroalaEditor.ICONS[b];
            if ("undefined" != typeof d) {
                var e = d.template || a.FroalaEditor.ICON_DEFAULT_TEMPLATE;
                e && (e = a.FroalaEditor.ICON_TEMPLATES[e]) && (c = e.replace(/\[([a-zA-Z]*)\]/g, function(a, c) {
                    return "NAME" == c ? d[c] || b : d[c]
                }))
            }
            return c || b
        }
        return {
            create: c
        }
    }, a.FroalaEditor.MODULES.button = function(b) {
        function c(c) {
            var d = a(c.currentTarget),
                e = d.next(),
                f = d.hasClass("fr-active"),
                g = (b.helpers.isMobile(), a(".fr-dropdown.fr-active").not(d));
            if (b.helpers.isIOS() && 0 == b.$el.find(".fr-marker").length && (b.selection.save(), b.selection.clear(), b.selection.restore()), !f) {
                var h = d.data("cmd");
                e.find(".fr-command").removeClass("fr-active"), a.FroalaEditor.COMMANDS[h] && a.FroalaEditor.COMMANDS[h].refreshOnShow && a.FroalaEditor.COMMANDS[h].refreshOnShow.apply(b, [d, e]), e.css("left", d.offset().left - d.parent().offset().left - ("rtl" == b.opts.direction ? e.width() - d.outerWidth() : 0)), b.opts.toolbarBottom ? e.css("bottom", b.$tb.height() - d.position().top) : e.css("top", d.position().top + d.outerHeight())
            }
            d.addClass("fr-blink").toggleClass("fr-active"), setTimeout(function() {
                d.removeClass("fr-blink")
            }, 300), e.offset().left + e.outerWidth() > a(b.opts.scrollableContainer).offset().left + a(b.opts.scrollableContainer).outerWidth() && e.css("margin-left", -(e.offset().left + e.outerWidth() - a(b.opts.scrollableContainer).offset().left - a(b.opts.scrollableContainer).outerWidth())), g.removeClass("fr-active")
        }

        function d(c) {
            c.addClass("fr-blink"), setTimeout(function() {
                c.removeClass("fr-blink")
            }, 500);
            for (var d = c.data("cmd"), e = [];
                "undefined" != typeof c.data("param" + (e.length + 1));) e.push(c.data("param" + (e.length + 1)));
            var f = a(".fr-dropdown.fr-active");
            f.length && f.removeClass("fr-active"), b.commands.exec(d, e)
        }

        function e(b) {
            var c = a(b.currentTarget);
            d(c)
        }

        function f(d) {
            var f = a(d.currentTarget);
            0 != f.parents(".fr-popup").length || f.data("popup") || b.popups.hideAll(), f.hasClass("fr-dropdown") ? c(d) : (e(d), a.FroalaEditor.COMMANDS[f.data("cmd")] && 0 != a.FroalaEditor.COMMANDS[f.data("cmd")].refreshAfterCallback && o())
        }

        function g(a) {
            var b = a.find(".fr-dropdown.fr-active");
            b.length && b.removeClass("fr-active")
        }

        function h(a) {
            a.preventDefault(), a.stopPropagation()
        }

        function i(a) {
            return a.stopPropagation(), b.opts.toolbarInline ? !1 : void 0
        }

        function j(c, d) {
            b.events.bindClick(c, ".fr-command:not(.fr-disabled)", f), c.on(b._mousedown + " " + b._mouseup + " " + b._move, ".fr-dropdown-menu", h), c.on(b._mousedown + " " + b._mouseup + " " + b._move, ".fr-dropdown-menu .fr-dropdown-wrapper", i);
            var e = c.get(0).ownerDocument,
                j = "defaultView" in e ? e.defaultView : e.parentWindow,
                k = function(d) {
                    (!d || d.type == b._mouseup && d.target != a("html").get(0) || "keydown" == d.type && (b.keys.isCharacter(d.which) && !b.keys.ctrlKey(d) || d.which == a.FroalaEditor.KEYCODE.ESC)) && g(c)
                };
            a(j).on(b._mouseup + ".command" + b.id + " resize.command" + b.id + " keydown.command" + b.id, k), a.merge(q, c.find(".fr-btn").toArray()), b.tooltip.bind(c, ".fr-btn, .fr-title", d), b.events.on("destroy", function() {
                c.off(b._mousedown + " " + b._mouseup + " " + b._move, ".fr-dropdown-menu"), c.on(b._mousedown + " " + b._mouseup + " " + b._move, ".fr-dropdown-menu .fr-dropdown-wrapper"), a(j).off(b._mouseup + ".command" + b.id + " resize.command" + b.id + " keydown.command" + b.id)
            }, !0)
        }

        function k(a, c) {
            var d = "";
            if (c.html) d += "function" == typeof c.html ? c.html.call(b) : c.html;
            else {
                var e = c.options;
                "function" == typeof e && (e = e()), d += '<ul class="fr-dropdown-list">';
                for (var f in e) d += '<li><a class="fr-command" data-cmd="' + a + '" data-param1="' + f + '" title="' + e[f] + '">' + b.language.translate(e[f]) + "</a></li>";
                d += "</ul>"
            }
            return d
        }

        function l(a, c, d) {
            var e = c.displaySelection;
            "function" == typeof e && (e = e(b));
            var f;
            if (e) {
                var g = "function" == typeof c.defaultSelection ? c.defaultSelection(b) : c.defaultSelection;
                f = '<span style="width:' + (c.displaySelectionWidth || 100) + 'px">' + (g || b.language.translate(c.title)) + "</span>"
            } else f = b.icon.create(c.icon || a);
            var h = c.popup ? ' data-popup="true"' : "",
                i = '<button type="button" tabindex="-1" title="' + (b.language.translate(c.title) || "") + '" class="fr-command fr-btn' + ("dropdown" == c.type ? " fr-dropdown" : "") + (c.back ? " fr-back" : "") + (c.disabled ? " fr-disabled" : "") + (d ? "" : " fr-hidden") + '" data-cmd="' + a + '"' + h + ">" + f + "</button>";
            if ("dropdown" == c.type) {
                var j = '<div class="fr-dropdown-menu"><div class="fr-dropdown-wrapper"><div class="fr-dropdown-content" tabindex="-1">';
                j += k(a, c), j += "</div></div></div>", i += j
            }
            return i
        }

        function m(c, d) {
            for (var e = "", f = 0; f < c.length; f++) {
                var g = c[f],
                    h = a.FroalaEditor.COMMANDS[g];
                if (!(h && "undefined" != typeof h.plugin && b.opts.pluginsEnabled.indexOf(h.plugin) < 0))
                    if (h) {
                        var i = "undefined" != typeof d ? d.indexOf(g) >= 0 : !0;
                        e += l(g, h, i)
                    } else "|" == g ? e += '<div class="fr-separator fr-vs"></div>' : "-" == g && (e += '<div class="fr-separator fr-hs"></div>')
            }
            return e
        }

        function n(c) {
            var d, e = c.data("cmd");
            c.hasClass("fr-dropdown") ? d = c.next() : c.removeClass("fr-active"), a.FroalaEditor.COMMANDS[e] && a.FroalaEditor.COMMANDS[e].refresh ? a.FroalaEditor.COMMANDS[e].refresh.apply(b, [c, d]) : b.refresh[e] ? b.refresh[e](c, d) : b.refresh["default"](c, e)
        }

        function o() {
            return 0 == b.events.trigger("buttons.refresh") ? !0 : void setTimeout(function() {
                for (var c = b.selection.inEditor() && b.core.hasFocus(), d = 0; d < q.length; d++) {
                    var e = a(q[d]),
                        f = e.data("cmd");
                    0 == e.parents(".fr-popup").length ? c || a.FroalaEditor.COMMANDS[f] && a.FroalaEditor.COMMANDS[f].forcedRefresh ? n(e) : e.hasClass("fr-dropdown") || e.removeClass("fr-active") : e.parents(".fr-popup").is(":visible") && n(e)
                }
            }, 0)
        }

        function p() {
            b.events.on("mouseup", o), b.events.on("keyup", o), b.events.on("blur", o), b.events.on("focus", o), b.events.on("contentChanged", o)
        }
        var q = [];
        return {
            _init: p,
            buildList: m,
            bindCommands: j,
            refresh: n,
            bulkRefresh: o,
            exec: d
        }
    }, a.FroalaEditor.MODULES.position = function(b) {
        function c() {
            var c, d = b.selection.ranges(0);
            if (d && d.collapsed && b.selection.inEditor()) {
                var e = !1;
                0 == b.$el.find(".fr-marker").length && (b.selection.save(), e = !0);
                var f = b.$el.find(".fr-marker:first");
                f.css("display", "inline"), f.css("line-height", "");
                var g = f.offset(),
                    h = f.outerHeight();
                f.css("display", "none"), f.css("line-height", 0), c = {}, c.left = g.left, c.width = 0, c.height = h, c.top = g.top - a(b.original_window).scrollTop(), c.right = 1, c.bottom = 1, c.ok = !0, e && b.selection.restore()
            } else d && (c = d.getBoundingClientRect());
            return c
        }

        function d(c, d, e) {
            var f = c.outerHeight();
            if (!b.helpers.isMobile() && b.$tb && c.parent().get(0) != b.$tb.get(0)) {
                var g = (c.parent().height() - 20 - (b.opts.toolbarBottom ? b.$tb.outerHeight() : 0), c.parent().offset().top),
                    h = d - f - (e || 0);
                c.parent().get(0) == a(b.opts.scrollableContainer).get(0) && (g -= c.parent().position().top), g + d + f > a(b.original_document).outerHeight() && c.parent().offset().top + h > 0 ? (d = h, c.addClass("fr-above")) : c.removeClass("fr-above")
            }
            return d
        }

        function e(c, d) {
            var e = c.outerWidth();
            return c.parent().offset().left + d + e > a(b.opts.scrollableContainer).width() - 10 && (d = a(b.opts.scrollableContainer).width() - e - 10 - c.parent().offset().left + a(b.opts.scrollableContainer).offset().left), c.parent().offset().left + d < a(b.opts.scrollableContainer).offset().left && (d = 10 - c.parent().offset().left + a(b.opts.scrollableContainer).offset().left), d
        }

        function f(d) {
            var e = c();
            d.css("top", 0).css("left", 0);
            var f = e.top + e.height,
                h = e.left + e.width / 2 - d.outerWidth() / 2 + a(b.original_window).scrollLeft();
            b.opts.iframe || (f += a(b.original_window).scrollTop()), g(h, f, d, e.height)
        }

        function g(a, c, f, g) {
            var h = f.data("container");
            h && "BODY" != h.get(0).tagName && (a && (a -= h.offset().left), c && (c -= h.offset().top - h.scrollTop())), b.opts.iframe && h && b.$tb && h.get(0) != b.$tb.get(0) && (a && (a += b.$iframe.offset().left), c && (c += b.$iframe.offset().top));
            var i = e(f, a);
            if (a) {
                f.css("left", i);
                var j = f.find(".fr-arrow");
                j.data("margin-left") || j.data("margin-left", b.helpers.getPX(j.css("margin-left"))), j.css("margin-left", a - i + j.data("margin-left"))
            }
            c && f.css("top", d(f, c, g))
        }

        function h(c) {
            var d = a(c),
                e = d.parent(),
                f = d.is(".fr-sticky-on"),
                g = d.data("sticky-top"),
                h = d.data("sticky-scheduled");
            if ("undefined" == typeof g && (d.data("sticky-top", 0), d.after('<div class="fr-sticky-dummy" style="height: ' + d.outerHeight() + 'px;"></div>'), d.data("sticky-dummy", d.next())), b.core.hasFocus() || b.$tb.find("input:visible:focus").length > 0) {
                var i = a(window).scrollTop(),
                    j = Math.min(Math.max(i - e.offset().top, 0), e.outerHeight() - d.outerHeight());
                j != g && j != h && (clearTimeout(d.data("sticky-timeout")), d.data("sticky-scheduled", j), d.outerHeight() < i - e.offset().top && d.addClass("fr-opacity-0"), d.data("sticky-timeout", setTimeout(function() {
                    var c = a(window).scrollTop(),
                        f = Math.min(Math.max(c - e.offset().top, 0), e.outerHeight() - d.outerHeight());
                    f > 0 && "BODY" == e.get(0).tagName && (f += e.position().top), f != g && (d.css("top", Math.max(f, 0)), d.data("sticky-top", f), d.data("sticky-scheduled", f)), d.removeClass("fr-opacity-0"), b.$tb.hasClass("fr-inline") && b.toolbar.show()
                }, 100))), f || (d.css("top", ""), d.width(e.width()), d.addClass("fr-sticky-on"))
            } else clearTimeout(a(c).css("sticky-timeout")), d.css("top", ""), d.css("position", ""), d.width(""), d.data("sticky-top", 0), d.removeClass("fr-sticky-on"), b.$tb.hasClass("fr-inline") && b.toolbar.hide()
        }

        function i(c) {
            if (c.offsetWidth) {
                var d, e, f = a(c),
                    g = f.outerHeight(),
                    h = f.data("sticky-position"),
                    i = a("body" == b.opts.scrollableContainer ? b.original_window : b.opts.scrollableContainer).outerHeight(),
                    j = 0,
                    k = 0;
                "body" !== b.opts.scrollableContainer && (j = a(b.opts.scrollableContainer).offset().top, k = a(b.original_window).outerHeight() - j - i);
                var l = "body" == b.opts.scrollableContainer ? a(b.original_window).scrollTop() : j,
                    m = f.is(".fr-sticky-on");
                f.data("sticky-parent") || f.data("sticky-parent", f.parent());
                var n = f.data("sticky-parent"),
                    o = n.offset().top,
                    p = n.outerHeight();
                if (f.data("sticky-offset") || (f.data("sticky-offset", !0), f.after('<div class="fr-sticky-dummy" style="height: ' + g + 'px;"></div>')), !h) {
                    var q = "auto" !== f.css("top") || "auto" !== f.css("bottom");
                    q || f.css("position", "fixed"), h = {
                        top: "auto" !== f.css("top"),
                        bottom: "auto" !== f.css("bottom")
                    }, q || f.css("position", ""), f.data("sticky-position", h), f.data("top", f.css("top")), f.data("bottom", f.css("bottom"))
                }
                var r = function() {
                        return l + d > o && o + p - g >= l + d
                    },
                    s = function() {
                        return l + i - e > o + g && o + p > l + i - e
                    };
                d = b.helpers.getPX(f.data("top")), e = b.helpers.getPX(f.data("bottom"));
                var t = h.top && r(),
                    u = h.bottom && s();
                t || u ? (f.css("width", n.width() + "px"), m || (f.addClass("fr-sticky-on"), f.removeClass("fr-sticky-off"), f.css("top") && ("auto" != f.data("top") ? f.css("top", b.helpers.getPX(f.data("top")) + j) : f.data("top", "auto")), f.css("bottom") && ("auto" != f.data("bottom") ? f.css("bottom", b.helpers.getPX(f.data("bottom")) + k) : f.css("bottom", "auto")))) : f.hasClass("fr-sticky-off") || (f.width(""), f.removeClass("fr-sticky-on"), f.addClass("fr-sticky-off"), f.css("top") && "auto" != f.css("top") && f.css("top", 0), f.css("bottom") && f.css("bottom", 0))
            }
        }

        function j() {
            var a = document.createElement("test"),
                c = a.style;
            return c.cssText = "position:" + ["-webkit-", "-moz-", "-ms-", "-o-", ""].join("sticky; position:") + " sticky;", -1 !== c.position.indexOf("sticky") && !b.helpers.isIOS() && !b.helpers.isAndroid()
        }

        function k() {
            if (!j())
                if (b._stickyElements = [], b.helpers.isIOS()) {
                    var c = function() {
                        b.helpers.requestAnimationFrame()(c);
                        for (var a = 0; a < b._stickyElements.length; a++) h(b._stickyElements[a])
                    };
                    c(), a(b.original_window).on("scroll.sticky" + b.id, function() {
                        if (b.core.hasFocus())
                            for (var c = 0; c < b._stickyElements.length; c++) {
                                var d = a(b._stickyElements[c]),
                                    e = d.parent(),
                                    f = a(window).scrollTop();
                                d.outerHeight() < f - e.offset().top && (d.addClass("fr-opacity-0"), d.data("sticky-top", -1), d.data("sticky-scheduled", -1))
                            }
                    })
                } else a("body" == b.opts.scrollableContainer ? b.original_window : b.opts.scrollableContainer).on("scroll.sticky" + b.id, l), a(b.original_window).on("resize.sticky" + b.id, l), b.events.on("initialized", l), b.events.on("focus", l), a(b.original_window).on("resize", "textarea", l)
        }

        function l() {
            for (var a = 0; a < b._stickyElements.length; a++) i(b._stickyElements[a])
        }

        function m(a) {
            a.addClass("fr-sticky"), b.helpers.isIOS() && a.addClass("fr-sticky-ios"), j() || b._stickyElements.push(a.get(0))
        }

        function n() {
            a(b.original_window).off("scroll.sticky" + b.id), a(b.original_window).off("resize.sticky" + b.id)
        }

        function o() {
            k(), b.events.on("destroy", n, !0)
        }
        return {
            _init: o,
            forSelection: f,
            addSticky: m,
            refresh: l,
            at: g,
            getBoundingRect: c
        }
    }, a.extend(a.FroalaEditor.DEFAULTS, {
        toolbarInline: !1,
        toolbarVisibleWithoutSelection: !0,
        toolbarSticky: !0,
        toolbarButtons: ["fullscreen", "bold", "italic", "underline", "strikeThrough", "subscript", "superscript", "fontFamily", "fontSize", "|", "color", "emoticons", "inlineStyle", "paragraphStyle", "|", "paragraphFormat", "align", "formatOL", "formatUL", "outdent", "indent", "quote", "insertHR", "-", "insertLink", "insertImage", "insertVideo", "insertFile", "insertTable", "undo", "redo", "clearFormatting", "selectAll", "html"],
        toolbarButtonsXS: ["bold", "italic", "fontFamily", "fontSize", "|", "undo", "redo"],
        toolbarButtonsSM: ["bold", "italic", "underline", "|", "fontFamily", "fontSize", "insertLink", "insertImage", "table", "|", "undo", "redo"],
        toolbarButtonsMD: ["fullscreen", "bold", "italic", "underline", "fontFamily", "fontSize", "color", "paragraphStyle", "paragraphFormat", "align", "formatOL", "formatUL", "outdent", "indent", "quote", "insertHR", "-", "insertLink", "insertImage", "insertVideo", "insertFile", "insertTable", "undo", "redo", "clearFormatting"],
        toolbarStickyOffset: 0
    }), a.FroalaEditor.MODULES.toolbar = function(b) {
        function c(a, b) {
            for (var c = 0; c < b.length; c++) "-" != b[c] && "|" != b[c] && a.indexOf(b[c]) < 0 && a.push(b[c])
        }

        function d() {
            var d = a.merge([], e());
            c(d, b.opts.toolbarButtonsXS || []), c(d, b.opts.toolbarButtonsSM || []), c(d, b.opts.toolbarButtonsMD || []), c(d, b.opts.toolbarButtons);
            for (var f = d.length - 1; f >= 0; f--) "-" != d[f] && "|" != d[f] && d.indexOf(d[f]) < f && d.splice(f, 1);
            var g = b.button.buildList(d, e());
            b.$tb.append(g), b.button.bindCommands(b.$tb)
        }

        function e() {
            var a = b.helpers.screenSize();
            return t[a]
        }

        function f() {
            var a = e();
            b.$tb.find(".fr-separator").remove(), b.$tb.find("> .fr-command").addClass("fr-hidden");
            for (var c = 0; c < a.length; c++)
                if ("|" == a[c] || "-" == a[c]) b.$tb.append(b.button.buildList([a[c]]));
                else {
                    var d = b.$tb.find('> .fr-command[data-cmd="' + a[c] + '"]'),
                        f = null;
                    d.next().hasClass("fr-dropdown-menu") && (f = d.next()), d.removeClass("fr-hidden").appendTo(b.$tb), f && f.appendTo(b.$tb)
                }
        }

        function g() {
            a(b.original_window).on("resize.buttons." + b.id, f), a(b.original_window).on("orientationchange.buttons." + b.id, f)
        }

        function h(c, d) {
            b.helpers.isMobile() ? b.toolbar.show() : setTimeout(function() {
                if (c && c.which == a.FroalaEditor.KEYCODE.ESC);
                else if (b.selection.inEditor() && b.core.hasFocus() && !b.popups.areVisible() && (b.opts.toolbarVisibleWithoutSelection && c && "keyup" != c.type || !b.selection.isCollapsed() && !b.keys.isIME() || d)) {
                    if (0 == b.events.trigger("toolbar.show")) return !1;
                    b.helpers.isMobile() || b.position.forSelection(b.$tb), b.$tb.show()
                }
            }, 0)
        }

        function i() {
            return 0 == b.events.trigger("toolbar.hide") ? !1 : void b.$tb.hide()
        }

        function j() {
            return 0 == b.events.trigger("toolbar.show") ? !1 : void b.$tb.show()
        }

        function k() {
            b.events.on("window.mousedown", i), b.events.on("keydown", i), b.events.on("blur", i), b.events.on("window.mouseup", h), b.events.on("window.keyup", h), b.events.on("keydown", function(b) {
                b && b.which == a.FroalaEditor.KEYCODE.ESC && i()
            }), b.$wp.on("scroll.toolbar", h), b.events.on("commands.after", h)
        }

        function l() {
            b.events.on("focus", h, !0), b.events.on("blur", i, !0)
        }

        function m() {
            b.opts.toolbarInline ? (b.$box.addClass("fr-inline"), b.helpers.isMobile() ? (b.helpers.isIOS() ? (a("body").append(b.$tb), b.position.addSticky(b.$tb)) : (b.$tb.addClass("fr-bottom"), b.$box.append(b.$tb), b.position.addSticky(b.$tb), b.opts.toolbarBottom = !0), b.$tb.addClass("fr-inline"), l(), b.opts.toolbarInline = !1) : (a(b.opts.scrollableContainer).append(b.$tb), b.$tb.data("container", a(b.opts.scrollableContainer)), b.$tb.addClass("fr-inline"), b.$tb.prepend('<span class="fr-arrow"></span>'), k(), b.opts.toolbarBottom = !1)) : (b.opts.toolbarBottom && !b.helpers.isIOS() ? (b.$box.append(b.$tb), b.$tb.addClass("fr-bottom"), b.$box.addClass("fr-bottom")) : (b.opts.toolbarBottom = !1, b.$box.prepend(b.$tb), b.$tb.addClass("fr-top"), b.$box.addClass("fr-top")), b.$box.addClass("fr-basic"), b.$tb.addClass("fr-basic"), b.opts.toolbarSticky && (b.opts.toolbarStickyOffset && (b.opts.toolbarBottom ? b.$tb.css("bottom", b.opts.toolbarStickyOffset) : b.$tb.css("top", b.opts.toolbarStickyOffset)), b.position.addSticky(b.$tb)))
        }

        function n() {
            a(b.original_window).off("resize.buttons." + b.id), a(b.original_window).off("orientationchange.buttons." + b.id), b.$box.removeClass("fr-top fr-bottom fr-inline fr-basic"), b.$box.find(".fr-sticky-dummy").remove(), b.$tb.off(b._mousedown + " " + b._mouseup), b.$tb.html("").removeData().remove()
        }

        function o() {
            return b.$wp ? (b.$tb = a('<div class="fr-toolbar"></div>'), b.opts.theme && b.$tb.addClass(b.opts.theme + "-theme"), b.opts.zIndex > 1 && b.$tb.css("z-index", b.opts.zIndex + 1), "auto" != b.opts.direction && b.$tb.removeClass("fr-ltr fr-rtl").addClass("fr-" + b.opts.direction), b.helpers.isMobile() ? b.$tb.addClass("fr-mobile") : b.$tb.addClass("fr-desktop"), m(), r = b.$tb.get(0).ownerDocument, s = "defaultView" in r ? r.defaultView : r.parentWindow, d(), g(), b.$tb.on(b._mousedown + " " + b._mouseup, function(a) {
                var b = a.originalEvent ? a.originalEvent.target || a.originalEvent.originalTarget : null;
                return b && "INPUT" != b.tagName ? (a.stopPropagation(), a.preventDefault(), !1) : void 0
            }), void b.events.on("destroy", n, !0)) : !1
        }

        function p() {
            !u && b.$tb && (b.$tb.find("> .fr-command").addClass("fr-disabled fr-no-refresh"), u = !0)
        }

        function q() {
            u && b.$tb && (b.$tb.find("> .fr-command").removeClass("fr-disabled fr-no-refresh"), u = !1), b.button.bulkRefresh()
        }
        var r, s, t = [];
        t[a.FroalaEditor.XS] = b.opts.toolbarButtonsXS || b.opts.toolbarButtons, t[a.FroalaEditor.SM] = b.opts.toolbarButtonsSM || b.opts.toolbarButtons, t[a.FroalaEditor.MD] = b.opts.toolbarButtonsMD || b.opts.toolbarButtons, t[a.FroalaEditor.LG] = b.opts.toolbarButtons;
        var u = !1;
        return {
            _init: o,
            hide: i,
            show: j,
            showInline: h,
            disable: p,
            enable: q
        }
    }, a.FroalaEditor.SHORTCUTS_MAP = {
        69: {
            cmd: "show"
        },
        66: {
            cmd: "bold"
        },
        73: {
            cmd: "italic"
        },
        85: {
            cmd: "underline"
        },
        83: {
            cmd: "strikeThrough"
        },
        221: {
            cmd: "indent"
        },
        219: {
            cmd: "outdent"
        },
        90: {
            cmd: "undo"
        },
        "-90": {
            cmd: "redo"
        }
    }, a.extend(a.FroalaEditor.DEFAULTS, {
        shortcutsEnabled: ["show", "bold", "italic", "underline", "strikeThrough", "indent", "outdent", "undo", "redo"]
    }), a.FroalaEditor.RegisterShortcut = function(b, c, d, e) {
        a.FroalaEditor.SHORTCUTS_MAP[b * (e ? -1 : 1)] = {
            cmd: c,
            val: d
        }, a.FroalaEditor.DEFAULTS.shortcutsEnabled.push(c)
    }, a.FroalaEditor.MODULES.shortcuts = function(b) {
        function c(c) {
            var d = c.which;
            if (b.keys.ctrlKey(c) && (c.shiftKey && a.FroalaEditor.SHORTCUTS_MAP[-d] || !c.shiftKey && a.FroalaEditor.SHORTCUTS_MAP[d])) {
                var e = a.FroalaEditor.SHORTCUTS_MAP[d * (c.shiftKey ? -1 : 1)].cmd;
                if (e && b.opts.shortcutsEnabled.indexOf(e) >= 0) {
                    var f, g = a.FroalaEditor.SHORTCUTS_MAP[d * (c.shiftKey ? -1 : 1)].val;
                    if (e && !g ? f = b.$tb.find('.fr-command[data-cmd="' + e + '"]') : e && g && (f = b.$tb.find('.fr-command[data-cmd="' + e + '"][data-param0="' + g + '"]')), f.length) return c.preventDefault(), c.stopPropagation(), "keydown" == c.type && b.button.exec(f), !1;
                    if (e && b.commands[e]) return c.preventDefault(), c.stopPropagation(), "keydown" == c.type && b.commands[e](), !1
                }
            }
        }

        function d() {
            b.events.on("keydown", c, !0), b.events.on("keyup", c, !0)
        }
        return {
            _init: d
        }
    }, a.FroalaEditor.MODULES.snapshot = function(a) {
        function b(a) {
            for (var b = a.parentNode.childNodes, c = 0, d = null, e = 0; e < b.length; e++) {
                if (d) {
                    var f = b[e].nodeType === Node.TEXT_NODE && "" === b[e].textContent,
                        g = d.nodeType === Node.TEXT_NODE && b[e].nodeType === Node.TEXT_NODE;
                    f || g || c++
                }
                if (b[e] == a) return c;
                d = b[e]
            }
        }

        function c(c) {
            var d = [];
            if (!c.parentNode) return [];
            for (; !a.node.isElement(c);) d.push(b(c)), c = c.parentNode;
            return d.reverse()
        }

        function d(a, b) {
            for (; a && a.nodeType === Node.TEXT_NODE;) {
                var c = a.previousSibling;
                c && c.nodeType == Node.TEXT_NODE && (b += c.textContent.length), a = c
            }
            return b
        }

        function e(a) {
            return {
                scLoc: c(a.startContainer),
                scOffset: d(a.startContainer, a.startOffset),
                ecLoc: c(a.endContainer),
                ecOffset: d(a.endContainer, a.endOffset)
            }
        }

        function f() {
            var b = {};
            if (a.events.trigger("snapshot.before"), b.html = a.$el.html(), b.ranges = [], a.selection.inEditor() && a.core.hasFocus())
                for (var c = a.selection.ranges(), d = 0; d < c.length; d++) b.ranges.push(e(c[d]));
            return a.events.trigger("snapshot.after"), b
        }

        function g(b) {
            for (var c = a.$el.get(0), d = 0; d < b.length; d++) c = c.childNodes[b[d]];
            return c
        }

        function h(b, c) {
            try {
                var d = g(c.scLoc),
                    e = c.scOffset,
                    f = g(c.ecLoc),
                    h = c.ecOffset,
                    i = a.document.createRange();
                i.setStart(d, e), i.setEnd(f, h), b.addRange(i)
            } catch (j) {}
        }

        function i(b) {
            a.$el.html() != b.html && a.$el.html(b.html);
            var c = a.selection.get();
            a.selection.clear(), a.events.focus(!0);
            for (var d = 0; d < b.ranges.length; d++) h(c, b.ranges[d])
        }

        function j(a, b) {
            return a.html != b.html ? !1 : JSON.stringify(a.ranges) != JSON.stringify(b.ranges) ? !1 : !0
        }
        return {
            get: f,
            restore: i,
            equal: j
        }
    }, a.FroalaEditor.MODULES.undo = function(a) {
        function b(b) {
            var c = b.which,
                d = a.keys.ctrlKey(b);
            d && (90 == c && b.shiftKey && b.preventDefault(), 90 == c && b.preventDefault())
        }

        function c() {
            return 0 === a.undo_stack.length || a.undo_index <= 1 ? !1 : !0
        }

        function d() {
            return a.undo_index == a.undo_stack.length ? !1 : !0
        }

        function e(b) {
            if (!a.undo_stack || a.undoing) return !1;
            for (; a.undo_stack.length > a.undo_index;) a.undo_stack.pop();
            "undefined" == typeof b ? (b = a.snapshot.get(), a.undo_stack[a.undo_index - 1] && a.snapshot.equal(a.undo_stack[a.undo_index - 1], b) || (a.undo_stack.push(b), a.undo_index++, b.html != j && (a.events.trigger("contentChanged"), j = b.html))) : a.undo_index > 0 ? a.undo_stack[a.undo_index - 1] = b : (a.undo_stack.push(b), a.undo_index++)
        }

        function f() {
            if (a.undo_index > 1) {
                a.undoing = !0;
                var b = a.undo_stack[--a.undo_index - 1];
                clearTimeout(a._content_changed_timer), a.snapshot.restore(b), a.popups.hideAll(), a.toolbar.enable(), a.events.trigger("contentChanged"), a.events.trigger("commands.undo"), a.undoing = !1
            }
        }

        function g() {
            if (a.undo_index < a.undo_stack.length) {
                a.undoing = !0;
                var b = a.undo_stack[a.undo_index++];
                clearTimeout(a._content_changed_timer), a.snapshot.restore(b), a.popups.hideAll(), a.toolbar.enable(), a.events.trigger("contentChanged"), a.events.trigger("commands.redo"), a.undoing = !1
            }
        }

        function h() {
            a.undo_index = 0, a.undo_stack = []
        }

        function i() {
            h(), a.events.on("initialized", function() {
                j = a.html.get(!1, !0)
            }), a.events.on("keydown", b)
        }
        var j = null;
        return {
            _init: i,
            run: f,
            redo: g,
            canDo: c,
            canRedo: d,
            reset: h,
            saveStep: e
        }
    }, a.FroalaEditor.POPUP_TEMPLATES = {
        "text.edit": "[_EDIT_]"
    }, a.FroalaEditor.RegisterTemplate = function(b, c) {
        a.FroalaEditor.POPUP_TEMPLATES[b] = c
    }, a.FroalaEditor.MODULES.popups = function(b) {
        function c(a, b) {
            t[a].data("container", b), b.append(t[a])
        }

        function d(d, e, h, i) {
            if (g() && b.$el.find(".fr-marker").length > 0 && (b.events.disableBlur(), b.selection.restore()), m([d]), !t[d]) return !1;
            var j = t[d].outerWidth(),
                k = (t[d].outerHeight(), f(d));
            t[d].addClass("fr-active").find("input, textarea").removeAttr("disabled");
            var l = t[d].data("container");
            b.opts.toolbarInline && l && b.$tb && l.get(0) == b.$tb.get(0) && (c(d, b.opts.toolbarInline ? a(b.opts.scrollableContainer) : b.$box), h && (h = b.$tb.offset().top - b.helpers.getPX(b.$tb.css("margin-top"))), e && (e = b.$tb.offset().left + b.$tb.width() / 2), b.$tb.hasClass("fr-above") && (h += b.$tb.outerHeight()), i = 0), l = t[d].data("container"), !b.opts.iframe || i || k || (e && (e -= b.$iframe.offset().left), h && (h -= b.$iframe.offset().top)), e && (e -= j / 2), b.opts.toolbarBottom && l && b.$tb && l.get(0) == b.$tb.get(0) && (t[d].addClass("fr-above"), h -= t[d].outerHeight()), b.position.at(e, h, t[d], i || 0);
            var n = t[d].find("input:visible, textarea:visible").get(0);
            n && (0 == b.$el.find(".fr-marker").length && b.core.hasFocus() && b.selection.save(), b.events.disableBlur(), a(n).select().focus()), b.opts.toolbarInline && !b.helpers.isMobile() && b.toolbar.hide(), b.events.trigger("popups.show." + d)
        }

        function e(a, c) {
            b.events.on("popups.show." + a, c)
        }

        function f(a) {
            return t[a] && t[a].hasClass("fr-active") || !1
        }

        function g() {
            for (var a in t)
                if (f(a)) return !0;
            return !1
        }

        function h(a) {
            t[a] && t[a].hasClass("fr-active") && (t[a].removeClass("fr-active fr-above"), b.events.trigger("popups.hide." + a), b.events.disableBlur(), t[a].find("input, textarea, button").filter(":focus").blur(), t[a].find("input, textarea").attr("disabled", "disabled"))
        }

        function i(a, c) {
            b.events.on("popups.hide." + a, c)
        }

        function j(a) {
            return t[a]
        }

        function k(a, c) {
            b.events.on("popups.refresh." + a, c)
        }

        function l(c) {
            b.events.trigger("popups.refresh." + c);
            for (var d = t[c].find(".fr-command"), e = 0; e < d.length; e++) {
                var f = a(d[e]);
                0 == f.parents(".fr-dropdown-menu").length && b.button.refresh(f)
            }
        }

        function m(a) {
            "undefined" == typeof a && (a = []);
            for (var b in t) a.indexOf(b) < 0 && h(b)
        }

        function n() {
            u = !0
        }

        function o() {
            u = !1
        }

        function p(c, d) {
            var e = a.FroalaEditor.POPUP_TEMPLATES[c];
            "function" == typeof e && (e = e.apply(b));
            for (var f in d) e = e.replace("[_" + f.toUpperCase() + "_]", d[f]);
            return e
        }

        function q(c, d) {
            var e = p(c, d),
                g = a('<div class="fr-popup' + (b.helpers.isMobile() ? " fr-mobile" : " fr-desktop") + (b.opts.toolbarInline ? " fr-inline" : "") + '"><span class="fr-arrow"></span>' + e + "</div>");
            b.opts.theme && g.addClass(b.opts.theme + "-theme"), b.opts.zIndex > 1 && b.$tb.css("z-index", b.opts.zIndex + 2), "auto" != b.opts.direction && g.removeClass("fr-ltr fr-rtl").addClass("fr-" + b.opts.direction), g.find("input, textarea").attr("dir", b.opts.direction).attr("disabled", "disabled");
            var i = a("body");
            return i.append(g), g.data("container", i), t[c] = g, b.button.bindCommands(g, !1), a(b.original_window).on("resize.popups" + b.id, function() {
                b.helpers.isMobile() || (b.events.disableBlur(), h(c), b.events.enableBlur())
            }), g.on(b._mousedown + " " + b._mouseup, function(a) {
                var b = a.originalEvent ? a.originalEvent.target || a.originalEvent.originalTarget : null;
                return b && "INPUT" != b.tagName ? (a.preventDefault(), a.stopPropagation(), !1) : void a.stopPropagation()
            }), g.on("focus", "input, textarea, button, select", function(c) {
                if (c.preventDefault(), c.stopPropagation(), setTimeout(function() {
                        b.events.enableBlur()
                    }, 0), b.helpers.isMobile()) {
                    var d = a(b.original_window).scrollTop();
                    setTimeout(function() {
                        a(b.original_window).scrollTop(d)
                    }, 0)
                }
            }), g.on("keydown", "input, textarea, button, select", function(d) {
                var e = d.which;
                if (a.FroalaEditor.KEYCODE.TAB == e) {
                    d.preventDefault();
                    var i = g.find("input, textarea, button, select").filter(":visible").not(":disabled").toArray();
                    i.sort(function(b, c) {
                        return d.shiftKey ? a(b).attr("tabIndex") < a(c).attr("tabIndex") : a(b).attr("tabIndex") > a(c).attr("tabIndex")
                    }), b.events.disableBlur();
                    var j = i.indexOf(this) + 1;
                    j == i.length && (j = 0), a(i[j]).focus()
                }
                if (a.FroalaEditor.KEYCODE.ENTER == e) g.find(".fr-submit:visible").length > 0 && (d.preventDefault(), d.stopPropagation(), b.events.disableBlur(), b.button.exec(g.find(".fr-submit:visible:first")));
                else {
                    if (a.FroalaEditor.KEYCODE.ESC == e) return d.preventDefault(), d.stopPropagation(), b.$el.find(".fr-marker") && (b.events.disableBlur(), a(this).data("skip", !0), b.selection.restore(), b.events.enableBlur()), f(c) && g.find(".fr-back:visible").length ? b.button.exec(g.find(".fr-back:visible:first")) : h(c), b.opts.toolbarInline && b.toolbar.showInline(null, !0), !1;
                    d.stopPropagation()
                }
            }), b.events.on("window.keydown", function(d) {
                var e = d.which;
                if (a.FroalaEditor.KEYCODE.ESC == e) {
                    if (f(c) && b.opts.toolbarInline) return d.stopPropagation(), f(c) && g.find(".fr-back:visible").length ? b.button.exec(g.find(".fr-back:visible:first")) : (h(c), b.toolbar.showInline(null, !0)), !1;
                    f(c) && g.find(".fr-back:visible").length ? b.button.exec(g.find(".fr-back:visible:first")) : h(c)
                }
            }), b.$wp && (b.events.on("keydown", function(d) {
                b.keys.ctrlKey(d) || d.which == a.FroalaEditor.KEYCODE.ESC || (f(c) && g.find(".fr-back:visible").length ? b.button.exec(g.find(".fr-back:visible:first")) : h(c))
            }), g.on("blur", "input, textarea, button, select", function(c) {
                document.activeElement != this && a(this).is(":visible") && (b.events.blurActive() && b.events.trigger("blur"), b.events.enableBlur())
            })), g.on("mousedown touchstart touch", "*", function(a) {
                ["INPUT", "TEXTAREA", "BUTTON", "SELECT", "LABEL"].indexOf(a.currentTarget.tagName) >= 0 && a.stopPropagation(), b.events.disableBlur()
            }), b.events.on("mouseup", function(a) {
                g.is(":visible") && u && g.find("input:focus, textarea:focus, button:focus, select:focus").filter(":visible").length > 0 && b.events.disableBlur()
            }, !0), b.events.on("window.mouseup", function(a) {
                g.is(":visible") && u && (a.stopPropagation(), b.markers.remove(), h(c))
            }, !0), b.events.on("blur", function(a) {
                m()
            }), g.on("keydown keyup change input", "input, textarea", function(b) {
                var c = a(this).next();
                0 == c.length && a(this).after("<span>" + a(this).attr("placeholder") + "</span>"), a(this).toggleClass("fr-not-empty", "" != a(this).val())
            }), b.$wp && !b.helpers.isMobile() && b.$wp.on("scroll.popup" + c, function(d) {
                if (f(c) && g.parent().get(0) == a(b.opts.scrollableContainer).get(0)) {
                    var e = g.offset().top - b.$wp.offset().top,
                        h = (b.$wp.scrollTop(), b.$wp.outerHeight());
                    e > h || 0 > e ? g.addClass("fr-hidden") : g.removeClass("fr-hidden")
                }
            }), b.helpers.isIOS() && g.on("touchend", "label", function() {
                a("#" + a(this).attr("for")).prop("checked", function(a, b) {
                    return !b
                })
            }), g
        }

        function r() {
            for (var c in t) {
                var d = t[c];
                d.off("mousedown mouseup touchstart touchend"), d.off("focus", "input, textarea, button, select"), d.off("keydown", "input, textarea, button, select"), d.off("blur", "input, textarea, button, select"), d.off("keydown keyup change", "input, textarea"), d.off(b._mousedown, "*"), d.html("").removeData().remove(), a(b.original_window).off("resize.popups" + b.id), b.$wp && b.$wp.off("scroll.popup" + c)
            }
        }

        function s() {
            b.events.on("destroy", r, !0), b.events.on("window.mousedown", n), b.events.on("window.touchmove", o), b.events.on("mousedown", function(a) {
                g() && b.$el.find(".fr-marker").remove()
            }), b.events.on("window.mouseup", function() {
                u = !1
            })
        }
        var t = {},
            u = !1;
        return {
            _init: s,
            create: q,
            get: j,
            show: d,
            hide: h,
            onHide: i,
            hideAll: m,
            setContainer: c,
            refresh: l,
            onRefresh: k,
            onShow: e,
            isVisible: f,
            areVisible: g
        }
    }, a.FroalaEditor.MODULES.refresh = function(b) {
        function c(a, c) {
            try {
                b.document.queryCommandState(c) === !0 && a.addClass("fr-active")
            } catch (d) {}
        }

        function d(a) {
            a.toggleClass("fr-disabled", !b.undo.canDo())
        }

        function e(a) {
            a.toggleClass("fr-disabled", !b.undo.canRedo())
        }

        function f(a) {
            if (a.hasClass("fr-no-refresh")) return !1;
            for (var c = b.selection.blocks(), d = 0; d < c.length; d++) {
                if ("LI" != c[d].tagName || c[d].previousSibling) return a.removeClass("fr-disabled"), !0;
                a.addClass("fr-disabled")
            }
        }

        function g(c) {
            if (c.hasClass("fr-no-refresh")) return !1;
            for (var d = b.selection.blocks(), e = 0; e < d.length; e++) {
                var f = "rtl" == b.opts.direction || "rtl" == a(d[e]).css("direction") ? "margin-right" : "margin-left";
                if ("LI" == d[e].tagName || "LI" == d[e].parentNode.tagName) return c.removeClass("fr-disabled"), !0;
                if (b.helpers.getPX(a(d[e]).css(f)) > 0) return c.removeClass("fr-disabled"), !0
            }
            c.addClass("fr-disabled")
        }
        return {
            "default": c,
            undo: d,
            redo: e,
            outdent: g,
            indent: f
        }
    }, a.extend(a.FroalaEditor.DEFAULTS, {
        editInPopup: !1
    }), a.FroalaEditor.MODULES.textEdit = function(b) {
        function c() {
            var a = '<div id="fr-text-edit-' + b.id + '" class="fr-layer fr-text-edit-layer"><div class="fr-input-line"><input type="text" placeholder="' + b.language.translate("Text") + '" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="updateText" tabIndex="2">' + b.language.translate("Update") + "</button></div></div>",
                c = {
                    edit: a
                };
            b.popups.create("text.edit", c)
        }

        function d() {
            var c, d = b.popups.get("text.edit");
            c = "INPUT" === b.$el.prop("tagName") ? b.$el.attr("placeholder") : b.$el.text(), d.find("input").val(c).trigger("change"), b.popups.setContainer("text.edit", a("body")), b.popups.show("text.edit", b.$el.offset().left + b.$el.outerWidth() / 2, b.$el.offset().top + b.$el.outerHeight(), b.$el.outerHeight())
        }

        function e() {
            b.$el.on(b._mouseup, function(a) {
                setTimeout(function() {
                    d()
                }, 10)
            })
        }

        function f() {
            var a = b.popups.get("text.edit"),
                c = a.find("input").val();
            "INPUT" === b.$el.prop("tagName") ? b.$el.attr("placeholder", c) : b.$el.text(c), b.events.trigger("contentChanged"), b.popups.hide("text.edit")
        }

        function g() {
            b.opts.editInPopup && (c(), e())
        }
        return {
            _init: g,
            update: f
        }
    }, a.FroalaEditor.RegisterCommand("updateText", {
        focus: !1,
        undo: !1,
        callback: function() {
            this.textEdit.update()
        }
    })
});