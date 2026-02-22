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
      <p>The entire Enterprise UI has been replaced with a spatial, draggable agent command surface. No forms. No sidebars. A live canvas where AI agents are spawned, configured, and orchestrated in real time.</p>

      <h3>Context</h3>
      <p>Traditional enterprise dashboards bury AI capabilities behind menus, tabs, and form fields. The orchestration layer was rebuilt from the ground up as a spatial workspace — a canvas where agents exist as draggable, configurable nodes.</p>

      <h3>Architecture</h3>
      <p>Each agent is a self-contained unit on the canvas: spawned with a role, configured with constraints, connected to data sources via drag-link. No modal dialogs. No settings pages. Everything lives on the surface.</p>
      <p>Agents communicate through visible connection lines. Data flows are observable. Conflicts are surfaced spatially — if two agents compete for the same resource, you see it.</p>

      <h3>Orchestration Model</h3>
      <p>The workspace supports real-time multi-agent orchestration. Spawn a researcher, a writer, and a reviewer — connect them in sequence or parallel. The canvas becomes the program.</p>
      <p>Agent state is persistent. Close the browser, come back, agents are still running. The workspace is a live operations floor, not a form submission interface.</p>

      <h3>Outcome</h3>
      <p>Enterprise users configure complex multi-agent workflows without writing configuration files or navigating nested UIs. The spatial model maps directly to how orchestration actually works — parallel processes, sequential handoffs, shared context.</p>
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
      <p>The goal is not a chatbot with storage. The goal is a persistent neural runtime — a system that continuously learns from interaction, develops operational instincts, and evolves its behavior through experience.</p>

      <h3>Core Premise</h3>
      <p>Current AI systems are stateless. Each session starts cold. Context is injected, not remembered. The neural runtime specification defines a system where cognition persists across sessions, interactions, and deployments.</p>

      <h3>Memory Architecture</h3>
      <p>Three-tier memory: working memory (current session), episodic memory (past interactions with salience scoring), and procedural memory (learned behaviors encoded as weighted decision patterns). Each tier operates independently but feeds into a unified reasoning loop.</p>

      <h3>Operational Instincts</h3>
      <p>Over time, the runtime develops instincts — not hard-coded rules, but probabilistic preferences shaped by outcomes. A runtime that has handled thousands of deployment errors doesn't need to reason from first principles each time. It recognizes the pattern and acts.</p>

      <h3>Evolution Mechanics</h3>
      <p>Behavior evolution is controlled by a fitness function tied to task completion, user satisfaction, and self-assessed confidence. The system prunes behaviors that consistently underperform and reinforces those that succeed. No manual tuning required.</p>

      <h3>Constraints</h3>
      <p>The specification enforces guardrails: memory decay prevents unbounded growth, behavioral drift is monitored against baseline profiles, and all evolved behaviors are auditable. The system learns, but within bounds.</p>
    `,
  },
  {
    slug: 'fight-simulator',
    title: 'Fight Simulator — EXOKIN vs NPC Combat System',
    type: 'SPEC',
    subtype: 'v1.0',
    date: '2026-02-16',
    tags: ['EXOKIN', 'COMBAT', 'EARE', 'PHYSICS'],
    systems: ['EXOKIN'],
    summary: 'Full-stack combat architecture: dual-layer engine (turn-based + real-time physics), EARE-driven creature calibration, AI opponents, and procedural fight presentation — your EXOKIN fights on your behalf.',
    content: `
      <p>Full-stack combat architecture: dual-layer engine (turn-based + real-time physics), EARE-driven creature calibration, AI opponents, and procedural fight presentation — your EXOKIN fights on your behalf.</p>

      <h3>Dual-Layer Engine</h3>
      <p>Combat operates on two simultaneous layers. The strategic layer is turn-based: ability selection, positioning, resource management. The execution layer is real-time physics: collisions, knockback, environmental interaction. Both layers resolve simultaneously.</p>

      <h3>EARE Integration</h3>
      <p>Each EXOKIN's combat capabilities are calibrated by the Autonomous Regulation Engine. No stat sheets defined by designers. The creature's combat profile emerges from its evolutionary history — what it has fought, how it has adapted, what it has survived.</p>

      <h3>AI Opponents</h3>
      <p>NPC opponents use a simplified version of the same EARE loop. They adapt mid-fight. Repeated strategies lose effectiveness. The AI reads patterns and adjusts — not through scripted difficulty curves, but through genuine behavioral adaptation.</p>

      <h3>Procedural Presentation</h3>
      <p>Fight sequences are procedurally animated. Camera angles, impact effects, and pacing are generated based on the combat state. A close match gets dramatic framing. A stomp gets efficient presentation. The system directs its own cinematography.</p>
    `,
  },
  {
    slug: 'build-log-0215',
    title: 'Daily Build Log — 2026-02-15',
    type: 'REPORT',
    subtype: 'Build Log',
    date: '2026-02-15',
    tags: ['BUILD-LOG', 'WORLD-BUILDER', 'COMBAT', 'PHYSICS'],
    systems: ['EXOKIN'],
    summary: 'Main-branch delivery focused on World Builder authority/editor UX, physics-based combat polish, and environment collision stabilization — with deployment checkpoints captured in the commit stream.',
    content: `
      <p>Main-branch delivery focused on World Builder authority/editor UX, physics-based combat polish, and environment collision stabilization — with deployment checkpoints captured in the commit stream.</p>

      <h3>World Builder</h3>
      <p>Authority model refactored. Editors now operate in a sandboxed preview layer before committing changes to the live world state. Undo/redo stack implemented at the operation level, not the UI level.</p>

      <h3>Combat Polish</h3>
      <p>Hit detection tightened. Knockback physics now respect mass differentials. Lightweight EXOKIN get thrown further. Heavy creatures barely flinch. The physics feel right.</p>

      <h3>Environment Collisions</h3>
      <p>Terrain collision meshes regenerated with higher fidelity on player-proximate chunks. Distant terrain uses simplified collision. Performance cost reduced by 40% with no perceptible quality loss in the play area.</p>

      <h3>Deployment</h3>
      <p>Three staged deployments across the session. Each checkpoint validated against the integration test suite before promotion. Zero rollbacks.</p>
    `,
  },
  {
    slug: 'eare',
    title: 'EARE — EXOKIN Autonomous Regulation Engine',
    type: 'SPEC',
    subtype: 'v1.0',
    date: '2026-02-13',
    tags: ['EXOKIN', 'EARE', 'AUTONOMOUS'],
    systems: ['EXOKIN'],
    summary: 'Anti-gravity prompt: convert EXOKIN from a static ruleset into a self-regulating, autonomous species layer. No manual tuning; roles and behavior emerge from experience.',
    content: `
      <p>Anti-gravity prompt: convert EXOKIN from a static ruleset into a self-regulating, autonomous species layer. No manual tuning; roles and behavior emerge from experience.</p>

      <h3>Problem</h3>
      <p>Traditional creature systems are designer-defined. Stats, abilities, and behaviors are configured in spreadsheets. Balance requires constant manual adjustment. Creatures feel static because they are static.</p>

      <h3>EARE Model</h3>
      <p>The Autonomous Regulation Engine replaces static configuration with a feedback loop. Each EXOKIN starts with a minimal base profile. Through interaction — combat, exploration, social behavior — the creature's capabilities evolve. Strengths are reinforced. Weaknesses are compensated or accepted as trade-offs.</p>

      <h3>Role Emergence</h3>
      <p>Roles are not assigned. They emerge. An EXOKIN that repeatedly engages in frontline combat develops durability. One that avoids direct conflict develops speed or utility. The population self-organizes into an ecosystem of specialists without any designer defining the roles.</p>

      <h3>Regulation</h3>
      <p>The engine monitors population-level statistics. If a particular evolutionary path becomes dominant, environmental pressures increase against it. The system maintains diversity through pressure, not caps. No hard limits — just ecological consequences.</p>
    `,
  },
  {
    slug: 'euro-drive',
    title: 'EURO-DRIVE — Autonomous World Builder Engine',
    type: 'SPEC',
    subtype: 'v1.0',
    date: '2026-02-12',
    tags: ['KIRA', 'NEURO-DRIVE', 'AUTONOMOUS'],
    systems: ['KIRA'],
    summary: 'Neuro-drive loop specification for continuous autonomous world-building in KIRA.',
    content: `
      <p>Neuro-drive loop specification for continuous autonomous world-building in KIRA. The engine operates as a persistent background process that generates, populates, and evolves world content without human intervention.</p>

      <h3>Loop Architecture</h3>
      <p>The neuro-drive loop runs continuously: observe world state, identify gaps or opportunities, generate content proposals, validate against coherence rules, deploy. The loop never stops. The world is always growing.</p>

      <h3>Content Generation</h3>
      <p>Terrain, structures, flora, fauna, and narrative elements are generated procedurally within style and lore constraints. Each generated element is validated against existing world context to ensure coherence. No random noise — every addition has a reason.</p>

      <h3>Evolution</h3>
      <p>Placed content evolves over time. Structures weather. Vegetation grows or dies based on environmental conditions. Abandoned areas decay. Active areas develop. The world ages in real time.</p>

      <h3>Autonomy Boundaries</h3>
      <p>The engine respects designated zones: player-built areas are protected, quest-critical locations are anchored, and high-traffic regions evolve conservatively. Autonomy is full in wilderness zones, constrained in civilized ones.</p>
    `,
  },
];

export const systemTags = [
  'EARE', 'EXOKIN', 'CombatEngine', 'CombatSystem', 'AIController',
  'NeuroDriveLoop', 'KiraState', 'IntentEngine', 'EnvironmentModel',
  'Unity Bridge', 'PersistentWorkLoop', 'MotivationEngine',
  'TaskGenerator', 'NeuralRuntime', 'CognitiveSystem',
];
