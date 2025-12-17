import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import QuantumSidebarLeft from "@/components/navigation/QuantumSidebarLeft";
import QuantumTopBar from "@/components/navigation/QuantumTopBar";
import QuantumRightPanel from "@/components/navigation/QuantumRightPanel";
import IsabellaChat from "@/components/IsabellaChat";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";

interface QuantumLayoutProps {
  children: React.ReactNode;
}

export default function QuantumLayout({ children }: QuantumLayoutProps) {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [isabellaOpen, setIsabellaOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setLeftSidebarOpen(false);
        setRightPanelOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    if (isMobile) {
      setLeftSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const mainContentStyle = {
    marginLeft: leftSidebarOpen && !isMobile ? '280px' : '0',
    marginRight: rightPanelOpen && !isMobile ? '320px' : '0',
    transition: 'margin 0.3s ease-in-out',
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Top Bar - Always visible */}
      <QuantumTopBar 
        onMenuToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
        onRightPanelToggle={() => setRightPanelOpen(!rightPanelOpen)}
        leftSidebarOpen={leftSidebarOpen}
        rightPanelOpen={rightPanelOpen}
      />

      {/* Left Sidebar */}
      <AnimatePresence mode="wait">
        {leftSidebarOpen && (
          <>
            {/* Mobile overlay */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLeftSidebarOpen(false)}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              />
            )}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-50 lg:z-30"
            >
              <QuantumSidebarLeft onClose={() => setLeftSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Right Panel */}
      <AnimatePresence mode="wait">
        {rightPanelOpen && (
          <>
            {/* Mobile overlay */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setRightPanelOpen(false)}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              />
            )}
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-50 lg:z-30"
            >
              <QuantumRightPanel onClose={() => setRightPanelOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main 
        style={mainContentStyle}
        className="min-h-screen pt-16"
      >
        {children}
      </main>

      {/* Isabella AI Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <AnimatePresence>
          {isabellaOpen ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="mb-4"
            >
              <IsabellaChat onClose={() => setIsabellaOpen(false)} />
            </motion.div>
          ) : null}
        </AnimatePresence>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsabellaOpen(!isabellaOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-glow transition-all ${
            isabellaOpen 
              ? 'bg-destructive hover:bg-destructive/90' 
              : 'bg-gradient-quantum hover:opacity-90'
          }`}
        >
          {isabellaOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </motion.button>
      </motion.div>
    </div>
  );
}
