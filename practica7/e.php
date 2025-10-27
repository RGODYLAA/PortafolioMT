<!DOCTYPE html>
<html>
<head>
    <title>Aproximación de e</title>
    <link rel="stylesheet" type="text/css" href="estilos.css">
    <link rel="stylesheet" href="/Portafolio MT/CSS/navegacion.css">
</head>
<body>
    <h2>Aproximar el valor de e</h2>
    <form method="post" action="">
        <label>Ingresa un valor de n (mayor a 0):</label>
        <input type="number" name="n" min="1" required>
        <input type="submit" value="Calcular">
    </form>

    <?php
    //factorial
    function factorial($num) {
        $res = 1;
        for ($i = 1; $i <= $num; $i++) {
            $res *= $i;
        }
        return $res;
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $n = $_POST["n"];

        if ($n > 0) {
            $e = 0;
            echo "<h3>Iteraciones:</h3>";
            echo "<table border='1' cellpadding='5'>";
            echo "<tr><th>i</th><th>Aproximación</th></tr>";

            for ($i = 0; $i <= $n; $i++) {
                $e += 1 / factorial($i);
                echo "<tr><td>$i</td><td>$e</td></tr>";
            }

            echo "</table>";
            echo "<p><b>Aproximación final de e con n=$n:</b> $e</p>";
        } else {
            echo "<p>El valor de n debe ser mayor que 0.</p>";
        }
    }
    ?>

    <div class="nav-practicas">
        <a href="/Portafolio MT/practica6/codigo.html">Práctica anterior</a>
        <a href="/Portafolio MT/home/projects.html">Índice de proyectos</a>
        <a href="/Portafolio MT/practica7/pi.php">Siguiente práctica</a>
    </div>

</body>
</html>
