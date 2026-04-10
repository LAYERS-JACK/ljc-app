import 'package:flutter/services.dart';

class SoundManager {
  static void tap() {
    SystemSound.play(SystemSoundType.click);
    HapticFeedback.lightImpact();
  }
  static void miss() {
    HapticFeedback.heavyImpact();
  }
  static void skill() {
    SystemSound.play(SystemSoundType.click);
    HapticFeedback.mediumImpact();
  }
  static void stageClear() {
    SystemSound.play(SystemSoundType.click);
  }
  static void gameOver() {
    HapticFeedback.heavyImpact();
  }
}
