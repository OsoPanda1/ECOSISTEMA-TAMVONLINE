import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useWebAuthn } from "@/hooks/useWebAuthn";
import { Fingerprint, Mail, Lock, User, ArrowRight, Shield, KeyRound } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Auth() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [authMethod, setAuthMethod] = useState<"email" | "passkey">("email");

  const { 
    credentials,
    registering,
    registerPasskey,
    authenticateWithPasskey,
    fetchCredentials
  } = useWebAuthn();

  // Check if user is already logged in
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          navigate("/");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // Validate inputs
        if (!email || !password || !username) {
          throw new Error("Por favor completa todos los campos requeridos");
        }

        if (password.length < 6) {
          throw new Error("La contraseña debe tener al menos 6 caracteres");
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
              full_name: fullName,
            },
            emailRedirectTo: `${window.location.origin}/`,
          },
        });

        if (error) {
          if (error.message.includes("already registered")) {
            throw new Error("Este email ya está registrado. Intenta iniciar sesión.");
          }
          throw error;
        }

        toast.success("¡Cuenta creada! Bienvenido a TAMV MD-X4™");
        navigate("/");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            throw new Error("Email o contraseña incorrectos");
          }
          throw error;
        }

        toast.success("¡Bienvenido de vuelta!");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message || "Error en autenticación");
    } finally {
      setLoading(false);
    }
  };

  const handlePasskeyLogin = async () => {
    setLoading(true);
    try {
      // First we need email login, then passkey verification
      toast.info("Primero inicia sesión con email, luego configura tu Passkey");
    } catch (error: any) {
      toast.error(error.message || "Error con Passkey");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
        </div>
        
        {/* Matrix-style particles */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-8 bg-gradient-to-b from-primary/80 to-transparent animate-matrix-rain"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md px-4"
      >
        <Card className="glass-effect p-8 glow-quantum border-primary/20">
          <div className="text-center mb-8">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-quantum flex items-center justify-center shadow-glow"
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl font-orbitron text-gradient-quantum mb-2">
              TAMV MD-X4™
            </h1>
            <p className="text-muted-foreground">
              {isSignUp ? "Únete al ecosistema quantum" : "Accede al quantum sensorial"}
            </p>
          </div>

          <Tabs value={authMethod} onValueChange={(v) => setAuthMethod(v as "email" | "passkey")} className="mb-6">
            <TabsList className="grid grid-cols-2 w-full bg-card/50 border border-primary/20">
              <TabsTrigger value="email" className="data-[state=active]:bg-primary/20 font-orbitron text-xs">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </TabsTrigger>
              <TabsTrigger value="passkey" className="data-[state=active]:bg-primary/20 font-orbitron text-xs">
                <Fingerprint className="w-4 h-4 mr-2" />
                Passkey
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {isSignUp && (
                  <>
                    <div>
                      <Label htmlFor="username" className="text-foreground flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        Usuario
                      </Label>
                      <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="tu_usuario_quantum"
                        className="bg-card/50 border-primary/30 focus:border-primary mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fullName" className="text-foreground">Nombre Completo</Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Tu nombre"
                        className="bg-card/50 border-primary/30 focus:border-primary mt-1"
                      />
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="tu@email.com"
                    className="bg-card/50 border-primary/30 focus:border-primary mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-foreground flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    Contraseña
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="bg-card/50 border-primary/30 focus:border-primary mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-quantum hover:opacity-90 text-white font-orbitron group"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Procesando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {isSignUp ? "Crear Cuenta" : "Iniciar Sesión"}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="passkey">
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/30"
                >
                  <KeyRound className="w-12 h-12 text-primary animate-pulse" />
                </motion.div>
                
                <h3 className="text-lg font-orbitron text-foreground mb-2">
                  Autenticación Biométrica
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Usa tu huella digital, Face ID o llave de seguridad para acceder sin contraseña
                </p>

                <div className="space-y-3">
                  <Button
                    onClick={handlePasskeyLogin}
                    disabled={loading}
                    className="w-full bg-gradient-quantum hover:opacity-90 font-orbitron"
                  >
                    <Fingerprint className="w-5 h-5 mr-2" />
                    Usar Passkey
                  </Button>
                  
                  <p className="text-xs text-muted-foreground">
                    ¿Primera vez? Inicia con email y luego configura tu Passkey en Seguridad
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-6">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-primary hover:text-primary-glow transition-colors underline-offset-4 hover:underline"
            >
              {isSignUp ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
            </button>
          </div>

          {/* Security badges */}
          <div className="mt-8 pt-6 border-t border-primary/10">
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-green-500" />
                <span>SSL Seguro</span>
              </div>
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-green-500" />
                <span>Encriptación E2E</span>
              </div>
              <div className="flex items-center gap-1">
                <Fingerprint className="w-3 h-3 text-green-500" />
                <span>WebAuthn</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}