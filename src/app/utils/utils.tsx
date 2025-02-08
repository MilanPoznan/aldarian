// import { useEffect, useRef, useState } from "react";
'use client';
// Utility functions
export const wrap = (n, max) => (n + max) % max;
export const lerp = (a, b, t) => a + (b - a) * t;

// Vec2 Class
class Vec2 {
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  lerp(v, t) {
    this.x = lerp(this.x, v.x, t);
    this.y = lerp(this.y, v.y, t);
  }
}

export const vec2 = (x = 0, y = 0) => new Vec2(x, y);

// Raf Manager
class RafManager {
  rafId: number | null;
  callbacks: Array<{ callback: () => void }>;

  constructor() {
    this.rafId = null;
    this.callbacks = [];
    this.raf = this.raf.bind(this);

    // Only start if we're in the browser
    if (typeof window !== "undefined") {
      this.start();
    }
  }

  start() {
    if (typeof window !== "undefined") {
      this.raf();
    }
  }

  stop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
  }

  raf() {
    this.callbacks.forEach(({ callback }) => callback());
    this.rafId = requestAnimationFrame(this.raf);
  }

  add(callback: () => void) {
    this.callbacks.push({ callback });
  }

  remove(callback: () => void) {
    this.callbacks = this.callbacks.filter((cb) => cb.callback !== callback);
  }
}


export const rafManager = new RafManager();
