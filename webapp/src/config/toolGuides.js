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
    lastReviewed: '2026-04-01',
    relatedGuides: ['maven', 'gradle', 'intellij-idea'],
    description:
      'Java Development Kit (JDK) is required for Java and Kotlin development, Android Studio, and many enterprise applications.',
    editorial: `Java remains one of the most widely used programming languages in the world, powering everything from enterprise backend systems and Android mobile apps to big-data platforms like Apache Spark and Kafka. If you are learning to code, contributing to an open-source project, or setting up a production build server, you will almost certainly need a JDK installed on your machine.

The JDK (Java Development Kit) includes the Java compiler, the Java Runtime Environment, and essential tools like jar and javadoc. On Windows, installing Java correctly means more than just running an installer — you also need to set the JAVA_HOME environment variable and add the bin directory to your system PATH so that build tools like Maven and Gradle can locate the JDK automatically.

This guide covers both the one-click automated method using DevTools Installer and the full manual process. We support Oracle JDK 21 (the current long-term support release), as well as Adoptium Temurin builds for JDK 17 and JDK 11 if your project requires an older LTS version.`,
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
        'Find "Java (JDK)" in the Core Programming Runtimes category.',
        'Select the version you need (default: 21.0.10).',
        'Click "Install Selected".',
        'The installer downloads the MSI from Oracle/Adoptium, runs a silent install, sets JAVA_HOME, and adds the bin directory to PATH.',
      ],
      manualSteps: [
        'Download the MSI installer from https://download.oracle.com/java/21/latest/jdk-21_windows-x64_bin.msi',
        'Run the installer and follow the wizard (or use: msiexec /i jdk-21_windows-x64_bin.msi /quiet).',
        'Set the JAVA_HOME environment variable to the install directory (e.g. C:\\Program Files\\Java\\jdk-21.0.10).',
        'Add %JAVA_HOME%\\bin to your system PATH.',
        'Open a new terminal and run: java -version',
      ],
    },
  },
  {
    id: 'nodejs',
    author: { name: 'Priyanka Kasera', slug: 'priyankakasera' },
    name: 'Node.js',
    headline: 'How to Install Node.js on Windows',
    lastReviewed: '2026-04-01',
    relatedGuides: ['yarn', 'vscode', 'git'],
    description:
      'Node.js is a JavaScript runtime required for frontend development, React, Angular, Vue, and server-side JS applications.',
    editorial: `Node.js transformed JavaScript from a browser-only language into a full-stack development platform. Today it powers the build systems behind virtually every modern frontend framework — React, Angular, Vue, Next.js, and Vite all require Node.js to compile, bundle, and serve your code during development.

Beyond frontend tooling, Node.js is a first-class runtime for building backend APIs with Express, Fastify, or NestJS, running serverless functions on AWS Lambda, and automating tasks with npm scripts. Its package ecosystem (npm) is the largest in the world with over two million packages.

Installing Node.js on Windows is straightforward, but choosing the right version matters. LTS releases (even-numbered, like 22.x and 24.x) receive long-term security patches and are recommended for production workloads. Current releases (odd-numbered, like 25.x) include the latest language features but may introduce breaking changes. This guide walks you through both the automated and manual installation process, including how to verify that both node and npm are working correctly.`,
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
        'Find "Node.js" in the Core Programming Runtimes category.',
        'Select the version you need (default: 25.8.2).',
        'Click "Install Selected".',
        'The installer downloads the MSI from nodejs.org, runs a silent install, and adds Node.js to PATH.',
      ],
      manualSteps: [
        'Download the MSI from https://nodejs.org/dist/v25.8.2/node-v25.8.2-x64.msi',
        'Run the installer (or use: msiexec /i node-v25.8.2-x64.msi /quiet).',
        'The installer adds C:\\Program Files\\nodejs to PATH automatically.',
        'Open a new terminal and run: node -v',
        'Also verify npm: npm -v',
      ],
    },
  },
  {
    id: 'python',
    author: { name: 'Priyanka Kasera', slug: 'priyankakasera' },
    name: 'Python',
    headline: 'How to Install Python on Windows',
    lastReviewed: '2026-04-01',
    relatedGuides: ['miniconda', 'vscode', 'git'],
    description:
      'Python is used for scripting, data science, machine learning, web development (Django/Flask), and automation.',
    editorial: `Python is the go-to language for data science, machine learning, automation scripting, and backend web development. Its clean syntax and massive library ecosystem make it one of the most beginner-friendly languages, yet it powers production systems at companies like Instagram, Spotify, and Dropbox.

On Windows, installing Python correctly is surprisingly tricky. The default installer does not add Python to PATH unless you explicitly check a box, and Windows 10/11 ships with a stub executable that redirects you to the Microsoft Store instead of running your installed Python. Getting pip (Python's package manager) and the Scripts directory into PATH is equally important if you want to install packages from the command line.

This guide covers Python 3.14 through 3.10 — from the latest release with performance optimizations to older versions required by legacy projects. We show you how to install Python with automatic PATH configuration using DevTools Installer, and how to do it manually step by step. We also cover the most common post-install issues, including the Windows Store redirect problem and virtual environment setup.`,
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
        'Find "Python" in the Core Programming Runtimes category.',
        'Select the version you need (default: 3.14.3).',
        'Click "Install Selected".',
        'The installer downloads from python.org, runs a silent install with PrependPath=1, and adds both the python and Scripts directories to PATH.',
      ],
      manualSteps: [
        'Download from https://www.python.org/ftp/python/3.14.3/python-3.14.3-amd64.exe',
        'Run the installer — check "Add Python to PATH" in the wizard.',
        'Or use silent install: python-3.14.3-amd64.exe /quiet InstallAllUsers=1 PrependPath=1',
        'Open a new terminal and run: python --version',
        'Also verify pip: pip --version',
      ],
    },
  },
  {
    id: 'maven',
    author: { name: 'Vishal Hulawale', slug: 'vishalhulawale' },
    name: 'Apache Maven',
    headline: 'How to Install Maven on Windows',
    lastReviewed: '2026-04-01',
    relatedGuides: ['java', 'gradle', 'intellij-idea'],
    description:
      'Maven is a build automation and dependency management tool for Java projects.',
    editorial: `Apache Maven is the standard build tool for Java projects in enterprise environments. If you are working on a Spring Boot application, a Jakarta EE service, or any Java project that declares its dependencies in a pom.xml file, you need Maven installed on your machine to compile, test, and package your code.

Unlike tools that install via a simple MSI or EXE, Maven ships as a zip archive that you extract manually and configure through environment variables. You need to set MAVEN_HOME (and optionally M2_HOME) to point at the extracted directory, then add its bin subfolder to your system PATH. You also need a JDK installed first — Maven cannot function without one.

This guide walks you through the complete Maven setup on Windows, from downloading the official Apache distribution to verifying that mvn -version returns the expected output. We cover both the automated one-click method and the full manual process, along with common issues like JAVA_HOME misconfiguration and dependency resolution failures behind corporate proxies.`,
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
        'Find "Apache Maven" in the Package Managers category.',
        'Click "Install Selected".',
        'The installer downloads the zip from Apache, extracts it, sets MAVEN_HOME and M2_HOME, and adds the bin directory to PATH.',
      ],
      manualSteps: [
        'Download from https://dlcdn.apache.org/maven/maven-3/3.9.14/binaries/apache-maven-3.9.14-bin.zip',
        'Extract the zip to C:\\Program Files\\Maven\\apache-maven-3.9.14',
        'Set MAVEN_HOME to C:\\Program Files\\Maven\\apache-maven-3.9.14',
        'Set M2_HOME to the same value.',
        'Add %MAVEN_HOME%\\bin to your system PATH.',
        'Open a new terminal and run: mvn -version',
      ],
    },
  },
  {
    id: 'git',
    author: { name: 'Priyanka Kasera', slug: 'priyankakasera' },
    name: 'Git',
    headline: 'How to Install Git on Windows',
    lastReviewed: '2026-04-01',
    relatedGuides: ['github-desktop', 'vscode', 'nodejs'],
    description:
      'Git is the most widely used distributed version control system — essential for every developer.',
    editorial: `Git is the foundation of modern software development. Whether you are pushing code to GitHub, collaborating on a team project, or managing infrastructure-as-code, Git is the version control system you will use daily. It is a prerequisite for virtually every development workflow and CI/CD pipeline.

Git for Windows includes the core Git command-line tools, Git Bash (a UNIX-like terminal environment), Git GUI, and integration with the Windows Credential Manager for HTTPS authentication. The installer adds Git's cmd directory to your system PATH so you can run git commands from any terminal — Command Prompt, PowerShell, or Windows Terminal.

This guide covers Git 2.53, the latest stable release. We walk you through the automated installation via DevTools Installer and the manual process using the official Git for Windows installer. We also cover essential post-install configuration (user name, email, default branch name) and common issues like SSH key setup and line-ending conflicts between Windows and Unix systems.`,
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
        'Find "Git" in the Version Control category.',
        'Click "Install Selected".',
        'The installer downloads from GitHub, runs a silent install, and adds Git\\cmd to PATH.',
      ],
      manualSteps: [
        'Download from https://github.com/git-for-windows/git/releases/download/v2.53.0.windows.1/Git-2.53.0-64-bit.exe',
        'Run the installer — the default options are suitable for most users.',
        'Git adds C:\\Program Files\\Git\\cmd to PATH automatically.',
        'Open a new terminal and run: git --version',
      ],
    },
  },
  {
    id: 'github-desktop',
    author: { name: 'Priyanka Kasera', slug: 'priyankakasera' },
    name: 'GitHub Desktop',
    headline: 'How to Install GitHub Desktop on Windows',
    lastReviewed: '2026-04-01',
    relatedGuides: ['git', 'vscode', 'nodejs'],
    description:
      'GitHub Desktop is a visual Git client that simplifies Git workflows with an intuitive graphical interface.',
    editorial: `GitHub Desktop takes the complexity out of Git by wrapping common operations — commit, branch, push, pull, merge — in a clean visual interface. If you find yourself frequently checking "git status", reading diff output in the terminal, or resolving merge conflicts by editing conflict markers manually, GitHub Desktop offers a more visual alternative that many developers find faster for everyday work.

Built and maintained by GitHub, the app integrates natively with GitHub.com and GitHub Enterprise. You can clone repositories in one click, create branches, review changes line by line, and open pull requests without leaving the application. It also works with any Git repository, including those hosted on GitLab, Bitbucket, or a self-hosted server.

Unlike most tools in this guide, GitHub Desktop does not require administrator privileges and installs to your user profile directory. It includes its own bundled Git binary, so you can use it even without a standalone Git installation — though we recommend installing Git for Windows alongside it for full command-line coverage.`,
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
        'Find "GitHub Desktop" in the Version Control category.',
        'Click "Install Selected".',
        'The installer downloads the Squirrel-based setup from GitHub and runs a silent install.',
        'The app installs to %LOCALAPPDATA%\\GitHubDesktop (per-user, no admin required).',
        'Any auto-launched GitHub Desktop window is automatically closed after installation.',
      ],
      manualSteps: [
        'Download from https://desktop.github.com/ or directly from https://central.github.com/deployments/desktop/desktop/latest/GitHubDesktopSetup-x64.exe',
        'Run the installer — it installs automatically to %LOCALAPPDATA%\\GitHubDesktop.',
        'No PATH configuration is needed — GitHub Desktop is a GUI application.',
        'GitHub Desktop launches after installation. Sign in with your GitHub account to get started.',
        'To verify, check that the folder %LOCALAPPDATA%\\GitHubDesktop\\app-* exists, or look for "GitHub Desktop" in the Start Menu.',
      ],
    },
  },
  {
    id: 'gradle',
    author: { name: 'Vishal Hulawale', slug: 'vishalhulawale' },
    name: 'Gradle',
    headline: 'How to Install Gradle on Windows',
    lastReviewed: '2026-04-01',
    relatedGuides: ['java', 'maven', 'intellij-idea'],
    description:
      'Gradle is a powerful build automation tool supporting Java, Kotlin, Groovy, and multi-language projects.',
    editorial: `Gradle is the build system of choice for Android development and an increasingly popular alternative to Maven for JVM-based projects. Android Studio uses Gradle exclusively, and frameworks like Spring Boot support Gradle as a first-class build tool alongside Maven.

What sets Gradle apart is its flexibility. Build scripts are written in Groovy or Kotlin DSL rather than XML, giving you the full power of a programming language to define custom tasks, conditional logic, and plugin composition. Gradle also features incremental compilation, build caching, and a persistent daemon process that make repeated builds significantly faster than Maven for large codebases.

Like Maven, Gradle is distributed as a zip archive. You extract it, set the GRADLE_HOME environment variable, and add the bin directory to PATH. Most existing projects ship with a Gradle Wrapper (gradlew.bat) that pins the Gradle version, but a global installation is still useful for bootstrapping new projects and running ad-hoc tasks.`,
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
        'Find "Gradle" in the Package Managers category.',
        'Click "Install Selected".',
        'The installer downloads the zip from gradle.org, extracts it, sets GRADLE_HOME, and adds the bin directory to PATH.',
      ],
      manualSteps: [
        'Download from https://services.gradle.org/distributions/gradle-9.4.1-bin.zip',
        'Extract to C:\\Program Files\\Gradle\\gradle-9.4.1',
        'Set GRADLE_HOME to C:\\Program Files\\Gradle\\gradle-9.4.1',
        'Add %GRADLE_HOME%\\bin to your system PATH.',
        'Open a new terminal and run: gradle -v',
      ],
    },
  },
  {
    id: 'yarn',
    author: { name: 'Priyanka Kasera', slug: 'priyankakasera' },
    name: 'Yarn',
    headline: 'How to Install Yarn on Windows',
    lastReviewed: '2026-04-01',
    relatedGuides: ['nodejs', 'git', 'vscode'],
    description:
      'Yarn is a fast, reliable dependency manager for Node.js projects.',
    editorial: `Yarn was created by Facebook (now Meta) in 2016 to address reliability and performance issues with npm at the time. It introduced deterministic lockfiles, parallel package downloads, and offline caching — features that npm has since adopted but that Yarn continues to refine.

Today, Yarn Classic (1.x) remains the most widely deployed version and is what many open-source projects specify in their contributing guidelines. If you clone a repository and see a yarn.lock file, you should install dependencies with Yarn rather than npm to ensure you get exactly the same dependency tree the maintainers tested against. This is especially important in CI/CD pipelines and team environments where reproducible builds prevent the "works on my machine" problem.

On Windows, Yarn is distributed as an MSI installer that places the binary in Program Files and adds it to your system PATH. Because Yarn is a Node.js tool, you must have Node.js installed first — Yarn uses Node's runtime under the hood to execute JavaScript-based build scripts and resolve packages from the npm registry.

This guide installs Yarn 1.22 via the official Windows MSI installer. Note that Yarn 2+ (Berry) is a separate architecture that is enabled on a per-project basis — it does not replace a global Yarn Classic installation. Yarn requires Node.js, so make sure Node is installed before proceeding.`,
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
        'Find "Yarn" in the Package Managers category.',
        'Click "Install Selected".',
        'The installer downloads the MSI from GitHub, runs a silent install, and adds Yarn\\bin to PATH.',
      ],
      manualSteps: [
        'Download from https://github.com/yarnpkg/yarn/releases/download/v1.22.22/yarn-1.22.22.msi',
        'Run the MSI installer.',
        'Yarn adds C:\\Program Files (x86)\\Yarn\\bin to PATH automatically.',
        'Open a new terminal and run: yarn --version',
      ],
    },
  },
  {
    id: 'chocolatey',
    author: { name: 'Priyanka Kasera', slug: 'priyankakasera' },
    name: 'Chocolatey',
    headline: 'How to Install Chocolatey on Windows',
    lastReviewed: '2026-04-01',
    relatedGuides: ['git', 'nodejs', 'vscode'],
    description:
      'Chocolatey is the package manager for Windows, automating software installation and management.',
    editorial: `Linux developers have had apt and yum for decades, and macOS has Homebrew. Chocolatey brings the same package-management experience to Windows: install, upgrade, and uninstall software from the command line with a single command like "choco install git". For developers who work primarily on Windows, Chocolatey fills a critical gap in the toolchain by providing scriptable, repeatable software installation.

Chocolatey draws from a community-maintained repository of over 9,000 packages covering everything from developer tools and runtimes to system utilities and fonts. It handles downloading the correct installer, running it silently, and configuring PATH entries. For enterprise environments, Chocolatey offers a commercial edition with features like package internalization, license management, and integration with SCCM and Intune. Many teams use Chocolatey alongside DevTools Installer — our tool handles the core developer runtimes and IDEs, while Chocolatey covers everything else.

This guide installs Chocolatey 2.7 on your Windows machine. The official installation method uses a PowerShell one-liner that downloads and executes a remote script, but DevTools Installer simplifies it further with an MSI-based silent install. Once Chocolatey is installed, it becomes a powerful complement to DevTools Installer for any software that falls outside our built-in tool list.`,
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
        'Find "Chocolatey" in the Package Managers category.',
        'Click "Install Selected".',
        'The installer downloads the MSI and runs a silent install. Chocolatey bin directory is added to PATH.',
      ],
      manualSteps: [
        'Download from https://github.com/chocolatey/choco/releases/download/2.7.0/chocolatey-2.7.0.0.msi',
        'Run the MSI installer.',
        'Or install via PowerShell (admin): Set-ExecutionPolicy Bypass -Scope Process; iex ((New-Object System.Net.WebClient).DownloadString("https://community.chocolatey.org/install.ps1"))',
        'Open a new terminal and run: choco --version',
      ],
    },
  },
  {
    id: 'miniconda',
    author: { name: 'Priyanka Kasera', slug: 'priyankakasera' },
    name: 'Miniconda',
    headline: 'How to Install Miniconda on Windows',
    lastReviewed: '2026-04-01',
    relatedGuides: ['python', 'vscode', 'git'],
    description:
      'Miniconda is a minimal conda installer that provides a lightweight Python environment and package manager for data science and development.',
    editorial: `If you work in data science, machine learning, or scientific computing on Windows, Miniconda is the recommended way to manage your Python environments. Unlike pip, conda can install and resolve native binary dependencies (C libraries, CUDA toolkits, Fortran routines) that packages like NumPy, SciPy, and TensorFlow rely on. This makes conda essential for workflows where compiled extensions and GPU acceleration are involved.

Miniconda is the slim variant of the full Anaconda distribution. Where Anaconda ships with over 250 pre-installed packages (many of which you may never use), Miniconda includes only conda itself, Python, and a handful of essential packages. You then install exactly what you need into isolated environments, keeping your system lean and avoiding version conflicts between projects. Each conda environment is fully self-contained — with its own Python interpreter and installed packages — so you can have a TensorFlow 2.x environment alongside a PyTorch environment without any interference.

This guide walks you through installing Miniconda on Windows for all users. We cover the automated method via DevTools Installer (which also handles corrupt previous installations) and the full manual process, including adding all three required directories to your system PATH.`,
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
        'Find "Miniconda" in the Package Managers category.',
        'Click "Install Selected".',
        'The installer downloads the NSIS-based installer from Anaconda and runs a silent all-users install to C:\\ProgramData\\miniconda3.',
        'If a corrupt previous install is detected (directory exists but condabin is missing), it is automatically cleaned up before installing.',
        'Three directories are added to PATH: C:\\ProgramData\\miniconda3, C:\\ProgramData\\miniconda3\\Scripts, and C:\\ProgramData\\miniconda3\\condabin.',
      ],
      manualSteps: [
        'Download from https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe',
        'Run the installer — select "Install for all users" to install to C:\\ProgramData\\miniconda3.',
        'Or use silent install: Miniconda3-latest-Windows-x86_64.exe /InstallationType=AllUsers /AddToPath=0 /RegisterPython=0 /S /D=C:\\ProgramData\\miniconda3',
        'Add all three directories to your system PATH: C:\\ProgramData\\miniconda3, C:\\ProgramData\\miniconda3\\Scripts, and C:\\ProgramData\\miniconda3\\condabin.',
        'Open a new terminal and run: conda --version',
        'If the install fails due to a pre-existing corrupt directory, delete C:\\ProgramData\\miniconda3 manually and retry.',
      ],
    },
  },
  {
    id: 'docker-desktop',
    author: { name: 'Vishal Hulawale', slug: 'vishalhulawale' },
    name: 'Docker Desktop',
    hidden: true,
    headline: 'How to Install Docker Desktop on Windows',
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
        'Docker is added to PATH at C:\\Program Files\\Docker\\Docker\\resources\\bin.',
        'Restart your computer if prompted.',
        'Open a new terminal and run: docker --version',
      ],
    },
  },
  {
    id: 'kubectl',
    author: { name: 'Vishal Hulawale', slug: 'vishalhulawale' },
    name: 'kubectl',
    headline: 'How to Install kubectl on Windows',
    lastReviewed: '2026-04-01',
    relatedGuides: ['helm', 'istio', 'awscli'],
    description:
      'kubectl is the command-line tool for controlling Kubernetes clusters.',
    editorial: `kubectl (pronounced "kube-control" or "kube-cuddle," depending on who you ask) is the primary CLI for interacting with any Kubernetes cluster. If you are deploying containers, managing microservices, or debugging a pod that will not start, kubectl is the tool you will reach for. It is a prerequisite for every Kubernetes-related tool in your workflow, including Helm and Istio.

Unlike most developer tools, kubectl is a single standalone binary with no installer, no registry entries, and no dependencies. You download the executable, place it in a directory on your PATH, and it is ready to use. Configuration comes from a kubeconfig file (typically at %USERPROFILE%\\.kube\\config) that stores cluster addresses, certificates, and authentication tokens. This simplicity makes kubectl easy to install but also means there is no built-in auto-update mechanism — you need to manage version upgrades yourself or let DevTools Installer handle it.

This guide covers kubectl 1.35.3 and also offers 1.34.x and 1.33.x for teams that need to match their cluster's Kubernetes version (kubectl supports a one-minor-version skew in either direction). We walk through both the automated installation and the manual process, plus post-install configuration and troubleshooting.`,
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
        'Find "Kubernetes CLI (kubectl)" in the Cloud & DevOps category.',
        'Click "Install Selected".',
        'The installer downloads the kubectl.exe binary and places it in C:\\Program Files\\kubectl, which is added to PATH.',
      ],
      manualSteps: [
        'Download from https://dl.k8s.io/release/v1.35.3/bin/windows/amd64/kubectl.exe',
        'Create a directory: C:\\Program Files\\kubectl',
        'Move kubectl.exe into that directory.',
        'Add C:\\Program Files\\kubectl to your system PATH.',
        'Open a new terminal and run: kubectl version --client',
      ],
    },
  },
  {
    id: 'awscli',
    author: { name: 'Vishal Hulawale', slug: 'vishalhulawale' },
    name: 'AWS CLI',
    headline: 'How to Install AWS CLI on Windows',
    lastReviewed: '2026-04-01',
    relatedGuides: ['kubectl', 'helm', 'azurecli'],
    description:
      'AWS CLI is the command-line interface for managing Amazon Web Services resources.',
    editorial: `The AWS CLI is the Swiss Army knife for managing Amazon Web Services infrastructure from your terminal. Whether you need to upload files to S3, launch an EC2 instance, deploy a Lambda function, or query CloudWatch logs, the AWS CLI provides a consistent interface across all 200+ AWS services.

For developers, the AWS CLI is essential for scripting cloud operations that would be tedious to perform through the web console. It is also a building block for CI/CD pipelines — most deployment workflows include AWS CLI commands for pushing container images to ECR, updating ECS services, or invalidating CloudFront caches.

This guide installs AWS CLI v2, the current major version that includes auto-complete, interactive wizards, and improved credential management. The installation uses the official MSI package from Amazon, which handles PATH configuration automatically. After installing, you will need your AWS Access Key and Secret Key (available from the IAM console) to authenticate.`,
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
        'Find "AWS CLI" in the Cloud & DevOps category.',
        'Click "Install Selected".',
        'The installer downloads the MSI from AWS and runs a silent install.',
      ],
      manualSteps: [
        'Download from https://awscli.amazonaws.com/AWSCLIV2.msi',
        'Run the MSI installer (or use: msiexec /i AWSCLIV2.msi /quiet).',
        'AWS CLI is added to PATH at C:\\Program Files\\Amazon\\AWSCLIV2.',
        'Open a new terminal and run: aws --version',
      ],
    },
  },
  {
    id: 'azurecli',
    author: { name: 'Vishal Hulawale', slug: 'vishalhulawale' },
    name: 'Azure CLI',
    headline: 'How to Install Azure CLI on Windows',
    lastReviewed: '2026-04-01',
    relatedGuides: ['kubectl', 'helm', 'awscli'],
    description:
      'Azure CLI is the command-line interface for managing Microsoft Azure resources.',
    editorial: `Azure CLI is Microsoft's cross-platform command-line tool for creating and managing Azure resources. If your organization uses Azure for cloud hosting, AKS for Kubernetes, or Azure DevOps for CI/CD, the Azure CLI is the fastest way to interact with those services from your terminal. It bridges the gap between the Azure Portal's browser-based interface and fully automated infrastructure-as-code deployments.

Azure CLI uses a consistent "az <service> <command>" syntax that is easy to learn and script. It supports interactive login via the browser, service principal authentication for automation, and managed identity for workloads running inside Azure. Output can be formatted as JSON, table, or TSV, making it straightforward to pipe into other tools or parse in scripts. Combined with Azure Resource Manager templates or Bicep files, the Azure CLI enables fully reproducible cloud deployments from your Windows terminal.

This guide installs the latest Azure CLI v2 on Windows using the official MSI installer from Microsoft. The installer configures PATH automatically, so you can start using "az" commands from any terminal immediately after installation. We also cover authentication setup, subscription switching, and common post-install issues.`,
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
        'Find "Azure CLI" in the Cloud & DevOps category.',
        'Click "Install Selected".',
        'The installer downloads the MSI from Microsoft and runs a silent install.',
      ],
      manualSteps: [
        'Download from https://aka.ms/installazurecliwindowsx64',
        'Run the MSI installer.',
        'Azure CLI is added to PATH at C:\\Program Files\\Microsoft SDKs\\Azure\\CLI2\\wbin.',
        'Open a new terminal and run: az --version',
      ],
    },
  },
  {
    id: 'helm',
    author: { name: 'Vishal Hulawale', slug: 'vishalhulawale' },
    name: 'Helm',
    headline: 'How to Install Helm on Windows',
    lastReviewed: '2026-04-01',
    relatedGuides: ['kubectl', 'istio', 'awscli'],
    description:
      'Helm is the package manager for Kubernetes, used to manage charts and deploy applications to clusters.',
    editorial: `Helm is often described as "the package manager for Kubernetes," and the analogy is apt. Just as apt installs software on Linux or npm installs packages in Node.js, Helm installs pre-packaged applications (called charts) onto Kubernetes clusters. A single "helm install" command can deploy a complete application stack — pods, services, config maps, secrets, and ingress rules — that would otherwise require dozens of YAML files.

Helm charts are available for virtually every popular open-source infrastructure component: NGINX, PostgreSQL, Redis, Prometheus, Grafana, Elasticsearch, and hundreds more. You can also create your own charts to package your application for repeatable deployment across development, staging, and production environments.

This guide covers Helm 4.1.3, the latest stable release. Helm 4.x operates entirely client-side (the server-side Tiller component was removed in Helm 3), making it simpler and more secure. Helm requires kubectl as a prerequisite since it communicates with your cluster through kubectl's configuration.`,
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
        'Open DevTools Installer.',
        'Find "Helm" in the Cloud & DevOps category.',
        'Click "Install Selected".',
        'The installer downloads the zip from helm.sh, extracts it to C:\\Program Files\\Helm\\windows-amd64, and adds the directory to PATH.',
        'Prerequisite: kubectl must be installed (Helm depends on it to communicate with Kubernetes clusters).',
      ],
      manualSteps: [
        'Ensure kubectl is installed first — Helm requires it to interact with Kubernetes clusters.',
        'Download from https://get.helm.sh/helm-v4.1.3-windows-amd64.zip',
        'Extract the zip to C:\\Program Files\\Helm (the zip contains a windows-amd64 folder with helm.exe).',
        'Add C:\\Program Files\\Helm\\windows-amd64 to your system PATH.',
        'Open a new terminal and run: helm version',
      ],
    },
  },
  {
    id: 'istio',
    author: { name: 'Vishal Hulawale', slug: 'vishalhulawale' },
    name: 'Istio (istioctl)',
    headline: 'How to Install Istio on Windows',
    lastReviewed: '2026-04-01',
    relatedGuides: ['kubectl', 'helm', 'awscli'],
    description:
      'Istio is a service mesh that provides traffic management, security, and observability for microservices.',
    editorial: `Istio is the leading open-source service mesh for Kubernetes environments. If you are running a microservices architecture and need to add mutual TLS encryption between services, implement traffic splitting for canary deployments, or collect distributed traces across your system — all without modifying application code — Istio is the standard solution.

Istio works by injecting a lightweight Envoy proxy sidecar into every pod in your cluster. These proxies intercept all network traffic, enabling Istio to enforce security policies, route traffic based on custom rules, and collect telemetry data at the mesh level. The istioctl CLI you install here is used to install the Istio control plane, analyze configurations, and debug mesh issues.

This guide covers istioctl 1.29.1, which you install locally on your Windows development machine. The CLI then connects to your Kubernetes cluster (via kubectl's configuration) to install and manage the Istio control plane. kubectl is a prerequisite — install it first if you have not already.`,
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
        'Open DevTools Installer.',
        'Find "Istio (istioctl)" in the Cloud & DevOps category.',
        'Click "Install Selected".',
        'The installer downloads the zip from GitHub, extracts it to C:\\Program Files\\Istio\\istio-1.29.1, and adds the bin directory to PATH.',
        'Prerequisite: kubectl must be installed (Istio depends on it to manage service mesh configurations on Kubernetes clusters).',
      ],
      manualSteps: [
        'Ensure kubectl is installed first — Istio requires it for Kubernetes cluster interaction.',
        'Download from https://github.com/istio/istio/releases/download/1.29.1/istio-1.29.1-win.zip',
        'Extract the zip to C:\\Program Files\\Istio (the zip contains an istio-1.29.1 folder with bin\\istioctl.exe inside).',
        'Add C:\\Program Files\\Istio\\istio-1.29.1\\bin to your system PATH.',
        'Open a new terminal and run: istioctl version --remote=false',
        'The --remote=false flag checks the local CLI version without connecting to a cluster.',
      ],
    },
  },
  {
    id: 'vscode',
    author: { name: 'Priyanka Kasera', slug: 'priyankakasera' },
    name: 'Visual Studio Code',
    headline: 'How to Install VS Code on Windows',
    lastReviewed: '2026-04-01',
    relatedGuides: ['git', 'nodejs', 'python'],
    description:
      'VS Code is a lightweight but powerful source-code editor by Microsoft.',
    editorial: `Visual Studio Code has become the most popular code editor in the world, used by over 70% of developers according to Stack Overflow's annual survey. Its combination of speed, extensibility, and built-in features (Git integration, IntelliSense, integrated terminal, debugging) makes it the default choice for web development, Python scripting, and many other workflows.

VS Code's extension marketplace is what sets it apart from other editors. With over 50,000 extensions, you can add first-class support for virtually any language (Rust, Go, C++, Java), connect to remote environments (WSL, SSH, Docker containers), and integrate with tools like GitHub Copilot, ESLint, and Prettier. Despite this extensibility, VS Code starts up in seconds and remains responsive even with hundreds of thousands of lines of code.

This guide installs the latest stable version of VS Code for Windows using the official 64-bit installer from Microsoft. The installer adds the "code" command to your PATH so you can open files and folders directly from any terminal with "code ." or "code filename".`,
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
        'Find "Visual Studio Code" in the IDEs & Editors category.',
        'Click "Install Selected".',
        'The installer downloads from Microsoft, runs a silent install, adds context menu entries, and adds VS Code to PATH.',
      ],
      manualSteps: [
        'Download from https://code.visualstudio.com/download',
        'Run the installer — check "Add to PATH" in the wizard.',
        'VS Code is added to PATH at C:\\Program Files\\Microsoft VS Code\\bin.',
        'Open a new terminal and run: code --version',
      ],
    },
  },
  {
    id: 'intellij-idea',
    author: { name: 'Vishal Hulawale', slug: 'vishalhulawale' },
    name: 'IntelliJ IDEA',
    headline: 'How to Install IntelliJ IDEA on Windows',
    lastReviewed: '2026-04-01',
    relatedGuides: ['java', 'maven', 'gradle'],
    description:
      'IntelliJ IDEA is a professional IDE for Java and Kotlin development by JetBrains.',
    editorial: `IntelliJ IDEA is widely regarded as the best IDE for Java and Kotlin development. Its deep code analysis, intelligent refactoring tools, and seamless integration with build systems like Maven and Gradle make it the preferred choice for enterprise Java developers and Android engineers alike (Android Studio is built on the same IntelliJ platform).

The Community Edition, which this guide installs, is free and open-source. It provides full support for Java, Kotlin, Groovy, and Scala, plus built-in version control, a powerful debugger, and a test runner. The paid Ultimate Edition adds support for web frameworks (Spring, Jakarta EE), database tools, and additional languages like JavaScript and TypeScript.

This guide covers the straightforward installation process on Windows. IntelliJ IDEA works best when a JDK is already installed, as it can auto-detect the JDK during first launch. We recommend installing Java (JDK) first via DevTools Installer, then installing IntelliJ IDEA to get the smoothest setup experience.`,
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
        'Find "IntelliJ IDEA" in the IDEs & Editors category.',
        'Click "Install Selected".',
        'The installer downloads the Community Edition from JetBrains and runs a silent install.',
      ],
      manualSteps: [
        'Download from https://www.jetbrains.com/idea/download/#section=windows',
        'Run the installer and follow the wizard.',
        'IntelliJ IDEA is added to PATH at its bin directory.',
        'Launch from Start Menu or run: idea64.exe',
      ],
    },
  },
  {
    id: 'notepadpp',
    author: { name: 'Priyanka Kasera', slug: 'priyankakasera' },
    name: 'Notepad++',
    headline: 'How to Install Notepad++ on Windows',
    lastReviewed: '2026-04-01',
    relatedGuides: ['vscode', 'git', 'python'],
    description:
      'Notepad++ is a free, lightweight source code editor and Notepad replacement.',
    editorial: `Notepad++ has been a Windows developer staple for over 20 years. It fills the gap between the bare-bones Windows Notepad and full-featured IDEs — perfect for when you need to quickly edit a config file, inspect a log, or make a small code change without waiting for a heavy IDE to load.

Despite its lightweight footprint, Notepad++ packs serious functionality: syntax highlighting for over 80 languages, regex-powered search and replace across files, macro recording, split-screen editing, and a plugin ecosystem that adds features like JSON formatting, XML validation, and file comparison. It also handles very large files (multiple gigabytes) far more gracefully than most editors.

This guide installs Notepad++ 8.9.3, the latest stable release, using the official 64-bit installer. DevTools Installer also adds the Notepad++ directory to your system PATH, so you can open files directly from the command line with "notepad++ filename.txt" — a feature the default installer does not configure.`,
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
        'Find "Notepad++" in the IDEs & Editors category.',
        'Click "Install Selected".',
        'The installer downloads from GitHub and runs a silent install.',
      ],
      manualSteps: [
        'Download from https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.9.3/npp.8.9.3.Installer.x64.exe',
        'Run the installer.',
        'Notepad++ is added to PATH at C:\\Program Files\\Notepad++.',
        'Open a new terminal and run: where notepad++',
      ],
    },
  },
  {
    id: 'postman',
    author: { name: 'Priyanka Kasera', slug: 'priyankakasera' },
    name: 'Postman',
    headline: 'How to Install Postman on Windows',
    lastReviewed: '2026-04-01',
    relatedGuides: ['nodejs', 'git', 'vscode'],
    description:
      'Postman is an API platform for building, testing, and documenting APIs.',
    editorial: `Postman has evolved from a simple Chrome extension for testing HTTP requests into a comprehensive API development platform used by over 30 million developers worldwide. If you are building, testing, or documenting REST APIs, GraphQL endpoints, or WebSocket connections, Postman provides a visual interface that is far more productive than crafting curl commands by hand.

Beyond manual request testing, Postman supports automated test scripts (written in JavaScript), environment variables for managing different API configurations, mock servers for frontend development when the backend is not ready, and API documentation generation that stays in sync with your collection of requests.

This guide installs the latest version of Postman for Windows. Unlike most tools in DevTools Installer, Postman is a GUI application that installs to your user profile directory and does not add itself to PATH — you launch it from the Start Menu or desktop shortcut. No admin rights are required for installation.`,
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
        'Find "Postman" in the API & Testing Tools category.',
        'Click "Install Selected".',
        'The installer downloads from Postman and runs a silent install.',
      ],
      manualSteps: [
        'Download from https://dl.pstmn.io/download/latest/win64',
        'Run the installer.',
        'Postman is installed to %LOCALAPPDATA%\\Postman.',
        'Launch from Start Menu or the desktop shortcut.',
      ],
    },
  },
]

export default toolGuides
