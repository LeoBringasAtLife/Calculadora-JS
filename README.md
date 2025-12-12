# Calculadora JS

Calculadora simple hecha en HTML, CSS y JavaScript.

**Características**

- Operaciones básicas: suma (+), resta (−), multiplicación (\*), división (/).
- Botón `CE` para borrar todo.
- Flecha (←) para borrar un carácter.
- Punto decimal `.` para decimales (previene múltiple punto en el mismo número).
- Botón `=` para calcular.

**Cómo ejecutar**

1. Abrir el archivo `index.html` en tu navegador.

2. (Opcional) Si usas extensiones como Live Server o Live Preview en VSCode (o el editor de código de preferencia), abre la carpeta del proyecto y lanza el servidor para recargar automáticamente.

**Estructura del proyecto**

- `index.html` — marcado HTML y estructura de la calculadora.
- `styles.css` — estilos CSS neutrales.
- `index.js` — lógica de la calculadora (entrada, operadores, evaluación segura).
- `glosario.txt` — notas y requerimientos.

**Notas técnicas**

- La evaluación de expresiones utiliza una validación de caracteres permitidos y luego `Function('return ' + expr)()` para calcular. Solo se permiten dígitos, operadores `+-*/().` y espacios; esto reduce riesgos de ejecutar código arbitrario desde la entrada.
- Comportamiento de punto flotante (por ejemplo `0.1 + 0.2`) es el estándar de JavaScript.


**Pruebas rápidas:**

- `12 + 3 =` → `15`
- `5 * 6 =` → `30`
- `7 / 2 =` → `3.5`
- `0.1 + 0.2 =` → `0.30000000000000004` (comportamiento estándar de punto flotante)

<br>
