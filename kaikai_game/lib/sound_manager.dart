import 'dart:async';
import 'dart:js' as js;
import 'package:flutter/services.dart';

class SoundManager {
  static void _tone(double freq, double dur) {
    js.context.callMethod('eval', ['''
      (function() {
        try {
          var ctx = new (window.AudioContext || window.webkitAudioContext)();
          var osc = ctx.createOscillator();
          var gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = $freq;
          osc.type = 'sine';
          gain.gain.setValueAtTime(0.25, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + $dur);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + $dur);
        } catch(e) {}
      })()
    ''']);
  }

  static void tap() {
    _tone(880, 0.08);
    HapticFeedback.lightImpact();
  }

  static void miss() {
    _tone(180, 0.35);
    HapticFeedback.heavyImpact();
  }

  static void skill() {
    _tone(660, 0.18);
    HapticFeedback.mediumImpact();
  }

  static void stageClear() {
    _tone(523, 0.12);
    Future.delayed(const Duration(milliseconds: 130), () => _tone(659, 0.12));
    Future.delayed(const Duration(milliseconds: 260), () => _tone(784, 0.25));
  }

  static void gameOver() {
    _tone(300, 0.2);
    Future.delayed(const Duration(milliseconds: 220), () => _tone(220, 0.2));
    Future.delayed(const Duration(milliseconds: 440), () => _tone(150, 0.4));
  }
}
