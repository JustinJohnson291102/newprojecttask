import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface StatItem {
  value: number;
  label: string;
  suffix?: string;
}

const stats: StatItem[] = [
  { value: 80000, label: "Enrolled Students", suffix: "K+" },
  { value: 80, label: "Live Courses", suffix: "+" },
  { value: 80, label: "Best Trainers", suffix: "+" },
];

function Counter({
  value,
  suffix = "",
  duration = 2000,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [elementRef, isVisible] = useIntersectionObserver();

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeOutQuart * value);

      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, value, duration]);

  const formatValue = (val: number) => {
    if (suffix === "K+") {
      return Math.floor(val / 1000) + "K+";
    }
    return val + suffix;
  };

  return (
    <span ref={elementRef} className="counter">
      {formatValue(count)}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section
      className="py-16 stats-section text-black"
      data-testid="stats-counter"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="space-y-2"
              data-testid={`stat-${index}`}
            >
              <div className="text-5xl font-bold mb-2">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  duration={2000 + index * 200}
                />
              </div>
              <p
                className="text-xl text-black opacity-90"
                data-testid={`stat-label-${index}`}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
