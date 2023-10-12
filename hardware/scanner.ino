#define QR Serial1

void setup()
{

  Serial.begin(115200);
  QR.begin(9600, SERIAL_8N1, 26, 27); // Definimos el puerto serial del QR
}

void loop()
{
  if (QR.available()) // Compruebe si hay datos entrantes en el búfer en serie
  {
    while (QR.available()) // Siga leyendo byte a byte desde el búfer hasta que el búfer esté vacío
    {
      char input = QR.read(); // Lee 1 byte de datos y lo guarda en una variable
      Serial.print(input);    // Imprime el byte
      delay(5);               // un pequeño retraso
    }
    Serial.println();
  }
  delay(5); // un pequeño retraso
}