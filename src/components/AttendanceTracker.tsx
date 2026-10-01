import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, BarChart3, Plus, Minus, RotateCcw, Star } from "lucide-react"

function AttendanceTracker() {
  const [studentName, setStudentName] = useState("")
  const [attendance, setAttendance] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  function decreaseAttendance() {
    if (attendance > 0) setAttendance(attendance - 1)
  }

  function resetAttendance() {
    setAttendance(0)
  }

  useEffect(() => {
    document.title = `Attendance: ${attendance}`
  }, [attendance])

  function focusStudentName() {
    inputRef.current?.focus()
  }

  function getAttendanceMessage() {
    if (attendance === 0) return "No Attendance Recorded"
    else if (attendance < 5) return "Attendance In Progress"
    else return "Good Attendance ⭐"
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-slate-100">
      {/* ✅ Card entry animation */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="w-full shadow-2xl border-0 overflow-hidden">
          <CardHeader>
            {/* ✅ Title slide-in animation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold text-indigo-700">
                <BookOpen className="h-6 w-6" />
                Student Attendance Tracker
              </CardTitle>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* ✅ Input fade-in */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Input
                ref={inputRef}
                placeholder="Enter Student Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="border-slate-300 focus-visible:ring-indigo-500"
              />
            </motion.div>

            {/* ✅ Focus Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex justify-end"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={focusStudentName}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Focus Student Name
                </Button>
              </motion.div>
            </motion.div>

            {/* ✅ Attendance Counter with Number Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center space-y-1"
            >
              <h2 className="flex items-center justify-center gap-2 text-4xl font-bold text-indigo-700">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
                >
                  <BarChart3 className="h-8 w-8" />
                </motion.div>
                Attendance:{" "}
                {/* ✅ AnimatePresence - jab number change ho toh slide ho */}
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={attendance}
                    initial={{ y: -30, opacity: 0, scale: 0.5 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 30, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                    className="inline-block min-w-[40px]"
                  >
                    {attendance}
                  </motion.span>
                </AnimatePresence>
              </h2>

              {/* ✅ Status message with fade animation */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={getAttendanceMessage()}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm font-medium text-slate-500 italic flex items-center justify-center gap-1"
                >
                  {attendance >= 5 && <Star className="h-3 w-3 text-yellow-500" />}
                  {getAttendanceMessage()}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* ✅ Action Buttons with stagger animation */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } },
              }}
              className="flex flex-wrap gap-3 justify-center w-full pt-2"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setAttendance(attendance + 1)}
                  className="bg-emerald-600 hover:bg-emerald-700 gap-1"
                >
                  <Plus className="h-4 w-4" /> Present
                </Button>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={attendance > 0 ? { scale: 1.05 } : {}}
                whileTap={attendance > 0 ? { scale: 0.95 } : {}}
              >
                <Button
                  onClick={decreaseAttendance}
                  disabled={attendance === 0}
                  className="bg-rose-500 hover:bg-rose-700 gap-1"
                >
                  <Minus className="h-4 w-4" /> Remove
                </Button>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={attendance > 0 ? { scale: 1.05 } : {}}
                whileTap={attendance > 0 ? { scale: 0.95 } : {}}
              >
                <Button
                  onClick={resetAttendance}
                  disabled={attendance === 0}
                  className="bg-amber-500 hover:bg-amber-600 gap-1"
                >
                  <RotateCcw className="h-4 w-4" /> Reset
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default AttendanceTracker