import { FaJava, FaNodeJs, FaPython, FaGitAlt } from 'react-icons/fa'
import { SiApachemaven } from 'react-icons/si'

const tools = [
  { name: 'Java', icon: FaJava, color: '#e76f00' },
  { name: 'Maven', icon: SiApachemaven, color: '#c71a36' },
  { name: 'Node.js', icon: FaNodeJs, color: '#68a063' },
  { name: 'Python', icon: FaPython, color: '#3776ab' },
  { name: 'Git', icon: FaGitAlt, color: '#f05032' },
]

export default function IncludedTools() {
  return (
    <section className="py-20 lg:py-28 bg-dark-lighter/50" id="tools">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-14">
          Included Tools
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="group bg-dark-card border border-dark-border rounded-2xl p-6 flex flex-col items-center gap-3 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
            >
              <tool.icon
                className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
                style={{ color: tool.color }}
              />
              <span className="text-white font-medium">{tool.name}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 mt-8 text-sm">
          Plus Docker, Kubernetes CLI, AWS CLI, Azure CLI, VS Code, IntelliJ
          IDEA, and more.
        </p>
      </div>
    </section>
  )
}
