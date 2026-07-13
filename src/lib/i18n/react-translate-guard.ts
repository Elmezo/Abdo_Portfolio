/**
 * Chrome / Google Translate mutates text nodes (wraps them in <font> etc.).
 * React then crashes when it tries to remove/insert those nodes.
 * This guard makes those DOM operations no-ops when the tree was rewritten.
 */
export function installReactTranslateGuard(): () => void {
  if (typeof Node === 'undefined' || !Node.prototype) {
    return () => undefined;
  }

  const marker = '__portfolioTranslateGuardInstalled';
  const proto = Node.prototype as NodePrototype & {
    [marker]?: boolean;
  };

  if (proto[marker]) {
    return () => undefined;
  }

  const originalRemoveChild = proto.removeChild;
  const originalInsertBefore = proto.insertBefore;

  proto.removeChild = function removeChildPatched<T extends Node>(child: T): T {
    if (child.parentNode !== this) {
      return child;
    }
    return originalRemoveChild.call(this, child) as T;
  };

  proto.insertBefore = function insertBeforePatched<T extends Node>(
    newNode: T,
    referenceNode: Node | null
  ): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      return newNode;
    }
    return originalInsertBefore.call(this, newNode, referenceNode) as T;
  };

  proto[marker] = true;

  return () => {
    proto.removeChild = originalRemoveChild;
    proto.insertBefore = originalInsertBefore;
    delete proto[marker];
  };
}

type NodePrototype = typeof Node.prototype;
