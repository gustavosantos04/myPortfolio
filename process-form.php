<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Coletar os dados do formulário
    $name = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message']);

    // Validação básica (você pode expandir isso se precisar)
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit;
    }

    // Detalhes do email
    $to = "santosgustavo0504@gmail.com"; // Substitua com o seu endereço de email
    $subject = "Nova mensagem vinda do portfólio " . $name;
    $body = "Name: $name\nEmail: $email\nMessage:\n$message";
    $headers = "From: $email";

    // Enviar o email
    if (mail($to, $subject, $body, $headers)) {
        echo "Mensagem enviada!";
    } else {
        echo "Falha ao enviar mensagem.";
    }
} else {
    echo "Invalid request.";
}
?>
