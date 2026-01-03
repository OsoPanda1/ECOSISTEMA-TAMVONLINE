import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, Shield, Hash, Clock, CheckCircle2, 
  Upload, Search, Lock, Fingerprint, Award,
  Globe, Link2, Eye, Download
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface IPRecord {
  id: string;
  title: string;
  hash: string;
  timestamp: string;
  author: string;
  type: "documento" | "arte" | "código" | "música" | "video";
  status: "verificado" | "pendiente" | "anclado";
  blockNumber?: number;
}

export default function BookPI() {
  const [newRecord, setNewRecord] = useState({ title: "", description: "", type: "documento" });
  const [searchQuery, setSearchQuery] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const [records] = useState<IPRecord[]>([
    {
      id: "bp-001",
      title: "Arquitectura TAMV MD-X4™",
      hash: "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
      timestamp: "2025-12-28T10:30:00Z",
      author: "Anubis Villaseñor",
      type: "documento",
      status: "anclado",
      blockNumber: 18234567
    },
    {
      id: "bp-002", 
      title: "ISABELLA AI Core Protocol",
      hash: "0x3b8a2c1e9d7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b",
      timestamp: "2025-12-27T14:15:00Z",
      author: "The Gremio",
      type: "código",
      status: "verificado",
      blockNumber: 18234123
    },
    {
      id: "bp-003",
      title: "DreamSpaces XR Engine v2",
      hash: "0x9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d",
      timestamp: "2025-12-26T09:45:00Z",
      author: "Quantum Dev Team",
      type: "código",
      status: "anclado",
      blockNumber: 18233890
    }
  ]);

  const generateHash = () => {
    const chars = "0123456789abcdef";
    let hash = "0x";
    for (let i = 0; i < 64; i++) {
      hash += chars[Math.floor(Math.random() * 16)];
    }
    return hash;
  };

  const handleRegister = async () => {
    if (!newRecord.title || !newRecord.description) {
      toast.error("Completa todos los campos");
      return;
    }
    
    setIsRegistering(true);
    
    // Simulate blockchain anchoring
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const hash = generateHash();
    toast.success(
      <div className="space-y-2">
        <p className="font-bold">Propiedad Intelectual Registrada</p>
        <p className="text-xs font-mono break-all">{hash}</p>
      </div>
    );
    
    setIsRegistering(false);
    setNewRecord({ title: "", description: "", type: "documento" });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "documento": return FileText;
      case "arte": return Award;
      case "código": return Hash;
      case "música": return Globe;
      case "video": return Eye;
      default: return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "anclado": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "verificado": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "pendiente": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Quantum Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-20 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center mb-8 shadow-glow"
          >
            <Fingerprint className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-orbitron font-bold text-gradient-quantum mb-4"
          >
            BookPI™
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Protocolo de Propiedad Intelectual con anclaje inmutable en MSR Blockchain.
            Tus creaciones protegidas para siempre.
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <Tabs defaultValue="register" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 glass-effect">
            <TabsTrigger value="register" className="data-[state=active]:bg-primary/20">
              <Upload className="w-4 h-4 mr-2" />
              Registrar
            </TabsTrigger>
            <TabsTrigger value="records" className="data-[state=active]:bg-primary/20">
              <FileText className="w-4 h-4 mr-2" />
              Registros
            </TabsTrigger>
            <TabsTrigger value="verify" className="data-[state=active]:bg-primary/20">
              <Search className="w-4 h-4 mr-2" />
              Verificar
            </TabsTrigger>
          </TabsList>

          {/* Register Tab */}
          <TabsContent value="register">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="glass-effect border-primary/20 p-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-orbitron font-bold text-gradient-quantum mb-6">
                  Registrar Nueva Propiedad Intelectual
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Título de la Obra</label>
                    <Input
                      value={newRecord.title}
                      onChange={(e) => setNewRecord({ ...newRecord, title: e.target.value })}
                      placeholder="Nombre de tu creación..."
                      className="glass-effect border-primary/30"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Descripción</label>
                    <Textarea
                      value={newRecord.description}
                      onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
                      placeholder="Describe tu obra..."
                      className="glass-effect border-primary/30 min-h-[120px]"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Tipo de Contenido</label>
                    <div className="grid grid-cols-5 gap-2">
                      {["documento", "arte", "código", "música", "video"].map((type) => {
                        const Icon = getTypeIcon(type);
                        return (
                          <motion.button
                            key={type}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setNewRecord({ ...newRecord, type })}
                            className={`p-3 rounded-lg border transition-all ${
                              newRecord.type === type
                                ? "border-primary bg-primary/20 text-primary"
                                : "border-primary/20 hover:border-primary/40"
                            }`}
                          >
                            <Icon className="w-5 h-5 mx-auto mb-1" />
                            <span className="text-xs capitalize">{type}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Tu hash SHA-256 será generado y anclado en MSR Blockchain</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleRegister}
                    disabled={isRegistering}
                    className="w-full bg-gradient-quantum hover:opacity-90"
                  >
                    {isRegistering ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Lock className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <>
                        <Fingerprint className="w-5 h-5 mr-2" />
                        Anclar en MSR Blockchain
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Records Tab */}
          <TabsContent value="records">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <AnimatePresence>
                {records.map((record, index) => {
                  const TypeIcon = getTypeIcon(record.type);
                  return (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="glass-effect border-primary/20 p-6 hover:shadow-glow transition-all">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <TypeIcon className="w-6 h-6 text-primary" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-lg">{record.title}</h3>
                              <Badge className={getStatusColor(record.status)}>
                                {record.status === "anclado" && <Link2 className="w-3 h-3 mr-1" />}
                                {record.status === "verificado" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                                {record.status}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <span className="flex items-center gap-1">
                                <Award className="w-4 h-4" />
                                {record.author}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {new Date(record.timestamp).toLocaleDateString()}
                              </span>
                              {record.blockNumber && (
                                <span className="flex items-center gap-1">
                                  <Hash className="w-4 h-4" />
                                  Block #{record.blockNumber}
                                </span>
                              )}
                            </div>
                            
                            <div className="p-2 rounded bg-background/50 font-mono text-xs text-muted-foreground break-all">
                              {record.hash}
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <Button variant="ghost" size="icon" className="hover:bg-primary/20">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:bg-primary/20">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </TabsContent>

          {/* Verify Tab */}
          <TabsContent value="verify">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="glass-effect border-primary/20 p-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-orbitron font-bold text-gradient-quantum mb-6">
                  Verificar Propiedad Intelectual
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Hash o ID de Registro</label>
                    <div className="flex gap-2">
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="0x... o bp-..."
                        className="glass-effect border-primary/30 font-mono"
                      />
                      <Button className="bg-primary/20 hover:bg-primary/30">
                        <Search className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-6 rounded-lg border border-dashed border-primary/30 text-center">
                    <Shield className="w-12 h-12 mx-auto mb-4 text-primary/50" />
                    <p className="text-muted-foreground">
                      Ingresa un hash SHA-256 o ID de registro para verificar la autenticidad
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
