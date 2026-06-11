   const robot = document.getElementById("robotMascota");
const btnSaludar = document.getElementById("btnSaludar");
const estado = document.getElementById("estado");

if (btnSaludar && robot) {
    btnSaludar.addEventListener("click", () => {
        const animaciones = robot.availableAnimations || [];
        const saludo = animaciones.includes("Wave") ? "Wave" : animaciones[0];

        if (saludo) {
            robot.animationName = saludo;
            robot.currentTime = 0;
            robot.play({ repetitions: 1 });
        } else {
            estado.textContent = "El robot está listo, pero este modelo no tiene animación de saludo.";
        }
    });
}

async function activarMicrofono() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        estado.textContent = "Micrófono activado. Listo para conectar con Teachable Machine.";

        // Por ahora solo pedimos permiso. Cuando conecten Teachable Machine,
        // ya no será necesario cerrar el micrófono aquí.
        stream.getTracks().forEach(track => track.stop());

    } catch (error) {
        estado.textContent = "No se pudo activar el micrófono. Revisa los permisos del navegador.";
    }
}