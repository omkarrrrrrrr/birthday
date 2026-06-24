import { motion } from 'framer-motion';

export function FinalScene() {
  return (
    <section className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-black to-black" />
      
      {/* Floating background hearts */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary opacity-20"
          initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
          animate={{ 
            y: "-100vh", 
            x: Math.random() * window.innerWidth,
            rotate: 360
          }}
          transition={{ 
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ fontSize: `${Math.random() * 40 + 20}px` }}
        >
          ❤️
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        className="z-10 text-center"
      >
        <h2 className="font-serif text-6xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary text-glow mb-8">
          To Infinity &<br/>Beyond ❤️
        </h2>
        <motion.p 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/50 tracking-[0.5em] uppercase text-sm"
        >
          FOREVER YOURS
        </motion.p>
      </motion.div>
    </section>
  );
}
