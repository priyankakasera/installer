/**
 * Per-tool guide data used by the How-To Guides pages.
 * Sourced from desktopapp/src/config/tools.json — keep in sync.
 */

const toolGuides = [
  {
    id: 'java',
    author: { name: 'Vishal Hulawale', slug: 'vishalhulawale' },
    name: 'Java (JDK)',
    headline: 'How to Install Java on Windows',
    seoTitle: 'Install Java JDK on Windows — JAVA_HOME Done Right (2026)',
    seoDescription: 'Set up Java JDK 21, 17, or 11 on Windows with JAVA_HOME and PATH configured automatically. Step-by-step guide — works on Windows 10 & 11.',
    lastReviewed: '2026-04-01',
    relatedGuides: ['maven', 'gradle', 'intellij-idea'],
    description:
      'Install a JDK on Windows so Java apps, build tools, Android Studio, and IDEs can find java, javac, and JAVA_HOME.',
    editorial: `Picture this: you clone a Spring Boot repository, run "mvn clean install," and immediately hit "JAVA_HOME is not set." It is the most common environment error on Windows, and it happens because installing Java on this platform requires more than running a setup wizard.

The JDK (Java Development Kit) bundles the Java compiler, the runtime, and essential tools like jar and javadoc. Java itself powers everything from Android apps to backend services running on Spring Boot, Kafka, and Apache Spark. With over 35 billion active JVM instances worldwide, it is one of the most deployed runtimes in production — and for good reason.

Getting it right on Windows means three things: installing the JDK itself, setting the JAVA_HOME environment variable to the JDK root directory (not the bin folder — a mistake we see constantly), and adding %JAVA_HOME%\\bin to PATH so that Maven, Gradle, and your IDE can locate the compiler automatically. Miss any one of these, and your build tools will fail with cryptic errors.

We support Oracle JDK 21 (the current long-term support release) as well as Adoptium Temurin builds for JDK 17 and 11. This guide walks through both the one-click automated installation and the full manual setup, including troubleshooting for multi-version conflicts.`,
    category: 'Core Runtimes',
    versions: ['21.0.10', '17.0.18', '11.0.30'],
    defaultVersion: '21.0.10',
    downloadSource: 'https://download.oracle.com/java/21/latest/jdk-21_windows-x64_bin.msi',
    downloadLabel: 'Oracle JDK 21 (official)',
    altSources: [
      'Adoptium Temurin 17: https://adoptium.net/temurin/releases/?version=17',
      'Adoptium Temurin 11: https://adoptium.net/temurin/releases/?version=11',
    ],
    envVars: [
      { name: 'JAVA_HOME', value: 'C:\\Program Files\\Java\\jdk-{version}' },
    ],
    pathEntries: ['%JAVA_HOME%\\bin'],
    verifyCommand: 'java -version',
    verifyOutput: 'java version "21.0.x" or openjdk version "21.0.x"',
    useCases: [
      'Building enterprise backend services with Spring Boot or Jakarta EE.',
      'Android app development — Android Studio requires a JDK to compile projects.',
      'Running build tools like Maven and Gradle, both of which depend on a JDK.',
      'Developing cross-platform desktop apps with JavaFX or Swing.',
      'Running big-data frameworks such as Apache Spark, Hadoop, and Kafka that are built on the JVM.',
    ],
    commonIssues: [
      { problem: 'JAVA_HOME is not set or points to the wrong directory', fix: 'Open System Properties → Environment Variables and set JAVA_HOME to the root of your JDK directory (e.g., C:\\Program Files\\Java\\jdk-21.0.10). Do not include the \\bin folder in JAVA_HOME.' },
      { problem: '"java" is not recognized as an internal or external command', fix: 'Ensure %JAVA_HOME%\\bin is in your system PATH. Open a new terminal after making changes — existing terminals do not pick up PATH updates.' },
      { problem: 'Multiple Java versions conflict with each other', fix: 'Check your PATH for old Java entries (e.g., C:\\Program Files\\Java\\jdk-17). Remove outdated entries or reorder them so the desired version appears first. Run "where java" to see which binary Windows resolves.' },
      { problem: 'Maven or Gradle reports "invalid target release" errors', fix: 'The JDK version used by your build tool must match or exceed the target version in your project. Run "java -version" and compare with your pom.xml or build.gradle settings.' },
    ],
    tips: [
      'Use JDK 21 (LTS) for new projects — it receives long-term security updates and is the current recommended version for production.',
      'JDK 17 is the previous LTS release and is still widely used in enterprise environments. Choose it if your project or CI pipeline requires it.',
      'JDK 11 is end-of-life for Oracle JDK but still supported through Adoptium Temurin. Use it only for legacy projects that cannot upgrade.',
      'After installation, always verify both "java -version" and "javac -version" to confirm the compiler is also available.',
      'If you switch between JDK versions frequently, consider using a version manager or simply update JAVA_HOME to point to the version you need.',
    ],
    steps: {
      appSteps: [
        'Open DevTools Installer.',
        'In Core Programming Runtimes, select "Java (JDK)" and choose the JDK version you need.',
        'Click "Install Selected".',
        'Let the installer download the official MSI, run it silently, set JAVA_HOME to the JDK root directory, and add `%JAVA_HOME%\\bin` to PATH.',
        'Open a new terminal window after the install finishes.',
        'Run `java -version` and `javac -version` to confirm Windows finds both the runtime and the compiler.',
      ],
      manualSteps: [
        'Download the MSI installer from the official source: https://download.oracle.com/java/21/latest/jdk-21_windows-x64_bin.msi',
        'Run the installer and keep note of the JDK install folder. A typical path is `C:\\Program Files\\Java\\jdk-21.0.10`.',
        'If you need a silent install, run: `msiexec /i jdk-21_windows-x64_bin.msi /quiet`',
        'Set JAVA_HOME to the JDK root directory. Do not point it to the \\bin folder.',
        'Add `%JAVA_HOME%\\bin` to your system PATH.',
        'Open a new terminal and run `java -version`, then run `javac -version`.',
      ],
    },
  },
  {
    id: 'nodejs',
    author: { name: 'Priyanka Kasera', slug: 'priyankakasera' },
    name: 'Node.js',
    headline: 'How to Install Node.js on Windows',
    seoTitle: 'Install Node.js on Windows — npm Ready in 2 Min (2026)',
    seoDescription: 'Download and install Node.js on Windows 10/11. Official MSI, automatic PATH setup, version selection from 18 to 25. Includes npm — no manual config.',
    lastReviewed: '2026-04-01',
    relatedGuides: ['yarn', 'vscode', 'git'],
    description:
      'Install Node.js on Windows so you can run node, npm, Vite, React, Next.js, and other JavaScript tooling from any terminal.',
    editorial: `Over two million packages live on npm, and virtually every frontend tool you use depends on Node.js to run. React's development server, Vite's build pipeline, ESLint, Prettier, Tailwind CSS — they all need a Node.js runtime on your machine before you can write a single line of application code.

Node.js is more than a frontend build dependency, though. It is a production-grade server runtime used by Netflix, LinkedIn, and PayPal for high-throughput API services. Frameworks like Express, Fastify, and NestJS turn it into a full backend platform, while tools like Electron use it to build cross-platform desktop apps (including the one you might be reading about on this page).

Choosing the right version matters more than most people realize. Even-numbered releases (22.x, 24.x) are LTS — they receive security patches for 30 months and are the safe choice for production. Odd-numbered releases (25.x) ship the newest V8 engine features but may introduce breaking changes between minor versions. This guide covers installing any version from 18 through 25, with automatic PATH configuration so both "node" and "npm" work from any terminal immediately.`,
    category: 'Core Runtimes',
    versions: ['25.8.2', '24.14.1', '22.22.2', '20.20.2', '18.20.8'],
    defaultVersion: '25.8.2',
    downloadSource: 'https://nodejs.org/dist/v25.8.2/node-v25.8.2-x64.msi',
    downloadLabel: 'nodejs.org (official)',
    altSources: [],
    envVars: [],
    pathEntries: ['C:\\Program Files\\nodejs'],
    verifyCommand: 'node -v',
    verifyOutput: 'v25.8.2 (or whichever version you installed)',
    useCases: [
      'Running frontend build tools — Webpack, Vite, and esbuild all require Node.js.',
      'Developing React, Angular, Vue, or Next.js applications.',
      'Building server-side APIs and microservices with Express, Fastify, or NestJS.',
      'Running npm or yarn to manage JavaScript package dependencies.',
      'Executing scripts for task automation, testing, and CI/CD pipelines.',
    ],
    commonIssues: [
      { problem: '"node" is not recognized after installation', fix: 'Close and reopen your terminal. The MSI installer adds C:\\Program Files\\nodejs to PATH, but existing terminals will not see the change until they are restarted.' },
      { problem: 'npm install fails with EPERM or permission errors', fix: 'Run your terminal as Administrator, or install Node.js to a user-writable directory. Avoid installing global packages with plain "npm install -g" on restricted systems — use npx instead.' },
      { problem: 'Version mismatch between Node.js and project requirements', fix: 'Check your project\'s "engines" field in package.json. If you need a specific version, use DevTools Installer to install that version or consider using nvm-windows for version switching.' },
      { problem: 'node-gyp build errors during npm install', fix: 'Some native packages require Python and the Visual Studio Build Tools. Install Python via DevTools Installer and run "npm install --global windows-build-tools" from an Admin terminal.' },
    ],
    tips: [
      'LTS versions (even-numbered, like 22.x and 24.x) are recommended for production. Current versions (odd-numbered, like 25.x) include the latest features but may have breaking changes.',
      'npm is bundled with Node.js — you do not need to install it separately. Run "npm -v" after installing Node.js to confirm.',
      'If your project uses Yarn, install Node.js first (Yarn depends on it), then install Yarn separately through DevTools Installer.',
      'For monorepo or workspace-heavy projects, Node.js 22+ includes experimental support for the built-in package manager corepack.',
    ],
    steps: {
      appSteps: [
        'Open DevTools Installer.',
        'In Core Programming Runtimes, select "Node.js" and choose the version your project needs.',
        'Click "Install Selected".',
        'Let the installer download the official MSI, run it silently, and add `C:\\Program Files\\nodejs` to PATH.',
        'Open a new terminal window after the install finishes.',
        'Run `node -v` and `npm -v` to verify both commands work.',
      ],
      manualSteps: [
        'Download the official MSI from https://nodejs.org/dist/v25.8.2/node-v25.8.2-x64.msi',
        'Run the installer and keep the default install directory unless you have a reason to change it.',
        'If you need a silent install, run: `msiexec /i node-v25.8.2-x64.msi /quiet`',
        'The installer adds `C:\\Program Files\\nodejs` to PATH automatically.',
        'Open a new terminal and run `node -v`.',
        'Run `npm -v` to confirm npm was installed with Node.js.',
      ],
    },
  },
  {
    id: 'python',
    author: { name: 'Priyanka Kasera', slug: 'priyankakasera' },
    name: 'Python',
    headline: 'How to Install Python on Windows',
    seoTitle: 'Install Python on Windows — Fix the Store Redirect (2026)',
    seoDescription: 'Install Python 3.14–3.10 on Windows 10/11 the right way. Disable the Microsoft Store redirect, configure PATH, and verify pip — step-by-step.',
    lastReviewed: '2026-04-01',
    relatedGuides: ['miniconda', 'vscode', 'git'],
    description:
      'Install Python on Windows so you can run scripts, create virtual environments, and use pip without the Microsoft Store redirect getting in the way.',
    editorial: `You install Python, open a terminal, type "python," and Windows opens the Microsoft Store. It is the single most confusing thing about running Python on Windows, and it catches almost every new developer off guard. Windows 10 and 11 ship with a stub executable called python.exe that redirects to the Store instead of running your installed Python interpreter.

Once you get past that hurdle, Python is one of the most versatile tools you can install. It dominates data science (pandas, NumPy, Jupyter), machine learning (TensorFlow, PyTorch, scikit-learn), web development (Django, FastAPI), and automation scripting. Companies like Instagram, Spotify, and Dropbox run major production systems on Python.

The correct installation involves more than running the setup wizard. You need to check "Add Python to PATH" during installation — or use the silent flag PrependPath=1 — because the installer does not do this by default. Both the main Python directory and the Scripts subdirectory (where pip and other tools live) must be in PATH for package installation to work from the command line.

We support Python 3.14 through 3.10. This guide shows you how to disable the Windows Store redirect, install Python with proper PATH configuration, set up virtual environments, and verify that both python and pip are working. If you need conda environments for data science workflows, see our Miniconda guide instead.`,
    category: 'Core Runtimes',
    versions: ['3.14.3', '3.13.12', '3.12.10', '3.11.9', '3.10.11'],
    defaultVersion: '3.14.3',
    downloadSource: 'https://www.python.org/ftp/python/3.14.3/python-3.14.3-amd64.exe',
    downloadLabel: 'python.org (official)',
    altSources: [],
    envVars: [],
    pathEntries: [
      'C:\\Program Files\\Python\\Python314',
      'C:\\Program Files\\Python\\Python314\\Scripts',
    ],
    verifyCommand: 'python --version',
    verifyOutput: 'Python 3.14.3',
    useCases: [
      'Data science and analytics with pandas, NumPy, and Jupyter notebooks.',
      'Machine learning and AI model training with TensorFlow, PyTorch, and scikit-learn.',
      'Backend web development with Django, Flask, or FastAPI.',
      'Automation scripts for file processing, web scraping, and system administration.',
      'DevOps tooling — many infrastructure tools (Ansible, AWS CDK) are written in Python.',
    ],
    commonIssues: [
      { problem: '"python" opens the Microsoft Store instead of running Python', fix: 'Windows 10/11 ships with a stub that redirects to the Store. Disable it: Settings → Apps → App execution aliases → turn off "python.exe" and "python3.exe". Then reopen your terminal.' },
      { problem: 'pip is not recognized after installing Python', fix: 'Ensure the Scripts directory (e.g., C:\\Program Files\\Python\\Python314\\Scripts) is in your PATH. DevTools Installer adds it automatically, but manual installs may skip this if you did not check "Add Python to PATH".' },
      { problem: 'Permission denied when installing packages globally', fix: 'Use "pip install --user <package>" to install into your user directory, or run the terminal as Administrator. Better yet, use a virtual environment: "python -m venv .venv" then activate it.' },
      { problem: 'Multiple Python versions cause confusion about which one runs', fix: 'Run "where python" to see all Python executables in your PATH. Reorder PATH entries or use the Python Launcher ("py -3.12 script.py") to target a specific version.' },
    ],
    tips: [
      'Always use virtual environments (venv) for project isolation. Run "python -m venv .venv" in your project folder to create one.',
      'Python 3.12+ is significantly faster than earlier versions due to interpreter optimizations. Upgrade if your dependencies support it.',
      'If you need conda environments for data science, install Miniconda instead of (or alongside) Python — it provides its own Python installation.',
      'After installing, verify both "python --version" and "pip --version" to confirm the package manager is available.',
    ],
    steps: {
      appSteps: [
        'Open DevTools Installer.',
        'In Core Programming Runtimes, select "Python" and choose the version you need.',
        'Click "Install Selected".',
        'Let the installer download the official package, run it silently with PrependPath=1, and add both the Python directory and the Scripts directory to PATH.',
        'Open a new terminal window after the install finishes.',
        'Run `python --version` and `pip --version` to confirm both commands work.',
      ],
      manualSteps: [
        'Download the official installer from https://www.python.org/ftp/python/3.14.3/python-3.14.3-amd64.exe',
        'Run the installer and check "Add Python to PATH" before you continue through the wizard.',
        'If you need a silent install, run: `python-3.14.3-amd64.exe /quiet InstallAllUsers=1 PrependPath=1`',
        'If typing python opens the Microsoft Store on your machine, turn off the python.exe and python3.exe app execution aliases in Windows Settings after the install.',
        'Open a new terminal and run `python --version`.',
        'Run `pip --version` to confirm pip is on PATH too.',
      ],
    },
  },
  {
    id: 'maven',
    author: { name: 'Vishal Hulawale', slug: 'vishalhulawale' },
    name: 'Apache Maven',
    headline: 'How to Install Maven on Windows',
    seoTitle: 'Install Maven on Windows — Fix MAVEN_HOME Fast (2026)',
    seoDescription: 'Step-by-step Maven setup on Windows with MAVEN_HOME, M2_HOME, and PATH done correctly. Official download, beginner-friendly, no config errors.',
    lastReviewed: '2026-04-01',
    relatedGuides: ['java', 'gradle', 'intellij-idea'],
    description:
      'Install Maven on Windows so you can build pom.xml projects, resolve dependencies, and run Maven commands from any terminal.',
    editorial: `If your project has a pom.xml, you need Maven. It is that simple. Apache Maven is the dominant build system in the Java enterprise world — it compiles your code, resolves dependencies from Maven Central, runs tests, and packages everything into deployable JAR or WAR files. Spring Boot, Micronaut, and most Jakarta EE frameworks generate Maven projects by default.

Maven does not come with a traditional installer. It ships as a zip archive that you extract manually, then you need to create two environment variables (MAVEN_HOME and M2_HOME) and add the bin directory to PATH. It also has a hard dependency on a JDK — Maven literally cannot start without one. This multi-step setup is the number one reason developers spend their first hour more frustrated than productive.

This guide covers the full Maven 3.9.14 installation process on Windows. We handle the environment variable configuration automatically with DevTools Installer, or walk you through each step if you prefer the manual route. We also cover proxy configuration for corporate environments and troubleshooting common "Could not find artifact" errors.`,
    category: 'Package Managers',
    versions: ['3.9.14'],
    defaultVersion: '3.9.14',
    downloadSource: 'https://dlcdn.apache.org/maven/maven-3/3.9.14/binaries/apache-maven-3.9.14-bin.zip',
    downloadLabel: 'Apache (official)',
    altSources: [],
    envVars: [
      { name: 'MAVEN_HOME', value: 'C:\\Program Files\\Maven\\apache-maven-3.9.14' },
      { name: 'M2_HOME', value: 'C:\\Program Files\\Maven\\apache-maven-3.9.14' },
    ],
    pathEntries: ['%MAVEN_HOME%\\bin'],
    verifyCommand: 'mvn -version',
    verifyOutput: 'Apache Maven 3.9.14',
    useCases: [
      'Building and packaging Java applications as JAR or WAR files.',
      'Managing project dependencies — Maven downloads libraries from Maven Central automatically.',
      'Standardizing project structure across teams using the Maven conventions.',
      'Running unit and integration tests as part of a build lifecycle.',
      'Generating project documentation, code-quality reports, and dependency trees.',
    ],
    commonIssues: [
      { problem: '"mvn" is not recognized as a command', fix: 'Verify MAVEN_HOME is set and %MAVEN_HOME%\\bin is in your PATH. Open a new terminal — existing sessions do not see PATH changes.' },
      { problem: 'Maven says "JAVA_HOME is not set" or uses the wrong Java version', fix: 'Maven requires a JDK, not just a JRE. Set JAVA_HOME to your JDK directory (e.g., C:\\Program Files\\Java\\jdk-21.0.10) and ensure it does not point to a JRE subfolder.' },
      { problem: 'Dependency downloads fail or are very slow', fix: 'Check your internet connection and any corporate proxy settings. Add proxy configuration to your Maven settings.xml file at %USERPROFILE%\\.m2\\settings.xml if behind a firewall.' },
      { problem: 'Build fails with "Could not find artifact" errors', fix: 'The dependency may not exist in Maven Central. Verify the groupId, artifactId, and version in your pom.xml. If it is a private artifact, configure a repository mirror in settings.xml.' },
    ],
    tips: [
      'Maven requires a JDK to be installed first. Install Java via DevTools Installer before installing Maven.',
      'The local repository cache is stored at %USERPROFILE%\\.m2\\repository. Delete it if you suspect corrupted downloads.',
      'Use "mvn clean install -DskipTests" during development for faster builds. Run tests separately with "mvn test".',
      'For multi-module projects, run "mvn install" from the root to build all modules in dependency order.',
    ],
    steps: {
      appSteps: [
        'Open DevTools Installer.',
        'In Package Managers, select "Apache Maven".',
        'Click "Install Selected".',
        'Let the installer download the official zip, extract it, set MAVEN_HOME and M2_HOME, and add `%MAVEN_HOME%\\bin` to PATH.',
        'Open a new terminal window after the install finishes.',
        'Run `mvn -version` to confirm Maven can find your JDK and start correctly.',
      ],
      manualSteps: [
        'Install a JDK first. Maven will not start without JAVA_HOME pointing to a JDK.',
        'Download the official zip from https://dlcdn.apache.org/maven/maven-3/3.9.14/binaries/apache-maven-3.9.14-bin.zip',
        'Extract the archive to `C:\\Program Files\\Maven\\apache-maven-3.9.14`.',
        'Set MAVEN_HOME to `C:\\Program Files\\Maven\\apache-maven-3.9.14`.',
        'Set M2_HOME to the same directory, then add `%MAVEN_HOME%\\bin` to PATH.',
        'Open a new terminal and run `mvn -version`.',
      ],
    },
  },
  {
    id: 'git',
    author: { name: 'Priyanka Kasera', slug: 'priyankakasera' },
    name: 'Git',
    headline: 'How to Install Git on Windows',
    seoTitle: 'Install Git on Windows — Setup Guide (2026)',
    seoDescription: 'Download Git for Windows and get Git Bash, credential manager, and PATH set up in 3 steps. Official installer, works on Windows 10 & 11.',
    lastReviewed: '2026-04-01',
    relatedGuides: ['github-desktop', 'vscode', 'nodejs'],
    description:
      'Install Git on Windows so you can clone repositories, commit changes, use Git Bash, and run git from any terminal.',
    editorial: `Before you install React, before you set up Python, before you configure your IDE — install Git. It is the one tool that every modern development workflow depends on, from solo side projects to thousand-engineer teams at Google and Microsoft. If you use GitHub, GitLab, or Bitbucket, you are using Git.

Git for Windows is more than just the core version control binary. The installation package includes Git Bash (a UNIX-like terminal that brings commands like grep, ssh, and curl to Windows), Git GUI for visual operations, and integration with the Windows Credential Manager so you do not have to type your password on every push.

What makes Git's Windows installation unique is the number of decisions the installer asks you to make: line-ending behavior, default editor, PATH modifications, SSH executable choice, HTTPS transport backend. The defaults are generally fine, but developers in mixed Windows/Linux teams should pay attention to the autocrlf setting to avoid constant line-ending noise in their diffs.

This guide installs Git 2.53 and covers essential post-install configuration — setting your name, email, default branch name, and line-ending behavior. We provide both the automated and manual installation paths.`,
    category: 'Version Control',
    versions: ['2.53.0'],
    defaultVersion: '2.53.0',
    downloadSource: 'https://github.com/git-for-windows/git/releases/download/v2.53.0.windows.1/Git-2.53.0-64-bit.exe',
    downloadLabel: 'git-scm.com / GitHub (official)',
    altSources: [],
    envVars: [],
    pathEntries: ['C:\\Program Files\\Git\\cmd'],
    verifyCommand: 'git --version',
    verifyOutput: 'git version 2.53.0.windows.1',
    useCases: [
      'Tracking changes to source code across individual and team projects.',
      'Collaborating on open-source or private repositories hosted on GitHub, GitLab, or Bitbucket.',
      'Branching and merging workflows for feature development, hotfixes, and releases.',
      'Integrating with CI/CD pipelines — Git is the trigger for nearly every modern build system.',
      'Managing dotfiles, configuration repos, and infrastructure-as-code projects.',
    ],
    commonIssues: [
      { problem: '"git" is not recognized after installation', fix: 'Git for Windows adds C:\\Program Files\\Git\\cmd to PATH. Close and reopen your terminal or restart your IDE. Run "where git" to verify the binary is found.' },
      { problem: 'Line ending warnings (LF vs CRLF) on every commit', fix: 'Configure Git to handle line endings consistently: run "git config --global core.autocrlf true" on Windows. This converts LF to CRLF on checkout and back on commit.' },
      { problem: 'SSH authentication fails when pushing to GitHub', fix: 'Generate an SSH key with "ssh-keygen -t ed25519" and add the public key to your GitHub account under Settings → SSH Keys. Test with "ssh -T git@github.com".' },
      { problem: 'Git Bash or Git GUI are missing from the context menu', fix: 'Re-run the Git installer and ensure "Windows Explorer integration" is checked. Alternatively, add the registry entries manually for the context menu items.' },
    ],
    tips: [
      'After installing Git, configure your identity immediately: "git config --global user.name Your Name" and "git config --global user.email you@example.com".',
      'Git for Windows includes Git Bash (a UNIX-like terminal), Git GUI, and integration with Windows Credential Manager for HTTPS authentication.',
      'If you prefer a visual interface, install GitHub Desktop alongside Git for a GUI-based workflow.',
      'Use "git config --global init.defaultBranch main" to set "main" as the default branch name for new repositories.',
    ],
    postInstallConfig: [
      { cmd: 'git config --global user.name "Your Name"', label: 'Set your display name — appears on every commit and is visible on GitHub' },
      { cmd: 'git config --global user.email "you@example.com"', label: 'Set the email that identifies your commits (use the same email as your GitHub account)' },
      { cmd: 'git config --global init.defaultBranch main', label: 'Set "main" as the default branch name for all new repositories' },
      { cmd: 'git config --global core.autocrlf true', label: 'Automatically convert Unix line endings (LF) to Windows (CRLF) on checkout, and back on commit' },
    ],
    steps: {
      appSteps: [
        'Open DevTools Installer.',
        'In Version Control, select "Git".',
        'Click "Install Selected".',
        'Let the installer download the official package, run it silently, and add `C:\\Program Files\\Git\\cmd` to PATH.',
        'Open a new terminal window after the install finishes.',
        'Run `git --version` to confirm Git is available.',
      ],
      manualSteps: [
        'Download the official installer from https://github.com/git-for-windows/git/releases/download/v2.53.0.windows.1/Git-2.53.0-64-bit.exe',
        'Run the installer and keep the default options unless your team requires different line-ending or SSH settings.',
        'Git for Windows adds `C:\\Program Files\\Git\\cmd` to PATH automatically.',
        'Open a new terminal and run `git --version`.',
        'Run the first-time setup commands in this guide to set your name, email, default branch, and line-ending behavior.',
      ],
    },
  },
  {
    id: 'github-desktop',
    author: { name: 'Priyanka Kasera', slug: 'priyankakasera' },
    name: 'GitHub Desktop',
    headline: 'How to Install GitHub Desktop on Windows',
    seoTitle: 'Install GitHub Desktop on Windows — No Admin Needed',
    seoDescription: 'Download and install GitHub Desktop on Windows. No admin required, no PATH setup. Visual Git client with built-in diff viewer and credential manager.',
    lastReviewed: '2026-04-01',
    relatedGuides: ['git', 'vscode', 'nodejs'],
    description:
      'Install GitHub Desktop on Windows if you want a visual way to clone repositories, review diffs, switch branches, and open pull requests.',
    editorial: `Not everyone loves the terminal, and that is perfectly fine. GitHub Desktop gives you a polished visual interface for the Git operations you perform most often — committing changes, creating branches, reviewing diffs line-by-line, and opening pull requests. It is built by GitHub's own team and integrates natively with GitHub.com and GitHub Enterprise.

What makes GitHub Desktop unusual in this guide is that it requires zero configuration. There is no PATH to set, no environment variable to create, and no administrator privileges needed. The Squirrel-based installer places the app in your user profile directory and handles its own updates silently. It even bundles its own Git binary, so you can use it without installing Git for Windows separately — though we recommend having both for full command-line coverage.

GitHub Desktop works with any Git repository, not just GitHub-hosted ones. You can add local repositories from GitLab, Bitbucket, or a self-hosted server and manage them through the same visual interface. The app excels at visual diff review, drag-and-drop branch management, and merge conflict resolution — tasks where a GUI genuinely saves time compared to reading raw diff output in a terminal.`,
    category: 'Version Control',
    versions: ['latest'],
    defaultVersion: 'latest',
    downloadSource: 'https://central.github.com/deployments/desktop/desktop/latest/GitHubDesktopSetup-x64.exe',
    downloadLabel: 'desktop.github.com (official)',
    altSources: [],
    envVars: [],
    pathEntries: [],
    verifyCommand: 'PowerShell detects app-* folder under %LOCALAPPDATA%\\GitHubDesktop',
    verifyOutput: 'GitHub Desktop 3.x.x',
    useCases: [
      'Developers who prefer a visual interface over command-line Git operations.',
      'Quickly reviewing diffs, staging individual lines, and writing commit messages in a GUI.',
      'Managing multiple GitHub repositories from a single dashboard.',
      'Onboarding new team members who are unfamiliar with Git command-line syntax.',
      'Resolving merge conflicts visually with side-by-side diff views.',
    ],
    commonIssues: [
      { problem: 'GitHub Desktop does not detect existing Git repositories', fix: 'Use File → Add Local Repository and browse to the folder containing the .git directory. GitHub Desktop only tracks repos that are explicitly added.' },
      { problem: 'Authentication fails when pushing to a private repository', fix: 'Sign out and sign back in via File → Options → Accounts. Ensure you are using the correct GitHub account and that the repository permissions are set correctly.' },
      { problem: 'The app installs but does not appear in the Start Menu', fix: 'GitHub Desktop uses a Squirrel-based installer that writes to %LOCALAPPDATA%\\GitHubDesktop. Restart Windows Explorer or search for "GitHub Desktop" in the Start Menu search bar.' },
      { problem: 'Conflicts between GitHub Desktop\'s bundled Git and standalone Git', fix: 'GitHub Desktop includes its own Git binary. If you also have Git for Windows installed, the standalone version takes priority in terminal sessions. GitHub Desktop always uses its bundled version in the GUI.' },
    ],
    tips: [
      'GitHub Desktop does not require administrator privileges — it installs per-user to your AppData folder.',
      'You can open any repository in your preferred editor (VS Code, IntelliJ, etc.) directly from the GitHub Desktop menu.',
      'GitHub Desktop automatically fetches and shows upstream changes, making it easy to stay in sync with your team.',
      'For advanced Git operations (rebase, cherry-pick, bisect), you will still need the Git command line. Install Git alongside GitHub Desktop for full coverage.',
    ],
    steps: {
      appSteps: [
        'Open DevTools Installer.',
        'In Version Control, select "GitHub Desktop".',
        'Click "Install Selected".',
        'Let the installer download the official setup package and run the install silently.',
        'The app installs per-user to `%LOCALAPPDATA%\\GitHubDesktop`, so administrator rights are not required.',
        'Open GitHub Desktop from the Start Menu and sign in with your GitHub account.',
      ],
      manualSteps: [
        'Download the installer from https://desktop.github.com/ or directly from https://central.github.com/deployments/desktop/desktop/latest/GitHubDesktopSetup-x64.exe',
        'Run the installer. It installs automatically to `%LOCALAPPDATA%\\GitHubDesktop`.',
        'No PATH changes are required because GitHub Desktop is a GUI application.',
        'Open GitHub Desktop from the Start Menu and complete the sign-in flow.',
        'If you want to verify the install from the file system, check that `%LOCALAPPDATA%\\GitHubDesktop\\app-*` exists.',
      ],
    },
  },
  {
    id: 'gradle',
    author: { name: 'Vishal Hulawale', slug: 'vishalhulawale' },
    name: 'Gradle',
    headline: 'How to Install Gradle on Windows',
    seoTitle: 'Install Gradle on Windows — GRADLE_HOME Setup (2026)',
    seoDescription: 'Set up Gradle on Windows with proper GRADLE_HOME and PATH. Requires JDK 17+. Covers wrapper usage, build cache, and common "Could not determine Java version" fix.',
    lastReviewed: '2026-04-01',
    relatedGuides: ['java', 'maven', 'intellij-idea'],
    description:
      'Install Gradle on Windows so you can run gradle commands, create new builds, and work on projects that do not already ship with the Gradle Wrapper.',
    editorial: `If you are building an Android app, you are already using Gradle — Android Studio will not work without it. But Gradle's reach extends well beyond mobile development. Spring Boot and Micronaut support Gradle as a first-class build tool, the Kotlin ecosystem has adopted it as the preferred build system, and large-scale projects at Netflix and LinkedIn run Gradle in production because of its performance advantages over Maven.

The fundamental difference between Gradle and Maven is flexibility. Maven uses XML-based POM files with a rigid lifecycle; Gradle uses build scripts written in Groovy or Kotlin DSL, giving you the full power of a real programming language to define custom tasks, conditional logic, and composite builds. This makes Gradle more expressive but also slightly harder to learn if you are coming from Maven's convention-over-configuration approach.

Performance is where Gradle truly separates itself. The Gradle daemon keeps a warm JVM process in memory between builds, avoiding the startup penalty that Maven pays every time. Incremental compilation skips files that have not changed, and the build cache can reuse outputs from previous runs — even across different machines in a CI pipeline. For large monorepos with hundreds of modules, these optimizations can cut build times from minutes to seconds.

Like Maven, Gradle ships as a zip archive. You extract it, set GRADLE_HOME, and add the bin directory to PATH. However, most existing projects ship with a Gradle Wrapper (gradlew.bat on Windows) that pins the exact Gradle version the project was tested against. The global installation you perform here is primarily for creating new projects with "gradle init" and running global tasks.

This guide installs Gradle 9.4.1 and covers environment variable setup, wrapper usage, and common troubleshooting — including the "Could not determine Java version" error that occurs when your JDK is too old for Gradle 9.x. A JDK is a hard prerequisite; install Java first.`,
    category: 'Package Managers',
    versions: ['9.4.1'],
    defaultVersion: '9.4.1',
    downloadSource: 'https://services.gradle.org/distributions/gradle-9.4.1-bin.zip',
    downloadLabel: 'gradle.org (official)',
    altSources: [],
    envVars: [
      { name: 'GRADLE_HOME', value: 'C:\\Program Files\\Gradle\\gradle-9.4.1' },
    ],
    pathEntries: ['%GRADLE_HOME%\\bin'],
    verifyCommand: 'gradle -v',
    verifyOutput: 'Gradle 9.4.1',
    useCases: [
      'Building Android applications — Android Studio uses Gradle as its default build system.',
      'Compiling and packaging Java, Kotlin, or Groovy projects with flexible dependency management.',
      'Multi-project builds in monorepos where sub-projects have interdependencies.',
      'Custom build logic using Groovy or Kotlin DSL scripts for specialized workflows.',
      'Running automated tests and generating code-coverage reports as part of the build lifecycle.',
    ],
    commonIssues: [
      { problem: '"gradle" is not recognized as a command', fix: 'Verify GRADLE_HOME is set correctly and %GRADLE_HOME%\\bin is in PATH. Open a new terminal after making changes.' },
      { problem: 'Gradle reports "Could not determine Java version"', fix: 'Gradle requires a JDK. Ensure JAVA_HOME points to a valid JDK directory and run "java -version" to confirm. Gradle 9.x requires JDK 17 or newer.' },
      { problem: 'Build is extremely slow on first run', fix: 'Gradle downloads dependencies and builds a daemon process on the first run. Subsequent builds are much faster. Enable the Gradle daemon (on by default since 3.0) and use "gradle --build-cache" for incremental builds.' },
      { problem: 'Wrapper version conflict — "gradlew" uses a different version than globally installed Gradle', fix: 'Most projects include a Gradle Wrapper (gradlew / gradlew.bat). Always use the wrapper for project builds to match the intended version. The global install is useful for creating new projects.' },
    ],
    tips: [
      'Like Maven, Gradle requires a JDK. Install Java first via DevTools Installer.',
      'For existing projects, use the Gradle Wrapper (gradlew.bat) instead of the global installation to ensure version consistency.',
      'Gradle 9.x offers significant performance improvements over 8.x including configuration caching and faster dependency resolution.',
      'Use "gradle tasks" to list all available tasks in a project and "gradle dependencies" to inspect the dependency tree.',
    ],
    steps: {
      appSteps: [
        'Open DevTools Installer.',
        'In Package Managers, select "Gradle".',
        'Click "Install Selected".',
        'Let the installer download the official zip, extract it, set GRADLE_HOME, and add `%GRADLE_HOME%\\bin` to PATH.',
        'Open a new terminal window after the install finishes.',
        'Run `gradle -v` to confirm Gradle starts and can see a supported JDK.',
      ],
      manualSteps: [
        'Install JDK 17 or newer first. Gradle 9.x requires it.',
        'Download the official zip from https://services.gradle.org/distributions/gradle-9.4.1-bin.zip',
        'Extract the archive to `C:\\Program Files\\Gradle\\gradle-9.4.1`.',
        'Set GRADLE_HOME to `C:\\Program Files\\Gradle\\gradle-9.4.1`.',
        'Add `%GRADLE_HOME%\\bin` to your system PATH.',
        'Open a new terminal and run `gradle -v`.',
      ],
    },
  },
  {
    id: 'yarn',
    author: { name: 'Priyanka Kasera', slug: 'priyankakasera' },
    name: 'Yarn',
    headline: 'How to Install Yarn on Windows',
    seoTitle: 'Install Yarn on Windows — Step-by-Step (2026)',
    seoDescription: 'Install Yarn on Windows with the official MSI. Automatic PATH, works with any Node.js project. Deterministic builds and offline cache out of the box.',
    lastReviewed: '2026-04-01',
    relatedGuides: ['nodejs', 'git', 'vscode'],
    description:
      'Install Yarn on Windows if a project uses yarn.lock or you want Yarn commands available alongside Node.js and npm.',
    editorial: `When you clone a repository and find a yarn.lock file in the root, that is your signal: this project uses Yarn, and you should too. Using npm instead would generate a different dependency tree, leading to subtle bugs that only surface in production — the exact category of problem that Yarn was designed to eliminate.

Facebook (now Meta) created Yarn in 2016 because npm at the time had real reliability issues: non-deterministic installs, slow downloads on large dependency trees, and no offline capability. Yarn solved all three with lockfile-driven determinism, parallel package downloads, and an aggressive local cache. npm has since adopted many of these ideas, but Yarn continues to iterate — particularly on workspace support for monorepos and zero-install workflows.

This guide installs Yarn Classic (1.22), which remains the most widely deployed version and the one that open-source projects typically specify in their contributing guidelines. The Windows MSI installer places the binary in Program Files and adds it to PATH automatically. One important requirement: Yarn is a Node.js tool, so Node.js must be installed first. Yarn uses Node's runtime under the hood to execute JavaScript-based scripts and resolve packages from the npm registry.

A quick note on versioning: Yarn 2+ (codenamed Berry) is a completely different architecture with Plug'n'Play dependency resolution and a .yarnrc.yml configuration file. Berry is enabled per-project rather than installed globally, so it does not replace the Yarn Classic installation you set up here. Most teams that use Berry still have Yarn Classic installed globally as a bootstrap tool.`,
    category: 'Package Managers',
    versions: ['1.22.22'],
    defaultVersion: '1.22.22',
    downloadSource: 'https://github.com/yarnpkg/yarn/releases/download/v1.22.22/yarn-1.22.22.msi',
    downloadLabel: 'GitHub / yarnpkg.com (official)',
    altSources: [],
    envVars: [],
    pathEntries: ['C:\\Program Files (x86)\\Yarn\\bin'],
    verifyCommand: 'yarn --version',
    verifyOutput: '1.22.22',
    useCases: [
      'Managing dependencies in Node.js projects — Yarn creates a deterministic lockfile for reproducible builds.',
      'Faster installs than npm in many scenarios due to parallel downloading and caching.',
      'Monorepo management with Yarn Workspaces for sharing packages across multiple projects.',
      'Offline installations — Yarn caches every package it downloads, enabling installs without network access.',
      'Projects that specify Yarn in their contributing guidelines or CI/CD configuration.',
    ],
    commonIssues: [
      { problem: '"yarn" is not recognized after installation', fix: 'Ensure C:\\Program Files (x86)\\Yarn\\bin is in your system PATH. Reopen your terminal after installation.' },
      { problem: 'Yarn conflicts with npm when both are used in the same project', fix: 'Choose one package manager per project. If the project has a yarn.lock, use Yarn. If it has a package-lock.json, use npm. Delete the other lockfile to avoid inconsistencies.' },
      { problem: 'Yarn global packages are not found', fix: 'Run "yarn global bin" to find the global bin directory and ensure it is in your PATH. On Windows this is typically %LOCALAPPDATA%\\Yarn\\bin.' },
      { problem: 'Installation fails behind a corporate proxy', fix: 'Configure Yarn\'s proxy settings: "yarn config set proxy http://proxy:port" and "yarn config set https-proxy http://proxy:port".' },
    ],
    tips: [
      'Yarn requires Node.js. Install Node.js first via DevTools Installer before installing Yarn.',
      'Yarn 1.x (Classic) is the stable version installed here. Yarn 2+ (Berry) uses a different architecture and is enabled per-project via "yarn set version berry".',
      'Use "yarn why <package>" to understand why a specific dependency is in your project.',
      'Yarn\'s offline mirror feature is useful for CI environments: run "yarn install --offline" after caching packages locally.',
    ],
    steps: {
      appSteps: [
        'Open DevTools Installer.',
        'Install Node.js first, then select "Yarn" in Package Managers.',
        'Click "Install Selected".',
        'Let the installer download the official MSI, run it silently, and add `C:\\Program Files (x86)\\Yarn\\bin` to PATH.',
        'Open a new terminal window after the install finishes.',
        'Run `yarn --version` to verify Yarn is available.',
      ],
      manualSteps: [
        'Install Node.js first. Yarn depends on Node.js.',
        'Download the official MSI from https://github.com/yarnpkg/yarn/releases/download/v1.22.22/yarn-1.22.22.msi',
        'Run the installer.',
        'The installer adds `C:\\Program Files (x86)\\Yarn\\bin` to PATH automatically.',
        'Open a new terminal and run `yarn --version`.',
        'If your project already has a yarn.lock file, use Yarn for that project instead of npm.',
      ],
    },
  },
  {
    id: 'chocolatey',
    author: { name: 'Priyanka Kasera', slug: 'priyankakasera' },
    name: 'Chocolatey',
    headline: 'How to Install Chocolatey on Windows',
    seoTitle: 'Install Chocolatey on Windows — Full Guide (2026)',
    seoDescription: 'Install Chocolatey package manager on Windows via MSI or PowerShell. Automate software installs from the command line — 9,000+ packages available.',
    lastReviewed: '2026-04-01',
    relatedGuides: ['git', 'nodejs', 'vscode'],
    description:
      'Install Chocolatey on Windows if you want to install and update software from an elevated terminal instead of clicking through installers one by one.',
    editorial: `Linux has apt. macOS has Homebrew. Windows, for the longest time, had nothing — until Chocolatey. It is the closest thing Windows has to a real system-level package manager, letting you install, upgrade, and remove software from the command line with commands like "choco install git -y" instead of hunting for download links and clicking through setup wizards.

Chocolatey's community repository hosts over 9,000 packages, ranging from developer tools (Git, Node.js, Python) to system utilities (7-Zip, WinMerge) and even fonts. Each package definition specifies where to download the installer, how to run it silently, and what PATH entries to configure. When you run "choco install," the tool handles the entire lifecycle: download, checksum verification, silent install, and shim creation.

For individual developers, Chocolatey is a productivity multiplier — you can script your entire machine setup in a single PowerShell file and replay it whenever you format your drive or get a new laptop. For enterprises, the paid Business edition adds package internalization (hosting packages on your own server), virus scanning, integration with SCCM and Intune, and centralized license management.

Many teams use Chocolatey alongside DevTools Installer: our tool handles the core runtimes and IDEs with version selection and environment variable configuration, while Chocolatey covers everything else. This guide installs Chocolatey 2.7 using an MSI-based silent install via DevTools Installer, or via the official PowerShell one-liner if you prefer the manual route.`,
    category: 'Package Managers',
    versions: ['2.7.0'],
    defaultVersion: '2.7.0',
    downloadSource: 'https://github.com/chocolatey/choco/releases/download/2.7.0/chocolatey-2.7.0.0.msi',
    downloadLabel: 'chocolatey.org / GitHub (official)',
    altSources: [],
    envVars: [],
    pathEntries: ['C:\\ProgramData\\chocolatey\\bin'],
    verifyCommand: 'choco --version',
    verifyOutput: '2.7.0',
    useCases: [
      'Automating the installation and updating of software on Windows machines from the command line.',
      'Scripting machine setup so new team members or VMs can be provisioned with a single command.',
      'Managing tools that are not covered by DevTools Installer — Chocolatey has a repository of 10,000+ packages.',
      'Keeping installed software up to date with "choco upgrade all".',
      'Enterprise environments that need centralized package management and compliance auditing.',
    ],
    commonIssues: [
      { problem: '"choco" is not recognized after installation', fix: 'Ensure C:\\ProgramData\\chocolatey\\bin is in your system PATH. Open a new terminal or restart your shell session.' },
      { problem: 'Chocolatey commands require Administrator privileges', fix: 'By design, Chocolatey installs software system-wide, which requires elevation. Always run PowerShell or Command Prompt as Administrator when using choco commands.' },
      { problem: 'Package installation fails with checksum errors', fix: 'This usually means the upstream package was updated but the Chocolatey package checksum has not been refreshed yet. Use "--ignore-checksums" as a temporary workaround, or wait for the package maintainer to update.' },
      { problem: 'Chocolatey conflicts with existing DevTools Installer installations', fix: 'If both Chocolatey and DevTools Installer manage the same tool (e.g., Git), you may get duplicate PATH entries. Choose one tool per application to avoid conflicts.' },
    ],
    tips: [
      'Run "choco list --local" to see all packages installed via Chocolatey on your system.',
      'Use "choco install <package> -y" to skip confirmation prompts during installation.',
      'Chocolatey installs packages to C:\\ProgramData\\chocolatey\\lib by default. Binaries are shimmed into the bin folder on PATH.',
      'For enterprise use, Chocolatey offers a Business edition with features like package internalization, virus scanning, and self-service deployment.',
    ],
    steps: {
      appSteps: [
        'Open DevTools Installer.',
        'In Package Managers, select "Chocolatey".',
        'Click "Install Selected".',
        'Let the installer download the official MSI, run it silently, and add `C:\\ProgramData\\chocolatey\\bin` to PATH.',
        'Open a new elevated terminal after the install finishes.',
        'Run `choco --version` to confirm Chocolatey is available.',
      ],
      manualSteps: [
        'Download the official MSI from https://github.com/chocolatey/choco/releases/download/2.7.0/chocolatey-2.7.0.0.msi',
        'Run the installer as an administrator.',
        'If you prefer the official PowerShell method, run this in an elevated PowerShell window: `Set-ExecutionPolicy Bypass -Scope Process; iex ((New-Object System.Net.WebClient).DownloadString("https://community.chocolatey.org/install.ps1"))`',
        'Chocolatey installs its command shims in `C:\\ProgramData\\chocolatey\\bin`.',
        'Open a new elevated terminal and run `choco --version`.',
      ],
    },
  },
  {
    id: 'miniconda',
    author: { name: 'Priyanka Kasera', slug: 'priyankakasera' },
    name: 'Miniconda',
    headline: 'How to Install Miniconda on Windows',
    seoTitle: 'Install Miniconda on Windows — Conda Environments (2026)',
    seoDescription: 'Set up Miniconda on Windows for isolated Python environments. Handles native dependencies that pip cannot. Includes conda init and PATH troubleshooting.',
    lastReviewed: '2026-04-01',
    relatedGuides: ['python', 'vscode', 'git'],
    description:
      'Install Miniconda on Windows if you want conda environments, isolated Python versions, and easier package installs for data science or native dependencies.',
    editorial: `If you have ever tried to install TensorFlow with pip and hit a wall of compilation errors on Windows, you already understand why conda exists. pip can install pure-Python packages effortlessly, but it struggles with packages that depend on compiled C libraries, CUDA toolkits, or Fortran routines — exactly the kind of dependencies that data science and machine learning libraries require.

Conda solves this by distributing pre-compiled binaries for every platform. When you run "conda install numpy," you get a binary built and tested for your specific OS and CPU architecture, along with all its native dependencies resolved automatically. This is why the data science community overwhelmingly prefers conda over pip for heavy numerical workloads.

Miniconda is the lightweight entry point to the conda ecosystem. The full Anaconda distribution ships with 250+ pre-installed packages — pandas, matplotlib, scikit-learn, Jupyter, and dozens more — which is convenient but heavy (over 4 GB). Miniconda gives you just the conda package manager, a base Python interpreter, and a few essentials. From there, you install exactly what each project needs into isolated environments. Each environment gets its own Python version and package set, so your TensorFlow 2.x project cannot interfere with your PyTorch project.

This guide installs Miniconda for all users on Windows and adds the three required directories to PATH (the root, Scripts, and condabin folders). We also cover the most common post-install issue: "conda activate" not working in Command Prompt until you run "conda init cmd.exe" to set up shell integration.`,
    category: 'Package Managers',
    versions: ['latest'],
    defaultVersion: 'latest',
    downloadSource: 'https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe',
    downloadLabel: 'anaconda.com (official)',
    altSources: [],
    envVars: [],
    pathEntries: [
      'C:\\ProgramData\\miniconda3',
      'C:\\ProgramData\\miniconda3\\Scripts',
      'C:\\ProgramData\\miniconda3\\condabin',
    ],
    verifyCommand: 'conda --version',
    verifyOutput: 'conda 26.x.x',
    useCases: [
      'Setting up isolated Python environments for data science, machine learning, and scientific computing.',
      'Installing packages that have complex native dependencies (NumPy, SciPy, TensorFlow) — conda handles binary dependencies that pip cannot.',
      'Managing multiple Python versions side by side with "conda create -n myenv python=3.12".',
      'Sharing reproducible environments across teams using environment.yml files.',
      'Working with Jupyter notebooks and JupyterLab in isolated conda environments.',
    ],
    commonIssues: [
      { problem: '"conda" is not recognized after installation', fix: 'Ensure all three directories are in PATH: C:\\ProgramData\\miniconda3, its Scripts subfolder, and its condabin subfolder. DevTools Installer adds these automatically, but manual installs may miss them.' },
      { problem: 'Conda activate does not work in Command Prompt', fix: 'Run "conda init cmd.exe" once to set up Command Prompt integration. For PowerShell, run "conda init powershell". Restart the terminal after initialization.' },
      { problem: 'Installation fails because a previous corrupt installation exists', fix: 'Delete the C:\\ProgramData\\miniconda3 directory manually, then retry the installation. DevTools Installer detects and cleans up corrupt installs automatically.' },
      { problem: 'Conda is very slow to resolve dependencies', fix: 'Use the libmamba solver (default in conda 23.10+) for faster resolution: "conda config --set solver libmamba". Also consider creating minimal environments instead of installing everything into base.' },
    ],
    tips: [
      'Miniconda is much smaller than the full Anaconda distribution — it includes only conda, Python, and a minimal set of packages. Install additional packages as needed.',
      'If you already have a standalone Python installed, Miniconda creates separate Python installations per environment. The two can coexist without conflict.',
      'Use "conda env export > environment.yml" to save your environment configuration, and "conda env create -f environment.yml" to recreate it on another machine.',
      'For data science workflows, install JupyterLab inside a conda environment: "conda install jupyterlab".',
    ],
    steps: {
      appSteps: [
        'Open DevTools Installer.',
        'In Package Managers, select "Miniconda".',
        'Click "Install Selected".',
        'Let the installer download the official setup package and run an all-users install to `C:\\ProgramData\\miniconda3`.',
        'If an earlier broken install is detected, DevTools Installer removes it before retrying the install.',
        'After the install finishes, the root, Scripts, and condabin directories are added to PATH.',
        'Open a new terminal and run `conda --version`.',
      ],
      manualSteps: [
        'Download the official installer from https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe',
        'Run the installer and choose "Install for all users" if you want the standard path `C:\\ProgramData\\miniconda3`.',
        'If you need a silent install, run: `Miniconda3-latest-Windows-x86_64.exe /InstallationType=AllUsers /AddToPath=0 /RegisterPython=0 /S /D=C:\\ProgramData\\miniconda3`',
        'Add these three directories to PATH: `C:\\ProgramData\\miniconda3`, `C:\\ProgramData\\miniconda3\\Scripts`, and `C:\\ProgramData\\miniconda3\\condabin`.',
        'Open a new terminal and run `conda --version`.',
        'If the installer fails because an old broken folder already exists, delete `C:\\ProgramData\\miniconda3` and retry.',
      ],
    },
  },
  {
    id: 'docker-desktop',
    author: { name: 'Vishal Hulawale', slug: 'vishalhulawale' },
    name: 'Docker Desktop',
    hidden: true,
    headline: 'How to Install Docker Desktop on Windows',
    seoTitle: 'Install Docker Desktop on Windows — WSL 2 Setup (2026)',
    seoDescription: 'Install Docker Desktop on Windows with WSL 2 and Hyper-V support. Includes Docker Engine, CLI, Compose, and GUI — official installer.',
    description:
      'Docker Desktop includes Docker Engine, CLI, Compose, and a GUI for container management.',
    category: 'Cloud & DevOps',
    versions: ['4.66.0', '4.51.0'],
    defaultVersion: '4.66.0',
    downloadSource: 'https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe',
    downloadLabel: 'docker.com (official)',
    altSources: [],
    envVars: [],
    pathEntries: ['C:\\Program Files\\Docker\\Docker\\resources\\bin'],
    verifyCommand: 'docker --version',
    verifyOutput: 'Docker version 27.x.x',
    steps: {
      appSteps: [
        'Open DevTools Installer.',
        'Find "Docker Desktop" in the Cloud & DevOps category.',
        'Click "Install Selected".',
        'The installer downloads from docker.com and runs a silent install with --accept-license.',
      ],
      manualSteps: [
        'Download from https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe',
        'Run the installer — it will enable WSL 2 and Hyper-V as needed.',
        'Docker is added to PATH at `C:\\Program Files\\Docker\\Docker\\resources\\bin`.',
        'Restart your computer if prompted.',
        'Open a new terminal and run: `docker --version`',
      ],
    },
  },
  {
    id: 'kubectl',
    author: { name: 'Vishal Hulawale', slug: 'vishalhulawale' },
    name: 'kubectl',
    headline: 'How to Install kubectl on Windows',
    seoTitle: 'Install kubectl on Windows — Quick Setup (2026)',
    seoDescription: 'Download kubectl for Windows from kubernetes.io. One binary, add to PATH, connect to your cluster. Supports version matching for K8s 1.33–1.35.',
    lastReviewed: '2026-04-01',
    relatedGuides: ['helm', 'istio', 'awscli'],
    description:
      'Install kubectl on Windows so you can connect to a Kubernetes cluster, inspect resources, and run kubectl commands from any terminal.',
    editorial: `Every Kubernetes workflow starts and ends with kubectl. Need to check why a pod is crashing? "kubectl describe pod." Want to deploy a new version? "kubectl apply -f deployment.yaml." Checking logs? "kubectl logs." It is the single binary that gives you full control over any Kubernetes cluster, whether it is a local Docker Desktop instance or a production cluster running hundreds of nodes on EKS, AKS, or GKE.

kubectl is refreshingly simple to install — it is a standalone executable with no dependencies, no registry entries, and no MSI. You download the binary, drop it into a directory on your PATH, and it works. All configuration lives in a kubeconfig file (typically at %USERPROFILE%\\.kube\\config) that maps cluster names to server addresses and authentication credentials. You can manage multiple clusters by switching contexts with "kubectl config use-context."

This guide installs kubectl 1.35.3 and offers 1.34.x and 1.33.x for version compatibility — kubectl officially supports connecting to clusters within a one-minor-version skew in either direction. If your cluster runs Kubernetes 1.34, any kubectl from 1.33 to 1.35 will work reliably. We cover the installation, kubeconfig basics, and troubleshooting connectivity issues. Note that kubectl is just a client — you need an actual Kubernetes cluster to connect to. For local development, enable Kubernetes in Docker Desktop.`,
    category: 'Cloud & DevOps',
    versions: ['1.35.3', '1.34.6', '1.33.10'],
    defaultVersion: '1.35.3',
    downloadSource: 'https://dl.k8s.io/release/v1.35.3/bin/windows/amd64/kubectl.exe',
    downloadLabel: 'kubernetes.io (official)',
    altSources: [],
    envVars: [],
    pathEntries: ['C:\\Program Files\\kubectl'],
    verifyCommand: 'kubectl version --client',
    verifyOutput: 'Client Version: v1.35.3',
    useCases: [
      'Deploying and managing containerized applications on Kubernetes clusters.',
      'Inspecting cluster resources — pods, services, deployments, config maps, and secrets.',
      'Debugging running containers with "kubectl logs", "kubectl exec", and "kubectl describe".',
      'Applying Kubernetes manifests (YAML/JSON) to create or update infrastructure declaratively.',
      'Integrating with CI/CD pipelines for automated deployments to staging and production clusters.',
    ],
    commonIssues: [
      { problem: '"kubectl" is not recognized after installation', fix: 'Ensure C:\\Program Files\\kubectl is in your system PATH and open a new terminal. Run "where kubectl" to verify the binary is found.' },
      { problem: 'kubectl cannot connect to a cluster', fix: 'kubectl reads cluster credentials from the kubeconfig file at %USERPROFILE%\\.kube\\config. Verify the file exists and contains the correct server address and credentials. Use "kubectl config get-contexts" to list available contexts.' },
      { problem: 'Version skew warning between client and server', fix: 'kubectl should be within one minor version of the cluster\'s Kubernetes version. If your cluster runs 1.34.x, use kubectl 1.33.x–1.35.x. Install the matching version via DevTools Installer.' },
      { problem: 'Certificate or TLS errors when connecting', fix: 'Your kubeconfig may have an expired or invalid certificate. Re-authenticate with your cluster provider (e.g., "aws eks update-kubeconfig" for EKS, "az aks get-credentials" for AKS).' },
    ],
    tips: [
      'kubectl is a standalone binary with no installer — DevTools Installer simply places it in a PATH directory. This makes upgrades straightforward.',
      'Use "kubectl config use-context <name>" to switch between multiple cluster configurations.',
      'Enable shell autocompletion for faster commands: for PowerShell, run "kubectl completion powershell | Out-String | Invoke-Expression".',
      'kubectl is a prerequisite for Helm and Istio. Install kubectl first before installing those tools.',
    ],
    prerequisiteTools: [
      {
        id: 'docker-desktop',
        name: 'A Kubernetes Cluster',
        reason: 'kubectl is just a CLI — it needs a cluster to connect to. For local development, enable Kubernetes in Docker Desktop (Settings → Kubernetes → Enable Kubernetes) or install minikube.',
      },
    ],
    steps: {
      appSteps: [
        'Open DevTools Installer.',
        'In Cloud & DevOps, select "Kubernetes CLI (kubectl)".',
        'Click "Install Selected".',
        'Let the installer download the official kubectl.exe binary, place it in `C:\\Program Files\\kubectl`, and add that directory to PATH.',
        'Open a new terminal window after the install finishes.',
        'Run `kubectl version --client` to confirm the CLI is available.',
      ],
      manualSteps: [
        'Download the official binary from https://dl.k8s.io/release/v1.35.3/bin/windows/amd64/kubectl.exe',
        'Create the folder `C:\\Program Files\\kubectl` if it does not already exist.',
        'Move kubectl.exe into `C:\\Program Files\\kubectl`.',
        'Add `C:\\Program Files\\kubectl` to your system PATH.',
        'Open a new terminal and run `kubectl version --client`.',
        'Configure a kubeconfig file before you try to connect to a cluster.',
      ],
    },
  },
  {
    id: 'awscli',
    author: { name: 'Vishal Hulawale', slug: 'vishalhulawale' },
    name: 'AWS CLI',
    headline: 'How to Install AWS CLI on Windows',
    seoTitle: 'Install AWS CLI v2 on Windows — Official MSI (2026)',
    seoDescription: 'Install AWS CLI v2 on Windows using the official MSI. Auto PATH setup, credential config walkthrough, and multi-profile tips. No dependencies needed.',
    lastReviewed: '2026-04-01',
    relatedGuides: ['kubectl', 'helm', 'azurecli'],
    description:
      'Install AWS CLI on Windows so you can run aws commands, configure credentials, and manage AWS resources without using the browser console for every task.',
    editorial: `If your application runs on AWS — and there is a good chance it does, given that AWS holds roughly a third of the global cloud market — the AWS CLI is the tool you will use to manage everything outside your application code. Uploading build artifacts to S3, pushing Docker images to ECR, deploying Lambda functions, querying CloudWatch logs, and rotating IAM access keys are all daily tasks for developers and DevOps engineers working in the AWS ecosystem.

The web-based AWS Console is fine for one-off tasks, but it does not scale. You cannot commit a button click to version control, and you cannot replay a series of Console actions on a new account. The AWS CLI solves this by providing a consistent command-line interface across all 200+ AWS services, making cloud operations scriptable, repeatable, and auditable. Most CI/CD pipelines include AWS CLI commands for deployment steps.

Version 2, which this guide installs, is a significant upgrade over the original CLI. It includes auto-complete for Bash and PowerShell, interactive configuration wizards, SSO integration through "aws sso login," and improved credential handling with the credential_process chain. The v2 binary is self-contained — it bundles its own Python runtime, so you do not need Python installed separately.

After installation, your first step is running "aws configure" to set up your Access Key ID, Secret Access Key, and default region. These credentials are stored at %USERPROFILE%\\.aws\\credentials (not in environment variables), and you can create named profiles for managing multiple AWS accounts — "aws configure --profile staging" creates a separate profile you can invoke with "aws s3 ls --profile staging."

The MSI installer from Amazon handles PATH configuration automatically. This guide walks through both the automated one-click method and the manual install, plus post-setup essentials like credential configuration, output format selection, and troubleshooting SSL errors behind corporate proxies.`,
    category: 'Cloud & DevOps',
    versions: ['2 (latest)'],
    defaultVersion: '2 (latest)',
    downloadSource: 'https://awscli.amazonaws.com/AWSCLIV2.msi',
    downloadLabel: 'aws.amazon.com (official)',
    altSources: [],
    envVars: [],
    pathEntries: ['C:\\Program Files\\Amazon\\AWSCLIV2'],
    verifyCommand: 'aws --version',
    verifyOutput: 'aws-cli/2.x.x Python/3.x.x Windows/10',
    useCases: [
      'Managing AWS infrastructure — EC2 instances, S3 buckets, Lambda functions, and RDS databases from the command line.',
      'Scripting cloud resource provisioning and teardown for development and testing environments.',
      'Configuring AWS credentials and profiles for multi-account access.',
      'Interacting with AWS services in CI/CD pipelines for automated deployments.',
      'Debugging AWS configurations by inspecting IAM policies, security groups, and CloudWatch logs.',
    ],
    commonIssues: [
      { problem: '"aws" is not recognized after installation', fix: 'The MSI installer adds C:\\Program Files\\Amazon\\AWSCLIV2 to PATH. Close and reopen your terminal. If the issue persists, verify the PATH entry exists in System Properties → Environment Variables.' },
      { problem: 'AWS CLI returns "Unable to locate credentials"', fix: 'Run "aws configure" to set up your Access Key ID, Secret Access Key, and default region. Credentials are stored at %USERPROFILE%\\.aws\\credentials.' },
      { problem: 'Permission errors when running AWS commands', fix: 'Your IAM user or role may lack the required permissions. Verify your policies in the AWS Console. Use "aws sts get-caller-identity" to confirm which identity is active.' },
      { problem: 'SSL certificate verification fails behind a corporate proxy', fix: 'Set the AWS_CA_BUNDLE environment variable to point to your corporate CA certificate. Alternatively, use "aws --no-verify-ssl" for testing (not recommended for production).' },
    ],
    tips: [
      'After installing, run "aws configure" to set up your credentials. You will need your AWS Access Key ID and Secret Access Key from the IAM console.',
      'Use named profiles for multiple AWS accounts: "aws configure --profile staging" and then "aws s3 ls --profile staging".',
      'AWS CLI v2 includes auto-complete for bash and zsh. On PowerShell, use "aws completer" for similar functionality.',
      'Use "aws --output table" for human-readable output, or "aws --output json" for scripting.',
    ],
    steps: {
      appSteps: [
        'Open DevTools Installer.',
        'In Cloud & DevOps, select "AWS CLI".',
        'Click "Install Selected".',
        'Let the installer download the official MSI and run it silently.',
        'Open a new terminal window after the install finishes.',
        'Run `aws --version` to confirm the CLI is available, then run `aws configure` to add credentials.',
      ],
      manualSteps: [
        'Download the official MSI from https://awscli.amazonaws.com/AWSCLIV2.msi',
        'Run the installer. If you need a silent install, run: `msiexec /i AWSCLIV2.msi /quiet`',
        'The installer adds `C:\\Program Files\\Amazon\\AWSCLIV2` to PATH automatically.',
        'Open a new terminal and run `aws --version`.',
        'Run `aws configure` and enter your Access Key ID, Secret Access Key, and default region.',
      ],
    },
  },
  {
    id: 'azurecli',
    author: { name: 'Vishal Hulawale', slug: 'vishalhulawale' },
    name: 'Azure CLI',
    headline: 'How to Install Azure CLI on Windows',
    seoTitle: 'Install Azure CLI on Windows — Official MSI Guide (2026)',
    seoDescription: 'Install Azure CLI v2 on Windows with the official MSI. Automatic PATH, az login walkthrough, and multi-subscription tips. No dependencies.',
    lastReviewed: '2026-04-01',
    relatedGuides: ['kubectl', 'helm', 'awscli'],
    description:
      'Install Azure CLI on Windows so you can sign in with az login, manage Azure resources, and script Azure tasks from any terminal.',
    editorial: `When your organization runs on Microsoft Azure, the Azure CLI becomes your daily command-line companion. It is Microsoft's cross-platform tool for creating, managing, and monitoring Azure resources — virtual machines, App Services, storage accounts, AKS clusters, and everything in between. If you find yourself switching between Azure Portal browser tabs to check resource states or modify configurations, the CLI provides a faster and scriptable alternative.

Azure CLI's syntax follows a predictable "az <service> <action>" pattern that is easy to learn and remember. "az vm list" shows your virtual machines, "az aks get-credentials" fetches Kubernetes config, "az webapp deploy" pushes your code. This consistency across services means that once you know how to interact with one Azure service, you can guess the commands for most others.

One area where Azure CLI shines is authentication flexibility. Interactive login ("az login") opens your browser for OAuth, "az login --use-device-code" works on headless servers, and service principal authentication ("az login --service-principal") handles CI/CD automation. The CLI also supports managed identities for workloads running inside Azure, eliminating credentials entirely. Your login state persists across terminal sessions until you explicitly sign out.

For developers who also work with PowerShell, a common question is whether to use Azure CLI or the Az PowerShell module. Both can manage the same resources, but the CLI is cross-platform, has a flatter learning curve, and receives new service feature support faster. The Az module integrates better with PowerShell's object pipeline for complex scripting. Many teams use both — CLI for quick commands and interactive work, PowerShell for infrastructure automation scripts.

This guide installs the latest Azure CLI v2 on Windows using the official MSI from Microsoft. PATH is configured automatically, so "az" commands work from any terminal immediately after installation. We cover authentication setup, subscription switching, and common troubleshooting issues.`,
    category: 'Cloud & DevOps',
    versions: ['2 (latest)'],
    defaultVersion: '2 (latest)',
    downloadSource: 'https://aka.ms/installazurecliwindowsx64',
    downloadLabel: 'microsoft.com (official)',
    altSources: [],
    envVars: [],
    pathEntries: ['C:\\Program Files\\Microsoft SDKs\\Azure\\CLI2\\wbin'],
    verifyCommand: 'az --version',
    verifyOutput: 'azure-cli 2.x.x',
    useCases: [
      'Managing Azure resources — VMs, App Services, storage accounts, and databases from the command line.',
      'Deploying infrastructure with ARM templates or Bicep files via Azure CLI commands.',
      'Configuring and managing Azure Kubernetes Service (AKS) clusters.',
      'Automating Azure operations in CI/CD pipelines and deployment scripts.',
      'Querying Azure Resource Graph for cross-subscription resource inventory and compliance checks.',
    ],
    commonIssues: [
      { problem: '"az" is not recognized after installation', fix: 'Azure CLI installs to C:\\Program Files\\Microsoft SDKs\\Azure\\CLI2. The wbin subfolder is added to PATH. Close and reopen your terminal.' },
      { problem: '"az login" opens a browser but authentication fails', fix: 'Ensure your browser is not blocking pop-ups for login.microsoftonline.com. Alternatively, use "az login --use-device-code" to authenticate via a code in any browser.' },
      { problem: 'Azure CLI is slow to respond or times out', fix: 'Check your network connection and proxy settings. Configure proxy: "az configure --defaults proxy=http://proxy:port". Also ensure you are authenticated — some commands stall when credentials are expired.' },
      { problem: 'Multiple Azure subscriptions cause confusion', fix: 'Run "az account list --output table" to see all subscriptions. Switch with "az account set --subscription <name-or-id>".' },
    ],
    tips: [
      'After installing, run "az login" to authenticate. Your credentials are cached locally for future sessions.',
      'Use "az interactive" for an enhanced shell experience with auto-complete and inline documentation.',
      'Azure CLI extensions add support for preview services: "az extension add --name <ext>" to install.',
      'If you work with both Azure and AWS, both CLIs coexist without conflict — they use separate command names and credential stores.',
    ],
    steps: {
      appSteps: [
        'Open DevTools Installer.',
        'In Cloud & DevOps, select "Azure CLI".',
        'Click "Install Selected".',
        'Let the installer download the official MSI and run it silently.',
        'Open a new terminal window after the install finishes.',
        'Run `az --version` to confirm the CLI is available, then run `az login` to sign in.',
      ],
      manualSteps: [
        'Download the official installer from https://aka.ms/installazurecliwindowsx64',
        'Run the MSI installer.',
        'The installer adds `C:\\Program Files\\Microsoft SDKs\\Azure\\CLI2\\wbin` to PATH automatically.',
        'Open a new terminal and run `az --version`.',
        'Run `az login` or `az login --use-device-code` to authenticate before you use Azure commands.',
      ],
    },
  },
  {
    id: 'helm',
    author: { name: 'Vishal Hulawale', slug: 'vishalhulawale' },
    name: 'Helm',
    headline: 'How to Install Helm on Windows',
    seoTitle: 'Install Helm on Windows — K8s Package Manager (2026)',
    seoDescription: 'Set up Helm on Windows in 3 steps — download, extract, add to PATH. Includes chart repo setup and troubleshooting. Requires kubectl.',
    lastReviewed: '2026-04-01',
    relatedGuides: ['kubectl', 'istio', 'awscli'],
    description:
      'Install Helm on Windows so you can deploy Kubernetes charts, manage releases, and use helm commands against a cluster that kubectl can already reach.',
    editorial: `Deploying an application to Kubernetes by hand means writing and maintaining a stack of YAML files — a Deployment, a Service, a ConfigMap, an Ingress, maybe a PersistentVolumeClaim — and keeping them in sync across development, staging, and production. Helm eliminates this toil by packaging all those resources into a single versioned unit called a chart.

Think of Helm charts the way you think of npm packages or Docker images: reusable, shareable, and parameterized. You install PostgreSQL with "helm install my-db bitnami/postgresql" and customize it with a values.yaml file — no need to understand the 15 Kubernetes resources that a production-grade database deployment requires. Artifact Hub hosts thousands of community charts covering NGINX, Redis, Prometheus, Grafana, and virtually every major infrastructure component.

Helm 4 (the version this guide installs) operates entirely client-side — the server-side Tiller component from Helm 2 was removed in Helm 3 for security reasons, and Helm 4 continues that simpler architecture. Helm talks to your cluster through kubectl's kubeconfig, which means kubectl must be installed and configured before Helm will work. This guide covers the installation, chart repository setup, and common issues including RBAC permission errors.`,
    category: 'Cloud & DevOps',
    versions: ['4.1.3'],
    defaultVersion: '4.1.3',
    downloadSource: 'https://get.helm.sh/helm-v4.1.3-windows-amd64.zip',
    downloadLabel: 'helm.sh (official)',
    altSources: [],
    envVars: [],
    pathEntries: ['C:\\Program Files\\Helm\\windows-amd64'],
    verifyCommand: 'helm version',
    verifyOutput: 'version.BuildInfo{Version:"v4.1.3", ...}',
    useCases: [
      'Packaging Kubernetes applications as reusable charts that can be shared and versioned.',
      'Deploying complex multi-component applications (databases, caches, APIs) with a single "helm install" command.',
      'Managing application upgrades and rollbacks on Kubernetes clusters.',
      'Using the public Helm chart repository (Artifact Hub) to install popular software like NGINX, PostgreSQL, and Prometheus.',
      'Templating Kubernetes YAML manifests with values files for environment-specific configuration.',
    ],
    commonIssues: [
      { problem: '"helm" is not recognized after installation', fix: 'Ensure C:\\Program Files\\Helm\\windows-amd64 is in your system PATH. Open a new terminal to pick up the change.' },
      { problem: 'Helm cannot connect to a Kubernetes cluster', fix: 'Helm uses the same kubeconfig as kubectl (%USERPROFILE%\\.kube\\config). Ensure kubectl can connect first: "kubectl cluster-info". If kubectl works, Helm will too.' },
      { problem: '"helm install" fails with permission denied errors', fix: 'Your Kubernetes user or service account may lack RBAC permissions. Verify with "kubectl auth can-i create deployments" and update your ClusterRoleBinding if needed.' },
      { problem: 'Chart dependency resolution fails', fix: 'Run "helm dependency update" in the chart directory to download dependencies declared in Chart.yaml. Ensure you have added the required chart repositories with "helm repo add".' },
    ],
    tips: [
      'Helm requires kubectl to be installed first. kubectl communicates with your cluster on Helm\'s behalf.',
      'Use "helm repo add bitnami https://charts.bitnami.com/bitnami" to add one of the most popular chart repositories.',
      'Helm 4.x dropped Tiller (the server-side component from v2) and operates fully client-side, improving security.',
      'Use "helm template <chart>" to render Kubernetes manifests locally without deploying — useful for reviewing what Helm will create.',
    ],
    prerequisiteTools: [
      { id: 'kubectl', name: 'kubectl', reason: 'Helm communicates with your Kubernetes cluster through kubectl\'s kubeconfig. Install kubectl first.' },
    ],
    steps: {
      appSteps: [
        'Install kubectl first so Helm has a working kubeconfig to use.',
        'Open DevTools Installer and select "Helm" in Cloud & DevOps.',
        'Click "Install Selected".',
        'Let the installer download the official zip, extract it to `C:\\Program Files\\Helm\\windows-amd64`, and add that directory to PATH.',
        'Open a new terminal window after the install finishes.',
        'Run `helm version` to confirm Helm starts correctly.',
      ],
      manualSteps: [
        'Install and configure kubectl first. Helm depends on the same kubeconfig file.',
        'Download the official zip from https://get.helm.sh/helm-v4.1.3-windows-amd64.zip',
        'Extract the archive to `C:\\Program Files\\Helm`. The zip contains a windows-amd64 folder with helm.exe inside it.',
        'Add `C:\\Program Files\\Helm\\windows-amd64` to your system PATH.',
        'Open a new terminal and run `helm version`.',
        'Run `kubectl cluster-info` before `helm install` if you want to verify cluster connectivity first.',
      ],
    },
  },
  {
    id: 'istio',
    author: { name: 'Vishal Hulawale', slug: 'vishalhulawale' },
    name: 'Istio (istioctl)',
    headline: 'How to Install Istio on Windows',
    seoTitle: 'Install Istio (istioctl) on Windows — Service Mesh CLI (2026)',
    seoDescription: 'Install istioctl on Windows to manage your Kubernetes service mesh. Single binary, add to PATH, connect to your cluster. Requires kubectl.',
    lastReviewed: '2026-04-01',
    relatedGuides: ['kubectl', 'helm', 'awscli'],
    description:
      'Install istioctl on Windows so you can install, validate, and manage an Istio service mesh on a Kubernetes cluster.',
    editorial: `As soon as your Kubernetes cluster grows beyond a handful of services, you run into problems that application code alone cannot solve: How do you encrypt traffic between services without adding TLS logic to every app? How do you split 10% of traffic to a canary deployment? How do you trace a request as it hops through five microservices? Istio answers all three without requiring a single line of application code change.

Istio works by injecting an Envoy proxy sidecar into every pod. These proxies intercept all inbound and outbound network traffic, forming a "mesh" that Istio's control plane manages centrally. From your perspective, your app sends a plain HTTP request to another service; Istio transparently upgrades it to mutual TLS, applies rate limits, records latency metrics, and routes it according to traffic policies you define in YAML.

The istioctl binary you install here is the CLI for managing the Istio control plane on your cluster. It installs Istio's components, validates configurations, and diagnoses mesh issues. Like kubectl and Helm, istioctl is a single executable that connects to your cluster through the kubeconfig file. This guide covers istioctl 1.29.1 installation on Windows, prerequisite checks, and the "--remote=false" flag for verifying the local CLI without a cluster connection.`,
    category: 'Cloud & DevOps',
    versions: ['1.29.1'],
    defaultVersion: '1.29.1',
    downloadSource: 'https://github.com/istio/istio/releases/download/1.29.1/istio-1.29.1-win.zip',
    downloadLabel: 'GitHub / istio.io (official)',
    altSources: [],
    envVars: [],
    pathEntries: ['C:\\Program Files\\Istio\\istio-1.29.1\\bin'],
    verifyCommand: 'istioctl version --remote=false',
    verifyOutput: '1.29.1',
    useCases: [
      'Adding mutual TLS (mTLS) encryption between microservices without code changes.',
      'Implementing traffic splitting for canary deployments and A/B testing.',
      'Collecting distributed traces and metrics across services using Istio\'s telemetry features.',
      'Enforcing access control policies between services at the mesh level.',
      'Rate limiting and circuit breaking to improve resilience of microservice architectures.',
    ],
    commonIssues: [
      { problem: '"istioctl" is not recognized after installation', fix: 'Ensure C:\\Program Files\\Istio\\istio-1.29.1\\bin is in your system PATH. Open a new terminal to pick up the change.' },
      { problem: 'istioctl install fails with "no running Istio pods" or connectivity errors', fix: 'Verify kubectl is configured and can reach your cluster: "kubectl cluster-info". Istio requires a running Kubernetes cluster to install into.' },
      { problem: 'Sidecar injection is not working for new pods', fix: 'Enable automatic sidecar injection by labeling the namespace: "kubectl label namespace default istio-injection=enabled". Existing pods need to be restarted to receive the sidecar.' },
      { problem: 'Version mismatch between istioctl and the installed Istio control plane', fix: 'Run "istioctl version" to see both client and server versions. They should match. Upgrade the control plane with "istioctl upgrade" or install the matching CLI version.' },
    ],
    tips: [
      'Istio requires kubectl as a prerequisite. Install kubectl first via DevTools Installer.',
      'Use "istioctl analyze" to detect common misconfigurations in your Istio setup before they cause runtime issues.',
      'The --remote=false flag in the verify command checks only the local CLI version without needing a cluster connection.',
      'For development and testing, "istioctl install --set profile=demo" installs Istio with all features enabled. For production, use the "default" or "minimal" profile.',
    ],
    prerequisiteTools: [
      { id: 'kubectl', name: 'kubectl', reason: 'Required to interact with Kubernetes clusters — Istio installs into a cluster via kubectl.' },
      { id: 'helm', name: 'Helm', reason: 'Recommended: some Istio deployment methods use Helm charts for more granular configuration control.' },
    ],
    steps: {
      appSteps: [
        'Install kubectl first so istioctl can talk to your cluster.',
        'Open DevTools Installer and select "Istio (istioctl)" in Cloud & DevOps.',
        'Click "Install Selected".',
        'Let the installer download the official zip, extract it to `C:\\Program Files\\Istio\\istio-1.29.1`, and add the bin directory to PATH.',
        'Open a new terminal window after the install finishes.',
        'Run `istioctl version --remote=false` to verify the local CLI without needing a cluster connection.',
      ],
      manualSteps: [
        'Install and configure kubectl first. istioctl needs a Kubernetes context for real cluster operations.',
        'Download the official zip from https://github.com/istio/istio/releases/download/1.29.1/istio-1.29.1-win.zip',
        'Extract the archive to `C:\\Program Files\\Istio`. The zip contains an istio-1.29.1 folder with `bin\\istioctl.exe` inside it.',
        'Add `C:\\Program Files\\Istio\\istio-1.29.1\\bin` to your system PATH.',
        'Open a new terminal and run `istioctl version --remote=false`.',
        'Use the same terminal or a new one with kubeconfig configured before you run istioctl install.',
      ],
    },
  },
  {
    id: 'vscode',
    author: { name: 'Priyanka Kasera', slug: 'priyankakasera' },
    name: 'Visual Studio Code',
    headline: 'How to Install VS Code on Windows',
    seoTitle: 'Install VS Code on Windows — Editor + PATH Setup (2026)',
    seoDescription: 'Download and install Visual Studio Code on Windows. Adds the "code" command to PATH automatically. Official Microsoft installer for Windows 10 & 11.',
    lastReviewed: '2026-04-01',
    relatedGuides: ['git', 'nodejs', 'python'],
    description:
      'Install VS Code on Windows if you want a fast editor with extensions, terminal integration, and the code command available on PATH.',
    editorial: `Seven out of ten developers use Visual Studio Code, according to Stack Overflow's annual survey, and the number keeps climbing. What started as a lightweight text editor has become the default development environment for web development, Python scripting, cloud infrastructure, and increasingly for Java and C++ workloads that traditionally belonged to heavier IDEs.

The secret is the extension marketplace. With over 50,000 extensions, VS Code can become a full-featured IDE for virtually any language — install the Python extension and you get IntelliSense, debugging, linting, and Jupyter notebook support. Add the Remote - SSH extension and you are editing files on a server as if they were local. GitHub Copilot, GitLens, ESLint, Prettier — the extensions most developers consider essential all run inside VS Code. Despite this extensibility, the editor starts in under two seconds and stays responsive on large codebases.

The Windows installer adds the "code" command to your PATH, which is arguably the most useful thing about a terminal-accessible editor: "code ." opens the current directory, "code file.txt" opens a specific file, and "code --diff file1 file2" shows a side-by-side comparison. This guide covers the installation, PATH verification, and recommended first steps for getting productive quickly.`,
    category: 'IDEs & Editors',
    versions: ['latest'],
    defaultVersion: 'latest',
    downloadSource: 'https://update.code.visualstudio.com/latest/win32-x64/stable',
    downloadLabel: 'code.visualstudio.com (official)',
    altSources: [],
    envVars: [],
    pathEntries: ['C:\\Program Files\\Microsoft VS Code\\bin'],
    verifyCommand: 'code --version',
    verifyOutput: '1.x.x (version number)',
    useCases: [
      'Writing and debugging code in virtually any programming language with extensions.',
      'Frontend development with built-in support for HTML, CSS, JavaScript, and TypeScript.',
      'Remote development — VS Code can connect to WSL, SSH servers, and Docker containers.',
      'Git integration with built-in source control panel, diff viewer, and merge conflict resolution.',
      'Collaborative editing with Live Share for real-time pair programming sessions.',
    ],
    commonIssues: [
      { problem: '"code" is not recognized in the terminal', fix: 'Ensure C:\\Program Files\\Microsoft VS Code\\bin is in your PATH. If you installed via the standard installer, check "Add to PATH" during setup. For existing installs, add the path manually via Environment Variables.' },
      { problem: 'VS Code opens in the wrong workspace or folder', fix: 'Use "code ." in a terminal to open VS Code in the current directory. Use "code <folder>" to open a specific folder.' },
      { problem: 'Extensions fail to install or load', fix: 'Check your internet connection — extensions are downloaded from the VS Code Marketplace. If behind a proxy, configure "http.proxy" in VS Code settings (Ctrl+,).' },
      { problem: 'VS Code is slow or uses too much memory', fix: 'Disable extensions you do not use regularly. Large workspaces can be slow — add large folders (node_modules, build outputs) to the "files.exclude" setting.' },
    ],
    tips: [
      'Install the "Extensions Pack" for your primary language (e.g., Python Extension Pack, Java Extension Pack) to get debugger, linter, and IntelliSense in one go.',
      'Use the command palette (Ctrl+Shift+P) to access any feature without memorizing keyboard shortcuts.',
      'VS Code updates automatically by default. To stay on a specific version, disable auto-update in settings.',
      'For Java development, install the "Extension Pack for Java" by Microsoft — it includes language support, debugging, test runner, and Maven/Gradle integration.',
    ],
    recommendedExtensions: [
      { name: 'IntelliCode', publisher: 'VisualStudioExptTeam', desc: 'AI-assisted code completions trained on thousands of real-world open-source codebases — more context-aware than standard IntelliSense.' },
      { name: 'GitLens', publisher: 'eamodio', desc: 'Supercharges Git with inline blame annotations, interactive history views, and rich side-by-side diff comparisons.' },
      { name: 'Prettier', publisher: 'esbenp', desc: 'Opinionated code formatter that auto-formats on save for JavaScript, TypeScript, CSS, JSON, HTML, and more.' },
      { name: 'ESLint', publisher: 'dbaeumer', desc: 'Integrates ESLint into the editor with real-time JavaScript and TypeScript linting and quick-fix suggestions.' },
      { name: 'Python (Microsoft)', publisher: 'ms-python', desc: 'Full Python support: IntelliSense, linting, black formatting, debugging, and Jupyter notebook integration.' },
    ],
    steps: {
      appSteps: [
        'Open DevTools Installer.',
        'In IDEs & Editors, select "Visual Studio Code".',
        'Click "Install Selected".',
        'Let the installer download the official package, run it silently, add context menu entries, and add VS Code to PATH.',
        'Open a new terminal window after the install finishes.',
        'Run `code --version` to confirm the command-line launcher works.',
      ],
      manualSteps: [
        'Download the official installer from https://code.visualstudio.com/download',
        'Run the installer and check the option that adds VS Code to PATH.',
        'The command-line launcher lives in `C:\\Program Files\\Microsoft VS Code\\bin`.',
        'Open a new terminal and run `code --version`.',
        'Run `code .` inside a project folder if you want to verify the shell integration too.',
      ],
    },
  },
  {
    id: 'intellij-idea',
    author: { name: 'Vishal Hulawale', slug: 'vishalhulawale' },
    name: 'IntelliJ IDEA',
    headline: 'How to Install IntelliJ IDEA on Windows',
    seoTitle: 'Install IntelliJ IDEA on Windows — Free Community Ed. (2026)',
    seoDescription: 'Install IntelliJ IDEA Community Edition on Windows. Official JetBrains installer with Maven/Gradle integration. Best for Java and Kotlin development.',
    lastReviewed: '2026-04-01',
    relatedGuides: ['java', 'maven', 'gradle'],
    description:
      'Install IntelliJ IDEA on Windows if you want a full Java and Kotlin IDE with built-in Maven, Gradle, testing, and debugging support.',
    editorial: `For Java and Kotlin development, no editor comes close to IntelliJ IDEA. Its code analysis engine understands your project at a semantic level — it can suggest refactors that span dozens of files, detect bugs before you run the code, and navigate million-line codebases without breaking a sweat. Android Studio is built on the same IntelliJ platform, which gives you an idea of what JetBrains considers production-quality tooling.

The free Community Edition, which this guide installs, covers more ground than most developers expect. You get full Java, Kotlin, Groovy, and Scala support, an integrated debugger with hot-swap, JUnit and TestNG runners, built-in Git version control, and deep integration with Maven and Gradle — including automatic dependency resolution and build tool windows. The paid Ultimate Edition adds web framework support (Spring, Jakarta EE), database tooling, and JavaScript/TypeScript — evaluate whether you need those features before upgrading.

IntelliJ works best when a JDK is already installed on the system, because it auto-detects the JDK during first launch and configures the project SDK automatically. We recommend installing Java first via DevTools Installer, then IntelliJ IDEA. This guide covers the Community Edition installation process and includes commonly needed post-install steps like increasing the heap size for large projects.`,
    category: 'IDEs & Editors',
    versions: ['latest'],
    defaultVersion: 'latest (Community Edition)',
    downloadSource: 'https://data.services.jetbrains.com/products/download?code=IIC&platform=windows',
    downloadLabel: 'jetbrains.com (official)',
    altSources: [],
    envVars: [],
    pathEntries: ['C:\\Program Files\\JetBrains\\IntelliJ IDEA Community\\bin'],
    verifyCommand: 'Check Start Menu for "IntelliJ IDEA"',
    verifyOutput: 'IntelliJ IDEA should appear in Start Menu / installed programs',
    useCases: [
      'Professional Java and Kotlin development with advanced refactoring, code analysis, and debugging.',
      'Spring Boot and Jakarta EE backend development with built-in framework support.',
      'Android development (Android Studio is based on IntelliJ) — the Community Edition shares the same core.',
      'Database management with the built-in database client (Ultimate Edition).',
      'Gradle and Maven project management with integrated build tool windows.',
    ],
    commonIssues: [
      { problem: 'IntelliJ cannot find the JDK after installation', fix: 'Go to File → Project Structure → SDKs and add your JDK path (e.g., C:\\Program Files\\Java\\jdk-21.0.10). IntelliJ does not automatically detect all JDK installations.' },
      { problem: 'IntelliJ is slow to index large projects', fix: 'Mark directories that do not contain source code (build, node_modules, .gradle) as Excluded via right-click → Mark Directory as → Excluded. This speeds up indexing significantly.' },
      { problem: 'The IDE uses too much memory', fix: 'Increase the heap size via Help → Change Memory Settings. For large projects, 2048 MB or more is recommended. The default is usually 750 MB.' },
      { problem: 'Community Edition is missing features you need (database tools, Spring support)', fix: 'The Community Edition is free but limited to core Java/Kotlin. For web development, database tools, and framework support, you need the Ultimate Edition (paid, 30-day trial available).' },
    ],
    tips: [
      'DevTools Installer installs the free Community Edition. It supports Java, Kotlin, Groovy, and basic Git integration.',
      'Use Ctrl+Shift+A (Find Action) to search for any IDE action, setting, or tool window.',
      'IntelliJ works best with Maven or Gradle projects — import the pom.xml or build.gradle directly to auto-configure the project.',
      'Install the JDK before IntelliJ so the IDE can auto-detect it during first launch.',
    ],
    recommendedPlugins: [
      { name: 'Lombok', desc: 'Eliminates boilerplate Java code — automatically generates getters, setters, builders, and equals/hashCode implementations via annotations like @Data, @Builder, and @Value.' },
      { name: 'SonarLint', desc: 'On-the-fly static analysis that catches bugs, security vulnerabilities, and code smells as you type, before they reach code review.' },
      { name: 'Rainbow Brackets', desc: 'Colorizes matching bracket, parenthesis, and brace pairs in distinct colors — dramatically improves readability in deeply nested code.' },
      { name: 'CheckStyle-IDEA', desc: 'Runs Checkstyle code style checks directly in the IDE, helping enforce consistent formatting across the entire team.' },
    ],
    steps: {
      appSteps: [
        'Open DevTools Installer.',
        'In IDEs & Editors, select "IntelliJ IDEA".',
        'Click "Install Selected".',
        'Let the installer download the official Community Edition package and run it silently.',
        'Open IntelliJ IDEA from the Start Menu after the install finishes.',
        'Create or import a project and confirm IntelliJ can see your JDK.',
      ],
      manualSteps: [
        'Download the official installer from https://www.jetbrains.com/idea/download/#section=windows',
        'Run the installer and follow the wizard.',
        'Launch IntelliJ IDEA from the Start Menu after the install finishes.',
        'If you enabled the launcher during setup, you can also start it from its bin directory.',
        'Open Project Structure and confirm the IDE detects the JDK you want to use.',
      ],
    },
  },
  {
    id: 'notepadpp',
    author: { name: 'Priyanka Kasera', slug: 'priyankakasera' },
    name: 'Notepad++',
    headline: 'How to Install Notepad++ on Windows',
    seoTitle: 'Install Notepad++ on Windows — Lightweight Editor (2026)',
    seoDescription: 'Download and install Notepad++ on Windows. Fast, lightweight code editor with syntax highlighting for 80+ languages. Official 64-bit installer.',
    lastReviewed: '2026-04-01',
    relatedGuides: ['vscode', 'git', 'python'],
    description:
      'Install Notepad++ on Windows if you want a fast editor for logs, config files, and quick code edits without opening a full IDE.',
    editorial: `Not every editing task justifies launching a 2 GB IDE. When you need to inspect a server log, tweak an nginx.conf file, search-and-replace across a directory of CSV files, or quickly edit a JSON configuration — Notepad++ handles all of these in a fraction of the time it takes VS Code or IntelliJ to even finish loading.

Notepad++ has been a Windows staple since 2003, and its longevity is no accident. It occupies a unique position: more powerful than Windows Notepad (which only recently gained tabs and better file handling), but lighter than any code editor built on Electron. The memory footprint is measured in megabytes, not hundreds of megabytes, and it can open files several gigabytes in size without choking — try doing that in VS Code.

Under the lightweight exterior is a surprisingly capable tool. Notepad++ supports syntax highlighting for over 80 languages, regex-powered search and replace across multiple files, macro recording and playback for repetitive edits, column selection mode for tabular data, and a plugin system that adds JSON formatting, XML validation, file comparison, and dozens of other features through the built-in Plugin Admin.

One feature that developers particularly appreciate is the session management. Notepad++ remembers every file you had open — including unsaved scratch files — and restores them exactly as you left them when you reopen the application. This makes it ideal as a persistent scratch pad for notes, code snippets, and temporary data that you do not want to save as formal files.

This guide installs Notepad++ 8.9.3 using the official 64-bit installer. DevTools Installer also adds the Notepad++ directory to your system PATH, enabling you to open files from the command line with "notepad++ filename.txt." The default Windows installer does not set up PATH, so this is a meaningful convenience if you work in the terminal frequently.`,
    category: 'IDEs & Editors',
    versions: ['8.9.3'],
    defaultVersion: '8.9.3',
    downloadSource: 'https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.9.3/npp.8.9.3.Installer.x64.exe',
    downloadLabel: 'notepad-plus-plus.org / GitHub (official)',
    altSources: [],
    envVars: [],
    pathEntries: ['C:\\Program Files\\Notepad++'],
    verifyCommand: 'where notepad++',
    verifyOutput: 'C:\\Program Files\\Notepad++\\notepad++.exe',
    useCases: [
      'Quickly editing configuration files (XML, JSON, YAML, INI) with syntax highlighting.',
      'Replacing Windows Notepad with a more capable editor that supports tabs, line numbers, and encoding selection.',
      'Searching across multiple files with regex-powered Find in Files.',
      'Editing log files — Notepad++ handles very large files more efficiently than most editors.',
      'Writing quick scripts in Python, PowerShell, or Bash with syntax coloring and auto-indentation.',
    ],
    commonIssues: [
      { problem: 'Notepad++ is not in PATH after installation', fix: 'DevTools Installer adds C:\\Program Files\\Notepad++ to PATH. If you installed manually, add it via Environment Variables. This lets you run "notepad++ file.txt" from any terminal.' },
      { problem: 'File encoding issues — special characters appear as garbled text', fix: 'Change encoding via Encoding menu → Convert to UTF-8. Notepad++ supports ANSI, UTF-8, UTF-16, and other encodings. Most modern files should use UTF-8.' },
      { problem: 'Plugins are not loading after installation', fix: 'Notepad++ 8.x uses a Plugin Admin (Plugins → Plugin Admin) for management. Ensure plugins are compatible with 64-bit Notepad++ if you installed the x64 version.' },
      { problem: 'Context menu "Edit with Notepad++" is missing', fix: 'Re-run the installer and ensure the "context menu entry" option is checked, or add the registry entry manually.' },
    ],
    tips: [
      'Notepad++ is ideal as a lightweight companion editor alongside a full IDE. Use it for quick file edits without the overhead of loading a large IDE.',
      'Use Plugins → Plugin Admin to install useful extensions like Compare (side-by-side diffs), JSON Viewer, and XML Tools.',
      'Notepad++ supports macros — record repetitive edit sequences and replay them across files.',
      'Use View → Word Wrap for long lines, and View → Show Symbol → Show All Characters to debug whitespace issues.',
    ],
    steps: {
      appSteps: [
        'Open DevTools Installer.',
        'In IDEs & Editors, select "Notepad++".',
        'Click "Install Selected".',
        'Let the installer download the official package, run it silently, and add `C:\\Program Files\\Notepad++` to PATH.',
        'Open a new terminal window after the install finishes.',
        'Run `where notepad++` to confirm Windows can find the executable.',
      ],
      manualSteps: [
        'Download the official installer from https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.9.3/npp.8.9.3.Installer.x64.exe',
        'Run the installer.',
        'If you want to launch Notepad++ from a terminal, add `C:\\Program Files\\Notepad++` to PATH.',
        'Open a new terminal and run `where notepad++`.',
        'Open a text file in Notepad++ to confirm the app starts correctly.',
      ],
    },
  },
  {
    id: 'postman',
    author: { name: 'Priyanka Kasera', slug: 'priyankakasera' },
    name: 'Postman',
    headline: 'How to Install Postman on Windows',
    seoTitle: 'Install Postman on Windows — API Testing Tool (2026)',
    seoDescription: 'Install Postman on Windows to test, document, and automate APIs. No admin needed, no PATH config. Includes collections, environments, and Newman CLI tips.',
    lastReviewed: '2026-04-01',
    relatedGuides: ['nodejs', 'git', 'vscode'],
    description:
      'Install Postman on Windows if you want a GUI for sending API requests, saving collections, switching environments, and sharing API tests with a team.',
    editorial: `You could test your API with curl, and many developers do. But once you need to manage authentication tokens across environments, run automated test suites against dozens of endpoints, or share a collection of example requests with your team, curl commands in a text file stop scaling. That is where Postman earns its place on over 30 million developer machines worldwide.

Postman's real power is not just sending HTTP requests — it is the workflow around them. You organize requests into collections, parameterize them with environment variables (swap between dev, staging, and production with a dropdown), write JavaScript test assertions that run automatically after each response, and export everything as a JSON file you can commit alongside your source code. For teams, this means your API test suite is versioned, shareable, and runnable in CI/CD via Newman, Postman's headless CLI runner.

Unlike most tools in this guide, Postman is a GUI application that installs to your user profile without administrator privileges. There is no PATH entry to configure and no environment variable to set — you launch it from the Start Menu and sign in with a Postman account to sync collections across devices. This guide covers the automated and manual installation process, along with tips for getting productive quickly.`,
    category: 'API Tools',
    versions: ['12 (latest)'],
    defaultVersion: '12 (latest)',
    downloadSource: 'https://dl.pstmn.io/download/latest/win64',
    downloadLabel: 'postman.com (official)',
    altSources: [],
    envVars: [],
    pathEntries: [],
    verifyCommand: 'Check Start Menu for "Postman"',
    verifyOutput: 'Postman should appear in Start Menu / installed programs',
    useCases: [
      'Sending HTTP requests (GET, POST, PUT, DELETE) to test REST APIs during development.',
      'Organizing API requests into collections for team collaboration and documentation.',
      'Writing automated API tests with Postman\'s built-in test scripting (JavaScript-based).',
      'Generating API documentation from collections and sharing it with stakeholders.',
      'Mocking API responses to unblock frontend development when the backend is not ready.',
    ],
    commonIssues: [
      { problem: 'Postman does not appear in Start Menu after installation', fix: 'Postman installs to %LOCALAPPDATA%\\Postman. Restart Windows Explorer or search for "Postman" in the Start Menu search. The installer creates a shortcut automatically.' },
      { problem: 'Requests fail with SSL certificate errors', fix: 'Disable SSL certificate verification in Settings → General → SSL certificate verification (for development only). For production-like testing, import your CA certificate via Settings → Certificates.' },
      { problem: 'Postman is slow or consumes too much memory', fix: 'Postman is an Electron app and can be memory-intensive. Close unused tabs and minimize the number of open collections. Consider using the lightweight Postman CLI for automated testing.' },
      { problem: 'Cannot connect to localhost APIs', fix: 'Ensure your API server is running and listening on the correct port. If using Docker, check that port mapping is configured. Try http://127.0.0.1:port instead of http://localhost:port if DNS resolution is an issue.' },
    ],
    tips: [
      'Postman is a GUI application and does not add itself to PATH — it is launched from the Start Menu or desktop shortcut.',
      'Use Postman Environments to manage variables like API base URLs and auth tokens across development, staging, and production.',
      'Export collections as JSON files to version-control your API tests alongside your source code.',
      'For CI/CD integration, use Newman (Postman\'s CLI runner): "npm install -g newman" and "newman run collection.json".',
    ],
    workflowTips: [
      'Create a Postman Environment (top-right gear icon) and store variables like {{baseUrl}}, {{authToken}}, and {{apiKey}}. Switch between dev, staging, and production by changing the active Environment from a single dropdown.',
      'Organise requests into Collections — export the Collection as a JSON file and commit it to your repository so the whole team shares the same API test suite and examples.',
      'Use the Pre-request Script tab to generate or refresh auth tokens automatically before each request runs, eliminating the need to manually copy-paste JWT tokens.',
      'The Tests tab accepts JavaScript assertions against the response (e.g., pm.response.to.have.status(200)). Run the full collection headlessly via the Newman CLI to execute API tests in your CI/CD pipeline.',
    ],
    steps: {
      appSteps: [
        'Open DevTools Installer.',
        'In API Tools, select "Postman".',
        'Click "Install Selected".',
        'Let the installer download the official package and run it silently.',
        'Open Postman from the Start Menu after the install finishes.',
        'Sign in if you want to sync collections, environments, and workspaces.',
      ],
      manualSteps: [
        'Download the official installer from https://dl.pstmn.io/download/latest/win64',
        'Run the installer.',
        'Postman installs to %LOCALAPPDATA%\\Postman and does not need PATH changes.',
        'Open Postman from the Start Menu or desktop shortcut.',
        'Send a request or open an existing collection to confirm the app starts correctly.',
      ],
    },
  },
]

export default toolGuides
