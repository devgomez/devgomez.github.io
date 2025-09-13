# 🚀 Portfolio Futurista - Ismael Gomez

Portfolio web con diseño futurista y formulario de contacto funcional.

## 📋 Características

- ✨ Diseño futurista con efectos neón y animaciones
- 📱 Totalmente responsive
- 📧 Formulario de contacto funcional con API
- 🎨 Efectos de partículas y animaciones CSS
- ⚡ Optimizado para rendimiento

## 🛠️ Configuración del Servidor

### Para desarrollo local con XAMPP/WAMP:

1. **Copia los archivos** al directorio `htdocs`:
   ```
   C:\xampp\htdocs\portfolio\
   ```

2. **Inicia Apache** desde el panel de control de XAMPP

3. **Accede a**: `http://localhost/portfolio`

### Para servidor web (hosting):

1. **Sube todos los archivos** al directorio raíz de tu hosting

2. **Configura el email** en `api/contact.php`:
   ```php
   $to = 'tu-email@gmail.com'; // Cambia por tu email real
   ```

3. **Verifica que PHP mail()** esté habilitado en tu hosting

## 📁 Estructura del Proyecto

```
devgomez.github.io/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos futuristas
├── js/                     # JavaScript (vacío por ahora)
├── img/
│   └── photo.png          # Tu foto de perfil
├── doc/
│   └── CV_ISMAELGOMEZ.pdf # Tu CV
├── api/
│   └── contact.php        # API para el formulario
├── backup/                # Archivos de respaldo
└── .htaccess             # Configuración del servidor
```

## 🔧 Configuración del Formulario

### Opción 1: Servidor con PHP (Recomendado)

El archivo `api/contact.php` está configurado para enviar emails usando la función `mail()` de PHP.

**Configuración necesaria:**
- Servidor web con PHP habilitado
- Función `mail()` activa en el servidor
- Configurar el email de destino en el archivo PHP

### Opción 2: Servicios externos (EmailJS, Formspree, etc.)

Si tu hosting no soporta PHP o mail(), puedes usar servicios como:

- **EmailJS**: https://www.emailjs.com/
- **Formspree**: https://formspree.io/
- **Netlify Forms**: Si usas Netlify

### Opción 3: API personalizada (Node.js, Python, etc.)

Puedes crear tu propia API usando:
- Node.js con Express y Nodemailer
- Python con Flask/FastAPI
- .NET Core Web API

## 📧 Configuración de Email

### Para Gmail/SMTP:

Si quieres usar SMTP en lugar de la función mail() básica, modifica `api/contact.php`:

```php
// Usar PHPMailer para SMTP
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'tu-email@gmail.com';
$mail->Password = 'tu-app-password';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
```

## 🚀 Despliegue

### GitHub Pages:
1. Sube el código a GitHub
2. Habilita GitHub Pages en la configuración del repositorio
3. **Nota**: GitHub Pages no soporta PHP, necesitarás usar EmailJS u otro servicio

### Netlify:
1. Conecta tu repositorio de GitHub
2. Usa Netlify Forms para el formulario de contacto
3. Despliegue automático

### Hosting tradicional:
1. Sube archivos por FTP
2. Configura el email en `api/contact.php`
3. Verifica que PHP esté habilitado

## 🎨 Personalización

### Colores:
```css
/* Variables principales */
:root {
    --primary-cyan: #00ffff;
    --primary-magenta: #ff00ff;
    --primary-yellow: #ffff00;
    --bg-dark: #000000;
    --text-light: #ffffff;
}
```

### Contenido:
- Edita `index.html` para cambiar textos
- Reemplaza `img/photo.png` con tu foto
- Actualiza `doc/CV_ISMAELGOMEZ.pdf` con tu CV

## 📱 Características Responsive

- Diseño móvil-first
- Breakpoints optimizados
- Formulario adaptativo
- Navegación touch-friendly

## ⚡ Optimizaciones

- CSS minificado en producción
- Imágenes optimizadas
- Lazy loading
- Cache del navegador configurado

## 🐛 Solución de Problemas

### El formulario no envía emails:
1. Verifica que PHP esté habilitado
2. Comprueba que `mail()` funcione en tu servidor
3. Revisa los logs del servidor
4. Considera usar SMTP o servicios externos

### Errores de CORS:
1. Verifica el archivo `.htaccess`
2. Configura headers CORS en el servidor
3. Usa el mismo dominio para frontend y API

### Efectos visuales no funcionan:
1. Verifica que JavaScript esté habilitado
2. Comprueba la consola del navegador
3. Asegúrate de que CSS se carga correctamente

## 📞 Soporte

Para cualquier duda o problema:
- 📧 Email: ismael.gomez.dev@gmail.com
- 📱 WhatsApp: +34 927 881 705

---

💡 **Tip**: Para mejores resultados, despliega en un servidor con PHP habilitado como SiteGround, Hostinger, o DigitalOcean.
