import {
  FaJava,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaDocker,
  FaAws,
} from 'react-icons/fa'
import {
  SiApachemaven,
  SiGradle,
  SiYarn,
  SiKubernetes,
  SiPostman,
} from 'react-icons/si'
import { VscCode, VscAzure } from 'react-icons/vsc'
import {
  FiPackage,
  FiBox,
  FiCode,
  FiCloud,
  FiTerminal,
  FiTool,
} from 'react-icons/fi'

const categories = [
  {
    name: 'Core Runtimes',
    icon: FiCode,
    tools: [
      { name: 'Java', icon: FaJava, color: '#e76f00' },
      { name: 'Node.js', icon: FaNodeJs, color: '#68a063' },
      { name: 'Python', icon: FaPython, color: '#3776ab' },
    ],
  },
  {
    name: 'Package Managers',
    icon: FiPackage,
    tools: [
      { name: 'Maven', icon: SiApachemaven, color: '#c71a36' },
      { name: 'Gradle', icon: SiGradle, color: '#02303a' },
      { name: 'Yarn', icon: SiYarn, color: '#2c8ebb' },
      { name: 'Chocolatey', icon: FiBox, color: '#80b5e3' },
    ],
  },
  {
    name: 'Version Control',
    icon: FiTerminal,
    tools: [{ name: 'Git', icon: FaGitAlt, color: '#f05032' }],
  },
  {
    name: 'Cloud & DevOps',
    icon: FiCloud,
    tools: [
      { name: 'Docker', icon: FaDocker, color: '#2496ed' },
      { name: 'kubectl', icon: SiKubernetes, color: '#326ce5' },
      { name: 'AWS CLI', icon: FaAws, color: '#ff9900' },
      { name: 'Azure CLI', icon: VscAzure, color: '#0078d4' },
    ],
  },
  {
    name: 'IDEs & Editors',
    icon: FiTool,
    tools: [
      { name: 'VS Code', icon: VscCode, color: '#007acc' },
      { name: 'IntelliJ IDEA', icon: FiCode, color: '#fe315d' },
      { name: 'Notepad++', icon: FiTerminal, color: '#90e59a' },
    ],
  },
  {
    name: 'API Tools',
    icon: FiPackage,
    tools: [{ name: 'Postman', icon: SiPostman, color: '#ff6c37' }],
  },
]

const bundles = [
  {
    name: 'Java Developer',
    tools: 'Java, Maven, Gradle, Git, IntelliJ IDEA',
    color: 'from-orange-500/20 to-red-500/20',
    border: 'border-orange-500/20',
  },
  {
    name: 'Full-Stack Developer',
    tools: 'Java, Node.js, Python, Maven, Git, VS Code',
    color: 'from-blue-500/20 to-purple-500/20',
    border: 'border-blue-500/20',
  },
  {
    name: 'Frontend Developer',
    tools: 'Node.js, Yarn, Git, VS Code',
    color: 'from-green-500/20 to-teal-500/20',
    border: 'border-green-500/20',
  },
  {
    name: 'Cloud & DevOps',
    tools: 'Docker, kubectl, AWS CLI, Azure CLI, Git',
    color: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/20',
  },
]

export default function IncludedTools() {
  return (
    <section className="py-20 lg:py-28 bg-dark-lighter/50" id="tools">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="section-label">Tools</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mt-4 mb-4">
          16+ Developer Tools, One Installer
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-14">
          Install Java, setup Node.js, configure Python, and more — all
          downloaded from official sources with automatic PATH configuration.
        </p>

        {/* Tool categories */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="bg-dark-card border border-dark-border rounded-2xl p-6 hover:border-primary/40 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <cat.icon className="w-5 h-5 text-primary-light" />
                <h3 className="text-white font-semibold">{cat.name}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {cat.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-2 px-3 py-1.5 bg-dark-lighter rounded-lg border border-dark-border"
                  >
                    <tool.icon
                      className="w-4 h-4 shrink-0"
                      style={{ color: tool.color }}
                    />
                    <span className="text-sm text-gray-300">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Setup bundles */}
        <h3 className="text-2xl font-bold text-white text-center mb-2">
          One-Click Setup Bundles
        </h3>
        <p className="text-gray-400 text-center max-w-xl mx-auto mb-8">
          Pre-configured bundles for common workflows. Select a bundle and
          install everything you need in one click.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bundles.map((b) => (
            <div
              key={b.name}
              className={`bg-gradient-to-br ${b.color} border ${b.border} rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300`}
            >
              <h4 className="text-white font-semibold mb-2">{b.name}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                {b.tools}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
