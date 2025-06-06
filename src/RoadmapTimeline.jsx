
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const phases = [
{
    id: 1,
    phase: "PHASE 1:",
    title: "Foundation\n& Infrastructure",
    image: "/1.png",
    header: "Design Tools",
    descriptions: [
    "Establish core platform functionality and improve basic engineering.",
    "Introduce security, plagiarism detection, fact-checking, and translation tools.",
    "Conduct user acceptance testing and optimize existing infrastructure.",
    ],
},
{
    id: 2,
    phase: "PHASE 2:",
    title: "Content Creation\nSuite",
    image: "/2.png",
    header: "Content Creation Tools",
    descriptions: [
    "Introduce AI-powered tools for various media types (memes, podcasts and more).",
    "Develop multimedia bot builder for multiple platforms and applications.",
    "Implement AI-assisted blog creation tool with image generation.",
    ],
},
{
    id: 3,
    phase: "PHASE 3:",
    title: "Pro Features\n& Monetization",
    image: "/3.png",
    header: "Advanced Features",
    descriptions: [
    "Utilize AI-powered development tools to enhance efficiency and streamline workflows.",
    "Introduce security, plagiarism detection, fact-checking, and translation tools.",
    "Develop monetization strategies and successfully launch marketplace.",
    ],
},
{
    id: 4,
    phase: "PHASE 4:",
    title: "Website\n& Marketing Toolkit",
    image: "/4.png",
    header: "Marketing Tools",
    descriptions: [
    "Deploy AI-powered website tools and crypto-oriented APIs & introduce AI-driven marketing tools suite.",
    "Create presentation and crypto-oriented document generators.",
    "Provide customizable presentation and website templates.",
    ],
},
{
    id: 5,
    phase: "PHASE 5:",
    title: "Market Growth\n& Partnerships",
    image: "/5.png",
    header: "Growth & Expansion",
    descriptions: [
    "Launch portfolio showcase and talent hiring platforms.",
    "Extend marketplace offerings and focus on continuous improvement.",
    ],
},
{
    id: 6,
    phase: "PHASE 6:",
    title: "Global Impact\n& Innovation",
    image: "/6.png",
    header: "Global Reach",
    descriptions: [
    "Pursue strategic acquisitions for enhancing the innovation ecosystem.",
    "Implement initiatives for social impact and sustainability goals.",
    ],
},
];


export default function RoadmapTimeline() {
const containerRef = useRef(null);
const [activePhase, setActivePhase] = useState(0);

useEffect(() => {
    const onScroll = () => {
    const element = containerRef.current;
    if (element) {
        const scrollTop = window.scrollY;
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const screenHeight = window.innerHeight;

        // Calculate the visible range of the element
        const elementBottom = elementTop + elementHeight;
        const scrollPosition = scrollTop + screenHeight * 0.3; // Using 30% from top as trigger point

        // Only activate when we're within the element's bounds
        if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
        // Calculate progress from 0 to 1
        const progress = (scrollPosition - elementTop) / elementHeight;

        // Map to phases (0 to phases.length - 1)
        const phaseCount = phases.length + 1;
        let newPhase = Math.floor(progress * phaseCount);
        newPhase = Math.min(phaseCount - 1, Math.max(0, newPhase));

        if (newPhase !== activePhase) {
            setActivePhase(newPhase);
        }
        } else if (scrollPosition < elementTop && activePhase !== 0) {
        // If we're above the element, force phase 1
        setActivePhase(0);
        } else if (
        scrollPosition > elementBottom &&
        activePhase !== phases.length - 1
        ) {
        // If we're below the element, force last phase
        setActivePhase(phases.length - 1);
        }
    }
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // Initialize phase

    return () => window.removeEventListener("scroll", onScroll);
}, [activePhase]);

// Animation variants
const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
    opacity: 1,
    y: 0,
    transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
    },
    },
    exit: { opacity: 0, y: -10 },
};

const dotVariants = {
    initial: { scale: 1 },
    active: {
    scale: [1, 1.2, 1],
    transition: { duration: 0.4 },
    },
};

const progressBarVariants = {
    initial: { height: 0 },
    animate: {
    height: `${(activePhase / (phases.length - 1)) * 100}%`,
    transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
    },
    },
};

return (
    <div ref={containerRef} className="min-h-[300vh] bg-gray-50">
    <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-[#1C1C1C]">
        <div className="max-w-5xl mx-auto w-full">
        {/* Heading Section with animation */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center font-jakarta"
        >
            <h3 className="text-sm font-medium tracking-widest text-[#A58BFF] uppercase mb-3">
            Product Roadmap
            </h3>
            <h2 className="text-3xl md:text-3xl font-semibold text-white leading-snug mb-20">
            Engineering Updates &<br />
            Development Phase
            </h2>
        </motion.div>

        <div className="flex items-center gap-8">
            {/* Left Timeline */}
            <div className="flex flex-col items-center relative h-full">
            {/* Thicker vertical line background (full height) */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[4px] h-full bg-[#2C2C2C] z-0" />

            {/* Filled portion till activePhase with animation */}
            <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[4px] bg-[#8b5cf6] z-10"
                variants={progressBarVariants}
                initial="initial"
                animate="animate"
            />

            <div className="flex flex-col space-y-[44px] relative z-20">
                {phases.map((_, index) => (
                <motion.div
                    key={index}
                    className="flex items-center justify-center"
                    variants={dotVariants}
                    initial="initial"
                    animate={index === activePhase ? "active" : "initial"}
                >
                    {index < activePhase ? (
                    // Completed phase: small purple dot
                    <motion.div
                        className="w-3 h-3 bg-[#8b5cf6] rounded-full shadow-sm"
                        whileHover={{ scale: 1.2 }}
                    />
                    ) : index === activePhase ? (
                    // Current phase: large purple circle with number
                    <motion.div
                        className="w-8 h-8 bg-[#8b5cf6] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                        whileHover={{ scale: 1.05 }}
                    >
                        {index + 1}
                    </motion.div>
                    ) : (
                    // Future phase: small gray dot
                    <div className="w-3 h-3 bg-[#2C2C2C] rounded-full" />
                    )}
                </motion.div>
                ))}
            </div>
            </div>

            {/* Cards with AnimatePresence for smooth transitions */}
            <div className="flex gap-4 flex-1">
            {/* Left card */}
            <AnimatePresence mode="wait">
                <motion.div
                key={`left-${activePhase}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-[#846CEC] max-w-[18vw] rounded-2xl p-3 flex-1 min-h-[320px] max-h-[320px] shadow-md flex flex-col overflow-hidden relative"
                >
                {/* Text content */}
                <div className="p-6 px-8 z-10">
                    <motion.div
                    className="text-white/70 text-sm font-medium mb-1 tracking-wide uppercase"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    >
                    {phases[activePhase]?.phase ||
                        "Phase " + (activePhase + 1)}
                    </motion.div>
                    <motion.h3
                    className="text-white text-xl font-semibold mb-3 leading-snug whitespace-pre-line"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    >
                    {phases[activePhase]?.title ||
                        `Phase ${activePhase + 1} Title`}
                    </motion.h3>
                </div>

                {/* Image with animation */}
                <motion.img
                    src={
                    phases[activePhase]?.image ||
                    "/placeholder.svg?height=120&width=160"
                    }
                    alt={`${
                    phases[activePhase]?.title || `Phase ${activePhase + 1}`
                    } illustration`}
                    className="absolute top-1/2 left-0 w-full h-[60%] object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                />
                </motion.div>
            </AnimatePresence>

            {/* Right card */}
            <AnimatePresence mode="wait">
                <motion.div
                key={`right-${activePhase}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-[#202020] rounded-2xl flex-1 shadow-sm min-h-[180px] flex flex-col"
                >
                <motion.h4
                    className="text-white text-xl font-semibold py-6 px-6 border-b border-[#333333]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {phases[activePhase]?.header ||
                    `Phase ${activePhase + 1} Details`}
                </motion.h4>

                <div className="flex flex-col h-full justify-between">
                    {(
                    phases[activePhase]?.descriptions || [
                        `Description for phase ${activePhase + 1}`,
                    ]
                    ).map((desc, index, array) => (
                    <motion.div
                        key={`${activePhase}-${index}`}
                        className={`flex-1 py-2 ${
                        index !== array.length - 1
                            ? "border-b border-[#333333]"
                            : ""
                        }`}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                    >
                        <p className="text-[#868E8B] text-md leading-normal h-full flex items-center px-6">
                        {desc}
                        </p>
                    </motion.div>
                    ))}
                </div>
                </motion.div>
            </AnimatePresence>
            </div>
        </div>

        {/* Added Read Whitepaper button at the bottom */}
        <div className="mt-8 pt-8 text-center">
            <button className="group bg-[#8b5cf6] hover:bg-[#7c4dff] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center gap-2">
            Read Whitepaper
            <ArrowUpRight className="w-4 h-4 transform transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
            </button>
        </div>
        </div>
    </div>
    </div>
);
}






