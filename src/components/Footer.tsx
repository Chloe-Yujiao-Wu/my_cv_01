import { profile } from '../data/resume'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10 bg-[rgb(var(--footer-rgb))] text-white transition-colors duration-300">
      <div className="container-content flex flex-col items-center gap-3 py-8 text-center">
        <p className="caption text-white/50">
          © {year} {profile.name} • {profile.role}. 保留所有权利.
        </p>
        <p className="caption text-white/30">设计理念：Clean Editorial • Built with Code &amp; Passion</p>
      </div>
    </footer>
  )
}
