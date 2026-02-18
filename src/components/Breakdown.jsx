import { useEffect, useRef, useMemo, useState } from "react";
import { useSlider } from "../context/SliderContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Search,
  Target,
  Lightbulb,
  Palette,
  TestTube,
  RefreshCw,
  ChevronDown,
  Users,
  FileText,
  BarChart,
  TrendingUp
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Breakdown = () => {
  const sectionRef = useRef(null);
  const navRef = useRef(null);
  const navWrapperRef = useRef(null);
  const phaseRefs = useRef([]);
  const { hue, saturation, brightness } = useSlider();
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [activePhase, setActivePhase] = useState("research");
  const [isNavSticky, setIsNavSticky] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const impactSectionRef = useRef(null);

  const textColor = useMemo(() => {
    let lightness = brightness;
    if (lightness > 60) lightness = lightness - 20;
    if (lightness < 30) lightness = lightness + 10;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }, [hue, brightness, saturation]);

  const phases = [
    {
      id: "research",
      icon: Search,
      title: "Research",
      tagline: "Understanding users & context",
      methods: [
        "User Interviews (15+ participants)",
        "Competitive Analysis",
        "Analytics & Heatmap Review",
        "Stakeholder Workshops"
      ],
      deliverables: [
        "User Personas (3 primary)",
        "Research Insights Report",
        "Current Journey Maps",
        "Empathy Maps"
      ],
      keyFindings: [
        "68% cart abandonment at payment step",
        "Users needed one-handed mobile navigation",
        "Trust signals critical at checkout decision points"
      ],
      metrics: { duration: "2 weeks", participants: "15 users", sessions: "24" }
    },
    {
      id: "define",
      icon: Target,
      title: "Define",
      tagline: "Synthesizing problems & opportunities",
      methods: [
        "Problem Statement Creation",
        "User Journey Mapping",
        "Information Architecture",
        "How Might We Sessions",
        "Feature Prioritization"
      ],
      deliverables: [
        "Problem Statements",
        "Prioritized Journey Maps",
        "IA Diagrams",
        "Requirements Documentation"
      ],
      keyFindings: [
        "Primary pain point: Payment trust issues",
        "Secondary: Unclear shipping costs",
        "Mobile-first approach required (72% of traffic)"
      ],
      metrics: { duration: "1 week", workshops: "3", stakeholders: "8" }
    },
    {
      id: "ideate",
      icon: Lightbulb,
      title: "Ideate",
      tagline: "Exploring creative solutions",
      methods: [
        "Design Studio Sessions",
        "Crazy 8s Sketching",
        "Wireframe Variations",
        "Concept Testing",
        "Dot Voting Prioritization"
      ],
      deliverables: [
        "Concept Sketches (45+)",
        "Wireframes (12 variants)",
        "User Flow Diagrams",
        "Feature Impact Matrix"
      ],
      keyFindings: [
        "Single-page checkout increased completion by 40%",
        "Progressive disclosure reduced cognitive load",
        "Trust badges at each step boosted confidence"
      ],
      metrics: { duration: "1.5 weeks", concepts: "8", iterations: "3" }
    },
    {
      id: "design",
      icon: Palette,
      title: "Design",
      tagline: "Crafting high-fidelity experiences",
      methods: [
        "Visual Design System Creation",
        "High-Fidelity Mockups",
        "Interactive Prototyping",
        "Accessibility Review (WCAG AA)",
        "Design QA & Handoff"
      ],
      deliverables: [
        "Component Design System",
        "Hi-Fi Screens (24+ responsive)",
        "Interactive Prototype",
        "Design Specifications"
      ],
      keyFindings: [
        "Custom illustrations increased brand trust by 25%",
        "Micro-animations guided user attention effectively",
        "Dark mode preferred by 43% of users"
      ],
      metrics: { duration: "3 weeks", screens: "24", components: "32" }
    },
    {
      id: "test",
      icon: TestTube,
      title: "Test",
      tagline: "Validating with real users",
      methods: [
        "Moderated Usability Testing",
        "A/B Testing",
        "Accessibility Audits",
        "Performance Testing",
        "Analytics Implementation"
      ],
      deliverables: [
        "Test Results Report",
        "Heatmaps & Session Recordings",
        "Accessibility Compliance Report",
        "Optimization Recommendations"
      ],
      keyFindings: [
        "Task completion rate: 92% (vs 54% baseline)",
        "Time-to-checkout reduced by 35%",
        "User satisfaction score: 4.6/5"
      ],
      metrics: {
        duration: "2 weeks",
        participants: "18 users",
        tests: "5 rounds"
      }
    },
    {
      id: "iterate",
      icon: RefreshCw,
      title: "Iterate",
      tagline: "Continuous improvement",
      methods: [
        "Post-Launch Analytics Monitoring",
        "User Feedback Collection",
        "Optimization Sprints",
        "Feature Enhancement",
        "Performance Optimization"
      ],
      deliverables: [
        "Analytics Dashboard",
        "Monthly Feedback Reports",
        "Optimization Backlog",
        "Success Metrics Tracking"
      ],
      keyFindings: [
        "Conversion rate increased by 30%",
        "Revenue impact: +$120K per month",
        "Mobile completion rate up 62%"
      ],
      metrics: { duration: "Ongoing", improvements: "12+", uplift: "+47%" }
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray(".ux-line");
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 70%",
              end: "top 30%",
              scrub: 1
            }
          }
        );
      });

      const observerOptions = {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0
      };

      const observer = new IntersectionObserver((entries) => {
        if (isScrolling) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = phaseRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setActivePhase(phases[index].id);
            }
          }
        });
      }, observerOptions);

      phaseRefs.current.forEach((ref) => {
        if (ref) {
          observer.observe(ref);
        }
      });

      if (navWrapperRef.current && phaseRefs.current.length > 0) {
        const navWrapper = navWrapperRef.current;
        const lastPhase = phaseRefs.current[phaseRefs.current.length - 1];

        ScrollTrigger.create({
          trigger: navWrapper,
          start: "top top",
          endTrigger: lastPhase,
          end: "bottom top-=50",
          onEnter: () => setIsNavSticky(true),
          onLeave: () => setIsNavSticky(false),
          onLeaveBack: () => setIsNavSticky(false),
          onEnterBack: () => setIsNavSticky(true)
        });
      }

      if (impactSectionRef.current) {
        ScrollTrigger.create({
          trigger: impactSectionRef.current,
          start: "top 70%",
          onEnter: () => setIsNavVisible(false),
          onLeaveBack: () => setIsNavVisible(true)
        });
      }

      return () => observer.disconnect();
    }, sectionRef);

    return () => ctx.revert();
  }, [isScrolling]);

  const togglePhase = (phaseId) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
    ScrollTrigger.refresh();
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);
  };

  const scrollToPhase = (phaseId) => {
    setIsScrolling(true);
    setActivePhase(phaseId);

    const index = phases.findIndex((p) => p.id === phaseId);
    const element = phaseRefs.current[index];

    if (element) {
      const navHeight = navRef.current?.offsetHeight || 0;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight - 30;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });

      setTimeout(() => {
        setIsScrolling(false);
        ScrollTrigger.refresh();
      }, 800);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex h-auto items-start justify-start bg-white text-black"
    >
      <div className="z-10 w-full pb-18 pt-24 px-2 text-2xl font-light leading-relaxed sm:text-3xl lg:text-4xl">
        <div className="headline">
          <div className="p-9 ux-line font-bold font-fancy text-black text-[14vw] sm:text-[5.2vw] h-auto leading-[10vh]">
            Let's unpack this project..
          </div>
          <div
            className="w-[40%] ux-line h-2 ml-[20%] rounded-full panel-underline"
            style={{ background: textColor }}
          ></div>

          <div className="ux-line pl-8 pt-8 pb-[9rem] mb-8">
            <p className="text-[5vw] sm:text-[1.8vw] text-black/80 max-w-3xl">
              A comprehensive walkthrough of the complete UX lifecycle process
              from initial research to continuous iteration, showcasing
              methodologies, deliverables, and measurable impact.
            </p>
          </div>
        </div>

        <div ref={navWrapperRef} className="nav-wrapper mb-12">
          {isNavSticky && (
            <div style={{ height: navRef.current?.offsetHeight || 80 }} />
          )}
          <div
            ref={navRef}
            className="z-50 py-6 transition-all duration-300"
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              background: "rgba(255, 255, 255, 0.85)",
              opacity: isNavVisible ? 1 : 0,
              pointerEvents: isNavVisible ? "auto" : "none",
              position: isNavSticky ? "fixed" : "relative",
              top: isNavSticky ? 0 : "auto",
              left: 0,
              right: 0,
              width: "75%"
            }}
          >
            <div className="flex gap-[1%] px-8 justify-start">
              {phases.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => scrollToPhase(phase.id)}
                  disabled={activePhase === phase.id}
                  className="flex items-center justify-center gap-2 py-3 rounded-full border-2 transition-all duration-300 hover:scale-105 disabled:!cursor-pointer disabled:scale-100 disabled:hover:scale-100 disabled:hover:!cursor-pointer whitespace-nowrap"
                  style={{
                    borderColor: textColor,
                    background:
                      activePhase === phase.id ? textColor : "transparent",
                    color: activePhase === phase.id ? "#fff" : "#000",
                    flex: "1 1 0",
                    minWidth: "0",
                    padding: "0.55rem clamp(0.3rem, 1.2vw, 1.2rem)",
                    fontSize: "clamp(0.75rem, 1.2vw, 1.125rem)",
                    ...(activePhase === phase.id
                      ? { cursor: "pointer !important" }
                      : {})
                  }}
                >
                  <phase.icon size={20} style={{ flexShrink: 0 }} />
                  <span className="font-semibold overflow-hidden text-ellipsis">
                    {phase.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap w-full p-2">
          {phases.map((phase, index) => (
            <div
              key={phase.id}
              ref={(el) => (phaseRefs.current[index] = el)}
              className="ux-line w-full mb-12"
            >
              <div
                className="relative w-full p-8 cursor-pointer group"
                onClick={() => togglePhase(phase.id)}
              >
                <div className="mb-4 flex items-center text-[3vw] font-normal text-black">
                  <span className="mx-4">
                    <phase.icon size={30} />
                  </span>
                  <div>
                    <h4 className="text-black panel-title text-4xl sm:text-5xl font-fancy font-bold">
                      {phase.title}
                    </h4>
                    <p className="text-[4vw] sm:text-[1.4vw] text-black/60 mt-2">
                      {phase.tagline}
                    </p>
                  </div>
                </div>

                <div
                  className="w-full sm:w-[80%] h-2 rounded-full panel-underline"
                  style={{ background: textColor }}
                ></div>

                <div className="flex items-center gap-6 mt-6 w-full sm:w-[80%] text-[4vw] sm:text-[1.2vw]">
                  <div className="flex flex-wrap items-center gap-6 flex-1">
                    {Object.entries(phase.metrics).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2">
                        <BarChart size={16} style={{ color: textColor }} />
                        <span className="font-semibold capitalize">
                          {key.replace("_", " ")}:
                        </span>
                        <span className="text-black/70">{value}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePhase(phase.id);
                    }}
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:brightness-110 active:scale-90"
                    style={{ background: textColor }}
                  >
                    <ChevronDown
                      size={20}
                      color="white"
                      className={`transition-transform duration-300 ${expandedPhase === phase.id ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  expandedPhase === phase.id
                    ? "max-h-[2000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-wrap w-full">
                  <div className="relative w-full sm:w-[50%] p-8">
                    <div className="mb-4 flex items-center">
                      <FileText
                        size={24}
                        style={{ color: textColor }}
                        className="mr-3"
                      />
                      <h5 className="text-2xl sm:text-3xl font-bold">
                        Methods Used
                      </h5>
                    </div>
                    <ul className="list-none mt-6 text-[5vw] sm:text-[1.4vw] space-y-4">
                      {phase.methods.map((method, i) => (
                        <li key={i} className="flex items-start">
                          <span
                            className="mr-3 mt-1"
                            style={{ color: textColor }}
                          >
                            ▸
                          </span>
                          <span>{method}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative w-full sm:w-[50%] p-8">
                    <div className="mb-4 flex items-center">
                      <TrendingUp
                        size={24}
                        style={{ color: textColor }}
                        className="mr-3"
                      />
                      <h5 className="text-2xl sm:text-3xl font-bold">
                        Deliverables
                      </h5>
                    </div>
                    <ul className="list-none mt-6 text-[5vw] sm:text-[1.4vw] space-y-4">
                      {phase.deliverables.map((deliverable, i) => (
                        <li key={i} className="flex items-start">
                          <span
                            className="mr-3 mt-1"
                            style={{ color: textColor }}
                          >
                            ✓
                          </span>
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative w-full p-8 mt-4">
                    <div
                      className="p-8 rounded-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${textColor}15, ${textColor}05)`,
                        border: `2px solid ${textColor}30`
                      }}
                    >
                      <div className="mb-6 flex items-center">
                        <Users
                          size={24}
                          style={{ color: textColor }}
                          className="mr-3"
                        />
                        <h5 className="text-2xl sm:text-3xl font-bold">
                          Key Findings & Impact
                        </h5>
                      </div>
                      <ul className="list-none text-[5vw] sm:text-[1.6vw] space-y-5">
                        {phase.keyFindings.map((finding, i) => (
                          <li key={i} className="flex items-start">
                            <span
                              className="mr-4 mt-1 font-bold text-xl"
                              style={{ color: textColor }}
                            >
                              {i + 1}.
                            </span>
                            <span className="font-medium">{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={impactSectionRef}
          className="ux-line w-[90vw] pt-8 pl-8 pb-[19rem] mt-12"
        >
          <div
            className="p-12 rounded-3xl"
            style={{
              background: `linear-gradient(135deg, ${textColor}20, ${textColor}10)`,
              border: `3px solid ${textColor}`
            }}
          >
            <h3 className="text-4xl sm:text-5xl text-black font-fancy font-bold mb-8">
              Overall Project Impact
            </h3>
            <div className="flex flex-wrap gap-8">
              <div className="flex-1 min-w-[250px]">
                <div
                  className="text-5xl sm:text-6xl font-bold mb-2"
                  style={{ color: textColor }}
                >
                  +30%
                </div>
                <p className="text-[4vw] sm:text-[1.4vw] text-black/70">
                  Conversion Rate Increase
                </p>
              </div>
              <div className="flex-1 min-w-[250px]">
                <div
                  className="text-5xl sm:text-6xl font-bold mb-2"
                  style={{ color: textColor }}
                >
                  +$120K
                </div>
                <p className="text-[4vw] sm:text-[1.4vw] text-black/70">
                  Monthly Revenue Impact
                </p>
              </div>
              <div className="flex-1 min-w-[250px]">
                <div
                  className="text-5xl sm:text-6xl font-bold mb-2"
                  style={{ color: textColor }}
                >
                  92%
                </div>
                <p className="text-[4vw] sm:text-[1.4vw] text-black/70">
                  Task Completion Rate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breakdown;
