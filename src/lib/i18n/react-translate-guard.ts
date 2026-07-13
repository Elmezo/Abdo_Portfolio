/**
 * Chrome / Google Translate mutates text nodes (wraps them in <font> etc.).
 * React then crashes on removeChild/insertBefore during the next update.
 *
 * This must also run from an inline beforeInteractive script — useEffect is too late.
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

/** Patch Node DOM methods so Translate-mutated trees do not crash React. */
export function installReactTranslateGuard(): () => void {
  if (typeof Node === 'undefined' || !Node.prototype) {
    return () => undefined;
  }

  const proto = Node.prototype as GuardedNodePrototype;
  if (proto[GUARD_MARKER]) {
    // Never uninstall — restoring natives re-opens the crash window.
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

// Install as soon as this module is evaluated in the browser (before React effects).
if (typeof window !== 'undefined') {
  installReactTranslateGuard();
}

/**
 * Inline script source for a blocking <script> in layout.
 * Kept as a string so it runs while HTML is parsing — before React hydrates.
 */
export const TRANSLATE_GUARD_INLINE_SCRIPT = `"use strict";
(function () {
  if (typeof Node === "undefined" || !Node.prototype) return;
  var marker = ${JSON.stringify(GUARD_MARKER)};
  if (Node.prototype[marker]) return;

  var removeChild = Node.prototype.removeChild;
  var insertBefore = Node.prototype.insertBefore;
  var replaceChild = Node.prototype.replaceChild;

  Node.prototype.removeChild = function (child) {
    if (child && child.parentNode !== this) return child;
    try {
      return removeChild.call(this, child);
    } catch (e) {
      return child;
    }
  };

  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) return newNode;
    try {
      return insertBefore.call(this, newNode, referenceNode);
    } catch (e) {
      return newNode;
    }
  };

  Node.prototype.replaceChild = function (newChild, oldChild) {
    if (oldChild && oldChild.parentNode !== this) return oldChild;
    try {
      return replaceChild.call(this, newChild, oldChild);
    } catch (e) {
      return oldChild;
    }
  };

  Node.prototype[marker] = true;

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
