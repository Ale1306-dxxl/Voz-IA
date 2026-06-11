from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Crear la carpeta uploads si no existe
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def inicio():
    return render_template("index.html")

@app.route("/analizar-imagen", methods=["POST"])
def analizar_imagen():
    archivo = request.files.get("imagen")

    if archivo is None or archivo.filename == "":
        return render_template(
            "index.html",
            resultado="No se seleccionó ninguna imagen."
        )

    nombre_seguro = secure_filename(archivo.filename)
    ruta_archivo = os.path.join(app.config["UPLOAD_FOLDER"], nombre_seguro)

    archivo.save(ruta_archivo)

    return render_template(
        "index.html",
        resultado="Imagen recibida correctamente. Procesando..."
    )

if __name__ == "__main__":
    app.run(debug=True)