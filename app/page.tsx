"use client";

import { useState } from "react";

const scenarios = {
  市场: {
    title: "从一次活动，到一套可复用的内容生产线",
    prompt: "基于新品资料，生成发布会方案、公众号文章和渠道海报文案，并同步到团队 Wiki。",
    outputs: ["发布会策划案.docx", "全渠道文案包", "活动复盘 Wiki"],
    stats: ["文档与创意生成", "团队技能复用", "资产自动沉淀"],
  },
  销售: {
    title: "把散落的客户信息，变成可执行的跟进计划",
    prompt: "汇总 CRM、会议纪要和销售表，识别高风险客户，生成本周跟进清单。",
    outputs: ["风险客户清单.xlsx", "管理层简报", "跟进自动化"],
    stats: ["连接实时业务数据", "多源信息分析", "结果定时推送"],
  },
  人力: {
    title: "让组织洞察不止停留在基础统计",
    prompt: "整合考勤、会议与协作数据，分析团队负荷，给出组织风险和改进建议。",
    outputs: ["组织负荷看板", "异常洞察报告", "管理建议清单"],
    stats: ["DataHub 数据建模", "自然语言问数", "行列权限控制"],
  },
  研发: {
    title: "从需求理解到应用交付，都在一个任务里完成",
    prompt: "阅读 PRD 与接口文档，搭建内部查询工具，完成代码检查并生成上线说明。",
    outputs: ["可运行应用", "代码审查报告", "上线说明文档"],
    stats: ["应用与技能开发", "本地安全执行", "企业内发布"],
  },
  管理层: {
    title: "每天只看一页，也能掌握业务全貌",
    prompt: "汇总经营数据、关键会议与项目进展，生成今日高管简报并标出待决策事项。",
    outputs: ["今日经营简报", "风险事项清单", "决策材料包"],
    stats: ["跨系统汇总", "自动生成简报", "云端持续执行"],
  },
};

type Scenario = keyof typeof scenarios;

const scenarioPreviews: Record<Scenario, {
  columns: string[];
  rows: string[][];
  metrics: { label: string; value: string }[];
  insight: string;
  steps: string[];
  schedule: string;
}> = {
  市场: {
    columns: ["内容资产", "渠道", "状态"],
    rows: [["新品核心卖点", "全渠道", "已统一"], ["发布会方案", "线下活动", "可交付"], ["公众号长文", "微信", "待发布"]],
    metrics: [{ label: "生成内容", value: "18 篇" }, { label: "覆盖渠道", value: "6 个" }],
    insight: "新品的“团队协同”卖点在渠道文案中反馈最好。",
    steps: ["汇总素材", "生成内容", "沉淀 Wiki"],
    schedule: "活动结束后自动复盘",
  },
  销售: {
    columns: ["客户", "风险", "下一步"],
    rows: [["启明科技", "高", "今日回访"], ["华曜零售", "中", "补充方案"], ["远洲制造", "高", "主管介入"]],
    metrics: [{ label: "风险客户", value: "12 家" }, { label: "预计影响", value: "¥86 万" }],
    insight: "三家重点客户连续两周无有效跟进，建议优先介入。",
    steps: ["同步 CRM", "生成话术", "提醒负责人"],
    schedule: "每个工作日 09:00",
  },
  人力: {
    columns: ["团队", "负荷", "建议"],
    rows: [["产品一组", "92%", "调整排期"], ["华东销售", "81%", "补充支持"], ["客户成功", "74%", "持续观察"]],
    metrics: [{ label: "高负荷团队", value: "3 个" }, { label: "异常波动", value: "+18%" }],
    insight: "跨部门会议增加是本周团队负荷上升的主要原因。",
    steps: ["汇总协作数据", "识别异常", "推送建议"],
    schedule: "每周一 08:30",
  },
  研发: {
    columns: ["交付项", "检查", "结果"],
    rows: [["查询应用", "用例测试", "通过"], ["接口调用", "权限校验", "通过"], ["上线说明", "内容检查", "已生成"]],
    metrics: [{ label: "完成任务", value: "24 项" }, { label: "代码问题", value: "3 个" }],
    insight: "发现三个边界条件问题，已给出修改建议和对应代码。",
    steps: ["读取 PRD", "构建与检查", "发布应用"],
    schedule: "合并代码后自动检查",
  },
  管理层: {
    columns: ["经营指标", "本期", "变化"],
    rows: [["新增收入", "¥328 万", "+12%"], ["续约率", "91.4%", "+2.1%"], ["重点风险", "5 项", "需决策"]],
    metrics: [{ label: "待决策事项", value: "5 项" }, { label: "整体达成", value: "96%" }],
    insight: "华东新客增长抵消了续费回落，五项风险需要本周决策。",
    steps: ["汇总经营数据", "标记风险", "生成晨报"],
    schedule: "每天 07:30",
  },
};

export default function Home() {
  const [scenario, setScenario] = useState<Scenario>("市场");
  const [mode, setMode] = useState<"本地" | "云端">("本地");
  const activeScenario = scenarios[scenario];
  const activePreview = scenarioPreviews[scenario];

  return (
    <main>
      <section className="hero" data-screen-label="WPS AI 企业版首页">
        <nav className="nav-shell" aria-label="主导航">
          <a className="brand" href="#top" aria-label="WPS AI 首页">
            <span className="brand-mark">W</span>
            <span>WPS AI</span>
            <em>企业版</em>
          </a>
          <div className="nav-links">
            <a href="#capabilities">能力</a>
            <a href="#scenarios">场景</a>
            <a href="#plans">企业方案</a>
            <a href="#security">安全与管理</a>
          </div>
          <a className="nav-cta" href="#contact">申请企业体验</a>
        </nav>

        <div className="hero-grid" id="top">
          <div className="hero-copy">
            <div className="eyebrow"><span></span> 面向企业的一站式 AI 工作平台</div>
            <h1>从一句话，<br /><strong>到一套交付成果</strong></h1>
            <p className="hero-lead">
              WPS AI 能写文档、做表格、生成演示、分析数据、开发应用，也能连接企业知识和业务系统，持续执行复杂任务。
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#contact">申请企业体验 <span>↗</span></a>
              <a className="text-btn" href="#capabilities">看看能做什么 <span>↓</span></a>
            </div>
            <div className="hero-includes">
              <small>企业版包含</small>
              <div className="hero-capability-list">
                <span>智能文档</span><span>表格分析</span><span>演示生成</span><span>企业问数</span>
                <span>AI 专家</span><span>技能与应用</span><span>团队协作</span><span>自动化</span>
              </div>
            </div>
          </div>

          <div className="hero-product" aria-label="WPS AI 任务台示意">
            <div className="product-glow"></div>
            <div className="app-window">
              <div className="window-top">
                <div className="window-brand"><span className="mini-mark">W</span> WPS Comate</div>
                <div className="window-status"><i></i> 企业空间 · 安全运行</div>
              </div>
              <div className="window-body">
                <aside className="side-rail" aria-label="任务导航">
                  <b>＋</b><span></span><span></span><span></span><span></span>
                </aside>
                <div className="task-canvas">
                  <div className="task-heading">
                    <small>本机任务</small>
                    <h3>有什么可以帮你？</h3>
                  </div>
                  <div className="prompt-card">
                    <p>分析本季度销售数据，生成管理层简报，并把风险客户整理成跟进表。</p>
                    <div className="prompt-tools"><span>＋ 文件</span><span>@ 企业数据</span><b>↑</b></div>
                  </div>
                  <div className="execution-row">
                    <div><i className="violet"></i><span>读取销售表</span><small>已完成</small></div>
                    <div><i className="pink"></i><span>分析异常</span><small>进行中</small></div>
                    <div><i className="blue"></i><span>生成简报</span><small>等待</small></div>
                  </div>
                </div>
              </div>
              <div className="capability-float">
                <small>一次任务，多种能力协同</small>
                <div><span>文档</span><i>→</i><span>数据</span><i>→</i><span>演示</span></div>
                <b>已交付 3 项成果</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="plans-section section-pad" id="plans" data-screen-label="企业方案">
        <div className="section-head plan-head">
          <span className="section-kicker">WPS AI FOR BUSINESS</span>
          <h2>按企业使用规模，<br />选择合适的方案</h2>
        </div>

        <div className="plan-layout">
          <article className="plan-card">
            <div className="plan-top"><span>企业基础方案</span><small>适合小规模试用与核心团队</small></div>
            <div className="plan-price"><b>¥4,980</b><span>/ 年</span></div>
            <div className="plan-usage"><small>年度包含 AI 使用量</small><strong>10 万点</strong></div>
            <ul><li>完整 WPS AI 核心能力</li><li>本地与云端任务执行</li><li>企业权限与使用管理</li><li>支持企业自购模型接入</li></ul>
            <a href="#contact">咨询企业方案 <span>→</span></a>
          </article>

          <article className="plan-card featured">
            <div className="plan-badge">更适合规模化使用</div>
            <div className="plan-top"><span>企业进阶方案</span><small>适合多部门与高频业务场景</small></div>
            <div className="plan-price"><b>¥46,800</b><span>/ 年</span></div>
            <div className="plan-usage"><small>年度包含 AI 使用量</small><strong>100 万点</strong></div>
            <ul><li>完整 WPS AI 核心能力</li><li>本地与云端任务执行</li><li>企业权限与使用管理</li><li>支持企业自购模型接入</li></ul>
            <a href="#contact">咨询企业方案 <span>→</span></a>
          </article>

        </div>

        <p className="plan-footnote">价格为企业年度方案参考价；AI 点数仅用于衡量模型与任务使用量，不影响能力范围。实际采购与服务范围以合同为准。</p>
      </section>

      <section className="included-section section-pad" data-screen-label="WPS AI 能力全景">
        <div className="section-head overview-head">
          <span className="section-kicker">EVERYTHING YOUR TEAM NEEDS</span>
          <h2>从创作到执行，<br />都在同一个 WPS AI</h2>
          <div className="overview-legend"><span>办公创作</span><span>数据与知识</span><span>应用与专家</span><span>团队与自动化</span></div>
        </div>

        <div className="capability-showcase">
          <article className="showcase-card creation-suite">
            <div className="showcase-copy"><span>办公创作</span><h3>一份材料，变成三种可交付成果</h3><p>写文档、做表格、生成演示，内容在 WPS 办公组件之间自然流动。</p></div>
            <div className="creation-canvas">
              <div className="doc-sheet"><small>市场分析报告</small><b></b><b></b><b></b><span>W</span></div>
              <div className="sheet-grid"><i></i><i></i><i></i><i></i><i></i><i></i><span>X</span></div>
              <div className="slide-sheet"><strong>Q3</strong><small>经营复盘</small><span>P</span></div>
              <div className="creation-link"><i></i><i></i><i></i></div>
            </div>
          </article>

          <article className="showcase-card intelligence-suite">
            <div className="showcase-copy"><span>数据与知识</span><h3>企业数据，开口就能问</h3><p>连接数据、建立业务语义，让会议、文档和系统数据成为可靠答案。</p></div>
            <div className="insight-canvas">
              <div className="insight-question">“本季度增长来自哪里？”</div>
              <div className="insight-bars"><i></i><i></i><i></i><i></i><i></i></div>
              <div className="insight-answer"><span>主要增长驱动</span><b>华东区域 · 新客</b></div>
            </div>
          </article>

          <article className="showcase-card expert-suite">
            <div className="showcase-copy"><span>应用与专家</span><h3>把经验做成会工作的 AI</h3><p>创建企业专家、技能和应用，让 AI 按业务方法自主执行复杂任务。</p></div>
            <div className="agent-canvas">
              <div className="agent-core"><small>企业专家</small><b>AI</b></div>
              <span>岗位 SOP</span><span>团队技能</span><span>业务数据</span><span>应用工具</span>
            </div>
          </article>

          <article className="showcase-card collaboration-suite">
            <div className="showcase-copy"><span>团队与自动化</span><h3>人和 Agent，在同一个任务里协作</h3><p>共享任务上下文与成果资产，连接业务系统，并按时间或事件持续运行。</p></div>
            <div className="collaboration-canvas">
              <div className="collab-people"><span>产品</span><span>运营</span><span>销售</span><span>AI</span></div>
              <div className="workflow-track"><i></i><b>汇总进展</b><i></i><b>生成周报</b><i></i><b>自动发送</b></div>
              <div className="workflow-status"><span><i></i> 每周五 18:00</span><b>运行中</b></div>
            </div>
          </article>
        </div>
      </section>

      <section className="capability-section section-pad" id="capabilities" data-screen-label="WPS AI 能力矩阵">
        <div className="section-head dark-head">
          <span className="section-kicker">COMATE-POWERED CAPABILITIES</span>
          <h2>一个入口，调动整个组织的 AI 能力</h2>
          <p>WPS Comate 把岗位经验、业务数据和工具能力，编排成能够持续执行任务的企业 AI。</p>
        </div>

        <div className="capability-grid">
          <article className="cap-card execution-card">
            <div className="cap-label">双引擎任务执行</div>
            <h3>数据在哪里，任务就在哪里执行</h3>
            <p>本地模式操作本机文件；云端托管持续运行长任务、连接业务系统。企业可按安全与效率要求灵活选择。</p>
            <div className="mode-switch" role="group" aria-label="执行模式">
              <button onClick={() => setMode("本地")} className={mode === "本地" ? "active" : ""}>本地执行</button>
              <button onClick={() => setMode("云端")} className={mode === "云端" ? "active" : ""}>云端托管</button>
            </div>
            <div className={`mode-demo ${mode === "云端" ? "cloud" : ""}`}>
              <div className="device-shape"><span></span><i></i></div>
              <div className="mode-line"><i></i><i></i><i></i></div>
              <div className="mode-copy"><b>{mode === "本地" ? "文件留在本机" : "关机后继续执行"}</b><small>{mode === "本地" ? "受控访问指定工作目录" : "连接企业数据与云端能力"}</small></div>
            </div>
          </article>

          <article className="cap-card office-card">
            <div className="cap-icon sheets">文</div>
            <div><div className="cap-label">Office 创作</div><h3>文档、表格、演示一起做</h3><p>生成或编辑智能文档，分析表格、生成公式与配图，也能完成演示文稿。</p></div>
            <div className="file-stack"><span>季度经营分析.docx</span><span>经营数据表.xlsx</span><span>汇报材料.pptx</span></div>
          </article>

          <article className="cap-card expert-card">
            <div className="cap-label">企业 AI 专家</div>
            <h3>把专家员工的经验，变成组织能力</h3>
            <p>将多项技能、组织数据与业务 SOP 组合成专属专家，按范围授权、发布与持续运营。</p>
            <div className="expert-orbit"><div className="expert-core">AI</div><span>知识</span><span>技能</span><span>数据</span><span>流程</span></div>
          </article>

          <article className="cap-card data-card">
            <div className="cap-label">DataHub 数据智能</div>
            <h3>让 AI 读懂企业数据，而不只是看到表格</h3>
            <div className="data-pipeline"><span>连接</span><i>→</i><span>治理</span><i>→</i><span>建模</span><i>→</i><span>问数</span></div>
            <p>接入多源业务数据，完成清洗、语义建模和行列权限控制，支持自然语言问数。</p>
          </article>

          <article className="cap-card team-card">
            <div className="cap-label">多人 × 多 Agent</div>
            <h3>把 AI 从个人助手，升级为团队基础设施</h3>
            <div className="avatar-row"><span>产品</span><span>运营</span><span>销售</span><span>AI</span></div>
            <p>团队共享任务上下文、技能、应用、Wiki 与文档资产，多人和多个专家在同一空间协作。</p>
          </article>

          <article className="cap-card build-card">
            <div className="cap-label">技能、应用与代码</div>
            <h3>需要的能力，边用边造</h3>
            <p>发现、安装、创建技能；通过自然语言开发应用与代码，并按企业或团队范围发布。</p>
            <div className="code-lines"><i></i><i></i><i></i><i></i></div>
          </article>

          <article className="cap-card knowledge-card">
            <div className="cap-label">Wiki 长期记忆</div>
            <h3>让会议、文档和对话持续成为生产资料</h3>
            <p>将分散信息自动编译为结构化知识，团队共建共享，任务可随时引用。</p>
            <div className="wiki-visual"><span>会议纪要</span><span>项目文档</span><span>团队对话</span><b>组织记忆</b></div>
          </article>

          <article className="cap-card connector-card">
            <div className="cap-label">连接器与自动化</div>
            <h3>连上业务系统，AI 才能真正做事</h3>
            <p>按需查询实时企业数据、调用外部工具，并通过定时或事件触发持续完成重复工作。</p>
            <div className="connector-list"><span>CRM</span><span>ERP</span><span>邮件</span><span>会议</span><span>WPS 365</span></div>
          </article>
        </div>
      </section>

      <section className="delivery-section section-pad" data-screen-label="从指令到交付">
        <div className="section-head split-head">
          <div><span className="section-kicker">FROM PROMPT TO OUTCOME</span><h2>一句话出发，<br />以可交付成果结束</h2></div>
          <p>它会读取组织上下文、选择合适的技能与模型、执行多步任务，并把结果交付为 WPS 文档、表格、应用或自动化。</p>
        </div>
        <div className="delivery-flow">
          <div className="flow-prompt"><small>你的业务需求</small><p>“整理本周项目进展，分析风险，并生成周会材料发给项目组。”</p></div>
          <div className="flow-arrow">→</div>
          <div className="flow-engine"><span>理解上下文</span><span>调用团队技能</span><span>执行多步任务</span><span>检查交付结果</span></div>
          <div className="flow-arrow">→</div>
          <div className="flow-output"><div><b>周会材料.pptx</b><small>已生成</small></div><div><b>风险清单.xlsx</b><small>已生成</small></div><div><b>项目组消息</b><small>已发送</small></div></div>
        </div>
      </section>

      <section className="scenario-section section-pad" id="scenarios" data-screen-label="企业场景">
        <div className="section-head centered-head"><span className="section-kicker">BUILT FOR EVERY TEAM</span><h2>每个岗位，都有一条更短的交付路径</h2></div>
        <div className="scenario-tabs" role="tablist" aria-label="部门场景">
          {(Object.keys(scenarios) as Scenario[]).map((item) => <button key={item} role="tab" aria-selected={scenario === item} className={scenario === item ? "active" : ""} onClick={() => setScenario(item)}>{item}</button>)}
        </div>
        <div className="scenario-stage" key={scenario}>
          <div className="scenario-copy">
            <span className="scenario-number">0{(Object.keys(scenarios) as Scenario[]).indexOf(scenario) + 1}</span>
            <h3>{activeScenario.title}</h3>
            <div className="scenario-prompt"><small>交给 WPS AI</small><p>{activeScenario.prompt}</p></div>
            <div className="scenario-tags">{activeScenario.stats.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
          <div className="scenario-output">
            <div className="output-head"><span><i></i> 任务已完成</span><small>共执行 12 步 · 3 分 18 秒</small></div>
            <div className="result-workspace">
              <article className="artifact-preview table-artifact">
                <header><span>X</span><div><small>表格成果</small><b>{activeScenario.outputs[0]}</b></div><i>↗</i></header>
                <div className="artifact-table">
                  <div className="artifact-row artifact-columns">{activePreview.columns.map((item) => <span key={item}>{item}</span>)}</div>
                  {activePreview.rows.map((row, rowIndex) => <div className="artifact-row" key={row.join("-")}>
                    {row.map((item, itemIndex) => <span className={itemIndex === 1 && rowIndex !== 2 ? "emphasis" : ""} key={item}>{item}</span>)}
                  </div>)}
                </div>
                <footer><span>AI 已整理并标记重点</span><b>查看完整表格 →</b></footer>
              </article>

              <div className="artifact-side">
                <article className="artifact-preview brief-artifact">
                  <header><span>W</span><div><small>管理摘要</small><b>{activeScenario.outputs[1]}</b></div><i>↗</i></header>
                  <div className="metric-preview">{activePreview.metrics.map((item) => <div key={item.label}><small>{item.label}</small><b>{item.value}</b></div>)}</div>
                  <p><i></i>{activePreview.insight}</p>
                </article>

                <article className="artifact-preview automation-artifact">
                  <header><span>A</span><div><small>自动化任务</small><b>{activeScenario.outputs[2]}</b></div><i>↗</i></header>
                  <div className="automation-track">{activePreview.steps.map((item) => <span key={item}><i></i><b>{item}</b></span>)}</div>
                  <footer><small>{activePreview.schedule}</small><b><i></i> 已启用</b></footer>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="security-section section-pad" id="security" data-screen-label="安全与管理">
        <div className="security-shell">
          <div className="security-copy">
            <span className="section-kicker">ENTERPRISE CONTROL</span>
            <h2>规模化使用 AI，<br />从可控开始</h2>
            <p>从模型、权限、数据到运行过程，把企业最关心的治理能力贯穿每一次任务。</p>
            <a href="#contact">了解企业安全方案 <span>→</span></a>
          </div>
          <div className="security-grid">
            <article><span>权限</span><h3>角色与范围控制</h3><p>按角色分配权限点，控制专家、技能、数据、应用与连接器的可见和使用范围。</p></article>
            <article><span>数据</span><h3>本地与私有化</h3><p>本地任务可受控访问指定目录，也支持全栈私有化，满足敏感数据与合规要求。</p></article>
            <article><span>过程</span><h3>调用可追溯</h3><p>查看技能和连接器调用详情、执行步骤与耗时，关键过程清晰可查。</p></article>
            <article><span>运营</span><h3>资产与用量看板</h3><p>统一查看专家、技能、数据、连接与应用的数量、活跃度和调用趋势。</p></article>
          </div>
        </div>
      </section>

      <section className="cta-section section-pad" id="contact" data-screen-label="企业体验申请">
        <div className="cta-glow one"></div><div className="cta-glow two"></div>
        <div className="cta-inner">
          <span className="section-kicker">WPS AI FOR BUSINESS</span>
          <h2>让 AI 成为组织的<br />下一种工作方式</h2>
          <p>用一个入口完成文档、数据、应用、知识与业务执行，让每个团队都拥有会交付的 AI 工作伙伴。</p>
          <div className="cta-actions"><a className="primary-btn light" href="#top">申请企业体验 <span>↗</span></a><a className="cta-secondary" href="#plans">查看企业方案</a></div>
        </div>
      </section>

      <footer>
        <div className="brand"><span className="brand-mark">W</span><span>WPS AI</span><em>企业版</em></div>
        <p>当前企业 AI 核心能力由 WPS Comate 提供。页面为产品方案设计稿，具体能力与权益以实际发布为准。</p>
        <span>© 2026 WPS AI</span>
      </footer>
    </main>
  );
}
