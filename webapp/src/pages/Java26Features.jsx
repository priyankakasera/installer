import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import CodeBlock from '../components/CodeBlock'
import GuideLayout from '../components/GuideLayout'
import { buildBreadcrumbJsonLd } from '../config/seo'
import AdUnit, { SLOTS } from '../components/AdUnit'

function FeatureSection({ title, jep, children }) {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold !mb-0">{title}</h2>
        {jep && <span className="bg-primary/10 text-primary text-[11px] font-bold px-2 py-1 rounded">JEP {jep}</span>}
      </div>
      <div className="space-y-8">
        {children}
      </div>
    </section>
  )
}

function SubSection({ title, children, type = "default" }) {
  const styles = {
    problem: "border-l-4 border-red-200 pl-6 py-1",
    solution: "border-l-4 border-primary pl-6 py-1",
    howItWorks: "bg-gray-50 dark:bg-[#0f1612] rounded-xl p-6 border border-gray-100 dark:border-gray-800",
    default: ""
  }

  return (
    <div className={styles[type] || styles.default}>
      <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${type === 'problem' ? 'text-red-700' : ''}`}>
        {type === 'problem' && <span>🔹 Problem</span>}
        {type === 'solution' && <span>✅ Solution</span>}
        {type === 'howItWorks' && <span>⚙️ How It Works</span>}
        {!['problem', 'solution', 'howItWorks'].includes(type) && title}
      </h3>
      <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {children}
      </div>
    </div>
  )
}

export default function Java26Features({ isEmbedded = false }) {
  const jsonLd = [
    buildBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Guides', url: '/guides' },
      { name: 'Java 26 New Features', url: '/guides/java-26-features' },
    ]),
  ]

  return (
    <GuideLayout
      title="Java 26 New Features — Practical Examples & Guide (2026)"
      description="Deep dive into Java 26 (JDK 26) new features. Learn about HTTP/3, Lazy Constants, and Structured Concurrency with real-world examples and internal concepts."
      keywords="Java 26, JDK 26 features, HTTP/3 Java, Lazy Constants, Structured Concurrency, Java 26 tutorial, G1 GC optimization"
      path="/guides/java-26-features"
      jsonLd={jsonLd}
      readTime="15 min read"
      isEmbedded={isEmbedded}
    >
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed italic">
        "Java 26 marks a turning point in the platform's performance story, bridging the gap between 
        network modernization and internal runtime efficiency."
      </p>

      <div className="space-y-4 mb-16">
        <p>
            The release of JDK 26 on March 17, 2026, brought ten JDK Enhancement Proposals (JEPs) 
            that solve long-standing friction points for developers. From the way we initialize 
            expensive objects to how we handle concurrent tasks, Java 26 is about making the language 
            more robust and the runtime faster.
        </p>
      </div>

      <FeatureSection title="HTTP/3 for the HTTP Client API" jep="517">
        <SubSection type="problem">
            Modern web applications suffer from "Head-of-Line Blocking" at the transport layer. 
            In HTTP/2, a single lost packet on a TCP connection stalls all streams, even if 
            the other packets arrived safely. This increases latency on mobile networks 
            and unstable connections.
        </SubSection>

        <SubSection type="solution">
            Java 26 adds native support for HTTP/3 to the <code>java.net.http.HttpClient</code>. 
            By using the UDP-based QUIC protocol, it enables independent streams where one lost packet 
            only affects its specific stream, not the entire connection.
        </SubSection>

        <SubSection type="howItWorks">
            The implementation is transparent and opt-in. When you specify <code>Version.HTTP_3</code>, 
            the client uses a QUIC transport. If the server doesn't support it or UDP is blocked by a 
            firewall, it gracefully downgrades to HTTP/2.
        </SubSection>

        <CodeBlock>{`import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

// 1. Create a client that prefers HTTP/3
try (HttpClient client = HttpClient.newBuilder()
        .version(HttpClient.Version.HTTP_3)
        .build()) {

    HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://openjdk.org"))
            .GET()
            .build();

    // 2. The client negotiates QUIC automatically
    HttpResponse<String> response = client.send(
        request, HttpResponse.BodyHandlers.ofString());

    System.out.println("Actual Protocol: " + response.version());
}`}</CodeBlock>
      </FeatureSection>

      <AdUnit slot={SLOTS.ARTICLE_MID} format="fluid" layout="in-article" />

      <FeatureSection title="Lazy Constants (Stable Values)" jep="526">
        <SubSection type="problem">
            Initializing expensive objects safely in a multi-threaded environment usually requires 
            "Holder Classes" or "Double-Checked Locking." These patterns are boilerplate-heavy 
            and, more importantly, the JVM cannot optimize the resulting fields as true constants 
            because they are not <code>static final</code> at initialization time.
        </SubSection>

        <SubSection type="solution">
            Introduces <code>java.lang.LazyConstant&lt;T&gt;</code>. It provides 
            a clean API for deferred, one-time initialization that is natively understood by the 
            JVM's JIT compiler.
        </SubSection>

        <SubSection type="howItWorks">
            Once a <code>LazyConstant</code> is computed, the JIT compiler 
            can perform "constant folding." This means it treats the value as if it were a 
            literal constant, potentially inlining it directly into machine code for maximum speed.
        </SubSection>

        <CodeBlock>{`import java.lang.LazyConstant;

public class AppConfig {
    // Defines an uninitialized constant
    private static final LazyConstant<DatabaseClient> DB = 
        LazyConstant.of(() -> new DatabaseClient("prod-url"));

    public void start() {
        // Initialization happens exactly once on the first .get()
        // Subsequent calls are as fast as reading a final field
        DB.get().connect();
    }
}`}</CodeBlock>
      </FeatureSection>

      <FeatureSection title="Structured Concurrency" jep="525">
        <SubSection type="problem">
            Unstructured concurrency (using <code>ExecutorService</code>) 
            leads to "orphaned threads." If a main task fails, its subtasks often keep running 
            blindly, wasting resources and making debugging a nightmare because stack traces 
            don't show the relationship between parent and child tasks.
        </SubSection>

        <SubSection type="solution">
            Java 26 refines <code>StructuredTaskScope</code> (6th Preview). 
            It treats groups of related tasks as a single unit. If the scope closes, 
            all subtasks are guaranteed to be terminated.
        </SubSection>

        <SubSection type="howItWorks">
            The scope creates a strict hierarchy. In Java 26, a new <code>onTimeout()</code> 
            callback was added, allowing custom joiners to handle partial results when a 
            time limit is reached, rather than just throwing an exception.
        </SubSection>

        <CodeBlock>{`import java.util.concurrent.StructuredTaskScope;

try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    // Fork subtasks
    var userTask = scope.fork(() -> fetchUser(id));
    var orderTask = scope.fork(() -> fetchOrders(id));

    scope.join();           // Wait for both
    scope.throwIfFailed();  // Propagate any error from subtasks

    // If one fails, the other is automatically cancelled
    return new Dashboard(userTask.get(), orderTask.get());
}`}</CodeBlock>
      </FeatureSection>

      <FeatureSection title="Primitive Types in Patterns" jep="530">
        <SubSection type="problem">
            Pattern matching in Java previously only worked with Reference types (Objects). 
            If you wanted to check if an <code>int</code> was actually a 
            <code>byte</code>, you had to manually cast and check 
            ranges, which is error-prone and verbose.
        </SubSection>

        <SubSection type="solution">
            Allows primitive types in <code>instanceof</code> and 
            <code>switch</code> patterns. It provides safe, 
            lossless conversion and binding in one step.
        </SubSection>

        <SubSection type="howItWorks">
            The compiler performs a "safe conversion" check. A pattern match only succeeds if the 
            source value can be converted to the target primitive type without losing any 
            information (no truncation).
        </SubSection>

        <CodeBlock>{`public void process(int value) {
    // Safe binding: only matches if value fits in a byte
    if (value instanceof byte b) {
        System.out.println("It's a small number: " + b);
    }

    // Switch on doubles and floats (new in Java 26!)
    double d = 42.0;
    switch (d) {
        case 0.0 -> System.out.println("Zero");
        case double val when val > 0 -> System.out.println("Positive");
        default -> System.out.println("Negative");
    }
}`}</CodeBlock>
      </FeatureSection>

      <FeatureSection title="G1 GC: Contention Reduction" jep="522">
        <SubSection type="problem">
            The G1 Garbage Collector used to suffer from synchronization contention between 
            application threads (performing writes) and GC threads (managing the card table). 
            On large, write-heavy heaps, this contention caused "jitter" and reduced total throughput.
        </SubSection>

        <SubSection type="solution">
            Introduces a "Dual Card Table" architecture. By separating the refinement and 
            application write tracking, the JVM significantly reduces the need for threads 
            to synchronize on the same memory addresses.
        </SubSection>

        <SubSection type="howItWorks">
            This is an internal architectural change. In x64 environments, the write barrier 
            instructions were reduced from ~50 to just 12, resulting in a 5-15% throughput 
            gain for write-intensive applications like large caches.
        </SubSection>

        <CodeBlock>{`// No code changes needed! Just run on JDK 26
// Throughput gains are automatic for G1
java -XX:+UseG1GC -Xmx16g -jar my-big-app.jar`}</CodeBlock>
      </FeatureSection>

      <section className="bg-gray-50 dark:bg-[#0f1612] rounded-2xl p-8 mb-16 border border-gray-100 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-4">Other notable removals and additions</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong className="text-gray-900 dark:text-white">PEM API (JEP 524):</strong> Finally, a standard way to read <code>.pem</code> certificates without BouncyCastle.</li>
            <li><strong className="text-gray-900 dark:text-white">Applet Removal (JEP 504):</strong> The <code>java.applet</code> package is officially gone.</li>
            <li><strong className="text-gray-900 dark:text-white">AOT for ZGC (JEP 516):</strong> Ahead-of-Time object caching now works with the low-latency ZGC.</li>
        </ul>
      </section>

      <AdUnit slot={SLOTS.ARTICLE_BOTTOM} format="auto" />

      <section className="mb-12 mt-16">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Related Guides</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { to: '/guides/java-home-explained', name: 'JAVA_HOME Explained', description: 'Why Maven and Gradle need JAVA_HOME separate from PATH, and how to set it correctly on Windows.' },
            { to: '/guides/windows-silent-install', name: 'Silent Install Guide', description: 'Automate JDK deployments using MSI, NSIS, and Inno Setup silent install flags.' },
            { to: '/guides/java', name: 'All Java Guides', description: 'Browse all Java conceptual tutorials and deep dives on this platform.' },
          ].map((rel) => (
            <Link
              key={rel.to}
              to={rel.to}
              className="group bg-white dark:bg-[#121a16] shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200 !no-underline"
            >
              <h3 className="text-gray-900 dark:text-white font-medium mb-1 flex items-center justify-between">
                {rel.name}
                <FiArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                {rel.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </GuideLayout>
  )
}
