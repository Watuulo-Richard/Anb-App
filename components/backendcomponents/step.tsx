import { useFormStore } from "@/store/useFormStore"
import { motion } from "framer-motion"

export function ProgressSteps() {
  const step = useFormStore((state) => state.step)

  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {[1, 2, 3, 4].map((number) => (
          <div key={number} className="flex items-center">
            <div className="relative">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= number ? "bg-primary text-primary-foreground" : "bg-gray-200"
                }`}
                animate={{
                  scale: step === number ? 1.2 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {number}
              </motion.div>
              {number < 4 && (
                <div
                  className={`absolute top-1/2 -translate-y-1/2 left-full w-8 h-0.5 ${
                    step > number ? "bg-primary" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

