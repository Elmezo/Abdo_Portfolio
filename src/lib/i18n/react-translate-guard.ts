/**
 * Chrome Translate mutates React text nodes and triggers:
 * NotFoundError: Failed to execute 'removeChild' on 'Node'
 *
 * Browser auto-translate is disabled on <html>. Arabic is served via the
 * in-app locale toggle / auto-detect instead.
 */

const GUARD_MARKER = '__portfolioTranslateGuardInstalled';

type GuardedNodePrototype = typeof Node.prototype & {
  [GUARD_MARKER]?: boolean;
};

function safeCall<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

/** Last-resort DOM patches if anything still mutates the tree. */
export function installReactTranslateGuard(): () => void {
  if (typeof Node === 'undefined' || !Node.prototype) {
    return () => undefined;
  }

  const proto = Node.prototype as GuardedNodePrototype;
  if (proto[GUARD_MARKER]) {
    return () => undefined;
  }

  const originalRemoveChild = proto.removeChild;
  const originalInsertBefore = proto.insertBefore;
  const originalReplaceChild = proto.replaceChild;

  proto.removeChild = function removeChildPatched<T extends Node>(child: T): T {
    if (child.parentNode !== this) {
      return child;
    }
    return safeCall(() => originalRemoveChild.call(this, child) as T, child);
  };

  proto.insertBefore = function insertBeforePatched<T extends Node>(
    newNode: T,
    referenceNode: Node | null
  ): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      return newNode;
    }
    return safeCall(
      () => originalInsertBefore.call(this, newNode, referenceNode) as T,
      newNode
    );
  };

  proto.replaceChild = function replaceChildPatched<T extends Node>(
    newChild: Node,
    oldChild: T
  ): T {
    if (oldChild.parentNode !== this) {
      return oldChild;
    }
    return safeCall(
      () => originalReplaceChild.call(this, newChild, oldChild) as T,
      oldChild
    );
  };

  proto[GUARD_MARKER] = true;
  return () => undefined;
}

if (typeof window !== 'undefined') {
  installReactTranslateGuard();
}

/**
 * Blocking boot script: patch DOM + stamp preferred locale before React runs.
 * Also forces translate=no so Chrome does not rewrite the tree.
 */
export const TRANSLATE_GUARD_INLINE_SCRIPT = `"use strict";
(function () {
  try {
    var root = document.documentElement;
    root.setAttribute("translate", "no");
    root.classList.add("notranslate");
  } catch (e) {}

  if (typeof Node !== "undefined" && Node.prototype) {
    var marker = ${JSON.stringify(GUARD_MARKER)};
    if (!Node.prototype[marker]) {
      var removeChild = Node.prototype.removeChild;
      var insertBefore = Node.prototype.insertBefore;
      var replaceChild = Node.prototype.replaceChild;

      Node.prototype.removeChild = function (child) {
        if (child && child.parentNode !== this) return child;
        try { return removeChild.call(this, child); } catch (e) { return child; }
      };
      Node.prototype.insertBefore = function (newNode, referenceNode) {
        if (referenceNode && referenceNode.parentNode !== this) return newNode;
        try { return insertBefore.call(this, newNode, referenceNode); } catch (e) { return newNode; }
      };
      Node.prototype.replaceChild = function (newChild, oldChild) {
        if (oldChild && oldChild.parentNode !== this) return oldChild;
        try { return replaceChild.call(this, newChild, oldChild); } catch (e) { return oldChild; }
      };
      Node.prototype[marker] = true;
    }
  }

  try {
    var key = "portfolio-locale";
    var stored = null;
    try { stored = localStorage.getItem(key); } catch (e) {}
    var locale = stored === "ar" || stored === "en" ? stored : null;
    if (!locale) {
      var langs = [];
      try {
        langs = (navigator.languages || [navigator.language] || []).map(function (l) {
          return String(l || "").toLowerCase();
        });
      } catch (e) {}
      locale = langs.some(function (l) { return l === "ar" || l.indexOf("ar-") === 0; }) ? "ar" : "en";
    }
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.dataset.locale = locale;
  } catch (e) {}
})();`;
