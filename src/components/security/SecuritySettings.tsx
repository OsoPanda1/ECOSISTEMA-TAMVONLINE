import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Shield, Fingerprint, Key, Smartphone, 
  CheckCircle2, AlertTriangle, Plus, Trash2,
  Lock, Eye, EyeOff, QrCode
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useWebAuthn } from "@/hooks/useWebAuthn";
import { toast } from "sonner";

export default function SecuritySettings() {
  const {
    credentials,
    loading,
    registering,
    fetchCredentials,
    registerPasskey,
    authenticateWithPasskey,
    setupTOTP,
    verifyTOTP
  } = useWebAuthn();

  const [deviceName, setDeviceName] = useState("");
  const [totpSecret, setTotpSecret] = useState<{ secret: string; uri: string } | null>(null);
  const [totpCode, setTotpCode] = useState("");
  const [showTotpSetup, setShowTotpSetup] = useState(false);

  useEffect(() => {
    fetchCredentials();
  }, [fetchCredentials]);

  const handleRegisterPasskey = async () => {
    const success = await registerPasskey(deviceName || undefined);
    if (success) {
      setDeviceName("");
    }
  };

  const handleSetupTOTP = async () => {
    const result = await setupTOTP();
    if (result) {
      setTotpSecret(result);
      setShowTotpSetup(true);
    }
  };

  const handleVerifyTOTP = async () => {
    const success = await verifyTOTP(totpCode);
    if (success) {
      setShowTotpSetup(false);
      setTotpCode("");
      setTotpSecret(null);
    }
  };

  const webauthnCredentials = credentials.filter(c => c.credential_type === 'webauthn');
  const totpCredentials = credentials.filter(c => c.credential_type === 'totp');

  return (
    <div className="space-y-6">
      {/* Security Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
          <Shield className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-orbitron font-bold text-gradient-quantum">
            Protocolo OMEGA
          </h2>
          <p className="text-muted-foreground">
            Seguridad avanzada WebAuthn + MFA
          </p>
        </div>
      </div>

      {/* Security Status */}
      <Card className="glass-effect border-primary/20 p-6">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-primary" />
          Estado de Seguridad
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg border ${
            webauthnCredentials.length > 0 
              ? 'bg-emerald-500/10 border-emerald-500/30' 
              : 'bg-amber-500/10 border-amber-500/30'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Fingerprint className="w-5 h-5" />
              <span className="font-medium">Passkeys</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {webauthnCredentials.length > 0 
                ? `${webauthnCredentials.length} dispositivo(s) registrado(s)`
                : 'No configurado'}
            </p>
          </div>

          <div className={`p-4 rounded-lg border ${
            totpCredentials.length > 0 
              ? 'bg-emerald-500/10 border-emerald-500/30' 
              : 'bg-amber-500/10 border-amber-500/30'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="w-5 h-5" />
              <span className="font-medium">TOTP/2FA</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {totpCredentials.length > 0 ? 'Activo' : 'No configurado'}
            </p>
          </div>

          <div className="p-4 rounded-lg border bg-primary/10 border-primary/30">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-5 h-5" />
              <span className="font-medium">Cifrado</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Post-Cuántico (Dilithium-5)
            </p>
          </div>
        </div>
      </Card>

      {/* WebAuthn / Passkeys */}
      <Card className="glass-effect border-primary/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Fingerprint className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-bold">Passkeys (WebAuthn)</h3>
              <p className="text-sm text-muted-foreground">
                Autenticación biométrica sin contraseñas
              </p>
            </div>
          </div>
        </div>

        {/* Existing Credentials */}
        <div className="space-y-3 mb-6">
          {webauthnCredentials.map((cred) => (
            <motion.div
              key={cred.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-primary/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Key className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{cred.device_name || 'Passkey'}</p>
                  <p className="text-xs text-muted-foreground">
                    Registrado: {new Date(cred.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {cred.is_primary && (
                  <Badge className="bg-primary/20 text-primary">Principal</Badge>
                )}
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
            </motion.div>
          ))}

          {webauthnCredentials.length === 0 && !loading && (
            <div className="text-center py-8 text-muted-foreground">
              <Fingerprint className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No tienes passkeys registradas</p>
            </div>
          )}
        </div>

        {/* Register New Passkey */}
        <div className="flex gap-3">
          <Input
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            placeholder="Nombre del dispositivo (opcional)"
            className="glass-effect border-primary/30"
          />
          <Button
            onClick={handleRegisterPasskey}
            disabled={registering}
            className="bg-gradient-quantum hover:opacity-90 whitespace-nowrap"
          >
            {registering ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Fingerprint className="w-5 h-5" />
              </motion.div>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Registrar Passkey
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* TOTP / 2FA */}
      <Card className="glass-effect border-primary/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Smartphone className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-bold">Autenticador (TOTP)</h3>
              <p className="text-sm text-muted-foreground">
                Códigos temporales con Google Authenticator o similar
              </p>
            </div>
          </div>
        </div>

        {totpCredentials.length > 0 ? (
          <div className="flex items-center justify-between p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              <span>TOTP configurado y activo</span>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-400">Protegido</Badge>
          </div>
        ) : showTotpSetup && totpSecret ? (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-background/50 border border-primary/20 text-center">
              <QrCode className="w-24 h-24 mx-auto mb-4 text-primary" />
              <p className="text-sm text-muted-foreground mb-2">
                Escanea con tu app de autenticación
              </p>
              <code className="text-xs font-mono bg-background/80 px-3 py-1 rounded break-all">
                {totpSecret.secret}
              </code>
            </div>
            
            <div className="flex gap-3">
              <Input
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value)}
                placeholder="Ingresa el código de 6 dígitos"
                maxLength={6}
                className="glass-effect border-primary/30 text-center text-2xl tracking-widest"
              />
              <Button
                onClick={handleVerifyTOTP}
                disabled={totpCode.length !== 6}
                className="bg-gradient-quantum"
              >
                Verificar
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={handleSetupTOTP}
            variant="outline"
            className="w-full border-primary/30 hover:bg-primary/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            Configurar Autenticador
          </Button>
        )}
      </Card>

      {/* Security Recommendations */}
      <Card className="glass-effect border-amber-500/20 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-amber-500 mb-2">Recomendaciones de Seguridad</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Registra al menos 2 passkeys en dispositivos diferentes</li>
              <li>• Configura TOTP como respaldo para acceso de emergencia</li>
              <li>• Guarda tus códigos de respaldo en un lugar seguro</li>
              <li>• Revisa periódicamente los dispositivos autorizados</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
