import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { isAdminConfigured, loginAdmin } from '@/lib/adminAuth';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isConfigured = isAdminConfigured();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConfigured) {
      setError('Configura VITE_ADMIN_PASSWORD en tu .env.local para activar el acceso admin.');
      return;
    }

    if (loginAdmin(password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Panel Admin</CardTitle>
          <CardDescription>Editor de Catálogo - Nautical Showcase</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña admin"
                autoFocus
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full">
              Ingresar
            </Button>

            {!isConfigured && (
              <p className="text-sm text-amber-600 text-center mt-4">
                Falta configurar la contraseña admin en variables de entorno.
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
