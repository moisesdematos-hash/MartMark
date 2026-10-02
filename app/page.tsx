"use client";

import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Blocks,
  BookOpenCheck,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Database,
  FileCheck2,
  Fingerprint,
  GitBranch,
  Layers3,
  LockKeyhole,
  Menu,
  PackageCheck,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import foundationStatus from "@/lib/foundation-status.json";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";

type Section = "Visão geral" | "Arquitetura" | "Integrações" | "Fases";

const sections: { name: Section; icon: typeof Activity }[] = [
  { name: "Visão geral", icon: Activity },
  { name: "Arquitetura", icon: Blocks },
  { name: "Integrações", icon: Workflow },
  { name: "Fases", icon: BookOpenCheck },
];

const foundations = [
  { title: "Código e CI", detail: "Repositório, revisão e pipeline", icon: GitBranch, status: "Por configurar" },
  { title: "Dados e autenticação", detail: "Supabase, PostgreSQL e RLS", icon: Database, status: "Por configurar" },
  { title: "Pagamentos", detail: "ProxyPay · ambiente de teste", icon: CreditCard, status: "Bloqueado" },
  { title: "Segurança", detail: "Segredos, auditoria e controlo de acesso", icon: Fingerprint, status: "Em definição" },
];

const phaseGroups = [
  { title: "Fundação", range: "Fase 0", detail: "Repositório, arquitetura, ambientes e gates", active: true },
  { title: "Núcleo comercial", range: "Fases 1–11", detail: "Autenticação, produtos, pagamentos e ledger", active: false },
  { title: "Ecossistema", range: "Fases 12–26", detail: "Afiliação, cursos, operação e suporte", active: false },
  { title: "Preparação de produção", range: "Fases 27–30", detail: "PWA, segurança, recuperação e CI/CD", active: false },
];

function Brand() {
  return (
    <div className="flex items-center gap-3 px-2 py-3">
      <div className="brand-mark" aria-hidden="true"><span /></div>
      <div className="leading-tight">
        <div className="text-[17px] font-semibold tracking-[-0.04em] text-white">MartMark</div>
        <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">Creator commerce</div>
      </div>
    </div>
  );
}

function SectionContent({ section, onSectionChange }: { section: Section; onSectionChange: (section: Section) => void }) {
  if (section === "Arquitetura") {
    return (
      <div className="space-y-7">
        <Heading eyebrow="BASE TÉCNICA" title="Uma fonte de verdade para cada operação." description="O desenho começa simples: a aplicação executa no Vercel e o PostgreSQL do Supabase mantém o registo oficial." />
        <div className="architecture-flow">
          <div className="flow-card"><div className="flow-icon"><GitBranch size={18} /></div><span>GitHub</span><small>Código · CI</small></div>
          <div className="flow-line" />
          <div className="flow-card"><div className="flow-icon"><Layers3 size={18} /></div><span>Vercel</span><small>Web · API</small></div>
          <div className="flow-line" />
          <div className="flow-card flow-card-primary"><div className="flow-icon"><Database size={18} /></div><span>Supabase</span><small>Auth · PostgreSQL · RLS</small></div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <InfoCard icon={CircleDollarSign} title="Integridade financeira" text="Preço e transições são validados no servidor. O ledger de dupla entrada será imutável e cada efeito terá idempotência." />
          <InfoCard icon={LockKeyhole} title="Acesso por regra" text="RLS e roles de menor privilégio protegem os dados. A interface não decide quem pode aprovar pagamentos ou levantamentos." />
        </div>
        <div className="callout"><ShieldCheck size={19} /><p><strong>Regra de arquitetura</strong><span>PostgreSQL é a fonte de verdade. O browser nunca confirma pagamento nem altera saldo.</span></p></div>
      </div>
    );
  }
  if (section === "Integrações") {
    return (
      <div className="space-y-7">
        <Heading eyebrow="SERVIÇOS" title="Poucas dependências. Limites bem definidos." description="Cada serviço só entra quando as credenciais e os ambientes correspondentes estiverem configurados." />
        <div className="space-y-3">
          {[
            { name: "Supabase", role: "Dados, autenticação e ficheiros", tag: "Obrigatório · Dev e staging", icon: Database },
            { name: "ProxyPay", role: "Referências Multicaixa em Angola", tag: "Obrigatório · Sandbox primeiro", icon: CreditCard },
            { name: "Resend", role: "Email transacional", tag: "Obrigatório · Apenas servidor", icon: Activity },
            { name: "Vercel + GitHub", role: "Pré-visualizações, CI e deploy controlado", tag: "Obrigatório", icon: GitBranch },
          ].map((item) => <div className="integration-row" key={item.name}><div className="integration-icon"><item.icon size={18} /></div><div className="min-w-0 flex-1"><strong>{item.name}</strong><span>{item.role}</span></div><div className="integration-tag">{item.tag}</div></div>)}
        </div>
        <div className="callout callout-warn"><LockKeyhole size={19} /><p><strong>Credenciais ainda não ligadas</strong><span>Esta versão não envia pagamentos, emails nem pedidos para serviços externos.</span></p></div>
      </div>
    );
  }
  if (section === "Fases") {
    return (
      <div className="space-y-7">
        <Heading eyebrow="PLANO DE EXECUÇÃO" title="Avançar apenas com evidência." description="O roadmap agrupa as 31 fases do plano original. Uma fase só passa depois de cumprir todos os seus critérios." />
        <div className="space-y-3">{phaseGroups.map((phase, index) => <div className={`phase-row ${phase.active ? "phase-row-active" : ""}`} key={phase.title}><div className={`phase-index ${phase.active ? "phase-index-active" : ""}`}>{phase.active ? <Activity size={15} /> : String(index + 1).padStart(2, "0")}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><strong>{phase.title}</strong>{phase.active && <span className="phase-current">EM CURSO</span>}</div><span>{phase.detail}</span></div><div className="phase-range">{phase.range}</div></div>)}</div>
        <div className="callout"><FileCheck2 size={19} /><p><strong>Critério de aprovação</strong><span>Implementação, migrations, testes, lint, typecheck, build, documentação e evidências revistos.</span></p></div>
        <button className="text-action" onClick={() => onSectionChange("Visão geral")}>Voltar à fundação <ChevronRight size={15} /></button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="overview-hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse-dot" /> FASE 00 <span className="eyebrow-divider">/</span> FOUNDATION</div>
          <h1>A base certa<br />antes de crescer.</h1>
          <p>Um comércio digital global começa por dados consistentes, regras claras e operações que podem ser verificadas.</p>
          <button className="primary-action" onClick={() => onSectionChange("Arquitetura")}>Explorar arquitetura <ArrowUpRight size={16} /></button>
        </div>
        <div className="hero-graphic" aria-label="Diagrama de segurança por camadas">
          <div className="orbit orbit-outer"><span className="orbit-dot orbit-dot-top" /><span className="orbit-dot orbit-dot-bottom" /></div>
          <div className="orbit orbit-mid"><span className="orbit-dot orbit-dot-right" /></div>
          <div className="orbit-core"><div className="core-glyph"><ShieldCheck size={25} strokeWidth={1.7} /></div><span>CORE</span></div>
          <div className="orbit-label orbit-label-a">DADOS</div><div className="orbit-label orbit-label-b">REGRAS</div><div className="orbit-label orbit-label-c">AUDITORIA</div>
        </div>
        <div className="hero-index">MM<span> / </span>00</div>
      </section>

      <section className="status-strip" aria-label="Estado da plataforma">
        <div className="status-main"><div className="status-symbol"><Activity size={18} /></div><div><span>ESTADO DA PLATAFORMA</span><strong>Foundation em curso</strong></div></div>
        <div className="status-divider" />
        <div className="status-item"><span>FASES PLANEADAS</span><strong>{foundationStatus.plannedPhaseCount} <small>no total</small></strong></div>
        <div className="status-item"><span>AMBIENTES</span><strong>{foundationStatus.configuredEnvironments} <small>configurados</small></strong></div>
        <div className="status-item"><span>OPERAÇÕES FINANCEIRAS</span><strong className="status-blocked"><span className="tiny-dot" /> {foundationStatus.financialOperationsEnabled ? "Ativas" : "Bloqueadas"}</strong></div>
      </section>

      <section className="foundation-section">
        <div className="section-heading"><div><div className="section-kicker">CHECKPOINT 01</div><h2>Fundação do sistema</h2><p>O que precisa de existir antes de abrir a primeira fase funcional.</p></div><button className="quiet-action" onClick={() => onSectionChange("Fases")}>Ver roadmap <ArrowUpRight size={15} /></button></div>
        <div className="foundation-grid">{foundations.map((item, index) => <article className="foundation-card" key={item.title}><div className="card-top"><div className="foundation-icon"><item.icon size={18} /></div><span className={`card-number ${index === 2 ? "card-number-warn" : ""}`}>0{index + 1}</span></div><h3>{item.title}</h3><p>{item.detail}</p><div className="card-status"><span className={index === 2 ? "state-dot state-dot-warn" : "state-dot"} />{item.status}</div></article>)}</div>
      </section>

      <section className="integration-banner"><div className="banner-icon"><PackageCheck size={20} /></div><div><strong>Próximo passo: fechar o inventário da Phase 0</strong><span>Confirmar estrutura, serviços externos, riscos e critérios de aceitação antes de avançar.</span></div><button onClick={() => onSectionChange("Fases")} aria-label="Abrir fases"><ChevronRight size={18} /></button></section>
      <footer className="page-foot"><span>MartMark Foundation Workspace</span><span><span className="tiny-dot" /> MODO DE PREPARAÇÃO</span></footer>
    </div>
  );
}

function Heading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="page-heading"><div className="section-kicker">{eyebrow}</div><h1>{title}</h1><p>{description}</p></header>;
}

function InfoCard({ icon: Icon, title, text }: { icon: typeof ShieldCheck; title: string; text: string }) {
  return <article className="info-card"><div className="info-icon"><Icon size={18} /></div><h3>{title}</h3><p>{text}</p></article>;
}

export default function Home() {
  const [section, setSection] = useState<Section>("Visão geral");
  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas" className="border-[#202c3d] bg-[#101a29] text-slate-300">
        <SidebarHeader className="px-4 pb-5 pt-4"><Brand /></SidebarHeader>
        <SidebarSeparator className="mx-4 w-auto bg-white/10" />
        <SidebarContent className="px-3 pt-5">
          <SidebarGroup>
            <SidebarGroupLabel className="px-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-500">Workspace</SidebarGroupLabel>
            <SidebarGroupContent><SidebarMenu>{sections.map(({ name, icon: Icon }) => <SidebarMenuItem key={name}><SidebarMenuButton isActive={section === name} onClick={() => setSection(name)} className="h-10 px-3 text-[13px] text-slate-300 hover:text-white data-[active=true]:bg-[#203548] data-[active=true]:text-[#a8f5cf]"><Icon size={17} strokeWidth={1.8} /><span>{name}</span></SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu></SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup className="mt-5"><SidebarGroupLabel className="px-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-500">Plataforma</SidebarGroupLabel><SidebarGroupContent><div className="sidebar-product-list"><div><span className="mini-ring"><CircleDollarSign size={14} /></span><span>Produtos</span><i>01</i></div><div><span className="mini-ring"><CreditCard size={14} /></span><span>Pagamentos</span><i>05</i></div><div><span className="mini-ring"><ShieldCheck size={14} /></span><span>Segurança</span><i>29</i></div></div></SidebarGroupContent></SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4"><div className="sidebar-gate"><div className="flex items-center gap-2 text-[11px] font-semibold text-slate-200"><span className="tiny-dot" /> Fase 0 · Em curso</div><p>As operações reais ficam fechadas até à aprovação das fases críticas.</p><div className="gate-meter"><span /></div><small>GATE DE PRODUÇÃO</small></div><div className="sidebar-user"><div className="user-avatar">MM</div><div><strong>MartMark</strong><span>Workspace de produto</span></div><span className="user-chevron">···</span></div></SidebarFooter>
      </Sidebar>
      <SidebarInset className="min-h-svh bg-[#f5f7f9]">
        <header className="topbar"><div className="flex items-center gap-3"><SidebarTrigger className="md:hidden"><Menu size={18} /></SidebarTrigger><div className="breadcrumbs"><span>MartMark</span><ChevronRight size={13} /><strong>{section}</strong></div></div><div className="topbar-right"><span className="environment-chip"><span /> LOCAL / FOUNDATION</span><span className="topbar-divider" /><div className="topbar-avatar">MM</div></div></header>
        <main className="workspace-main"><SectionContent section={section} onSectionChange={setSection} /></main>
      </SidebarInset>
    </SidebarProvider>
  );
}
