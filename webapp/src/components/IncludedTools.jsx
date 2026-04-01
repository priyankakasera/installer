import {
  FiPackage,
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
      { name: 'Java', logo: '/icons/java.webp' },
      { name: 'Node.js', logo: '/icons/nodejs.svg' },
      { name: 'Python', logo: '/icons/python.svg' },
    ],
  },
  {
    name: 'Package Managers',
    icon: FiPackage,
    tools: [
      { name: 'Maven', logo: '/icons/maven.svg' },
      { name: 'Gradle', logo: '/icons/gradle.svg' },
      { name: 'Yarn', logo: '/icons/yarn.svg' },
      { name: 'Chocolatey', logo: '/icons/chocolatey.webp' },
    ],
  },
  {
    name: 'Version Control',
    icon: FiTerminal,
    tools: [{ name: 'Git', logo: '/icons/github.svg' }],
  },
  {
    name: 'Cloud & DevOps',
    icon: FiCloud,
    tools: [
      { name: 'kubectl', logo: '/icons/kubernetes.webp' },
      { name: 'AWS CLI', logo: '/icons/aws.webp' },
      { name: 'Azure CLI', logo: '/icons/azure.webp' },
    ],
  },
  {
    name: 'IDEs & Editors',
    icon: FiTool,
    tools: [
      { name: 'VS Code', logo: '/icons/vscode.webp' },
      { name: 'IntelliJ IDEA', logo: '/icons/intellij.webp' },
      { name: 'Notepad++', logo: '/icons/notepadpp.webp' },
    ],
  },
  {
    name: 'API Tools',
    icon: FiPackage,
    tools: [{ name: 'Postman', logo: '/icons/postman.svg' }],
  },
]

const bundles = [
  {
    name: 'Java Developer',
    tools: 'Java, Maven, Gradle, Git',
    color: 'from-orange-500/20 to-red-500/20',
    border: 'border-orange-500/20',
  },
  {
    name: 'Full-Stack Developer',
    tools: 'Java, Node.js, Python, Git',
    color: 'from-blue-500/20 to-purple-500/20',
    border: 'border-blue-500/20',
  },
  {
    name: 'Frontend Developer',
    tools: 'Node.js, Git',
    color: 'from-green-500/20 to-teal-500/20',
    border: 'border-green-500/20',
  },
  {
    name: 'Cloud & DevOps',
    tools: 'kubectl, AWS CLI, Azure CLI',
    color: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/20',
  },
]

export default function IncludedTools() {
  return (
    <section className="content-auto py-20 lg:py-28 bg-dark-lighter/50" id="tools">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="section-label">Tools</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mt-4 mb-4">
          15+ Developer Tools, One Installer
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
                    <img
                      src={tool.logo}
                      alt={tool.name}
                      width={16}
                      height={16}
                      className="w-4 h-4 shrink-0 object-contain"
                      loading="lazy"
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
