"use client";

import { useState } from "react";

const quotaViews = {
  全企业: [
    { label: "知识工作", value: 78, amount: "1,248 万点" },
    { label: "数据分析", value: 62, amount: "992 万点" },
    { label: "应用与代码", value: 41, amount: "656 万点" },
    { label: "系统调用", value: 28, amount: "448 万点" },
  ],
  按部门: [
    { label: "市场中心", value: 86, amount: "860 万点" },
    { label: "销售中心", value: 72, amount: "720 万点" },
    { label: "产品研发", value: 54, amount: "540 万点" },
    { label: "职能中心", value: 35, amount: "350 万点" },
  ],
  按能力: [
    { label: "普通任务", value: 82, amount: "1,312 万点" },
    { label: "应用任务", value: 68, amount: "1,088 万点" },
    { label: "AI 专家", value: 45, amount: "720 万点" },
    { label: "系统调用", value: 24, amount: "384 万点" },
  ],
};

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

type QuotaView = keyof typeof quotaViews;
type Scenario = keyof typeof scenarios;

export default function Home() {
  const [quotaView, setQuotaView] = useState<QuotaView>("全企业");
  const [scenario, setScenario] = useState<Scenario>("市场");
  const [mode, setMode] = useState<"本地" | "云端">("本地");
  const activeScenario = scenarios[scenario];

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
            <a href="#credits">AI 额度</a>
            <a href="#capabilities">能力</a>
            <a href="#scenarios">场景</a>
            <a href="#security">安全与管理</a>
          </div>
          <a className="nav-cta" href="#contact">申请企业体验</a>
        </nav>

        <div className="hero-grid" id="top">
          <div className="hero-copy">
            <div className="eyebrow"><span></span> 当前由 WPS Comate 驱动</div>
            <h1>给每个团队一支<br /><strong>会交付的 AI 队伍</strong></h1>
            <p className="hero-lead">
              一份企业 AI 额度，驱动文档、数据、代码、知识与业务系统协同。让 AI 不只回答问题，更能理解组织、执行任务、交付结果。
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#contact">申请企业体验 <span>↗</span></a>
              <a className="text-btn" href="#credits">了解额度方案 <span>↓</span></a>
            </div>
            <div className="trust-row">
              <span>本地 + 云端双引擎</span>
              <span>按人 / 部门 / 能力分配</span>
              <span>企业权限与审计</span>
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
              <div className="quota-float">
                <div><span>本月 AI 额度</span><b>61%</b></div>
                <div className="quota-track"><i></i></div>
                <small>自动匹配 Flash / Pro 模型</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="credit-section section-pad" id="credits" data-screen-label="企业 AI 额度">
        <div className="section-head split-head">
          <div>
            <span className="section-kicker">ENTERPRISE AI CREDITS</span>
            <h2>一份额度，<br />把 AI 按组织方式用起来</h2>
          </div>
          <p>额度不是一张简单账单，而是一套可配置、可追踪的企业 AI 运营机制。默认全员可用，也能按企业、部门、成员与能力精细管理。</p>
        </div>

        <div className="quota-layout">
          <div className="quota-dashboard">
            <div className="dashboard-top">
              <div><small>企业 AI 额度中心 · 示例</small><strong>3,200<span>万点 / 月</span></strong></div>
              <span className="status-pill">额度充足</span>
            </div>
            <div className="quota-tabs" role="tablist" aria-label="额度视图">
              {(Object.keys(quotaViews) as QuotaView[]).map((item) => (
                <button key={item} className={quotaView === item ? "active" : ""} onClick={() => setQuotaView(item)} role="tab" aria-selected={quotaView === item}>{item}</button>
              ))}
            </div>
            <div className="bars" key={quotaView}>
              {quotaViews[quotaView].map((item, index) => (
                <div className="bar-row" key={item.label}>
                  <div><span>{item.label}</span><b>{item.amount}</b></div>
                  <div className="bar-track"><i style={{ width: `${item.value}%`, animationDelay: `${index * 80}ms` }}></i></div>
                </div>
              ))}
            </div>
            <div className="dashboard-foot"><span><i></i> 本月已使用 61%</span><span>预计剩余 12 天</span></div>
          </div>

          <div className="quota-features">
            <article><span>01</span><div><h3>默认全员可用</h3><p>企业拥有额度后即可开箱使用，管理员可随时调整全局规则。</p></div></article>
            <article><span>02</span><div><h3>多维精细限额</h3><p>按日或按月，对企业、部门、成员、普通任务、应用任务与专家分别配置。</p></div></article>
            <article><span>03</span><div><h3>模型等级偏好</h3><p>设置自动模式、Flash / Pro 可用范围与默认通道，在体验和成本之间动态平衡。</p></div></article>
            <article><span>04</span><div><h3>统一模型管理</h3><p>既可使用 WPS AI 额度，也支持企业自购模型上架，统一授权与可见范围。</p></div></article>
          </div>
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
            <div className="output-summary"><small>交付摘要</small><p>已完成资料汇总、内容生成与团队资产沉淀，以下文件可直接使用。</p></div>
            <div className="output-files">
              {activeScenario.outputs.map((item, index) => <div key={item}><span>{["W", "X", "A"][index]}</span><b>{item}</b><small>打开 ↗</small></div>)}
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
          <p>获取企业 AI 额度，体验由 WPS Comate 驱动的任务执行、团队协作与安全治理。</p>
          <div className="cta-actions"><a className="primary-btn light" href="#top">申请企业体验 <span>↗</span></a><a className="cta-secondary" href="#credits">查看额度能力</a></div>
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
