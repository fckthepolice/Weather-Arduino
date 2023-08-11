#include <Wire.h>
#include <SPI.h>
#include <Adafruit_BMP280.h>
#include <DHT.h>
#include <stdio.h>
#include <ArduinoJson.h>

#define DHT_TYPE DHT11
#define DHT_PIN 2
DHT dht(DHT_PIN, DHT_TYPE);

#define BMP280_ADDRESS 0x77
Adafruit_BMP280 bmp; // I2C

void setup() {
  Serial.begin(9600);
  dht.begin();
  while (!Serial)
    delay(100);

  if (!bmp.begin(BMP280_ADDRESS)) {
    Serial.println(F("Could not find a valid BMP280 sensor, check wiring or try a different address!"));
    while (1) delay(10);
  }
}

void loop() {
  float pressure = bmp.readPressure() / 100.0; // Convertir Pa a hPa
  float temperatureCelsius = dht.readTemperature();
  float humidity = dht.readHumidity();
  String result = String(pressure) + "," + String(temperatureCelsius) + "," + String(humidity) + "/";

  Serial.print(result);

  delay(2000);
}



