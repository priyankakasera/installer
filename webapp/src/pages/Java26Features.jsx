import { Link } from 'react-router-dom'
import { FiCalendar } from 'react-icons/fi'
import SEO from '../components/SEO'
import { buildBreadcrumbJsonLd } from '../config/seo'
import AdUnit, { SLOTS } from '../components/AdUnit'

function CodeBlock({ children }) {
  return (
    <pre className="bg-black/40 rounded-lg px-4 py-3 text-sm text-gray-300 overflow-x-auto font-mono whitespace-pre-wrap">
      {children}
    </pre>
  )
}

function FeatureSection({ title, overview, syntax, example, jep }) {
  return (
    <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold text-white">Feature: {title}</h2>
        {jep && <span className="bg-primary/10 text-primary-light text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded">JEP {jep}</span>}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-white font-medium flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
          Overview
        </h3>
        <p>{overview}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-white font-medium flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
          Syntax / Concept
        </h3>
        <p>{syntax}</p>
      </div>

      <div className="space-y-2 pt-2">
        <h3 className="text-white font-medium flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
          Example
        </h3>
        <CodeBlock>{example}</CodeBlock>
      </div>
    </section>
  )
}

export default function Java26Features() {
  const jsonLd = [
    buildBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Guides', url: '/guides' },
      { name: 'Java 26 New Features', url: '/guides/java-26-features' },
    ]),
  ]

  return (
    <>
      <SEO
        title="Java 26 New Features — Practical Examples & Guide (2026)"
        description="Explore the latest features in Java 26 (JDK 26), including HTTP/3 support, Lazy Constants, Structured Concurrency, and performance boosts for G1 GC."
        keywords="Java 26, JDK 26 features, HTTP/3 Java, Lazy Constants, Structured Concurrency, Java 26 tutorial, G1 GC optimization"
        path="/guides/java-26-features"
        jsonLd={jsonLd}
      />

      <article className="pt-20 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <header className="mb-12">
            <nav className="text-sm text-gray-500 mb-4">
              <Link to="/" className="hover:text-gray-300">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/guides" className="hover:text-gray-300">Guides</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-400">Java 26 Features</span>
            </nav>
            <span className="section-label mb-4 inline-flex">Latest Release</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 mt-4">
              Java 26 New Features with Practical Examples
            </h1>
            <p className="text-lg text-gray-400">
              Java 26, released on March 17, 2026, focuses on Network Modernization, Performance Efficiency, 
              and Developer Productivity. Discover the 10 key JEPs shaping the future of Java.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
              <span>
                Written by{' '}
                <Link to="/authors/vishalhulawale" className="text-primary-light hover:underline font-medium">
                  Vishal Hulawale
                </Link>
              </span>
              <span className="flex items-center gap-1.5">
                <FiCalendar className="w-3.5 h-3.5" />
                Published: April 2026
              </span>
            </div>
          </header>

          <div className="space-y-10">

            {/* Intro section */}
            <section className="text-gray-400 text-sm leading-relaxed space-y-4">
              <h2 className="text-xl font-semibold text-white">Introduction</h2>
              <p>
                Java 26 continues the rapid evolution of the platform. While it is a non-LTS release, 
                it packs significant improvements across the board. Whether you are optimizing cloud-native 
                microservices with HTTP/3 or simplifying object initialization with Lazy Constants, 
                this guide covers what you need to know.
              </p>
            </section>

            <FeatureSection 
              title="HTTP/3 for the HTTP Client API"
              jep="517"
              overview="Native support for HTTP/3 (QUIC) in the standard HttpClient."
              syntax="Integrated into the HttpClient.Version enum. Automatically falls back to HTTP/2 if needed."
              example={`import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

try (HttpClient client = HttpClient.newBuilder()
        .version(HttpClient.Version.HTTP_3)
        .build()) {

    HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://openjdk.org"))
            .GET()
            .build();

    HttpResponse<String> response = client.send(
        request, HttpResponse.BodyHandlers.ofString());

    System.out.println("Protocol: " + response.version());
}`}
            />

            <FeatureSection 
              title="Lazy Constants"
              jep="526"
              overview="A thread-safe, high-performance mechanism for deferred, one-time initialization."
              syntax="Uses java.lang.LazyConstant<T>. The JVM treats initialized values as true constants for optimization."
              example={`import java.lang.LazyConstant;

private static final LazyConstant<String> DB_TOKEN = 
    LazyConstant.of(() -> fetchTokenFromVault());

public void connect() {
    // Initialized on first access
    String token = DB_TOKEN.get();
}`}
            />

            <FeatureSection 
              title="Structured Concurrency"
              jep="525"
              overview="Treats groups of related tasks as a single unit of work (6th Preview)."
              syntax="Refined StructuredTaskScope with better timeout handling and custom joiners."
              example={`import java.util.concurrent.StructuredTaskScope;

try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    var subtask = scope.fork(() -> fetchData());
    scope.join();
    scope.throwIfFailed();
    System.out.println(subtask.get());
}`}
            />

            <FeatureSection 
              title="Primitive Types in Patterns"
              jep="530"
              overview="Extends pattern matching to primitive types in instanceof and switch (4th Preview)."
              syntax="Allows safe checks and binding for types like int, double, and byte without lossy casts."
              example={`if (value instanceof byte b) {
    System.out.println("Fits in byte: " + b);
}

switch (doubleValue) {
    case 0.0 -> System.out.println("Zero");
    case double d when d > 0 -> System.out.println("Positive");
    default -> System.out.println("Negative");
}`}
            />

            <AdUnit slot={SLOTS.ARTICLE_MID} format="fluid" layout="in-article" />

            <FeatureSection 
              title="PEM Encodings"
              jep="524"
              overview="Standard API for encoding and decoding cryptographic objects in PEM format."
              syntax="Introduces PEMEncoder and PEMDecoder in java.security package."
              example={`import java.security.PEMEncoder;

String pem = PEMEncoder.of().encodeToString(myCertificate);
System.out.println(pem); 
// -----BEGIN CERTIFICATE----- ...`}
            />

            <FeatureSection 
              title="G1 GC Improvements"
              jep="522"
              overview="Reduces synchronization overhead between application and GC threads."
              syntax="Internal JVM optimization. No code changes required. Significant for write-heavy workloads."
              example={`// Active by default in JDK 26
java -XX:+UseG1GC -jar app.jar`}
            />

            <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-white">Other Notable Changes</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-gray-300">JEP 516:</strong> AOT Object Caching now works with ZGC.</li>
                <li><strong className="text-gray-300">JEP 500:</strong> Warnings when mutating <code className="text-xs bg-white/5 px-1 py-0.5 rounded">final</code> fields via reflection.</li>
                <li><strong className="text-gray-300">JEP 529:</strong> Vector API (11th Incubator).</li>
                <li><strong className="text-gray-300">JEP 504:</strong> Official removal of the obsolete Applet API.</li>
              </ul>
            </section>

            <AdUnit slot={SLOTS.ARTICLE_BOTTOM} format="auto" />

            <section>
              <h2 className="text-lg font-semibold text-white mb-4">Related Guides</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { to: '/guides/java-home-explained', label: 'JAVA_HOME Explained', desc: 'Set up your environment correctly.' },
                  { to: '/guides/windows-path-explained', label: 'Windows PATH Guide', desc: 'Master environment variables.' },
                  { to: '/guides/windows-silent-install', label: 'Silent Install Guide', desc: 'Automate your installations.' },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="group bg-dark-card border border-dark-border rounded-xl p-5 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <p className="text-white text-sm font-medium mb-1">{link.label}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{link.desc}</p>
                  </Link>
                ))}
              </div>
            </section>

            <Link
              to="/guides"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-light transition-colors"
            >
              ← Back to All Guides
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
