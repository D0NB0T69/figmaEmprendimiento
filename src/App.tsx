import { useState, useMemo } from 'react'

// ─── DATA ──────────────────────────────────────────────────────────────────

type Grade = { studentId: string; value: number }

type Course = {
  id: string
  name: string
  grade: string   // e.g. "1°A"
  teacherId: string
  students: Student[]
  grades: Grade[]
}

type Student = {
  id: string
  name: string
  rut: string
  attendance: number // percent
}

type Teacher = {
  id: string
  name: string
  subject: string
  email: string
  avatar: string
  courseIds: string[]
}

const STUDENTS: Student[] = [
  { id: 's1',  name: 'Valentina Rojas',    rut: '21.234.567-8', attendance: 92 },
  { id: 's2',  name: 'Matías Herrera',     rut: '21.345.678-9', attendance: 88 },
  { id: 's3',  name: 'Camila Soto',        rut: '21.456.789-0', attendance: 95 },
  { id: 's4',  name: 'Benjamín Muñoz',     rut: '21.567.890-1', attendance: 74 },
  { id: 's5',  name: 'Isidora Castro',     rut: '21.678.901-2', attendance: 97 },
  { id: 's6',  name: 'Sebastián Vargas',   rut: '21.789.012-3', attendance: 81 },
  { id: 's7',  name: 'Antonia Flores',     rut: '22.123.456-7', attendance: 90 },
  { id: 's8',  name: 'Diego Morales',      rut: '22.234.567-8', attendance: 67 },
  { id: 's9',  name: 'Javiera Pizarro',    rut: '22.345.678-9', attendance: 99 },
  { id: 's10', name: 'Emilio Contreras',   rut: '22.456.789-0', attendance: 84 },
  { id: 's11', name: 'Sofía Gutiérrez',    rut: '22.567.890-1', attendance: 93 },
  { id: 's12', name: 'Ignacio Fuentes',    rut: '22.678.901-2', attendance: 78 },
  { id: 's13', name: 'Renata Espinoza',    rut: '23.123.456-7', attendance: 86 },
  { id: 's14', name: 'Tomás Ramírez',      rut: '23.234.567-8', attendance: 91 },
  { id: 's15', name: 'Florencia Silva',    rut: '23.345.678-9', attendance: 100 },
  { id: 's16', name: 'Andrés Navarro',     rut: '23.456.789-0', attendance: 72 },
  { id: 's17', name: 'Martina Leal',       rut: '23.567.890-1', attendance: 88 },
  { id: 's18', name: 'Cristóbal Vera',     rut: '23.678.901-2', attendance: 94 },
  { id: 's19', name: 'Catalina Torres',    rut: '24.123.456-7', attendance: 82 },
  { id: 's20', name: 'Felipe Mendoza',     rut: '24.234.567-8', attendance: 77 },
  { id: 's21', name: 'Ximena Araya',       rut: '24.345.678-9', attendance: 96 },
  { id: 's22', name: 'Rodrigo Cárdenas',   rut: '24.456.789-0', attendance: 85 },
  { id: 's23', name: 'Daniela Pereira',    rut: '24.567.890-1', attendance: 89 },
  { id: 's24', name: 'Nicolás Ibáñez',     rut: '24.678.901-2', attendance: 71 },
]

const COURSES: Course[] = [
  {
    id: 'c1', name: 'Matemáticas', grade: '1°A', teacherId: 't1',
    students: [STUDENTS[0], STUDENTS[1], STUDENTS[2], STUDENTS[3], STUDENTS[4], STUDENTS[5]],
    grades: [
      { studentId: 's1', value: 6.5 }, { studentId: 's2', value: 5.8 }, { studentId: 's3', value: 7.0 },
      { studentId: 's4', value: 4.2 }, { studentId: 's5', value: 6.9 }, { studentId: 's6', value: 5.1 },
    ],
  },
  {
    id: 'c2', name: 'Matemáticas', grade: '2°B', teacherId: 't1',
    students: [STUDENTS[6], STUDENTS[7], STUDENTS[8], STUDENTS[9], STUDENTS[10]],
    grades: [
      { studentId: 's7', value: 6.1 }, { studentId: 's8', value: 3.8 }, { studentId: 's9', value: 7.0 },
      { studentId: 's10', value: 5.4 }, { studentId: 's11', value: 6.7 },
    ],
  },
  {
    id: 'c3', name: 'Matemáticas', grade: '3°C', teacherId: 't1',
    students: [STUDENTS[11], STUDENTS[12], STUDENTS[13], STUDENTS[14]],
    grades: [
      { studentId: 's12', value: 5.0 }, { studentId: 's13', value: 6.3 },
      { studentId: 's14', value: 5.9 }, { studentId: 's15', value: 7.0 },
    ],
  },
  {
    id: 'c4', name: 'Lenguaje', grade: '1°B', teacherId: 't2',
    students: [STUDENTS[0], STUDENTS[2], STUDENTS[4], STUDENTS[6], STUDENTS[8]],
    grades: [
      { studentId: 's1', value: 6.2 }, { studentId: 's3', value: 5.7 }, { studentId: 's5', value: 6.8 },
      { studentId: 's7', value: 5.3 }, { studentId: 's9', value: 7.0 },
    ],
  },
  {
    id: 'c5', name: 'Lenguaje', grade: '2°A', teacherId: 't2',
    students: [STUDENTS[10], STUDENTS[12], STUDENTS[14], STUDENTS[16], STUDENTS[18]],
    grades: [
      { studentId: 's11', value: 4.9 }, { studentId: 's13', value: 6.4 },
      { studentId: 's15', value: 7.0 }, { studentId: 's17', value: 5.6 }, { studentId: 's19', value: 4.5 },
    ],
  },
  {
    id: 'c6', name: 'Ciencias', grade: '2°B', teacherId: 't3',
    students: [STUDENTS[1], STUDENTS[3], STUDENTS[5], STUDENTS[7], STUDENTS[9], STUDENTS[11]],
    grades: [
      { studentId: 's2', value: 6.0 }, { studentId: 's4', value: 3.5 }, { studentId: 's6', value: 5.8 },
      { studentId: 's8', value: 4.1 }, { studentId: 's10', value: 6.5 }, { studentId: 's12', value: 5.2 },
    ],
  },
  {
    id: 'c7', name: 'Ciencias', grade: '3°A', teacherId: 't3',
    students: [STUDENTS[13], STUDENTS[15], STUDENTS[17], STUDENTS[19], STUDENTS[21]],
    grades: [
      { studentId: 's14', value: 5.7 }, { studentId: 's16', value: 4.8 },
      { studentId: 's18', value: 6.6 }, { studentId: 's20', value: 5.0 }, { studentId: 's22', value: 6.2 },
    ],
  },
  {
    id: 'c8', name: 'Historia', grade: '1°A', teacherId: 't4',
    students: [STUDENTS[0], STUDENTS[2], STUDENTS[4], STUDENTS[6]],
    grades: [
      { studentId: 's1', value: 5.9 }, { studentId: 's3', value: 6.4 },
      { studentId: 's5', value: 7.0 }, { studentId: 's7', value: 5.5 },
    ],
  },
  {
    id: 'c9', name: 'Historia', grade: '3°B', teacherId: 't4',
    students: [STUDENTS[20], STUDENTS[21], STUDENTS[22], STUDENTS[23]],
    grades: [
      { studentId: 's21', value: 6.1 }, { studentId: 's22', value: 4.7 },
      { studentId: 's23', value: 5.8 }, { studentId: 's24', value: 3.9 },
    ],
  },
  {
    id: 'c10', name: 'Inglés', grade: '2°A', teacherId: 't5',
    students: [STUDENTS[1], STUDENTS[3], STUDENTS[5], STUDENTS[7], STUDENTS[9]],
    grades: [
      { studentId: 's2', value: 5.5 }, { studentId: 's4', value: 4.0 }, { studentId: 's6', value: 6.2 },
      { studentId: 's8', value: 3.7 }, { studentId: 's10', value: 5.9 },
    ],
  },
  {
    id: 'c11', name: 'Inglés', grade: '2°C', teacherId: 't5',
    students: [STUDENTS[11], STUDENTS[13], STUDENTS[15], STUDENTS[17]],
    grades: [
      { studentId: 's12', value: 6.0 }, { studentId: 's14', value: 5.3 },
      { studentId: 's16', value: 4.6 }, { studentId: 's18', value: 6.8 },
    ],
  },
  {
    id: 'c12', name: 'Inglés', grade: '3°B', teacherId: 't5',
    students: [STUDENTS[19], STUDENTS[21], STUDENTS[22], STUDENTS[23]],
    grades: [
      { studentId: 's20', value: 5.1 }, { studentId: 's22', value: 6.3 },
      { studentId: 's23', value: 5.7 }, { studentId: 's24', value: 4.4 },
    ],
  },
]

const TEACHERS: Teacher[] = [
  { id: 't1', name: 'Ana García',     subject: 'Matemáticas', email: 'a.garcia@colegio.cl',   avatar: 'AG', courseIds: ['c1','c2','c3'] },
  { id: 't2', name: 'Carlos López',   subject: 'Lenguaje',    email: 'c.lopez@colegio.cl',    avatar: 'CL', courseIds: ['c4','c5'] },
  { id: 't3', name: 'María Fernández',subject: 'Ciencias',    email: 'm.fernandez@colegio.cl',avatar: 'MF', courseIds: ['c6','c7'] },
  { id: 't4', name: 'Pedro Sánchez',  subject: 'Historia',    email: 'p.sanchez@colegio.cl',  avatar: 'PS', courseIds: ['c8','c9'] },
  { id: 't5', name: 'Lucía Martínez', subject: 'Inglés',      email: 'l.martinez@colegio.cl', avatar: 'LM', courseIds: ['c10','c11','c12'] },
]

// ─── HELPERS ───────────────────────────────────────────────────────────────

function avg(grades: Grade[]) {
  if (!grades.length) return 0
  return grades.reduce((s, g) => s + g.value, 0) / grades.length
}

function passRate(grades: Grade[]) {
  if (!grades.length) return 0
  return (grades.filter(g => g.value >= 4.0).length / grades.length) * 100
}

function gradeColor(v: number) {
  if (v >= 6.0) return 'text-green-700 bg-green-50'
  if (v >= 4.0) return 'text-amber-700 bg-amber-50'
  return 'text-red-700 bg-red-50'
}

// ─── ICONS ────────────────────────────────────────────────────────────────

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const s = { width: size, height: size, flexShrink: 0 }
  const icons: Record<string, React.ReactElement> = {
    menu: <svg style={s} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg>,
    x: <svg style={s} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/></svg>,
    home: <svg style={s} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>,
    users: <svg style={s} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
    book: <svg style={s} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>,
    chart: <svg style={s} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
    student: <svg style={s} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M12 14l9-5-9-5-9 5 9 5z"/><path strokeLinecap="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>,
    settings: <svg style={s} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>,
    logout: <svg style={s} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>,
    back: <svg style={s} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M15 19l-7-7 7-7"/></svg>,
    chevron: <svg style={s} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M9 5l7 7-7 7"/></svg>,
    calendar: <svg style={s} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>,
    mail: <svg style={s} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
  }
  return icons[name] ?? null
}

// ─── LOGIN ────────────────────────────────────────────────────────────────

type Role = 'coordinator' | 'teacher'
type LoginInfo = { role: Role; teacherId?: string }

function Login({ onLogin }: { onLogin: (info: LoginInfo) => void }) {
  const [role, setRole] = useState<Role>('coordinator')
  const [teacherId, setTeacherId] = useState('t1')

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #2563eb 100%)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur mb-4">
            <Icon name="student" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>PulsoEscolar</h1>
          <p className="text-blue-200 mt-1 text-sm">Colegio Campestre de Tunja</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Iniciar sesión</h2>

          <div className="mb-5">
            <label className="block text-xs font-700 uppercase tracking-wide text-slate-500 mb-2">Tipo de usuario</label>
            <div className="grid grid-cols-2 gap-2">
              {(['coordinator', 'teacher'] as Role[]).map(r => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`py-2.5 px-3 rounded-lg border-2 text-sm font-600 transition-all ${
                    role === r
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {r === 'coordinator' ? 'Coordinador' : 'Docente'}
                </button>
              ))}
            </div>
          </div>

          {role === 'teacher' && (
            <div className="mb-5">
              <label className="block text-xs font-700 uppercase tracking-wide text-slate-500 mb-2">Seleccionar docente</label>
              <select
                value={teacherId}
                onChange={e => setTeacherId(e.target.value)}
                className="w-full border-2 border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none bg-white"
              >
                {TEACHERS.map(t => (
                  <option key={t.id} value={t.id}>{t.name} — {t.subject}</option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={() => onLogin({ role, teacherId: role === 'teacher' ? teacherId : undefined })}
            className="w-full py-3 rounded-xl font-700 text-white text-sm transition-all hover:opacity-90 active:scale-[.98]"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)' }}
          >
            Entrar al sistema
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────

type CoordSection = 'dashboard' | 'teachers' | 'courses' | 'students' | 'reports' | 'settings'

const COORD_NAV: { id: CoordSection; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Inicio',       icon: 'home' },
  { id: 'teachers',  label: 'Docentes',     icon: 'users' },
  { id: 'courses',   label: 'Cursos',       icon: 'book' },
  { id: 'students',  label: 'Estudiantes',  icon: 'student' },
  { id: 'reports',   label: 'Reportes',     icon: 'chart' },
  { id: 'settings',  label: 'Configuración',icon: 'settings' },
]

function Sidebar({
  active, onSelect, onLogout, open, onClose
}: {
  active: CoordSection
  onSelect: (s: CoordSection) => void
  onLogout: () => void
  open: boolean
  onClose: () => void
}) {
  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-30 flex flex-col
          w-64 bg-slate-900 text-white transition-transform duration-300
          lg:static lg:translate-x-0 lg:z-auto lg:flex
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Icon name="student" size={16} />
          </div>
          <span className="font-800 text-base tracking-tight">EduGestión</span>
          <button className="ml-auto lg:hidden text-white/60 hover:text-white" onClick={onClose}>
            <Icon name="x" size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <p className="text-xs font-700 uppercase tracking-widest text-white/30 px-2 mb-2">Menú</p>
          {COORD_NAV.map(item => (
            <button
              key={item.id}
              onClick={() => { onSelect(item.id); onClose() }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-600 transition-all text-left ${
                active === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 pb-4 border-t border-white/10 pt-4">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-700">CO</div>
            <div className="min-w-0">
              <p className="text-sm font-600 truncate">Coordinador</p>
              <p className="text-xs text-white/50 truncate">coord@colegio.cl</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-600 text-white/60 hover:bg-white/10 hover:text-white transition-all"
          >
            <Icon name="logout" size={18} />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  )
}

// ─── STAT CARD ────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
      <p className="text-xs font-700 uppercase tracking-wide text-slate-400">{label}</p>
      <p className={`text-3xl font-800 mt-1 ${accent ?? 'text-slate-800'}`}>{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  )
}

// ─── COORDINATOR SECTIONS ─────────────────────────────────────────────────

function CoordDashboard() {
  const totalStudents = useMemo(() => {
    const ids = new Set<string>()
    COURSES.forEach(c => c.students.forEach(s => ids.add(s.id)))
    return ids.size
  }, [])
  const allGrades = COURSES.flatMap(c => c.grades)
  const globalAvg = avg(allGrades)
  const globalPass = passRate(allGrades)

  return (
    <div>
      <h2 className="text-xl font-800 text-slate-800 mb-1">Dashboard General</h2>
      <p className="text-sm text-slate-500 mb-6">Año escolar 2026 — Colegio Campestre de Tunja</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Docentes" value={TEACHERS.length.toString()} sub="5 materias" />
        <StatCard label="Cursos activos" value={COURSES.length.toString()} sub="en 3 niveles" />
        <StatCard label="Estudiantes" value={totalStudents.toString()} sub="matriculados" />
        <StatCard label="Promedio global" value={globalAvg.toFixed(1)} sub={`${globalPass.toFixed(0)}% aprobación`} accent={globalAvg >= 5 ? 'text-green-600' : 'text-amber-600'} />
      </div>

      <h3 className="text-sm font-700 uppercase tracking-wide text-slate-400 mb-3">Resumen por materia</h3>
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-5 py-3 text-xs font-700 uppercase tracking-wide text-slate-400">Docente</th>
                <th className="text-left px-5 py-3 text-xs font-700 uppercase tracking-wide text-slate-400">Materia</th>
                <th className="text-center px-5 py-3 text-xs font-700 uppercase tracking-wide text-slate-400">Cursos</th>
                <th className="text-center px-5 py-3 text-xs font-700 uppercase tracking-wide text-slate-400">Promedio</th>
                <th className="text-center px-5 py-3 text-xs font-700 uppercase tracking-wide text-slate-400">Aprobación</th>
              </tr>
            </thead>
            <tbody>
              {TEACHERS.map(t => {
                const courses = COURSES.filter(c => t.courseIds.includes(c.id))
                const gs = courses.flatMap(c => c.grades)
                const a = avg(gs)
                const p = passRate(gs)
                return (
                  <tr key={t.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-700 flex-shrink-0">{t.avatar}</div>
                        <span className="font-600 text-slate-700">{t.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{t.subject}</td>
                    <td className="px-5 py-3.5 text-center text-slate-600">{t.courseIds.length}</td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`inline-flex items-center justify-center w-12 h-6 rounded-full text-xs font-700 ${a >= 5.5 ? 'bg-green-100 text-green-700' : a >= 4 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{a.toFixed(1)}</span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <div className="flex items-center gap-2 justify-center">
                        <div className="flex-1 max-w-[80px] h-1.5 rounded-full bg-slate-100">
                          <div className={`h-1.5 rounded-full ${p >= 70 ? 'bg-green-500' : p >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${p}%` }} />
                        </div>
                        <span className="text-xs text-slate-500 w-10 text-right">{p.toFixed(0)}%</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function CoordTeachers() {
  return (
    <div>
      <h2 className="text-xl font-800 text-slate-800 mb-1">Docentes</h2>
      <p className="text-sm text-slate-500 mb-6">{TEACHERS.length} docentes registrados</p>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {TEACHERS.map(t => {
          const courses = COURSES.filter(c => t.courseIds.includes(c.id))
          const gs = courses.flatMap(c => c.grades)
          return (
            <div key={t.id} className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-base font-800 flex-shrink-0">{t.avatar}</div>
                <div className="min-w-0">
                  <p className="font-700 text-slate-800 truncate">{t.name}</p>
                  <p className="text-sm text-blue-600 font-600">{t.subject}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><Icon name="mail" size={11} />{t.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-50 rounded-lg py-2">
                  <p className="text-lg font-800 text-slate-700">{t.courseIds.length}</p>
                  <p className="text-[10px] text-slate-400 font-600 uppercase tracking-wide">Cursos</p>
                </div>
                <div className="bg-slate-50 rounded-lg py-2">
                  <p className="text-lg font-800 text-slate-700">{avg(gs).toFixed(1)}</p>
                  <p className="text-[10px] text-slate-400 font-600 uppercase tracking-wide">Promedio</p>
                </div>
                <div className="bg-slate-50 rounded-lg py-2">
                  <p className={`text-lg font-800 ${passRate(gs) >= 70 ? 'text-green-600' : 'text-amber-600'}`}>{passRate(gs).toFixed(0)}%</p>
                  <p className="text-[10px] text-slate-400 font-600 uppercase tracking-wide">Aprob.</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-xs font-600 text-slate-400 mb-1.5">Cursos asignados</p>
                <div className="flex flex-wrap gap-1">
                  {courses.map(c => (
                    <span key={c.id} className="text-xs bg-blue-50 text-blue-700 font-600 px-2 py-0.5 rounded-full">{c.grade}</span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CoordCourses() {
  return (
    <div>
      <h2 className="text-xl font-800 text-slate-800 mb-1">Cursos</h2>
      <p className="text-sm text-slate-500 mb-6">{COURSES.length} cursos activos</p>
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-700 uppercase tracking-wide text-slate-400">Curso</th>
                <th className="text-left px-5 py-3 text-xs font-700 uppercase tracking-wide text-slate-400">Materia</th>
                <th className="text-left px-5 py-3 text-xs font-700 uppercase tracking-wide text-slate-400">Docente</th>
                <th className="text-center px-5 py-3 text-xs font-700 uppercase tracking-wide text-slate-400">Alumnos</th>
                <th className="text-center px-5 py-3 text-xs font-700 uppercase tracking-wide text-slate-400">Promedio</th>
                <th className="text-center px-5 py-3 text-xs font-700 uppercase tracking-wide text-slate-400">Aprobación</th>
              </tr>
            </thead>
            <tbody>
              {COURSES.map(c => {
                const teacher = TEACHERS.find(t => t.id === c.teacherId)!
                const a = avg(c.grades)
                const p = passRate(c.grades)
                return (
                  <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 font-700 text-slate-800">{c.grade}</td>
                    <td className="px-5 py-3.5 text-slate-600">{c.name}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-700 flex-shrink-0">{teacher.avatar}</span>
                        <span className="text-slate-600 text-sm">{teacher.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-center text-slate-600">{c.students.length}</td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`inline-flex items-center justify-center w-12 h-6 rounded-full text-xs font-700 ${a >= 5.5 ? 'bg-green-100 text-green-700' : a >= 4 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{a.toFixed(1)}</span>
                    </td>
                    <td className="px-5 py-3.5 text-center text-slate-600">{p.toFixed(0)}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function CoordStudents() {
  const allStudents = useMemo(() => {
    const map = new Map<string, Student>()
    COURSES.forEach(c => c.students.forEach(s => map.set(s.id, s)))
    return Array.from(map.values())
  }, [])

  return (
    <div>
      <h2 className="text-xl font-800 text-slate-800 mb-1">Estudiantes</h2>
      <p className="text-sm text-slate-500 mb-6">{allStudents.length} estudiantes matriculados</p>
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-700 uppercase tracking-wide text-slate-400">Nombre</th>
                <th className="text-left px-5 py-3 text-xs font-700 uppercase tracking-wide text-slate-400 hidden sm:table-cell">RUT</th>
                <th className="text-center px-5 py-3 text-xs font-700 uppercase tracking-wide text-slate-400">Asistencia</th>
              </tr>
            </thead>
            <tbody>
              {allStudents.map(s => (
                <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-700 flex-shrink-0">{s.name.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
                      <span className="font-600 text-slate-700">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-500 hidden sm:table-cell">{s.rut}</td>
                  <td className="px-5 py-3 text-center">
                    <span className={`text-xs font-700 px-2 py-0.5 rounded-full ${s.attendance >= 90 ? 'bg-green-100 text-green-700' : s.attendance >= 75 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{s.attendance}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function CoordReports() {
  const subjectData = TEACHERS.map(t => {
    const courses = COURSES.filter(c => t.courseIds.includes(c.id))
    const gs = courses.flatMap(c => c.grades)
    return { subject: t.subject, avg: avg(gs), pass: passRate(gs) }
  })
  const maxAvg = Math.max(...subjectData.map(d => d.avg))

  return (
    <div>
      <h2 className="text-xl font-800 text-slate-800 mb-1">Reportes</h2>
      <p className="text-sm text-slate-500 mb-6">Resumen estadístico por materia</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-700 text-slate-600 mb-4">Promedio por materia</h3>
          <div className="space-y-3">
            {subjectData.map(d => (
              <div key={d.subject}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-600 text-slate-600">{d.subject}</span>
                  <span className={`font-700 ${d.avg >= 5.5 ? 'text-green-600' : d.avg >= 4 ? 'text-amber-600' : 'text-red-600'}`}>{d.avg.toFixed(2)}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className={`h-2 rounded-full transition-all ${d.avg >= 5.5 ? 'bg-green-500' : d.avg >= 4 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${(d.avg / maxAvg) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-700 text-slate-600 mb-4">Tasa de aprobación</h3>
          <div className="space-y-3">
            {subjectData.map(d => (
              <div key={d.subject}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-600 text-slate-600">{d.subject}</span>
                  <span className={`font-700 ${d.pass >= 70 ? 'text-green-600' : d.pass >= 50 ? 'text-amber-600' : 'text-red-600'}`}>{d.pass.toFixed(0)}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className={`h-2 rounded-full transition-all ${d.pass >= 70 ? 'bg-green-500' : d.pass >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${d.pass}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
        <h3 className="text-sm font-700 text-slate-600 mb-4">Distribución de notas por curso</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['Curso','Materia','Sobresaliente (≥6)','Aprobado (4–5.9)','Reprobado (<4)'].map(h => (
                  <th key={h} className="text-left px-4 py-2 text-xs font-700 uppercase tracking-wide text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COURSES.map(c => {
                const sobres = c.grades.filter(g => g.value >= 6).length
                const aprobados = c.grades.filter(g => g.value >= 4 && g.value < 6).length
                const reprobados = c.grades.filter(g => g.value < 4).length
                return (
                  <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-700 text-slate-700">{c.grade}</td>
                    <td className="px-4 py-2.5 text-slate-600">{c.name}</td>
                    <td className="px-4 py-2.5"><span className="text-xs bg-green-100 text-green-700 font-700 px-2 py-0.5 rounded-full">{sobres}</span></td>
                    <td className="px-4 py-2.5"><span className="text-xs bg-amber-100 text-amber-700 font-700 px-2 py-0.5 rounded-full">{aprobados}</span></td>
                    <td className="px-4 py-2.5"><span className="text-xs bg-red-100 text-red-700 font-700 px-2 py-0.5 rounded-full">{reprobados}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function CoordSettings() {
  return (
    <div>
      <h2 className="text-xl font-800 text-slate-800 mb-1">Configuración</h2>
      <p className="text-sm text-slate-500 mb-6">Gestión del sistema escolar</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { label: 'Nombre del colegio', value: 'Colegio San Ignacio' },
          { label: 'Año escolar', value: '2024' },
          { label: 'RBD', value: '12345-6' },
          { label: 'Dirección', value: 'Av. Providencia 123, Santiago' },
          { label: 'Teléfono', value: '+56 2 2345 6789' },
          { label: 'Email institucional', value: 'contacto@sanignacio.cl' },
        ].map(f => (
          <div key={f.label} className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <label className="block text-xs font-700 uppercase tracking-wide text-slate-400 mb-1.5">{f.label}</label>
            <input defaultValue={f.value} className="w-full text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400" />
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-end">
        <button className="px-6 py-2.5 rounded-xl text-sm font-700 text-white bg-blue-600 hover:bg-blue-700 transition-colors">Guardar cambios</button>
      </div>
    </div>
  )
}

// ─── COORDINATOR VIEW ─────────────────────────────────────────────────────

function CoordinatorApp({ onLogout }: { onLogout: () => void }) {
  const [section, setSection] = useState<CoordSection>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const sectionLabel = COORD_NAV.find(n => n.id === section)?.label ?? ''

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar
        active={section}
        onSelect={setSection}
        onLogout={onLogout}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 flex items-center gap-3 px-4 sm:px-6 bg-white border-b border-slate-100 flex-shrink-0">
          <button
            className="lg:hidden text-slate-500 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Icon name="menu" size={22} />
          </button>
          <h1 className="font-800 text-slate-800 text-base">{sectionLabel}</h1>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:block">Año 2024</span>
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-700">CO</div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {section === 'dashboard' && <CoordDashboard />}
          {section === 'teachers'  && <CoordTeachers />}
          {section === 'courses'   && <CoordCourses />}
          {section === 'students'  && <CoordStudents />}
          {section === 'reports'   && <CoordReports />}
          {section === 'settings'  && <CoordSettings />}
        </main>
      </div>
    </div>
  )
}

// ─── TEACHER VIEW ─────────────────────────────────────────────────────────

function CourseStats({ course }: { course: Course }) {
  const a = avg(course.grades)
  const p = passRate(course.grades)
  const max = Math.max(...course.grades.map(g => g.value))
  const min = Math.min(...course.grades.map(g => g.value))

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <StatCard label="Promedio" value={a.toFixed(2)} accent={a >= 5.5 ? 'text-green-600' : a >= 4 ? 'text-amber-600' : 'text-red-600'} />
      <StatCard label="Aprobación" value={`${p.toFixed(0)}%`} sub={`${course.grades.filter(g => g.value >= 4).length} de ${course.grades.length}`} />
      <StatCard label="Nota más alta" value={max.toFixed(1)} accent="text-green-600" />
      <StatCard label="Nota más baja" value={min.toFixed(1)} accent={min < 4 ? 'text-red-600' : 'text-slate-800'} />
    </div>
  )
}

function CourseDetail({ course, onBack }: { course: Course; onBack: () => void }) {
  const teacher = TEACHERS.find(t => t.id === course.teacherId)!

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-blue-600 font-600 hover:text-blue-700 mb-4">
        <Icon name="back" size={16} />
        Volver a mis cursos
      </button>

      <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-6">
        <div>
          <h2 className="text-xl font-800 text-slate-800">{course.name} — {course.grade}</h2>
          <p className="text-sm text-slate-500 mt-0.5">Docente: {teacher.name} · {course.students.length} estudiantes</p>
        </div>
      </div>

      <h3 className="text-xs font-700 uppercase tracking-wide text-slate-400 mb-3">Estadísticas del curso</h3>
      <CourseStats course={course} />

      {/* Distribution bar */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 mb-6">
        <h3 className="text-sm font-700 text-slate-600 mb-3">Distribución de notas</h3>
        <div className="flex gap-1 h-14 items-end">
          {[1,2,3,4,5,6,7].map(n => {
            const count = course.grades.filter(g => Math.floor(g.value) === (n === 7 ? 7 : n)).length
            const maxCount = Math.max(...[1,2,3,4,5,6,7].map(x => course.grades.filter(g => Math.floor(g.value) === x).length), 1)
            return (
              <div key={n} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-slate-400">{count > 0 ? count : ''}</span>
                <div
                  className={`w-full rounded-t-sm ${n >= 4 ? 'bg-blue-400' : 'bg-red-300'}`}
                  style={{ height: count > 0 ? `${(count / maxCount) * 44}px` : '2px', minHeight: '2px' }}
                />
                <span className="text-[10px] font-700 text-slate-400">{n}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Student grades table */}
      <h3 className="text-xs font-700 uppercase tracking-wide text-slate-400 mb-3">Notas de estudiantes</h3>
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-700 uppercase tracking-wide text-slate-400">Estudiante</th>
                <th className="text-left px-5 py-3 text-xs font-700 uppercase tracking-wide text-slate-400 hidden sm:table-cell">RUT</th>
                <th className="text-center px-5 py-3 text-xs font-700 uppercase tracking-wide text-slate-400">Nota</th>
                <th className="text-center px-5 py-3 text-xs font-700 uppercase tracking-wide text-slate-400">Asistencia</th>
                <th className="text-center px-5 py-3 text-xs font-700 uppercase tracking-wide text-slate-400 hidden sm:table-cell">Estado</th>
              </tr>
            </thead>
            <tbody>
              {course.students.map(s => {
                const g = course.grades.find(g => g.studentId === s.id)
                const v = g?.value ?? 0
                return (
                  <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-700 flex-shrink-0">
                          {s.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                        </div>
                        <span className="font-600 text-slate-700">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-500 hidden sm:table-cell">{s.rut}</td>
                    <td className="px-5 py-3 text-center">
                      <span className={`inline-flex items-center justify-center w-12 h-6 rounded-full text-xs font-700 ${gradeColor(v)}`}>{v.toFixed(1)}</span>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className={`text-xs font-700 px-2 py-0.5 rounded-full ${s.attendance >= 90 ? 'bg-green-100 text-green-700' : s.attendance >= 75 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{s.attendance}%</span>
                    </td>
                    <td className="px-5 py-3 text-center hidden sm:table-cell">
                      <span className={`text-xs font-600 ${v >= 4 ? 'text-green-600' : 'text-red-600'}`}>{v >= 4 ? 'Aprobado' : 'Reprobado'}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function TeacherApp({ teacher, onLogout }: { teacher: Teacher; onLogout: () => void }) {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)
  const courses = COURSES.filter(c => teacher.courseIds.includes(c.id))
  const selectedCourse = courses.find(c => c.id === selectedCourseId) ?? null

  const allGrades = courses.flatMap(c => c.grades)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Icon name="student" size={16} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-400 leading-none">EduGestión</p>
            <p className="font-700 text-slate-800 text-sm truncate">{teacher.name}</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden sm:block text-xs font-600 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">{teacher.subject}</span>
            <button onClick={onLogout} className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-lg hover:bg-slate-100">
              <Icon name="logout" size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6">
        {selectedCourse ? (
          <CourseDetail course={selectedCourse} onBack={() => setSelectedCourseId(null)} />
        ) : (
          <div>
            {/* Teacher stats */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-800 flex-shrink-0">{teacher.avatar}</div>
                <div>
                  <h2 className="text-xl font-800 text-slate-800">{teacher.name}</h2>
                  <p className="text-slate-500 text-sm">{teacher.subject} · {teacher.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <StatCard label="Mis cursos" value={courses.length.toString()} />
                <StatCard label="Total alumnos" value={new Set(courses.flatMap(c => c.students.map(s => s.id))).size.toString()} />
                <StatCard label="Promedio global" value={avg(allGrades).toFixed(2)} accent={avg(allGrades) >= 5.5 ? 'text-green-600' : 'text-amber-600'} />
                <StatCard label="Aprobación" value={`${passRate(allGrades).toFixed(0)}%`} />
              </div>
            </div>

            <h3 className="text-xs font-700 uppercase tracking-wide text-slate-400 mb-3">Mis cursos</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map(c => {
                const a = avg(c.grades)
                const p = passRate(c.grades)
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCourseId(c.id)}
                    className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 text-left hover:shadow-md hover:border-blue-200 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-xs font-700 uppercase tracking-wide text-blue-600">{c.name}</p>
                        <p className="text-2xl font-800 text-slate-800 mt-0.5">{c.grade}</p>
                      </div>
                      <span className="text-slate-300 group-hover:text-blue-400 transition-colors"><Icon name="chevron" size={20} /></span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-slate-400">{c.students.length} estudiantes</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="h-1.5 w-24 rounded-full bg-slate-100">
                            <div
                              className={`h-1.5 rounded-full ${p >= 70 ? 'bg-green-500' : p >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                              style={{ width: `${p}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-400">{p.toFixed(0)}% aprob.</span>
                        </div>
                      </div>
                      <span className={`text-2xl font-800 ${a >= 5.5 ? 'text-green-600' : a >= 4 ? 'text-amber-600' : 'text-red-600'}`}>{a.toFixed(1)}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

// ─── ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  const [login, setLogin] = useState<LoginInfo | null>(null)

  if (!login) return <Login onLogin={setLogin} />

  if (login.role === 'coordinator') {
    return <CoordinatorApp onLogout={() => setLogin(null)} />
  }

  const teacher = TEACHERS.find(t => t.id === login.teacherId)!
  return <TeacherApp teacher={teacher} onLogout={() => setLogin(null)} />
}
