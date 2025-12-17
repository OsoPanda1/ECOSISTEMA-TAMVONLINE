import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars, Float, OrbitControls, MeshDistortMaterial } from "@react-three/drei";
import { 
  Sparkles, Zap, Globe, Users, Music, Video, Wallet, 
  MessageCircle, Heart, Share2, BookOpen, Crown, Gamepad2,
  Tv, Radio, ShoppingBag, Building, Trophy, Gift, Flame,
  TrendingUp, Eye, Play, Volume2, ChevronRight, Star
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

// 3D Floating Orb Component
function QuantumOrb() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh scale={2}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#00bcd4"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

// Portal Card with 3D effects
const PortalCard = ({ 
  icon: Icon, 
  title, 
  description, 
  gradient, 
  path,
  stats,
  isLive 
}: {
  icon: any;
  title: string;
  description: string;
  gradient: string;
  path: string;
  stats?: { label: string; value: string }[];
  isLive?: boolean;
}) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10, rotateY: 5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => navigate(path)}
      className="cursor-pointer relative group"
    >
      <Card className={`p-6 glass-effect border-primary/30 overflow-hidden h-full relative`}>
        {/* Animated background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} blur-xl opacity-30`} />
        </div>
        
        {/* Live indicator */}
        {isLive && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-red-400">LIVE</span>
          </div>
        )}
        
        <div className="relative z-10">
          <motion.div 
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-glow`}
          >
            <Icon className="w-7 h-7 text-white" />
          </motion.div>
          
          <h3 className="text-xl font-orbitron font-bold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
          
          {stats && (
            <div className="flex gap-4 mt-3">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-lg font-bold text-accent">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Hover arrow */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute bottom-4 right-4"
        >
          <ChevronRight className="w-5 h-5 text-accent" />
        </motion.div>
      </Card>
    </motion.div>
  );
};

// Story Card Component
const StoryCard = ({ user, isViewed }: { user: any; isViewed?: boolean }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    className="flex flex-col items-center cursor-pointer"
  >
    <div className={`p-0.5 rounded-full ${isViewed ? 'bg-muted' : 'bg-gradient-quantum'}`}>
      <Avatar className="w-16 h-16 border-2 border-background">
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
    </div>
    <span className="text-xs mt-1 text-muted-foreground truncate w-16 text-center">{user.name}</span>
  </motion.div>
);

// Trending Post Card
const TrendingPostCard = ({ post }: { post: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    className="relative group cursor-pointer"
  >
    <Card className="overflow-hidden glass-effect border-primary/20">
      <div className="aspect-video relative">
        <img 
          src={post.media} 
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {post.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="w-14 h-14 rounded-full bg-primary/80 backdrop-blur flex items-center justify-center"
            >
              <Play className="w-6 h-6 text-white ml-1" />
            </motion.div>
          </div>
        )}
        
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="w-8 h-8 border border-primary/50">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-foreground">{post.author.name}</span>
            {post.author.verified && <Badge variant="secondary" className="text-xs">✓</Badge>}
          </div>
          <h4 className="font-semibold text-foreground line-clamp-2">{post.title}</h4>
        </div>
      </div>
      
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{post.views}</span>
          <span className="flex items-center gap-1"><Heart className="w-4 h-4" />{post.likes}</span>
        </div>
        <Badge className={`${post.category === 'Trending' ? 'bg-accent' : 'bg-primary'}`}>
          {post.category}
        </Badge>
      </div>
    </Card>
  </motion.div>
);

// Live Stream Card
const LiveStreamCard = ({ stream }: { stream: any }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="relative cursor-pointer group"
  >
    <Card className="overflow-hidden glass-effect border-red-500/30">
      <div className="aspect-video relative">
        <img 
          src={stream.thumbnail} 
          alt={stream.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Live badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <Badge className="bg-red-600 animate-pulse">🔴 LIVE</Badge>
          <Badge variant="secondary" className="backdrop-blur">{stream.viewers} watching</Badge>
        </div>
        
        {/* Stream info */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10 border-2 border-red-500">
              <AvatarImage src={stream.streamer.avatar} />
              <AvatarFallback>{stream.streamer.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-foreground">{stream.streamer.name}</h4>
              <p className="text-xs text-muted-foreground">{stream.title}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </motion.div>
);

export default function Home() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>("discover");
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Infinite scroll simulation
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Mock data
  const stories = [
    { id: 1, name: "Isabella", avatar: "/placeholder.svg", isAI: true },
    { id: 2, name: "Carlos", avatar: "/placeholder.svg" },
    { id: 3, name: "María", avatar: "/placeholder.svg" },
    { id: 4, name: "DreamLab", avatar: "/placeholder.svg" },
    { id: 5, name: "XR Studio", avatar: "/placeholder.svg" },
    { id: 6, name: "AudioFX", avatar: "/placeholder.svg" },
  ];

  const portals = [
    { icon: Globe, title: "DreamSpaces", description: "Experiencias 3D/4D inmersivas", gradient: "from-primary to-accent", path: "/dreamspaces", stats: [{ label: "Spaces", value: "2.4K" }, { label: "Usuarios", value: "45K" }] },
    { icon: ShoppingBag, title: "Marketplace", description: "Activos digitales únicos", gradient: "from-accent to-energy", path: "/marketplace", stats: [{ label: "Items", value: "12K" }, { label: "Vendidos", value: "8K" }] },
    { icon: Music, title: "MusiTAMV", description: "Audio sensorial quantum", gradient: "from-calm to-primary", path: "/audio-kaos", stats: [{ label: "Tracks", value: "50K" }, { label: "Plays", value: "2M" }], isLive: true },
    { icon: Tv, title: "Lives", description: "Streaming en vivo", gradient: "from-destructive to-accent", path: "/lives", stats: [{ label: "En Vivo", value: "156" }, { label: "Viewers", value: "23K" }], isLive: true },
    { icon: Wallet, title: "Cattleya Wallet", description: "Economía digital TAMV", gradient: "from-energy to-resonance", path: "/wallet", stats: [{ label: "Balance", value: "$4.2K" }] },
    { icon: BookOpen, title: "University", description: "Aprende y certifícate", gradient: "from-focus to-calm", path: "/university", stats: [{ label: "Cursos", value: "340" }, { label: "Alumnos", value: "15K" }] },
    { icon: Users, title: "Comunidades", description: "Grupos y canales", gradient: "from-primary to-focus", path: "/groups", stats: [{ label: "Grupos", value: "890" }] },
    { icon: MessageCircle, title: "Chats", description: "Mensajería cuántica", gradient: "from-accent to-primary", path: "/chats" },
    { icon: Gamepad2, title: "Games", description: "Juegos y competencias", gradient: "from-energy to-accent", path: "/games" },
    { icon: Trophy, title: "Lotería TAMV", description: "Premios y sorteos", gradient: "from-resonance to-energy", path: "/lottery" },
    { icon: Gift, title: "Referidos", description: "Gana invitando amigos", gradient: "from-accent to-calm", path: "/referrals" },
    { icon: Crown, title: "Membresías", description: "Beneficios exclusivos", gradient: "from-primary to-energy", path: "/memberships" },
  ];

  const trendingPosts = [
    { id: 1, title: "Nuevo DreamSpace: Galaxia Quantum", media: "/placeholder.svg", type: "video", views: "12K", likes: "2.3K", category: "Trending", author: { name: "DreamLab", avatar: "/placeholder.svg", verified: true } },
    { id: 2, title: "Concierto en vivo desde el Metaverso", media: "/placeholder.svg", type: "video", views: "8.5K", likes: "1.8K", category: "Music", author: { name: "AudioFX", avatar: "/placeholder.svg", verified: true } },
    { id: 3, title: "Tutorial: Crea tu primer espacio 3D", media: "/placeholder.svg", type: "tutorial", views: "5.2K", likes: "980", category: "Learn", author: { name: "TAMV Academy", avatar: "/placeholder.svg", verified: true } },
  ];

  const liveStreams = [
    { id: 1, title: "Explorando nuevos mundos", thumbnail: "/placeholder.svg", viewers: "1.2K", streamer: { name: "XR_Master", avatar: "/placeholder.svg" } },
    { id: 2, title: "DJ Session Quantum", thumbnail: "/placeholder.svg", viewers: "856", streamer: { name: "DJ_Nebula", avatar: "/placeholder.svg" } },
  ];

  const contextChips = [
    { id: "discover", label: "Descubrir", icon: Sparkles },
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "live", label: "En Vivo", icon: Radio },
    { id: "dreamspaces", label: "DreamSpaces", icon: Globe },
    { id: "music", label: "Música", icon: Music },
    { id: "economy", label: "Economía", icon: Wallet },
  ];

  // Handle scroll for infinite loading
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(progress);
    
    // Load more when near bottom
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && !loading) {
      // loadMoreContent();
    }
  }, [loading]);

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="min-h-screen relative overflow-y-auto overflow-x-hidden"
    >
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00bcd4" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#1a237e" />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <QuantumOrb />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Scroll progress indicator */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-muted z-50">
        <motion.div 
          className="h-full bg-gradient-quantum"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-[60vh] flex items-center justify-center px-4 pt-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Badge className="mb-6 bg-gradient-quantum text-white px-6 py-2 text-sm">
                <Flame className="w-4 h-4 mr-2 inline" />
                El Metaverso Social del Futuro
              </Badge>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-orbitron font-black text-gradient-quantum mb-6">
              TAMV MD-X4™
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experiencias inmersivas, economía ética, y conexiones auténticas en un ecosistema 4D quantum-sensorial.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-quantum hover:opacity-90 text-white font-orbitron">
                <Sparkles className="mr-2" /> Explorar
              </Button>
              <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10">
                <Play className="mr-2" /> Ver Demo
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Context Chips - Spatial Navigation */}
        <section className="sticky top-16 z-40 py-4 px-4 glass-effect backdrop-blur-xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {contextChips.map((chip) => (
                <motion.button
                  key={chip.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection(chip.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    activeSection === chip.id 
                      ? 'bg-gradient-quantum text-white shadow-glow' 
                      : 'bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground'
                  }`}
                >
                  <chip.icon className="w-4 h-4" />
                  {chip.label}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Stories Section */}
        <section className="py-6 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {/* Add Story */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-quantum flex items-center justify-center">
                  <span className="text-2xl">+</span>
                </div>
                <span className="text-xs mt-1 text-muted-foreground">Tu Historia</span>
              </motion.div>
              
              {stories.map((story) => (
                <StoryCard key={story.id} user={story} />
              ))}
            </div>
          </div>
        </section>

        {/* Portals Grid - Main Navigation */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-orbitron font-bold text-gradient-quantum">
                Portales del Ecosistema
              </h2>
              <Button variant="ghost" className="text-accent">
                Ver todos <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {portals.map((portal, i) => (
                <motion.div
                  key={portal.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <PortalCard {...portal} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Streams Section */}
        <section className="py-8 px-4 bg-gradient-to-b from-transparent via-red-950/10 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-orbitron font-bold flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                En Vivo Ahora
              </h2>
              <Button variant="ghost" className="text-accent" onClick={() => navigate('/lives')}>
                Ver todos <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {liveStreams.map((stream) => (
                <LiveStreamCard key={stream.id} stream={stream} />
              ))}
            </div>
          </div>
        </section>

        {/* Trending Content */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-orbitron font-bold text-gradient-quantum flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                Trending
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingPosts.map((post) => (
                <TrendingPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* Isabella AI Assistant CTA */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-3xl"
            >
              <Card className="p-8 md:p-12 glass-effect border-accent/30 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/10 to-transparent" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(0,188,212,0.5)",
                        "0 0 40px rgba(0,188,212,0.8)",
                        "0 0 20px rgba(0,188,212,0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-24 h-24 rounded-full bg-gradient-quantum flex items-center justify-center"
                  >
                    <Star className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-orbitron font-bold text-gradient-quantum mb-3">
                      Isabella Villaseñor AI
                    </h3>
                    <p className="text-muted-foreground mb-4 max-w-xl">
                      Tu compañera cognitiva emocional. Guía, aprende y co-crea en el metaverso con inteligencia empática multisensorial.
                    </p>
                    <Button className="bg-gradient-quantum hover:opacity-90">
                      <MessageCircle className="mr-2 w-4 h-4" />
                      Hablar con Isabella
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Usuarios Activos", value: "2.4M", icon: Users, color: "text-accent" },
                { label: "DreamSpaces", value: "45K", icon: Globe, color: "text-energy" },
                { label: "Transacciones", value: "$8.2M", icon: Wallet, color: "text-resonance" },
                { label: "Creadores", value: "120K", icon: Crown, color: "text-primary" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 glass-effect border-primary/20 text-center">
                    <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                    <div className="text-3xl font-orbitron font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
