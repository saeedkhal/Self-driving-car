#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WebSocketsClient.h>
#include <ArduinoJson.h>

WebSocketsClient webSocket;
#define ENA   14          // Enable/speed motors Right        GPIO14(D5)
#define ENB   12          // Enable/speed motors Left         GPIO12(D6)
#define IN_1  15          // L298N in1 motors Rightx          GPIO15(D8)
#define IN_2  13          // L298N in2 motors Right           GPIO13(D7)
#define IN_3  2           // L298N in3 motors Left            GPIO2(D4)
#define IN_4  0           // L298N in4 motors Left            GPIO0(D3)
#define IR    16          // IR sensor pin                    GPIO16(D0)
#define LED   5           

String carMode = "pilot" ;
int speedCar = 110;         // 400 - 1023.
int speed_Coeff = 3;
String wifi_strengths ;
char char_array_user[255];
char char_array_pass[255];
int network_number = 0 ;
char *data[]={char_array_user,char_array_pass};
unsigned long messageInterval = 500;
bool connected = false;
int moving_duration = 250;


String path = "192.168.43.226";
//String path = "indoor-localization-sbme.herokuapp.com" ;
int port = 80;
String url = "/master" ;
#define DEBUG_SERIAL Serial

void moving(unsigned int duration){
      delay(duration);
      stopRobot();
  }
void goAhead(){ 
      digitalWrite(IN_1, LOW);
      digitalWrite(IN_2, HIGH);
      analogWrite(ENA, speedCar);
      digitalWrite(IN_3, LOW);
      digitalWrite(IN_4, HIGH);
      analogWrite(ENB, speedCar);
      if (!carMode.compareTo("auto-pilot")){
     Serial.println("got forward in auto mode ");
      moving(moving_duration);
        };
  }

void goBack(){ 

      digitalWrite(IN_1, HIGH);
      digitalWrite(IN_2, LOW);
      analogWrite(ENA, speedCar);
      digitalWrite(IN_3, HIGH);
      digitalWrite(IN_4, LOW);
      analogWrite(ENB, speedCar);
      if (!carMode.compareTo("auto-pilot")){
      moving(moving_duration);
        };
  }

void goRight(){ 
      digitalWrite(IN_1, LOW);
      digitalWrite(IN_2, HIGH);
      analogWrite(ENA, speedCar+10);
      digitalWrite(IN_3, LOW);
      digitalWrite(IN_4, LOW);
      analogWrite(ENB, speedCar);
      if (!carMode.compareTo("auto-pilot")){
        Serial.print("iam in auto pilot right");
      moving(moving_duration);
        };
  }

void goLeft(){

      digitalWrite(IN_1, LOW);
      digitalWrite(IN_2, LOW);
      analogWrite(ENA, speedCar+10);
      digitalWrite(IN_3, LOW);
      digitalWrite(IN_4, HIGH);
      analogWrite(ENB, speedCar);
      if (!carMode.compareTo("auto-pilot")){
      moving(moving_duration);
        };
  }


void stopRobot(){  

      digitalWrite(IN_1, LOW);
      digitalWrite(IN_2, LOW);
      analogWrite(ENA, speedCar);
      digitalWrite(IN_3, LOW);
      digitalWrite(IN_4, LOW);
      analogWrite(ENB, speedCar);
 }

void handelCarDirection(String direction){
      if (direction == "F") goAhead();
      else if (direction == "B") goBack();
      else if (direction == "L") goLeft();
      else if (direction == "R") goRight();
      else if (direction == "S") stopRobot();
  }
void back(){
      digitalWrite(IN_1, HIGH);
      digitalWrite(IN_2, LOW);
      analogWrite(ENA, speedCar);
      digitalWrite(IN_3, HIGH);
      digitalWrite(IN_4, LOW);
      analogWrite(ENB, speedCar);
      moving(1000);
}
void left(){
      digitalWrite(IN_1, LOW);
      digitalWrite(IN_2, LOW);
      analogWrite(ENA, speedCar);
      digitalWrite(IN_3, LOW);
      digitalWrite(IN_4, HIGH);
      analogWrite(ENB, speedCar);
      moving(1000);

}
void ahead(){
      digitalWrite(IN_1, LOW);
      digitalWrite(IN_2, HIGH);
      analogWrite(ENA, speedCar);
      digitalWrite(IN_3, LOW);
      digitalWrite(IN_4, HIGH);
      analogWrite(ENB, speedCar);
      moving(1000);

}
void handelObject (){
  stopRobot();
  }
  
void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case WStype_DISCONNECTED:
            DEBUG_SERIAL.printf("[WSc] Disconnected!\n");
            connected = false;
            break;
        case WStype_CONNECTED: 
            DEBUG_SERIAL.printf("[WSc] Connected to url: %s\n", payload);
            connected = true;
            break;
        case WStype_TEXT:
            DEBUG_SERIAL.printf("[WSc] CAR DIECTION : %s\n", payload);
            if (!String((char *)payload).compareTo("pilot") ){
              Serial.println("car in pilot mode now");
              carMode = "pilot" ;
            }
            else if (!String((char *)payload).compareTo("auto-pilot") ){
              Serial.println("car in auto pilot mode now");
              carMode = "auto-pilot" ;
            }
            else{
            Serial.println("handel care direction");
            handelCarDirection((char *)payload);
              }
            break;
    }
 
}


 
char* serial_tochar(int choose_data) {
    while(Serial.available()==0) { }
    String str =Serial.readString();
    str.toCharArray(data[choose_data], str.length());
    return data[choose_data];
}

void get_wifi_strength() {
  int network_number = WiFi.scanNetworks();
  const size_t CAPACITY = JSON_OBJECT_SIZE(20);
  StaticJsonDocument<CAPACITY> doc;

  // create an object
  JsonObject object = doc.to<JsonObject>();
  for (int i=0;i<network_number;i++){
    object[WiFi.SSID(i)] = WiFi.RSSI(i);
  }
  wifi_strengths = " " ;
  //wifi strength in json object
  serializeJson(doc, wifi_strengths);
} 
void connect_wifi() {
//    char * username;
//    Serial.println("Please enter the username: ");
//    username = strtok(serial_tochar(0), " ");
//    char * password;
//    Serial.println("Please enter the password: ");
//    password = strtok(serial_tochar(1), " ");
    String username = "Ahmed Galal ";
    String password = "88888888" ;
    WiFi.begin(username, password);

    uint8_t i = 0;
    while(WiFi.status() != WL_CONNECTED && i < 20) {
      Serial.print(".");
      delay(500);
      i++;
    }
}
void print_available_wifi () {
  network_number = WiFi.scanNetworks();
  Serial.print("number of network : ");
  Serial.println(network_number);
  for (int i=0;i<network_number;i++){
  Serial.print("WiFi name : ");
  Serial.println(WiFi.SSID(i));
  Serial.print("Signal Strenth : ");
  Serial.println(WiFi.RSSI(i));
  Serial.println("------------");
  }
}
void setup() {
  pinMode(ENA, OUTPUT);
  pinMode(ENB, OUTPUT);  
  pinMode(IN_1, OUTPUT);
  pinMode(IN_2, OUTPUT);
  pinMode(IN_3, OUTPUT);
  pinMode(IN_4, OUTPUT); 
  pinMode(IR,INPUT);
  pinMode(LED,OUTPUT);
  Serial.begin(115200);
  print_available_wifi(); 
  connect_wifi();
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
 
    // server address, port and URL
    //webSocket.begin("localization-hamdy-server.herokuapp.com", 8082, "/master","text");
  Serial.println("Trying to connect to web_socket  === " + path + ":" + String(port) + url );
  webSocket.begin(path, port, url ,"text");
    // event handler
  webSocket.onEvent(webSocketEvent);
}
 
unsigned long lastUpdate = millis();


void loop() {
        webSocket.loop();
        while (digitalRead(IR) == 0){
          handelObject ();
        }

}
