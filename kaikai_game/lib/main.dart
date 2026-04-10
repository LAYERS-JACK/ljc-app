import 'dart:math';
import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';
import 'sound_manager.dart';
void main() => runApp(const KaikaiApp());
class KaikaiApp extends StatelessWidget {
  const KaikaiApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'とおくのひと',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(scaffoldBackgroundColor: const Color(0xFF080810)),
      home: const TitleScreen(),
    );
  }
}
class StageDef {
  final String name;
  final int waves;
  final List<String> types;
  final String story;
  final int maxSimultaneous;
  final double timerMultiplier;
  const StageDef({required this.name, required this.waves, required this.types, required this.story, this.maxSimultaneous=1, this.timerMultiplier=1.0});
}
const List<StageDef> stages = [
  StageDef(name:'夜の家', waves:15, types:['normal','red'], story:'押し入れの奥から、ずっと誰かの気配がしていた。', maxSimultaneous:1, timerMultiplier:1.0),
  StageDef(name:'廊下の鏡', waves:25, types:['normal','red','fast'], story:'鏡の中で、自分が笑っていた。\n笑った覚えは、ない。', maxSimultaneous:2, timerMultiplier:0.9),
  StageDef(name:'とおくのひと', waves:35, types:['normal','red','fast','tough'], story:'遠くに人がいる。\n近づいても、近づいても、遠い。', maxSimultaneous:3, timerMultiplier:0.85),
  StageDef(name:'言伝', waves:50, types:['normal','red','fast','tough'], story:'この文章を読んでいる　あなた　に\n伝えたいことが、ある。', maxSimultaneous:4, timerMultiplier:0.8),
];
class EnemyType {
  final String emoji;
  final int durationMs;
  final int damage;
  final int points;
  final int hp;
  final Color color;
  const EnemyType({required this.emoji, required this.durationMs, required this.damage, required this.points, required this.hp, required this.color});
}
const Map<String, EnemyType> enemyTypes = {
  'normal': EnemyType(emoji:'👁',  durationMs:3400, damage:12, points:10, hp:1, color:Color(0xFF9B59B6)),
  'red':    EnemyType(emoji:'🩸', durationMs:2200, damage:28, points:20, hp:1, color:Color(0xFFE74C3C)),
  'fast':   EnemyType(emoji:'💧', durationMs:1400, damage:18, points:30, hp:1, color:Color(0xFF2980B9)),
  'tough':  EnemyType(emoji:'🤲', durationMs:4500, damage:15, points:25, hp:3, color:Color(0xFFD4AC0D)),
};
class SkillDef {
  final String emoji;
  final String label;
  final int cooldownSec;
  const SkillDef({required this.emoji, required this.label, required this.cooldownSec});
}
const List<SkillDef> skillDefs = [
  SkillDef(emoji:'⛩', label:'結界', cooldownSec:18),
  SkillDef(emoji:'💧', label:'霊水', cooldownSec:22),
  SkillDef(emoji:'📿', label:'封印', cooldownSec:30),
];
class Enemy {
  final String id;
  final String typeKey;
  final Offset position;
  DateTime spawnTime;
  int currentHp;
  final int durationMs;
  Enemy({required this.id, required this.typeKey, required this.position, required this.spawnTime, required this.currentHp, required this.durationMs});
  EnemyType get type => enemyTypes[typeKey]!;
}
class PopText {
  final String id;
  final String text;
  final Color color;
  final Offset position;
  PopText({required this.id, required this.text, required this.color, required this.position});
}
class TitleScreen extends StatelessWidget {
  const TitleScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          const Text('とおくのひと', style: TextStyle(fontSize: 11, color: Color(0x99C8A8FF), letterSpacing: 4)),
          const SizedBox(height: 16),
          const Text('怪異タップ', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w500, color: Color(0xFFC8A8FF))),
          const SizedBox(height: 40),
          _menuBtn(context, 'ストーリーモード', () => Navigator.push(context, MaterialPageRoute(builder: (_) => const GameScreen(endless: false)))),
          const SizedBox(height: 12),
          _menuBtn(context, 'エンドレスモード', () => Navigator.push(context, MaterialPageRoute(builder: (_) => const GameScreen(endless: true)))),
          const SizedBox(height: 40),
          const Text('⛩ 結界　💧 霊水　📿 封印', style: TextStyle(fontSize: 11, color: Colors.white24)),
        ]),
      ),
    );
  }
  Widget _menuBtn(BuildContext context, String label, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 220,
        padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 14),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: const Color(0xFF9B59B6).withOpacity(0.6)),
          color: const Color(0xFF9B59B6).withOpacity(0.12),
        ),
        child: Center(child: Text(label, style: const TextStyle(color: Color(0xFFC8A8FF), fontSize: 15))),
      ),
    );
  }
}
class GameScreen extends StatefulWidget {
  final bool endless;
  const GameScreen({super.key, required this.endless});
  @override
  State<GameScreen> createState() => _GameScreenState();
}
class _GameScreenState extends State<GameScreen> {
  final Random _rng = Random();
  final List<Enemy> _enemies = [];
  final List<PopText> _pops = [];
  int _score = 0;
  int _hp = 100;
  int _combo = 0;
  bool _playing = false;
  bool _frozen = false;
  int _spawnIntervalMs = 1700;
  int _stageIdx = 0;
  int _waveCount = 0;
  bool _stageClear = false;
  bool _showStory = false;
  String _storyText = '';
  int _endlessWave = 0;
  bool _canContinue = true;
  final List<int> _skillCDs = [0, 0, 0];
  final List<Timer?> _skillTimers = [null, null, null];
  Timer? _spawnTimer;
  Timer? _tickTimer;
  bool get _isEndless => widget.endless;
  StageDef get _currentStage => stages[_stageIdx];
  int get _maxSimultaneous {
    if (_isEndless) {
      if (_endlessWave >= 51) return 5;
      if (_endlessWave >= 31) return 4;
      if (_endlessWave >= 16) return 3;
      if (_endlessWave >= 6)  return 2;
      return 1;
    }
    return _currentStage.maxSimultaneous;
  }
  double get _timerMult {
    if (_isEndless) {
      if (_endlessWave >= 51) return 0.5;
      if (_endlessWave >= 31) return 0.7;
      if (_endlessWave >= 16) return 0.85;
      return 1.0;
    }
    return _currentStage.timerMultiplier;
  }
  List<String> get _availableTypes {
    if (_isEndless) {
      if (_endlessWave >= 31) return ['normal','red','fast','tough'];
      if (_endlessWave >= 16) return ['normal','red','fast'];
      if (_endlessWave >= 6)  return ['normal','red'];
      return ['normal'];
    }
    return _currentStage.types;
  }
  String _pickType() {
    final avail = _availableTypes;
    final r = _rng.nextDouble();
    if (avail.length == 1) return avail[0];
    if (avail.length == 2) return r < 0.70 ? avail[0] : avail[1];
    if (avail.length == 3) { if (r < 0.50) return avail[0]; if (r < 0.75) return avail[1]; return avail[2]; }
    if (r < 0.48) return avail[0]; if (r < 0.70) return avail[1]; if (r < 0.86) return avail[2]; return avail[3];
  }
  void _scheduleSpawn() {
    final interval = (_spawnIntervalMs + _rng.nextInt(400) - 200).clamp(400, 2500);
    _spawnTimer = Timer(Duration(milliseconds: interval), () {
      if (!_playing || _stageClear) return;
      final count = _maxSimultaneous;
      for (int i = 0; i < count; i++) {
        Future.delayed(Duration(milliseconds: i * 200), _spawnEnemy);
      }
      if (_isEndless) {
        _endlessWave++;
        _spawnIntervalMs = max(400, _spawnIntervalMs - 10);
      } else {
        _spawnIntervalMs = max(800, _spawnIntervalMs - 15);
      }
      _scheduleSpawn();
    });
  }
  void _spawnEnemy() {
    if (!mounted || !_playing) return;
    final size = MediaQuery.of(context).size;
    const margin = 70.0;
    final x = margin + _rng.nextDouble() * (size.width - margin * 2);
    final y = 80.0 + margin + _rng.nextDouble() * (size.height * 0.65 - margin * 2);
    final key = _pickType();
    final baseDur = enemyTypes[key]!.durationMs;
    final dur = (baseDur * _timerMult).round();
    setState(() {
      _enemies.add(Enemy(id: DateTime.now().microsecondsSinceEpoch.toString(), typeKey: key, position: Offset(x, y), spawnTime: DateTime.now(), currentHp: enemyTypes[key]!.hp, durationMs: dur));
    });
  }
  void _checkExpired() {
    if (_stageClear) return;
    final now = DateTime.now();
    final expired = _enemies.where((e) => now.difference(e.spawnTime).inMilliseconds >= e.durationMs).toList();
    for (final e in expired) {
      _enemies.remove(e);
      _hp = (_hp - e.type.damage).clamp(0, 100);
      _combo = 0;
      _addPop('-${e.type.damage}霊力', Colors.redAccent, e.position);
      SoundManager.miss();
      if (_hp <= 0) _endGame(win: false);
    }
  }
  void _tapEnemy(Enemy enemy) {
    if (_stageClear) return;
    setState(() {
      enemy.currentHp--;
      if (enemy.currentHp <= 0) {
        _enemies.remove(enemy);
        _combo++;
        final mult = _combo >= 20 ? 5 : _combo >= 10 ? 3 : _combo >= 5 ? 2 : 1;
        final pts = enemy.type.points * mult;
        _score += pts;
        SoundManager.tap();
        _addPop('+$pts', mult > 1 ? Colors.amber : const Color(0xFFC8A8FF), enemy.position);
        if (!_isEndless) {
          _waveCount++;
          if (_waveCount >= _currentStage.waves) _onStageClear();
        }
      }
    });
  }
  void _onStageClear() {
    _stageClear = true;
    _spawnTimer?.cancel();
    SoundManager.stageClear();
    Future.delayed(const Duration(milliseconds: 400), () {
      if (!mounted) return;
      if (_stageIdx >= stages.length - 1) { _endGame(win: true); return; }
      _stageIdx++;
      _waveCount = 0;
      _spawnIntervalMs = max(900, _spawnIntervalMs - 100);
      _showStoryBanner(stages[_stageIdx].story);
    });
  }
  void _showStoryBanner(String text) {
    setState(() { _storyText = text; _showStory = true; _stageClear = false; _enemies.clear(); });
    Future.delayed(const Duration(milliseconds: 3200), () {
      if (!mounted) return;
      setState(() => _showStory = false);
      _scheduleSpawn();
    });
  }
  void _useSkill(int i) {
    if (!_playing || _skillCDs[i] > 0 || _stageClear) return;
    if (i == 0) {
      setState(() { for (final e in [..._enemies]) { _score += 5; _addPop('+5', const Color(0xFFC8A8FF), e.position); } _enemies.clear(); });
    } else if (i == 1) {
      setState(() { _hp = (_hp + 25).clamp(0, 100); final size = MediaQuery.of(context).size; _addPop('+25霊力', const Color(0xFF1ADB7A), Offset(size.width / 2, size.height * 0.4)); });
    } else if (i == 2) {
      setState(() => _frozen = true);
      for (final e in _enemies) { e.spawnTime = e.spawnTime.add(const Duration(seconds: 5)); }
      Future.delayed(const Duration(seconds: 5), () { if (mounted) setState(() => _frozen = false); });
    }
    SoundManager.skill();
    setState(() => _skillCDs[i] = skillDefs[i].cooldownSec);
    _skillTimers[i]?.cancel();
    _skillTimers[i] = Timer.periodic(const Duration(seconds: 1), (t) {
      if (!mounted) { t.cancel(); return; }
      setState(() { _skillCDs[i]--; if (_skillCDs[i] <= 0) { _skillCDs[i] = 0; t.cancel(); } });
    });
  }
  void _addPop(String text, Color color, Offset pos) {
    final pop = PopText(id: DateTime.now().microsecondsSinceEpoch.toString(), text: text, color: color, position: pos);
    setState(() => _pops.add(pop));
    Future.delayed(const Duration(milliseconds: 700), () { if (mounted) setState(() => _pops.remove(pop)); });
  }
  void _startGame() {
    setState(() {
      _enemies.clear(); _pops.clear();
      _score = 0; _hp = 100; _combo = 0;
      _playing = true; _frozen = false;
      _stageClear = false; _showStory = false;
      _stageIdx = 0; _waveCount = 0;
      _endlessWave = 0; _canContinue = true;
      _spawnIntervalMs = _isEndless ? 1500 : 1700;
      for (int i = 0; i < 3; i++) { _skillCDs[i] = 0; _skillTimers[i]?.cancel(); }
    });
    _spawnTimer?.cancel();
    _tickTimer?.cancel();
    if (_isEndless) {
      _scheduleSpawn();
    } else {
      _showStoryBanner(stages[0].story);
    }
    _tickTimer = Timer.periodic(const Duration(milliseconds: 100), (_) {
      if (!mounted || !_playing) return;
      setState(() => _checkExpired());
    });
  }
  void _endGame({required bool win}) {
    setState(() { _playing = false; _stageClear = false; });
    _spawnTimer?.cancel();
    _tickTimer?.cancel();
    _enemies.clear();
    if (!win) SoundManager.gameOver();
  }
  void _doContinue() {
    setState(() { _hp = 50; _playing = true; _canContinue = false; _enemies.clear(); });
    _scheduleSpawn();
    _tickTimer = Timer.periodic(const Duration(milliseconds: 100), (_) {
      if (!mounted || !_playing) return;
      setState(() => _checkExpired());
    });
  }
  @override
  void dispose() {
    _spawnTimer?.cancel();
    _tickTimer?.cancel();
    for (final t in _skillTimers) { t?.cancel(); }
    super.dispose();
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(children: [
        ..._enemies.map((e) => _buildEnemy(e)),
        ..._pops.map((p) => Positioned(
          left: p.position.dx - 30, top: p.position.dy - 40,
          child: IgnorePointer(child: Text(p.text, style: TextStyle(color: p.color, fontSize: 13, fontWeight: FontWeight.w500))),
        )),
        if (_frozen) Positioned.fill(child: IgnorePointer(child: Container(color: const Color(0xFF9B59B6).withOpacity(0.06)))),
        Positioned(top: 0, left: 0, right: 0, child: _buildHud()),
        Positioned(bottom: 0, left: 0, right: 0, child: _buildSkillBar()),
        if (_combo >= 5) Positioned(
          bottom: 72, right: 16,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(borderRadius: BorderRadius.circular(8), color: Colors.amber.withOpacity(0.08), border: Border.all(color: Colors.amber.withOpacity(0.25), width: 0.5)),
            child: Text('$_combo連鎖 ×${_combo>=20?5:_combo>=10?3:2}', style: const TextStyle(color: Color(0xFFFFD700), fontSize: 12)),
          ),
        ),
        if (_showStory) _buildStoryBanner(),
        if (!_playing) _buildOverlay(),
      ]),
    );
  }
  Widget _buildStoryBanner() {
    return Positioned.fill(
      child: IgnorePointer(
        child: Container(
          color: Colors.black.withOpacity(0.82),
          child: Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 32),
              child: Column(mainAxisSize: MainAxisSize.min, children: [
                Text(_currentStage.name, style: const TextStyle(fontSize: 10, color: Color(0x66C8A8FF), letterSpacing: 4)),
                const SizedBox(height: 16),
                Text(_storyText, textAlign: TextAlign.center, style: const TextStyle(fontSize: 15, color: Color(0xCCC8A8FF), height: 2.0, fontWeight: FontWeight.w300)),
              ]),
            ),
          ),
        ),
      ),
    );
  }
  Widget _buildHud() {
    return Container(
      color: Colors.black87,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: SafeArea(bottom: false, child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(_isEndless ? 'エンドレス' : _currentStage.name, style: const TextStyle(fontSize: 9, color: Colors.white38, letterSpacing: 1.5)),
            const SizedBox(height: 3),
            _isEndless
              ? Text('Wave $_endlessWave', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: Color(0xFFC8A8FF)))
              : Wrap(spacing: 3, runSpacing: 3, children: List.generate(min(_currentStage.waves, 20), (i) => Container(
                  width: 5, height: 5, margin: const EdgeInsets.only(right: 3),
                  decoration: BoxDecoration(borderRadius: BorderRadius.circular(2),
                    color: i < _waveCount ? const Color(0xFF9B59B6) : i == _waveCount ? Colors.white54 : Colors.white12),
                ))),
          ]),
          Column(children: [
            const Text('SCORE', style: TextStyle(fontSize: 9, color: Colors.white38, letterSpacing: 1.5)),
            Text('$_score', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w500, color: Color(0xFFC8A8FF))),
          ]),
          Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
            const Text('霊力', style: TextStyle(fontSize: 9, color: Colors.white38, letterSpacing: 1.5)),
            const SizedBox(height: 4),
            SizedBox(width: 80, height: 5,
              child: ClipRRect(borderRadius: BorderRadius.circular(3),
                child: LinearProgressIndicator(value: _hp / 100, backgroundColor: Colors.white12,
                  valueColor: AlwaysStoppedAnimation(_hp > 60 ? const Color(0xFF9B59B6) : _hp > 30 ? Colors.orange : Colors.red)),
              ),
            ),
            Text('$_hp', style: const TextStyle(fontSize: 11, color: Colors.white38)),
          ]),
        ],
      )),
    );
  }
  Widget _buildSkillBar() {
    return Container(
      color: Colors.black87,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
      child: SafeArea(top: false, child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: List.generate(3, (i) {
          final cd = _skillCDs[i];
          final ready = cd <= 0 && _playing && !_stageClear;
          return GestureDetector(
            onTap: () => _useSkill(i),
            child: Opacity(
              opacity: ready ? 1.0 : 0.4,
              child: Container(
                width: 56, height: 56,
                decoration: BoxDecoration(borderRadius: BorderRadius.circular(12), color: Colors.white.withOpacity(0.04),
                  border: Border.all(color: Colors.white.withOpacity(ready ? 0.15 : 0.07), width: 0.5)),
                child: Stack(alignment: Alignment.center, children: [
                  Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                    Text(skillDefs[i].emoji, style: const TextStyle(fontSize: 22)),
                    Text(skillDefs[i].label, style: const TextStyle(fontSize: 9, color: Colors.white38)),
                  ]),
                  if (cd > 0) Container(
                    decoration: BoxDecoration(borderRadius: BorderRadius.circular(12), color: Colors.black54),
                    child: Center(child: Text('$cd', style: const TextStyle(fontSize: 14, color: Colors.white60))),
                  ),
                ]),
              ),
            ),
          );
        }),
      )),
    );
  }
  Widget _buildEnemy(Enemy enemy) {
    final elapsed = DateTime.now().difference(enemy.spawnTime).inMilliseconds;
    final progress = (1.0 - elapsed / enemy.durationMs).clamp(0.0, 1.0);
    return Positioned(
      left: enemy.position.dx - 32, top: enemy.position.dy - 32,
      child: GestureDetector(
        onTap: () => _tapEnemy(enemy),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          Container(
            width: 64, height: 64,
            decoration: BoxDecoration(shape: BoxShape.circle, color: enemy.type.color.withOpacity(0.12),
              border: Border.all(color: enemy.type.color.withOpacity(0.5), width: 0.5)),
            child: Center(child: Text(enemy.type.emoji, style: const TextStyle(fontSize: 28))),
          ),
          const SizedBox(height: 3),
          SizedBox(width: 48, height: 3,
            child: ClipRRect(borderRadius: BorderRadius.circular(2),
              child: LinearProgressIndicator(value: progress, backgroundColor: Colors.white12,
                valueColor: AlwaysStoppedAnimation(enemy.type.color)),
            ),
          ),
          if (enemy.type.hp > 1) Padding(
            padding: const EdgeInsets.only(top: 3),
            child: Row(mainAxisSize: MainAxisSize.min,
              children: List.generate(enemy.type.hp, (i) => Container(
                width: 6, height: 6, margin: const EdgeInsets.symmetric(horizontal: 1),
                decoration: BoxDecoration(borderRadius: BorderRadius.circular(1),
                  color: i < enemy.currentHp ? enemy.type.color.withOpacity(0.7) : Colors.white12),
              )),
            ),
          ),
        ]),
      ),
    );
  }
  Widget _buildOverlay() {
    final win = !_isEndless && _score > 0 && _stageIdx >= stages.length - 1;
    return Container(
      color: Colors.black87,
      child: Center(child: Column(mainAxisSize: MainAxisSize.min, children: [
        Text(_isEndless ? 'エンドレス' : 'とおくのひと', style: const TextStyle(fontSize: 11, color: Color(0x99C8A8FF), letterSpacing: 4)),
        const SizedBox(height: 12),
        Text(_score == 0 ? (_isEndless ? 'エンドレスモード' : 'ストーリーモード') : win ? '祓い完了' : '祓い失敗',
          style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w500, color: Color(0xFFC8A8FF))),
        if (_score > 0) ...[
          const SizedBox(height: 8),
          if (_isEndless) Text('Wave $_endlessWave', style: const TextStyle(fontSize: 14, color: Colors.white38)),
          Text('$_score', style: const TextStyle(fontSize: 36, fontWeight: FontWeight.w500, color: Color(0xFFC8A8FF))),
          const Text('スコア', style: TextStyle(fontSize: 11, color: Colors.white38)),
          if (win) const Padding(
            padding: EdgeInsets.symmetric(horizontal: 40, vertical: 8),
            child: Text('全ての怪異を祓った。\nしかし、遠くにはまだ——', textAlign: TextAlign.center,
              style: TextStyle(fontSize: 12, color: Colors.white24, height: 1.8)),
          ),
          if (_isEndless && _canContinue) ...[
            const SizedBox(height: 16),
            GestureDetector(
              onTap: _doContinue,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 12),
                decoration: BoxDecoration(borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: Colors.amber.withOpacity(0.6)),
                  color: Colors.amber.withOpacity(0.10)),
                child: const Text('コンティニュー（霊力50回復）', style: TextStyle(color: Color(0xFFFFD700), fontSize: 13)),
              ),
            ),
            const SizedBox(height: 8),
            const Text('※ 広告視聴で復活（1回限り）', style: TextStyle(fontSize: 10, color: Colors.white24)),
          ],
        ],
        const SizedBox(height: 16),
        GestureDetector(
          onTap: _startGame,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 12),
            decoration: BoxDecoration(borderRadius: BorderRadius.circular(8),
              border: Border.all(color: const Color(0xFF9B59B6).withOpacity(0.6)),
              color: const Color(0xFF9B59B6).withOpacity(0.12)),
            child: Text(_score == 0 ? '祓いを始める' : 'もう一度', style: const TextStyle(color: Color(0xFFC8A8FF), fontSize: 15)),
          ),
        ),
        const SizedBox(height: 12),
        GestureDetector(
          onTap: () => Navigator.pop(context),
          child: const Text('タイトルに戻る', style: TextStyle(fontSize: 12, color: Colors.white38)),
        ),
      ])),
    );
  }
}

