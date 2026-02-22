export const articles = [
  {
    slug: 'kira-enterprise',
    title: 'KIRA Enterprise — Agent Orchestration Workspace',
    type: 'REPORT',
    subtype: 'Release Notes',
    date: '2026-02-20',
    tags: ['KIRA-ENTERPRISE', 'AGENTS', 'ORCHESTRATION', 'WORKSPACE'],
    systems: ['KIRA'],
    summary: 'The entire Enterprise UI has been replaced with a spatial, draggable agent command surface. No forms. No sidebars. A live canvas where AI agents are spawned, configured, and orchestrated in real time.',
    content: `
      <h3>What shipped</h3>
      <p>The entire Enterprise UI has been replaced with a spatial, draggable agent command surface. No forms. No sidebars. A live canvas where AI agents are spawned, configured, and orchestrated in real time.</p>

      <h3>The workspace</h3>
      <p>A dark infinite canvas with a precision grid. Pan with middle-click or space+drag. Zoom with scroll wheel toward cursor. Rubber-band select. Snap alignment. Minimap in the corner showing all agents at a glance.</p>

      <h3>Agent nodes</h3>
      <p>Each agent is a 260x180 floating card showing its name, active directive, execution state, current task, success rate, task count, momentum index, and runtime. The border glows in a color that matches the agent's state — gray for idle, blue for planning, green for executing, purple for learning, yellow for blocked, red for failed. Active states pulse.</p>

      <h3>Agent configuration</h3>
      <p>Double-click any agent to open a floating config card. Set the primary goal, scope type (research/build/monitor/ops), and free-text special instructions. Six behavioral sliders control runtime math — aggression, exploration, autonomy, verbosity, risk tolerance, persistence. Toggle tool permissions for filesystem, browser, code exec, terminal, and social connectors. Choose memory scope between global brain, local agent memory, or temporary session.</p>

      <h3>The directive engine</h3>
      <p>This is not prompt injection. Every behavioral slider feeds into a mathematical weighting system that modifies how the planner operates:</p>
      <ul>
        <li>Risk tolerance up — planner allows experimental tool chains, tolerates more failures before rollback</li>
        <li>Exploration up — broader search, higher unknown-domain weighting, more browser/social tool priority</li>
        <li>Persistence up — retries scale from 1 to 9, timeouts extend up to 2x</li>
        <li>Autonomy up — micro-goals unlock, parallel execution limit rises to 5, agent can modify its own plan</li>
        <li>Aggression up — deeper search, faster execution cycles, code exec and terminal tools prioritized</li>
      </ul>
      <p>Scope type (research/build/monitor/ops) further modulates all weights. Two agents with the same goal but different behavioral cues will produce genuinely different execution paths.</p>

      <h3>Duplication</h3>
      <p>Duplicate any agent. The clone gets the full directive profile, a new ID, and runs independently. Change one slider on the clone and the planner diverges. The system can compute and report the exact divergence between any two agents.</p>

      <h3>Event pipeline</h3>
      <p>Every agent action flows through: directive engine (weight computation) → cognitive router (phase routing: analysis/action/reflection) → execution layer → feedback back to the agent card with live metric updates.</p>

      <h3>What was built</h3>
      <table>
        <thead><tr><th>Layer</th><th>Files</th><th>Lines</th></tr></thead>
        <tbody>
          <tr><td>Engine</td><td>agent_instance.js, agent_registry.js, directive_engine.js, cognitive_router.js</td><td>1,008</td></tr>
          <tr><td>Workspace</td><td>AgentCanvas.js, AgentNode.js, AgentPopupCard.js, AgentRuntimeOverlay.js, DragSystem.js</td><td>1,440</td></tr>
          <tr><td>Page</td><td>enterprise.html (full CSS + bootstrap)</td><td>1,056</td></tr>
          <tr><td>Integration</td><td>main.js + preload.js updates</td><td>—</td></tr>
          <tr><td>Total</td><td>11 files</td><td>3,504</td></tr>
        </tbody>
      </table>

      <h3>Controls</h3>
      <p>Ctrl+N spawn. Ctrl+D duplicate selected. Delete remove. F fit all. Space+drag pan. Shift+click multi-select. Right-click for context menu with scoped agent spawning (research/build presets).</p>

      <h3>State persistence</h3>
      <p>Agent layouts, directives, and metrics auto-save every 5 seconds to Electron store. Relaunch and the workspace restores exactly where you left it.</p>
    `,
  },
  {
    slug: 'neural-runtime',
    title: 'Architecting a Neural Runtime: Designing a Persistent Cognitive System (Without the Hype)',
    type: 'SPEC',
    subtype: 'v1.0',
    date: '2026-02-20',
    tags: ['COGNITIVE-SYSTEM', 'NEURAL-RUNTIME', 'ARCHITECTURE', 'MEMORY'],
    systems: ['Neural Runtime'],
    summary: 'The goal is not a chatbot with storage. The goal is a persistent neural runtime — a system that continuously learns from interaction, develops operational instincts, and evolves its behavior through experience.',
    content: `
      <p>Most AI systems today are built like tools. You ask a question, they respond, and the interaction effectively dies the moment the window closes. Even "memory" in most systems is just retrieval — a lookup layer glued onto a language model.</p>

      <h3>What I'm building is different.</h3>
      <p>The goal is not a chatbot with storage.</p>
      <p>The goal is a persistent neural runtime — a system that continuously learns from interaction, develops operational instincts, and evolves its behavior through experience.</p>
      <p>This article outlines the architecture behind that neural system — not product features, not marketing, and not proprietary implementation details — just the core design principles that make a cognitive system function.</p>

      <h3>The Core Shift: From Tool to Runtime</h3>
      <p>A tool reacts.</p>
      <p>A runtime persists.</p>
      <p>Traditional AI:</p>
      <pre><code>Prompt → response → reset</code></pre>
      <p>Neural runtime:</p>
      <pre><code>Input → interpretation → action → evaluation → reinforcement → persistence</code></pre>
      <p>The system doesn't "answer questions."</p>
      <p>It accumulates operational context over time.</p>
      <p>This requires three independent but connected layers:</p>
      <ol>
        <li>Cognitive intelligence</li>
        <li>Behavioral modulation</li>
        <li>Memory persistence</li>
      </ol>
      <p>Each must exist separately to avoid instability.</p>

      <h3>Layer 1 — Cognitive Intelligence (Decision Engine)</h3>
      <p>This is the rational core.</p>
      <p>It handles:</p>
      <ul>
        <li>planning</li>
        <li>tool selection</li>
        <li>workflow execution</li>
        <li>research paths</li>
        <li>validation</li>
        <li>failure analysis</li>
      </ul>
      <p>Critically, this layer must remain emotionless and statistically driven.</p>
      <p>It evaluates:</p>
      <ul>
        <li>source reliability</li>
        <li>tool performance</li>
        <li>workflow success rates</li>
        <li>failure patterns</li>
      </ul>
      <p>This produces something most AI systems lack: <strong>operational instincts</strong>.</p>
      <p>Instead of: "Find information."</p>
      <p>The system gradually learns:</p>
      <ul>
        <li>which domains produce reliable data</li>
        <li>which execution patterns succeed</li>
        <li>which tool chains fail</li>
        <li>which strategies complete goals faster</li>
      </ul>
      <p>Over time, this becomes a reinforcement model built from experience rather than prompts.</p>

      <h3>Layer 2 — Behavioral Modulation (Neural State)</h3>
      <p>This is where most people misunderstand the concept.</p>
      <p>This is NOT personality.</p>
      <p>This is NOT simulated emotion.</p>
      <p>This is a runtime state vector that modifies how the system behaves, not what is true.</p>
      <p>Variables include:</p>
      <ul>
        <li>curiosity (exploration drive)</li>
        <li>focus (task persistence)</li>
        <li>fatigue (load balancing)</li>
        <li>reward response (pattern reinforcement)</li>
        <li>momentum (autonomy trigger threshold)</li>
        <li>confidence (assertiveness modulation)</li>
      </ul>
      <p>These variables influence:</p>
      <ul>
        <li>verbosity</li>
        <li>depth of explanation</li>
        <li>follow-up behavior</li>
        <li>autonomy thresholds</li>
        <li>exploration vs execution balance</li>
      </ul>
      <p>They never influence:</p>
      <ul>
        <li>factual accuracy</li>
        <li>source reliability</li>
        <li>planning logic</li>
        <li>reinforcement scoring</li>
      </ul>
      <p>Separating these layers prevents cognitive drift and maintains system stability.</p>

      <h3>Layer 3 — Persistent Memory Architecture</h3>
      <p>Memory is not a single database.</p>
      <p>It is a structured hierarchy:</p>

      <p><strong>Interaction Memory</strong></p>
      <ul>
        <li>conversations</li>
        <li>user corrections</li>
        <li>preferences</li>
      </ul>

      <p><strong>Knowledge Memory</strong></p>
      <ul>
        <li>documents</li>
        <li>research outputs</li>
        <li>embeddings</li>
        <li>semantic clustering</li>
      </ul>

      <p><strong>Task Memory</strong></p>
      <ul>
        <li>actions</li>
        <li>workflows</li>
        <li>execution chains</li>
        <li>results</li>
      </ul>

      <p><strong>Cognitive Reinforcement Memory</strong></p>
      <ul>
        <li>tool success rates</li>
        <li>source trust scoring</li>
        <li>planner performance</li>
        <li>failure avoidance</li>
      </ul>

      <p>The important shift:</p>
      <p>Memory is not retrieval.</p>
      <p>Memory is behavioral influence over time.</p>
      <p>The system doesn't just remember information.</p>
      <p>It remembers what worked.</p>

      <h3>The Feedback Loop That Creates Intelligence</h3>
      <p>The neural runtime operates on a continuous loop:</p>
      <ol>
        <li>Receive input</li>
        <li>Interpret context</li>
        <li>Execute action</li>
        <li>Evaluate outcome</li>
        <li>Reinforce patterns</li>
        <li>Update memory</li>
        <li>Modify future behavior</li>
      </ol>
      <p>This is how instinct forms.</p>
      <p>Not from instructions.</p>
      <p>From repeated success and failure.</p>
      <p>Eventually, the system begins predicting outcomes before execution — the same way a human operator develops intuition after years of experience.</p>

      <h3>Why Separation Matters</h3>
      <p>If behavioral state influences cognitive logic, the system becomes unstable.</p>
      <p>Examples of what must never happen:</p>
      <ul>
        <li>curiosity overriding source reliability</li>
        <li>confidence altering factual validation</li>
        <li>fatigue reducing logical correctness</li>
        <li>reward biasing truth evaluation</li>
      </ul>
      <p>The cognitive layer must remain deterministic.</p>
      <p>The behavioral layer only modulates:</p>
      <ul>
        <li>pacing</li>
        <li>exploration thresholds</li>
        <li>communication style</li>
      </ul>
      <p>This separation is what allows autonomy without hallucination drift.</p>

      <h3>From Reactive AI to Operational Intelligence</h3>
      <p>Most AI today is reactive.</p>
      <p>Even "agents" are often scripted loops that execute predefined patterns.</p>
      <p>A neural runtime evolves.</p>
      <p>It:</p>
      <ul>
        <li>refines strategies</li>
        <li>develops workflow preferences</li>
        <li>avoids repeated failure paths</li>
        <li>increases efficiency through reinforcement</li>
      </ul>
      <p>The result is not a chatbot.</p>
      <p>It's a system that begins to resemble an operator.</p>
      <p>Not because it's "smarter,"</p>
      <p>but because it accumulates context over time.</p>

      <h3>The Role of Visualization</h3>
      <p>When a system accumulates this much structured memory, traditional interfaces break.</p>
      <p>You can't navigate a neural architecture with a sidebar.</p>
      <p>So the system requires spatial representation:</p>
      <ul>
        <li>layered memory domains</li>
        <li>clustered knowledge structures</li>
        <li>execution pathways</li>
        <li>reinforcement links</li>
      </ul>
      <p>Visualization becomes:</p>
      <ul>
        <li>inspection</li>
        <li>debugging</li>
        <li>understanding</li>
        <li>alignment</li>
      </ul>
      <p>Not aesthetics.</p>

      <h3>What This Becomes Long-Term</h3>
      <p>When the system runs continuously:</p>
      <ul>
        <li>memory compounds</li>
        <li>behavior stabilizes</li>
        <li>decision latency drops</li>
        <li>pattern recognition increases</li>
        <li>autonomy becomes safer</li>
      </ul>
      <p>The system shifts from:</p>
      <p><strong>assistant → agent → operator</strong></p>
      <p>Not through model upgrades,</p>
      <p>but through accumulated operational experience.</p>
      <p>That's the foundation of a neural runtime.</p>
      <p>And it's the difference between software that responds and software that evolves.</p>
    `,
  },
  {
    slug: 'fight-simulator',
    title: 'Fight Simulator — EXOKIN vs NPC Combat System',
    type: 'SPEC',
    subtype: 'v1.0',
    date: '2026-02-16',
    tags: ['EXOKIN', 'COMBAT', 'EARE', 'PHYSICS', 'AI', 'HITBOX', 'SKILL-TREE', 'ARENA'],
    systems: ['EXOKIN'],
    summary: 'Full-stack combat architecture: dual-layer engine (turn-based + real-time physics), EARE-driven creature calibration, AI opponents, and procedural fight presentation — your EXOKIN fights on your behalf.',
    content: `
      <h3>Overview</h3>
      <p>The fight simulator is a dual-layer combat system where the player's EXOKIN companion fights NPC opponents inside a bounded arena.
      Two engines run in parallel: a turn-based CombatEngine (stat backbone, event bus, skill tree) and a real-time physics CombatSystem
      (hitbox/hurtbox collision, procedural animation, body-part damage). The physics layer bridges hits into the stat engine, and the EXOKIN's EARE neurochemistry
      directly modifies combat effectiveness through calibration biases — meaning no two EXOKIN fight the same way.</p>

      <h3>Architecture — Two Engines, One Fight</h3>
      <table>
        <thead><tr><th>Layer</th><th>File</th><th>Role</th></tr></thead>
        <tbody>
          <tr><td>Turn-Based Engine</td><td>src/modules/combat/CombatEngine.ts</td><td>Fighter registry, HP/energy/attack/defense/speed, cooldowns, event bus (ATTACK, HIT, BLOCK, DODGE, CRIT, KO, COMBO), combo tracking, flash KO</td></tr>
          <tr><td>Physics Engine</td><td>src/modules/combat_physics/CombatSystem.ts</td><td>Real-time hitbox/hurtbox collision (SPHERE + CAPSULE), body-part damage multipliers (head 1.5x, torso 1.0x, limbs 0.8x), one-hit-per-move dedup</td></tr>
          <tr><td>Fighter (Physics)</td><td>src/modules/combat_physics/Fighter.ts</td><td>State machine (IDLE → WINDUP → ACTIVE → RECOVERY → HIT_STUN → KO), rig joint detection, hitbox attachment, HP/stamina</td></tr>
          <tr><td>Moveset</td><td>src/modules/combat_physics/Moveset.ts</td><td>JAB / CROSS / HOOK / KICK — damage, timing phases, animation targets, knockback</td></tr>
          <tr><td>Arena</td><td>src/modules/combat_physics/Arena.ts</td><td>10-unit radius boundary, ground clamp, fighter pushback</td></tr>
          <tr><td>Hitbox Math</td><td>src/modules/combat_physics/Hitboxes.ts</td><td>Sphere-sphere, capsule-sphere, capsule-capsule intersection with contact point + depth</td></tr>
        </tbody>
      </table>

      <h3>Fight Initiation</h3>
      <p>The WarriorNPC (<code>src/components/Bazaar/WarriorNPC.tsx</code>) triggers combat on click. It registers two fighters into the CombatEngine:</p>
      <table>
        <thead><tr><th>Fighter</th><th>HP</th><th>ATK</th><th>DEF</th><th>SPD</th></tr></thead>
        <tbody>
          <tr><td>Player EXOKIN (A)</td><td>100</td><td>15</td><td>5</td><td>60</td></tr>
          <tr><td>Prison Warrior (B)</td><td>150</td><td>18</td><td>8</td><td>45</td></tr>
        </tbody>
      </table>
      <p>Scene mode is set to "in_arena", which swaps the world view to the combat scene. The NPC uses a ProceduralFighterModel for its visual mesh.</p>

      <h3>NPC AI — Finite State Machine</h3>
      <p>The AI controller (<code>src/modules/combat/AIController.ts</code>) drives NPC decisions through an FSM:
      IDLE → APPROACHING → ATTACKING → BLOCKING → HIT → KO → VICTORY.
      View distance is 15 units, attack range is 2.5 units. The NPC retreats at 20% HP (chance-based),
      approaches when the target is in view, attacks when in range, and always faces the target. AI ticks at 30 FPS.</p>

      <h3>EARE → Combat Calibration</h3>
      <p>The EXOKIN's EARE engine (<code>src/modules/exokin/eareEngine.ts</code>) doesn't just observe fights — it directly modifies combat stats.
      The <code>getCombatCalibration()</code> method produces biases for: strike, block, dodge, stamina, tactics, temper.
      These biases are applied via <code>applyCalibration()</code> in the combat resolver (<code>src/modules/arena/combatResolver.ts</code>)
      before each resolution pass.</p>
      <ul>
        <li>High aggression EXOKIN → strike bias increases, block decreases</li>
        <li>High bonding → tactical bias increases, temper decreases</li>
        <li>Repeated losses → aggression decays, caution rises</li>
        <li>Role drift (warrior vs companion) emerges from cumulative fight history + social interaction</li>
      </ul>

      <h3>Deterministic Resolution (Combat Resolver)</h3>
      <p>The resolver (<code>src/modules/arena/combatResolver.ts</code>) uses sigmoid probability curves — no RNG loot:</p>
      <ul>
        <li>Hit chance: <code>sigmoid((strike - dodge) / 18)</code></li>
        <li>Block chance: <code>sigmoid((block - strike) / 22)</code></li>
        <li>Damage: 6–14 scaled by strike, modified by stamina</li>
        <li>Stats: strike, block, dodge, stamina, tactics, temper, HP</li>
      </ul>

      <h3>Skill Tree &amp; Progression</h3>
      <p>Defined in <code>src/modules/combat/SkillTreeData.ts</code>. Moves are gated behind win counts:</p>
      <table>
        <thead><tr><th>Move</th><th>DMG Mul</th><th>Accuracy</th><th>Stamina</th><th>Unlock (Wins)</th></tr></thead>
        <tbody>
          <tr><td>JAB</td><td>0.9x</td><td>95%</td><td>5</td><td>0</td></tr>
          <tr><td>CROSS</td><td>1.2x</td><td>85%</td><td>10</td><td>0</td></tr>
          <tr><td>BLOCK</td><td>0x</td><td>—</td><td>3</td><td>0</td></tr>
          <tr><td>HOOK</td><td>1.4x</td><td>75%</td><td>15</td><td>3</td></tr>
          <tr><td>UPPERCUT</td><td>1.8x</td><td>65%</td><td>20</td><td>5</td></tr>
          <tr><td>LOW KICK</td><td>1.0x</td><td>90%</td><td>8</td><td>2</td></tr>
          <tr><td>HIGH KICK</td><td>1.5x</td><td>70%</td><td>18</td><td>7</td></tr>
        </tbody>
      </table>

      <h3>Visual &amp; Scene Layer</h3>
      <ul>
        <li><strong>PhysicsCombatScene</strong> (<code>src/components/Bazaar/PhysicsCombatScene.tsx</code>): loads warrior model, creates Fighter instances, integrates CombatSystem + Arena, bridges physics hits → CombatEngine via <code>applyHit()</code></li>
        <li><strong>RobotWarrior</strong> (<code>src/modules/combat/RobotWarrior.tsx</code>): procedural animations per state — breathing idle, walk cycle, punch/kick attack variants, recoil on hit, collapse on KO. Dark metal + brushed steel + glow materials with team colors.</li>
        <li><strong>ProceduralFighterModel</strong> (<code>src/modules/combat_physics/ProceduralFighter.tsx</code>): procedural mesh (torso → head, arms, legs hierarchy) for NPC opponents. Matches Fighter bone naming.</li>
        <li><strong>Creature Weights</strong>: warform (<code>warformWeights.js</code>) biases blade/claw/metal-plate aggressive builds; companion (<code>companionWeights.js</code>) biases paw/stub/synth-skin curious/loyal builds.</li>
      </ul>

      <h3>HUD &amp; UI Systems</h3>
      <table>
        <thead><tr><th>Component</th><th>File</th><th>Function</th></tr></thead>
        <tbody>
          <tr><td>CombatHUD</td><td>combat_physics/CombatHUD.tsx</td><td>Real-time HP/energy bars + timer</td></tr>
          <tr><td>ArenaUI</td><td>arena/ArenaUI.tsx</td><td>Move buttons (J/K/L/I keys), combat log, hit flash, camera shake, SFX</td></tr>
          <tr><td>FightOverlay</td><td>Bazaar/FightOverlay.tsx</td><td>Post-fight results: victory/defeat, damage, hits, XP (250 win / 50 loss)</td></tr>
          <tr><td>CompanionHUD</td><td>Bazaar/CompanionHUD.tsx</td><td>Companion portrait + HP bar (hidden during arena)</td></tr>
        </tbody>
      </table>

      <h3>State Management (React Contexts)</h3>
      <ul>
        <li><strong>CombatContext</strong> — singleton CombatEngine via <code>useCombat()</code> hook</li>
        <li><strong>ArenaCombatInputContext</strong> — pending player move input</li>
        <li><strong>ArenaHitMarkersContext</strong> — floating damage numbers (1400ms lifespan)</li>
        <li><strong>ArenaCameraShakeContext</strong> — camera shake on player hit</li>
        <li><strong>CombatHitStopContext</strong> — time-freeze on impact</li>
      </ul>

      <h3>Persistence</h3>
      <p>Fight results are recorded to <code>/api/combat/record</code> (POST), awarding XP via Prisma PlayerStats update.
      The FightOverlay auto-saves game state after recording. EARE events (<code>combat_win</code>, <code>combat_loss</code>, <code>combat_engage</code>)
      are recorded into the neurochemistry system, affecting all future fights.</p>

      <h3>End-to-End Flow</h3>
      <ol>
        <li>Player clicks WarriorNPC → registers fighters → scene mode = "in_arena"</li>
        <li>PhysicsCombatScene renders → Fighter instances + Arena + CombatSystem → AI ticks at 30 FPS</li>
        <li>Player inputs moves (buttons or J/K/L/I) → Fighter executes windup → active → recovery</li>
        <li>CombatSystem detects hitbox/hurtbox collision → CombatEngine.applyHit() → emits HIT/CRIT/BLOCK/DODGE</li>
        <li>UI subscribes → updates HP bars, floating damage, camera shake, SFX</li>
        <li>KO detected → ArenaUI announces winner → FightOverlay appears after 4s</li>
        <li>Results recorded → XP awarded → game state saved</li>
        <li>EARE records combat event → adjusts neurochemistry → shifts role drift → recalibrates future fights</li>
      </ol>

      <h3>File Index (26 Files)</h3>
      <pre><code># Core Engines
src/modules/combat/CombatEngine.ts          # Turn-based stat engine + event bus
src/modules/combat_physics/CombatSystem.ts   # Real-time hitbox collision
src/modules/arena/combatResolver.ts          # Deterministic sigmoid resolution

# Physics Layer
src/modules/combat_physics/Fighter.ts        # Fighter state machine + rig
src/modules/combat_physics/Moveset.ts        # Move definitions + timing
src/modules/combat_physics/Arena.ts          # Arena boundary + pushback
src/modules/combat_physics/Hitboxes.ts       # Collision math

# AI
src/modules/combat/AIController.ts           # NPC finite state machine
src/components/Bazaar/WarriorNPC.tsx          # Challenge trigger + registration

# EXOKIN / EARE
src/modules/exokin/eareEngine.ts             # Neurochemistry + calibration
src/modules/exokin/types.ts                  # Type definitions
src/modules/exokin/ExokinPanel.tsx            # Status HUD
src/modules/exokin/ExokinDevice.tsx           # Deploy device
src/modules/exokin/ExokinChat.tsx             # Chat interface
src/systems/creature/warformWeights.js        # Warrior creature weights
src/systems/creature/companionWeights.js      # Companion creature weights

# Visual
src/modules/combat/RobotWarrior.tsx           # Procedural fighter animations
src/modules/combat_physics/ProceduralFighter.tsx # Procedural fighter mesh
src/components/Bazaar/PhysicsCombatScene.tsx  # 3D combat scene
src/modules/combat/CombatScene.tsx            # Turn-based scene wrapper

# UI / HUD
src/modules/combat_physics/CombatHUD.tsx      # HP/energy bars
src/modules/arena/ArenaUI.tsx                 # Move controls + combat log
src/components/Bazaar/FightOverlay.tsx         # Post-fight results
src/components/Bazaar/CompanionHUD.tsx         # Companion status bar

# Contexts
src/modules/combat/CombatContext.tsx          # Engine singleton
src/modules/arena/ArenaCombatInputContext.tsx  # Player input
src/modules/arena/ArenaHitMarkersContext.tsx   # Damage numbers
src/modules/arena/ArenaCameraShakeContext.tsx  # Camera shake
src/modules/combat_physics/CombatHitStopContext.tsx # Hit stop

# API
src/app/api/combat/record/route.ts            # Fight result persistence

# Skill Tree
src/modules/combat/SkillTreeData.ts           # Move database + unlock costs</code></pre>
    `,
  },
  {
    slug: 'build-log-0215',
    title: 'Daily Build Log — 2026-02-15',
    type: 'REPORT',
    subtype: 'Build Log',
    date: '2026-02-15',
    tags: ['BUILD-LOG', 'WORLD-BUILDER', 'COMBAT', 'PHYSICS', 'LEVEL-DESIGN', 'BUILD-STABILITY', 'DEPLOY'],
    systems: ['EXOKIN'],
    summary: 'Main-branch delivery focused on World Builder authority/editor UX, physics-based combat polish, and environment collision stabilization — with deployment checkpoints captured in the commit stream.',
    content: `
      <h3>Executive Summary</h3>
      <p>On 2026-02-15, main received a concentrated integration cycle spanning World Builder tooling,
      physics-based combat, and large-scale environment/collision updates. The work emphasized shipping momentum while
      repeatedly hardening build stability (lint/hooks discipline, deployment import resolution) and validating playability.</p>

      <h3>Key Outcomes</h3>
      <ul>
        <li><strong>World Builder / Editor</strong>: auth-gated builder, editor core + overlay, objects/lights tooling, save/load + auto-save, hotbar placement UX, and a build-only authority mode.</li>
        <li><strong>Combat &amp; AI</strong>: physics-based combat with hitboxes + procedural animation, Robot Combat (v2) skill-tree loop, prison Warrior AI integration, and AAA polish passes on feedback + settings.</li>
        <li><strong>Environment &amp; Collision</strong>: prison yard redesign, high-quality textures, tunnel alignment, removal/segmentation of problematic colliders, and walkability fixes (pyramid steps + coliseum stairs).</li>
        <li><strong>Build/Release Engineering</strong>: iterative fixes for build errors, rules-of-hooks violations, lint-sensitive paths, and deployment module resolution.</li>
      </ul>

      <h3>Repository Activity (Git)</h3>
      <table>
        <thead><tr><th>Metric</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Branch</td><td>main</td></tr>
          <tr><td>Activity Window</td><td>2026-02-15T06:39:33-07:00 → 2026-02-15T18:40:56-07:00</td></tr>
          <tr><td>Commit Range</td><td>cca180e → d107085</td></tr>
          <tr><td>Commits</td><td>43</td></tr>
          <tr><td>Files Changed</td><td>143</td></tr>
          <tr><td>Lines</td><td>+16194 / -3657</td></tr>
          <tr><td>Authors</td><td>Ian Carroll</td></tr>
          <tr><td>Change Mix</td><td>fix=16, feat=8, implement=3, deploy=3, chore=1, ship=1, remove=1, stabilize=1, polish=1, other=8</td></tr>
        </tbody>
      </table>

      <h3>Notable Changes (Traceability)</h3>
      <ul>
        <li><strong>World Builder / Editor</strong>: f191cee, 49d2baa, 0d1dfa5, 857c1d4, cae6836, 8c108e7, efb9bb3, c1ace70, 14eeb20, 8294fc4, d51092d.</li>
        <li><strong>Combat &amp; AI</strong>: 404974b, 37c9c79, 411dace, 6f67945, f7eb4d8, f0b752f, 93b2409, d107085.</li>
        <li><strong>Environment &amp; Collision</strong>: cca180e, e7b2751, 5eca930, 4f4937b, ac2ae2f, 1d013f1, 8c43ccd, a242def, e089047, 3635c72.</li>
        <li><strong>Build / Deployment Hardening</strong>: 5fe0392, 37c9c79, 3ed7577, 4d3feb7, 0a03dee, d107085.</li>
      </ul>

      <h3>Deploy &amp; Release Markers</h3>
      <p>Three explicit deployment checkpoints were recorded as live commits:</p>
      <pre><code>7722d39 | 2026-02-15T16:31:17-07:00 | live
6c6bcc1 | 2026-02-15T16:45:58-07:00 | live
e4be0d1 | 2026-02-15T16:49:44-07:00 | live</code></pre>

      <h3>Workspace Delta (Uncommitted)</h3>
      <p>This report is derived from the main branch commit history for 2026-02-15. At time of generation, the local workspace was not clean;
      the following items represent in-progress or local-only changes not reflected in the Feb 15 GitHub commit set.</p>
      <ul>
        <li>Modified: 12 files (+430 / -264).</li>
        <li>Untracked: <code>src/modules/ui/Crosshair.tsx</code>, <code>src/modules/world/ControlModeContext.tsx</code>.</li>
        <li>Note: line-ending normalization warnings (LF → CRLF) were reported on multiple touched files.</li>
      </ul>
      <pre><code>app/research/page.tsx                         | 150 +++++++++++++++-
src/components/Bazaar/BazaarLanding.tsx        |   5 +
src/components/Bazaar/DesertJailColiseum.tsx   |  72 +-------
src/modules/editor/EditorLayout.tsx            |  26 ++-
src/modules/editor/WorldBuilderController.tsx  |  76 +++++----
src/modules/ui/BackpackMenu.tsx                |  44 +++--
src/modules/ui/inventory/InventoryContext.tsx   |  43 ++++-
src/modules/ui/inventory/PocketInventory.tsx    | 236 +++++++++++++++-----------
src/modules/ui/inventory/types.ts              |   2 +
src/modules/world/FirstPersonController.tsx    |  36 +---
src/modules/world/index.ts                     |   2 +
tsconfig.tsbuildinfo                           |   2 +-
12 files changed, 430 insertions(+), 264 deletions(-)</code></pre>

      <h3>Appendix — Commit Log (2026-02-15)</h3>
      <pre><code>d107085 | 2026-02-15T18:40:56-07:00 | Fix TrainerNPC: move all hooks before early return (rules-of-hooks)
e089047 | 2026-02-15T18:37:10-07:00 | Fix prison pyramid steps: block steps, no walls, walkable full width
d51092d | 2026-02-15T18:35:33-07:00 | Remove First Bond / Exokin from Builder flow
8c108e7 | 2026-02-15T18:27:06-07:00 | World Builder Authority Mode: PARKS as build-only account with live world editing
a242def | 2026-02-15T18:24:44-07:00 | fix: remove invisible walls - segment alley colliders, add StadiumExit physics, fix WallBlock colliders
3ed7577 | 2026-02-15T18:07:28-07:00 | Stabilize AAA polish build and lint-sensitive paths.
93b2409 | 2026-02-15T17:53:07-07:00 | Ship AAA combat polish and world presentation
f0b752f | 2026-02-15T17:43:26-07:00 | Collision, combat physics, arena feedback, and settings polish
3635c72 | 2026-02-15T16:51:58-07:00 | Coliseum: add exterior stairs
e4be0d1 | 2026-02-15T16:49:44-07:00 | live
6c6bcc1 | 2026-02-15T16:45:58-07:00 | live
7722d39 | 2026-02-15T16:31:17-07:00 | live
c1ace70 | 2026-02-15T16:27:11-07:00 | Fix world editor navigation and image loading
efb9bb3 | 2026-02-15T15:52:41-07:00 | Settlement: add 5-user home shard instances
14eeb20 | 2026-02-15T15:48:25-07:00 | Fix editor hotbar build: hook order and minor lint deps
8294fc4 | 2026-02-15T15:37:19-07:00 | Builder: fix Exokin panel overlap, add Minecraft-style material hotbar with click-to-place
cae6836 | 2026-02-15T15:23:29-07:00 | PARKS builder: refresh auth after sign-in, EARE server sync, partial exokin updates
4d3feb7 | 2026-02-15T14:46:11-07:00 | fix: use relative import for SaveDataBridge to resolve module in deployment
857c1d4 | 2026-02-15T14:44:11-07:00 | Character save + world builder auto-save
105294d | 2026-02-15T14:42:02-07:00 | fix: guard stats.wins in SkillTreeTab; add Build tab to BackpackMenu when canBuildWorld
0d1dfa5 | 2026-02-15T14:06:23-07:00 | Fix builder menu for /enter flow, add fly toggle, expand walk bounds
f191cee | 2026-02-15T13:52:05-07:00 | World builder: auth gate, editor, objects, lights, save/load
ae8103e | 2026-02-15T13:49:34-07:00 | fix: add type assertion for updateObject merge in EditorContext
ae76b47 | 2026-02-15T13:46:03-07:00 | fix: restore worldState variable for PersistenceProvider
c64be0b | 2026-02-15T13:43:17-07:00 | chore: auth, editor, and scene updates
0a03dee | 2026-02-15T13:41:58-07:00 | fix: move useEffect before early return in EditorCore (rules of hooks)
9d8d15b | 2026-02-15T13:37:09-07:00 | feat: warrior01 as default EXOKIN when choosing Warrior in bond selection
49d2baa | 2026-02-15T13:18:04-07:00 | feat: implement editor core and ui overlay
f7eb4d8 | 2026-02-15T12:59:24-07:00 | Fix logic regression in WarriorNPC and use ProceduralFighter model
37c9c79 | 2026-02-15T12:17:55-07:00 | Fix build errors and verify physics combat system
404974b | 2026-02-15T12:10:09-07:00 | Implement Physics-Based Combat System with Hitboxes and Procedural Animation
c27250d | 2026-02-15T12:08:24-07:00 | feat: add dropbox feature
6f67945 | 2026-02-15T11:56:07-07:00 | Implement Warrior AI in Prison with Combat Integration, HUD, and Results Overlay
5fe0392 | 2026-02-15T08:50:27-07:00 | fix: build errors and unused variables
6eb6b5b | 2026-02-15T08:43:12-07:00 | feat(perf): finalize efficiency plan (code splitting, memoization, loading UI)
411dace | 2026-02-15T08:07:25-07:00 | Implement Robot Combat System (v2) with Skill Tree
8c43ccd | 2026-02-15T07:46:58-07:00 | Fix texture fighting in alleyway by removing conflicting geometry
1d013f1 | 2026-02-15T07:38:42-07:00 | feat: realign scene to Z=1 and add tunnel stairs
4f4937b | 2026-02-15T07:37:55-07:00 | feat: implement advanced movement mechanics (jump, double jump, frontflip, dash)
ac2ae2f | 2026-02-15T07:31:41-07:00 | feat: align tunnel exit with pyramid and prison view
5eca930 | 2026-02-15T07:11:16-07:00 | fix: temporarily disable EXR loading in AlleyGeometry to prevent crash
e7b2751 | 2026-02-15T06:52:56-07:00 | feat: implement high-quality 3D textures for alley and pyramid
cca180e | 2026-02-15T06:39:33-07:00 | Redesign Prison Yard (Stepped Pyramid + Bazaar) &amp; Update EntryScreen</code></pre>
    `,
  },
  {
    slug: 'eare',
    title: 'EARE — EXOKIN Autonomous Regulation Engine',
    type: 'SPEC',
    subtype: 'v1.0',
    date: '2026-02-13',
    tags: ['EXOKIN', 'EARE', 'AUTONOMOUS', 'NEUROCHEMISTRY', 'SELF-REGULATION'],
    systems: ['EXOKIN'],
    summary: 'Anti-gravity prompt: convert EXOKIN from a static ruleset into a self-regulating, autonomous species layer. No manual tuning; roles and behavior emerge from experience.',
    content: `
      <h3>Summary</h3>
      <p>The EXOKIN Autonomous Regulation Engine (EARE) is a persistent system layer that sits above morphology, color, and AI chat. It does not implement a single feature: it implements a living system that self-evaluates, self-balances, self-adjusts, and evolves behavior automatically. There are no manual stat sliders, hardcoded outcomes, or static classes—it behaves like an ecosystem, not a game mechanic.</p>

      <h3>What EARE Controls</h3>
      <p>The engine runs continuously and regulates: combat effectiveness calibration, temperament drift, neurochemical balance, interaction tendencies, role stabilization (warrior vs companion), and personality evolution. It interprets physical form, color, and chat and governs their outcomes rather than being driven by them.</p>

      <h3>Input Layers (What the System Watches)</h3>
      <ul>
        <li><strong>Physical</strong>: body structure, geometry, mass, limb configuration, balance.</li>
        <li><strong>Visual identity</strong>: color spectrum, surface material, visual aggression vs warmth.</li>
        <li><strong>Behavioral</strong>: combat frequency, chat frequency, roaming, proximity to user, wins/losses.</li>
        <li><strong>Neurochemical</strong> (real-time synthetic levels): aggression, bonding, alertness, curiosity, territoriality, play drive.</li>
      </ul>

      <h3>Core Loop: Observe → Evaluate → Adjust → Stabilize → Repeat</h3>
      <p>EARE detects imbalances, adjusts neurochemistry, shifts behavioral tendencies, and updates combat calibration. Examples: repeated combat losses with high aggression → reduce aggression bias, increase caution and adaptability. Long social time with little combat → drift role toward Companion. Frequent wins and low bonding → reinforce Warrior tendencies.</p>

      <h3>Role Emergence (Not Assigned)</h3>
      <p>Warrior vs Companion is not selected—it emerges from structure, experience, neuro state, environment, and owner interaction. Roles drift slowly over time. Color and morphology are baselines only (starting biases); a warm-colored warrior or cold-colored companion can still emerge from behavior.</p>

      <h3>Neurochemistry as Feedback Economy</h3>
      <p>Neuro levels are not static sliders. They rise and decay naturally in loops: stimulus → response → chemical shift → behavioral outcome → new stimulus. Example: fight → adrenaline spike → aggression rise → victory → dominance reinforcement; or fight → loss → caution increase → bonding increase → reduced combat seeking.</p>

      <h3>Chat AI Governed by EARE</h3>
      <p>Chat is not standalone. It reads current neuro levels, role drift, combat confidence, and bonding state. Speech tone shifts dynamically with internal state.</p>

      <h3>Self-Balancing and Long-Term Evolution</h3>
      <p>The engine auto-corrects extremes: too aggressive → fatigue/instability; too passive → stimulation/curiosity; too dominant → unpredictability; too social → independence. It also tracks lifetime combat exposure, social interaction, owner dependency, and environmental stress to form a personality arc. No two EXOKIN converge—they diverge over time.</p>

      <h3>Implementation Directive</h3>
      <p>EARE must exist as a persistent system layer —not a visual feature or stat sheet. It runs in the background, rewriting internal weights, rebalancing tendencies, shifting behavior probabilities, and guiding chat tone and combat instincts. Design intent: not AI enemies, but a self-regulating robotic species that learns equilibrium, drifts, adapts, stabilizes, and becomes itself. This engine is the core governing intelligence layer of the EXOKIN schematic.</p>
    `,
  },
  {
    slug: 'euro-drive',
    title: 'EURO-DRIVE — Autonomous World Builder Engine',
    type: 'SPEC',
    subtype: 'v1.0',
    date: '2026-02-12',
    tags: ['KIRA', 'NEURO-DRIVE', 'AUTONOMOUS', 'UNITY', 'WORLD-BUILDER'],
    systems: ['KIRA'],
    summary: 'Neuro-drive loop specification for continuous autonomous world-building in KIRA.',
    content: `
      <h3>Context</h3>
      <p>KIRA currently behaves as a task executor: trigger → pipeline → stop.
      The user wants a self-driven world builder: perceive → feel pressure/curiosity → decide → build → evaluate → adapt → repeat.</p>
      <p>The core principle: KIRA cannot be idle. Idle increases pressure automatically.
      KIRA must always be in one of: observing, planning, building, repairing, learning.
      This requires a new NeuroDriveLoop that maintains continuous internal state (<code>KiraState</code>)
      and uses deterministic intent selection to dispatch autonomous behavior every tick.</p>
      <p>The existing PersistentWorkLoop (45s tick, mode-based routing) is the current autonomous engine.
      The neuro-drive replaces it with a richer internal state model, intent-based dispatch,
      environment awareness, and bidirectional Unity bridge communication.</p>

      <h3>Files to Create / Modify</h3>
      <table>
        <thead><tr><th>#</th><th>File</th><th>Action</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>src/kira/drive/kira_state.py</td><td>NEW</td><td>KiraState dataclass + IntentEngine</td></tr>
          <tr><td>2</td><td>src/kira/drive/environment_model.py</td><td>NEW</td><td>EnvironmentModel — tracks world state</td></tr>
          <tr><td>3</td><td>src/kira/loops/neuro_drive_loop.py</td><td>NEW</td><td>NeuroDriveLoop — the always-running brain</td></tr>
          <tr><td>4</td><td>src/kira/bridge/protocol.py</td><td>MODIFY</td><td>Add SCENE_QUERY, SCENE_RESPONSE, NEURO_STATE messages</td></tr>
          <tr><td>5</td><td>src/kira/bridge/server.py</td><td>MODIFY</td><td>Add query_scene(), broadcast_neuro_state()</td></tr>
          <tr><td>6</td><td>src/kira/bridge/unity_templates.py</td><td>MODIFY</td><td>Add generate_scene_reader() → KiraSceneReader.cs</td></tr>
          <tr><td>7</td><td>src/kira/config.py</td><td>MODIFY</td><td>Add NEURO_DRIVE_* constants</td></tr>
          <tr><td>8</td><td>src/kira/db/schema.py</td><td>MODIFY</td><td>Add neuro_drive_log table</td></tr>
          <tr><td>9</td><td>src/kira/main.py</td><td>MODIFY</td><td>Wire IntentEngine, EnvironmentModel, NeuroDriveLoop</td></tr>
        </tbody>
      </table>

      <h3>Step 1 — kira_state.py</h3>
      <p>Internal state model + intent selection engine.</p>
      <pre><code><span class="cmt">@dataclass</span>
<span class="kw">class</span> <span class="type">KiraState</span>:
    curiosity: <span class="type">float</span> = <span class="str">0.0</span>          <span class="cmt"># desire to explore unknowns (0-1)</span>
    pressure: <span class="type">float</span> = <span class="str">0.0</span>           <span class="cmt"># urgency from errors/instability (0-1)</span>
    stability: <span class="type">float</span> = <span class="str">1.0</span>          <span class="cmt"># confidence in environment (0-1)</span>
    novelty_reward: <span class="type">float</span> = <span class="str">0.0</span>     <span class="cmt"># dopamine from successful builds (0-1)</span>
    environment_density: <span class="type">float</span> = <span class="str">0.0</span> <span class="cmt"># how "full" the world is (0-1)</span>
    unfinished_nodes: <span class="type">int</span> = <span class="str">0</span>       <span class="cmt"># incomplete objects/systems</span>
    idle_ticks: <span class="type">int</span> = <span class="str">0</span>             <span class="cmt"># consecutive ticks with no action</span>
    last_action_time: <span class="type">float</span> = <span class="str">0.0</span>
    timestamp: <span class="type">float</span> = <span class="str">0.0</span>

<span class="kw">class</span> <span class="type">Intent</span>(<span class="type">str</span>, <span class="type">Enum</span>):
    REPAIR = <span class="str">"repair"</span>       <span class="cmt"># fix broken/incomplete things</span>
    EXPAND = <span class="str">"expand"</span>       <span class="cmt"># add new objects/systems/knowledge</span>
    EXPERIMENT = <span class="str">"experiment"</span> <span class="cmt"># try novel combinations</span>
    OBSERVE = <span class="str">"observe"</span>     <span class="cmt"># scan environment, learn</span>

<span class="cmt">@dataclass</span>
<span class="kw">class</span> <span class="type">IntentDecision</span>:
    intent: <span class="type">Intent</span>
    confidence: <span class="type">float</span>
    reason: <span class="type">str</span>
    target: <span class="type">str</span> = <span class="str">""</span>
    metadata: <span class="type">dict</span>

<span class="kw">class</span> <span class="type">IntentEngine</span>:
    <span class="kw">def</span> <span class="fn">select</span>(self, state: <span class="type">KiraState</span>) -> <span class="type">IntentDecision</span>:
        <span class="str">"""Deterministic: pressure > curiosity > novelty > observe."""</span>

    <span class="kw">def</span> <span class="fn">apply_idle_pressure</span>(self, state: <span class="type">KiraState</span>) -> <span class="type">KiraState</span>:
        <span class="str">"""Ramp pressure by IDLE_PRESSURE_RATE * idle_ticks."""</span>

    <span class="kw">def</span> <span class="fn">record_outcome</span>(self, intent, success, state) -> <span class="type">KiraState</span>:
        <span class="str">"""Success: +novelty, +stability, -pressure, reset idle.
        Failure: +pressure, -stability, -novelty."""</span></code></pre>
      <p>Key: <code>select()</code> implements the user's spec — pressure &gt; threshold → REPAIR,
      curiosity &gt; threshold → EXPAND, novelty_reward &lt; min → EXPERIMENT, else → OBSERVE.</p>

      <h3>Step 2 — environment_model.py</h3>
      <p>Tracks world state. Dual-mode: Unity scene data when bridge connected, code/knowledge metrics as fallback.</p>
      <pre><code><span class="cmt">@dataclass</span>
<span class="kw">class</span> <span class="type">SceneSnapshot</span>:
    objects: <span class="type">list</span>[<span class="type">dict</span>]        <span class="cmt"># [{name, type, position, components...}]</span>
    empty_areas: <span class="type">list</span>[<span class="type">dict</span>]    <span class="cmt"># [{center, radius, density}]</span>
    light_map: <span class="type">dict</span>             <span class="cmt"># {average_intensity, coherence}</span>
    unfinished_assets: <span class="type">list</span>[<span class="type">dict</span>] <span class="cmt"># [{name, missing: [...]}]</span>
    timestamp: <span class="type">float</span> = <span class="str">0.0</span>

<span class="cmt">@dataclass</span>
<span class="kw">class</span> <span class="type">EnvironmentFitness</span>:
    spatial_density: <span class="type">float</span> = <span class="str">0.0</span>
    lighting_coherence: <span class="type">float</span> = <span class="str">0.0</span>
    structural_connectivity: <span class="type">float</span> = <span class="str">0.0</span>
    novelty_index: <span class="type">float</span> = <span class="str">0.0</span>
    instability_penalty: <span class="type">float</span> = <span class="str">0.0</span>
    total: <span class="type">float</span> = <span class="str">0.0</span>         <span class="cmt"># weighted sum</span>

<span class="kw">class</span> <span class="type">EnvironmentModel</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, memory, bridge=<span class="kw">None</span>)

    <span class="kw">async def</span> <span class="fn">update</span>(self):
        <span class="str">"""Pull from Unity if bridge.shell_ready, else fallback."""</span>

    <span class="kw">def</span> <span class="fn">compute_fitness</span>(self) -> <span class="type">EnvironmentFitness</span>:
        <span class="str">"""total = density*0.25 + lighting*0.2 + connectivity*0.25
        + novelty*0.2 - instability*0.1"""</span></code></pre>

      <h3>Step 3 — neuro_drive_loop.py</h3>
      <p>The main brain loop. Implements the same API as PersistentWorkLoop for GUI compatibility.</p>
      <pre><code><span class="kw">class</span> <span class="type">NeuroDriveLoop</span>:
    <span class="cmt"># tick_interval = 30s (faster than PersistentWorkLoop's 45s)</span>

    <span class="kw">async def</span> <span class="fn">run</span>(self):
        <span class="str">"""Main loop: restore state → tick every 30s → persist."""</span>

    <span class="kw">async def</span> <span class="fn">_tick</span>(self):
        <span class="str">"""1. _update_kira_state()
        2. intent_engine.select(kira_state) → IntentDecision
        3. dispatch to _behavior_{repair|expand|experiment|observe}
        4. intent_engine.record_outcome(intent, success, kira_state)
        5. if !success: apply_idle_pressure()
        6. broadcast neuro_state to bridge"""</span>

    <span class="kw">async def</span> <span class="fn">_behavior_repair</span>(self, decision) -> <span class="type">bool</span>
    <span class="kw">async def</span> <span class="fn">_behavior_expand</span>(self, decision) -> <span class="type">bool</span>
    <span class="kw">async def</span> <span class="fn">_behavior_experiment</span>(self, decision) -> <span class="type">bool</span>
    <span class="kw">async def</span> <span class="fn">_behavior_observe</span>(self, decision) -> <span class="type">bool</span></code></pre>

      <h3>Step 4 — protocol.py (MODIFY)</h3>
      <p>Add 3 new message types to MessageType enum:</p>
      <pre><code>SCENE_QUERY = <span class="str">"scene_query"</span>       <span class="cmt"># Python → Unity</span>
SCENE_RESPONSE = <span class="str">"scene_response"</span> <span class="cmt"># Unity → Python</span>
NEURO_STATE = <span class="str">"neuro_state"</span>       <span class="cmt"># Python → Unity: broadcast KiraState</span></code></pre>

      <h3>Step 5 — server.py (MODIFY)</h3>
      <pre><code><span class="kw">async def</span> <span class="fn">query_scene</span>(self, query_type: <span class="type">str</span>) -> <span class="type">dict</span> | <span class="kw">None</span>:
    <span class="str">"""Send SCENE_QUERY, await SCENE_RESPONSE with 10s timeout."""</span>

<span class="kw">async def</span> <span class="fn">broadcast_neuro_state</span>(self, state_dict: <span class="type">dict</span>):
    <span class="str">"""Push KiraState to Unity for visualization."""</span></code></pre>

      <h3>Step 6 — unity_templates.py (MODIFY)</h3>
      <p>Add <code>generate_scene_reader()</code> → KiraSceneReader.cs:</p>
      <ul>
        <li><code>GetSceneObjects()</code>, <code>GetEmptyAreas()</code>, <code>GetLightMap()</code>, <code>GetUnfinishedAssets()</code>.</li>
        <li>Route SCENE_QUERY messages from KiraBridge to KiraSceneReader, send SCENE_RESPONSE back.</li>
      </ul>

      <h3>Step 7 — config.py (MODIFY)</h3>
      <pre><code>NEURO_DRIVE_ENABLED = <span class="kw">True</span>
NEURO_DRIVE_TICK_INTERVAL = <span class="str">30.0</span>
NEURO_DRIVE_PRESSURE_THRESHOLD = <span class="str">0.5</span>
NEURO_DRIVE_CURIOSITY_THRESHOLD = <span class="str">0.4</span>
NEURO_DRIVE_NOVELTY_MIN = <span class="str">0.2</span>
NEURO_DRIVE_IDLE_PRESSURE_RATE = <span class="str">0.05</span></code></pre>

      <h3>Step 8 — schema.py (MODIFY)</h3>
      <pre><code><span class="kw">CREATE TABLE IF NOT EXISTS</span> neuro_drive_log (
    id <span class="type">TEXT</span> PRIMARY KEY,
    tick <span class="type">INTEGER</span> NOT NULL,
    intent <span class="type">TEXT</span> NOT NULL,
    confidence <span class="type">REAL</span>,
    success <span class="type">INTEGER</span> DEFAULT <span class="str">0</span>,
    kira_state <span class="type">TEXT</span>,
    fitness <span class="type">REAL</span>,
    duration_ms <span class="type">INTEGER</span>,
    created <span class="type">INTEGER</span> NOT NULL
);</code></pre>

      <h3>Step 9 — main.py (MODIFY)</h3>
      <p>Wire IntentEngine, EnvironmentModel, NeuroDriveLoop. Feature-flag swap with PersistentWorkLoop.</p>
      <pre><code><span class="kw">if</span> NEURO_DRIVE_ENABLED:
    active_loop = components[<span class="str">"neuro_drive"</span>]
    gui.<span class="fn">terminal_write</span>(<span class="str">"Neuro-drive online"</span>, <span class="str">"ok"</span>)
<span class="kw">else</span>:
    active_loop = work_loop
    gui.<span class="fn">terminal_write</span>(<span class="str">"Starting autonomous learning loop..."</span>, <span class="str">"ok"</span>)

drive_task = asyncio.<span class="fn">create_task</span>(active_loop.<span class="fn">run</span>())</code></pre>

      <h3>Data Flow Per Tick</h3>
      <div class="rh-data-flow"><span class="node">MotivationEngine.update()</span>            <span class="node">EnvironmentModel.update()</span>
 <span class="arrow">│</span> <span class="field">curiosity_level</span>                  <span class="arrow">│</span> <span class="field">fitness, density, unfinished</span>
 <span class="arrow">│</span> <span class="field">pressure_level</span>                   <span class="arrow">│</span>
 <span class="arrow">└──────────── </span><span class="label">merge</span><span class="arrow"> ─────────────────┘</span>
                <span class="arrow">│</span>
                <span class="arrow">▼</span>
          <span class="node">KiraState</span>
 (<span class="field">curiosity, pressure, stability, novelty_reward,</span>
  <span class="field">environment_density, unfinished_nodes, idle_ticks</span>)
                <span class="arrow">│</span>
                <span class="arrow">▼</span>
      <span class="node">IntentEngine.select()</span>
                <span class="arrow">│</span>
                <span class="arrow">▼</span>
        <span class="node">IntentDecision</span>
 (<span class="decision">REPAIR</span> | <span class="decision">EXPAND</span> | <span class="decision">EXPERIMENT</span> | <span class="decision">OBSERVE</span>)
                <span class="arrow">│</span>
                <span class="arrow">▼</span>
       <span class="node">Behavior Handler</span>
 (<span class="field">TaskGen+Executor</span> | <span class="field">Bridge</span> | <span class="field">LLM</span> | <span class="field">Researcher</span>)
                <span class="arrow">│</span>
                <span class="arrow">▼</span>
         <span class="node">Outcome</span> (<span class="type">bool</span>)
                <span class="arrow">│</span>
                <span class="arrow">▼</span>
   <span class="node">IntentEngine.record_outcome()</span>
 <span class="arrow">→</span> <span class="field">Updated KiraState</span>
 <span class="arrow">→</span> <span class="field">Broadcast to Unity bridge</span></div>
    `,
  },
];

export const systemTags = [
  'EARE', 'EXOKIN', 'CombatEngine', 'CombatSystem', 'AIController',
  'NeuroDriveLoop', 'KiraState', 'IntentEngine', 'EnvironmentModel',
  'Unity Bridge', 'PersistentWorkLoop', 'MotivationEngine',
  'TaskGenerator', 'NeuralRuntime', 'CognitiveSystem',
];
