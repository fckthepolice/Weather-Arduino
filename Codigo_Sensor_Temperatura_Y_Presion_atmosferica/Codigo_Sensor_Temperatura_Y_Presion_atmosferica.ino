#include <Wire.h>
#include <SPI.h>
#include <Adafruit_BMP280.h>
#include <DHT.h>
#define DHT_TYPE DHT11
#define DHT_PIN 2
DHT dht(DHT_PIN, DHT_TYPE);
#define BMP280_ADDRESS 0x77
Adafruit_BMP280 bmp; // I2C

void setup() {
  Serial.begin(9600);
  dht.begin();
  while ( !Serial ) delay(100);   // wait for native usb
  Serial.println(F("BMP280 test"));
  unsigned status;
  status = bmp.begin(BMP280_ADDRESS);
  if (!status) {
    Serial.println(F("Could not find a valid BMP280 sensor, check wiring or "
                      "try a different address!"));
    Serial.print("SensorID was: 0x"); Serial.println(bmp.sensorID(),16);
    Serial.print("        ID of 0xFF probably means a bad address, a BMP 180 or BMP 085\n");
    Serial.print("   ID of 0x56-0x58 represents a BMP 280,\n");
    Serial.print("        ID of 0x60 represents a BME 280.\n");
    Serial.print("        ID of 0x61 represents a BME 680.\n");
    while (1) delay(10);
  }

  /* Default settings from datasheet. */
  bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,     /* Operating Mode. */
                  Adafruit_BMP280::SAMPLING_X2,     /* Temp. oversampling */
                  Adafruit_BMP280::SAMPLING_X16,    /* Pressure oversampling */
                  Adafruit_BMP280::FILTER_X16,      /* Filtering. */
                  Adafruit_BMP280::STANDBY_MS_500); /* Standby time. */
}

void loop() {
  Serial.print(F("Presión atmosférica: "));
  Serial.print(bmp.readPressure());
  Serial.println(" Pa");

  float temperatureCelsius = dht.readTemperature();
  float humidity = dht.readHumidity();
  if (isnan(temperatureCelsius) || isnan(humidity)) {
    Serial.println("Error al leer el sensor DHT!");
  } else {
    float temperatureFahrenheit = (temperatureCelsius * 9.0 / 5.0) + 32.0;

    Serial.print("Temperatura: ");
    Serial.print(temperatureCelsius);
    Serial.print(" °C / ");
    Serial.print("Humedad: ");
    Serial.println(humidity);
    Serial.println(" %");
  }

  delay(2000); // Pausa de 2 segundos antes de volver a medir
}


