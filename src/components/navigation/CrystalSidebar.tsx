import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, Users, Radio, ShoppingBag, GraduationCap, 
  Wallet, Settings, HelpCircle, ChevronLeft,
  Sparkles, Gamepad2, Music, Gift, TrendingUp,
  BookOpen, Zap, Heart, Star, Crown, Shield,
  MessageSquare, Image, FileText, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: number;
  premium?: boolean;
}

interface NavSection {
  id: string;
  label: string;
  icon: React.ElementType;
  items: NavItem[];
}

const sections: NavSection[] = [
  {
    id: "main",
    label: "Principal",
    icon: Zap,
    items: [
      { id: "home", label: "Home", icon: Home, path: "/" },
      { id: "dreamspaces", label: "DreamSpaces", icon: Sparkles, path: "/dreamspaces", badge: 3 },
      { id: "lives", label: "Lives", icon: Radio, path: "/lives" },
      { id: "marketplace", label: "Marketplace", icon: ShoppingBag, path: "/marketplace" },
    ],
  },
  {
    id: "social",
    label: "Social",
    icon: Users,
    items: [
      { id: "global-wall", label: "Muro Global", icon: MessageSquare, path: "/global-wall" },
      { id: "chats", label: "Chats", icon: Users, path: "/chats", badge: 5 },
      { id: "gallery", label: "Gallery", icon: Image, path: "/gallery" },
      { id: "groups", label: "Groups", icon: Users, path: "/groups" },
    ],
  },
  {
    id: "content",
    label: "Contenido",
    icon: BookOpen,
    items: [
      { id: "projects", label: "Projects", icon: BookOpen, path: "/projects" },
      { id: "university", label: "University", icon: GraduationCap, path: "/university" },
      { id: "kaos", label: "Audio Kaos", icon: Music, path: "/audio-kaos", premium: true },
      { id: "manifest", label: "Manifiesto", icon: FileText, path: "/manifest" },
    ],
  },
  {
    id: "economy",
    label: "Economía",
    icon: Wallet,
    items: [
      { id: "wallet", label: "Wallet", icon: Wallet, path: "/wallet" },
      { id: "lottery", label: "Lottery", icon: Gift, path: "/lottery", badge: 1 },
      { id: "referrals", label: "Referrals", icon: TrendingUp, path: "/referrals" },
      { id: "games", label: "Games", icon: Gamepad2, path: "/games" },
    ],
  },
  {
    id: "system",
    label: "Sistema",
    icon: Settings,
    items: [
      { id: "profile", label: "Profile", icon: Users, path: "/profile" },
      { id: "security", label: "Security", icon: Shield, path: "/security" },
      { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
      { id: "help", label: "Help", icon: HelpCircle, path: "/help" },
    ],
  },
];

export default function CrystalSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(["main"]);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const isSectionExpanded = (sectionId: string) => expandedSections.includes(sectionId);

  // Auto-expand on hover when collapsed
  const effectiveCollapsed = isCollapsed && !isHovered;

  return (
    <TooltipProvider delayDuration={0}>
      {/* Hover trigger zone when collapsed */}
      {isCollapsed && (
        <div 
          className="sidebar-hover-trigger left-0 top-0"
          onMouseEnter={() => setIsHovered(true)}
        />
      )}
      
      <motion.aside
        initial={{ x: -300 }}
        animate={{ 
          x: 0, 
          width: effectiveCollapsed ? 72 : 280 
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        onMouseEnter={() => isCollapsed && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "fixed left-0 top-0 h-screen z-40",
          "crystal-glass",
          "transition-all duration-300"
        )}
      >
        {/* Crystal glow effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-50"
          animate={{
            background: [
              "radial-gradient(ellipse at 0% 50%, hsla(180, 100%, 50%, 0.1) 0%, transparent 50%)",
              "radial-gradient(ellipse at 0% 30%, hsla(270, 100%, 60%, 0.1) 0%, transparent 50%)",
              "radial-gradient(ellipse at 0% 70%, hsla(180, 100%, 50%, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="h-[72px] flex items-center justify-between px-4 border-b border-border/30">
            <AnimatePresence mode="wait">
              {!effectiveCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent via-primary to-secondary flex items-center justify-center shadow-glow animate-crystal-pulse">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-orbitron font-bold text-gradient-quantum text-lg">TAMV</h2>
                    <p className="text-[10px] text-muted-foreground">MD-X4™ Online</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hover:bg-accent/20 relative group shrink-0"
            >
              <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}>
                <ChevronLeft className="h-5 w-5" />
              </motion.div>
              <motion.div
                className="absolute inset-0 rounded-lg bg-accent/20 blur-lg opacity-0 group-hover:opacity-100 -z-10"
              />
            </Button>
          </div>

          {/* Navigation Sections */}
          <ScrollArea className="flex-1 px-3 py-4">
            <div className="space-y-2">
              {sections.map((section) => {
                const SectionIcon = section.icon;
                const isExpanded = isSectionExpanded(section.id);
                const hasActiveItem = section.items.some(item => isActive(item.path));

                return (
                  <div key={section.id} className="space-y-1">
                    {/* Section Header */}
                    {effectiveCollapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="px-2 py-2">
                            <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                              hasActiveItem 
                                ? "bg-accent/20 text-accent crystal-glow" 
                                : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                            )}>
                              <SectionIcon className="w-5 h-5" />
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="crystal-glass">
                          <p>{section.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-between px-3 py-2 h-auto group",
                          "hover:bg-accent/10 transition-all",
                          hasActiveItem && "bg-accent/5"
                        )}
                        onClick={() => toggleSection(section.id)}
                      >
                        <div className="flex items-center gap-3">
                          <SectionIcon className={cn(
                            "w-4 h-4 transition-colors",
                            hasActiveItem ? "text-accent" : "text-muted-foreground group-hover:text-foreground"
                          )} />
                          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                            {section.label}
                          </span>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </motion.div>
                      </Button>
                    )}

                    {/* Section Items */}
                    <AnimatePresence>
                      {(isExpanded || effectiveCollapsed) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className={cn("space-y-1", !effectiveCollapsed && "pl-2")}>
                            {section.items.map((item) => {
                              const Icon = item.icon;
                              const active = isActive(item.path);

                              return effectiveCollapsed ? (
                                <Tooltip key={item.id}>
                                  <TooltipTrigger asChild>
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() => navigate(item.path)}
                                      className={cn(
                                        "w-10 h-10 mx-auto rounded-xl flex items-center justify-center transition-all relative",
                                        active 
                                          ? "bg-accent/20 text-accent crystal-glow" 
                                          : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                                      )}
                                    >
                                      <Icon className="w-5 h-5" />
                                      {item.badge && (
                                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-[10px] text-destructive-foreground rounded-full flex items-center justify-center">
                                          {item.badge}
                                        </span>
                                      )}
                                    </motion.button>
                                  </TooltipTrigger>
                                  <TooltipContent side="right" className="crystal-glass">
                                    <p>{item.label}</p>
                                  </TooltipContent>
                                </Tooltip>
                              ) : (
                                <motion.button
                                  key={item.id}
                                  whileHover={{ x: 4 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => navigate(item.path)}
                                  className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all relative group",
                                    active 
                                      ? "bg-accent/15 text-accent crystal-border" 
                                      : "text-muted-foreground hover:text-foreground hover:bg-accent/5"
                                  )}
                                >
                                  {active && (
                                    <motion.div
                                      layoutId="activeIndicator"
                                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-r-full"
                                    />
                                  )}
                                  <Icon className={cn(
                                    "w-4 h-4 shrink-0",
                                    active && "text-accent"
                                  )} />
                                  <span className="flex-1 text-left text-sm font-medium truncate">
                                    {item.label}
                                  </span>
                                  {item.badge && (
                                    <Badge variant="destructive" className="h-5 px-1.5 text-[10px]">
                                      {item.badge}
                                    </Badge>
                                  )}
                                  {item.premium && (
                                    <Crown className="w-3.5 h-3.5 text-yellow-400" />
                                  )}
                                </motion.button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Footer Stats */}
          <AnimatePresence>
            {!effectiveCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="p-4 border-t border-border/30 space-y-3"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Credits</span>
                  <span className="font-semibold text-gradient-quantum flex items-center gap-1">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    1,234
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Resonance</span>
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3 text-pink-500 fill-pink-500" />
                    <span className="font-semibold">89%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Level</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">42</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}
