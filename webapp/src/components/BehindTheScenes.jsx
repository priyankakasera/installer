import {
  FiDownload,
  FiSettings,
  FiCheckCircle,
  FiTrash2,
  FiFolder,
  FiTerminal,
} from 'react-icons/fi'

const installSteps = [
  {
    icon: FiDownload,
    title: 'Download from Official Source',
    description:
      "The installer fetches the latest version directly from the tool\u0027s official website or repository \u2014 no third-party mirrors.",
  },
  {
    icon: FiFolder,
    title: 'Extract & Place Binaries',
    description:
      'Archives are extracted to a clean directory structure. Portable tools are placed without running bloated setup wizards.',
  },
  {
    icon: FiTerminal,
    title: 'Configure PATH & Environment Variables',
    description:
      'The required PATH entries and environment variables (e.g. JAVA_HOME, MAVEN_HOME) are set automatically at the system level.',
  },
  {
    icon: FiCheckCircle,
    title: 'Verify Installation',
    description:
      "Each tool is verified by running its version command to ensure it\u0027s correctly installed and accessible from any terminal.",
  },
]

const uninstallSteps = [
  {
    icon: FiTrash2,
    title: 'Remove Tool Files',
    description:
      'All binaries, libraries, and configuration files installed by the tool are deleted from disk.',
  },
  {
    icon: FiTerminal,
    title: 'Clean PATH Entries',
    description:
      'Any PATH entries added during installation are removed, keeping your system PATH clean and clutter-free.',
  },
  {
    icon: FiSettings,
    title: 'Remove Environment Variables',
    description:
      'Environment variables like JAVA_HOME or PYTHON_HOME that were created during setup are cleaned up.',
  },
  {
    icon: FiFolder,
    title: 'Clean Leftover Files',
    description:
      'Residual cache files, temporary downloads, and empty directories are swept away — leaving no trace behind.',
  },
]

export default function BehindTheScenes() {
  return (
    <section className="py-20 lg:py-28" id="behind-the-scenes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="section-label">Transparency</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mt-4 mb-4">
          Behind the Scenes
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-14">
          Transparency matters. Here's exactly what happens when you install or
          uninstall a tool — no hidden processes, no surprises.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Installation */}
          <div>
            <h3 className="flex items-center gap-2 text-xl font-semibold text-white mb-6">
              <span className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <FiDownload className="w-4 h-4 text-green-400" />
              </span>
              During Installation
            </h3>
            <div className="space-y-4">
              {installSteps.map((step, i) => (
                <div
                  key={step.title}
                  className="flex gap-4 bg-dark-card border border-dark-border rounded-xl p-5 hover:border-green-500/30 transition-colors duration-300"
                >
                  <div className="flex flex-col items-center">
                    <span className="w-7 h-7 rounded-full bg-green-500/10 text-green-400 text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    {i < installSteps.length - 1 && (
                      <div className="w-px flex-1 bg-dark-border mt-2" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Uninstallation */}
          <div>
            <h3 className="flex items-center gap-2 text-xl font-semibold text-white mb-6">
              <span className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <FiTrash2 className="w-4 h-4 text-red-400" />
              </span>
              During Cleanup / Uninstallation
            </h3>
            <div className="space-y-4">
              {uninstallSteps.map((step, i) => (
                <div
                  key={step.title}
                  className="flex gap-4 bg-dark-card border border-dark-border rounded-xl p-5 hover:border-red-500/30 transition-colors duration-300"
                >
                  <div className="flex flex-col items-center">
                    <span className="w-7 h-7 rounded-full bg-red-500/10 text-red-400 text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    {i < uninstallSteps.length - 1 && (
                      <div className="w-px flex-1 bg-dark-border mt-2" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
