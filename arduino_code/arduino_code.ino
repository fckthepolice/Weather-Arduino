int ledPin = 13;
bool ledState = false;

void setup() {
  pinMode (ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if(Serial.available() > 0){
    char command = Serial.read();

    if(command == '1'){
      encenderLed();
    }else if(command == '0'){
      apagarLed();
    }
  }
}

void encenderLed(){
  ledState = true;
  digitalWrite(ledPin, HIGH);
  Serial.println("LED encendido");
}

void apagarLed(){
  ledState = false;
  digitalWrite(ledPin, LOW);
  Serial.println("LED apagado");
}