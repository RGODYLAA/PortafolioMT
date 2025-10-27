<!DOCTYPE html>
<html>
<head>
    <title>Aproximación de Pi</title>
    <link rel="stylesheet" type="text/css" href="estilos.css">
    <link rel="stylesheet" href="/Portafolio MT/CSS/navegacion.css">
</head>
<body>
    <h2>Aproximar el valor de π</h2>
    <form method="post" action="">
        <label>Ingresa un valor de n (mayor a 0):</label>
        <input type="number" name="n" min="1" required>
        <input type="submit" value="Calcular">
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $n = $_POST["n"];

        if ($n > 0) {
            $pi = 0;
            echo "<h3>Iteraciones:</h3>";
            echo "<table border='1' cellpadding='5'>";
            echo "<tr><th>i</th><th>Aproximación</th></tr>";

            for ($i = 0; $i <= $n; $i++) {
                $pi += pow(-1, $i) / (2 * $i + 1);
                $aprox = 4 * $pi;
                echo "<tr><td>$i</td><td>$aprox</td></tr>";
            }

            echo "</table>";
            echo "<p><b>Aproximación final de π con n=$n:</b> $aprox</p>";
        } else {
            echo "<p>El valor de n debe ser mayor que 0.</p>";
        }
    }
    ?>

    <div class="nav-practicas">
        <a href="/Portafolio MT/practica7/e.php">Práctica anterior</a>
        <a href="/Portafolio MT/home/projects.html">Índice de proyectos</a>
        <a href="/Portafolio MT/ExamenMT/index.html">Siguiente práctica</a>
    </div>
</body>
</html>
