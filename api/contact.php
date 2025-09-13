<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo aceptar POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit();
}

// Leer datos JSON del body
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validar datos requeridos
if (!isset($data['name']) || !isset($data['email']) || !isset($data['subject']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan campos requeridos']);
    exit();
}

// Sanitizar datos
$name = htmlspecialchars(trim($data['name']));
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars(trim($data['subject']));
$message = htmlspecialchars(trim($data['message']));

// Validar email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Email inválido']);
    exit();
}

// Configuración del correo
$to = 'ismael.gomez.dev@gmail.com'; // Tu email real
$email_subject = 'Nuevo mensaje desde tu portfolio: ' . $subject;

// Crear el cuerpo del email
$email_body = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #00ffff, #ff00ff); padding: 20px; text-align: center; color: white; }
        .content { background: #f9f9f9; padding: 20px; border-left: 4px solid #00ffff; }
        .footer { background: #333; color: white; padding: 10px; text-align: center; font-size: 12px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>📧 Nuevo Mensaje desde tu Portfolio</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>👤 Nombre:</div>
                <div>{$name}</div>
            </div>
            <div class='field'>
                <div class='label'>📧 Email:</div>
                <div>{$email}</div>
            </div>
            <div class='field'>
                <div class='label'>📋 Asunto:</div>
                <div>{$subject}</div>
            </div>
            <div class='field'>
                <div class='label'>💬 Mensaje:</div>
                <div>" . nl2br($message) . "</div>
            </div>
        </div>
        <div class='footer'>
            Enviado desde tu portfolio futurista | " . date('Y-m-d H:i:s') . "
        </div>
    </div>
</body>
</html>
";

// Headers del email
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: Portfolio Contact Form <noreply@' . $_SERVER['HTTP_HOST'] . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion()
];

// Intentar enviar el email
if (mail($to, $email_subject, $email_body, implode("\r\n", $headers))) {
    // Log del mensaje (opcional)
    $log_entry = date('Y-m-d H:i:s') . " - Mensaje de: {$name} ({$email}) - Asunto: {$subject}\n";
    file_put_contents(__DIR__ . '/contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Mensaje enviado correctamente'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Error al enviar el mensaje',
        'details' => 'Por favor, intenta contactar directamente por email'
    ]);
}
?>
