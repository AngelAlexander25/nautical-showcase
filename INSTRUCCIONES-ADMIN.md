# 🎨 Panel Admin - Editor de Catálogo en Tiempo Real

## 🚀 Acceso Rápido

1. **Inicia el servidor:**
   ```powershell
   npm run dev
   ```

2. **Abre en tu navegador:**
   ```
   http://localhost:8080/admin
   ```

3. **Ingresa con la contraseña:**
   - Password: `admin123`

---

## ✨ **Los cambios se guardan AUTOMÁTICAMENTE** ✨

✅ No necesitas descargar archivos  
✅ No necesitas reemplazar código  
✅ Los cambios se ven **instantáneamente** en la web  
✅ Todo se guarda en el navegador automáticamente  

---

## 📝 Cómo Editar Productos

### 1️⃣ Selecciona un Producto
- Panel izquierdo: haz clic en cualquier producto
- Se abrirá el editor a la derecha

### 2️⃣ Edita la Información

#### **Información Básica**
- **Nombre**: Nombre del producto
- **Descripción**: Texto descriptivo
- **Tipo**: 4 Tiempos, 2 Tiempos, Enduro, etc.
- **Features**: Características separadas por `|`
  - Ejemplo: `300 HP|4 Tiempos|V6`

#### **Variantes de Precio** (Para productos con múltiples modelos)
- Clic en **"+ Agregar Variante"**
- Llena:
  - **Modelo**: FL300GET2X, F300GET2X, etc.
  - **Precio**: $41,231.04 USD
  - **Nota**: Precio Incluye I.V.A.
- Elimina variantes con el ícono 🗑️

#### **Especificaciones Técnicas**
- Edita los campos que aparecen (Dimensiones, Peso, Potencia, etc.)
- Aparecerán en la ficha técnica del producto

### 3️⃣ Guarda los Cambios
- Haz clic en **"Guardar Cambios"**
- Verás: ✓ Cambios guardados automáticamente

### 4️⃣ Verifica en la Web
- Abre una nueva pestaña: `http://localhost:8080/catalogo`
- ❗ **Tus cambios YA ESTÁN VISIBLES** ❗
- No necesitas hacer nada más

---

## 🔄 Cómo Funcionan los Cambios Automáticos

Los cambios se guardan en **localStorage** del navegador:
- ✅ Persisten al cerrar y abrir el navegador
- ✅ Se aplican inmediatamente a toda la web
- ✅ Solo afectan TU navegador (no cambia el código fuente)

---

## 🌐 Compartir cambios entre navegadores/dispositivos

Si quieres que lo editado en `/admin/dashboard` se vea también en otros dispositivos, debes activar sincronización remota:

1. Crea un archivo `.env.local` en la raíz del proyecto.
2. Configura al menos esta variable:

```env
VITE_CATALOG_SYNC_URL=https://tu-api.com/catalog
```

Opcionales:

```env
VITE_CATALOG_SYNC_METHOD=PUT
VITE_CATALOG_SYNC_TOKEN=tu_token
VITE_CATALOG_SYNC_TOKEN_HEADER=Authorization
```

### Formato esperado del endpoint

- `GET` debe responder un arreglo directo de líneas, o un objeto con `productLines`.
- `PUT/POST/PATCH` recibe este JSON:

```json
{
  "productLines": [ ... ],
  "updatedAt": "2026-02-19T00:00:00.000Z"
}
```

> Sin `VITE_CATALOG_SYNC_URL`, el sistema sigue funcionando en modo local (`localStorage`).

---

## 🗑️ Eliminar el Panel Admin (Producción)

Cuando termines de configurar tu catálogo y quieras publicar la web:

### 1. **Elimina los archivos del admin:**
```powershell
rm src/pages/AdminLogin.tsx
rm src/pages/AdminDashboard.tsx
rm src/contexts/CatalogContext.tsx
rm INSTRUCCIONES-ADMIN.md
```

### 2. **Actualiza `src/App.tsx`:**

Elimina estas líneas:
```tsx
// ELIMINAR:
import { CatalogProvider } from "@/contexts/CatalogContext";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// Y elimina el wrapper:
<CatalogProvider>
  ...
</CatalogProvider>

// Y las rutas:
<Route path="/admin" element={<AdminLogin />} />
<Route path="/admin/dashboard" element={<AdminDashboard />} />
```

### 3. **Actualiza los componentes:**

En `src/pages/CatalogPage.tsx` y `src/components/Catalog.tsx`:
```tsx
// CAMBIAR:
import { useCatalog } from "@/contexts/CatalogContext";
const { productLines } = useCatalog();

// POR:
import { productLines } from "@/data/catalogData";
```

---

## 🔒 Cambiar la Contraseña

Edita `src/pages/AdminLogin.tsx`:
```tsx
const ADMIN_PASSWORD = 'TuNuevaContraseña123';
```

---

## 💡 Consejos Pro

### ✅ Mejores Prácticas
- Guarda cambios frecuentemente
- Abre el catálogo en otra pestaña para ver cambios en tiempo real
- Usa Copiar/Pegar desde la web de IMEMSA

### 🎯 Workflow Recomendado
1. Abre en 2 pestañas: `/admin/dashboard` y `/catalogo`
2. Edita en el admin
3. Guarda cambios
4. Refresca el catálogo para verificar
5. Repite

---

## 🆘 Problemas Comunes

### **No veo mis cambios en el catálogo**
1. ¿Guardaste con el botón "Guardar Cambios"?
2. Refresca la página del catálogo (F5)
3. Verifica que estés en el mismo navegador

### **Perdí mis cambios**
- Los cambios están en localStorage
- Si limpiaste el navegador, se perdieron
- Para producción: copia manualmente los datos actualizados a `catalogData.ts`

### **Quiero volver al catálogo original**
- Limpia el localStorage del navegador:
  - F12 → Console → Escribe: `localStorage.clear()` → Enter
  - Refresca la página

---

## 📌 URLs Importantes

- **Admin Login**: http://localhost:8080/admin
- **Dashboard**: http://localhost:8080/admin/dashboard
- **Catálogo**: http://localhost:8080/catalogo
- **Inicio**: http://localhost:8080/

---

**¡Tu catálogo se actualiza en tiempo real! 🚀**
