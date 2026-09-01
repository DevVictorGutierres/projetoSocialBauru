import { useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  BrowserRouter,
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  CircleUserRound,
  Heart,
  KeyRound,
  MapPin,
  Menu,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  UsersRound,
} from "lucide-react";
import "./App.css";

type Category =
  | "EDUCACAO"
  | "ANIMAIS"
  | "IDOSOS"
  | "CRIANCAS"
  | "SAUDE"
  | "ESPORTE"
  | "CULTURA"
  | "ALIMENTACAO"
  | "MEIO_AMBIENTE";
type Project = {
  id: string;
  nome: string;
  descricao?: string | null;
  categoria: Category;
  cidade: string;
  estado: string;
  bairro: string;
  endereco: string;
  email: string;
  telefone?: string | null;
  avatarUrl?: string | null;
  imagensProjeto?: string[];
  diasFuncionamento: string[];
  status: "ATIVO" | "INATIVO";
};

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1200&q=80";
const categoryInfo: Record<Category, { label: string; icon: string }> = {
  EDUCACAO: { label: "Educação", icon: "📚" },
  ANIMAIS: { label: "Animais", icon: "🐾" },
  IDOSOS: { label: "Idosos", icon: "🤝" },
  CRIANCAS: { label: "Crianças", icon: "🪁" },
  SAUDE: { label: "Saúde", icon: "💚" },
  ESPORTE: { label: "Esporte", icon: "⚽" },
  CULTURA: { label: "Cultura", icon: "🎨" },
  ALIMENTACAO: { label: "Alimentação", icon: "🍲" },
  MEIO_AMBIENTE: { label: "Meio ambiente", icon: "🌿" },
};
const samples: Project[] = [
  {
    id: "patas-felizes",
    nome: "Patas Felizes",
    descricao:
      "Resgate, cuidado e adoção responsável de animais abandonados em Bauru.",
    categoria: "ANIMAIS",
    cidade: "Bauru",
    estado: "SP",
    bairro: "Vila Independência",
    endereco: "Rua dos Animais, 250",
    email: "contato@patasfelizes.org.br",
    telefone: "(14) 99876-5432",
    avatarUrl:
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1200&q=80",
    imagensProjeto: [
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=900&q=80",
    ],
    diasFuncionamento: [
      "Segunda-feira",
      "Quarta-feira",
      "Sexta-feira",
      "Sábado",
    ],
    status: "ATIVO",
  },
  {
    id: "futuro-codigo",
    nome: "Futuro em Código",
    descricao:
      "Oficinas gratuitas de tecnologia, programação e pensamento criativo para jovens.",
    categoria: "EDUCACAO",
    cidade: "Bauru",
    estado: "SP",
    bairro: "Centro",
    endereco: "Rua Treze de Maio, 420",
    email: "contato@futuroemcodigo.org.br",
    avatarUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    imagensProjeto: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80",
    ],
    diasFuncionamento: ["Terça-feira", "Quinta-feira", "Sábado"],
    status: "ATIVO",
  },
  {
    id: "mesa-compartilhada",
    nome: "Mesa Compartilhada",
    descricao:
      "Uma cozinha comunitária que transforma doações em refeições e conversas acolhedoras.",
    categoria: "ALIMENTACAO",
    cidade: "Bauru",
    estado: "SP",
    bairro: "Jardim América",
    endereco: "Avenida das Nações, 81",
    email: "ola@mesacompartilhada.org.br",
    avatarUrl:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80",
    diasFuncionamento: ["Terça-feira", "Quinta-feira"],
    status: "ATIVO",
  },
  {
    id: "raizes-verdes",
    nome: "Raízes Verdes",
    descricao:
      "Hortas urbanas, educação ambiental e bairros mais verdes construídos em conjunto.",
    categoria: "MEIO_AMBIENTE",
    cidade: "Bauru",
    estado: "SP",
    bairro: "Vila Falcão",
    endereco: "Praça das Palmeiras, 10",
    email: "contato@raizesverdes.org.br",
    avatarUrl:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
    diasFuncionamento: ["Sábado", "Domingo"],
    status: "ATIVO",
  },
  {
    id: "movimento-livre",
    nome: "Movimento Livre",
    descricao:
      "Atividades esportivas e de lazer que fortalecem a confiança e hábitos saudáveis.",
    categoria: "ESPORTE",
    cidade: "Bauru",
    estado: "SP",
    bairro: "Mary Dota",
    endereco: "Rua das Quadras, 58",
    email: "contato@movimentolivre.org.br",
    avatarUrl:
      "https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=1200&q=80",
    diasFuncionamento: ["Segunda-feira", "Quarta-feira"],
    status: "ATIVO",
  },
  {
    id: "palco-aberto",
    nome: "Palco Aberto",
    descricao:
      "Oficinas de arte, música e teatro feitas pela e para a comunidade local.",
    categoria: "CULTURA",
    cidade: "Bauru",
    estado: "SP",
    bairro: "Altos da Cidade",
    endereco: "Rua da Cultura, 102",
    email: "oi@palcoaberto.org.br",
    avatarUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    diasFuncionamento: ["Sexta-feira", "Sábado"],
    status: "ATIVO",
  },
];

async function api<T>(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("psb-token");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const data = await response.json().catch(() => null);
  if (!response.ok)
    throw new Error(data?.message ?? data?.error ?? "Something went wrong.");
  return data as T;
}
function useProjects() {
  const [projects, setProjects] = useState<Project[]>(samples);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(true);
  useEffect(() => {
    api<Project[] | { data: Project[] }>("/projects?limit=50")
      .then((data) => {
        const list = Array.isArray(data) ? data : data.data;
        if (list?.length) {
          setProjects(list);
          setDemo(false);
        }
      })
      .catch(() => setDemo(true))
      .finally(() => setLoading(false));
  }, []);
  return { projects, loading, demo };
}
function Logo() {
  return (
    <Link className="brand" to="/">
      <b>
        <Heart size={16} fill="currentColor" />
      </b>
      junto<span>.</span>
    </Link>
  );
}
function Header() {
  const [menu, setMenu] = useState(false);
  return (
    <header>
      <div className="nav">
        <Logo />
        <nav className={menu ? "open" : ""}>
          <NavLink to="/explore">Explorar</NavLink>
          <NavLink to="/create">Cadastrar projeto</NavLink>
          <NavLink to="/dashboard">Meu impacto</NavLink>
        </nav>
        <div className="nav-actions">
          <Link to="/create">Divulgue seu projeto</Link>
          <button onClick={() => setMenu(!menu)}>
            <Menu size={18} />
            <CircleUserRound size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer>
      <div>
        <Logo />
        <p>O impacto social começa com uma simples conexão.</p>
      </div>
      <div>
        <Link to="/explore">Explorar projetos</Link>
        <Link to="/create">Cadastrar projeto</Link>
        <a href="#about">Sobre nós</a>
      </div>
      <small>© {new Date().getFullYear()} Junto. Feito para Bauru.</small>
    </footer>
  );
}
function SearchBox({ onSearch }: { onSearch: (term: string) => void }) {
  const [term, setTerm] = useState("");
  return (
    <form
      className="searchbox"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(term);
      }}
    >
      <Search size={19} />
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Busque projetos, causas ou lugares"
      />
      <button>Buscar</button>
    </form>
  );
}
function Categories({
  selected,
  onSelect,
}: {
  selected?: Category;
  onSelect?: (c?: Category) => void;
}) {
  return (
    <div className="categories">
      <button
        className={!selected ? "active" : ""}
        onClick={() => onSelect?.()}
      >
        <i>✦</i>All
      </button>
      {Object.entries(categoryInfo).map(([key, v]) => (
        <button
          key={key}
          className={selected === key ? "active" : ""}
          onClick={() => onSelect?.(key as Category)}
        >
          <i>{v.icon}</i>
          {v.label}
        </button>
      ))}
    </div>
  );
}
function ProjectCard({ project }: { project: Project }) {
  const [saved, setSaved] = useState(false);
  return (
    <article className="project-card">
      <Link className="card-image" to={`/projects/${project.id}`}>
        <img src={project.avatarUrl ?? FALLBACK_IMAGE} alt={project.nome} />
        <button
          onClick={(e) => {
            e.preventDefault();
            setSaved(!saved);
          }}
          className={saved ? "saved" : ""}
        >
          <Heart size={19} fill={saved ? "currentColor" : "none"} />
        </button>
        <span>
          {categoryInfo[project.categoria].icon}{" "}
          {categoryInfo[project.categoria].label}
        </span>
      </Link>
      <div className="card-copy">
        <Link to={`/projects/${project.id}`}>
          <h3>{project.nome}</h3>
        </Link>
        <p className="location">
          <MapPin size={14} />
          {project.bairro}, {project.cidade}
        </p>
        <p className="description">{project.descricao}</p>
        <div className="card-bottom">
          <span>
              <UsersRound size={15} /> Participe da mudança
          </span>
          <Link to={`/projects/${project.id}`}>
            Ver <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
function HomePage() {
  const navigate = useNavigate();
  const { projects, demo } = useProjects();
  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">
            <Sparkles size={14} /> Connect with good
          </span>
          <h1>
            Sua próxima <em>boa ação</em>
            <br />
            está mais perto do que você imagina.
          </h1>
          <p>
            Descubra projetos que transformam Bauru e faça parte da mudança que
            acontece onde você vive.
          </p>
          <SearchBox
            onSearch={(q) => navigate(`/explore?nome=${encodeURIComponent(q)}`)}
          />
          <div className="stats">
            <span>
              <b>+50</b>projetos locais
            </span>
            <span>
              <b>9</b>causas para apoiar
            </span>
            <span>
              <b>1</b>comunidade conectada
            </span>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=85"
            alt="Pessoas voluntárias juntas"
          />
          <div>
            <b>✦</b>
            <p>
              <strong>Pequenos atos, impacto real.</strong>
              <br />
              Encontre sua causa hoje.
            </p>
          </div>
        </div>
      </section>
      <section className="section white">
        <div className="section-title">
          <div>
            <span className="eyebrow">Encontre sua causa</span>
            <h2>Existe um lugar para todo mundo.</h2>
          </div>
          <Link to="/explore">
            Ver todos os projetos <ArrowRight size={17} />
          </Link>
        </div>
        <Categories />
        <div className="grid">
          {projects.slice(0, 3).map((p) => (
            <ProjectCard project={p} key={p.id} />
          ))}
        </div>
        {demo && (
          <p className="hint">
            Exibindo projetos demonstrativos enquanto sua API local está
            offline.
          </p>
        )}
      </section>
      <section className="impact">
        <div>
          <span className="eyebrow">Feito para conectar</span>
          <h2>
            Todo projeto tem uma história.
            <br />
            Talvez o próximo capítulo tenha você nele.
          </h2>
          <Link className="button light" to="/explore">
            Explorar oportunidades <ArrowRight size={17} />
          </Link>
        </div>
        <p>
          “<br />
          <span>Quando as pessoas se unem, uma cidade vira comunidade.</span>
        </p>
      </section>
      <section className="section steps">
        <span className="eyebrow">Como funciona</span>
        <h2>Mais perto da comunidade em três passos.</h2>
        <div>
          <article>
            <b>01</b>
            <Search />
            <h3>Explore</h3>
            <p>
              Conheça iniciativas locais pela causa, lugar ou pelo que toca
              você.
            </p>
          </article>
          <article>
            <b>02</b>
            <Heart />
            <h3>Escolha</h3>
            <p>Conheça as pessoas e o propósito por trás de cada projeto.</p>
          </article>
          <article>
            <b>03</b>
            <UsersRound />
            <h3>Participe</h3>
            <p>Faça parte de um projeto e transforme intenção em ação.</p>
          </article>
        </div>
      </section>
    </>
  );
}
function ExplorePage() {
  const { projects, loading } = useProjects();
  const [category, setCategory] = useState<Category>();
  const [term, setTerm] = useState("");
  const [city, setCity] = useState("");
  const [filters, setFilters] = useState(false);
  const visible = useMemo(
    () =>
      projects.filter(
        (p) =>
          (!category || p.categoria === category) &&
          (!term ||
            `${p.nome} ${p.descricao}`
              .toLowerCase()
              .includes(term.toLowerCase())) &&
          (!city || p.cidade.toLowerCase().includes(city.toLowerCase())),
      ),
    [projects, category, term, city],
  );
  return (
    <main className="explore">
      <span className="eyebrow">Descubra Bauru</span>
      <h1>Bons lugares para começar.</h1>
      <p>Encontre uma iniciativa que tenha a sua cara.</p>
      <div className="explore-search">
        <SearchBox onSearch={setTerm} />
        <button onClick={() => setFilters(!filters)}>
          <SlidersHorizontal size={18} />
          Filtros
        </button>
      </div>
      {filters && (
        <div className="filters">
          <label>
            Cidade
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="ex.: Bauru"
            />
          </label>
          <button
            onClick={() => {
              setCity("");
              setTerm("");
              setCategory(undefined);
            }}
          >
            Limpar filtros
          </button>
        </div>
      )}
      <Categories selected={category} onSelect={setCategory} />
      <div className="results">
        <span>
          {loading
            ? "Buscando projetos..."
            : `${visible.length} projetos encontrados`}
        </span>
        <span>Mais recentes primeiro</span>
      </div>
      <div className="grid">
        {visible.map((p) => (
          <ProjectCard project={p} key={p.id} />
        ))}
      </div>
      {!loading && !visible.length && (
        <div className="empty">
          <Search />
          <h2>Nenhum projeto encontrado</h2>
          <p>Tente outro termo ou limpe seus filtros.</p>
        </div>
      )}
    </main>
  );
}
function DetailPage() {
  const { id } = useParams();
  const { projects } = useProjects();
  const navigate = useNavigate();
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const project =
    projects.find((p) => p.id === id) || samples.find((p) => p.id === id);
  if (!project)
    return (
      <main className="empty">
        <h1>Projeto não encontrado</h1>
        <Link className="button" to="/explore">
          Voltar para projetos
        </Link>
      </main>
    );
  const projectId = project.id;
  const gallery = project.imagensProjeto?.length
    ? project.imagensProjeto
    : [project.avatarUrl || samples[0].avatarUrl!];
  async function join() {
    try {
      await api(`/projects/${projectId}/apply`, { method: "PATCH" });
      setMessage("Agora você faz parte deste projeto. Seja bem-vindo!");
    } catch {
      setMessage(
        "Seu interesse foi salvo. Entre para confirmar sua participação.",
      );
    }
    setJoined(true);
  }
  return (
    <main className="detail">
      <button className="back" onClick={() => navigate(-1)}>
        <ChevronLeft size={17} />
        Back
      </button>
      <div className="detail-title">
        <div>
          <span className="eyebrow">
            {categoryInfo[project.categoria].icon}{" "}
            {categoryInfo[project.categoria].label}
          </span>
          <h1>{project.nome}</h1>
          <p>
            <MapPin size={16} />
            {project.bairro}, {project.cidade} · {project.estado}
          </p>
        </div>
        <button className="save">
          <Heart size={18} />
          Save
        </button>
      </div>
      <div className="gallery">
        <img src={gallery[0]} alt={project.nome} />
        <img src={gallery[1] || gallery[0]} alt="Atividade do projeto" />
        <img src={gallery[2] || gallery[0]} alt="Atividade do projeto" />
      </div>
      <div className="detail-layout">
        <article>
          <div className="story-title">
            <span>{categoryInfo[project.categoria].icon}</span>
            <div>
              <h2>Faça a diferença com {project.nome}</h2>
              <p>Projeto comunitário em {project.cidade}</p>
            </div>
          </div>
          <hr />
          <h3>Sobre este projeto</h3>
          <p>
            {project.descricao ||
              "Esta iniciativa local une pessoas para criar mudanças significativas na comunidade."}
          </p>
          <h3>Quando acontece</h3>
          <div className="info">
            <CalendarDays />
            <p>
              <b>Dias de funcionamento</b>
              <br />
              {project.diasFuncionamento.join(", ")}
            </p>
          </div>
          <h3>Onde nos encontrar</h3>
          <div className="map">
            <MapPin />
            <p>
              {project.endereco}
              <br />
              {project.bairro}, {project.cidade} - {project.estado}
            </p>
          </div>
        </article>
        <aside>
          <b>✦</b>
          <h2>Pronto para participar?</h2>
          <p>Sua disposição pode transformar uma boa ideia em impacto real.</p>
          <button
            onClick={join}
            className={joined ? "button joined" : "button"}
          >
            {joined ? "Você já faz parte!" : "Participar deste projeto"}{" "}
            <ArrowRight size={17} />
          </button>
          {message && <small>{message}</small>}
          <footer>
            <Heart size={15} /> Free to join. Made with care.
          </footer>
        </aside>
      </div>
    </main>
  );
}
function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault();
    try {
      const result = await api<{ token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, senha }),
      });
      localStorage.setItem("psb-token", result.token);
      const redirect = new URLSearchParams(location.search).get("redirect");
      navigate(redirect ?? "/dashboard");
    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : "Não foi possível entrar.",
      );
    }
  }
  return (
    <main className="auth">
      <section>
        <Logo />
        <div>
          <span className="eyebrow">Uma cidade cheia de possibilidades</span>
          <h1>Encontre o lugar onde seu coração pode ajudar.</h1>
          <p>
            Conecte-se a pessoas que fazem um trabalho significativo em Bauru.
          </p>
        </div>
        <strong>“O bem cresce quando é compartilhado.”</strong>
      </section>
      <section>
        <div className="login-form">
          <span className="eyebrow">Boas-vindas</span>
          <h2>Que bom ver você.</h2>
          <p>Entre para acompanhar o seu impacto.</p>
          <form onSubmit={submit}>
            <label>
              Email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="you@example.com"
              />
            </label>
            <label>
              Password
              <input
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                type="password"
                required
                placeholder="Sua senha"
              />
            </label>
            <button className="button">
              Entrar <ArrowRight size={17} />
            </button>
          </form>
          {message && <small>{message}</small>}
          <p className="switch">
            Chegando agora? <Link to="/explore">Explore os projetos</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
function DashboardPage() {
  const { projects } = useProjects();
  const [tab, setTab] = useState<"joined" | "created">("joined");
  return (
    <main className="dashboard">
      <section>
        <div>
          <span className="eyebrow">Meu impacto</span>
          <h1>Olá, agente de transformação.</h1>
          <p>Cada conexão que você faz pode levar Bauru adiante.</p>
        </div>
        <div className="score">
          <small>Impacto comunitário</small>
          <b>01</b>
          <small>projeto participado</small>
        </div>
      </section>
      <div className="sign-in">
        <KeyRound size={19} />
        Entre para sincronizar seus projetos com a API.
        <Link to="/login">Entrar</Link>
      </div>
      <nav>
        <button
          className={tab === "joined" ? "active" : ""}
          onClick={() => setTab("joined")}
        >
          Projetos dos quais participo
        </button>
        <button
          className={tab === "created" ? "active" : ""}
          onClick={() => setTab("created")}
        >
          Projetos que criei
        </button>
      </nav>
      <div className="dash-content">
        <div className="section-title">
          <div>
            <h2>{tab === "joined" ? "Suas conexões" : "Suas iniciativas"}</h2>
            <p>
              {tab === "joined"
                ? "Continue presente no que importa."
                : "Gerencie as causas que você trouxe à vida."}
            </p>
          </div>
          {tab === "created" && (
            <Link className="button" to="/create">
              <Plus size={17} />
              Adicionar projeto
            </Link>
          )}
        </div>
        <div className="grid two">
          {(tab === "joined" ? projects.slice(0, 2) : projects.slice(2, 4)).map(
            (p) => (
              <ProjectCard project={p} key={p.id} />
            ),
          )}
        </div>
      </div>
    </main>
  );
}
function CreatePage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const values = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await api("/projects", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          diasFuncionamento: ["Sábado"],
          imagensProjeto: [],
          status: "ATIVO",
        }),
      });
      setMessage(
        "Seu projeto está no ar. Obrigado por compartilhar sua causa!",
      );
    } catch {
      setMessage(
        "Seu rascunho está pronto. Entre com uma conta da API para publicá-lo.",
      );
    } finally {
      setSaving(false);
    }
  }
  return (
    <main className="create">
      <div>
        <span className="eyebrow">Divulgue sua causa</span>
        <h1>
          Dê ao seu projeto
          <br />
          <em>um espaço para crescer.</em>
        </h1>
        <p>
          Ajude as pessoas de Bauru a encontrar seu trabalho e fazer parte dele.
        </p>
        <aside>
          <Sparkles size={18} />
          Informações claras ajudam as pessoas certas a encontrar você.
        </aside>
      </div>
      <form onSubmit={submit}>
        <div className="form-title">
          <h2>Conte sua história</h2>
          <p>Os campos marcados com * são obrigatórios.</p>
        </div>
        <div className="form-grid">
          <label className="wide">
            Nome do projeto *
            <input name="nome" required placeholder="ex.: Raízes Verdes" />
          </label>
          <label>
            Causa *
            <select name="categoria">
              {Object.entries(categoryInfo).map(([key, v]) => (
                <option key={key} value={key}>
                  {v.icon} {v.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            E-mail *
            <input
              name="email"
              type="email"
              required
              placeholder="contato@projeto.org"
            />
          </label>
          <label className="wide">
            Descrição *
            <textarea
              name="descricao"
              rows={5}
              required
              placeholder="O que o seu projeto faz e quem ele ajuda?"
            />
          </label>
          <label>
            Cidade *<input name="cidade" required defaultValue="Bauru" />
          </label>
          <label>
            Estado *<input name="estado" required defaultValue="SP" />
          </label>
          <label>
            Bairro *
            <input name="bairro" required placeholder="ex.: Centro" />
          </label>
          <label>
            Telefone *
            <input name="telefone" required placeholder="14999999999" />
          </label>
          <label>
            CEP *
            <input name="cep" required placeholder="17000000" />
          </label>
          <label className="wide">
            Endereço *
            <input name="endereco" required placeholder="Rua, número" />
          </label>
        </div>
        <div className="form-actions">
          <button type="button" onClick={() => navigate(-1)}>
            Cancelar
          </button>
          <button className="button" disabled={saving}>
            {saving ? "Publicando..." : "Publicar projeto"}{" "}
            <ArrowRight size={17} />
          </button>
        </div>
        {message && <p className="message">{message}</p>}
      </form>
    </main>
  );
}
function RequireAuthentication({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("psb-token");

  if (!token) {
    return <Navigate to="/login?redirect=/create" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/projects/:id" element={<DetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/create"
          element={
            <RequireAuthentication>
              <CreatePage />
            </RequireAuthentication>
          }
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
