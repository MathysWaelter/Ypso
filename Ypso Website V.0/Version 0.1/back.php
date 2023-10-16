<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $prenom = $_POST['prenom'];
    $nom = $_POST['nom'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    // Recipient email address
    $recipient_email = $w; // Replace with the actual recipient email address

    // Email subject
    $subject = "New Form Submission from $prenom $nom";

    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Compose the email message
    $email_message = "You have received a new form submission from:\n\n";
    $email_message .= "First Name: $prenom\n";
    $email_message .= "Last Name: $nom\n";
    $email_message .= "Email: $email\n";
    $email_message .= "Message:\n$message";

    // Send the email
    if (mail($recipient_email, $subject, $email_message, $headers)) {
        header("Location: success.html"); // Redirect to a success page
        exit();
    } else {
        header("Location: error.html"); // Redirect to an error page
        exit();
    }
} else {
    echo "Invalid request.";
}
?>
